const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_key';
const post = require('../models/post.model');
const comment = require('../models/comment.model');
const mongoose = require('mongoose');
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
        res.json(posts);
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

router.get('/username/:username',async (req,res)=>{
  const username = req.params.username;
  const posts = await post.find({username : username})
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

// Like Endpoints

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

// Comment End Points

// Route to add a comment to a specific post
router.post('/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { userId, content ,username} = req.body;
  
    try {
      const postDetails = await post.findById(postId);
  
      if (!postDetails) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Add the new comment to the comments array
      const newComment = new comment({
        userId,
        content,
        username,
        postId
      })
      newComment.save();
      console.log(newComment);
      postDetails.comments.push(newComment);
  
      // Save the post with the new comment
      const updatedPost = await postDetails.save();

      const comments = await comment.find({postId : postId});
      res.status(201).json(comments);

    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // Route to get all comments of a specific post
router.get('/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const comments = await comment.find({postId : postId}); // Fetch only the comments
  
      if (!comments) {
        return res.status(404).json({ message: 'No comments on this post' });
      }
  
      res.json(comments); // Return the comments array
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Route to delete a comment from a specific post
  router.delete('/:postId/comments/:commentId', async (req, res) => {
    const { postId, commentId } = req.params;
  
    try {
      // Fetch the post document
      const postDetails = await post.findById(postId);
  
      if (!postDetails) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Find the index of the comment to remove
      const commentIndex = postDetails.comments.findIndex(comment => comment._id.toString() === commentId);
  
      if (commentIndex === -1) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Remove the comment from the array
      postDetails.comments.splice(commentIndex, 1);
  
      // Save the updated post document
      await postDetails.save();

      //delete comment
      const deletedComment = await comment.findOneAndDelete({_id : commentId});

      const comments = await comment.find({postId : postId});
      res.status(201).json(comments);
      
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
[
    {
        "_id": "667e44d2b00724ce77625754",
        "userId": "66503938995545197766ce88",
        "title": "Image",
        "username": "Tharun",
        "content": "This is my first post",
        "imageUrl": "1719551186146.jpg",
        "likes": 1,
        "comments": [],
        "createdAt": "2024-06-28T05:06:26.342Z",
        "__v": 0
    },
    {
        "_id": "667e536eb00724ce776257a2",
        "userId": "6659e2270ef1ddb3a41bd1fc",
        "title": "Hii Everyone",
        "username": "VamshiKrishna",
        "content": "New to the community",
        "imageUrl": "1719554926170.jpg",
        "likes": 3,
        "comments": [],
        "createdAt": "2024-06-28T06:08:46.328Z",
        "__v": 0
    },
    {
        "_id": "668118bd4a91737e582040de",
        "userId": "6650106d58543dfecd48fc43",
        "title": "Hii... Everyone",
        "username": "Yuvaraj Goud",
        "content": "This is my first Post",
        "imageUrl": "1719736509757.jpg",
        "likes": 0,
        "comments": [],
        "createdAt": "2024-06-30T08:35:09.783Z",
        "__v": 0
    },
    {
        "_id": "6681f49a5d5af790cd9b8589",
        "userId": "6651f1ad8dedc50d3c39f1b8",
        "title": "New User",
        "username": "Jithendar",
        "content": "Hello This is My first post",
        "imageUrl": "1719792794408.jpg",
        "likes": 0,
        "comments": [],
        "createdAt": "2024-07-01T00:13:14.505Z",
        "__v": 0
    }
]