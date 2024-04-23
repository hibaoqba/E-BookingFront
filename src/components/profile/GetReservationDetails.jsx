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
          <Modal.Title>Reservation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs
      defaultActiveKey="reservation"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="reservation" title="Réservation" className='details-tab'>
   
          <div className='details-modal-image'><CarImage className='details-modal-image' carId={reservation.car.id}left={10} right={10} /></div>
          <h2> {reservation.titre}</h2>
          <div>numero: {reservation.id}</div>
          
          <div>Brand: {reservation.car.brand}</div>
          <div>Model: {reservation.car.model}</div>
          <div>Description: {reservation.car.description}</div>
          <div>Year: {reservation.car.year}</div>
           <div> Frais supplémentaire: {reservation.f}</div>
   </Tab>
   <Tab eventKey="client" title="client" className='details-tab'>
        
        <div>nom:{reservation.user.lastname}</div>
        <div>prenom:{reservation.user.firstname}</div>
        <div></div>
      </Tab>
      
    </Tabs>
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

export default GetReservationDetails;
