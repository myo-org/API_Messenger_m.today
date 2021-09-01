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
  res.send('WEBHOOK server is running');
});
app.get('/greeting', (req, res) => {
  res.send('Hello World');
});

app.get('*', (req, res) => {
  return res.status(404).json();
});
app.listen(PORT, () => {
  console.log(`WEBHOOK is listening on ${PORT}`);
});

export default app;

// "localhost:8080/webhook?hub.verify_token=EXAMPLE_TOKEN&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
