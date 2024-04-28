import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const MapPicker = ({ onLocationChange,defaultPosition }) => {
  const [position, setPosition] = useState(defaultPosition);

  
  function LocationPicker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); 
        onLocationChange(lat, lng); 
      },
    });

    return null;
  }

  return (
    <div className="map-container">
      <MapContainer center={defaultPosition} zoom={7} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker />
        <Marker position={position}>
          <Popup>You have selected this location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPicker;
