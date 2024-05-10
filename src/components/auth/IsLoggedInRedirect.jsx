import React from 'react';
import { Navigate } from 'react-router-dom';

const useIsLoggedIn = () => {
  const token = localStorage.getItem('authToken');
  return !!token; // Convert token to boolean
};

const IsLoggedInRedirect = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default IsLoggedInRedirect;
