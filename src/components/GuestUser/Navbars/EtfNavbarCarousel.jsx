import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import { BASE_API_URL } from "../../utils/BaseUrl.jsx";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const EtfNavbarCarousel = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/etf`);
      if (!response.ok) throw new Error("Failed to fetch ETF data");
      
      const data = await response.json();
      
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
    slidesToShow: 6, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    arrows: false, 
    pauseOnHover: false,
  };

  return (
    <div className="fixed left-0 top-26 w-full bg-black text-white py-1 z-30">
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

export default EtfNavbarCarousel;
