import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

const FooterComponent = () => {
  return (
    <footer className='footer-container'>
      <div className='sub-container'>
        <h5>Besoin d'Aide?</h5>
        <div className='div1'>
          <div className='inline'>
            <FontAwesomeIcon icon={faPhone} className='icon' />
          </div>
          <div className='inline'>
            <a href="#">Vous avez des question?</a>
            <a href="#">Appelez nous 24h/24 7j/7</a>
            <a href="#">(+212)5 64 73 92 83</a>
          </div>
        </div>
        <div className='div2'>
          <h5>contact info</h5>
          <p>adresse</p>
        </div>
      </div>
      <div className='sub-container'>
        <h5>Société</h5>
        <a href="#">A propos de nous</a>
        <a href="#">carriere</a>
        <a href="#">conditions d'utilisation</a>
        <a href="#">declaration confidentialité</a>
        <a href="#">donnez nous un commentaire</a>
      </div>
      <div className='sub-container'>
        <h5>Société</h5>
        <a href="#">A propos de nous</a>
        <a href="#">carriere</a>
        <a href="#">conditions d'utilisation</a>
        <a href="#">declaration confidentialité</a>
        <a href="#">donnez nous un commentaire</a>
      </div>
      <div className='sub-container'>
        <h5>Société</h5>
        <a href="#">A propos de nous</a>
        <a href="#">carriere</a>
        <a href="#">conditions d'utilisation</a>
        <a href="#">declaration confidentialité</a>
        <a href="#">donnez nous un commentaire</a>
      </div>
      
    </footer>
  );
};

export default FooterComponent;
