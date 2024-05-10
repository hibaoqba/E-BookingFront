import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import { faUser,faLock,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserDropdown = ({userInfo,handleLogout}) => {
  return (
    
        <div className='icon-with-info'>
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
                  <Link to="/user/history">
                  <FontAwesomeIcon className='user-icon' icon={faClock} />    Historique des réservations
                  
                  </Link></Dropdown.Item>
                  <Dropdown.Item className='user-item' >
                    <Link to="/user/password">
                  <FontAwesomeIcon className='user-icon' icon={faLock} /> Changer mon Mot De Passe
                  </Link>
                  
                  </Dropdown.Item>
                  <Dropdown.Item  onClick={handleLogout} className='user-item'>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className='user-icon logout-icon' />Déconnexion
                  </Dropdown.Item>
                 
                </Dropdown.Menu>
              </Dropdown>
            </div>
    
  )
}

export default UserDropdown
