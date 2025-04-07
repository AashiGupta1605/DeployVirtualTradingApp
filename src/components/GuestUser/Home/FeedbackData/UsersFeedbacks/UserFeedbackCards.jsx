import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../../utils/BaseUrl";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { BiMessageDetail } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import UserAllFeedbacksTable from "./UserAllFeedbacksTable";

const UserFeedbackCards = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchUserFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_API_URL}/guestUser/userFeedbacks/createdDate/decreasing`
      );
      setFeedbacks(response.data.feedbackData);
      setLoading(false);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to load feedbacks");
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/guestUser/getAllUsers`
      );
      setUserData(response.data.data);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to load user data");
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserFeedbacks();
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [feedbacks]);

  const visibleFeedbacks = feedbacks.slice(currentIndex, currentIndex + itemsPerPage);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < feedbacks.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="relative">
      <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-16">
        <div className="px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <BiMessageDetail className="text-blue-600 text-3xl mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">User Feedbacks</h3>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium text-gray-600">
                Total Feedbacks: {feedbacks.length}
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
            <div className="py-12 flex flex-col items-center justify-center bg-red-50 rounded-lg">
              <div className="text-5xl text-red-400 mb-4">⚠️</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Feedbacks</h4>
              <p className="text-gray-600 mb-4 text-center max-w-md">
                {err}
              </p>
              <button
                onClick={fetchUserFeedbacks}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Retry
              </button>
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="relative">
              <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0} 
                className={`absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full ${currentIndex === 0 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronLeft className="text-3xl" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                {visibleFeedbacks.map((feedback, index) => {
                  const user = userData.find(user => user._id === feedback.userId?._id);
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all h-full"
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={`mx-0.5 ${
                                i < feedback.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        
                        <div className="flex-grow mb-4 overflow-y-auto max-h-32">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            {feedback.feedbackCategory}
                          </h4>
                          <p className="text-gray-600 italic">
                            "{feedback.feedbackMessage}"
                          </p>
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-600 text-right">
                            — {user ? user.name : "Anonymous"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <button 
                onClick={handleNext} 
                disabled={currentIndex + itemsPerPage >= feedbacks.length} 
                className={`absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full ${currentIndex + itemsPerPage >= feedbacks.length ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronRight className="text-3xl" />
              </button>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-5xl text-gray-300 mb-4">💬</div>
              <h4 className="text-lg text-gray-500">No feedbacks available yet</h4>
            </div>
          )}
        </div>
      </section>
      
      {showModal && <UserAllFeedbacksTable closeModal={closeModal} />}
    </div>
  );
};

export default UserFeedbackCards;