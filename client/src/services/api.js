// API configuration file
import axios from 'axios';

// Determine the base URL for API requests based on environment
const isProduction = import.meta.env.PROD;
const baseURL = isProduction 
  ? 'https://securenotez.onrender.com'
  : '/api';  // Use proxy in development

// Create a pre-configured axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Always send cookies with requests
});

// Add request interceptor for handling common request tasks
api.interceptors.request.use(
  (config) => {
    // You can add common headers or authentication tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling common response tasks/errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      console.log('Authentication error: Redirecting to login page');
      // Could redirect to login page here if needed
    }
    return Promise.reject(error);
  }
);

export default api;
