import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';
import GetApartmentInvoiceById from './GetApartmentInvoiceById';
import GetApartmentReservationDetails from './GetApartmentReservationDetails';
import '../../styles/history.css'; 
import UseFetchUserInfo from '../UseFetchUserInfo';
import GetInvoiceById from './GetInvoiceById';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import GetReservationDetails from './GetReservationDetails'
import { DeleteReservation } from '../../actions/DeleteReservation';
const History = () => {
  const userInfo=UseFetchUserInfo();
  const [reservations, setReservations] = useState([]);
  const [apartmentReservations, setApartmentReservations] = useState([]);

  const [key, setKey] = useState('voitures');

  const fetchCarReservations = async () => {
    try {
      if (userInfo && userInfo.id) {
        const response = await axios.get(`http://localhost:8080/api/reservations/user/${userInfo.id}`);
        setReservations(response.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchCarReservations(); 
  }, [userInfo]);

  const fetchApartmentReservations = async () => {
    try {
      if (userInfo && userInfo.id) {
        const response = await axios.get(`http://localhost:8080/api/apt_reservations/user/${userInfo.id}`);
        setApartmentReservations(response.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchApartmentReservations(); 
  }, [userInfo]);



  return (
    <div>
      <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="voitures" title="Voitures">
      <table className="reservations-table">
        <thead>
          <tr>
            <th>titre</th>
            <th>Date de réservation</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Type</th>
            <th>Status</th>
            <th>prix</th>
            <th>Autres details</th>
            <th>Actions</th>




          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.titre}</td>
              <td>{reservation.cmndDate}</td>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
              <td>{reservation.type}</td>
              <td>{reservation.status}</td>
              <td>{reservation.totalPrice}</td>
              <td><GetInvoiceById reservationId={reservation.id} />
             <GetReservationDetails reservationId={reservation.id} /></td>
              <td><button className='btn btn-danger delete-reservation-button' onClick={() => DeleteReservation(reservation.id,fetchCarReservations)}><FontAwesomeIcon icon={faTrash}/></button></td>

            </tr>
          ))}
        </tbody>
      </table>
      </Tab>
      <Tab eventKey="appartements" title="Appartements">
      <table className="reservations-table">
        <thead>
          <tr>
            <th>titre</th>
            <th>Date de réservation</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Type</th>
            <th>Status</th>
            <th>prix</th>
            <th>Autres details</th>
            <th>Actions</th>




          </tr>
        </thead>
        <tbody>
          {apartmentReservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.titre}</td>
              <td>{reservation.cmndDate}</td>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
              <td>{reservation.type}</td>
              <td>{reservation.status}</td>
              <td>{reservation.totalPrice}</td>
              <td><GetApartmentInvoiceById reservationId={reservation.id} />
             <GetApartmentReservationDetails reservationId={reservation.id} /></td>
              <td><button className='btn btn-danger delete-reservation-button' onClick={() => DeleteReservation(reservation.id,fetchCarReservations)}><FontAwesomeIcon icon={faTrash}/></button></td>

            </tr>
          ))}
        </tbody>
      </table>
          </Tab>
      </Tabs>
    </div>
  );
}

export default History;
