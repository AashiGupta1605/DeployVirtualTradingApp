import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// const img1 = "/assets/GuestUserPageTradingImages/tradingImg1.jpg";
import img1 from "../../../assets/GuestUserPageTradingImages/tradingImg1.jpg";
import img2 from "../../../assets/GuestUserPageTradingImages/tradingImg2.jpg";
import img3 from "../../../assets/GuestUserPageTradingImages/tradingImg3.jpg";
import img4 from "../../../assets/GuestUserPageTradingImages/tradingImg4.avif";
import img5 from "../../../assets/GuestUserPageTradingImages/tradingImg5.jpg";

const HomeCarousel = () => {
  const slides = [
    { id: 1, image: img1, title: "Stock Market Insights" },
    { id: 2, image: img2, title: "Cryptocurrency Trends" },
    { id: 3, image: img3, title: "Forex Trading Tips" },
    { id: 4, image: img4, title: "Market Analysis" },
    { id: 5, image: img5, title: "Stock Analysis" },
  ];

  return (
    <div className="w-full mx-auto p-4 mt-24 ">
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
        <style>
          {`
            .swiper-button-next, .swiper-button-prev {
            color: white !important;}
          `}
        </style>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              style={{ width: "100%", height: "300px", position: "relative" }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(100, 100, 100, 0.4)", // Greyish overlay
                  display: "flex",
                  alignItems: "flex-end", // Aligning title to the bottom
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white", // Changed font color to white
                  paddingBottom: "20px", // Adds some spacing from the bottom
                }}
              >
                {slide.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <img src={img1} alt="Test Image" /> */}
    </div>
  );
};

export default HomeCarousel;
