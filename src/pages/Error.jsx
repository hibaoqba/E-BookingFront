import React from 'react'
import '../styles/error.css'
import { TbFaceIdError } from "react-icons/tb";
const Error = () => {
  return (
    <div className='error-page-container'>
      
      <div className='alert alert-danger error-page-text'>
      <TbFaceIdError/>
      <br />
        une erreur s'est produite, Réssayez plus tard.
      
      </div>
    </div>
  )
}

export default Error
