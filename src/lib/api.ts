import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL, // usa l'URL di Strapi
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
