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

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false); 
  const [selectedCar, setSelectedCar] = useState(null); 

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cars`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
  
    fetchCars();
  }, []); 
  
  const handleDeleteCar = async (carId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cars/${carId}`);
      console.log('Car deleted successfully:', response.data);
      setCars(cars.filter(car => car.id !== carId));
      setshowDeleteModal(false); 
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleshowDeleteModal = (carId) => {
    setSelectedCarId(carId);
    setshowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setshowDeleteModal(false);
  };

  const handleShowUserModal = (car) => {
    setSelectedCar(car); 
    setShowUserModal(true); 
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false); 
  };

  return (
    <div>
      {cars.map(car => (
        <div key={car.id} className="car-item">
          <div className='car-image'>  
            <CarImage  carId={car.id} left={10} right={0} /> 
          </div>
          <div className="car-details">
            <h2>{car.brand} {car.model}</h2>
            <p>{car.description}</p>
            <Link to={`/car/${car.id}`} className="btn btn-primary car-details-button"><FontAwesomeIcon icon={faEye}/> </Link>
            <button className="btn btn-danger car-delete-button" onClick={() => handleshowDeleteModal(car.id)}> <FontAwesomeIcon icon={faTrash}/> </button>
            <button className='btn btn-info car-update-button' onClick={() => handleShowUserModal(car)}><FontAwesomeIcon icon={faUser}/> </button>          
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
            <Button className="confirm-delete" onClick={() => handleDeleteCar(selectedCarId)}>
              supprimer
            </Button>
            <Button className='cancel-delete' onClick={handleCloseModal}>
              fermer
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {showUserModal && (
        <UserModal item={selectedCar} onClose={handleCloseUserModal} />
      )}
    </div>
  );
};

export default AllCars;
