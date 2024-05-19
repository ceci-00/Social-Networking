const { create } = require('domain');
const { Thought, User } = require('../models');
const { run } = require('node:test');
const req = require('express').request;
// get all users
const userController = {
    getAllUsers(req, res) {
        User.find()
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create user
    createUser({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id }, 
            { $set: req.body }, 
            { runValidators: true, new: true }
        ).then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch((err) => res.status(400).json(err));
    },
    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch((err) => res.status(400).json(err));
    },
    // get user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch((err) => res.status(400).json(err));
    },

    //add friend
    addFriend(req, res) {
        console.log('You are adding a friend!');
        console.log(req.body);
        User.findOneAndUpdate(
            // find the user by id
            { _id: req.params.userId },
            // add the friend's id to the user's friends array
            { $push: { friends: req.params.friendId } },
            { runValidators: true,
                new: true }
                // return the updated user
        ).then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch((err) => res.json(err));
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
