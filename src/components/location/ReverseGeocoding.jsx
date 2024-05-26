import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReverseGeocoding = ({ latitude, longitude, onAddressFetched }) => {
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

        if (response.data) {
          const fetchedAddress = response.data.display_name;
          setAddress(fetchedAddress);
          onAddressFetched(fetchedAddress); // Pass the address back to the parent component
        } else {
          throw new Error('No results found');
        }
      } catch (error) {
        console.error('Error reverse geocoding:', error.message);
      }
    };

    if (latitude && longitude) {
      fetchAddress();
    }
  }, [latitude, longitude, onAddressFetched]);

  return <p>{address}</p>;
};

export default ReverseGeocoding;
