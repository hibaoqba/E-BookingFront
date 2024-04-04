import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import TopNavbar from './components/TopNavbar'
import FooterComponent from './components/FooterComponent'
import Home from './components/Home';
import { Card} from 'react-bootstrap';

import './App.css'
import Apartment from './components/Apartment';
import Car from './components/Car';
import AgadirDescription from './components/AgadirDescription';
import CarComponent from './components/CarComponent';
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
        <Route path="/car/:id" element={<CarComponent/>} />
      </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </div>
  )
}

export default App
