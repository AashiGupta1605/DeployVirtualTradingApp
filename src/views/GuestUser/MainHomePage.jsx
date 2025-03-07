import React from "react";

import MainHomeNavbar from "../../components/GuestUser/Navbars/MainHomeNavbar";
import NiftyNavbarCarousel from "../../components/GuestUser/Navbars/NiftyNavbarCarousel";
import EtfNavbarCarousel from "../../components/GuestUser/Navbars/EtfNavbarCarousel";

import StartScreenPopupModal from "../../components/GuestUser/Home/StartScreenPopupModal";
import HomeCarousel from "../../components/GuestUser/Home/HomeCarousel";

import Footer from "../../components/GuestUser/Footers/Footer";
import PricingModalFooter from "../../components/GuestUser/Footers/PricingModalFooter";

import OrganizationsSlider from "../../components/GuestUser/Home/OrganizationsData/OrganizationsSlider";
// import FooterSlider3 from "../../components/GuestUser/Footers/FooterSlider3";
import InfoCards from "../../components/GuestUser/Home/InfoCards";
import UserFeedbackCards from "../../components/GuestUser/Home/FeedbackData/UsersFeedbacks/UserFeedbackCards";
import OrganizationFeedbackCards from "../../components/GuestUser/Home/FeedbackData/OrganizationsFeedbacks/OrganizationFeedbackCards";

import { Link } from "react-router-dom";
import Stock from "../../assets/stock.jpg";

const MainHomePage = () => {
  return (
    <>

      <StartScreenPopupModal/>
      <MainHomeNavbar fixed />
      <NiftyNavbarCarousel fixed />
      <EtfNavbarCarousel fixed />

      <HomeCarousel/>

      {/* Homepage Section */}
      <div className="w-full mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20">
        {/* Left - Content */}
        <div className="text-black md:w-1/2 px-8 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blueGray-800">
            Track Stock Trends in Real Time
          </h1>
          <p className="text-lg leading-relaxed opacity-80">
            Stay updated with the latest stock market trends and data with
            StockSphere. Never miss a beat with our real-time updates.
          </p>
          <div className="flex gap-4 mt-6">
            <Link to="/learn">
              <button className="bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700  px-6 py-3 font-bold rounded-md text-sm md:text-lg shadow-lg">
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2 px-8 mt-8 md:mt-0">
          <img
            src={Stock}
            alt="Stock Market"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      {/* Homepage Section */}

      <InfoCards/>
      <OrganizationsSlider/>
      <UserFeedbackCards/>
      <OrganizationFeedbackCards/>

      {/* <FooterSlider3/> */}
      <Footer />
      <PricingModalFooter/>
    </>
  );
};

export default MainHomePage;

{/* <div className="sticky top-0 bg-white left-0 w-full decoration-3 border-b-2 border-gray-500 mb-6">
        <div className="flex justify-between items-center mb-5 pt-4">
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 ml-auto">
          </div>
        </div>
      </div> */}