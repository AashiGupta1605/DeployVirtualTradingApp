import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiTrendingUp, FiBarChart2, FiDollarSign, FiClock } from "react-icons/fi";

import HomeCarousel from "../../components/GuestUser/Home/HomeCarousel";
import OrganizationsSlider from "../../components/GuestUser/Home/OrganizationsData/OrganizationsSlider";
import InfoCards from "../../components/GuestUser/Home/InfoCards";
import UserFeedbackCards from "../../components/GuestUser/Home/FeedbackData/UsersFeedbacks/UserFeedbackCards";
import OrganizationFeedbackCards from "../../components/GuestUser/Home/FeedbackData/OrganizationsFeedbacks/OrganizationFeedbackCards";
import Stock from "../../assets/stock.jpg";

const MainHomePage = () => {
  const features = [
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Real-time Data",
      description: "Get up-to-the-minute stock market data and trends"
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive tools for market analysis"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Virtual Trading",
      description: "Practice with virtual money risk-free"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "24/7 Access",
      description: "Access your portfolio anytime, anywhere"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Carousel */}
      <div className="relative">
        <HomeCarousel />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Master the Market with Confidence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto"
            >
              Your gateway to smart investing with real-time data and virtual trading
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/signup">
                <button className="bg-lightBlue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                  Get Started Now <FiArrowRight className="ml-2" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Features Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose PGR Virtual Trading?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              We provide the tools and insights you need to succeed in today's dynamic markets
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 text-lightBlue-600 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stock Market Section */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.img
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                src={Stock}
                alt="Stock Market"
                className="w-full rounded-xl shadow-xl object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Track Stock Trends in Real Time
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Stay ahead of the market with our cutting-edge platform that provides real-time stock data, comprehensive analytics, and virtual trading capabilities.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-lightBlue-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-base text-gray-700">
                      Real-time market data with minimal latency
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-base text-gray-700">
                      Advanced charting and technical analysis tools
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-lightBlue-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-base text-gray-700">
                      Risk-free virtual trading environment
                    </p>
                  </div>
                </div>
                <Link to="/learn">
                  <button className="bg-lightBlue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center">
                    Learn More <FiArrowRight className="ml-2" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Info Cards Section */}
        <InfoCards />

        {/* Partnered Organizations Section */}
        <OrganizationsSlider />

        {/* Testimonials Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Hear from traders who've improved their skills with our platform
            </p>
          </div>
          <UserFeedbackCards />
        </section>

        {/* Organization Feedback Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Partner Testimonials
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              See what our partner organizations have to say about us
            </p>
          </div>
          <OrganizationFeedbackCards />
        </section>


      </div>
    </div>
  );
};

export default MainHomePage;