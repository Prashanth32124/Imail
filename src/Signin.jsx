import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password12, setPassword12] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://mailbackend-self.vercel.app//login", {
        username,
        password12
      });

      // Only proceed if login is successful
      if (res.status === 200 && res.data.message.includes("Login successful")) {
        localStorage.setItem("username", username);
        alert(res.data.message);
        navigate("/homepage");
      } else {
        alert("❌ Invalid credentials");
      }

    } catch (err) {
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password12}
        onChange={e => setPassword12(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Signin;
