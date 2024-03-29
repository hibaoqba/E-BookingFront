import React from 'react';
import { Carousel } from 'react-bootstrap'; // Assuming you're using Bootstrap for the carousel
import './destinations.css'
const cities = [
  {
    name: 'Agadir',
    imageUrl: 'src/assets/agadir.jpg',
    descriptionUrl: '/agadir-description', 
  },
  {
    name: 'marrakech',
    imageUrl: 'src/assets/marrakech.jpg',
    descriptionUrl: '/marrakech-description',
  },
  {
    name: 'Fes',
    imageUrl: 'src/assets/fez.jpg',
    descriptionUrl: '/fes-description',
  },
];

const DestinationsCarousel = () => {
    return (
        <div className="destinations">
            <h2>Meilleures Destinations</h2>
            <div className="horizontal-line-container1">
        <div className="horizontal-line1"></div>
      </div>
      <Carousel className="destinations-carousel">
        {cities.map((city, index) => (
          <Carousel.Item key={index}>
            <img
              className="carousel-image"
              src={city.imageUrl}
              alt={city.name}
            />
            <Carousel.Caption>
              <h3>{city.name}</h3>
              <p><a href={city.descriptionUrl}>Learn more</a></p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel></div>
    );
  };
export default DestinationsCarousel;
