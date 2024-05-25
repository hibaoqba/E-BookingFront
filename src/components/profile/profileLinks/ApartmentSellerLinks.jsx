import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronDown, faChevronUp, faChartLine, faPlus } from '@fortawesome/free-solid-svg-icons'; // Importing necessary icons
import { IoPieChart } from 'react-icons/io5'; // Importing IoPieChart icon from react-icons/io5
import { BsBuilding,BsBuildingAdd , BsBuildings} from "react-icons/bs";
const ApartmentSellerLinks = () => {
    const [apartmentsExpanded, setApartmentsExpanded] = useState(false);
    const location = useLocation();

    // Function to toggle apartment expansion
    const handleApartmentsToggle = () => {
        setApartmentsExpanded(!apartmentsExpanded);
    };
      
    return (
        <div>
            <Link className={`profile-link ${location.pathname === '/user/apartment/dashboard' ? 'selected-profile' : ''}`} to='/user/apartment/dashboard'>
                <FontAwesomeIcon icon={faChartLine} />Tableau de bord
            </Link>
            <Link className={`profile-link ${location.pathname === '/user/apartment/reservations' ? 'selected-profile' : ''} `} to='/user/apartment/reservations'>
                <IoPieChart/>Rapport de réservations
            </Link> 
            <div className={`profile-link ${apartmentsExpanded ? 'expanded' : ''}`} onClick={handleApartmentsToggle}>
                <BsBuildings/> Appartements
                <FontAwesomeIcon icon={apartmentsExpanded ? faChevronUp : faChevronDown} className='expand-icon' />
            </div>
            {apartmentsExpanded && (
                <>
                    <Link className={`profile-link ${location.pathname === '/user/apartments' ? 'selected-profile' : ''} apartment-link `} to='/user/apartments'>
                    <BsBuilding
                    /> Mes Apartments
                    </Link>
                    <Link className={`profile-link ${location.pathname === '/user/addApartment' ? 'selected-profile' : ''} apartment-link `} to='/user/addApartment'>
                       <BsBuildingAdd/> Ajouter un Appartement
                    </Link>
                </>
            )}
        </div>
    );
}

export default ApartmentSellerLinks;
