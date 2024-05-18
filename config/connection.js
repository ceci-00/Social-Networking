const mongoose = require('mongoose');
// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
// Export the connection
module.exports = mongoose.connection;