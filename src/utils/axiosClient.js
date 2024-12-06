import axios from 'axios';

// Set the base URL for the API
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to attach the JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
