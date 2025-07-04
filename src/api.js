
// ==== api.js ====
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mailbackend-self.vercel.app/', // Make sure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;