const express = require('express');
const router = express.Router();
const path = require('path');

const post = require('../models/post.model');

router.get('/', async (req, res) => {
    try {
        const posts = await post.find();
        if (posts.length === 0) {
            res.status(404).json({ message: 'No posts found' });
        } else {

            res.json(posts);
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new post({
        title,
        content,
        author,
        date: new Date()
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Post By ID
router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const searchedPost = await post.findById(postId);
        if (!searchedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(searchedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/:id', async (req, res) => {
    const { title, content, author } = req.body;
    const postId = req.params.id;
    const updatedPost = { title, content, author };
    try {
        await post.findByIdAndUpdate(postId, updatedPost);
        const updatedPost1 = await post.findById(postId);
        res.status(200).json(updatedPost1);
    } catch (err) {
        res.status(5000).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;