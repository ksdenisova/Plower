const { MongoClient } = require("mongodb");
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb://${dbUser}:${dbPassword}@mongo-db:27017/?authMechanism=DEFAULT&authSource=plower`;
var db;

const connect = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db('plower');
}

const getDb = () => {
  return db;
}

module.exports = {
  connect,
  getDb
}
