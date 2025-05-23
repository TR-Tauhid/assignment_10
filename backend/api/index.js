import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import serverless from "serverless-http";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@assignmenttencluster.h7hk2wy.mongodb.net/?retryWrites=true&w=majority&appName=assignmentTenCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let touristSpotCollection;
let countriesSpotCollection;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    touristSpotCollection = db.collection("touristSpots");
    countriesSpotCollection = db.collection("countriesSpots");
    console.log("Connected to MongoDB");
  }
}

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Base route
app.get("/", (req, res) => {
  res.send("Serverless Express backend is running...");
});

// Tourists Spot CRUD
app.post("/addTouristSpot", async (req, res) => {
  const touristDetails = req.body;
  const result = await touristSpotCollection.insertOne(touristDetails);
  if (result.acknowledged) {
    res.status(201).json({
      message: "Tourist spot added successfully",
      insertedId: result.insertedId,
      touristDetails,
    });
  } else {
    res.status(500).json({ message: "Failed to add tourist spot" });
  }
});

app.get("/allTouristSpot", async (req, res) => {
  const data = await touristSpotCollection.find({}).toArray();
  res.status(200).json(data);
});

app.get("/myList", async (req, res) => {
  const data = await touristSpotCollection.find({}).toArray();
  res.status(200).json(data);
});

app.delete("/myList/:id", async (req, res) => {
  const id = req.params.id;
  const result = await touristSpotCollection.deleteOne({ _id: new ObjectId(id) });
  res.status(200).send(result);
});

app.patch("/myList/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await touristSpotCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updatedData } },
    { upsert: false }
  );
  res.send(result);
});

app.get("/viewDetails/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let data = await touristSpotCollection.findOne({ _id: new ObjectId(id) });
    if (data) return res.status(200).json(data);

    data = await countriesSpotCollection.findOne({ _id: new ObjectId(id) });
    if (data) return res.status(200).json(data);

    res.status(404).json({ message: "Data not found" });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error occurred while fetching data." });
  }
});

// Countries Spot CRUD
app.post("/countries", async (req, res) => {
  const countryDetails = req.body;
  const result = await countriesSpotCollection.insertOne(countryDetails);
  if (result.acknowledged) {
    res.status(201).json({
      message: "Country traveling spot added successfully",
      insertedId: result.insertedId,
      countryDetails,
    });
  } else {
    res.status(500).json({ message: "Failed to add country traveling spot" });
  }
});

app.get("/countries", async (req, res) => {
  const data = await countriesSpotCollection.find({}).toArray();
  res.status(200).json(data);
});

app.patch("/countries/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await countriesSpotCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updatedData } },
    { upsert: false }
  );
  res.status(200).send(result);
});

app.delete("/countries/:id", async (req, res) => {
  const id = req.params.id;
  const result = await countriesSpotCollection.deleteOne({ _id: new ObjectId(id) });
  res.status(200).send(result);
});

// Export for serverless
export const handler = serverless(app);
