import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link if needed
import './wishlist.css'
const Wishlist = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [wishes, setWishes] = useState([]);

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

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/carwishes/user?userId=${userInfo.id}`);
          setWishes(response.data);
        }
      } catch (error) {
        console.error('Error fetching wishes:', error);
      }
    };

    fetchWishes();
  }, [userInfo]);

  return (
    <div>
      {wishes.map(wish => (
        <div key={wish.id} className="wish-item">
          <img src={wish.car.images[0]} alt={wish.car.brand} className="wish-image" />
          <div className="wish-details">
            <h2>{wish.car.brand} {wish.car.model}</h2>
            <p>{wish.car.description}</p>
            <Link to={`/car/${wish.car.id}`} className="btn btn-primary">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
