const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

var cors = require('cors')
const app = express()
const port = 3000


app.use(express.json());




const uri = "mongodb+srv://fisino-website:atsXBarL4rbqKsV3@cluster0.nfaluwl.mongodb.net/?retryWrites=true&w=majority";
app.use(cors())
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database =client.db("fisino-23-3");
   const serviceCollection = database.collection('services');
   const ordersCollection = database.collection('Orders');
   app.get('/services', async( req, res)=>{
    const  query = {};
    const services = await serviceCollection.find(query).toArray();
    res.send(services)
   })


   app.get('/services/:id', async(req, res)=>{
     const id = req.params.id;
     const query = {_id: new ObjectId(id)}
     const product = await serviceCollection.findOne(query);
     res.send(product);
   })


     // order
  app.post('/orders',async(req, res)=>{
    const order = req.body;
    const result = await ordersCollection.insertOne(order);
    res.send(result)
  })
  
  app.get('/orders', async( req, res)=>{
    // const email = req.query.email;
    // console.log(email);
    const  query = {};
    const orders = await ordersCollection.find(query).toArray();
    res.send(orders)
  })

  app.delete('/orders/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await ordersCollection.deleteOne(query);
    res.send(result)
  })




  }
  
  



   finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get('/', (req, res) => {
  res.send('Hello Fisino!')
})

app.listen(port, () => {
  console.log(`Fisino server  app listening on port ${port}`)
})