import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/history.css';
import '../../styles/sellerReservationList.css'
import UseFetchUserInfo from '../UseFetchUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import GetInvoiceById from '../profile/GetInvoiceById';
import GetReservationDetails from '../profile/GetReservationDetails';
import { DeleteReservation } from '../../actions/DeleteReservation';
const SellerReservationList = () => {
  const userInfo = UseFetchUserInfo();
  const [reservations, setReservations] = useState([]);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchReservations = async () => {
    try {
      if (userInfo && userInfo.id) {
        const response = await axios.get(`http://localhost:8080/api/reservations/seller/${userInfo.id}`);
        setReservations(response.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations(); // Call fetchReservations directly here
  }, [userInfo]);



  const handleUpdateStatus = async () => {
    try {
      await axios.post(`http://localhost:8080/api/reservations/status/${selectedReservationId}/${newStatus}`);
      fetchReservations();
      setSelectedReservationId(null);
      setNewStatus('');
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  return (
    <div>
      <div><h2>rapport de réservations</h2></div>
      <table className="reservations-table">
        <thead>
          <tr>
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
                <GetInvoiceById reservationId={reservation.id} />
                <GetReservationDetails reservationId={reservation.id} />
              </td>
              <td><button className='btn btn-danger delete-reservation-button' onClick={() => DeleteReservation(reservation.id,fetchReservations)}><FontAwesomeIcon icon={faTrash}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SellerReservationList;
