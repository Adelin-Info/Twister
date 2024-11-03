const express = require("express");
const router = express.Router();
const authController = require('./controllers/auth.js');
const userController = require('./controllers/user.js');
const tweetController = require('./controllers/tweet.js');
const commentController = require('./controllers/comment.js');
const friendController = require('./controllers/friend.js');


//Utilisateur
router.get('/user', userController.getAllUsers);
router.get('/user/:userid', userController.getUserInfo);
router.delete('/user/:userid', userController.deleteUser);

//Authentification
router.post('/auth/signup', authController.signUp);
router.post('/auth/signin', authController.signIn);
router.get('/auth/signout', authController.signOut);

//Tweet
router.post('/tweet', tweetController.createTweet);
router.get('/tweet', tweetController.getAllTweets);
router.put('/tweet/:tweetid',  tweetController.updateTweet);
router.delete('/tweet/:tweetid', tweetController.deleteTweet);
router.patch('/tweet/like/:tweetid', tweetController.likeTweet);
router.patch('/tweet/unlike/:tweetid', tweetController.unlikeTweet);

//Commentaire
router.patch('/comment/:tweetid', commentController.createComment);
router.patch('/comment/update/:tweetid', commentController.updateComment);
router.patch('/comment/delete/:tweetid', commentController.deleteComment);

//Ami
router.patch('/friend/follow/:userid', friendController.followUser); 
router.patch('/friend/unfollow/:userid', friendController.unfollowUser);

module.exports = router;