// Main entry point for the server
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// Define the port the server will run on
const PORT = 3001;
//initialize express app
const app = express();
// set up middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});