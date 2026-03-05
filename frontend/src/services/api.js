import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ADMIN_TOKEN_KEY = 'finique_admin_token';
const ADMIN_PROFILE_KEY = 'finique_admin';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_PROFILE_KEY);
      if (window.location.pathname.startsWith('/admin')) {
        window.location.replace('/admin/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
