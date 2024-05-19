const { Schema, model } = require('mongoose');
// import the date format
const dateFormat = require('../utils/dateFormat');
// import the reaction schema
const reactionSchema = require('./Reaction');
// Schema for the Thought model
const ThoughtSchema = new Schema(
    {
        // thought text validation
        thoughtText: {
            type: String,
            required: 'You need to provide a thought!',
            minlength: 1,
            maxlength: 280
        },
        // date validation
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        // username validation
        username: {
            type: String,
            required: 'You need to provide a username!'
        },
        // reactions array
        reactions: [reactionSchema]
    },
    {
        // virtual to get reaction count on query
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;