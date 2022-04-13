const DBClient = require('./db_client');

const getPlants = async () =>  {
  const client = DBClient.createClient();
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
  const client = DBClient.createClient();
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
  const client = DBClient.createClient();
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
  const client = DBClient.createClient();
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

module.exports = {
  getPlants,
  createPlant,
  updatePlantHumidity,
  updatePlantWatering
}
