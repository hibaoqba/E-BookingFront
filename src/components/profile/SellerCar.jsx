import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/sellerCar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import CarImage from '../CarImage'; 
import CarUpdateModal from '../updateCar/CarUpdateModal';

const SellerCar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); 
  const [selectedCar, setSelectedCar] = useState(null); 

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
    const fetchCars = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/cars/seller/${userInfo.id}`);
          setCars(response.data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [userInfo]);

  const handleDeleteCar = async (carId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cars/${carId}`);
      console.log('Car deleted successfully:', response.data);
      // Filter out the deleted car from the state
      setCars(cars.filter(car => car.id !== carId));
      setshowDeleteModal(false); // Close the modal after deletion
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

  const handleShowUpdateModal = (car) => {
    setSelectedCar(car); // Set the selected car object
    setShowUpdateModal(true); // Show the update modal
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false); // Hide the update modal
  };

  return (
    <div>
      {cars.map(car => (
        <div key={car.id} className="car-item">
          <div className='car-image'>  
            <CarImage  carId={car.id} /> 
          </div>
          <div className="car-details">
            <h2>{car.brand} {car.model}</h2>
            <p>{car.description}</p>
            <Link to={`/car/${car.id}`} className="btn btn-primary">View Details</Link>
            <button className="btn btn-danger car-delete-button" onClick={() => handleshowDeleteModal(car.id)}> <FontAwesomeIcon icon={faTrash}/> supprimer</button>
            <button className='btn btn-info car-update-button' onClick={() => handleShowUpdateModal(car)}><FontAwesomeIcon icon={faPencil}/> modifier</button>          
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
      {showUpdateModal && (
        <CarUpdateModal car={selectedCar} onClose={handleCloseUpdateModal} />
      )}
    </div>
  );
};

export default SellerCar;
