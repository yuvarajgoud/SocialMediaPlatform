// src/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">SocialApp</div>
        <div className="nav-links">
          <button className="nav-button" onClick={() => alert('Navigating to Login...')}>Login</button>
          <button className="nav-button signup-button" onClick={() => alert('Navigating to Signup...')}>Signup</button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Connect with the World</h1>
          <p>Join SocialApp to share your moments and connect with your friends and family.</p>
          <button className="cta-button" onClick={() => alert('Navigating to Signup...')}>Get Started</button>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/400" alt="Social Interaction" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
