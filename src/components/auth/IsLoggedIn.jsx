import React, { useEffect, useState } from 'react';

const IsLoggedIn = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setLogged(!!authToken); // Set isLoggedIn to true if authToken exists, false otherwise
  }, []);

  return logged;
};

export default IsLoggedIn;
