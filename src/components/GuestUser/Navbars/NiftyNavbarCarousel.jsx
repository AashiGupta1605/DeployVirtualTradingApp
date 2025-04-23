// Nifty Carousel Component
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BASE_API_URL } from "../../../utils/BaseUrl";
import { FiRefreshCw } from "react-icons/fi";

const NiftyNavbarCarousel = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_API_URL}/admin/nifty/data`);
      if (!response.ok) throw new Error("Failed to fetch Nifty data");

      const data = await response.json();
      
      if (!data?.data?.[0]?.stocks) {
        throw new Error("Invalid API response format");
      }

      const formattedData = data.data[0].stocks.map((item) => ({
        name: item.symbol,
        price: ` ${item.lastPrice.toFixed(2)}`,
        change: item.change > 0 ? `INR+${item.change.toFixed(2)}` : `INR${item.change.toFixed(2)}`,
        changePer: ` (${item.pChange.toFixed(2)}`,
        isPositive: item.change > 0
      }));

      setStockData(formattedData);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
      setError("");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 120000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="fixed mt-1.5 left-0 top-15 w-full bg-white border-b border-gray-200 z-30 h-9">
      <div className="max-w-screen-2xl mx-auto px-2 h-full flex items-center">
        {/* Nifty Label - Perfectly centered */}
        <div className="flex-shrink-0 h-full flex items-center pr-3">
          <span className="font-bold text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded">
            NIFTY50 STOCKS
          </span>
        </div>

        {/* Stock Ticker - Centered content */}
        <div className="flex-1 h-full overflow-hidden">
          {loading ? (
            <div className="h-full flex items-center space-x-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-100 rounded w-24"></div>
              ))}
            </div>
          ) : error ? (
            <div className="h-full flex items-center text-red-500 text-xs">
              {error}
            </div>
          ) : (
            <Slider {...settings} className="h-full">
              {stockData.map((stock, index) => (
                <div key={index} className="h-full px-1 min-w-[230px]">
                  <div className="mt-2 h-full flex items-center space-x-1 px-0 hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-xs text-gray-800 truncate max-w-[65px]">
                      {stock.name}
                    </span>
                    <span className="text-[13.5px] font-semibold text-gray-600">
                      {stock.price}
                    </span>
                    <span className={`mt-1 text-[12px] truncate max-w-[160px] ${
                      stock.isPositive 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}>
                      {stock.change}{stock.changePer}
                    </span>
                    <span className={`mt-1 -ml-1 text-[12px] ${
                      stock.isPositive 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}>%)</span>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* Refresh Button - Centered */}
        <button 
          onClick={fetchStockData}
          className="flex-shrink-0 h-full flex items-center px-1.5 text-gray-500 hover:text-amber-600 transition-colors"
          title={`Last updated: ${lastUpdated}`}
        >
          <FiRefreshCw className={`text-xs ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  );
};

export default NiftyNavbarCarousel;