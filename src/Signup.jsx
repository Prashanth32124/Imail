import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/CreditCardContainer.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://mailbackend-self.vercel.app";

  const validateUsername = (user) => {
    if (!user.endsWith('@imail.com')) return false;
    const prefix = user.split('@')[0];
    return prefix.length >= 6 && prefix.length <= 12 && /^[a-zA-Z0-9]+$/.test(prefix);
  };

  const validatePassword = (pass) => {
    return pass.length >= 6 && pass.length <= 12 && /[!@#$%^&*]/.test(pass);
  };

  const handleSignup = async () => {
    setError('');
    if (!validateUsername(username)) {
      setError("Username must be 6–12 characters, alphanumeric, and end with @imail.com");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be 6–12 characters and have one special character");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/signup`, { username, password });
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="card-wrapper">
      <div className="card-top">
        <div className="card-chip"></div>
        <div className="card-brand">iBox™</div>
      </div>

      <div className="card-number">iBox</div>

      <div className="card-input-row" style={{ gap: "16px", marginTop: "24px" }}>
        <div style={{ flex: 1 }}>
          <div className="card-label">Username</div>
          <input
            className="card-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. prashu@imail.com"
          />
        </div>
        <div style={{ flex: 1 }}>
          <div className="card-label">Password</div>
          <input
            className="card-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Strong Password"
          />
        </div>
      </div>

      <div className="card-bottom">
        <button className="card-button" onClick={handleSignup}>Signup</button>
        {error && <div className="card-error">{error}</div>}
        <p style={{ marginTop: '10px', color: '#fff' }}>Already have an account?</p>
        <button className="card-button" onClick={() => navigate('/signin')}>Signin</button>
      </div>
    </div>
  );
}

export default Signup;
