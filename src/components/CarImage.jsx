import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarImage = ({ carId }) => {
  const [firstImage, setFirstImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cars/${carId}`);
        if (response.data.images && response.data.images.length > 0) {
          setFirstImage(response.data.images[0]);
        } else {
          setFirstImage(null);
        }
        setError('');
      } catch (error) {
        setError('Error fetching car data');
        console.error(error);
      }
    };

    if (carId) {
      fetchCar();
    }
  }, [carId]);

  return (
    <div>
      {error && <p>{error}</p>}
      {firstImage && (
        <img
          src={`data:image/png;base64,${firstImage}`}
          alt="Car Image"
          style={{ width: '100%', height:'200px',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px' }}
        />
      )}
    </div>
  );
};

export default CarImage;
