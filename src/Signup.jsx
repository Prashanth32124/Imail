import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup() {
    const navigate=useNavigate();
    const [username,setUsername]=useState();
    const [password12,setPassword]=useState();
    const usernameupdate=()=>{
    
    }
    const Passwordupdate=()=>{

    }
    const signin=()=>{
    navigate('/Signin');
    }
    const handlesignup=async()=>{
         try {
      const res = await axios.post("https://daisy-rune-mandevilla.glitch.me/signup", {
        username,
        password12,
      });
  
      alert(res.data.message);
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
    }
    
  return (
    <div>
        <h1>Welcome to the iBox</h1>
        <label>Username</label><br/>

      <input id="username"  
      type="text" value={username}  
      onChange={(e) => setUsername(e.target.value)}
       onClick={usernameupdate}
       placeholder="please enter the username"/><br/>

      <label>Password</label><br/>
      <input id="password" 
      type="password" 
      value={password12} 
       onChange={(e) => setPassword(e.target.value)} 
       onClick={Passwordupdate} 
       placeholder="please enter the password"/><br/>

      <button onClick={handlesignup}>Signup</button>
      <p>Already have an account?</p>
      <button onClick={signin}>Signin</button>
    </div>
  )
}

export default Signup
