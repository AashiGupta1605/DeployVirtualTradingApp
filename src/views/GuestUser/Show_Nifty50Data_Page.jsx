import React from 'react'

import MainHomeNavbar from '../../components/GuestUser/Navbars/MainHomeNavbar';
import NiftyNavbarCarousel from '../../components/GuestUser/Navbars/NiftyNavbarCarousel';
import Footer from '../../components/GuestUser/Footers/Footer';
import EtfNavbarCarousel from '../../components/GuestUser/Navbars/EtfNavbarCarousel';
import CardTable from '../../components/Common/CardTable';

const Show_Nifty50Data_Page = () => {
  return (
    <>
      <MainHomeNavbar fixed/>
      <NiftyNavbarCarousel fixed/>
      <EtfNavbarCarousel fixed/>
      
      <div className="mx-2 mt-0 overflow-hidden" style={{ paddingBottom: '120px' }}>
      <CardTable/>
      </div>

      <Footer/>
    </>
  )
}

export default Show_Nifty50Data_Page
