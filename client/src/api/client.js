import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('event_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (Array.isArray(data?.errors)) {
    return data.errors.map((item) => item.message || item).join(', ');
  }

  return data?.message || error.message || 'Something went wrong';
};

export default api;
