import React from "react";
import PricingPageTopMost from "../../components/GuestUser/Pricing/PricingPageTopMost";
// import Pricing from "../../components/GuestUser/Pricing/Pricing";
// import DummyPricing from '../../components/GuestUser/Pricing/DummyPricing'
import MainHomeNavbar from "../../components/GuestUser/Navbars/MainHomeNavbar";
import SubscriptionModal from "../../components/GuestUser/Pricing/SubscriptionModal";
// import NiftyNavbarCarousel from '../../components/GuestUser/Navbars/NiftyNavbarCarousel'
// import EtfNavbarCarousel from '../../components/GuestUser/Navbars/EtfNavbarCarousel'
import Footer from "../../components/GuestUser/Footers/Footer";

const PricingPage = () => {
  return (
    <>
      <MainHomeNavbar fixed />
      {/* <NiftyNavbarCarousel fixed/> */}
      {/* <EtfNavbarCarousel fixed/> */}
      <div className="mt-12">
      <SubscriptionModal/>
        {/* <div className="bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <PricingPageTopMost />
            <Pricing />
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
