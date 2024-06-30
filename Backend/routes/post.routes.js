const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_key';
const post = require('../models/post.model');
const multer = require('multer');
const { findById, findByIdAndUpdate } = require('../models/User.model');

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
// router.get('/:id', async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const searchedPost = await post.findById(postId);
//         if (!searchedPost) {
//             return res.status(404).json({ message: 'Post not found' });
//         }
//         res.json(searchedPost);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/:userId',async (req,res)=>{
    const userId = req.params.userId;
    const posts = await post.find({userId : userId})
    // if(posts.length == 0){
    //     res.json({msg : "No posts to show"});
    // } else {
        res.json(posts);
    
})

router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;
    const updatedPost = { title, content };
    // if (!req.userDoc) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    try {
        const updatedPost1 =  await post.findOneAndUpdate({_id : postId}, updatedPost,{new:true});
        res.status(200).json(updatedPost1);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    // if (!req.userDoc) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    try {
        const deletedPost = await post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:postId/like',async (req,res)=>{
    try {
        const _id = req.params.postId;
    
        // Find the post by ID
        let postDetails = await post.findById(_id);
    
        // Ensure the post exists
        if (!postDetails) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        // Increment the likes count
        postDetails.likes += 1;
    
        // Save the updated post
        await postDetails.save();
    
        // Fetch the updated post details
        postDetails = await post.findById(_id);
    
        // Respond with the updated post
        res.json(postDetails);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
})

router.post('/:postId/unlike',async (req,res)=>{
    try {
        const _id = req.params.postId;
    
        // Find the post by ID
        let postDetails = await post.findById(_id);
    
        // Ensure the post exists
        if (!postDetails) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        // Increment the likes count
        postDetails.likes -= 1;
    
        // Save the updated post
        await postDetails.save();
    
        // Fetch the updated post details
        postDetails = await post.findById(_id);
    
        // Respond with the updated post
        res.json(postDetails);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
})

module.exports = router;