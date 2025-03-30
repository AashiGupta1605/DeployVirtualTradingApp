import React from 'react'
import { Routes, Route, useLocation} from "react-router-dom";

import MainHomeNavbar from "../components/GuestUser/Navbars/MainHomeNavbar";
import NiftyNavbarCarousel from "../components/GuestUser/Navbars/NiftyNavbarCarousel";
import EtfNavbarCarousel from "../components/GuestUser/Navbars/EtfNavbarCarousel";

import MainHomePage from '../views/GuestUser/MainHomePage';
import AboutPage from '../views/GuestUser/AboutPage';
import ContactPage from '../views/GuestUser/ContactPage';
import ServicePage from '../views/GuestUser/ServicePage';
import Show_Nifty50Data_Page from '../views/GuestUser/Show_Nifty50Data_Page';
import Show_ETFData_Page from '../views/GuestUser/Show_ETFData_Page';
import PricingPage from '../views/GuestUser/PricingPage';
import EventsPage from '../views/GuestUser/GuestEventPage';

import Footer from "../components/GuestUser/Footers/Footer";
import StartScreenPopupModal from '../components/GuestUser/Home/StartScreenPopupModal';
import ResetPasswordModal from '../views/auth/ResetPasswordModal'; 

const GuestUser = () => {
  const location = useLocation();
  const showResetModal = location.pathname.startsWith("/reset-password");
  return (
    <>
    <MainHomeNavbar fixed />
    <NiftyNavbarCarousel fixed />
    <EtfNavbarCarousel fixed />
    <StartScreenPopupModal/>
    <Routes>
      <Route index element={<MainHomePage/>} />
      <Route path="about" element={<AboutPage/>} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="services" element={<ServicePage />} />
      <Route path="nifty50" element={<Show_Nifty50Data_Page/>} />
      <Route path="etf" element={<Show_ETFData_Page/>} />
      <Route path="pricing" element={<PricingPage/>} />
      <Route path="event" element={<EventsPage/>} />
    </Routes>
      {/* Show Reset Password Modal Over the Home Page */}
      {showResetModal && <ResetPasswordModal />}

    <div className="mb-20"></div>
    <Footer/>
    </>
  )
}

export default GuestUser
