import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil,faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import ApartmentImage from '../apartmentComponents/ApartmentImage'; 
import '../../styles/sellerApartment.css';
import ApartmentUpdateModal from './ApartmentUpdateModal';
const SellerApartments = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); 
  const [selectedApartment, setSelectedApartment] = useState(null); 

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('http://localhost:8080/api/users/currentUser', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, []);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/apartments/seller/${userInfo.id}`);
          setApartments(response.data);
        }
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, [userInfo]);

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

  const handleShowUpdateModal = (apartment) => {
    setSelectedApartment(apartment); 
    setShowUpdateModal(true); 
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false); 
  };

  return (
    <div>
      {apartments.map(apartment => (
        <div key={apartment.id} className="apartment-item">
          <div className='apartment-image'>  
            <ApartmentImage  apartmentId={apartment.id} left={10} right={0} /> 
          </div>
          <div className="apartment-details">
            <h2>{apartment.brand} {apartment.model}</h2>
            <p>{apartment.description}</p>
            <Link to={`/apartment/${apartment.id}`} className="btn btn-primary apartment-details-button"><FontAwesomeIcon icon={faEye}/> </Link>
            <button className="btn btn-danger apartment-delete-button" onClick={() => handleshowDeleteModal(apartment.id)}> <FontAwesomeIcon icon={faTrash}/> </button>
            <button className='btn btn-info apartment-update-button' onClick={() => handleShowUpdateModal(apartment)}><FontAwesomeIcon icon={faPencil}/> </button>          
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
      {showUpdateModal && (
        <ApartmentUpdateModal apartment={selectedApartment} onClose={handleCloseUpdateModal} />
      )}
    </div>
  );
};


export default SellerApartments
