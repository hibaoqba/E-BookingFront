import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/history.css';
import '../../styles/sellerReservationList.css'
import UseFetchUserInfo from '../UseFetchUserInfo';
import GetApartmentReservationDetails from '../profile/GetApartmentReservationDetails'
import GetApartmentInvoiceById from '../profile/GetApartmentInvoiceById'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeleteApartmentReservation } from '../../actions/DeleteApartmentReservation';
const ApartmentReservationList = () => {
  const userInfo = UseFetchUserInfo();
  const [reservations, setReservations] = useState([]);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchReservations = async () => {
    try {
      if (userInfo && userInfo.id) {
        const response = await axios.get(`http://localhost:8080/api/apt_reservations/seller/${userInfo.id}`);
        setReservations(response.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations(); 
  }, [userInfo]);



  const handleUpdateStatus = async () => {
    try {
      await axios.post(`http://localhost:8080/api/apt_reservations/status/${selectedReservationId}/${newStatus}`);
      fetchReservations();
      setSelectedReservationId(null);
      setNewStatus('');
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  return (
    <div>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>numero</th>
            <th>titre</th>
            <th>Date de réservation</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Type</th>
            <th>Status</th>
            <th>montant</th>
            <th>Autres details</th>
            <th>action</th>

          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.titre}</td>
              <td>{reservation.cmndDate}</td>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
              <td>{reservation.type}</td>
              <td >
                {selectedReservationId === reservation.id ? (
                  <div className="status-select-container">
                    <select
                      className="status-select"
                      value={newStatus || reservation.status}
                      onChange={e => setNewStatus(e.target.value)}
                    >
                      <option value="non payé">non payée</option>
                      <option value="payé">payée</option>
                      <option value="annulée">annulée</option>
                    </select>
                    <button className="status-save-button" onClick={handleUpdateStatus}><FontAwesomeIcon icon={faCheck}/></button>
                    <button className="status-cancel-button" onClick={() => setSelectedReservationId(null)}><FontAwesomeIcon icon={faTimes}/></button>
                  </div>
                ) : (
                  <div className='status-cell'>
                   <div className='status-text'>{reservation.status}</div> 
                    <button className='update-status-button' onClick={() => setSelectedReservationId(reservation.id)}>
                      <FontAwesomeIcon icon={faPencil}/>
                    </button>
                  </div>
                )}
              </td>
              <td>{reservation.totalPrice}</td>
              <td>
                <GetApartmentInvoiceById reservationId={reservation.id} />
                <GetApartmentReservationDetails reservationId={reservation.id} />
              </td>
              <td><button className='btn btn-danger delete-reservation-button' onClick={() => DeleteApartmentReservation(reservation.id,fetchReservations)}><FontAwesomeIcon icon={faTrash}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ApartmentReservationList;
