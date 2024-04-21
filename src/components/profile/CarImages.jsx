import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarImages = ({ carId }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cars/${carId}`);
        setImages(response.data.images);
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
      {images.map((image, index) => (
        <img
          key={index}
          src={`data:image/png;base64,${image}`}
          alt={`Car Image ${index}`}
          style={{ width: '100%', height: '100%' }}
        />
      ))}
    </div>
  );
};

export default CarImages;
