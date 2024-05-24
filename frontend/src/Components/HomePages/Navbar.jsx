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
      <nav>
        <div className='logo'>
          <Link to={'/home'}>Connectify</Link>
        </div>
        <div className='buttons'>
            <button><Link to={'/create'}>Create</Link></button>
            <button>Explore</button>
            <button>Profile</button>
            <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
