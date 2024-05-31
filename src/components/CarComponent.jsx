import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../styles/carComponent.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { TbManualGearbox, TbGps } from "react-icons/tb";
import { FaPeopleGroup, FaSnowflake } from "react-icons/fa6";
import { BsSuitcaseLg, BsFuelPumpDiesel } from "react-icons/bs";
import { PiEngineBold } from "react-icons/pi";
import FAQs from './common/FAQs';
import DoubleDateInput from './DoubleDateInput';
import Loading from './common/Loading';
import UseFetchUserInfo from './UseFetchUserInfo';
import CarImages from './profile/CarImages';
import LoginModal from './modals/LoginModal';
import UserDetailsComponent from './common/UserDetailsComponent';

const CarComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabledDates, setDisabledDates] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [reservationAttempted, setReservationAttempted] = useState(false);
  const [reservationData, setReservationData] = useState({
    startDate: '',
    endDate: '',
    gps: false,
    childSeat: false
  });

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

    fetchCar();
  }, [id]);

  useEffect(() => {
    const fetchReservationDates = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cars/${id}/reservationdates`);
        setDisabledDates(response.data);
      } catch (error) {
        console.error('Error fetching reservation dates:', error);
      }
    };

    fetchReservationDates();
  }, [id]);

  const handleDateRangeSelect = (dateRange) => {
    setReservationData(prevData => ({
      ...prevData,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    }));
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setReservationData(prevData => ({
      ...prevData,
      [id]: checked
    }));
  };

  const handleReservationSubmit = () => {
    if (!reservationData.startDate || !reservationData.endDate) {
      setReservationAttempted(true); 
      return; 
    }
  
    if (userInfo) {
      navigate(`/car/confirmation`, { state: { reservationData, car } });
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = async ()  => {
    try {
      setShowLoginModal(false);
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8080/api/users/currentUser', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setUserInfo(response.data);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(userInfoFromStorage);
      navigate(`/car/confirmation`, { state: { reservationData, car } });
      window.location.reload()
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  
  if (loading) {
    return <Loading />;
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
              <div className='details-icon'><BsFuelPumpDiesel /></div>
              <div className='features-text'>{car.carFeatures.fuelType}</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><TbManualGearbox /></div>
              <div className='features-text'>{car.carFeatures.transmissionType}</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><FaPeopleGroup /></div>
              <div className='features-text'>{car.carFeatures.place} places</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><BsSuitcaseLg /></div>
              <div className='features-text'>{car.carFeatures.suitCases} bagages</div>
            </div>
          </div>
          <hr />
          <div className='car-details-carrousel'>
            <Carousel className="car-carousel">
              {car && car.images && (
                car.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="car-carousel-image"
                      src={`data:image/png;base64,${image}`}
                      alt={`Car Image ${index}`}
                      style={{ width: '100%' }}
                    />
                  </Carousel.Item>
                ))
              )}
            </Carousel>
          </div>
          <div className='car-description'>
            <h4>Description</h4>
            {car.description}
          </div>
          <hr />
          <div className='additional-features'>
            <ul>
              <li><BsFuelPumpDiesel className="additional-icon" /> {car.carFeatures.fuelType}</li>
              <li><TbManualGearbox className="additional-icon" /> {car.carFeatures.transmissionType}</li>
              <li><FaPeopleGroup className="additional-icon" /> {car.carFeatures.place} places</li>
              {car.carFeatures.ac && <li><FaSnowflake className="additional-icon" /> AC</li>}
              {car.carFeatures.gps && <li><TbGps className="additional-icon" /> GPS</li>}
              <li><PiEngineBold className="additional-icon" /> {car.carFeatures.horsePower} ch</li>
            </ul>
          </div>
          <hr />
          <h4>Localisation</h4>
          <MapContainer center={[car.latitude, car.longitude]} zoom={4} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[car.latitude, car.longitude]}>
              <Popup>
                <div>{car.brand} {car.model}-{car.year}</div>
                <img
                  className="car-carousel-image"
                  src={`data:image/png;base64,${car.images[0]}`}
                  style={{ width: '150px' }}
                />
              </Popup>
            </Marker>
          </MapContainer>
          <hr />
          <strong>Locateur</strong>
          
          <UserDetailsComponent user={car.seller}/>
          <hr />
          <div className='FAQs'>
            <h4>FAQs</h4>
            <div className='FAQs-accordion'><FAQs /></div>
          </div>
        </div>
        <div className='details-right-section'>
          <div className='reservation'>
            <div className='price-header'>
              <div>A partir de : </div><div className='price'><h4>{car.price} </h4></div>
           
             dh </div>
            <hr />
            <div className='date-picker'>
              <div className='pick-text'>Veuillez choisir une date:</div>
              <div className='date-picker-car'>
                <DoubleDateInput
                  onDateRangeSelect={handleDateRangeSelect}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
            {reservationAttempted && !reservationData.startDate && !reservationData.endDate && (
              <div className="error-message">
                Veuillez sélectionner une période de location.
              </div>
            )}
            <hr />
            <div className='tarif-supp'>
              <h4>Tarifs supplémentaires</h4>
              <div className='list-tarifs'>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      id="childSeat"
                      onChange={handleCheckboxChange}
                      checked={reservationData.childSeat}
                    />
                    <label htmlFor="childSeat">Siège enfant 100dh</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="gps"
                      onChange={handleCheckboxChange}
                      checked={reservationData.gps}
                    />
                    <label htmlFor="gps">GPS Satellite 100dh</label>
                  </li>
                </ul>
              </div>
            </div>
            <button onClick={handleReservationSubmit}>Réserver</button>
          </div>
          <div className='why-us'></div>
        </div>
      </div>
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        handleLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default CarComponent;
