import React, { useState } from 'react'
import axios from 'axios'; 
import { Navigate, useLocation } from 'react-router-dom';
import UseFetchUserInfo from '../components/UseFetchUserInfo';
const ProtectedRoutes = ({children}) => {
const [isLoggedIn,setIsLoggedIn]=useState(false);
if(!localStorage.getItem('authToken'))
{
    return <Navigate to='/' replace/>
}
  return children;
}

export default ProtectedRoutes
