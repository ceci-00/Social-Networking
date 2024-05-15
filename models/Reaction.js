const { Schema } = require('mongoose');
// create the reaction schema
const reactionSchema = new Schema(
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

module.exports = reactionSchema;