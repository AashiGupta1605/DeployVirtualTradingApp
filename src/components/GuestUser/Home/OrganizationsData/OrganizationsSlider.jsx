import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../../../../utils/BaseUrl';
import { motion } from 'framer-motion';
import { HiOfficeBuilding } from "react-icons/hi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ShowAllOrganizationsModal from './ShowAllOrganizationsModal';

const OrganizationsSlider = () => {
  const [orgData, setOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchOrganizationsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API_URL}/guestUser/getAllOrganizations`);
      setOrgData(response.data.data);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationsData();
  }, []);

  const CustomPrevArrow = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      aria-label="Previous"
    >
      <BiChevronLeft className="text-2xl text-gray-700" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button 
      onClick={onClick} 
      className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      aria-label="Next"
    >
      <BiChevronRight className="text-2xl text-gray-700" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="organization-slider-section my-16 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className='flex items-center mb-4 md:mb-0'>
            <HiOfficeBuilding className="text-blue-600 text-3xl mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Partnered Organizations</h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gray-600">
              Total Organizations: {orgData.length}
            </span>
            <button 
              onClick={openModal}
              className="flex items-center gap-2 px-5 py-2 font-semibold text-blue-600 bg-blue-50 rounded-lg transition-all hover:bg-blue-100"
            >
              View All
              <FiExternalLink className="text-lg" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : err ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 px-4 bg-red-50 rounded-lg"
          >
            <FaRegSadTear className="text-5xl text-red-400 mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h4>
            <p className="text-gray-600 mb-4 text-center max-w-md">
              We couldn't load the organizations data. Please try again later.
            </p>
            <button
              onClick={fetchOrganizationsData}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </motion.div>
        ) : orgData.length > 0 ? (
          <Slider {...settings} className="pb-8">
            {[...orgData].reverse().map((org, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="px-2 outline-none"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="p-4 flex justify-center">
                    <img
                      src={org.photo || "https://via.placeholder.com/150"}
                      alt={org.name}
                      className="w-24 h-24 object-cover rounded-full border-4 border-blue-100"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h4 className="text-lg font-bold text-gray-800 text-center mb-3 truncate">
                      {org.name || 'Organization Name'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600 truncate">
                        <a 
                          href={org.website || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 hover:underline flex items-center justify-center"
                        >
                          {org.website || 'No website'}
                          <FiExternalLink className="ml-1 text-xs" />
                        </a>
                      </p>
                      <p className="text-gray-600 text-center line-clamp-2">
                        {org.address || 'No address provided'}
                      </p>
                      <p className="text-gray-600 text-center">
                        <span className="font-medium">Contact: </span>
                        {org.contactPerson || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-5xl text-gray-300 mb-4">🏢</div>
            <h4 className="text-lg text-gray-500">No organizations available</h4>
          </div>
        )}
      </div>
      
      {showModal && <ShowAllOrganizationsModal closeModal={closeModal} />}
    </section>
  );
};

export default OrganizationsSlider;