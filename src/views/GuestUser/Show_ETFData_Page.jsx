import React from "react";

import MainHomeNavbar from "../../components/GuestUser/Navbars/MainHomeNavbar";
import NavbarCarousel from "../../components/GuestUser/Navbars/NiftyNavbarCarousel";
import Footer from "../../components/GuestUser/Footers/Footer";
import StockTable from '../../components/Common/StockTable';

const Show_ETFData_Page = () => {
  return (
    <>
      <MainHomeNavbar fixed/>
      <NavbarCarousel fixed/>
      
      <div className="mx-2 overflow-hidden" style={{ paddingBottom: '120px' }}>
      <StockTable/>
      </div>
      <Footer/>
    </>
  );
};

export default Show_ETFData_Page;
