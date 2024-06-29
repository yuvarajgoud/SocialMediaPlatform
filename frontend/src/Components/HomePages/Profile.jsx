

import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Profile.css'; // Import the CSS file
import Navbar from './Navbar';

const Profile = () => {
  const [profile,setProfile] = useState({})
  const [editProfile,setEditProfile] = useState(false);
  let username = ""
  const [uname,setUname] = useState("");
  useEffect(()=>{
    async function getUsername(){
      const res = await axios.post("http://localhost:3000/api/auth/checkLogin",{
        token:localStorage.getItem('token')
      });
      const user = res.data.userDoc;
      console.log(user.username) // Working here and printing username here
      username = user.username
      setUname(username)
      console.log(username) // But not working here and printing empty string
      const url = `http://localhost:3000/api/users/${username}`;
      console.log(url)
      const response = await axios.get(url)
      setProfile(response.data)
      // console.log(response.data)
      // console.log(profile)
    }
    getUsername();
  },[editProfile])

  async function saveEdits(e){
    e.preventDefault()
    const url = `http://localhost:3000/api/users/${uname}`;
    console.log(url)
    const res = await axios.put(url,profile)
    console.log(res);
    setProfile(res.data);
    setEditProfile(false);
  }

  return (
    <div className="main-container">
        <Navbar />
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
        (<div className="content-container">
            <div className="profile-container">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="Profile Picture" className="profile-pic" />
              <h2 className="username">{profile.username}</h2>
              <p className="email">{profile.email}</p>
              <p className="bio">{profile.about}</p>
              <button className="edit-button" onClick={()=>setEditProfile(true)}>Edit Profile</button>
            </div>
        </div>)}
      </div>
  );
};

export default Profile;