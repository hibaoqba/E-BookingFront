import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReverseGeocoding = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            lat: latitude,
            lon: longitude,
            format: 'json',
          },
        });

        // Extract address components from the response
        if (response.data) {
          setAddress(response.data.display_name);
        } else {
          throw new Error('No results found');
        }
      } catch (error) {
        console.error('Error reverse geocoding:', error.message);
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return (
    <div>
     
      <p>{address}</p>
    </div>
  );
};

export default ReverseGeocoding;
