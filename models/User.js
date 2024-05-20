const { Schema, model } = require('mongoose');
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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
             'Please enter a valid e-mail address']
        },
        // data from the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // gather the friends of the user
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        // virtual to get total count of friends
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