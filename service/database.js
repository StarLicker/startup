const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('startup');
const history_collection = db.collection('history_test');
const stat_collection = db.collection('stats');
const pair_collection = db.collection('object_pairs');
const object_collection = db.collection('unique_objects');
const user_collection = db.collection('user');

// Test that you can connect to the database
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return user_collection.findOne({ username: username });
}

function getUserByToken(token) {
  return user_collection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash password before putting into database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await user_collection.insertOne(user);

  initializeStats(username);

  return user;
}

// Add a user's conversion to their history
async function addConversion(conversion) {
  const result = await history_collection.insertOne(conversion);
  return result;
}

// Initialize user stats
async function initializeStats(username) {
  stats = {
    unique_objects: 0,
    unique_pairs: 0,
    num_conversions: 0
  };
  new_user = {
    username: username,
    stats: stats
  };
  const result = await stat_collection.insertOne(new_user);
  return result;
}

// Update user stats
async function updateStats(username, stats) {
  const result = await stat_collection.replaceOne({username: username}, stats);
  return result;
}

// Retrieve user stats
function getStats(username) {
  const query = { username: username };
  const cursor = stat_collection.find(query);
  return cursor.toArray();
}

// Grab conversion history for a specific user
function getHistory(username) {
  const query = { username: username };
  const cursor = history_collection.find(query);
  return cursor.toArray();
}

// Grab all unique object pairs
function getObjectPairs() {
  const cursor = pair_collection.find({});
  return cursor.toArray();
}

// Add a unique pair
async function addObjectPair(pair) {
  const result = await pair_collection.insertOne(pair);
  return result;
}

// Grab all unique objects
function getObjects() {
  const cursor = object_collection.find({});
  return cursor.toArray();
}

// Add a unique object
async function addObject(object) {
  const result = await object_collection.insertOne(object);
  return result;
}

// Grab and sort high scores for number of unique pairs
async function getHighPairScores() {
  const cursor = stat_collection.find({}).sort({"stats.unique_pairs":-1}).limit(5);
  return cursor.toArray();
}

// Grab and sort high scores for number of unique objects
async function getHighObjectScores() {
  // const result = await stat_collection.aggregate([
  //   {
  //     $sort: {
  //       unique_objects: -1
  //     }
  //   },
  //   {
  //     $limit: 10
  //   }
  // ])

  const cursor = stat_collection.find({}).sort({"stats.unique_objects":-1}).limit(5);
  return await cursor.toArray();
}

module.exports = { getUser, getUserByToken, createUser, initializeStats, addConversion, updateStats, getStats, getObjectPairs, 
                    addObjectPair, getObjects, addObject, getHistory, getHighPairScores, 
                    getHighObjectScores };
