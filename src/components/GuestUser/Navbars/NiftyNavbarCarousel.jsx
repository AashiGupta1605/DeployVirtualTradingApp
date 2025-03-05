import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NiftyNavbarCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6, // Show multiple stocks at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    arrows: false, // Hide prev/next buttons for smooth scrolling
    pauseOnHover: false,
  };

  const [stockData] = useState([
    { name: "NIFTY 50", price: "22,150.40", change: "+0.52%" },
    { name: "SENSEX", price: "73,210.25", change: "-0.23%" },
    { name: "Reliance", price: "2,585.30", change: "+1.12%" },
    { name: "TCS", price: "3,980.00", change: "-0.45%" },
    { name: "HDFC Bank", price: "1,520.75", change: "+0.78%" },
    { name: "NIFTY 50", price: "22,150.40", change: "+0.52%" },
    { name: "SENSEX", price: "73,210.25", change: "-0.23%" },
    { name: "Reliance", price: "2,585.30", change: "+1.12%" },
    { name: "TCS", price: "3,980.00", change: "-0.45%" },
    { name: "HDFC Bank", price: "1,520.75", change: "+0.78%" },{ name: "NIFTY 50", price: "22,150.40", change: "+0.52%" },
    { name: "SENSEX", price: "73,210.25", change: "-0.23%" },
    { name: "Reliance", price: "2,585.30", change: "+1.12%" },
    { name: "TCS", price: "3,980.00", change: "-0.45%" },
    { name: "HDFC Bank", price: "1,520.75", change: "+0.78%" },
  ]);

  return (
    <div className="fixed left-0 top-16 w-full bg-black text-white py-1 z-30">
      <Slider {...settings}>
        {stockData.map((stock, index) => (
          <div key={index} className="flex items-center space-x-1 bg-black px-2 py-[2px] rounded-md">
            <span className="font-bold text-sm">{stock.name}</span>
            <span className="text-gray-300 text-sm">{stock.price}</span>
            <span className={`font-semibold ${stock.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
              {stock.change}
            </span>
          </div>
        ))}
      </Slider>
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
