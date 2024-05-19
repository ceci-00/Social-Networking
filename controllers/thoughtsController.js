const { Thought, User } = require('../models');
const { db } = require('../models/User');
// get all thoughts
const thoughtsController = {
    getAllThoughts(req, res) {
        Thought.find().then((dbThoughtData) => res.json(dbThoughtData)).catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}
// create thought
createThought(req, res) {
    Thought.create(req.body).then(({ _id }) => {
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
}

// get thought by id
getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
}

// update thought by id
updateThought(req, res) {
    Thought.findOneAndUpdate({
         _id: req.params.id }, 
         { $set: req.body }, 
         { runValidators: true, new: true }
         ).then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(404).json({ message: 'No thought found with this id!' });
                 return;
             }
             res.json(dbThoughtData);
         })
            .catch(err => res.status(400).json(err));
}
// delete thought
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        return User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
}

// add reaction
addReaction(req, res) {
    console.log('You are adding a reaction!');
    console.log(req.body);
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
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
}

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

module.exports = thoughtsController;