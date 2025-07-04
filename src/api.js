import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mailbackend-self.vercel.app/',
});

export default api;
