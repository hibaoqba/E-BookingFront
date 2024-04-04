import React from 'react';
import './navbar.css';
import { Link,useLocation  } from 'react-router-dom';
const Navbar = () => {
  const location = useLocation();
  return (
  
    <nav className={`middle-navbar ${location.pathname !== '/' ? 'dark-middle-nav' : ''}`}>
      <ul className='right'>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to='/car'>Voiture</Link></li>
        <li><Link to='/apartment'>Appartement</Link></li>
      </ul>
      
     
      
     
    </nav>
  );
}

export default Navbar;
