import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/history.css'; // Import CSS file for styling
import UseFetchUserInfo from '../UseFetchUserInfo';;
import GetInvoiceById from '../profile/GetInvoiceById';
import GetReservationDetails from '../profile/GetReservationDetails'
const SellerReservationList = () => {
  const userInfo=UseFetchUserInfo();
  const [reservations, setReservations] = useState([]);


  useEffect(() => {
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

    fetchReservations();
  }, [userInfo]);

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
  )
}

export default SellerReservationList
