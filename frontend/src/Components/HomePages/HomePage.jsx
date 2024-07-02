// src/HomePage.js
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import DisplayPost from './DisplayPost';
import Users from './Users';
import './HomePage.css'
import { useEffect ,useState} from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch('http://localhost:3000/api/posts');
      res = await res.json();
      if (res) {
        setPosts(res);
      } else {
        console.log("Posts Not fetched");
      }
    }
    fetchData();
  }, []);
  
    return (
      <div className="main-container">
        <Navbar />
        <div className="content-container">
          <DisplayPost posts = {posts}/>
        </div>
      </div>
    );
};

export default HomePage;
