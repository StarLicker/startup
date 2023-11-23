const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('startup');
const collection = db.collection('history_test');

// Test that you can connect to the database
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// Add a user's conversion to their history
async function addConversion(conversion) {
  const result = await collection.insertOne(conversion);
  return result;
}

// Grab conversion history for a specific user
async function getHistory() {

}

// Grab and sort high scores for number of unique pairs
async function getHighPairScores() {

}

// Grab and sort high scores for number of unique objects
async function getHighObjectScores() {

}

module.exports = { addConversion, getHistory, getHighPairScores, getHighObjectScores };

// const test_conversion = {
//   username: "test",
//   date: "11/23/2023",
//   objectOne: "Apple",
//   objectTwo: "Saturn",
//   measurementType: "Volume",
//   result: "A lot of apples will fit inside Pluto!"
// };

// addConversion(test_conversion).catch(console.error);