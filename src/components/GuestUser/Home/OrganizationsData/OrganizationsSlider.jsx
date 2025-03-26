// ----------Reviewed: Correct-------------------------------

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../../../../utils/BaseUrl';

import { HiOfficeBuilding } from "react-icons/hi";
import { FolderOpen } from "lucide-react";
// import { FaBuilding } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./OrganizationsSliderCSS.css"

import ShowAllOrganizationsModal from './ShowAllOrganizationsModal';

const OrganizationsSlider = () => {

  const [orgData, setOrgData] = useState([]);
  const [err, setErr] = useState('');

  const [showModal,setShowModal]=useState(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const fetchOrganizationsData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/guestUser/getAllOrganizations`);
      // const response = await axios.get(`http://localhost:5000/v1/api/guestUser/getAllOrganizations`);
      setOrgData(response.data.data);
      setErr("")
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
      try {
        fetchOrganizationsData()
        setErr("")
      } 
      catch (error) {
        setErr(error.message);
      }
  }, []);

  // Custom Previous Arrow Component
  const CustomPrevArrow = ({ onClick }) => (
    <button 
    onClick={onClick} 
    className="absolute -left-8 top-[51%] transform -translate-y-1/2 text-3xl text-gray-500 hover:text-gray-800 disabled:opacity-30 z-10 focus:outline-none"
    >
    <BiChevronLeft className="text-3xl" />
    </button>
  );

// Custom Next Arrow Component
  const CustomNextArrow = ({ onClick }) => (
    <button 
    onClick={onClick} 
    className="absolute -right-8 top-[51%] transform -translate-y-1/2 text-3xl text-gray-500 hover:text-gray-800 disabled:opacity-30 z-10 focus:outline-none"
    >
    <BiChevronRight className="text-3xl" />
    </button>
  );

  const settings = {
    infinite: true,
    speed: 3500,
    slidesToShow: 4,  // Number of images visible at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Makes it a continuous scroll effect
    cssEase: "linear",
    // arrows: false, // Hides navigation arrows
    arrows: true, // Enable arrows to use custom ones
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    adaptiveHeight: false,
  };

return (
<>
<section className="organization-slider-section mt-8 mb-8 bg-gray-100 border-2 border-gray-200 mx-6 p-6 rounded-lg">

  <div className="flex justify-between items-center mb-4">
    {/* Left-most heading */}
    <div className='flex gap-3 items-center'>
      <HiOfficeBuilding className="text-blue-500 text-[30px]" />
      {/* <FaBuilding className="text-blue-500 text-[34px]" /> */}
      <h3 className="text-xl font-bold text-gray-700">Partnered Organizations</h3>
    </div>

    {/* Right side container */}
      <div className="flex items-center gap-4">
        {/* Second heading before the button */}
        <h6 className="text-[18] font-semibold text-gray-500">
          Total No. of Organizations: {orgData.length}
        </h6>

        {/* View More Button */}
        <button className="flex items-center gap-2 px-4 py-1 font-semibold text-sm text-[#1a2c47] border border-[#1a2c47] rounded-lg transition-all duration-300 hover:bg-[#1a2c47] hover:text-white" onClick={openModal}>
          View More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 5l7 7m0 0l-7 7m7-7H4"
          />
          </svg>
        </button>
      </div>
  </div>

  <div className="mb-0 text-center">
    {/* {err && <div className="error-message">Error: {err}</div>} */}

    {/* {err && 
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center h-40 w-80 bg-gray-100 rounded-lg shadow-md border-t border-gray-200 p-4">
          <span className="text-red-500 text-2xl">
            <i className="fas fa-exclamation-circle"></i>
          </span>
          <b className="text-lg text-gray-700 mt-2">Loading...</b>
          <h4 className="text-gray-500 text-sm">No content available</h4>
          <p className="text-red-500">{err}</p>
        </div>
      </div>
    } */}

    {err && (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex flex-col items-center justify-center w-96 bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <i className="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
          </div>
          <b className="text-lg text-gray-800 mt-4">Oops! Something went wrong.</b>
          <p className="text-gray-600 text-sm text-center mt-2">
            We couldn’t load the content. Please try again later.
          </p>
          <p className="text-red-600 font-medium mt-2">{err}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md shadow-md hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )}

  {orgData.length > 0 ? 
    (
      <Slider {...settings}>
        {[...orgData].reverse().map((card, index) => (
          <div key={index} className="card group h-85 min-w-[295px] max-w-[295px] bg-white rounded-lg shadow-lg border p-6 overflow-hidden ease-in-out hover:scale-104 mb-3 mt-3" style={{}}>
          <div className="flex justify-center items-center">
            <img
            src={card.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"}
            alt={card.name}
            className="w-30 h-30 object-cover rounded-full"
            // className="w-full h-32 object-contain rounded-lg"                
            />
            </div>
            <div className="card-content justify-between overflow-hidden">
              <h4 className="text-[18px] break-words truncate font-semibold text-gray-800 mb-5 mt-4 decoration-3 border-b-2 border-gray-700 pb-2 whitespace-nowrap overflow-hidden group-hover:overflow-visible group-hover:animate-marquee">
              {card.name 
              ? card.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
              : 'Organization Name is not available'
              }
              </h4>

              {/* <h4 className="text-[18px] break-words truncate font-semibold text-gray-800 mb-5 mt-4 decoration-3 border-b-2 border-gray-700 pb-2 whitespace-nowrap overflow-hidden relative group-hover:overflow-visible">
                <span className="inline-block group-hover:animate-marquee">
                {card.name 
                ? card.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                : 'Organization Name is not available'}
                </span>
              </h4> */}

              <div className="max-h-24 min-h-24 overflow-y-auto pr-5">
              <p className="text-sm font-medium text-left pl-4">
              <a href={card.website || '#'} className="text-blue-600 hover:text-blue-800 break-words line-clamp-1" target="_blank" rel="noopener noreferrer">
                {card.website || 'No website available'}
              </a>
              </p>                  
              <p className="mt-2 text-sm font-medium text-left text-gray-500 pl-4 "><span className="font-bold text-gray-600">Address:&nbsp;</span>
                {card.address 
                  ? card.address.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                  : 'No address available'}     
              </p>
              <p className="mt-2 text-sm font-medium text-left text-gray-500 pl-4"><span className="font-bold text-gray-600">Head of Organization:&nbsp;</span>
                {card.contactPerson 
                  ? card.contactPerson.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                  : 'No contact person available'}                  
              </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    ) : (!err && 
          <div className="pt-6 pb-6 flex flex-col items-center space-y-2">
            <span>
              <FolderOpen className="w-10 h-10 text-gray-400" />
            </span>
            <h4 className="text-gray-500 text-sm">No feedbacks available.</h4>
          </div>
        )
  }
  </div>
</section>
{showModal && <ShowAllOrganizationsModal closeModal={closeModal}/>}
</>
);
};

export default OrganizationsSlider;