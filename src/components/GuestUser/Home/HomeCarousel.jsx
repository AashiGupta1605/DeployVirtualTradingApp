import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

import img1 from "../../../assets/GuestUserPageTradingImages/tradingImg1.jpg";
import img2 from "../../../assets/GuestUserPageTradingImages/tradingImg2.jpg";
import img3 from "../../../assets/GuestUserPageTradingImages/tradingImg3.jpg";
import img4 from "../../../assets/GuestUserPageTradingImages/tradingImg4.avif";
import img5 from "../../../assets/GuestUserPageTradingImages/tradingImg5.jpg";

const HomeCarousel = () => {
  const slides = [
    { 
      id: 1, 
      image: img1, 
      title: "Stock Market Insights", 
      subtitle: "Gain expert knowledge to make informed decisions",
      cta: "Explore Stocks"
    },
    { 
      id: 2, 
      image: img2, 
      title: "Cryptocurrency Trends", 
      subtitle: "Stay ahead in the dynamic crypto markets",
      cta: "View Crypto"
    },
    { 
      id: 3, 
      image: img3, 
      title: "Forex Trading Tips", 
      subtitle: "Master currency trading with our expert guidance",
      cta: "Learn Forex"
    },
    { 
      id: 4, 
      image: img4, 
      title: "Market Analysis", 
      subtitle: "Comprehensive tools for thorough market evaluation",
      cta: "Analyze Now"
    },
    { 
      id: 5, 
      image: img5, 
      title: "Stock Analysis", 
      subtitle: "Deep dive into stock performance and trends",
      cta: "Start Research"
    },
  ];

  return (
    <div className="relative w-full h-[630px] mt-16"> {/* Added margin-top */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false 
        }}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        loop
        effect="fade"
        speed={1000}
        className="h-full w-full"
      >
        <style>
          {`
            .swiper-button-next, .swiper-button-prev {
              color: white !important;
              background: rgba(0,0,0,0.3);
              width: 50px;
              height: 50px;
              border-radius: 50%;
              transition: all 0.3s ease;
            }
            .swiper-button-next:hover, .swiper-button-prev:hover {
              background: rgba(0,0,0,0.5);
            }
            .swiper-pagination-bullet {
              background: white;
              opacity: 0.6;
              width: 12px;
              height: 12px;
            }
            .swiper-pagination-bullet-active {
              background: #3b82f6;
              opacity: 1;
            }
          `}
        </style>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content Container with better spacing */}
              <div className="absolute bottom-1/4 left-0 right-0 text-center px-4 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                </motion.div>
                
                {/* Added CTA button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-lightBlue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
                >
                  {slide.cta}
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Added subtle shadow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default HomeCarousel;