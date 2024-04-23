import React from 'react';
import '../../styles/sellerDashboard.css' ;
import {FaUser,FaDollarSign, FaCar, FaList, FaStar}from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";

import CountUpAnimation from '../dashboardComponents/CountUpAnimation';
import PieChart from '../dashboardComponents/PieChart';
import DashboardChart from '../dashboardComponents/DashboardChart';
const SellerDashborad = () => {
  return (
    <div>
     
      <div className="countup-elements">
            <CountUpAnimation
                iconComponent={<FaUser />}
                initialValue={0}
                targetValue={100}
                text="Clients"
            />
            <CountUpAnimation
                iconComponent={<FaDollarSign />}
                initialValue={0}
                targetValue={200}
                text="revenus"
            />
            <CountUpAnimation
                iconComponent={<FaCar />}
                initialValue={0}
                targetValue={300}
                text="voitures"
            />
            <CountUpAnimation
                iconComponent={<FaCalendarCheck />}
                initialValue={0}
                targetValue={400}
                text="reservations"
            />
        </div>
       <div className='charts'> <div className='pie-chart'><PieChart  /></div>
       <div className='chart'> <DashboardChart/></div></div>
    </div>
    
  )
}

export default SellerDashborad
