import React, { useEffect, useState } from "react";
import IndexNavbar from "../../components/User/Navbars/IndexNavbar";
import Footer from "../../components/User/Footers/Footer";
import { Link } from "react-router-dom";
import Stock from "../../assets/stock.jpg";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token existence to boolean
  }, []);

  return (
    <>
      <IndexNavbar fixed />

      {/* Homepage Section with Text on Left and Image on Right */}
      <section className="relative pt-32 lg:pt-16 flex h-screen max-h-screen overflow-auto">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
          {/* Left Section: Text */}
          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-blueGray-800 mb-4">
              Track Stock Trends in Real Time
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Stay updated with the latest stock market trends and data with StockSphere. 
              Never miss a beat with our real-time updates.
            </p>
            <div className="flex gap-4">
              <Link to="/learn">
                <button className="bg-gray-300 text-black px-6 py-3 font-bold rounded-md text-sm md:text-lg">
                  LEARN MORE
                </button>
              </Link>
             
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="w-50 md:w-1/2 mt-12 md:mt-0">
            <img
              src={Stock} // Replace with a relevant stock market image
              alt="Stock Market"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}