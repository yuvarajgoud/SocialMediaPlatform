const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

const jwtSecret = 'secret_key';

const user = require('../models/user.model');


router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));

});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));

});

router.post('/auth/signup', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try {
        const newUser = new user({ username, password, email });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });
        res.status(201).send({ message: "User registered successfully", user: newUser, token: token });
    } catch (error) {
        res.status(400).send({ message: "Error registering user", error: error.message });
    }
});

router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "No token provided" });
    }

    try {
        const foundUser = await user.findOne({ username: username });
        if (!foundUser) {
            return res.status(404).send({ message: "User not found" });
        }


        if (foundUser.password !== password) {
            return res.status(401).send({ message: "Invalid credentials" });
        }


        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: "Invalid token" });
            }

            if (decoded.userId !== foundUser._id.toString()) {
                return res.status(403).send({ message: "Token does not match user details" });
            }
            res.send({ message: "User and token verified successfully" });
        });
    } catch (error) {
        res.status(500).send({ message: "Error verifying user", error: error.message });
    }
});


router.get('/users/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const userProfile = await user.findOne({ username: username });
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
        const updatedUser = await user.findOneAndUpdate({ username: username }, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Error updating user profile", error: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await user.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving users", error: error.message });
    }
});

module.exports = router;

