import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import TopNavbar from './components/TopNavbar'
import FooterComponent from './components/FooterComponent'
import Home from './components/Home';
import './App.css'
import Apartment from './components/Apartment';
import Car from './components/Car';
import AgadirDescription from './components/AgadirDescription';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <TopNavbar/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car' element={<Car/>}/>
        <Route path='/apartment' element={<Apartment/>}/>
        <Route path='/agadir-description' element={<AgadirDescription/>}/>
      </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </div>
  )
}

export default App
