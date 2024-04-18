import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopNavbar from './components/TopNavbar';
import FooterComponent from './components/FooterComponent';
import Home from './components/Home';
import { Card } from 'react-bootstrap';
import Profile from './components/Profile';
import './App.css';
import Apartment from './components/Apartment';
import Car from './components/Car';
import AgadirDescription from './components/AgadirDescription';
import CarComponent from './components/CarComponent';
import Wishlist from './components/Wishlist';
import History from './components/History';
import Password from './components/Password'
import SellerCar from './components/SellerCar';
import SellerAddCar from './components/SellerAddCar'
import ProfileRightSection from './components/ProfileRightSection';
import SellerReservations from './components/SellerReservations';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <TopNavbar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car" element={<Car />} />
          <Route path="/apartment" element={<Apartment />} />
          <Route path="/agadir-description" element={<AgadirDescription />} />
          <Route path="/car/:id" element={<CarComponent />} />
          <Route path="/user" element={<Profile />}>
            <Route path="profile" element={<Outlet />}>
              <Route index element={<ProfileRightSection />} />
            </Route>
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="history" element={<History />} />
            <Route path="password" element={<Password />} />
            <Route path="cars" element={<SellerCar />} />
            <Route path="addCar" element={<SellerAddCar />} />


          </Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
};

export default App;
