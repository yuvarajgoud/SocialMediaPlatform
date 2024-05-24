const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const jwtSecret = 'secret_key';

const Post = require('../models/post.model.js');


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

//ROUTES

router.post("/:postId/like",verifyUser,async(req,res)=>{
    const {postId} = req.params;
    
    try{
        const post=await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes=(post.likes || 0)+1;
        await post.save();
        res.status(200).json(post);
    }
    catch(er){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post("/:postId/unlike",verifyUser,async(req,res)=>{
    const {postId} = req.params;
    
    try{
        const post=await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes=Math.max((post.likes || 0) - 1, 0);
        await post.save();
        res.status(200).json(post);
    }
    catch(er){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports=router;