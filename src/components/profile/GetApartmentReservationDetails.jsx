import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import '../../styles/getInvoiceById.css'
import '../../styles/getReservationDetails.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ApartmentDetails from '../common/ApartmentDetails'
import UserDetailsComponent from '../common/UserDetailsComponent'
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
          <Modal.Title>Details de la réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>Appartement</h4>
        <ApartmentDetails apartment={reservation.apartment}/>
       <h4>Locateur</h4>

        <UserDetailsComponent user={reservation.apartment.seller}/>
        <h4>Locataire</h4>

        <UserDetailsComponent user={reservation.user}/>

    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetApartmentReservationDetails;
