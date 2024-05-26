import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import Loading from '../common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Dropdown } from 'react-bootstrap';
import DoubleDateInput from '../DoubleDateInput';
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaBed,FaBath} from "react-icons/fa";
import '../../styles/apartment.css'
import { SlSizeFullscreen } from "react-icons/sl";
import ApartmentImage from './ApartmentImage';
import { faMagnifyingGlass,faHeart } from '@fortawesome/free-solid-svg-icons';
const ApartmentCards = () => {
  const [apartments, setApartments] = useState([]);
  const [sortedApartments, setSortedApartments] = useState([]);
  const [sortBy, setSortBy] = useState('price_asc');
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [clickedHeartIds, setClickedHeartIds] = useState([]);
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
                const wishlistResponse = await axios.get(`http://localhost:8080/api/apartmentWish/user?userId=${response.data.id}`);
                const wishlistIds = wishlistResponse.data.map(wish => wish.apartment_id);
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
    if (location.state && location.state.availableApartments) {
      setApartments(location.state.availableApartments);
      setSortedApartments(location.state.availableApartments);
      setLoading(false);
  } else {
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
  }
  }, [location.state]);

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
  useEffect(() => {
    const checkInitialHeartStatus = async () => {
        try {
            if (userInfo && userInfo.id) {
                const initialHeartStatus = await Promise.all(
                    sortedApartments.map(async (apartment) => {
                        const response = await axios.get(`http://localhost:8080/api/apartmentWish/isapartmentwishlist?userId=${userInfo.id}&apartmentId=${apartment.id}`);
                        return response.data ? apartment.id : null;
                    })
                );
                setClickedHeartIds(initialHeartStatus.filter((id) => id !== null));
            }
        } catch (error) {
            console.error('Error checking initial heart status:', error);
        }
    };

    checkInitialHeartStatus();
}, [sortedApartments, userInfo]);

const handleHeartClick = async (e, apartmentId) => {
    e.stopPropagation();
    try {
        if (userInfo && userInfo.id) {
            if (clickedHeartIds.includes(apartmentId)) {
                await axios.delete(`http://localhost:8080/api/apartmentWish/remove?userId=${userInfo.id}&apartmentId=${apartmentId}`);
                setClickedHeartIds(prevIds => prevIds.filter(id => id !== apartmentId));
            } else {
                await axios.post(`http://localhost:8080/api/apartmentWish/add?userId=${userInfo.id}&apartmentId=${apartmentId}`);
                setClickedHeartIds(prevIds => [...prevIds, apartmentId]);
            }
        }
    } catch (error) {
        console.error('Error updating heart status:', error);
    }
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
                 <div>
                 <button
                                                className={`heart-button ${clickedHeartIds.includes(apartment.id) ? 'clicked' : ''}`}
                                                onClick={(e) => handleHeartClick(e, apartment.id)}
                                            >
                                                <FontAwesomeIcon className='heart-icon' icon={faHeart} />
                                            </button>
                  <ApartmentImage apartmentId={apartment.id} left={0} right={0} /> </div>
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
