import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

let db;

async function run() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("Pinged to MongoDB");
  }
}

// Health check
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Tourist Spot APIs
app.post("/addTouristSpot", async (req, res) => {
  try {
    const collection = db.collection("touristSpots");
    const result = await collection.insertOne(req.body);
    result.acknowledged
      ? res.status(201).json({ message: "Added", insertedId: result.insertedId })
      : res.status(500).json({ message: "Insert failed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allTouristSpot", async (req, res) => {
  const dataFromTouristsCollection = await db.collection("touristSpots").find({}).toArray();
  const dataFromCountriesCollection = await db.collection("countriesSpots").find({}).toArray();
  const data = [...dataFromTouristsCollection, ...dataFromCountriesCollection]
  res.status(200).json(data);
});

app.get("/myList", async (req, res) => {
  const data = await db.collection("touristSpots").find({}).toArray();
  res.status(200).json(data);
});

app.delete("/myList/:id", async (req, res) => {
  const result = await db
    .collection("touristSpots")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.status(200).json(result);
});

app.patch("/myList/:id", async (req, res) => {
  const result = await db.collection("touristSpots").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body },
    { upsert: false }
  );
  res.status(200).json(result);
});

app.get("/viewDetails/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  let data = await db.collection("touristSpots").findOne({ _id: id });

  if (!data) {
    data = await db.collection("countriesSpots").findOne({ _id: id });
  }

  data
    ? res.status(200).json(data)
    : res.status(404).json({ message: "Data not found" });
});

// Country APIs
app.post("/countries", async (req, res) => {
  try {
    const result = await db.collection("countriesSpots").insertOne(req.body);
    result.acknowledged
      ? res.status(201).json({ message: "Added", insertedId: result.insertedId })
      : res.status(500).json({ message: "Insert failed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/countries", async (req, res) => {
  const data = await db.collection("countriesSpots").find({}).toArray();
  res.status(200).json(data);
});

app.patch("/countries/:id", async (req, res) => {
  const result = await db.collection("countriesSpots").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body },
    { upsert: false }
  );
  res.status(200).json(result);
});

app.delete("/countries/:id", async (req, res) => {
  const result = await db
    .collection("countriesSpots")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.status(200).json(result);
});



run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hey there...!!! Server is running...!!!");
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));