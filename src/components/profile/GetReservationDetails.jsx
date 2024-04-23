import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import '../../styles/getInvoiceById.css'
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
          <p>ID: {reservation.id}</p>
          <p>Title: {reservation.titre}</p>
          <p>Brand: {reservation.car.brand}</p>
          <p>Model: {reservation.car.model}</p>
          <p>Description: {reservation.car.description}</p>
          <p>Year: {reservation.car.year}</p>
          {/* Add more reservation details here */}
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
