import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../../views/auth/Login";
// import PricingPageTopMost from "./PricingPageTopMost";

const Pricing = () => {

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserLoginModalOpen, setUserLoginModalOpen] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsAuthenticated(!!token);
  // }, []);
  
  return (
    <>
      {/* <div className="bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-7xl mx-auto px-4 py-16">

          <PricingPageTopMost/> */}

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          {
            name: "Silver",
            price: "Free",
            features: [
              "Enjoy Trading",
              "Trading Amount: $1000",
              "Previous Data Support",
            ],
            bgColor: "bg-gray-300",
            textColor: "text-gray-900",
            buttonColor: "bg-gray-700 text-white hover:bg-gray-800",
            highlight: false,
          },
          {
            name: "Gold",
            price: "$49",
            features: [
              "Unlimited Trading",
              "Trading Amount: $1500",
              "Basic Support",
            ],
            bgColor: "bg-yellow-400",
            textColor: "text-yellow-900",
            buttonColor: "bg-yellow-600 text-white hover:bg-yellow-700",
            highlight: true,
          },
          {
            name: "Diamond",
            price: "$99",
            features: [
              "Unlimited Everything",
              "Trading Amount: $3000",
              "24/7 Priority Support",
            ],
            bgColor: "bg-blue-300",
            textColor: "text-blue-900",
            buttonColor: "bg-blue-700 text-white hover:bg-blue-800",
            highlight: false,
          },
          {
            name: "Platinum",
            price: "$149",
            features: [
              "VIP Access",
              "Trading Amount: Unlimited",
              "Dedicated Account Manager",
            ],
            bgColor: "bg-purple-400",
            textColor: "text-purple-900",
            buttonColor: "bg-purple-600 text-white hover:bg-purple-700",
            highlight: false,
          },
        ].map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl shadow-lg p-8 transition transform hover:scale-103 ${
              plan.bgColor
            } ${plan.textColor} ${
              plan.highlight ? "border-4 border-yellow-500 hover:scale-108" : ""
            }`}
          >
            {plan.highlight && (
              <span className="absolute top-4 right-4 bg-yellow-600 text-white text-sm py-1 px-3 rounded-full">
                Popular
              </span>
            )}

            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-4xl font-bold mb-6">
              {plan.price}{" "}
              <span className="text-lg text-opacity-70">/month</span>
            </p>

            <ul className="space-y-4 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 flex-shrink-0 text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Get Started Button */}
            <button
              onClick={() => setUserLoginModalOpen(true)}
              className={`w-full py-3 rounded-lg transition ${plan.buttonColor}`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* </div> */}
      {/* </div> */}

      {/* Login Modal */}
      <LoginModal
        isOpen={isUserLoginModalOpen}
        onClose={() => setUserLoginModalOpen(false)}
      />
    </>
  );
};

export default Pricing;
