// For node implementation

import express from 'express';
const app = express();

const port = process.arbv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use('/api',apiRouter);

// Store conversion
// apiRouter.post('/convert')

// Get history
// apiRouter.post('/history', (req, res) => {
//     history = 
// })