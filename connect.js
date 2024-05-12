require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
// console.log(uri);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // await listDatabases(client);
  } catch (error) {
    console.error(error);
  }
}

async function connectDB() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // await listDatabases(client);
    return client;
  } catch (error) {
    console.error(error);
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
// main().catch(console.error);

module.exports = connectDB;
