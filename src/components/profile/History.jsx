import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/history.css'; // Import CSS file for styling
import UseFetchUserInfo from '../UseFetchUserInfo';
import GetInvoiceById from './GetInvoiceById';
import GetReservationDetails from './GetReservationDetails'
const History = () => {
  const userInfo=UseFetchUserInfo();
  const [reservations, setReservations] = useState([]);


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/reservations/user/${userInfo.id}`);
          setReservations(response.data);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [userInfo]);

  return (
    <div>
      <h2>Your Reservations</h2>
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




            {/* Add more table headings as needed */}
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

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
