const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

//JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post("/convert", async (req, res) => {
  const type = req.body.measurementType;
  const objectOne = req.body.obj1;
  const objectTwo = req.body.obj2;

  const prompt = "Based on " + type + ", how many " + objectOne + " would fit within " + objectTwo + "?";

  try {
    return res.status(200).json({
      success: true,
      message: prompt
    });
  } catch (error) {
    console.log(error.message);
    return res.status(300).json({
      success: false,
      message: "Error occurred during OpenAi processing. Please try again later."
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});