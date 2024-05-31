import React from 'react'
import CarImage from '../CarImage'
import '../../styles/carDetails.css'
import ApartmentImage from '../apartmentComponents/ApartmentImage'
const CarDetails = ({apartment}) => {
  return (
    <div className='car-reservation-details-container'>
     <div className='reservation-details-image'><ApartmentImage apartmentId={apartment.id} left={10} right={10} /></div>
        <div className='car-reservation-details-info'>
          <div><strong>titre:</strong><p>{apartment.titre}</p></div>  
          <div><strong>description:</strong><p>{apartment.description}</p></div> 
            <div><strong>Adresse:</strong><p>{apartment.address}</p></div>

            
             </div>
    </div>
  )
}

export default CarDetails
