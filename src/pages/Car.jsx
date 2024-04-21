import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/car.css'; 
import { TbManualGearbox } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuBadgeDollarSign } from "react-icons/lu";
import { BsSuitcaseLg, BsFuelPumpDiesel } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Card, Dropdown } from 'react-bootstrap';
import DoubleDateInput from '../components/DoubleDateInput';
import CarImage from '../components/CarImage';
const Car = () => {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [sortBy, setSortBy] = useState('price_asc');
  const [clickedHeartIds, setClickedHeartIds] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const response = await axios.get('http://localhost:8080/api/users/currentUser', {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          setUserInfo(response.data);
          setLoading(false);
          const wishlistResponse = await axios.get(`http://localhost:8080/api/carwishes/user?userId=${response.data.id}`);
          const wishlistIds = wishlistResponse.data.map(wish => wish.car_id);
          setClickedHeartIds(wishlistIds);
        } catch (error) {
          console.error('Error fetching user info:', error);
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, []);

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

  const handleDateRangeSelect = (dateRange) => {
    console.log('Selected date range:', dateRange);
  };

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

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  useEffect(() => {
    const checkInitialHeartStatus = async () => {
      try {
        if (userInfo && userInfo.id) {
          const initialHeartStatus = await Promise.all(
            sortedCars.map(async (car) => {
              const response = await axios.get(`http://localhost:8080/api/carwishes/iscarwishlist?userId=${userInfo.id}&carId=${car.id}`);
              return response.data ? car.id : null;
            })
          );
          setClickedHeartIds(initialHeartStatus.filter((id) => id !== null));
        }
      } catch (error) {
        console.error('Error checking initial heart status:', error);
      }
    };

    checkInitialHeartStatus();
  }, [sortedCars, userInfo]);

  const handleHeartClick = async (e, carId) => {
    e.stopPropagation();
    try {
      if (userInfo && userInfo.id) {
        if (clickedHeartIds.includes(carId)) {
          await axios.delete(`http://localhost:8080/api/carwishes/remove?userId=${userInfo.id}&carId=${carId}`);
          setClickedHeartIds(prevIds => prevIds.filter(id => id !== carId));
        } else {
          await axios.post(`http://localhost:8080/api/carwishes/add?userId=${userInfo.id}&carId=${carId}`);
          setClickedHeartIds(prevIds => [...prevIds, carId]);
        }
      }
    } catch (error) {
      console.error('Error updating heart status:', error);
    }
  };

  return (
    <div className='car-page-container'>
      <div className='car-sections-container'>
        <div className='car-left-section'>
          <Card className="car-page-card">
            <Card.Body className="car-research-body">
              <div className="input-with-icon-car">
                <FontAwesomeIcon icon={faLocationDot} className='car-icon' />
                <input type="text" placeholder="Où vas-tu?" />
              </div>
              <label> choisir une date:</label>
              <div className='date-picker-car'>
                <DoubleDateInput onDateRangeSelect={handleDateRangeSelect} />
              </div>
              <button className='car-research-body-button'>
                <FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher
              </button>
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
            {sortedCars.map(car => (
              <div key={car.id} className="car-link">
                <div className="car-card" onClick={() => handleCarClick(car.id)}>
                  <div>
                    <button
                      className={`heart-button ${clickedHeartIds.includes(car.id) ? 'clicked' : ''}`}
                      onClick={(e) => handleHeartClick(e, car.id)}
                    >
                      <FontAwesomeIcon className='heart-icon' icon={faHeart} />
                    </button>
                    <CarImage carId={car.id} /> 
                  </div>
                  <div className="car-card-details">
                    <h2 className="car-card-title">{car.brand} - {car.model}</h2>
                    <p className="car-card-text">Year: {car.year}</p>
                    <div className="car-price"><LuBadgeDollarSign className='dollar'/> {car.price}</div>
                    <hr />
                    <div className="features-container">
                      <div className="feature"><BsSuitcaseLg/>{car.carFeatures.suitCases} bagages</div>
                      <div className="feature"><FaPeopleGroup/>{car.carFeatures.place} places</div>
                      <div className="feature"><BsFuelPumpDiesel/>{car.carFeatures.fuelType.toLowerCase()}</div>
                      <div className="feature"><TbManualGearbox/>{car.carFeatures.transmissionType.toLowerCase()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
