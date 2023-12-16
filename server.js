import { MongoClient } from 'mongodb';
import express, { json } from 'express';

const app = express();
const port = 3000;
const mongoUrl = 'mongodb+srv://zjlee:Uho7nVqWMQqRMHBw@cluster0.sbmy5pi.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const dbName = 'bus_data'; // Replace with your MongoDB database name
const collectionName = 'seat_weights'; // Replace with your MongoDB collection name

// Middleware to parse JSON requests
app.use(json());

// Endpoint to get all documents from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();

    client.close();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
