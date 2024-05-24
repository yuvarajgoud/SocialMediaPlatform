// src/HomePage.js
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
    
  const {auth,setAuth} = useContext(AuthContext)

  async function logout(){
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false });
  }

  if(!auth.isAuthenticated){
    return (
      <Navigate to={'/'}/>
    )
  }

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default HomePage;
