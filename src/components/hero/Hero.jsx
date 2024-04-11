import React, { useState } from 'react';

import './hero.css';
import TabComponent from '../TabComponent';

const Hero = () => {
    
  

    return (
        <div className='hero'>
            <div className='hero-content'>
                <div className='hero-text'>
                    <h1>Votre Aventure Commence Ici : Réservations Instantanées Simplifiées</h1>
                    <br />
                    <h4>Trouvez d'excellents hôtels, circuits, voitures et activités au Maroc.</h4>
                </div>
                <TabComponent/>
            </div>
        </div>
    );
};

export default Hero;
