import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Dropdown } from 'react-bootstrap';
import DoubleDateInput from '../DoubleDateInput';
import { LuBadgeDollarSign } from "react-icons/lu";

import { FaBed,FaBath} from "react-icons/fa";
import '../../styles/apartment.css'
import { SlSizeFullscreen } from "react-icons/sl";
import ApartmentImage from './ApartmentImage';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const ApartmentCards = () => {
  const [apartments, setApartments] = useState([]);
  const [sortedApartments, setSortedApartments] = useState([]);
  const [sortBy, setSortBy] = useState('price_asc');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({});
  const handleApartmentClick = (apartmentId) => {
    navigate(`/apartment/${apartmentId}`);
  };
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
          
        } catch (error) {
          console.error('Error fetching user info:', error);
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/apartments');
        setApartments(response.data);
        setSortedApartments(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching Apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  useEffect(() => {
    sortApartments();
  }, [sortBy, apartments]);

  const handleDateRangeSelect = (dateRange) => {
    console.log('Selected date range:', dateRange);
  };

  const sortApartments = () => {
    let sorted = [...apartments];
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
    setSortedApartments(sorted);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  

  

    
 
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='apartment-page-container'>
      <div className='apartment-sections-container'>
        <div className='apartment-left-section'>
          <Card className="apartment-page-card">
            <Card.Body className="apartment-research-body">
              <div className="input-with-icon-apartment">
                <input type="text" placeholder="Où vas-tu?" />
              </div>
              <label> choisir une date:</label>
              <div className='date-picker-apartment'>
              <DoubleDateInput onDateRangeSelect={handleDateRangeSelect} disabledDates={[]} />
              </div>
              <button className='apartment-research-body-button'>
                <FontAwesomeIcon icon={faMagnifyingGlass}/> rechercher
              </button>
            </Card.Body>
          </Card>
        </div>
        <div className='apartment-right-section'>
          <div className='apartment-header'>
            <div className='apartment-count'><h2>{sortedApartments.length} Appartements trouvées</h2></div>
            <div className='sort-apartments'>
              Trier par: 
              <Dropdown className='apartment-sort-dropdown'>
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
          <div className="apartment-container">
          {sortedApartments.map(apartment => (
              <div key={apartment.id} className="apartment-link">
                <div className="apartment-card" onClick={() => handleApartmentClick(apartment.id)}>
                 <div><ApartmentImage apartmentId={apartment.id} left={10} right={10} /> </div>
                  <div className="apartment-card-details">
                    <h2 className="apartment-card-title">{apartment.titre} </h2>
                    <div className="apartment-price"><LuBadgeDollarSign className='dollar'/> {apartment.price}</div>

                    <hr />
                    <div className="features-container">
                      <div className="feature"><FaBed/>{apartment.apartmentFeatures.noBed} Lits</div>
                      <div className="feature"><FaBath/>{apartment.apartmentFeatures.noBathroom} salles de bain </div>
                      <div className="feature"><SlSizeFullscreen/>{apartment.apartmentFeatures.square}m²</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
}

export default ApartmentCards
