const DbClient = require('./db_client');

const getSensors = async () => {
  const db = DbClient.getDb();
  const sensors = await db.collection('sensors').find({}).toArray();

  return sensors;
}

const saveSensor = async (sensor) => {
  const db = DbClient.getDb();
  const sensors = db.collection("sensors");
  const query = { _id: sensor._id };
  const result = await sensors.replaceOne(query, sensor);

  console.log(`Modified ${result.modifiedCount} document(s)`);
}

const updateSensor = async (sensorId, humidity) => {
  const db = DbClient.getDb();
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
}

module.exports = {
  getSensors,
  saveSensor,
  updateSensor
}
