import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReverseGeoCoding from '../location/ReverseGeocoding'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import CarImage from '../CarImage';
import '../../styles/carReservationCard.css'

const ApartmentReservationCard = ({ apartment, reservation }) => {
    const endDate = reservation.endDate;
    const startDate = reservation.startDate;
    const days = Math.round((new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    const price = apartment.price * days;

    // Calculate additional price for child seat and GPS
   
    const establishmentFee = 200;
    const finalPrice = price + establishmentFee;

    return (
        <Card className="car-reservation-card" style={{ width: '18rem' }}>
            <Card.Img className="car-conf-image" variant="top" src={`data:image/png;base64,${apartment.images[0]}`} />
            <Card.Body className='confirmation-card-body'>
                <Card.Title className="car-title">{apartment.titre}</Card.Title>
               
                    <div className='location-line'><FontAwesomeIcon className="location-icon" icon={faLocationDot}/> 
                    <ReverseGeoCoding latitude={apartment.latitude} longitude={apartment.longitude}/></div>
                  <hr />
                    <div className="reservation-dates">
                        <div>Date de Début: {startDate.toISOString().split('T')[0]}</div>
                        <div>Date de Fin: {endDate.toISOString().split('T')[0]}</div>
                        <div>Jours: {days}</div>
                    </div>
                    <hr />
                    <div className="prices">
                        <div>Prix initial: {price} DH</div>
                        <hr />
                        
                        <div><span className="fee">Frais d'établissement</span> - <span className="price">200 DH</span></div>
                        <div><span className="total">Prix total</span>: {finalPrice} DH</div>
                    </div>
             
            </Card.Body>
        </Card>
    );
}

export default ApartmentReservationCard;
