const express = require('express');
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment

} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

router.post('/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.put('/:postId', requireSignin, isPoster, updatePost);
router.delete('/:postId', requireSignin, isPoster, deletePost);
router.get('/:postId', singlePost);

router.put('/comment/:postId', requireSignin, comment);
router.put('/uncomment/:postId', requireSignin, uncomment);

router.put('/like/:postId', requireSignin, like);
router.put('/unlike/:postId', requireSignin, unlike);

router.get('/photo/:postId', photo);

router.param('userId', userById);
router.param('postId', postById);

module.exports = router;
