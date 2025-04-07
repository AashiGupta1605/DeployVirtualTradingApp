import React from "react";
import { Link } from "react-router-dom";
import { FiTrendingUp, FiPieChart, FiDollarSign, FiAlertCircle, FiBarChart2, FiBookOpen } from "react-icons/fi";

const ServicesPage = () => {
  const services = [
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: "Stock Analysis",
      description: "Get in-depth technical and fundamental analysis of stocks before investing.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: <FiPieChart className="text-2xl" />,
      title: "Investment Strategies",
      description: "Tailored investment plans to maximize your returns safely.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: "Portfolio Management",
      description: "Professional management and optimization of your stock portfolio.",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: <FiAlertCircle className="text-2xl" />,
      title: "Live Market Updates",
      description: "Real-time stock market movements and breaking news alerts.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <FiBarChart2 className="text-2xl" />,
      title: "Trading Signals",
      description: "AI-powered trading signals for better decision-making.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <FiBookOpen className="text-2xl" />,
      title: "Market Education",
      description: "Learn stock trading from basics to advanced strategies.",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      {/* Hero Section */}
      <div className="bg-lightBlue-600 py-10 mt-15 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Premium Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Professional stock market tools and services to help you invest smarter
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
              <div className="px-6 pb-4">
                <button className="text-lightBlue-600 hover:text-lightBlue-700 font-medium text-sm flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to elevate your trading?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust our services for their stock market success
          </p>
          <Link
            to="/contact"
            className="inline-block bg-lightBlue-600 hover:bg-lightBlue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;