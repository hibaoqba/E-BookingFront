import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/wishlist.css';
import UseFetchUserInfo from '../UseFetchUserInfo';
import CarImage from '../CarImage';
import ApartmentImage from '../apartmentComponents/ApartmentImage'
const Wishlist = () => {
  const [carWishes, setCarWishes] = useState([]);
  const [apartmentWishes, setApartmentWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = UseFetchUserInfo();

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        if (userInfo && userInfo.id) {
          // Fetch car wishes
          const carResponse = await axios.get(`http://localhost:8080/api/carwishes/user?userId=${userInfo.id}`);
          setCarWishes(carResponse.data);

          // Fetch apartment wishes
          const apartmentResponse = await axios.get(`http://localhost:8080/api/apartmentWish/user?userId=${userInfo.id}`);
          setApartmentWishes(apartmentResponse.data);
        }
      } catch (error) {
        console.error('Error fetching wishes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    
      {carWishes.map(wish => (
        <div key={wish.id} className="wish-item">
          <div className="wish-image">
            <CarImage carId={wish.car.id} left={10} right={0} />
          </div>
          <div className="wish-details">
            <h4>{wish.car.brand} {wish.car.model}</h4>
            <p>{wish.car.description}</p>
            <Link to={`/car/${wish.car.id}`} className="btn btn-primary">Détails</Link>
          </div>
        </div>
      ))}

    
      {apartmentWishes.map(wish => (
        <div key={wish.id} className="wish-item">
           <div className="wish-image">
            <ApartmentImage apartmentId={wish.apartment.id} left={10} right={0} />
          </div>
          <div className="wish-details">
            <h4>{wish.apartment.titre}</h4>
            <p>{wish.apartment.description}</p>

            <Link to={`/apartment/${wish.apartment.id}`} className="btn btn-primary">Détails</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
