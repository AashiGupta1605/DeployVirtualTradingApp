import React, { useState, useEffect } from "react";
import Pricing from "../Pricing/Pricing";

const PricingModalFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Show modal on load
  }, []);

  return (
    <>
    {/* <div className="relative min-h-screen flex items-center justify-center bg-gray-900"> */}
      {/* Modal Overlay */}
      {isVisible && (
        <div className="fixed inset-0 bg-transparent z-50 flex justify-center items-end">
          {/* Modal Content */}
          <div
            className={`w-full h-1/2 bg-gray-700 overflow-y-auto rounded-t-2xl shadow-lg p-6 transition-transform duration-500 ${
              isVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <h2 className="text-xl font-bold text-center text-white mb-4">Trading Pricing</h2>
            <Pricing/>

            {/* Close Button (&times = x symbol)*/}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-5 text-2xl font-bold w-15 text-red-500 hover:text-white hover:bg-red-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    {/* </div> */}
    </>
  );
};

export default PricingModalFooter;
