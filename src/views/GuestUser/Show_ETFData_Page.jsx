import React from "react";

import MainHomeNavbar from "../../components/GuestUser/Navbars/MainHomeNavbar";
import NiftyNavbarCarousel from "../../components/GuestUser/Navbars/NiftyNavbarCarousel";
import Footer from "../../components/GuestUser/Footers/Footer";
import StockTable from '../../components/Common/StockTable';
import EtfNavbarCarousel from "../../components/GuestUser/Navbars/EtfNavbarCarousel";

const Show_ETFData_Page = () => {
  return (
    <>
      <MainHomeNavbar fixed/>
      <NiftyNavbarCarousel fixed/>
      <EtfNavbarCarousel fixed/>
      
      <div className="mx-2 mt-3 overflow-hidden" style={{ paddingBottom: '120px' }}>
      <StockTable/>
      </div>
      <Footer/>
    </>
  );
};

export default Show_ETFData_Page;
