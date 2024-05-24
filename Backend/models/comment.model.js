const mongoose=require("mongoose");

const commentsSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'  // This should match the model name used in mongoose.model() for the Post model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //  This should match the model name used in mongoose.model() for the user model
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Comment=mongoose.model('Comment',commentsSchema);

module.exports=Comment;