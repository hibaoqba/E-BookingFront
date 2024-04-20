import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UseFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('http://localhost:8080/api/users/currentUser', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  return userInfo;
};

export default UseFetchUserInfo;
