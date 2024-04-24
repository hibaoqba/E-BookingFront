import { React, useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader';
import '../../styles/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faUser, faLock, faArrowRightFromBracket, faCar,faPlus,faCarSide,faChartLine ,faChevronDown,faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Outlet } from 'react-router-dom';
import UseFetchUserInfo from '../UseFetchUserInfo';
import { IoPieChart } from "react-icons/io5";
const Profile = () => {

  const [voituresExpanded, setVoituresExpanded] = useState(false);

  const location = useLocation();
  const userInfo=UseFetchUserInfo();

  const isSeller = userInfo && userInfo.role === "CARSELLER";

  const handleVoituresToggle = () => {
    setVoituresExpanded(!voituresExpanded);
  };

  return (
    <div className='profile-container'>
      <div className='profile-left-container'>
        <div className='profile-header'>
          <ProfileHeader />
        </div>
        <hr className='profile-divider' />
        <div className='profile-navigation'>
          <Link className={`profile-link ${location.pathname === '/user/profile' ? 'selected-profile' : ''}`} to='/user/profile'>
            <FontAwesomeIcon className='user-icon' icon={faUser} /> Mon Profil
          </Link>
          <Link className={`profile-link ${location.pathname === '/user/history' ? 'selected-profile' : ''}`} to='/user/history'>
            <FontAwesomeIcon className='user-icon' icon={faClock} /> Historique des réservations
          </Link>
          <Link className={`profile-link ${location.pathname === '/user/password' ? 'selected-profile' : ''}`} to='/user/password'>
            <FontAwesomeIcon className='user-icon' icon={faLock} /> Changer mon Mot De Passe
          </Link>
          <Link className={`profile-link ${location.pathname === '/user/wishlist' ? 'selected-profile' : ''}`} to='/user/wishlist'>
            <FontAwesomeIcon icon={faHeart} className='user-icon' /> WishList
          </Link>
          {isSeller && (
            <>
            <Link className={`profile-link ${location.pathname === '/user/dashboard' ? 'selected-profile' : ''}`} to='/user/dashboard'>
                    <FontAwesomeIcon icon={faChartLine} />  Dashboard
                  </Link>
                  <Link className={`profile-link ${location.pathname === '/user/reservations' ? 'selected-profile' : ''} `} to='/user/reservations'>
                 <IoPieChart/> rapport de réservations
                  </Link>
              <div className={`profile-link ${voituresExpanded ? 'expanded' : ''}`} onClick={handleVoituresToggle}>
                 <FontAwesomeIcon icon={faCar} /> Voitures
                <FontAwesomeIcon icon={voituresExpanded ? faChevronUp : faChevronDown} className='expand-icon' />
              </div>
              
              {voituresExpanded && (
                <>
                  
                  <Link className={`profile-link ${location.pathname === '/user/cars' ? 'selected-profile' : ''} voiture-link `} to='/user/cars'>
                  <FontAwesomeIcon icon={faCarSide}/> Mes Voitures
                  </Link>
                
                  <Link className={`profile-link ${location.pathname === '/user/addCar' ? 'selected-profile' : ''} voiture-link `} to='/user/addCar'>
                   <FontAwesomeIcon icon={faPlus}/> Ajouter une Voiture
                  </Link>
                </>
              )}
              
            </>
          )}
        </div>
        <hr className='profile-divider' />
        <Link className='profile-link' to='/' >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='user-icon logout-icon' /> 
          Revenir vers la page d'accueil
        </Link>
      </div>
      <div className='profile-right-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
