import React from 'react';
import '../../styles/sellerDashboard.css' ;
import {FaUser,FaDollarSign, FaCar, FaList, FaStar}from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import CountUpAnimation from '../dashboardComponents/CountUpAnimation';
import PieChart from '../dashboardComponents/PieChart';
import DashboardChart from '../dashboardComponents/DashboardChart';
const SellerDashborad = () => {
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
             iconComponent={<FaDollarSign className='dollar-icon' />}
                initialValue={0}
                targetValue={200}
                text="revenus"
            /></Link> 
            <Link className='count-up-link' to="/user/cars">     <CountUpAnimation
                iconComponent={<FaCar />}
                initialValue={0}
                targetValue={300}
                className='car-count-up countup-container' 
                text="voitures"
            /></Link>
    <Link className='count-up-link' to="/user/reservations">       <CountUpAnimation
                iconComponent={<FaCalendarCheck />}
                initialValue={0}
                targetValue={400}
                className='reservation-count-up countup-container' 
                text="reservations"
            /></Link> 
        </div>
       <div className='charts'> <div className='pie-chart'><PieChart  /></div>
       <div className='chart'> <DashboardChart/></div></div>
    </div>
    
  )
}

export default SellerDashborad
