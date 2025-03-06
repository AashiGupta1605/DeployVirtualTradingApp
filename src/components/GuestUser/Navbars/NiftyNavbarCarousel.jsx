import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { BASE_API_URL } from "../../../utils/BaseUrl";

const NiftyNavbarCarousel = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/admin/nifty/data`);
      if (!response.ok) throw new Error("Failed to fetch Nifty data");
      
      const data = await response.data.json();
      console.log("Nifty50 Data: ",data)
      
      // Transform data to match UI format
      const formattedData = data.map((item) => ({
        name: item.symbol,
        price: item.lastPrice.toFixed(2), // Format price to 2 decimal places
        change: item.change > 0 ? `+${item.change.toFixed(2)}%` : `${item.change.toFixed(2)}%`,
      }));

      setStockData(formattedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 7, // Show multiple stocks at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    arrows: false, // Hide prev/next buttons for smooth scrolling
    pauseOnHover: true,
  };

  return (
    <div className="fixed left-0 top-16 w-full bg-black text-white py-1 z-30">
      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Slider {...settings}>
          {stockData.map((stock, index) => (
            <div key={index} className="flex items-center space-x-1 bg-black px-2 py-[1px] rounded-md">
              <span className="font-bold text-sm">{stock.name}</span>
              <span className="text-gray-300 text-sm">{stock.price}</span>
              <span className={`font-semibold ${stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {stock.change}
              </span>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NiftyNavbarCarousel;


{/* Navbar */}
          {/* <nav className="fixed left-0 w-full bg-gray-900 text-white py-3 px-5 flex justify-between items-center z-50 mt-16">
            <div className="text-lg font-bold cursor-pointer">StockSphere</div>
            <ul className="hidden md:flex space-x-6">
              <li className="cursor-pointer hover:text-yellow-400">Home</li>
              <li className="cursor-pointer hover:text-yellow-400">Markets</li>
              <li className="cursor-pointer hover:text-yellow-400">Trading</li>
              <li className="cursor-pointer hover:text-yellow-400">Portfolio</li>
              <li className="cursor-pointer hover:text-yellow-400">News</li>
            </ul>
          </nav> */}
