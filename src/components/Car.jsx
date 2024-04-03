import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './car.css'; 
import { TbManualGearbox } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuBadgeDollarSign } from "react-icons/lu";
import { BsSuitcaseLg } from "react-icons/bs";
import { BsFuelPumpDiesel } from 'react-icons/bs';

const Car = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <div className="car-container">
        {cars.map((car) => (
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
        ))}
      </div>
    </div>
  );
};

export default Car;
