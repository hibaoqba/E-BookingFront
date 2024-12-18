import React from 'react'
import Navbar from '../components/navs/Navbar';
import TopNavbar from '../components/navs/TopNavbar';
import FooterComponent from '../components/common/FooterComponent';
import Home from '../pages/Home';
import Car from '../pages/Car';
import AgadirDescription from '../components/AgadirDescription';
import CarComponent from '../components/CarComponent';
import Wishlist from '../components/profile/Wishlist';
import History from '../components/profile/History';
import Password from '../components/profile/Password'
import SellerCar from '../components/carSellerprofile/SellerCar';
import SellerAddCar from '../components/carSellerprofile/SellerAddCar'
import ProfileRightSection from '../components/profile/ProfileRightSection';
import Dashboard from '../components/carSellerprofile/Dashboard'
import SellerReservationList from '../components/carSellerprofile/SellerReservationList';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Profile from '../components/profile/Profile';
import ReservationConfirmation from '../components/CarReservation/ReservationConfirmation';
import Invoice from '../components/invoice/Invoice';
import Apartment from '../pages/Apartment';
import Requests from '../components/adminComponents/Requests'
import SellerApartments from '../components/apartmentSellerProfile/SellerApartments';
import SellerAddApartment from '../components/apartmentSellerProfile/SellerAddApartment';
import ApartmentComponent from '../components/apartmentComponents/ApartmentComponent';
import ApartmentReservations from '../components/apartmentSellerProfile/ApartmentReservations';
import ApartmentDashboard from '../components/apartmentSellerProfile/ApartmentDashboard';
import ApReservationConfirmation from '../components/apartmentComponents/ApReservationConfirmation';
import AdminSellerDashboard from '../components/profile/AdminSellerDashboard';
import AdminSellerReservation from '../components/profile/AdminSellerReservation';
import AdminDashboard from '../components/profile/AdminDashboard'
import ProtectedRoutes from './ProtectedRoutes';
import AllReservations from '../components/adminComponents/AllReservations';
import ApartmentInvoice from '../components/invoice/ApartmentInvoice';
import AllCars from '../components/adminComponents/AllCars';
import AllApartments from '../components/adminComponents/AllApartments';
import AllUsers from '../components/adminComponents/AllUsers';
import PayCarReservation from '../components/CarReservation/PayCarReservation';
import PayApartmentReservation from '../components/apartmentComponents/PayApartmentReservation';
import ResetPassword from '../components/auth/ResetPassword';
import Error from '../pages/Error';
const CreateRoutes = () => {
  return (
    <BrowserRouter>
    <TopNavbar />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/car" element={<Car />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/error" element={<Error />} />

      <Route path="/apartment" element={<Apartment />} />
      <Route path="/apartment/:id" element={<ApartmentComponent />} />
      <Route path="/apartment/confirmation" element={<ApReservationConfirmation />} />
      <Route path="/apartmentInvoice/:reservationId" element={<ApartmentInvoice/>} />
      <Route path="/apartment/payment" element={<PayApartmentReservation />} />
      <Route path="/agadir-description" element={<AgadirDescription />} />
      <Route path="/car/:id" element={<CarComponent />} />
      <Route path="/car/confirmation" element={<ReservationConfirmation />} />
      <Route path="/car/payment" element={<PayCarReservation />} />

      <Route path="/carInvoice/:reservationId" element={<Invoice/>} />

      <Route path="/user" element={
      <ProtectedRoutes>
      <Profile />
      </ProtectedRoutes>
      }>
        <Route path="profile" element={<Outlet />}>
          <Route index element={<ProfileRightSection />} />
        </Route>
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="history" element={<History />} />
        <Route path="password" element={<Password />} />
        <Route path="cars" element={<SellerCar />} />
        <Route path="addCar" element={<SellerAddCar />} />
        <Route path="apartments" element={<SellerApartments />} />
        <Route path="addApartment" element={<SellerAddApartment />} />
        <Route path="allUsers" element={<AllUsers />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin/sellerDashboard" element={<AdminSellerDashboard />} />
        <Route path="admin/sellerReservation" element={<AdminSellerReservation />} />
        <Route path="adminDashboard" element={<AdminDashboard />} />
        <Route path="allCars" element={<AllCars />} />
        <Route path="allApartments" element={<AllApartments />} />
        <Route path="requests" element={<Requests />} />

        <Route path="reservations" element={<SellerReservationList />} />
        <Route path="adminReservations" element={<AllReservations />} />

        <Route path="apartment/reservations" element={<ApartmentReservations />} />
        <Route path="apartment/dashboard" element={<ApartmentDashboard />} />



      </Route>
    </Routes>
    <FooterComponent />
  </BrowserRouter>
  )
}

export default CreateRoutes
