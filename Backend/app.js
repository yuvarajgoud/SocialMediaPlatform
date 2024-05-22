const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const port = 3000;
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const app = express();
const path = require('path');

app.use(express.json());



mongoose.connect(`mongodb+srv://yuvarajgoud:${process.env.MONGO_PASSWORD}@cluster0.max3jj3.mongodb.net/`)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log(err)
    })

app.get('/', (req, res) => {
    res.send('This is home page for Social Media Platform');
    console.log('listening on port 3000');
});

//FOR USER SIGNUP AND LOGIN
app.use('/api', userRouter);
//FOR POSTS
app.use('/api/posts', postRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});