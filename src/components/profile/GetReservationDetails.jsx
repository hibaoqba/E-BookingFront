import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import '../../styles/getInvoiceById.css'
import '../../styles/getReservationDetails.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CarImage from '../CarImage';
import UserDetailsComponent from '../common/UserDetailsComponent';
import CarDetails from '../common/CarDetails';
const GetReservationDetails = ({ reservationId }) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservations/${reservationId}`);
        setReservation(response.data);
      } catch (error) {
        setError('Error fetching reservation details');
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [reservationId]);

  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reservation) {
    return <div>No reservation found</div>;
  }

  return (
    <div>
       
      
      <Button variant="primary" className='invoice-show' onClick={() => setShowModal(true)}>
       <FontAwesomeIcon icon={faCircleInfo} /> détails
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>Voiture</h4> 
        <CarDetails car={reservation.car}/>
        <hr />
        <h4>Locateur</h4>  
         <UserDetailsComponent user={reservation.car.seller}/>
         <hr />
         <h4>Locataire</h4>  
         <UserDetailsComponent user={reservation.user}/>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetReservationDetails;
