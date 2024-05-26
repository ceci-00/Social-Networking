const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
    } = require('../../controllers/thoughtsController');
//api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);
/*
{
    "thoughtText": "What a time to be alive!",
    "username": "john_doe",
    "userID": "1"
}
*/

//api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
/*
{
    "thoughtText": "What a time to be alive!",
    "username": "john_doe",
    "userID": "1"
}
*/
.delete(deleteThought);
//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
//api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
