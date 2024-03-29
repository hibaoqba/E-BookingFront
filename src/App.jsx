import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import TopNavbar from './components/TopNavbar'
import FooterComponent from './components/FooterComponent'
import Home from './components/Home';
import './App.css'
const App = () => {
  return (
    <div>
      <TopNavbar/>
      <Navbar/>
      <Home />
      <FooterComponent/>
    </div>
  )
}

export default App
