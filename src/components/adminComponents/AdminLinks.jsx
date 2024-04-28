import {React,useState} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie,faGauge, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp,faChevronDown,faUserGroup } from '@fortawesome/free-solid-svg-icons';
const AdminLinks = () => {
    
  return (

              <div >
               
                
                  
               <Link className={`profile-link ${location.pathname === '/user/profile' ? 'selected-profile' : ''}`} to='/user/profile'>
            <FontAwesomeIcon className='user-icon' icon={faUserGroup} />Utilisateurs
          </Link>
          <Link className={`profile-link ${location.pathname === '/user/history' ? 'selected-profile' : ''}`} to='/user/history'>
            <FontAwesomeIcon className='user-icon' icon={faGaugeHigh} /> tableau de bord
          </Link>
             
         
      
            </div>
  )
}

export default AdminLinks
