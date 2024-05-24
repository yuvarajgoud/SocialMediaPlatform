const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const jwtSecret = 'secret_key';

const Comment = require('../models/comment.model.js');


router.use(bodyParser.json());


function verifyUser(req,res,next){
    const {token} = req.body;
    jwt.verify(token,jwtSecret,{},(err,info)=>{
      if(err){
        req.userDoc = false;
      }
      else{
        req.userDoc = info;
      }
    })
    next();
}



// Routes
router.post('/:postId/comments', verifyUser,async(req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId=req.userDoc.userId;

    if(!userId){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const newComment = new Comment({
      postId,
      userId,
      content,
      date: new Date()
    });

    await newComment.save();

    res.status(201).json(newComment);

  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
});


router.get('/:postId/comments',verifyUser,async(req,res)=>{
    const {postId} = req.params;
    try{
        const comments=await Comment.find({postId: postId});
        if(comments.length === 0){
            res.status(404).json({message:'no comments found'});
        }
        else{
            res.json(comments);
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
})


router.delete(':postId/comments/:commentId',verifyUser,async(req,res)=>{
    try {
        const { postId, commentId } = req.params;
        const userId = req.userDoc.userId;
    
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
        // Find the comment to check if the user is authorized to delete it
        const comment = await Comment.findById(commentId);
    
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
        }
    
        if (comment.userId.toString() !== userId.toString()) {
          return res.status(403).json({ message: 'Forbidden' });
        }
    
        // Delete the comment
        await comment.remove();
    
        res.status(200).json({ message: 'Comment deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
      }
})



module.exports=router;


