import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Renamed from password12 for consistency
  const [error, setError] = useState(''); // Added error state for better UX

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://mailbackend-self.vercel.app";

  const validateUsername = (user) => {
    if (!user.endsWith('@imail.com')) return false;

    const prefix = user.split('@')[0];
    const isValidLength = prefix.length >= 6 && prefix.length <= 12;
    const hasOnlyAlphanumeric = /^[a-zA-Z0-9]+$/.test(prefix);

    return isValidLength && hasOnlyAlphanumeric;
  };

  const validatePassword = (pass) => {
    const isValidLength = pass.length >= 6 && pass.length <= 12;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return isValidLength && hasSpecialChar;
  };

  const handleSignup = async () => {
    setError(''); // Clear previous errors

    if (!validateUsername(username)) {
      setError("Username must be 6-12 characters, alphanumeric, and end with @imail.com");
      return;
    }

    if (!validatePassword(password)) { // Using 'password'
      setError("Password must be 6-12 characters and include at least one special character");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/signup`, { // Use API_BASE_URL
        username,
        password, // Sending 'password'
      });

      setError(res.data.message); // Use error state for success message too, or separate state
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Welcome to the iBox</h1>

      <label>Username</label><br />
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="e.g. prashu@imail.com"
      /><br />

      <label>Password</label><br />
      <input
        id="password"
        type="password"
        value={password} // Using 'password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a strong password"
      /><br />

      <button onClick={handleSignup}>Signup</button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error/success */}

      <p>Already have an account?</p>
      <button onClick={() => navigate('/signin')}>Signin</button>
    </div>
  );
}

export default Signup;