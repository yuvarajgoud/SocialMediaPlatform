// src/HomePage.js
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import DisplayPost from './DisplayPost';

const HomePage = () => {
    
  const {auth,setAuth} = useContext(AuthContext)

  

  if(!auth.isAuthenticated){
    return (
      <Navigate to={'/'}/>
    )
  }

    return (
        <div>
            <Navbar/>
            <DisplayPost/>
        </div>
    );
};

export default HomePage;
