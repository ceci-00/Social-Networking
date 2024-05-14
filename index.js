// Main entry point for the server
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// Define the current working directory
const cwd = process.cwd();
// Define the port the server will run on
const PORT = process.env.PORT || 3001;
const app = express();
// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});