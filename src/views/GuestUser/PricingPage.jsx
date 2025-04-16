import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiCheckCircle, 
  FiArrowRight, 
  FiClock, 
  FiTrendingUp,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import LoginModal from "../../views/auth/UnifiedLoginModal";
import subscriptionData from "../../data/subscriptionPlans.json";

const PricingPage = () => {
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [showAllFeatures, setShowAllFeatures] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Get plans from the imported JSON data
  const subscriptionPlans = subscriptionData.plans;

  const getDurationLabel = (duration) => {
    switch (duration) {
      case "monthly": return "Monthly";
      case "quarterly": return "Quarterly";
      case "halfYearly": return "Half Yearly";
      default: return "";
    }
  };

  const getDiscountBadge = (duration) => {
    switch (duration) {
      case "quarterly": return { text: "Save 10%", color: "bg-green-100 text-green-800" };
      case "halfYearly": return { text: "Save 20%", color: "bg-green-100 text-green-800" };
      default: return null;
    }
  };

  const getPlanColor = (planId) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) return {
      border: "border-gray-200 hover:border-gray-300",
      button: "bg-gray-600 hover:bg-gray-700",
      badge: "bg-gray-100 text-gray-800",
      highlight: "bg-gray-50"
    };

    const colors = {
      silver: {
        border: "border-gray-200 hover:border-gray-300",
        button: "bg-gray-600 hover:bg-gray-700",
        badge: "bg-gray-100 text-gray-800",
        highlight: "bg-gray-50"
      },
      gold: {
        border: "border-yellow-400 hover:border-yellow-500",
        button: "bg-yellow-600 hover:bg-yellow-700",
        badge: "bg-yellow-100 text-yellow-800",
        highlight: "bg-yellow-50"
      },
      platinum: {
        border: "border-purple-200 hover:border-purple-300",
        button: "bg-purple-600 hover:bg-purple-700",
        badge: "bg-purple-100 text-purple-800",
        highlight: "bg-purple-50"
      },
      diamond: {
        border: "border-blue-200 hover:border-blue-300",
        button: "bg-blue-600 hover:bg-blue-700",
        badge: "bg-blue-100 text-blue-800",
        highlight: "bg-blue-50"
      }
    };
    return colors[planId] || colors.silver;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    hover: { x: 3 }
  };

  const DurationButton = ({ duration, isSelected, onClick }) => {
    const discount = getDiscountBadge(duration);
    
    return (
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onClick}
        className={`
          px-4 py-2 rounded-lg font-medium text-sm
          ${isSelected 
            ? "bg-lightBlue-600 text-white shadow-md" 
            : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"}
          transition-all duration-200
        `}
      >
        <span>{getDurationLabel(duration)}</span>
        {discount && (
          <span className={`ml-2 text-xs px-2 py-1 rounded-full ${discount.color}`}>
            {discount.text}
          </span>
        )}
      </motion.button>
    );
  };

  const FeatureList = ({ features, planId }) => {
    const shouldShowToggle = features.length > 5;
    const isShowingAll = showAllFeatures[planId];
    const displayFeatures = isShowingAll ? features : features.slice(0, 5);
    
    return (
      <div className="space-y-2">
        <motion.ul 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {displayFeatures.map((feature, index) => (
            <motion.li
              key={index}
              variants={featureVariants}
              whileHover="hover"
              className="flex items-start text-xs text-gray-600"
            >
              <FiCheckCircle className="mr-2 mt-0.5 text-green-500 flex-shrink-0 text-sm" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
        {shouldShowToggle && (
          <button
            onClick={() => setShowAllFeatures(prev => ({
              ...prev,
              [planId]: !prev[planId]
            }))}
            className="text-blue-600 text-xs mt-1 flex items-center hover:underline"
          >
            {isShowingAll ? (
              <>
                <FiChevronUp className="mr-1" /> Show less
              </>
            ) : (
              <>
                <FiChevronDown className="mr-1" /> Show all {features.length} features
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 mb-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mt-28 mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Choose Your Trading Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Select the perfect plan that matches your trading ambitions. 
            All plans include our core features with zero risk virtual trading.
          </motion.p>

          {/* Duration Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {["monthly", "quarterly", "halfYearly"].map((duration) => (
              <DurationButton
                key={duration}
                duration={duration}
                isSelected={selectedDuration === duration}
                onClick={() => setSelectedDuration(duration)}
              />
            ))}
          </motion.div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className={`
                relative bg-white rounded-xl overflow-hidden border
                ${getPlanColor(plan.id).border}
                transition-all duration-300 hover:shadow-lg flex flex-col h-full
              `}
            >
              {/* Plan Badge */}
              {plan.badge && (
                <div className={`
                  absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-xs font-semibold
                  ${getPlanColor(plan.id).badge}
                `}>
                  {plan.badge}
                </div>
              )}

              {/* Plan Content */}
              <div className="p-5 flex-grow flex flex-col">
                {/* Plan Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.tagline}</p>
                  
                  {/* Price */}
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{plan.price[selectedDuration].toLocaleString()}
                      </span>
                      <span className="ml-1 text-gray-500 text-sm">
                        /{selectedDuration === "monthly" ? "mo" : selectedDuration === "quarterly" ? "qtr" : "6mo"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Virtual Trading Amount */}
                <motion.div 
                  className={`p-3 rounded-lg mb-4 ${getPlanColor(plan.id).highlight}`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-md font-bold text-gray-900">
                        ₹{plan.virtualAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">Virtual Trading Capital</p>
                    </div>
                    <FiTrendingUp className="h-6 w-6 text-lightBlue-600" />
                  </div>
                </motion.div>

                {/* Trading Hours */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Trading Hours</h4>
                  {plan.tradingHours.map((hours, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center text-xs text-gray-600 mb-1"
                      whileHover="hover"
                      variants={featureVariants}
                    >
                      <FiClock className="mr-2 text-lightBlue-600 text-sm" />
                      {hours}
                    </motion.div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-4 flex-grow">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features</h4>
                  <FeatureList 
                    features={plan.features}
                    planId={plan.id}
                  />
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Limitations</h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center text-xs text-gray-500"
                          whileHover="hover"
                          variants={featureVariants}
                        >
                          <span className="mr-1">•</span>
                          {limitation}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="p-4 bg-gray-50">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setIsLoginModalOpen(true)}
                  className={`
                    w-full py-2 px-4 rounded-lg font-medium text-white text-sm
                    bg-lightBlue-600
                    transition-all duration-300
                    flex items-center justify-center
                  `}
                >
                  Get Started
                  <motion.div
                    className="ml-2"
                    whileHover={{ x: 3 }}
                  >
                    <FiArrowRight />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default PricingPage;