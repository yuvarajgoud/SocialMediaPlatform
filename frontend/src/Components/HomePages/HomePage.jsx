// src/HomePage.js
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import DisplayPost from './DisplayPost';
import Users from './Users';
import './HomePage.css'

const HomePage = () => {

    return (
      <div className="main-container">
        <Navbar />
        <div className="content-container">
          <DisplayPost />
        </div>
      </div>
    );
};

export default HomePage;
