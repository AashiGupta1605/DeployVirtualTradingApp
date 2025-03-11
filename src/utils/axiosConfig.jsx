import axios from 'axios';
import { BASE_API_URL } from './BaseUrl';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;