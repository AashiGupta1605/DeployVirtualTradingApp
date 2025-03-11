import React from "react";

import MainHomeNavbar from "../../components/GuestUser/Navbars/MainHomeNavbar";
import NiftyNavbarCarousel from "../../components/GuestUser/Navbars/NiftyNavbarCarousel";
import EtfNavbarCarousel from "../../components/GuestUser/Navbars/EtfNavbarCarousel";

import StartScreenPopupModal from "../../components/GuestUser/Home/StartScreenPopupModal";
import HomeCarousel from "../../components/GuestUser/Home/HomeCarousel";

import Footer from "../../components/GuestUser/Footers/Footer";

import OrganizationsSlider from "../../components/GuestUser/Home/OrganizationsData/OrganizationsSlider";
import InfoCards from "../../components/GuestUser/Home/InfoCards";
import UserFeedbackCards from "../../components/GuestUser/Home/FeedbackData/UsersFeedbacks/UserFeedbackCards";
import OrganizationFeedbackCards from "../../components/GuestUser/Home/FeedbackData/OrganizationsFeedbacks/OrganizationFeedbackCards";

import { Link } from "react-router-dom";
import Stock from "../../assets/stock.jpg";

const MainHomePage = () => {
  return (
    <>
      <StartScreenPopupModal />
      <MainHomeNavbar fixed />
      <NiftyNavbarCarousel fixed />
      <EtfNavbarCarousel fixed />

      <HomeCarousel />

      {/* Homepage Section */}
        <div className="-mt-30 -mb-28 w-[90%] max-w-screen-xl mx-auto px-6 py-16 min-h-screen flex items-center justify-between">
          {/* Left - Content (Pinned to Left) */}
          <div className="w-[55%] md:w-[50%] text-left absolute left-0 pl-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Track Stock Trends in Real Time
            </h1>
            <p className="text-lg leading-relaxed text-gray-700">
              Always, stay updated with the latest stock market trends, analysis and data with</p>
             <p><span className="font-semibold text-blue-600">~ PGR Virtual Trading App.&nbsp;</span>
              Never miss a beat with our real-time updates.
            </p>
            <div className="mt-6">
              <Link to="/learn"> &nbsp;
                <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 font-semibold rounded-md text-lg shadow-md transition">
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>

          {/* Right - Image (Pinned to Right) */}
          <div className="absolute right-0 pr-6 w-[80%] md:w-[55%] flex justify-end">
            <img
              src={Stock}
              alt="Stock Market"
              className="w-full max-w-md md:max-w-lg object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      {/* Homepage Section */}

      <InfoCards />
      <OrganizationsSlider />
      <UserFeedbackCards />
      <OrganizationFeedbackCards />

      <div className="mb-25"></div>
      <Footer/>
    </>
  );
};

export default MainHomePage;

// {
//   /* <div className="sticky top-0 bg-white left-0 w-full decoration-3 border-b-2 border-gray-500 mb-6">
//         <div className="flex justify-between items-center mb-5 pt-4">
//         </div>
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex gap-4 ml-auto">
//           </div>
//         </div>
//       </div> */
// }
