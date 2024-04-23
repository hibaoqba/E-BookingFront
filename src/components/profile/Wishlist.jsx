import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link if needed
import '../../styles/wishlist.css'
import UseFetchUserInfo from '../UseFetchUserInfo';
import CarImage from '../CarImage'; // Import CarImages component

const Wishlist = () => {
  
  const [wishes, setWishes] = useState([]);
  const userInfo=UseFetchUserInfo();

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
      <div className='wish-image'>    <CarImage carId={wish.car.id} left={10} right={0} /> </div>
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
