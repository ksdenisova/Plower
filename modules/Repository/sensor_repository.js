const DBClient = require('./db_client');

const getSensors = async () => {
  const client = DBClient.createClient();
  try {
    const client = DBClient.createClient();
    await client.connect();
    const db = client.db("plower");
    const sensors = await db.collection('sensors').find({}).toArray();

    return sensors;
  } finally {
    await client.close();
  }
}

const saveSensor = async (sensor) => {
  const client = DBClient.createClient();
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
  const client = DBClient.createClient();
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
  getSensors,
  saveSensor,
  updateSensor
}
