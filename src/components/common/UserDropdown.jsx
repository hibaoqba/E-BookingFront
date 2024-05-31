import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation } from 'react-router-dom';
import { faClock, faUser, faLock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserDropdown = ({ userInfo, handleLogout }) => {
  const location = useLocation();

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className='icon-with-info'>
      <Dropdown className='user-dropdown'>
        <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='user-toggle'>
          <FontAwesomeIcon icon={faUser} /> {userInfo ? `Bonjour ${userInfo.firstname}` : 'Hello'}
        </Dropdown.Toggle>
        <Dropdown.Menu className='user-menu'>
          <Dropdown.Item className='user-item' onClick={() => navigateTo('/user/profile')}>
            <FontAwesomeIcon className='user-icon' icon={faUser} /> Mon Profil
          </Dropdown.Item>
          <Dropdown.Item className='user-item' onClick={() => navigateTo('/user/history')}>
            <FontAwesomeIcon className='user-icon' icon={faClock} /> Historique des réservations
          </Dropdown.Item>
          <Dropdown.Item className='user-item' onClick={() => navigateTo('/user/password')}>
            <FontAwesomeIcon className='user-icon' icon={faLock} /> Changer mon Mot De Passe
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout} className='user-item'>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className='user-icon logout-icon' /> Déconnexion
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
