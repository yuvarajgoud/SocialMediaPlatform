const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwtSecret = 'secret_key';

const User = require('../models/User.model');

router.use(bodyParser.json());


router.post('/auth/signup', async (req, res) => {
    
    const { username, password, email } = req.body;

    // If Any field id given Empty
    if (!username || !password || !email) {
        return res.status(400).send({ message: "All fields are required" });
    }
    
    // If username already exists
    const user = await User.findOne({username:username})
    if(user){
        res.status(400).json({ success: false, message: "Username already exists" });
        return;
    }
    
    try {
        const newUser = new User({ username, password, email });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully", user: newUser});
        return;
    } catch (error) {
        res.status(400).json({ success: false, message: "Error registering user", error: error.message });
        return;
    }
});

router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Finding user in the database
        const foundUser = await User.findOne({ username: username });

        // User Not Found
        if (!foundUser) {
            return res.status(404).send({ success:false ,message: "User not found" });
        }

        // Wrong Password
        if (foundUser.password !== password) {
            return res.status(401).send({ success:false , message: "Invalid credentials" });
        }

        // Generate a new token
        const newToken = jwt.sign({ userId: foundUser._id,username :foundUser.username }, jwtSecret);
        res.send({ success:true ,message: "Login successful",token:newToken,userDoc : foundUser});

    } catch (error) {
        res.status(500).send({ success:false,message: "Error during login", error: error.message });
    }
});

function verifyUser(req,res,next){
    const {token} = req.body;
    jwt.verify(token,jwtSecret,{},(err,info)=>{
      if(err){
        req.userDoc = false
      }else {
        req.userDoc = info;
      }
    })
    next()
}


router.post('/auth/checkLogin',verifyUser,(req,res)=>{
    res.json({userDoc : req.userDoc})
})

router.get('/auth/logout',(req,res)=>{
    res.json({token : ""})
})

router.get('/users/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const userProfile = await User.findOne({ username: username });
        if (!userProfile) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(userProfile);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving user profile", error: error.message });
    }
});


router.put('/users/:username', async (req, res) => {
    const username = req.params.username;
    const updates = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({ username: username }, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Error updating user profile", error: error.message });
    }
});

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname); // Append timestamp to the file name
    },
  });
    // Initialize upload variable
const upload = multer({ storage: storage });

router.post('/users/image/:username',upload.single('image'),async (req,res)=>{
    const username = req.params.username;
    const fileName = req.file.filename;
    try {
        const updatedUser = await User.findOneAndUpdate({ username: username }, {image:fileName}, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Error updating user profile", error: error.message });
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving users", error: error.message });
    }
});

module.exports = router;