// ----------Reviewed: Correct-------------------------------

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../../../../utils/BaseUrl';

import { HiOfficeBuilding } from "react-icons/hi";
// import { FaBuilding } from "react-icons/fa";

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
      // const response = await axios.get(`${BASE_API_URL}/guestUser/getAllOrganizations`);
      const response = await axios.get(`http://localhost:5000/v1/api/guestUser/getAllOrganizations`);
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

  const settings = {
    infinite: true,
    speed: 3500,
    slidesToShow: 4,  // Number of images visible at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Makes it a continuous scroll effect
    cssEase: "linear",
    arrows: false, // Hides navigation arrows
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
    {err && <div className="error-message">Error: {err}</div>}

    <Slider {...settings}>
          {orgData.length > 0 ? (
            orgData.map((card, index) => (
              <div key={index} className="card h-80 min-w-[300px] max-w-[300px] bg-white rounded-lg shadow-lg border p-6 overflow-hidden ease-in-out hover:scale-103 mb-3 mt-3" style={{}}>
              <div className="flex justify-center items-center">
                <img
                  src={card.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"}
                  alt={card.name}
                  className="w-30 h-30 object-cover rounded-full"
                  // className="w-full h-32 object-contain rounded-lg"                
                />
                </div>
                <div className="card-content justify-between overflow-hidden">
                  <h2 className="text-[20px] font-bold text-gray-600 mb-5 uppercase mt-4 decoration-3 border-b-2 border-gray-700 pb-2">{card.name}</h2>
                  <p className="mt-2 text-sm font-medium text-left pl-4">
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
            ))
          ) : (
            <div><font color='red'><b>Loading...</b></font></div>
          )}
    </Slider>

    </div>
    </section>
    {showModal && <ShowAllOrganizationsModal closeModal={closeModal}/>}
    </>
  );
};

export default OrganizationsSlider;