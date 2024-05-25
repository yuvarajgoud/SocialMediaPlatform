import React from 'react';
import { FaUser, FaPlusSquare, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import '../../Styles/Navbar.css'
const Navbar = () => {

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
    <>
      <div className="side-navbar">
      <div className="brand-title">
        Connectify
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to={'/home'} className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={'/create'} className="nav-link">Create</Link>
        </li>
        <li className="nav-item">
          <Link to={'/home'} className="nav-link">Explore</Link>
        </li>
        <li className="nav-item">
          <Link to={'/home'} className="nav-link">Profile</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link"><button onClick={logout} >Logout</button></Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Navbar;
