import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/sellerCar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const SellerCar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleShowModal = (carId) => {
    setSelectedCarId(carId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {cars.map(car => (
        <div key={car.id} className="car-item">
          <img src={car.images[0]} alt={car.brand} className="car-image" />
          <div className="car-details">
            <h2>{car.brand} {car.model}</h2>
            <p>{car.description}</p>
            <Link to={`/car/${car.id}`} className="btn btn-primary">View Details</Link>
            <button className="btn btn-danger" onClick={() => handleShowModal(car.id)}> <FontAwesomeIcon icon={faTrash}/></button>
          </div>
        </div>
      ))}

      <Modal className='confirmation-modal' show={showModal} onHide={handleCloseModal}>
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
    </div>
  );
};

export default SellerCar;
