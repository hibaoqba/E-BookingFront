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
  const [usersNumber,setUsersNumber]=useState('');
  const [apartmentReservationNumber,setApartmentReservationNumber]=useState('');
  const [carReservationNumber,setCarReservationNumber]=useState('');
  const [clientNumber,setClientNumber]=useState('');
  const [carSellerNumber,setCarSellerNumber]=useState('');
  const [apartmentSellerNumber,setApartmentSellerNumber]=useState('');


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
  const fetchCarSellerNumber = async () => {
    try {
     
        const response = await axios.get(`http://localhost:8080/api/users/countAllCarSellers`);
        setCarSellerNumber(response.data);
  
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  fetchCarSellerNumber();
}
);

useEffect(() => {
  const fetchApartmentSellerNumber = async () => {
    try {
     
        const response = await axios.get(`http://localhost:8080/api/users/countAllApartmentSellers`);
        setApartmentSellerNumber(response.data);
  
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  fetchApartmentSellerNumber();
}
);
useEffect(() => {
  const fetchClientNumber = async () => {
    try {
     
        const response = await axios.get(`http://localhost:8080/api/users/countAllClients`);
        setClientNumber(response.data);
  
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  fetchClientNumber();
}
);
useEffect(() => {
  const fetchApartmentNumber = async () => {
    try {
     
        const response = await axios.get(`http://localhost:8080/api/apartments/countAll`);
        setApartmentNumber(response.data);
  
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  fetchApartmentNumber();
}
);
useEffect(() => {
  const fetchUsersNumber = async () => {
    try {
     
        const response = await axios.get(`http://localhost:8080/api/users/countAll`);
        setUsersNumber(response.data);
  
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsersNumber();
}
);

  useEffect(() => {
    const fetchCarReservationNumber = async () => {
      try {
        
          const response = await axios.get(`http://localhost:8080/api/reservations/countAll`);
          setCarReservationNumber(response.data);
        
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCarReservationNumber();
  }
);

useEffect(() => {
  const fetchApartmentReservationNumber = async () => {
    try {
      
        const response = await axios.get(`http://localhost:8080/api/apt_reservations/count`);
        setApartmentReservationNumber(response.data);
      
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  fetchApartmentReservationNumber();
}
);
  return (
  
    <div>
     
      <div className="countup-elements">
          <Link> <CountUpAnimation
                iconComponent={<FaUser className='client-icon chart-icon' />}
                initialValue={0}
                className='client-count-up countup-container' 
                targetValue={usersNumber}
                text="Utilisateurs"
            /></Link>
       <Link className='count-up-link' to="/user/adminReservations">  
         <CountUpAnimation
             className='apartment-count-up countup-container'    
             iconComponent={<FaBuilding className='chart-apartment-icon chart-icon' />}
                initialValue={0}
                targetValue={apartmentNumber}
                text="Appartements"
                /></Link> 
            <Link className='count-up-link' to="/user/cars">  
               <CountUpAnimation
                iconComponent={<FaCar className='car-icon chart-icon'/>}
                initialValue={0}
                targetValue={carNumber}
                className='car-count-up countup-container' 
                text="voitures"
            /></Link>
    <Link className='count-up-link' to="/user/adminReservations">
             <CountUpAnimation
                iconComponent={<FaCalendarCheck className='reservation-icon chart-icon' />}
                initialValue={0}
                targetValue={carReservationNumber+apartmentReservationNumber}
                className='reservation-count-up countup-container' 
                text="reservations"
            /></Link> 
        </div>
       <div className='charts'>
 
         <div className='pie-chart'>
        <div className='chart-title'>
           <h4>Articles</h4></div>
          <PieChart  
          data={{
            voiture: { value: carNumber, color: '#73c0de' },
            appartement: { value: apartmentNumber, color: '#f9c45b' }
          }}/>
          </div>
          <div className='pie-chart'>
        <div className='chart-title'>
           <h4>Utilisateurs</h4></div>
           
          <PieChart  
          data={{
            clients: { value: clientNumber, color: '#546570' },
            vendeursAppartement: { value: apartmentSellerNumber, color: '#61a0a8' },
            vendeursVoiture: { value: carSellerNumber, color: '#c4ccd3' }

          
          }}/>
          </div>
  </div>
    </div>
    
  )
}

export default AdminDashborad
