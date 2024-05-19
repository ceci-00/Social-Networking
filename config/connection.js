const { connect, connection } = require('mongoose');
// select the database to use
const connectionString = 'mongodb://127.0.0.1:27017/thoughtsDB';
// connect to the database
connect(connectionString);

module.exports = connection;