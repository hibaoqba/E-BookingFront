import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/sellerCar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil,faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import CarImage from '../CarImage'; 
import CarUpdateModal from '../updateCar/CarUpdateModal';
import UserModal from './UserModal'; // Import the UserModal component
import ApartmentImage from '../apartmentComponents/ApartmentImage';

const AllApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false); 
  const [selectedApartment, setSelectedApartment] = useState(null); 

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/apartments`);
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };
  
    fetchApartments();
  }, []); 
  
  const handleDeleteApartment = async (apartmentId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/apartments/${apartmentId}`);
      console.log('Apartment deleted successfully:', response.data);
      setApartments(apartments.filter(apartment => apartment.id !== apartmentId));
      setshowDeleteModal(false); 
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  const handleshowDeleteModal = (apartmentId) => {
    setSelectedApartmentId(apartmentId);
    setshowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setshowDeleteModal(false);
  };

  const handleShowUserModal = (apartment) => {
    setSelectedApartment(apartment); 
    setShowUserModal(true); 
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false); 
  };

  return (
    <div>
      {apartments.map(apartment => (
        <div key={apartment.id} className="car-item">
          <div className='car-image'>  
            <ApartmentImage  apartmentId={apartment.id} left={10} right={0} /> 
          </div>
          <div className="car-details">
            <h2>{apartment.brand} {apartment.model}</h2>
            <p>{apartment.description}</p>
            <Link to={`/apartment/${apartment.id}`} className="btn btn-primary car-details-button"><FontAwesomeIcon icon={faEye}/> </Link>
            <button className="btn btn-danger car-delete-button" onClick={() => handleshowDeleteModal(apartment.id)}> <FontAwesomeIcon icon={faTrash}/> </button>
            <button className='btn btn-info car-update-button' onClick={() => handleShowUserModal(apartment)}><FontAwesomeIcon icon={faUser}/> </button>          
          </div>
        </div>
      ))}

      <Modal className='confirmation-modal' show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton >
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes vous sur de vouloir supprimer cette voiture?</Modal.Body>
        <Modal.Footer>
          <div className='delete-buttons'>
            <Button className="confirm-delete" onClick={() => handleDeleteApartment(selectedApartmentId)}>
              supprimer
            </Button>
            <Button className='cancel-delete' onClick={handleCloseModal}>
              fermer
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {showUserModal && (
        <UserModal item={selectedApartment} onClose={handleCloseUserModal} />
      )}
    </div>
  );
};

export default AllApartments;
