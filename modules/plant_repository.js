const { MongoClient } = require("mongodb");
const dbUser = process.env.MONGO_USER
const dbPassword = process.env.MONGO_PASSWORD
const uri = `mongodb://${dbUser}:${dbPassword}@localhost:27017/?authMechanism=DEFAULT`;

let fakePlants = [ { "id": "0", "name": "My lovely plant name", "lastWatered": "2022-03-30T12:01:00", "humidity": "75" },
  { "id": "1", "name": "A really finicky plant", "lastWatered": "2022-03-18T07:15:00", "humidity": "50" },
  { "id": "2", "name": "Some other plant name here", "lastWatered": "2022-03-28T23:12:10", "humidity": "32" },
  { "id": "3", "name": "Tina", "lastWatered": "", "humidity": "" }];

const getPlants = async () =>  {
  const client = new MongoClient(uri);
 
  try {
    await client.connect();
    await client.db("plower").command({ ping: 1 });
    console.log("Connected successfully to server");
      
    const db = client.db("plower");
    const plants = await db.collection('plants').find({}).toArray();

    return plants;
  } finally {
    await client.close();
  }
}

const createPlant = (plant) => {
  fakePlants.push(plant);
}

module.exports = {
  getPlants,
  createPlant
}
