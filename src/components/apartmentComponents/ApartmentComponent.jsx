import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'; 
import '../../styles/apartmentComponent.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaBed,FaBath, FaParking, FaSwimmer, FaUtensils, FaCoffee, FaThermometerHalf} from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaWifi } from 'react-icons/fa';
import DoubleDateInput from '../DoubleDateInput';
import Loading from '../common/Loading';
import UseFetchUserInfo from '../UseFetchUserInfo';
import { FaKitchenSet, FaPerson,FaChildren } from 'react-icons/fa6';

const ApartmentComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = UseFetchUserInfo();
  const [disabledDates, setDisabledDates] = useState([]);


  const today = new Date().toISOString().split('T')[0];
  
  const [reservationData, setReservationData] = useState({
    startDate: '',
    endDate: '',
    breakfast: false,
    cleaning: false
  });
  useEffect(() => {
    const fetchReservationDates = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/apartments/${id}/reservationdates`);
        setDisabledDates(response.data);
      } catch (error) {
        console.error('Error fetching reservation dates:', error);
      }
    };

    fetchReservationDates();
  }, [id]);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/apartments/${id}`);
        setApartment(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching apartment:', error);
        setLoading(false);
      }
    };

    fetchApartment();
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
    navigate(`/apartment/confirmation`, { state: { reservationData, apartment } });
  };

  if (loading) {
    return <Loading />;
  }

  if (!apartment) {
    return <div>ap not found</div>;
  }

  return (
    <div className='apartment-details-container'>
      <div className='apartment-details-subcontainer'>
        <div className='details-left-section'>
          <div className='apartment-details-header'>
            <h2>{apartment.titre}</h2>
          </div>
          <hr />
          <div className='apartment-features'>
            <div className='details-feature'>
              <div className='details-icon'><FaBed/></div>
              <div className='features-text'>{apartment.apartmentFeatures.noBed} Lits</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><FaBath/></div>
              <div className='features-text'>{apartment.apartmentFeatures.noBathroom} salles de bain</div>
            </div>
            <div className='details-feature'>
              <div className='details-icon'><SlSizeFullscreen/></div>
              <div className='features-text'> {apartment.apartmentFeatures.square}m²</div>
            </div>
         
          </div>
          <hr />
          <div className='apartment-details-carrousel'>
            <Carousel className="apartment-carousel">
              {apartment && apartment.images && (
                apartment.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="apartment-carousel-image"
                      src={`data:image/png;base64,${image}`}
                      alt={`Car Image ${index}`}
                      style={{ width: '100%' }}
                    />
                  </Carousel.Item>
                ))
              )}
            </Carousel>
          </div>
          <div className='apartment-description'>
            <h4>Description</h4>
            {apartment.description}
          </div>
          <hr />
          <div className='additional-features'>
            <ul>
              <li><SlSizeFullscreen className="additional-icon"/>{apartment.apartmentFeatures.square} m²</li>
              <li><FaBed className="additional-icon"/>{apartment.apartmentFeatures.noBed} lits</li>
              <li><FaBath className="additional-icon"/> {apartment.apartmentFeatures.noBathroom} salles de bain</li>
              <li><FaPerson className="additional-icon"/> {apartment.apartmentFeatures.noAdults} Adultes</li>
              <li><FaChildren className="additional-icon"/> {apartment.apartmentFeatures.noChildren} Enfants</li>

              {apartment.apartmentFeatures.wifiInternet && <li><FaWifi className="additional-icon"/>WIFI</li>}
              {apartment.apartmentFeatures.parking && <li><FaParking className="additional-icon"/>Parking</li>}
              {apartment.apartmentFeatures.pool && <li><FaSwimmer className="additional-icon"/>Piscine</li>}
              {apartment.apartmentFeatures.breakfast && <li><FaCoffee className="additional-icon"/>Petit déjeuner</li>}
              {apartment.apartmentFeatures.kitchen && <li><FaUtensils className="additional-icon"/>Cuisine</li>}
              {apartment.apartmentFeatures.airConditioning && <li><FaThermometerHalf className="additional-icon"/>Climatiseur</li>}


            </ul>
          </div>
          <hr />
          <h4>Localisation</h4>
          <MapContainer center={[apartment.latitude, apartment.longitude]} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[apartment.latitude, apartment.longitude]}>
       
      </Marker>
    </MapContainer>
          <hr />
         
        </div>
        <div className='details-right-section'>
          <div className='reservation'>
            <div className='price-header'>
              <div>A partir de : </div><div className='price'><h4>{apartment.price}</h4></div>
            </div>
            <hr />
            <div className='date-picker'>
              <div className='pick-text'>Veuillez choisir une date:</div>
              <div className='date-picker-car'> 
              <DoubleDateInput 
              onDateRangeSelect={handleDateRangeSelect} 
              disabledDates={disabledDates} 
               /></div>
            </div>
            <hr />
           
            <button onClick={handleReservationSubmit}>Réserver</button>
          </div>
          <div className='why-us'></div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentComponent;
