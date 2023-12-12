const express = require('express');
const app = express();
require('dotenv').config()
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const DB = require('./database.js');
let un = "";

// Setting up openai using apikey
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);

// Create new stats entry for user
apiRouter.post("/createStats", (req, res) => {
  try {
    const result = DB.initializeStats(req.body.username);

    res.status(200).json({
      success: true,
      body: JSON.stringify(result)
    });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while inserting into database."
    });
  }
});

apiRouter.post("/getStats", async (req, res) => {
  try {
    const stats = await DB.getStats(req.body.username);
    
    res.status(200).json({
      success: true,
      body: JSON.stringify(stats[0])
    });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while accessing database."
    });
  }
});

apiRouter.get("/getObjectHighScores", async (_req, res) => {
  try {
    const results = await DB.getHighObjectScores();

    res.status(200).json({
      success: true,
      body: JSON.stringify(results)
    });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while accessing database."
    });
  }
})

// Take new conversion and store in database
apiRouter.post("/store_conversion", async (req, res) => {
  un = req.body.username;
  try {
    const result = DB.addConversion(req.body);

    // Update user stats in database
    let stats = await DB.getStats(req.body.username);
    stats[0].stats.num_conversions = await stats[0].stats.num_conversions + 1;

    const new_stats = {
      username: req.body.username,
      stats: stats[0].stats
    };

    await DB.updateStats(req.body.username, new_stats);
  
    res.status(200).json({
      success: true,
      body: JSON.stringify(result)
    });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while inserting into database."
    });
  }
});

// Store object
apiRouter.post("/store_object", async (req, res) => {
  try {
    const result = DB.addObject(req.body);

      // Update user stats in database
      let stats = await DB.getStats(un);
      stats[0].stats.unique_objects = await stats[0].stats.unique_objects + 1;
  
      const new_stats = {
        username: un,
        stats: stats[0].stats
      };
  
      await DB.updateStats(un, new_stats);
  
    res.status(200).json({
      success: true,
      body: JSON.stringify(result)
    });
  } catch {
    const result = DB.addObject(req.body);

    res.status(500).json({
      success: false,
      body: "Error while inserting into database."
    });
  }
});

// Get all objects
apiRouter.get("/getObjects", async (_req, res) => {
  try {
    const result = await DB.getObjects();
  
    res.status(200).json({
      success: true,
      body: JSON.stringify(result)
    });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while retrieving from database."
    });
  }
});

// Store pair
apiRouter.post("/store_pair", async (req, res) => {
  try {
    const result = DB.addObjectPair(req.body);

    // Update user stats in database
    let stats = await DB.getStats(un);
    stats[0].stats.unique_pairs = await stats[0].stats.unique_pairs + 1;

    const new_stats = {
      username: un,
      stats: stats[0].stats
    };

    await DB.updateStats(un, new_stats);
  
    res.status(200).json({
      success: true,
      body: JSON.stringify(result)
    });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while inserting into database."
    });
  }
});

// Get all pairs
apiRouter.get("/getPairs", async (_req, res) => {
  try {
    const result = await DB.getObjectPairs();

    // Update stats

    res.status(200).json({
      success: true,
      body: JSON.stringify(result)
    });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while retrieving from database."
    });
  }
});

// Retrieve user history from database
apiRouter.post("/history", async (req, res) => {
  try {
    const history = await DB.getHistory(req.body.username)

    res.status(200).json({
        success: true,
        body: JSON.stringify(history)
      });
  } catch {
    res.status(500).json({
      success: false,
      body: "Error while retrieving from database."
    });
  }
});

// Take convert request and send to openai endpoint
apiRouter.post("/convert", async (req, res) => {
  const type = req.body.type;
  const objectOne = req.body.obj1;
  const objectTwo = req.body.obj2;

  const prompt = "Based on " + type + ", estimate how many average " + objectOne + " would fit within a(n) average " + objectTwo + "?";

  try {
    // Connect to openai endpoint. Select model and provide prompt
    // See https://platform.openai.com/playground?mode=chat on how to generate code
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 600,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Grab the first response
    const completion = response.choices[0].message.content;

    // Return response and success code
    return res.status(200).json({
      success: true,
      body: completion
    });

  } catch (error) {
    console.log(error.message);
    return res.status(300).json({
      success: false,
      body: "Error occurred during OpenAi processing. Please try again later."
    });
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});