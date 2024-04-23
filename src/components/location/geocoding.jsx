import React, { useState } from 'react';
import axios from 'axios';

const Geocoding = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null);

  const handleGeocode = async () => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
        },
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates({ latitude: lat, longitude: lon });
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error geocoding:', error.message);
    }
  };

  return (
    <div>
      <h2>Geocode Address:</h2>
      <p>{address}</p>
      <button onClick={handleGeocode}>Geocode</button>
      {coordinates && (
        <div>
          <h2>Coordinates:</h2>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default Geocoding;
