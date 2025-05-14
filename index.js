const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;

// midleserer

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.unhq3oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const UserColletion = client.db("coffee").collection("coffeeData");

    app.get("/coffee", async (req, res) => {
      const result = await UserColletion.find().toArray();

      res.send(result);
    });

    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;

      const qurey = { _id: new ObjectId(id) };

      const result = await UserColletion.findOne(qurey);
      res.send(result);
    });
    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      const result = await UserColletion.insertOne(newCoffee);

      res.send(result);

      console.log(newCoffee);
    });

    app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatecoff = req.body;

      const updateDoc = {
        $set: updatecoff,
      };

      const result = await UserColletion.updateOne(filter, updateDoc, options); 

      res.send(result)
    });

    app.delete("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await UserColletion.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("coffee server is running");
});

app.listen(port, () => {
  console.log(`my port is  running ${port}`);
});
