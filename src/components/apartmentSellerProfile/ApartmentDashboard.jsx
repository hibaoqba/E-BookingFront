import {React,useState,useEffect} from 'react';
import '../../styles/sellerDashboard.css' ;
import {FaUser,FaDollarSign, FaCar, FaList, FaStar, FaBuilding}from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountUpAnimation from '../dashboardComponents/CountUpAnimation';
import PieChart from '../dashboardComponents/PieChart';
import DashboardChart from '../dashboardComponents/DashboardChart';
const ApartmentDashborad = () => {
 
  const [carNumber,setCarNumber]=useState('');
  const [reservationNumber,setReservationNumber]=useState('');

  const [userInfo,setUserInfo]=useState('');
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
    const fetchCarNumber = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/apartments/seller/${userInfo.id}/count`);
          setCarNumber(response.data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCarNumber();
  }, [userInfo]);


  useEffect(() => {
    const fetchReservationNumber = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/apt_reservations/seller/count/${userInfo.id}`);
          setReservationNumber(response.data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchReservationNumber();
  }, [userInfo]);
  return (
  
    <div>
     
      <div className="countup-elements">
          <Link> <CountUpAnimation
                iconComponent={<FaDollarSign className='dollar-icon' />}
                initialValue={0}
                className='client-count-up countup-container' 
                targetValue={100}
                text="Revenues"
            /></Link>
       <Link className='count-up-link' to="/user/reservations">   
        <CountUpAnimation
             className='revenue-count-up countup-container'    
             iconComponent={<FaDollarSign className='dollar-icon' />}
                initialValue={0}
                targetValue={200}
                text="revenus"
            /></Link> 
            <Link className='count-up-link' to="/user/apartments">   
              <CountUpAnimation
                iconComponent={<FaBuilding />}
                initialValue={0}
                targetValue={carNumber}
                className='car-count-up countup-container' 
                text="Apartement"
            /></Link>
    <Link className='count-up-link' to="/user/apartment/reservations">     
     <CountUpAnimation
                iconComponent={<FaCalendarCheck />}
                initialValue={0}
                targetValue={reservationNumber}
                className='reservation-count-up countup-container' 
                text="reservations"
            /></Link> 
        </div>
    </div>
    
  )
}

export default ApartmentDashborad
