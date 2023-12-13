const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config()
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const DB = require('./database.js');
let un = "";

// Setting up openai using apikey
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//JSON body parsing and cookie parsing using built-in middleware
app.use(express.json());
app.use(cookieParser());

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

apiRouter.post("/auth/signUp", async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = DB.createUser(req.body.username, req.body.password);

    // Set cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

apiRouter.post("/auth/login", async (res, req) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrpyt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }

  res.status(401).send({ msg: "Unauthorized" });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.post("/getStats", async (req, res) => {
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

secureApiRouter.get("/getObjectHighScores", async (_req, res) => {
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
secureApiRouter.post("/store_conversion", async (req, res) => {
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
secureApiRouter.post("/store_object", async (req, res) => {
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
secureApiRouter.get("/getObjects", async (_req, res) => {
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
secureApiRouter.post("/store_pair", async (req, res) => {
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
secureApiRouter.get("/getPairs", async (_req, res) => {
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
secureApiRouter.post("/history", async (req, res) => {
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
secureApiRouter.post("/convert", async (req, res) => {
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

// set AuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});