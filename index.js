'use strict';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// create a connection on port
const app = express(),
  PORT = process.env.PORT || 3223; // creating express server
// setup server port
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  console.log('root route');
  res.send('WEBHOOK Server running');
});

app.get('*', (req, res) => {
  return res.status(404).json();
});
// Creates the endpoint for webhook
app.post('/webhook', (req, res) => {
  let body = req.body;
  console.log(body);
  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach((entry) => {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    console.log(req.body);
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = 'EXAMPLE_TOKEN';

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.listen(PORT, () => {
  console.log(`WEBHOOK is listening on ${PORT}`);
});

export default app;
