import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/CreditCardContainer.css';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://mailbackend-self.vercel.app";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password
      });

      if (res.status === 200 && res.data.message?.includes("Login successful")) {
        localStorage.setItem("username", username);
        setUsername('');
        setPassword('');
        navigate("/homepage", { state: { username } });
      } else {
        setError(res.data.message || "Invalid credentials.");
      }

    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-wrapper">
      <div className="card-top">
        <div className="card-chip"></div>
        <div className="card-brand">iBox™</div>
      </div>

      <div className="card-number">2200032124 Roy</div>

      <div className="card-input-row" style={{ gap: "16px", marginTop: "24px" }}>
        <div style={{ flex: 1 }}>
          <div className="card-label">Username</div>
          <input
            className="card-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. prashu@imail.com"
            disabled={loading}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <div className="card-label">Password</div>
          <input
            className="card-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your secret code"
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="card-bottom">
        <button className="card-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="card-error">{error}</div>}
        <p style={{ marginTop: '10px', color: '#fff' }}>New here?</p>
        <button className="card-button" onClick={() => navigate('/signup')}>Signup</button>
      </div>
    </div>
  );
}

export default Signin;
