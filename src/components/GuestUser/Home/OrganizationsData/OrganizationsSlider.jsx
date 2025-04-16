import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../../../../utils/BaseUrl';
import { motion, AnimatePresence } from 'framer-motion';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaRegSadTear, FaSpinner } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ShowAllClientsModal from './ShowAllOrganizationsModal';

const OrganizationsSlider = () => {
    const [clientsData, setClientsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const fetchClientsData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_API_URL}/guestUser/getAllOrganizations`);
            setClientsData(response.data.data);
            setLoading(false);
        } catch (error) {
            setErr(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientsData();
    }, []);

    const CustomPrevArrow = ({ onClick }) => (
        <button 
            onClick={onClick} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-lightBlue-50 transition-all duration-300"
            aria-label="Previous"
        >
            <BiChevronLeft className="text-lightBlue-600 text-2xl" />
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button 
            onClick={onClick} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-lightBlue-50 transition-all duration-300"
            aria-label="Next"
        >
            <BiChevronRight className="text-lightBlue-600 text-2xl" />
        </button>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        appendDots: dots => (
            <div className="bg-transparent !pb-8">
                <ul className="!m-0 !p-0"> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-lightBlue-600 transition-all"></div>
        ),
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-64 gap-4"
                        >
                            <FaSpinner className="animate-spin text-xl text-lightBlue-600" />
                            <p className="text-gray-600">Loading our partners...</p>
                        </motion.div>
                    ) : err ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-12 px-4 bg-red-50 rounded-lg border border-red-100"
                        >
                            <FaRegSadTear className="text-xl text-red-400 mb-4" />
                            <p className="text-gray-600">Error loading data. Please try again.</p>
                        </motion.div>
                    ) : clientsData.length > 0 ? (
                        <div className="relative px-8">
                            <div className="mb-8 flex justify-between items-center">
                                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">
                                        Total Partners: <span className="font-bold text-lightBlue-600">{clientsData.length}</span>
                                    </span>
                                </div>
                                <button 
                                    onClick={openModal}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-lightBlue-600 rounded-lg transition-all hover:bg-blue-700 shadow-md"
                                >
                                    View All Partners
                                    <FiExternalLink className="text-sm" />
                                </button>
                            </div>

                            <Slider {...settings} className="pb-8">
                                {clientsData.map((client, index) => (
                                    <motion.div 
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-2 outline-none"
                                    >
                                        <div className="bg-white rounded-lg p-4 h-32 flex items-center justify-center border border-gray-100 hover:border-lightBlue-200 transition-all">
                                            <img
                                                src={client.photo || "https://via.placeholder.com/150?text=Client+Logo"}
                                                alt={client.name}
                                                className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all"
                                                onError={(e) => { 
                                                    e.target.src = "https://via.placeholder.com/150?text=Client+Logo";
                                                    e.target.className = "max-h-16 max-w-full object-contain opacity-70";
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <p>No partners available at the moment.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {showModal && <ShowAllClientsModal closeModal={closeModal} clients={clientsData} />}

            {/* Custom styles for slider */}
            <style>{`
                .slick-dots-custom {
                    bottom: -30px;
                    display: flex !important;
                    justify-content: center;
                    align-items: center;
                }
                
                .slick-dots-custom li button {
                    width: 10px;
                    height: 10px;
                    background-color: #d1d5db;
                    border-radius: 50%;
                }

                .slick-dots-custom li.slick-active button {
                    background-color: #3b82f6;
                }

                .slick-slide > div {
                    margin-right: 15px;
                }
            `}</style>
        </section>
    );
};

export default OrganizationsSlider;
