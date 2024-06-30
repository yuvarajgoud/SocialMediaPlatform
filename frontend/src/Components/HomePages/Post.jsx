import React from 'react';
import { useState } from 'react';
import './Post.css';
import axios from 'axios';
const Post = (post) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [liked,setLiked] = useState(false)
  const [likesCount,setLikesCount] = useState(post.likes)
  const [edit,setEdit] = useState(false)
  const [editPost,setEditPost] = useState(post)

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const onLiked = async ()=>{
    console.log(post)
    if(liked){
      const res = await axios.post(`http://localhost:3000/api/posts/${post.postId}/unlike`)
      const postDetails = res.data;
      setLikesCount(postDetails.likes)
      setLiked(false);
    } else {
      const res = await axios.post(`http://localhost:3000/api/posts/${post.postId}/like`)
      const postDetails = res.data;
      setLikesCount(postDetails.likes)
      setLiked(true);
    }
  }

  function onSave(e){
    e.preventDefault()
    post.editPost(post,editPost)
    setEdit(false);
    setDropdownOpen(false);
  }
    return (
    <>
    <div className="post-container">
      <div className='header'>
        <div className='post-header'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="Profile" className="profile-picture" />
          <span className="username">{post.username}</span>
        </div>
        {post.flag ? 
        (<div className='options'>
          <button onClick={toggleDropdown}>⋮</button>
          {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => setEdit(true)}>Edit</div>
                <div className="dropdown-item" onClick={() => post.deletePost(post)}>Delete</div>
              </div>
            )}
        </div>) :
          (<div></div>)}
      </div>
      <div className="post-image-container">
        <img src={`http://localhost:3000/uploads/${post.imageUrl}`} alt="Post" className="post-image" />
      </div>
      <div className="post-info">
        <div className="likes">
          <button className="like-icon" onClick={onLiked}>{liked ? '♥':'♡'}</button>
          <span className="like-count">{likesCount} likes</span>
        </div>
        <div className="post-title">{post.title}</div>
        <div className="post-caption">{post.content}</div>
      </div>
    </div>
    {edit &&
      (<div className="create-post-container">
        <form className="create-post-form">
          <h2>Edit Post</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={editPost.title}
              onChange={(e) => setEditPost({...editPost,title:e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="caption">Content</label>
            <textarea
              id="caption"
              value={editPost.content}
              onChange={(e) => setEditPost({...editPost,content:e.target.value})}
              required
            />
          </div>
          <button className="create-post-button" onClick={onSave}>Save Post</button>
        </form>
      </div>)}
      </>
    );
};
export default Post;