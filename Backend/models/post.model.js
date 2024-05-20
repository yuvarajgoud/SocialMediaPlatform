const mongoose = require('mongoose');

// Define a separate schema for the auto-incremented ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

// Define the post schema
const postSchema = new mongoose.Schema({
    _id: { type: Number }, // Custom auto-incremented ID field
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});

// Pre-save hook to auto-increment the _id field
postSchema.pre('save', function (next) {
    const doc = this;
    Counter.findByIdAndUpdate({ _id: 'postId' }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true })
        .then(counter => {
            doc._id = counter.sequence_value;
            next();
        })
        .catch(error => {
            console.error('Error during ID generation:', error);
            next(error);
        });
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
