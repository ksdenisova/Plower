const { MongoClient } = require("mongodb");
const uri = `mongodb://mongo-db:27017/?authMechanism=DEFAULT`;
const client = new MongoClient(uri);

const getPlants = async () =>  {
   try {
    await client.connect();
    
    console.log("Connected successfully to server");
      
    const db = client.db("plower");
    const plants = await db.collection('plants').find({}).toArray();

    return plants;
  } finally {
    await client.close();
  }
}

const createPlant = async (plant) => {
  try {
    await client.connect();
    const db = client.db("plower");
    const plants = db.collection("plants");
   
    const result = await plants.insertOne(plant);
    
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

module.exports = {
  getPlants,
  createPlant
}
