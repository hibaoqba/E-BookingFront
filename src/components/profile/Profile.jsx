import { React, useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader';
import '../../styles/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faUser, faLock, faArrowRightFromBracket, faCar,faPlus,faCarSide,faChartLine ,faChevronDown,faChevronUp, faUserGroup, faUserTie, faBuilding, faGaugeHigh, faList, faNewspaper, faFile, faBell} from '@fortawesome/free-solid-svg-icons';
import { faClock, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { Outlet } from 'react-router-dom';
import UseFetchUserInfo from '../UseFetchUserInfo';
import { BsBuilding,BsBuildingAdd,BsBuildings } from 'react-icons/bs';

import { IoPieChart } from "react-icons/io5";
import AdminLinks from '../adminComponents/AdminLinks';
import ApartmentSellerLinks from './profileLinks/ApartmentSellerLinks';
const Profile = () => {

  const [voituresExpanded, setVoituresExpanded] = useState(false);

  const location = useLocation();
  const userInfo=UseFetchUserInfo();

  const isCarSeller = userInfo && userInfo.role === "CARSELLER";
  const isCarSellerOrAdmin = userInfo && userInfo.role === "CARSELLER" ||"admin";
  const isApartmentSellerOrAdmin = userInfo && userInfo.role === "APARTMENTSELLER"||"ADMIN";
  const [apartmentsExpanded, setApartmentsExpanded] = useState(false);

  const isNotClient = userInfo && userInfo.role !== "CLIENT";
  const isAdmin = userInfo && userInfo.role === "ADMIN";
const isApartmentSeller = userInfo && userInfo.role === "APARTMENTSELLER";
  const handleVoituresToggle = () => {
    setVoituresExpanded(!voituresExpanded);
  };
  const handleApartmentsToggle = () => {
    setApartmentsExpanded(!apartmentsExpanded);
};
  return (
    <div className='profile-container'>
      <div className='profile-left-container'>
        <div className='profile-header'>
          <ProfileHeader />
        </div>
        <hr className="hr-text gradient" data-content="Profil"/>  
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
          {isNotClient && (
            <>
          <hr className="hr-text gradient" data-content="Espace Vendeur"/>  
             {isCarSeller && (

              <>
              
            <Link className={`profile-link ${location.pathname === '/user/dashboard' ? 'selected-profile' : ''}`} to='/user/dashboard'>
                    <FontAwesomeIcon icon={faChartLine} />Tableau de bord
                  </Link>
                  <Link className={`profile-link ${location.pathname === '/user/reservations' ? 'selected-profile' : ''} `} to='/user/reservations'>
                 <IoPieChart/>rapport de réservations
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
                
                {isAdmin && (
                  
              <>
                <Link className={`profile-link ${location.pathname === '/user/admin/sellerDashboard' ? 'selected-profile' : ''}`} to='/user/admin/sellerDashboard'>
                    <FontAwesomeIcon icon={faChartLine} />Tableau de bord
                  </Link>
                  <Link className={`profile-link ${location.pathname === '/user/admin/sellerReservation' ? 'selected-profile' : ''} `} to='/user/admin/sellerReservation'>
                 <IoPieChart/>rapport de réservations
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

              <div className={`profile-link ${apartmentsExpanded ? 'expanded' : ''}`} onClick={handleApartmentsToggle}>
                <BsBuildings/> Appartements
                <FontAwesomeIcon icon={apartmentsExpanded ? faChevronUp : faChevronDown} className='expand-icon' />
            </div>
            {apartmentsExpanded && (
                <>
                    <Link className={`profile-link ${location.pathname === '/user/apartments' ? 'selected-profile' : ''} apartment-link `} to='/user/apartments'>
                    <BsBuilding
                    /> Mes Apartments
                    </Link>
                    <Link className={`profile-link ${location.pathname === '/user/addApartment' ? 'selected-profile' : ''} apartment-link `} to='/user/addApartment'>
                       <BsBuildingAdd/> Ajouter un Appartement
                    </Link>
                </>
            )}
                        <hr className="hr-text gradient" data-content="Espace Admin"/>  

            <Link className={`profile-link ${location.pathname === '/user/adminDashboard' ? 'selected-profile' : ''}`} to='/user/adminDashboard'>
                    <FontAwesomeIcon icon={faGaugeHigh} />Tableau de bord Admin
                  </Link>
                  <Link className={`profile-link ${location.pathname === '/user/adminReservations' ? 'selected-profile' : ''} `} to='/user/adminReservations'>
                  <FontAwesomeIcon icon={faFile} /> toutes les réservations
                  </Link> 
                  <Link className={`profile-link ${location.pathname === '/user/allCars' ? 'selected-profile' : ''} `} to='/user/allCars'>
                  <FontAwesomeIcon icon={faCarSide} /> toutes les voitures
                  </Link> 
                  <Link className={`profile-link ${location.pathname === '/user/allApartments' ? 'selected-profile' : ''} `} to='/user/allApartments'>
                  <FontAwesomeIcon icon={faBuilding} /> tous les apartements
                  </Link>
                  <Link className={`profile-link ${location.pathname === '/user/allUsers' ? 'selected-profile' : ''} `} to='/user/allUsers'>
                  <FontAwesomeIcon icon={faUserGroup} /> Utilisateurs
                  </Link>
                  <Link className={`profile-link ${location.pathname === '/user/requests' ? 'selected-profile' : ''} `} to='/user/requests'>
                  <FontAwesomeIcon icon={faBell} /> Demandes
                  </Link>
                  </>
                
                )}
                {isApartmentSeller && (
           
           <ApartmentSellerLinks/>
                 
                
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
