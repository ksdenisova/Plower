const DbClient = require('./db_client');

const getPlants = async () =>  {
  const db = DbClient.getDb();
  const plants = await db.collection('plants').find({}).toArray();

  return plants;
}

const createPlant = async (plant) => {
  plant.dateAdded = new Date(Date.now());
  
  const db = DbClient.getDb();
  const plants = db.collection("plants");
  const result = await plants.insertOne(plant);
    
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

const updatePlantHumidity = async (sensorId, humidity) => {
  const db = DbClient.getDb();
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
}

const updatePlantWatering = async (sensorId, humidity, lastWatered) => {
  const db = DbClient.getDb();
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
}

module.exports = {
  getPlants,
  createPlant,
  updatePlantHumidity,
  updatePlantWatering
}
