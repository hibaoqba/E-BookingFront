import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './hero.css';

const Hero = () => {
  const [key, setKey] = useState('voiture');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <div className='hero'>
      <div className='hero-content'>
        <div className='hero-text'>
          <h1>Votre Aventure Commence Ici : Réservations Instantanées Simplifiées</h1>
          <br />
          <h4>Trouvez d'excellents hôtels, circuits, voitures et activités au Maroc.</h4>
        </div>
        <Tabs
          id="reservation-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className='hero-buttons hero-tabs' // Add hero-tabs class
        >
          <Tab eventKey="voiture" title="Voiture">
            {key === 'voiture' && (
              <div className="research-card">
                <Card>
                  <Card.Body>
                    <div>
                      <label>Destination:</label><br />
                      <FontAwesomeIcon icon={faLocationDot} className='icon' />
                      <input
                        type="text"
                        placeholder="Où vas-tu?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>De</label>
                      <FontAwesomeIcon icon={faCalendarDays} className='icon'  />
                      <DatePicker
                        placeholderText='MM/JJ/YYYY'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                      />
                      <label>à</label>
                      <FontAwesomeIcon icon={faCalendarDays}  className='icon' />
                      <DatePicker
                        placeholderText='MM/JJ/YYYY'
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                      />
                    </div>
                    <button>Rechercher</button>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Tab>
          <Tab eventKey="appartement" title="Appartement">
            {key === 'appartement' && (
              <div className="research-card">
                <Card>
                  <Card.Body>
                    <div>
                      <label>Destination:</label><br />
                      <FontAwesomeIcon icon={faLocationDot} className='icon'  />
                      <input
                        type="text"
                        placeholder="Où vas-tu?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>De</label>
                      <FontAwesomeIcon icon={faCalendarDays} className='icon'  />
                      <DatePicker
                        placeholderText='MM/JJ/YYYY'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                      />
                      <label>à</label>
                      <FontAwesomeIcon icon={faCalendarDays} className='icon'  />
                      <DatePicker
                        placeholderText='MM/JJ/YYYY'
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                      />
                    </div>
                    
                    <button>Rechercher</button>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Hero;
