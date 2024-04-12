// CarComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'; 
import './carComponent.css'
import { TbManualGearbox, TbGps } from "react-icons/tb";
import { FaPeopleGroup, FaSnowflake } from "react-icons/fa6";
import { BsSuitcaseLg, BsFuelPumpDiesel } from "react-icons/bs";
import { PiEngineBold } from "react-icons/pi";
import FAQs from './FAQs'
import DoubleDateInput from './DoubleDateInput';
import TarifSuppCar from './TarifSuppCar';
import Loading from './Loading';

const CarComponent = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const today = new Date().toISOString().split('T')[0];
  const updateTotalPrice = (newTotalPrice) => {
    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cars/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car:', error);
        setLoading(false);
      }
    };
    const updateTotalPrice = (newPrice) => {
      setTotalPrice(newPrice);
    };
  
    fetchCar();
  }, [id]);

  const handleDateRangeSelect = (dateRange) => {
    console.log('Selected date range:', dateRange);
  };

  if (loading) {
    return   <Loading/>
  ;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className='car-details-container'>
      <div className='car-details-subcontainer'>
        <div className='details-left-section'>
          <div className='car-details-header'>
            <h2>{car.brand} {car.model} {car.year}</h2>
          </div>
          <hr />
          <div className='car-features'>
            <div className='details-feature'>
              <div className='details-icon'><BsFuelPumpDiesel/></div>
              <div className='features-text'>{car.carFeatures.fuelType}</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><TbManualGearbox/></div>
              <div className='features-text'>{car.carFeatures.transmissionType}</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><FaPeopleGroup/></div>
              <div className='features-text'>{car.carFeatures.place} places</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><BsSuitcaseLg/></div>
              <div className='features-text'>{car.carFeatures.suitCases} bagages</div>
            </div>
          </div>
          <hr />
          <div className='car-details-carrousel'>
            <Carousel className="car-carousel">
              {car.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="car-carousel-image"
                    src={image}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className='car-description'>
            <h4>Description</h4>
            {car.description}
          </div>
          <hr />
          <div className='additional-features'>
            <ul>
              <li><BsFuelPumpDiesel className="additional-icon"/> {car.carFeatures.fuelType}</li>
              <li><TbManualGearbox className="additional-icon"/> {car.carFeatures.transmissionType}</li>
              <li><FaPeopleGroup className="additional-icon"/> {car.carFeatures.place} places</li>
              {car.carFeatures.ac && <li><FaSnowflake className="additional-icon"/> AC</li>}
              {car.carFeatures.gps && <li><TbGps className="additional-icon"/> GPS</li>}
              <li><PiEngineBold className="additional-icon"/> {car.carFeatures.horsePower} ch</li>
            </ul>
          </div>
          <hr />
          <div className='FAQs'>
            <h4>FAQs</h4>
            <div className='FAQs-accordion'><FAQs /></div>
          </div>
        </div>
        <div className='details-right-section'>
          <div className='reservation'>
            <div className='price-header'>
              <div>A partir de : </div><div className='price'><h4>{car.price}</h4></div>
            </div>
            <hr />
            <div className='date-picker'>
              <div className='pick-text'>Veuillez choisir une date:</div>
              <div className='date-picker-car'> <DoubleDateInput onDateRangeSelect={handleDateRangeSelect}  /></div>
            </div>
            <hr />
            <div className='tarif-supp'>
              <TarifSuppCar onUpdateTotalPrice={updateTotalPrice} />
            </div>
          </div>
          <div className='why-us'></div>
        </div>
      </div>
    </div>
  );
};

export default CarComponent;
