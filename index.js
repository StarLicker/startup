const express = require('express');
const app = express();
require('dotenv').config()
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const DB = require('./database.js');

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

// Take new conversion and store in database
apiRouter.post("/store_conversion", (req, res) => {
  const result = DB.addConversion(req.body);

  // Update user stats in database
  //updateStats(req.body.username);

  res.status(200).json({
    success: true,
    body: JSON.stringify(result)
  });
});

// Store object
apiRouter.post("/store_object", (req, res) => {
  const result = DB.addObject(req.body);

  // Update stats

  res.status(200).json({
    success: true,
    body: JSON.stringify(result)
  });
  
});

// Get all objects
apiRouter.get("/getObjects", (_req, res) => {
  const result = DB.getObjects();

  // Update stats

  res.status(200).json({
    success: true,
    body: JSON.stringify(result)
  });
  
});

// Store pair
apiRouter.post("/store_pair", (req, res) => {
  const result = DB.addPair(req.body);

  // Update stats

  res.status(200).json({
    success: true,
    body: JSON.stringify(result)
  });
});

// Get all pairs
apiRouter.get("/getPairs", (_req, res) => {
  const result = DB.getObjectPairs();

  // Update stats

  res.status(200).json({
    success: true,
    body: JSON.stringify(result)
  });
  
});

// Retrieve user history from database
apiRouter.post("/history", async (req, res) => {
  const history = await DB.getHistory(req.body.username)

  res.status(200).json({
      success: true,
      body: JSON.stringify(history)
    });
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