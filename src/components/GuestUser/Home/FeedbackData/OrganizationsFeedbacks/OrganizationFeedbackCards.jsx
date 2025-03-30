import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../../utils/BaseUrl";
import OrganizationAllFeedbacksTable from "./OrganizationAllFeedbacksTable";

import { Star } from "lucide-react";
import { FolderOpen } from "lucide-react";
// import { MdFeedback } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const OrganizationFeedbackCards = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [err, setErr] = useState("");

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchOrganizationFeedbacks = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/guestUser/organizationFeedbacks/createdDate/decreasing`
        // `http://localhost:5000/v1/api/guestUser/organizationFeedbacks/createdDate/decreasing`
      );
      setFeedbacks(response.data.feedbackData);

      console.log("Users Feedbacks Object: ", response.data);
      console.log("User Feedbacks: ", feedbacks);
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.");
    }
  };

  const fetchOrgData = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/guestUser/getAllOrganizations`
        // `http://localhost:5000/v1/api/guestUser/getAllOrganizations`
      );
      setOrgData(response.data.data);
      console.log("Organization Data", response.data);
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    try {
      fetchOrgData();
      fetchOrganizationFeedbacks();
      setErr("");
    } catch (error) {
      setErr("Something went wrong: ", error);
    }
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    setCurrentIndex(0); // Reset pagination when feedbacks change
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
    <div>
      <section className="mb-8 bg-gray-100 border-2 border-gray-200 mx-6 p-6 rounded-lg relative">

        {/* Previous Button */}
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className="absolute -left-1 mr-10 top-[53%] transform -translate-y-1/2 text-3xl text-gray-500 hover:text-gray-800 disabled:opacity-30 focus:outline-none"
          >
          <BiChevronLeft />
        </button>

        {/* Flex container for headings and button */}
        <div className="flex justify-between items-center mb-6">
          {/* Left-most heading */}
          <div className="flex gap-3 items-center">
            {/* <MdFeedback className="text-blue-500 text-[34px]" /> */}
            <BiMessageDetail className="text-blue-500 text-[26px] mt-[5px]" />
            <h3 className="text-xl font-bold text-gray-700">
              Organizations Feedbacks
            </h3>
          </div>
          {/* Right side container */}
          <div className="flex items-center gap-4">
            {/* Second heading before the button */}
            <h6 className="text-[18] font-semibold text-gray-500">
              Total Feedbacks: {feedbacks.length}
            </h6>

            {/* View More Button */}
            <button
              className="flex items-center gap-2 px-4 py-1 font-semibold text-sm text-[#1a2c47] border border-[#1a2c47] rounded-lg transition-all duration-300 hover:bg-[#1a2c47] hover:text-white"
              onClick={openModal}
            >
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

        {/* {err && <p className="text-red-500">{err}</p>} */}

        <div className="flex justify-center gap-6">

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

          {feedbacks.length > 0 ? (
            visibleFeedbacks.map((card, index) => {
              const orgName = orgData?.find(
                (org) => org._id === card.organizationId?._id
              );
              console.log(
                "Get org data by stored otgID refrence in Feedback modal",
                orgName
              );
              return (
                <div
                  key={index}
                  className="w-[400px] h-[140px] bg-white shadow-lg p-6 rounded-lg border overflow-hidden"
                >
                  {/* Star Ratings */}
                  <div className="flex -mt-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`mx-0.5 ${
                          i < card.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="max-h-13 min-h-13 overflow-y-auto">
                  <p className="text-gray-700 italic">
                    <span className="font-semibold">
                      {card.feedbackCategory}:{" "}
                    </span>
                    {card.feedbackMessage}
                  </p>
                  </div>
                  <h4 className="mt-3 font-semibold text-right text-sm text-gray-600">
                    - {orgName ? orgName.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : "Organization"}
                  </h4>
                </div>
              );
            })
          ) : (!err && 
            <div className="pt-6 pb-6 flex flex-col items-center space-y-2">
              <span>
                <FolderOpen className="w-10 h-10 text-gray-400" />
              </span>
              <h4 className="text-gray-500 text-sm">No feedbacks available.</h4>
            </div>
          )}
        </div>

        {/* <div className="flex justify-between mt-4">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50">
            Previous
          </button>
          <button onClick={handleNext} disabled={currentIndex + itemsPerPage >= feedbacks.length} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50">
            Next
          </button>
        </div> */}

      {/* Next Button */}
      <button 
        onClick={handleNext} 
        disabled={currentIndex + itemsPerPage >= feedbacks.length} 
        className="absolute -right-1 ml-10 top-[53%] transform -translate-y-1/2 text-3xl text-gray-500 hover:text-gray-800 disabled:opacity-30 focus:outline-none"
        >
        <BiChevronRight />
      </button>

      </section>
      {showModal && <OrganizationAllFeedbacksTable closeModal={closeModal} />}
    </div>
  );
};

export default OrganizationFeedbackCards;