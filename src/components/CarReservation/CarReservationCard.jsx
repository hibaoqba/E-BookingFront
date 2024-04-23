import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReverseGeoCoding from '../location/ReverseGeocoding'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import CarImage from '../CarImage';
import '../../styles/carReservationCard.css'

const CarReservationCard = ({ car, reservation }) => {
    const endDate = reservation.endDate;
    const startDate = reservation.startDate;
    const days = Math.round((new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    const initialPrice = car.price * days;

    // Calculate additional price for child seat and GPS
    let additionalPrice = 0;
    if (reservation.childSeat) {
        additionalPrice += 100;
    }
    if (reservation.gps) {
        additionalPrice += 100;
    }

    // Total price including additional features
    const totalPrice = initialPrice + additionalPrice;
    const establishmentFee = 200;
    const finalPrice = totalPrice + establishmentFee;

    return (
        <Card className="car-reservation-card" style={{ width: '18rem' }}>
            <Card.Img className="car-conf-image" variant="top" src={`data:image/png;base64,${car.images[0]}`} />
            <Card.Body className='confirmation-card-body'>
                <Card.Title className="car-title">{car.brand} {car.model} - {car.year}</Card.Title>
               
                    <div className='location-line'><FontAwesomeIcon className="location-icon" icon={faLocationDot}/> <ReverseGeoCoding latitude={car.latitude} longitude={car.longitude}/></div>
                  <hr />
                    <div className="reservation-dates">
                        <div>Date de Début: {startDate.toISOString().split('T')[0]}</div>
                        <div>Date de Fin: {endDate.toISOString().split('T')[0]}</div>
                        <div>Jours: {days}</div>
                    </div>
                    <hr />
                    <div className="prices">
                        <div>Prix initial: {initialPrice} DH</div>
                        <hr />
                        {reservation.childSeat && <div><span className="feature">Siège enfant</span> - <span className="price">100 DH</span></div>}
                        {reservation.gps && <div><span className="feature">GPS</span> - <span className="price">100 DH</span></div>}
                        <div><span className="fee">Frais d'établissement</span> - <span className="price">200 DH</span></div>
                        <div><span className="total">Prix total</span>: {finalPrice} DH</div>
                    </div>
             
            </Card.Body>
        </Card>
    );
}

export default CarReservationCard;
