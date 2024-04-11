import React from 'react'
import ProfileHeader from './ProfileHeader'
import './profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import { faUser,faLock,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {faClock,faHeart} from '@fortawesome/free-regular-svg-icons';
import ProfileRightSection from './ProfileRightSection';

const Profile = () => {
  return (
    <div className='profile-container'>
      <div className='profile-left-container'>
            <div className='profile-header'>
                <ProfileHeader/>
            </div>
            <hr className='profile-divider'/>
            <div className='profile-navigation'>
              <Link to='/user/profile' className='profile-link selected-profile' > <FontAwesomeIcon className='user-icon' icon={faUser} /> Mon Profil </Link>
                <Link className='profile-link' ><FontAwesomeIcon className='user-icon' icon={faClock} />Historique des réservations</Link>
                <Link className='profile-link' ><FontAwesomeIcon className='user-icon' icon={faLock} /> Changer mon Mot De Passe</Link>
                <Link className='profile-link' ><FontAwesomeIcon icon={faHeart} className='user-icon' />WishList</Link>

            </div>
            <hr className='profile-divider'/>
            <Link className='profile-link' to='/' ><FontAwesomeIcon icon={faArrowRightFromBracket} className='user-icon logout-icon' />Revenir vers la page d'accueil</Link>

            


      </div>
      <div className='profile-right-container'>
    <div className='parametres'> 
     <p>Paramètres</p>
     </div>
      <hr className='profile-divider1'/>
       <ProfileRightSection/>
      
      </div>
    
    </div>
  )
}

export default Profile
