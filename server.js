// Main entry point for the server
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const connectToMongoDB = require('./config/connection');
// Load the environment variables
require('dotenv').config();
// Create the Express app
const app = express();
// Set the port
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// set strictQuery to false
mongoose.set('strictQuery', false);
// Connect to the Mongo DB
connectToMongoDB();
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});
// Start the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`))
;