const { MongoClient } = require("mongodb");
const dbUser = process.env.MONGO_USER
const dbPassword = process.env.MONGO_PASSWORD
const uri = `mongodb://${dbUser}:${dbPassword}@mongo-db:27017/?authMechanism=DEFAULT&authSource=plower`;
const client = new MongoClient(uri);

const getPlants = async () =>  {
   try {
    await client.connect();
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

const updatePlantHumidity = async (sensorId, humidity) => {
  try {
    await client.connect();
    const db = client.db("plower");
    const plants = db.collection("plants");
    const query = { sensorId: sensorId };

    const updateDoc = {
      $set: {
        humidity: humidity
      },
    };
    const result = await plants.updateOne(query, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}

const updatePlantWatering = async (sensorId, humidity, lastWatered) => {
  try {
    await client.connect();
    const db = client.db("plower");
    const plants = db.collection("plants");
    const query = { sensorId: sensorId };

    const updateDoc = {
      $set: {
        humidity: humidity,
        lastWatered: lastWatered
      },
    };
    const result = await plants.updateOne(query, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}

const getSensors = async () => {
  try {
    await client.connect();
    const db = client.db("plower");
    const sensors = await db.collection('sensors').find({}).toArray();

    return sensors;
  } finally {
    await client.close();
  }
}

const saveSensor = async (sensor) => {
  try {
    await client.connect();
    const db = client.db("plower");
    const sensors = db.collection("sensors");
    const query = { _id: sensor._id };
    const result = await sensors.replaceOne(query, sensor);

    console.log(`Modified ${result.modifiedCount} document(s)`);
  } finally {
    await client.close();
  }
}

const updateSensor = async (sensorId, humidity) => {
  try {
    await client.connect();
    const db = client.db("plower");
    const sensors = db.collection("sensors");
    const query = { _id: sensorId };

    const updateDoc = {
      $set: {
        humidity: humidity
      },
    };
    const result = await sensors.updateOne(query, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}

module.exports = {
  getPlants,
  createPlant,
  updatePlantHumidity,
  updatePlantWatering,
  getSensors,
  saveSensor,
  updateSensor
}
