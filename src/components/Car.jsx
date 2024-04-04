import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './car.css'; 
import { TbManualGearbox } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuBadgeDollarSign } from "react-icons/lu";
import { BsSuitcaseLg } from "react-icons/bs";
import { BsFuelPumpDiesel } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Card} from 'react-bootstrap';
import { faLocationDot, faCalendarDays, faMagnifyingGlass,faCar, faBuilding} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dropdown } from 'react-bootstrap';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [sortBy, setSortBy] = useState('price_asc'); // Default sorting option set to 'price_asc'

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars');
        setCars(response.data);
        setSortedCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    sortCars();
  }, [sortBy, cars]);

  const sortCars = () => {
    let sorted = [...cars];
    switch (sortBy) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSortedCars(sorted);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className='car-page-container'>
      <div className='car-sections-container'>
      <div className='car-left-section'>
       <Card className="car-page-card">
           <Card.Body className="car-research-body">
           <div className="input-with-icon-car">
             <FontAwesomeIcon icon={faLocationDot} className='car-icon' />
              <input
          type="text"
            placeholder="Où vas-tu?"
                                            
                                            />
                                        </div>
                                        <div className="input-with-icon-car">
                                            <FontAwesomeIcon icon={faCalendarDays} className='car-icon' />
                                            <DatePicker
                                                placeholderText='Date Arrivée'
                                           
                                            />
                                        </div>
                                        <div className="input-with-icon-car">
                                            <FontAwesomeIcon icon={faCalendarDays} className='car-icon' />
                                            <DatePicker
                                                placeholderText='Date Départ'
                                              
                                            />
                                        </div>
                                        <button><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</button>
                                    </Card.Body>
                                </Card>
      </div>
      <div className='car-right-section'>
      <div className='car-header'>
        <div className='car-count'><h2>{sortedCars.length} voitures trouvées</h2></div>
        <div className='sort-cars'>
          Trier par: 
          <Dropdown className='car-sort-dropdown'>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              {sortBy === 'price_asc' ? 'Prix: (croissant)' : 'Prix: (décroissant)'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange('price_asc')}>
                Prix: (croissant)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('price_desc')}>
                Prix: (décroissant)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="car-container">
        {sortedCars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} className="car-link">
            <div key={car.id} className="car-card">
              <img className="car-card-image" src={car.images[0]} alt="Car" />
              <div className="car-card-details">
                <h2 className="car-card-title">{car.brand} - {car.model}</h2>
                <p className="car-card-text">Year: {car.year}</p>
                <div className="price"><LuBadgeDollarSign className='dollar'/> {car.price}</div>
                <hr />
                <div className="features-container">
                  <div className="feature"><BsSuitcaseLg/>{car.carFeatures.suitCases} bagages</div>
                  <div className="feature"><FaPeopleGroup/>{car.carFeatures.place} places</div>
                  <div className="feature"><BsFuelPumpDiesel/>{car.carFeatures.fuelType.toLowerCase()}</div>
                  <div className="feature"><TbManualGearbox/>{car.carFeatures.transmissionType.toLowerCase()}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Car;
