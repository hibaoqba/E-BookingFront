import {React,useState,useEffect} from 'react';
import '../../styles/sellerDashboard.css' ;
import {FaUser,FaDollarSign, FaCar, FaList, FaStar}from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountUpAnimation from '../dashboardComponents/CountUpAnimation';
import PieChart from '../dashboardComponents/PieChart';
import DashboardChart from '../dashboardComponents/DashboardChart';
const SellerDashborad = () => {
 
  const [carNumber,setCarNumber]=useState('');
  const [reservationNumber,setReservationNumber]=useState('');
  const [earning,setEarning]=useState(0);

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
    const fetchEarning = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/payments/user/${userInfo.id}/totalEarningAmount`);
          setEarning(parseInt(response.data));
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchEarning();
  }, [userInfo]);



  useEffect(() => {
    const fetchCarNumber = async () => {
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get(`http://localhost:8080/api/cars/seller/${userInfo.id}/count`);
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
          const response = await axios.get(`http://localhost:8080/api/reservations/seller/count/${userInfo.id}`);
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
          
       <Link className='count-up-link' to="/user/reservations">   
        <CountUpAnimation
             className='revenue-count-up countup-container'    
             iconComponent={<FaDollarSign className='dollar-icon' />}
                initialValue={0}
                targetValue={earning}
                text="revenus"
            /></Link> 
            <Link className='count-up-link' to="/user/cars">     <CountUpAnimation
                iconComponent={<FaCar />}
                initialValue={0}
                targetValue={carNumber}
                className='car-count-up countup-container' 
                text="voitures"
            /></Link>
    <Link className='count-up-link' to="/user/reservations">       <CountUpAnimation
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

export default SellerDashborad
