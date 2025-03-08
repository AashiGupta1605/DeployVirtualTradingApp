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

      const data = await response.json();
      console.log("Full API Response: ", data);

      if (
        !data ||
        !data.data ||
        !Array.isArray(data.data) ||
        data.data.length === 0
      ) {
        throw new Error("Invalid API response format");
      }

      const stocks = data.data[0].stocks; // Extract the correct array

      const formattedData = stocks.map((item) => ({
        name: item.symbol || "Unknown",
        price:
          typeof item.lastPrice === "number"
            ? item.lastPrice.toFixed(2)
            : "N/A",
        change:
          typeof item.pChange === "number"
            ? item.pChange > 0
              ? `+${item.pChange.toFixed(2)}%`
              : `${item.pChange.toFixed(2)}%`
            : "N/A",
      }));

      setStockData(formattedData);
      setLoading(false);
      setError("");
    } catch (err) {
      console.error("Fetch error: ", err);
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
    <div className="fixed left-0 top-16 w-full bg-black text-white py-1 z-30 flex items-center">
      {/* Left Fixed Heading */}
      <div className="ml-4 font-bold text-sm whitespace-nowrap">NIFTY50 Stocks: &nbsp;</div>

      {/* Right - Slider */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Slider {...settings}>
            {stockData.map((stock, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-black px-2 py-[1px] rounded-md"
              >
                <span className="font-bold text-[13px]">{stock.name}</span>
                <span className="text-gray-300 text-[13px]">{stock.price}</span>
                <span
                  className={`font-semibold ${
                    stock.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stock.change}
                </span>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default NiftyNavbarCarousel;
