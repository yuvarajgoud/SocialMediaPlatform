// Navbar.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPlusSquare, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import LogoutModal from './LogoutModal';
import './Navbar.css';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false });
    closeModal();
  };

  return (
    <>
      <div className="side-navbar">
        <div className="brand-title">Connectify</div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/protected/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/protected/create" className="nav-link">Create</Link>
          </li>
          <li className="nav-item">
            <Link to="/protected/home" className="nav-link">Explore</Link>
          </li>
          <li className="nav-item">
            <Link to="/protected/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <button onClick={openModal} className="nav-link">Logout</button>
          </li>
        </ul>
      </div>

      <LogoutModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
