import React from 'react';
import './navbar.css';
const Navbar = () => {
  return (
    <nav className='container'>
      <img src="src/assets/angbies.png" alt="img" className="logo"/>
      <ul>
        <li>accueil</li>
        <li>appartement</li>
        <li>voiture</li>
      
      </ul>
    </nav>
  );
}

export default Navbar;
