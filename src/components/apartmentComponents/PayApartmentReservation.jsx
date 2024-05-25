import React from 'react';
import PaymentForm from '../common/PaymentForm';
import axios from 'axios';
import '../../styles/payCarReservation.css'
import { Navigate,useNavigate } from 'react-router-dom';
import UseFetchUserInfo from '../UseFetchUserInfo';
import { useLocation } from 'react-router-dom';

const PayApartmentReservation = () => {
  
  const location = useLocation();
  const userInfo = UseFetchUserInfo();
  const navigate = useNavigate();

  const { reservationData, apartment } = location.state;
  const handleConfirmPaidReservation = async () => {
    try {
     
  
     
      const response = await axios.post('http://localhost:8080/api/apt_reservations/paid_reservation', {
        user: { id: userInfo.id },
        apartment: { id: apartment.id },
        startDate: reservationData.startDate,
        endDate: reservationData.endDate,
        breakfasts: reservationData.breakfast,
        clearning: reservationData.cleaning,
      });
        navigate(`/apartmentInvoice/${response.data.id}`);
      }
     catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = error.inner.map(err => err.message);
        
      } else {
        console.error('Error creating reservation:', error);
        navigate('/error');
      }
    }
  };
  return (
    
       <div className='payment-form-container'>
     <div className='payment-form'><PaymentForm   onPay={handleConfirmPaidReservation}/></div> 
    </div>
   
  )
}

export default PayApartmentReservation
