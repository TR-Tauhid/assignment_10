import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const app = express();
app.use(cors({ origin: true }));
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// MongoDB functions here...

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

    app.get("/", (req, res) => {
      res.send("Server is running...");
    });

    db = client.db(dbName);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const touristSpotCollection = db.collection("touristSpots");
    const countriesSpotCollection = db.collection("countriesSpots");

    // CURD operation of tourists spots here...

    app.post("/addTouristSpot", async (req, res) => {
      const touristDetails = req.body;
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
    });

    app.get("/allTouristSpot", async (req, res) => {
      const allTouristSpotData = await db
        .collection("touristSpots")
        .find({})
        .toArray();
      res.status(200).json(allTouristSpotData);
    });

    app.get("/myList", async (req, res) => {
      const allTouristSpotData = await db
        .collection("touristSpots")
        .find({})
        .toArray();
      res.status(200).json(allTouristSpotData);
    });

    app.delete("/myList/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristSpotCollection.deleteOne(query);
      res.status(200).send(result);
    });

    app.patch("/myList/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTouristSpot = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: false };
      const item = {
        $set: {
          ...updatedTouristSpot,
        },
      };
      const result = await touristSpotCollection.updateOne(
        filter,
        item,
        option
      );
      res.send(result);
    });

   app.get("/viewDetails/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let data = await touristSpotCollection.findOne({
      _id: new ObjectId(id),
    });

    if (data) {
      return res.status(200).json(data);
    }

    data = await countriesSpotCollection.findOne({
      _id: new ObjectId(id),
    });

    if (data) {
      return res.status(200).json(data); 
    }

    return res.status(404).json({ message: "Data not found" }); 

  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching data." });
  }
});

    // CURD operation of Countries here...

    app.post("/countries", async (req, res) => {
      const countryDetails = req.body;
      const result = await countriesSpotCollection.insertOne(countryDetails);
      if (result.acknowledged) {
        res.status(201).json({
          message: "Country traveling spot added successfully",
          insertedId: result.insertedId,
          countryDetails: countryDetails,
        });
      } else {
        res
          .status(500)
          .json({ message: "Failed to add country traveling spot" });
      }
    });

    app.get("/countries", async (req, res) => {
      const allCountriesSpotData = await db
        .collection("countriesSpots")
        .find({})
        .toArray();
      res.status(200).json(allCountriesSpotData);
    });

    app.patch("/countries/:id", async (req, res) => {
      const id = req.params.id;
      const updateCountrySpotDetail = req.body;
      console.log(updateCountrySpotDetail);
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: false };
      const item = {
        $set: {
          ...updateCountrySpotDetail,
        },
      };
      const result = await countriesSpotCollection.updateOne(
        filter,
        item,
        updateCountrySpotDetail
      );
      res.status(200).send(result);
    });

    app.delete("/countries/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await countriesSpotCollection.deleteOne(query);
      res.status(200).send(result);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    await client.close();
  }
}
run().catch(console.dir);

module.exports = app;