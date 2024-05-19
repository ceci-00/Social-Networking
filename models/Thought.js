const { Schema, model } = require('mongoose');
// import the date format
const dateFormat = require('../utils/dateFormat');

// Schema for the Reaction model
const ReactionSchema = new Schema(
    {
        // reactionId validation
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // reaction body validation
        reactionBody: {
            type: String,
            required: 'You need to provide a reaction!',
            maxlength: 280
        },
        // username validation
        username: {
            type: String,
            required: 'You need to provide a username!'
        },
        // date validation
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);
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
        reactions: [ReactionSchema]
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