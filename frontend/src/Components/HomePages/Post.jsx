import React from 'react';
import './Post.css';
const Post = ({ username, title, content }) => {
    return (
        <div className="post">
            <div className="post-header">
                <h4 className="post-username">Username: {username}</h4>
            </div>
            <div className="post-body">
                <h2 className="post-title">Title: {title}</h2>
                <p className="post-content">Content: {content}</p>
            </div>
        </div>
    );
};
export default Post;