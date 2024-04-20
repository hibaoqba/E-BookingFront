// signup.js

import axios from 'axios';

export const signUp = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/register', formData);
    console.log('Sign-up successful:', response.data);
    return true; // Sign-up successful
  } catch (error) {
    console.error('Sign-up error:', error);
    return false; // Sign-up failed
  }
};
export default signUp;