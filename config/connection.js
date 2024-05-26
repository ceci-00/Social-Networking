const mongoose = require('mongoose');
require('dotenv').config();
// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-networking', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = connectToMongoDB;