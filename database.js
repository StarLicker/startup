const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('startup');
const history_collection = db.collection('history_test');
const stat_collection = db.collection('stats');
const pair_collection = db.collection('object_pairs');
const object_collection = db.collection('objects');

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
  const result = await history_collection.insertOne(conversion);
  return result;
}

// Update user stats
async function updateStats(username, stats) {
  const result = await stat_collection.update({username: username}, stats);
  return result;
}

// Retrieve user stats
async function getStats(username) {
  const query = { username: username };
  const cursor = stat_collection.find(query);
  return cursor.toArray();
}

// Grab conversion history for a specific user
async function getHistory(username) {
  const query = { username: username };
  const cursor = history_collection.find(query);
  return cursor.toArray();
}

// Grab all unique object pairs
async function getObjectPairs() {
  const cursor = pair_collection.find();
  return cursor.toArray();
}

// Add a unique pair
async function addObjectPair(pair) {
  const result = await pair_collection.update(pair);
  return result;
}

// Grab all unique objects
async function getObjects() {
  const cursor = object_collection.find();
  return cursor.toArray();
}

// Add a unique object
async function addObject(object) {
  const result = object_collection.update(object);
  return result;
}

// Grab and sort high scores for number of unique pairs
async function getHighPairScores() {

}

// Grab and sort high scores for number of unique objects
async function getHighObjectScores() {

}

module.exports = { addConversion, updateStats, getStats, getObjectPairs, 
                    addObjectPair, getObjects, addObject, getHistory, getHighPairScores, 
                    getHighObjectScores };

// const test_conversion = {
//   username: "test",
//   date: "11/23/2023",
//   objectOne: "Apple",
//   objectTwo: "Saturn",
//   measurementType: "Volume",
//   result: "A lot of apples will fit inside Pluto!"
// };

// addConversion(test_conversion).catch(console.error);