
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/currentUser');
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>{userInfo ? children(userInfo) : null}</>
  );
};

export default UserInfoProvider;
