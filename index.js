
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const express = require('express') 
const cors = require('cors')
const app = express() 

const port = process.env.PORT || 4000 

// midleserer  

app.use(cors()) 
app.use(express.json())







const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.unhq3oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!"); 

    const UserColletion = client.db('coffee').collection('coffeeData')
 

    app.get('/coffee',async(req,res)=>{

const result = await UserColletion.find().toArray()

res.send(result)

    })


    app.post('/coffee',async(req,res)=>{



 const newCoffee = req.body 
const result = await  UserColletion.insertOne(newCoffee) 

res.send(result)

 console.log(newCoffee);
 



    })







  } finally {
    
  }
}

run().catch(console.dir);

app.get('/',(req,res)=>{



    res.send('coffee server is running')
})

app.listen(port,()=>{


    console.log(`my port is  running ${port}`);
    
})