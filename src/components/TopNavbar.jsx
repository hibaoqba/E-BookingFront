import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './topNavbar.css';
import axios from 'axios'; // Changed from { Axios } to axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faUser,faLock,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-regular-svg-icons';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import LoginModal from './LoginModal';
const TopNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();


  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
      axios.get('http://localhost:8080/api/users/info', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, []); 
  
  const handleLoginSuccess = async () => {
    setIsLoggedIn(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8080/api/users/info', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  

  const handleLogout = () => {
    // Clear authentication token from local storage
    localStorage.removeItem('authToken');
    // Set isLoggedIn to false
    setIsLoggedIn(false);
    // Clear user info
    setUserInfo(null);
  };

  return (
    <>
      <nav className={`top-navbar ${location.pathname !== '/' ? 'dark-nav' : ''}`}>
        <ul className='left-section'>
          <li><a href='#'><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href='#'><FontAwesomeIcon icon={faLinkedin} /></a></li>
          <li><a href='#'><FontAwesomeIcon icon={faGoogle} /></a></li>
          <li><a href="mailto:contact@angbies.com">contact@angbies.com</a></li>
        </ul>
        
        <div className='right-section'>
          <Dropdown className='language-dropdown'>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='toggle'>
              <img src="src/assets/fr.png" alt="France Flag" className='flag'/> 
              Français
            </Dropdown.Toggle>
            <Dropdown.Menu className='language-menu'>
              <Dropdown.Item href="#/anglais">
                <img src="src/assets/uk.png" alt="uk Flag" className='flag'/> 
                Anglais
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="divider"></div>
          <span><FontAwesomeIcon icon={faPhone} /> 05 28 22 53 04 </span>
          <div className="divider"></div>
          {isLoggedIn ? (
            <div>
              <Dropdown className='user-dropdown'>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='user-toggle'>
                <FontAwesomeIcon icon={faUser} /> {userInfo ? `Hello ${userInfo.firstname}` : 'Hello'}
                </Dropdown.Toggle>
                <Dropdown.Menu className='user-menu'>
                <Dropdown.Item className='user-item' >
                <FontAwesomeIcon className='user-icon' icon={faUser} />  <Link to='/user/profile' >
                  Mon Profil
                  </Link>
                
                  </Dropdown.Item>
                  <Dropdown.Item className='user-item'>
                  <FontAwesomeIcon className='user-icon' icon={faClock} />    Historique des réservations
                  </Dropdown.Item>
                  <Dropdown.Item className='user-item'>
                  <FontAwesomeIcon className='user-icon' icon={faLock} /> Changer mon Mot De Passe
                  </Dropdown.Item>
                  <Dropdown.Item  onClick={handleLogout} className='user-item'>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className='user-icon logout-icon' />Déconnexion
                  </Dropdown.Item>
                 
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <a href='#' onClick={handleShowModal}><FontAwesomeIcon icon={faUser} /> Connexion ou inscription</a>
          )}
        </div>   
      </nav>
      <LoginModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleLoginSuccess={handleLoginSuccess} 
      />
    </>
  );
}

export default TopNavbar;
