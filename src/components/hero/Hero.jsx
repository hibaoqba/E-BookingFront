import React, { useState } from 'react';

import './hero.css';
import TabComponent from '../common/TabComponent';

const Hero = () => {
    
  

    return (
        <div className='hero'>
            <div className='hero-content'>
                <div className='hero-text'>
                    <h1>Réservations Instantanées Simplifiées</h1>
                    <br />
                    <h4>Trouvez d'excellents Appartement et Voitures</h4>
                </div>
                <TabComponent/>
            </div>
        </div>
    );
};

export default Hero;
