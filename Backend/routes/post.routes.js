const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_key';
const post = require('../models/post.model');
const multer = require('multer')

function verifyUser(req, res, next) {
    const [bearer, token] =req.headers['authorization'].split(' ');
    jwt.verify(token, jwtSecret, (err, info) => {
        if (err) {
            req.userDoc = false
        }
        else {
            req.userDoc = info;
        }
        next();
    })
}

router.get('/', async (req, res) => {
    try {
        const posts = await post.find();
        // if (!posts.length) {
        //     res.status(404).json({ message: 'No posts found' });
        // } else {
            res.json(posts);
        // }
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    },
  });
    // Initialize upload variable
const upload = multer({ storage: storage });

router.post('/', verifyUser,upload.single('image'), async (req, res) => {
    const { title, content} = req.body;
    console.log(req.file.path)
    const user = req.userDoc;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const newPost = new post({
        title,
        content,
        date: new Date(),
        userId: user.userId,
        username : user.username,
        imageUrl :  req.file.filename
    });

    try {

        await newPost.save();
        res.status(201).json({newPost:newPost});
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
router.put('/:id', verifyUser, async (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;
    const updatedPost = { title, content };
    if (!req.userDoc) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        await post.findByIdAndUpdate(postId, updatedPost);
        const updatedPost1 = await post.findById(postId);
        res.status(200).json(updatedPost1);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', verifyUser, async (req, res) => {
    const postId = req.params.id;
    if (!req.userDoc) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
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