import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import '../../styles/footer.css';
import Broadcast from './Broadcast';

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
        <h5>Nos Services</h5>
        <a href="#">Relations avec les investisseurs</a>
        <a href="#">Programme de récompenses</a>
        <a href="#">PointsPLUS</a>
        <a href="#">Partenaires</a>
        <a href="#">Répertorier mon hôtel
</a>
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
        <h5>liste de diffusion</h5>
        <div>Inscrivez-vous à notre liste de diffusion pour recevoir les dernières mises à jour et offres.</div>
        <Broadcast/>
      </div>
      
    </footer>
  );
};

export default FooterComponent;
