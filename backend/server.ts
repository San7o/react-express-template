/*
 *   File: app.ts 
 *
 *   Purpose: this file contains the main code for the back-end server 
 *
 */ 

// Express
import express from 'express';

// Routes
import greetRouter from './routes/greetRoutes';

// Get variables from .env file
require('dotenv').config();

const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 3001;
 

// ------------ SAME ORIGIN POLICY  -------------
//
// We need to disable Same Origin Policy since the 
// frontend and the backend run on different servers,
// the frontend must send requests to a server that 
// is not itself, breaking the SOP
//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });


// ---- CORS -----
// Implementing a whitelist with CORS to secure that only 
// certain addresses on a whitelit can access the api
var cors = require('cors');

var whitelist = [ 'http://localhost:3002' ]
var corsOptions = {
  origin: function (origin, callback) {
    // Cheeck if the origin is in the whitelist or there is no origin (server-to-server)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors(corsOptions));

// ------------------ ROUTES ------------------

app.use("/api/greet", greetRouter);


// Run server
app.listen(port, () => {
  return console.log(`Express is listening at http://127.0.0.1:${port}`);
});
