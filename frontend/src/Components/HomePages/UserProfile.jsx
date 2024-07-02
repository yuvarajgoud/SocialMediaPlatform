import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import DisplayPost from './DisplayPost'
import { useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function UserProfile() {
  const {username} = useParams();
  console.log(username)
  const [profile,setProfile] = useState({})
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    console.log("Inside useEffect");
    async function fetchData(){
      console.log("Inside fetch Data");
      const url = `http://localhost:3000/api/users/${username}`;
      const response = await axios.get(url)
      setProfile(response.data);
      console.log(response.data);
      //posts
      const res1 = await axios.get(`http://localhost:3000/api/posts/username/${username}`);
      setPosts(res1.data);
      console.log(res1.data)
    }
    fetchData();
  },[])
  console.log(profile)
  console.log(posts);
  return (
    <div className="main-container">
        <Navbar />
        <div className='content-container'>
        <div>
            <div className="profile-container">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="Profile Picture" className="profile-pic" />
              <h2 className="username">{profile.username}</h2>
              <p className="email">{profile.email}</p>
              <p className="bio">{profile.about}</p>
            </div>
        </div>
        <DisplayPost posts={posts}/>
        </div>
      </div>
  )
}

export default UserProfile