import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Compose from './Compose';
import Inbox from './Inbox';
import './css/Homepage.css';

function Homepage() {
  const [view, setView] = useState('inbox');
  const navigate = useNavigate();
  const location = useLocation();

  // Receive from route or fallback to localStorage
  const username = location.state?.username || localStorage.getItem("username") || "Guest";
  const initials = username.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/signin");
  };

  return (
    <div>
      <div className="header">
        📧 iMail - Welcome, {username}
        <span className="profile-circle">{initials}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="nav-buttons">
        <button onClick={() => setView('compose')}>Compose</button>
        <button onClick={() => setView('inbox')}>Inbox</button>
      </div>

      {view === 'compose' && <Compose />}
      {view === 'inbox' && <Inbox />}
    </div>
  );
}

export default Homepage;
