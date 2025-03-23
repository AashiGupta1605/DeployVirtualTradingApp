import React from "react";
import PricingPageTopMost from "../../components/GuestUser/Pricing/PricingPageTopMost";
import SubscriptionModal from "../../components/GuestUser/Pricing/SubscriptionModal";

const PricingPage = () => {
  return (
    <>
      <div className="mt-12">
        <div className="bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <PricingPageTopMost />
            <SubscriptionModal/>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
