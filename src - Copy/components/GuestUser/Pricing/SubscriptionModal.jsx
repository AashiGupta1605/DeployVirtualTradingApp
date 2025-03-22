import React, { useState } from "react";
import { CheckCircle, TrendingUp, CreditCard, X } from "lucide-react";

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const subscriptionPlans = [
    {
      id: "gold",
      name: "Gold Plan",
      price: 999,
      duration: "1 Month",
      virtualAmount: 100000,
      features: [
        "Virtual trading amount of ₹1,00,000",
        "Real-time market data",
        "Basic analytics",
        "Email support",
        "Access to Nifty 50 stocks",
        "Basic trading tools",
      ],
    },
    {
      id: "platinum",
      name: "Platinum Plan",
      price: 2499,
      duration: "3 Months",
      virtualAmount: 500000,
      features: [
        "Virtual trading amount of ₹5,00,000",
        "Real-time market data",
        "Advanced analytics",
        "Priority support",
        "Access to Nifty 50 & 500 stocks",
        "Advanced trading tools",
        "Portfolio insights",
        "Technical indicators",
      ],
    },
    {
      id: "diamond",
      name: "Diamond Plan",
      price: 4999,
      duration: "6 Months",
      virtualAmount: 1000000,
      features: [
        "Virtual trading amount of ₹10,00,000",
        "Real-time market data",
        "Premium analytics",
        "24/7 Priority support",
        "Access to all stocks & ETFs",
        "Advanced trading tools",
        "Portfolio insights",
        "Technical indicators",
        "API access",
        "Custom alerts",
        "Research reports",
      ],
    },
  ];

  const handleSubscribe = (plan) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Successfully subscribed to ${plan.name}!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Page Header */}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Choose Your Trading Plan</h2>
          <X size={24} className="text-gray-500" />
        </div>

        {/* Subscription Plans */}
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border p-4 rounded-lg bg-white ${
                selectedPlan?.id === plan.id ? "border-blue-500" : ""
              }`}
            >
              <h4 className="text-lg font-semibold text-center mb-2">
                {plan.name}
              </h4>
              <p className="text-center text-gray-700">
                ₹{plan.price.toLocaleString()} / {plan.duration}
              </p>

              {/* Virtual Trading Amount */}
              <div className="bg-gray-100 p-2 rounded mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">Trading Amount</span>
                <TrendingUp size={18} className="text-blue-600" />
              </div>
              <p className="text-lg font-bold text-blue-800 text-center mt-1">
                ₹{plan.virtualAmount.toLocaleString()}
              </p>

              {/* Features */}
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {plan.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full mt-4 py-2 rounded text-white ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Subscribe Now"}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <CreditCard size={16} className="mr-2" />
            Secure payment powered by Razorpay
          </div>
          <button className="text-blue-600 hover:underline">Terms & Conditions</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
