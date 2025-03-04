import React from 'react'

import MainHomeNavbar from '../../components/GuestUser/Navbars/MainHomeNavbar';
import NavbarCarousel from '../../components/GuestUser/Navbars/NavbarCarousel';
import Footer from '../../components/GuestUser/Footers/Footer';

const Show_Nifty50Data_Page = () => {
  return (
    <>
      <MainHomeNavbar fixed/>
      <NavbarCarousel fixed/>
      
      <div>Nifty 50 Data <br/><br/><br/></div>
      <Footer/>
    </>
  )
}

export default Show_Nifty50Data_Page
