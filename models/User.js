const { Schema, Types, model } = require('mongoose');
const thoughtSchema = require('./Thought');
// create the User schema
const UserSchema = new Schema(
    {
        // username validation
        username: {
            type: String,
            unique: true,
            required: 'You need to provide a username!',
            trim: true 
        },
        // email validation
        email: {
            type: String,
            required: 'You need to provide an email!',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        // data from the Thought model
        thoughts: [thoughtSchema],
        // gather the friends of the user
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        // virtual to get friend count on query
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
// create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;