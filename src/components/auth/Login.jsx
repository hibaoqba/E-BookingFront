

import axios from 'axios';

export const Login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/authenticate', { email, password });
    const authToken = response.data.access_token;
    localStorage.setItem('authToken', authToken);
    return true; // Login successful
  } catch (error) {
    console.error('Login error:', error);
    return false; // Login failed
  }
};

export default Login
