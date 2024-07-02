

import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Profile.css'; // Import the CSS file
import Navbar from './Navbar';
import DisplayProfilePosts from './DisplayProfilePosts';

const Profile = () => {
  const [profile,setProfile] = useState({})
  const [editProfile,setEditProfile] = useState(false);
  let username = ""
  const [uname,setUname] = useState("");
  const [userId,setUserId] = useState("")
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    async function getUsername(){
      const res = await axios.post("http://localhost:3000/api/auth/checkLogin",{
        token:localStorage.getItem('token')
      });
      const user = res.data.userDoc;
      username = user.username
      setUname(username)
      setUserId(user.userId);
      const url = `http://localhost:3000/api/users/${username}`;
      const response = await axios.get(url)
      setProfile(response.data)

      //posts
      const res1 = await axios.get(`http://localhost:3000/api/posts/${user.userId}`)
      setPosts(res1.data)
      console.log(res1.data)
    }
    getUsername();
  },[editProfile])

  async function saveEdits(e){
    e.preventDefault()
    const url = `http://localhost:3000/api/users/${uname}`;
    const res = await axios.put(url,profile)
    setProfile(res.data);
    setEditProfile(false);
  }

  async function deletePost(post){
    const res = await axios.delete(`http://localhost:3000/api/posts/${post.postId}`)
    if(res.status === 200){
      const updatedPosts = posts.filter(post => post._id!=res.data._id);
      setPosts(updatedPosts)
      alert("Post Deleted Succesfully");
    } else {
      alert("Post Cannot be deleted")
    }
  }
  async function editPost(post,newPost){
    const res = await axios.put(`http://localhost:3000/api/posts/${post.postId}`,{
      title : newPost.title,
      content : newPost.content
    })
    if(res.status === 200){
      let updatedPosts = posts.filter(post => post._id!=res.data._id);
      updatedPosts = [...updatedPosts,newPost]
      setPosts(updatedPosts)
      alert("Post Edited Succesfully");
    } else {
      alert("Post Cannot be Edited")
    }
  }

  return (
    <div className="main-container">
        <Navbar />
        <div className='content-container'>
        {editProfile ?
        (<div className="create-post-container">
          <form className="create-post-form" >
            <h2>Edit Your Profile</h2>
            <div className="form-group">
              <label htmlFor="title">About</label>
              <input
                type="text"
                id="title"
                value={profile.about}
                onChange={(e) => setProfile({...profile,about:e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="caption">Email</label>
              <input
                id="caption"
                value={profile.email}
                onChange={(e) => setProfile({...profile,email:e.target.value})}
                required
              />
            </div>
            <button className="create-post-button" onClick={saveEdits}>Save</button>
          </form>
        </div>)
        :
        (<><div>
            <div className="profile-container">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="Profile Picture" className="profile-pic" />
              <h2 className="username">{profile.username}</h2>
              <p className="email">{profile.email}</p>
              <p className="bio">{profile.about}</p>
              <button className="edit-button" onClick={()=>setEditProfile(true)}>Edit Profile</button>
            </div>
        </div>
        <DisplayProfilePosts posts ={posts}
                             deletePost = {deletePost}
                             editPost = {editPost}/>
        </>
        )}
        </div>
      </div>
  );
};

export default Profile;