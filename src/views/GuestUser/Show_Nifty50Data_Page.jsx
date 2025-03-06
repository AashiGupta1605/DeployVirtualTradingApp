import React from 'react'

import MainHomeNavbar from '../../components/GuestUser/Navbars/MainHomeNavbar';
import NiftyNavbarCarousel from '../../components/GuestUser/Navbars/NiftyNavbarCarousel';
import Footer from '../../components/GuestUser/Footers/Footer';
import EtfNavbarCarousel from '../../components/GuestUser/Navbars/EtfNavbarCarousel';

const Show_Nifty50Data_Page = () => {
  return (
    <>
      <MainHomeNavbar fixed/>
      <NiftyNavbarCarousel fixed/>
      <EtfNavbarCarousel fixed/>
      
      <div>Nifty 50 Data <br/><br/><br/></div>
      <Footer/>
    </>
  )
}

export default Show_Nifty50Data_Page
