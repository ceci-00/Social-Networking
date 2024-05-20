const mongoose = require('mongoose');
const { User, Thought } = require('../models');

const userData = [
    {
        username: 'john_doe',
        email: 'john@example.com'
    },
    {
        username: 'jane_smith',
        email: 'jane@example.com'
    },
    
];

const thoughtData = [
    {
        thoughtText: 'Hello, world!',
        username: 'john_doe',
        userID: '1'
    },
    {
        thoughtText: 'I love coding!',
        username: 'jane_smith',
        userID: '2'
    },
];

const seedDatabase = async () => {
    console.log('seeding database');
    await mongoose.connection.dropDatabase();

    const users = await User.insertMany(userData);

    const thoughts = await Thought.insertMany(thoughtData);

    console.log('users and thoughts seeded!');
    process.exit(0);
}

seedDatabase();