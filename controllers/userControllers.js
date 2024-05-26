const { Thought, User } = require('../models');
const req = require('express').request;
// get all users
const userController = {
    getAllUsers(req, res) {
        User.find()
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'unable to get all users' });
        });
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.status(400).json({ message: 'unable to create user' });
    });
},
    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({
            _id: req.params.userId }, 
            { $set: req.body }, 
            { runValidators: true, new: true }
        ).then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: 'unable to update user' });
        });
    },
    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: 'unable to delete user' });
        });
    },
    // get user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: 'unable to get user by id' });
    });
    },

    //add friend
    addFriend(req, res) {
        const userId = req.params.userId;
        const friendId = req.body.friendId;

        User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true, runValidators: true }
        )
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(updatedUser);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },
    // remove friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true,
                new: true }
        ).then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch((err) => res.json(err));
    }
};

module.exports = userController;
