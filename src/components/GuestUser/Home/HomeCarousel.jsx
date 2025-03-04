import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeCarousel = () => {
  const slides = [
    { id: 1, image: "", title: "Stock Market Insights" },
    { id: 2, image: "", title: "Cryptocurrency Trends" },
    { id: 3, image: "", title: "Forex Trading Tips" },
    { id: 4, image: "", title: "Market Analysis" },
  ];

  return (
    <div className="w-full mx-auto p-4 mt-28">
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
