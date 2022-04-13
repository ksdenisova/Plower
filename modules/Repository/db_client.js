const { MongoClient } = require("mongodb");
const dbUser = process.env.MONGO_USER
const dbPassword = process.env.MONGO_PASSWORD
const uri = `mongodb://${dbUser}:${dbPassword}@172.16.0.108:27017/?authMechanism=DEFAULT&authSource=plower`;

const createClient = () => {
  return new MongoClient(uri);
}

module.exports = {
  createClient
}
