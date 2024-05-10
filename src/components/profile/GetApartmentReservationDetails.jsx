import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import '../../styles/getInvoiceById.css'
import '../../styles/getReservationDetails.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ApartmentImage from '../apartmentComponents/ApartmentImage'
const GetApartmentReservationDetails = ({ reservationId }) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/apt_reservations/${reservationId}`);
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
          <Modal.Title>Reservation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
      <div className='details-modal-image'><ApartmentImage apartmentId={reservation.apartment.id} left={10} right={10} /></div>

          <h2> {reservation.titre}</h2>
          <div>numero: {reservation.id}</div>
          
          <div>titre: {reservation.apartment.titre}</div>
          <div>Description: {reservation.apartment.description}</div>
          <div> id Client: {reservation.user.id}</div>
          <div>id Vendeur: {reservation.apartment.seller.id}</div>
     
      
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetApartmentReservationDetails;