import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './hero.css';

const Hero = () => {
  const [showCarReservation, setShowCarReservation] = useState(true);
  const [showApartmentReservation, setShowApartmentReservation] = useState(false);

  const handleCarButtonClick = () => {
    setShowCarReservation(true);
    setShowApartmentReservation(false); // Hide the apartment reservation card
  };

  const handleApartmentButtonClick = () => {
    setShowApartmentReservation(true);
    setShowCarReservation(false); // Hide the car reservation card
  };

  return (
    <div className='hero'>
      <div className='hero-content'>
        <div className='hero-text'>
          <h1>Votre Aventure Commence Ici : Réservations Instantanées Simplifiées</h1>
          <br />
          <h4>Trouvez d'excellents hôtels, circuits, voitures et activités au Maroc.</h4>
        </div>
        <div className='hero-buttons'>
          <button className='button-card' onClick={handleCarButtonClick}>Voiture</button>
          <button className='button-card' onClick={handleApartmentButtonClick}>Appartement</button>
        </div>
        {showCarReservation && (
          <div className="research-card">
            <Card>
              <Card.Body>
                <Card.Title>Car Reservation</Card.Title>
                <Card.Text>
                  This is a car reservation card.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
        {showApartmentReservation && (
          <div className="research-card">
            <Card>
              <Card.Body>
                <Card.Title>Apartment Reservation</Card.Title>
                <Card.Text>
                  This is an apartment reservation card.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
