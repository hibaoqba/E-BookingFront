import {React,useState,useEffect} from 'react';
import '../../styles/sellerDashboard.css' ;
import {FaUser,FaDollarSign, FaCar,FaBuilding, FaList, FaStar}from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountUpAnimation from '../dashboardComponents/CountUpAnimation';
import PieChart from '../dashboardComponents/PieChart';
import DashboardChart from '../dashboardComponents/DashboardChart';
const AdminDashborad = () => {
 
  const [carNumber,setCarNumber]=useState('');
  const [apartmentNumber,setApartmentNumber]=useState('');

  const [reservationNumber,setReservationNumber]=useState('');


  useEffect(() => {
    const fetchCarNumber = async () => {
      try {
       
          const response = await axios.get(`http://localhost:8080/api/cars/countAll`);
          setCarNumber(response.data);
    
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCarNumber();
  }
);
useEffect(() => {
  const fetchApartmentNumber = async () => {
    try {
     
        const response = await axios.get(`http://localhost:8080/api/apartments/countAll`);
        setApartmentNumber(response.data);
  
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  fetchApartmentNumber();
}
);

  useEffect(() => {
    const fetchReservationNumber = async () => {
      try {
        
          const response = await axios.get(`http://localhost:8080/api/reservations/countAll`);
          setReservationNumber(response.data);
        
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchReservationNumber();
  }
);
  return (
  
    <div>
     
      <div className="countup-elements">
          <Link> <CountUpAnimation
                iconComponent={<FaUser className='client-icon' />}
                initialValue={0}
                className='client-count-up countup-container' 
                targetValue={100}
                text="Clients"
            /></Link>
       <Link className='count-up-link' to="/user/reservations">    <CountUpAnimation
             className='revenue-count-up countup-container'    
             iconComponent={<FaBuilding className='dollar-icon' />}
                initialValue={0}
                targetValue={apartmentNumber}
                text="Appartements"
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
       <div className='charts'> <div className='pie-chart'><PieChart  /></div>
       <div className='chart'> <DashboardChart/></div></div>
    </div>
    
  )
}

export default AdminDashborad
