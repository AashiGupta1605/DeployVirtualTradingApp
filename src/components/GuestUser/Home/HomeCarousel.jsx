import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// const img1 = "/assets/GuestUserPageTradingImages/tradingImg1.jpg";
import img1 from "/src/assets/GuestUserPageTradingImages/tradingImg1.jpg"
import img2 from "/src/assets/GuestUserPageTradingImages/tradingImg2.jpg"
import img3 from "/src/assets/GuestUserPageTradingImages/tradingImg3.jpg"
import img4 from "/src/assets/GuestUserPageTradingImages/tradingImg4.avif"
import img5 from "/src/assets/GuestUserPageTradingImages/tradingImg5.jpg"

const HomeCarousel = () => {
  const slides = [
    { id: 1, image: img1, title: "Stock Market Insights" },
    { id: 2, image: img2, title: "Cryptocurrency Trends" },
    { id: 3, image: img3, title: "Forex Trading Tips" },
    { id: 4, image: img4, title: "Market Analysis" },
    { id: 5, image: img5, title: "Stock Analysis" },
  ];

  return (
    <div className="w-full mx-auto p-4 mt-36">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="rounded-lg shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 text-black text-xl font-semibold">
                {slide.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
