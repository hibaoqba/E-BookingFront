import React from 'react';
import Card from 'react-bootstrap/Card';
import './cards.css'; // Import the CSS file

function Cards() {
    const places = [
        {
          name: 'Découvrez l\'Effervescence Culturelle au Souk El Had d\'Agadir',
          imageUrl: 'src/assets/souk.jpg',
          descriptionUrl: '/souk-description', 
        },
        {
          name: 'Découvrir la Richesse Culturelle de Rabat : Une Perle Marocaine',
          imageUrl: 'src/assets/rabat.jpg',
          descriptionUrl: '/rabat-description',
        },
        {
          name: 'Découvrir le Paradis : Un Voyage aux Cascades d\'Ouzoud !',
          imageUrl: 'src/assets/ouzoud.jpg',
          descriptionUrl: '/ouzoud-description',
        },
    ];

    return (
        <div className="card-container-class"> {/* Apply container class */}
            {places.map((place, index) => (
                <Card key={index} className="card-class"> 
                    <Card.Img variant="top" src={place.imageUrl} className="card-img-class" /> 
                    <Card.Body className='card-body-class'>
                        
                       
                        <Card.Link href={place.descriptionUrl} className='card-link-class'>{place.name}</Card.Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Cards;
