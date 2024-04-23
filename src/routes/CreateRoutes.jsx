import React from 'react'
import Navbar from '../components/navs/Navbar';
import TopNavbar from '../components/navs/TopNavbar';
import FooterComponent from '../components/common/FooterComponent';
import Home from '../pages/Home';
import Apartment from '../components/Apartment';
import Car from '../pages/Car';
import AgadirDescription from '../components/AgadirDescription';
import CarComponent from '../components/CarComponent';
import Wishlist from '../components/profile/Wishlist';
import History from '../components/profile/History';
import Password from '../components/profile/Password'
import SellerCar from '../components/sellerprofile/SellerCar';
import SellerAddCar from '../components/sellerprofile/SellerAddCar'
import ProfileRightSection from '../components/profile/ProfileRightSection';
import Dashboard from '../components/sellerprofile/Dashboard'
import SellerReservationList from '../components/sellerprofile/SellerReservationList';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Profile from '../components/profile/Profile';
import ReservationConfirmation from '../components/CarReservation/ReservationConfirmation';
import Invoice from '../components/invoice/Invoice';
const CreateRoutes = () => {
  return (
    <BrowserRouter>
    <TopNavbar />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/car" element={<Car />} />
      <Route path="/apartment" element={<Apartment />} />
      <Route path="/agadir-description" element={<AgadirDescription />} />
      <Route path="/car/:id" element={<CarComponent />} />
      <Route path="/car/confirmation" element={<ReservationConfirmation />} />
      <Route path="/invoice/:reservationId" element={<Invoice/>} />

      <Route path="/user" element={<Profile />}>
        <Route path="profile" element={<Outlet />}>
          <Route index element={<ProfileRightSection />} />
        </Route>
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="history" element={<History />} />
        <Route path="password" element={<Password />} />
        <Route path="cars" element={<SellerCar />} />
        <Route path="addCar" element={<SellerAddCar />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reservations" element={<SellerReservationList />} />



      </Route>
    </Routes>
    <FooterComponent />
  </BrowserRouter>
  )
}

export default CreateRoutes
