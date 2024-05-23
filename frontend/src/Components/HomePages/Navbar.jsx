import React, { useContext, useState } from 'react';
import '../../Styles/Navbar.css';
import { UserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';

const Navbar = () => {

  const {userInfo,setUserInfo} = useContext(UserContext)
  const [redirect,setRedirect] = useState(false)

  async function logout(){
    fetch('http://localhost:3000/api/auth/logout')
    .then( res => res.json())
    .then( res => {
      localStorage.setItem('jwttoken',res.token);
      setUserInfo(null);
      setRedirect(true)
    })
  }
  if(redirect){
    console.log("inside Redirect")
    return(
      <Navigate to={'/'} />
    )
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">Connectify</div>
      <div className="navbar-buttons">
      <button className="navbar-button">Create</button>
        <button className="navbar-button">Profile</button>
        <button className="navbar-button" onClick={logout}>Logout</button>
        
      </div>
    </nav>
  );
};

export default Navbar;
