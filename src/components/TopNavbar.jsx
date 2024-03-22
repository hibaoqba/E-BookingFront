import React, { useState } from 'react';
import './topNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import LoginModal from './LoginModal'; // Import the renamed LoginModal component

const TopNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
    <nav className='top-navbar'>
      <ul className='left-section'>
        <li><FontAwesomeIcon icon={faFacebook} /></li>
        <li><FontAwesomeIcon icon={faLinkedin} /></li>
        <li><FontAwesomeIcon icon={faGoogle} /></li>
        <li><a href="mailto:contact@angbies.com">contact@angbies.com</a></li>
      </ul>
      
      <div className='right-section'>
        <Dropdown className='dropdown'>
          <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='toggle'>
            <img src="src/assets/fr.png" alt="France Flag" className='flag'/> 
            Français
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/anglais">
              <img src="src/assets/uk.png" alt="uk Flag" className='flag'/> 
              Anglais
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="divider"></div>
        <span><FontAwesomeIcon icon={faPhone} /> 05 28 22 53 04 </span>
        <a href='#' onClick={handleShowModal}><FontAwesomeIcon icon={faUser} /> connexion ou inscription</a>
      </div>

      
    </nav>
    <LoginModal show={showModal} handleClose={handleCloseModal} /> 
    </>
  );
}

export default TopNavbar;
