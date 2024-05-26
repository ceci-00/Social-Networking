const { Thought, User } = require('../models');
const { db } = require('../models/User');
// get all thoughts
const thoughtsController = {
    getAllThoughts(req, res) {
        console.log('You are getting all thoughts!');
        Thought.find()
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(dbThoughtData);
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // get thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            console.log('Thought updated!');
            res.json(dbThoughtData);
        })
            .catch(err => res.status(400).json(err));
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({
             _id: req.params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }

                return User.findOneAndUpdate(
                    { _id: dbThoughtData.userId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought deleted successfully!' });
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },

    // add reaction
    addReaction(req, res) {
        console.log('You are adding a reaction!');
        console.log(req.body);
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body, username } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove reaction
    removeReaction(req, res) {
        console.log(req.params);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;