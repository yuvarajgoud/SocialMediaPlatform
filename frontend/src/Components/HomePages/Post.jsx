import React from 'react';
import './Post.css';
const Post = (post) => {
    return (
    <div className="post-container">
      <div className="post-header">
        <img src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Profile" className="profile-picture" />
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