const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userControllers');

//api/users
router.route('/')
.get(getAllUsers)
.post(createUser);
/*
{
    "username": "john_doe",
    "email": "jtothed@gmail.com"
}
*/

//api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    /*
{
    "username": "john_doe",
    "email": "jtothed@gmail.com"
}
*/
    .delete(deleteUser);
//api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    /*
{
	"friendId": "664fd9b6b497d7ee54d7efeb" // friend's id
}
*/
    .delete(removeFriend);

module.exports = router;