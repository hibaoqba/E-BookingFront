import React from 'react'
import CarImage from '../CarImage'
import '../../styles/carDetails.css'
const CarDetails = ({car}) => {
  return (
    <div className='car-reservation-details-container'>
     <div className='reservation-details-image'><CarImage carId={car.id} left={10} right={10} /></div>
        <div className='car-reservation-details-info'>
          <div><strong>Marque:</strong><p>{car.brand}</p></div>  
          <div><strong>Model:</strong><p>{car.model}</p></div> 
            <div><strong>Année:</strong><p>{car.year}</p></div>

            
             </div>
    </div>
  )
}

export default CarDetails
