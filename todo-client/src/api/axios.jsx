import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ton URL API Laravel, ou ton IP locale si besoin
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Ajouter le token si présent dans localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
