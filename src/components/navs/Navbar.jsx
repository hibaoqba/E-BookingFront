import React, { useState, useEffect } from 'react';
import '../../styles/navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`middle-navbar ${isScrolled ? 'fixed-navbar' : ''} ${location.pathname !== '/' ? 'dark-middle-nav' : ''}`}>
      <ul className={`right ${isScrolled ? 'grey-links' : ''}`}>
      <li >
        <Link className={`${location.pathname === '/' ? 'selected-link' : 'normal-link'}`} to="/" >Accueil</Link>
      </li>
      <li >
        <Link  className={`${location.pathname === '/car' ? 'selected-link' : 'normal-link'}`} to="/car">Voiture</Link>
      </li>
      <li>
        <Link  className={`${location.pathname === '/apartment' ? 'selected-link' : 'normal-link'}`} to="/apartment">Appartement</Link>
      </li>
      </ul>
    </nav>
  );
}

export default Navbar;
