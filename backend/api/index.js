import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();
// Vercel handles the PORT automatically, so we remove app.listen() and PORT constant here.
// const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@assignmenttencluster.h7hk2wy.mongodb.net/?retryWrites=true&w=majority&appName=assignmentTenCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // This variable will hold our database connection instance

// Function to connect to DB. This will be called by the middleware.
async function connectToDB() {
  if (!db) { // Only connect if the connection hasn't been established
    try {
      await client.connect();
      db = client.db(process.env.DB_NAME); // Use process.env.DB_NAME for your database name
      console.log("Pinged to MongoDB"); // This log will appear in Vercel logs
    } catch (error) {
      console.error("Failed to connect to DB:", error);
      // In a serverless environment, throwing an error here might lead to function cold start issues.
      // Consider a robust error handling strategy for production.
      throw error;
    }
  }
}

// Middleware to ensure DB connection before handling API routes
// This is crucial for serverless functions
app.use(async (req, res, next) => {
  try {
    await connectToDB(); // Ensure DB connection is established for every request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Error in DB connection middleware:", error);
    res.status(500).json({ error: "Database connection failed." });
  }
});


// Health check - accessible directly
app.get("/", (req, res) => {
  res.send("Hey there...!!! Server is running...!!!");
});


// Tourist Spot APIs (These will now run after db connection is guaranteed by middleware)
app.post("/addTouristSpot", async (req, res) => {
  try {
    const collection = db.collection("touristSpots");
    const result = await collection.insertOne(req.body);
    result.acknowledged
      ? res.status(201).json({ message: "Added", insertedId: result.insertedId })
      : res.status(500).json({ message: "Insert failed" });
  } catch (err) {
    console.error("Error in addTouristSpot:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/allTouristSpot", async (req, res) => {
  try {
    const dataFromTouristsCollection = await db.collection("touristSpots").find({}).toArray();
    const dataFromCountriesCollection = await db.collection("countriesSpots").find({}).toArray();
    const data = [...dataFromTouristsCollection, ...dataFromCountriesCollection];
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in allTouristSpot:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/myList", async (req, res) => {
  try {
    // IMPORTANT: In a real app, filter this by user ID (e.g., req.user.email)
    const data = await db.collection("touristSpots").find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in myList:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/myList/:id", async (req, res) => {
  try {
    const result = await db
      .collection("touristSpots")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in delete myList item:", err);
    res.status(500).json({ error: err.message });
  }
});

app.patch("/myList/:id", async (req, res) => {
  try {
    const result = await db.collection("touristSpots").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { upsert: false }
    );
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in update myList item:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/viewDetails/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    let data = await db.collection("touristSpots").findOne({ _id: id });

    if (!data) {
      data = await db.collection("countriesSpots").findOne({ _id: id });
    }

    data
      ? res.status(200).json(data)
      : res.status(404).json({ message: "Data not found" });
  } catch (err) {
    console.error("Error in viewDetails:", err);
    res.status(500).json({ error: err.message });
  }
});

// Country APIs
app.post("/countries", async (req, res) => {
  try {
    const result = await db.collection("countriesSpots").insertOne(req.body);
    result.acknowledged
      ? res.status(201).json({ message: "Added", insertedId: result.insertedId })
      : res.status(500).json({ message: "Insert failed" });
  } catch (err) {
    console.error("Error in addCountry:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/countries", async (req, res) => {
  try {
    const data = await db.collection("countriesSpots").find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in getCountries:", err);
    res.status(500).json({ error: err.message });
  }
});

app.patch("/countries/:id", async (req, res) => {
  try {
    const result = await db.collection("countriesSpots").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { upsert: false }
    );
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in updateCountry:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/countries/:id", async (req, res) => {
  try {
    const result = await db
      .collection("countriesSpots")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in deleteCountry:", err);
    res.status(500).json({ error: err.message });
  }
});

// Export the app for Vercel to use as a serverless function
// app.listen() and run().catch(console.dir) are removed as Vercel handles the server listening.
export default app;
