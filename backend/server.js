import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

if (!dbUser || !dbPassword) {
  console.error(
    "FATAL ERROR: DB_USER or DB_PASSWORD not provided in environment variables!"
  );

  process.exit(1);
}

const uri = `mongodb+srv://${dbUser}:${dbPassword}@assignmenttencluster.h7hk2wy.mongodb.net/?retryWrites=true&w=majority&appName=assignmentTenCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    db = client.db(dbName);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/addTouristSpot", async (req, res) => {
  try {
    const touristDetails = req.body;
    const touristSpotCollection = db.collection("touristSpots");
    const result = await touristSpotCollection.insertOne(touristDetails);
    if (result.acknowledged) {
      res.status(201).json({
        message: "Tourist spot added successfully",
        insertedId: result.insertedId,
        touristDetails: touristDetails,
      });
    } else {
      res.status(500).json({ message: "Failed to add tourist spot" });
    }
  } catch (error) {
    console.error("Error adding tourist spot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/allTouristSpot", async (req, res) => {
  try {
    const allTouristSpotData = await db
      .collection("touristSpots")
      .find({})
      .toArray();
    res.status(200).json(allTouristSpotData);
  } catch (error) {
    console.error("Error fetching tourist spots:", error);
    res.status(500).json({ message: `${error.message}` });
  }
});

app.get("/myList", async (req, res) => {
 try {
    const allTouristSpotData = await db
      .collection("touristSpots")
      .find({})
      .toArray();
    res.status(200).json(allTouristSpotData);
  } catch (error) {
    console.error("Error fetching tourist spots:", error);
    res.status(500).json({ message: `${error.message}` });
  }
});



app.get("/viewDetails/:id", async (req, res) => {
  try {
    const id = req.params.id;

   
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format. Must be a valid ObjectId." });
    }

    const touristSpotCollection = db.collection("touristSpots");

   
    const touristSpot = await touristSpotCollection.findOne({
      _id: new ObjectId(id),
    });

    if (touristSpot) {
      res.status(200).json(touristSpot);
    } else {
      res.status(404).json({ message: "Tourist spot not found" });
    }
  } catch (error) {
    console.error("Error fetching tourist spot details:", error);

    res.status(500).json({ message: "Internal server error" });
  }
});
