import React from 'react';
import './Post.css';
const Post = (post) => {
    return (
        <div className="post-container">
      <div className="post-header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8iItIBWxiC4qdupjgBi6doBOe8pudzJ2tNZ8DcsvDQ&s" alt="Profile" className="profile-picture" />
        <span className="username">{post.username}</span>
      </div>
      <div className="post-image-container">
        <img src={`http://localhost:3000/uploads/${post.imageUrl}`} alt="Post" className="post-image" />
      </div>
      <div className="post-info">
        <div className="likes">
          <span className="like-icon">❤️</span>
          <span className="like-count">{post.likes} likes</span>
        </div>
        <div className="post-title">{post.title}</div>
        <div className="post-caption">{post.content}</div>
      </div>
    </div>
    );
};
export default Post;