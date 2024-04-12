import React from 'react'
import ProfileHeader from './ProfileHeader'
import './profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link ,useLocation } from 'react-router-dom'
import { faUser,faLock,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {faClock,faHeart} from '@fortawesome/free-regular-svg-icons';
import { Outlet } from 'react-router-dom';
const Profile = () => {
  const location = useLocation();

  return (
    <div className='profile-container'>
      <div className='profile-left-container'>
            <div className='profile-header'>
                <ProfileHeader/>
            </div>
            <hr className='profile-divider'/>
            <div className='profile-navigation'>
            <Link className={`profile-link ${location.pathname === '/user/profile' ? 'selected-profile' : ''}`} to='/user/profile'>
            <FontAwesomeIcon className='user-icon' icon={faUser} /> Mon Profil
          </Link>
          <Link className={`profile-link ${location.pathname === '/user/history' ? 'selected-profile' : ''}`} to='/user/history'>
            <FontAwesomeIcon className='user-icon' icon={faClock} />Historique des réservations
          </Link>
          <Link className={`profile-link ${location.pathname === '/user/password' ? 'selected-profile' : ''}`} to='/user/password'>
            <FontAwesomeIcon className='user-icon' icon={faLock} /> Changer mon Mot De Passe
          </Link>
          <Link className={`profile-link ${location.pathname === '/user/wishlist' ? 'selected-profile' : ''}`} to='/user/wishlist'>
            <FontAwesomeIcon icon={faHeart} className='user-icon' />WishList
          </Link>
               </div>
            <hr className='profile-divider'/>
            <Link className='profile-link' to='/' ><FontAwesomeIcon icon={faArrowRightFromBracket} className='user-icon logout-icon' />Revenir vers la page d'accueil</Link>

            


      </div>
      <div className='profile-right-container'>
    
     
      <Outlet />
      
      </div>
    
    </div>
  )
}

export default Profile;