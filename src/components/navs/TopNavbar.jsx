import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import '../../styles/topNavbar.css';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faUser,faLock,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginModal from '../modals/LoginModal';
import LanguageDropdown from '../common/LanguageDropdown';
import UserDropdown from '../common/UserDropdown';
const TopNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('http://localhost:8080/api/users/currentUser', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setIsLoggedIn(true);
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setIsLoggedIn(false);
        setUserInfo(null);
      });
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  }, []);
  
  
  const handleLoginSuccess = async () => {
    setIsLoggedIn(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8080/api/users/currentUser', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setUserInfo(response.data);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/"); 
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
          <LanguageDropdown/>
          <div className="divider"></div>
          <span className='icon-with-info'><FontAwesomeIcon icon={faPhone} /> 05 28 22 53 04 </span>
          <div className="divider"></div>
          {isLoggedIn ? (
          <UserDropdown userInfo={userInfo} handleLogout={handleLogout}/>
          ) : (
            <a className='icon-with-info' href='#' onClick={handleShowModal}><FontAwesomeIcon icon={faUser} /> Connexion ou inscription</a>
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
