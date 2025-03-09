import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../../utils/BaseUrl";
import OrganizationAllFeedsModal from "./OrganizationAllFeedsModal";

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
        // `${BASE_API_URL}/guestUser/organizationFeedbacks/createdDate/decreasing`
        `http://localhost:5000/v1/api/guestUser/organizationFeedbacks/createdDate/decreasing`
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
        // `${BASE_API_URL}/guestUser/getAllOrganizations`
        `http://localhost:5000/v1/api/guestUser/getAllOrganizations`
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

  return (
    <div>
      <section className="mb-8 bg-gray-100 border-2 border-gray-200 mx-6 p-6 rounded-lg">
        {/* Flex container for headings and button */}
        <div className="flex justify-between items-center mb-6">
          {/* Left-most heading */}
          <h3 className="text-xl font-bold text-[#1a2c47]">Users Feedbacks</h3>

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

        {err && <p className="text-red-500">{err}</p>}

        <div className="flex justify-center gap-6">
          {feedbacks.length > 0 ? (
            feedbacks.slice(0, 3).map((card, index) => {
              const org = orgData?.find(
                (org) => org._id === card.organizationId
              );
              console.log(
                "Get user data by stored userID refrence in Feedback modal",
                org
              );
              return (
                <div
                  key={index}
                  className="w-[400px] h-[130px] bg-white shadow-lg p-6 rounded-lg border overflow-hidden"
                >
                  {/* Star Ratings */}
                  <div className="flex -mt-4 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < card.rating ? "gold" : "none"} // Fill stars based on rating
                        viewBox="0 0 24 24"
                        stroke="gold"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03z"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    <span className="font-semibold">
                      {card.feedbackCategory}:{" "}
                    </span>
                    {card.feedbackMessage}
                  </p>
                  <h4 className="mt-4 font-semibold text-right text-sm text-gray-600">
                    - {org ? org.name : "Anonymous Organization"}
                  </h4>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-lg shadow-md p-4">
              <span className="text-red-500 text-2xl">
                <i className="fas fa-exclamation-circle"></i>
              </span>
              <b className="text-lg text-gray-700 mt-2">Loading...</b>
              <h4 className="text-gray-500 text-sm">No content available</h4>
            </div>
          )}
        </div>
      </section>
      {showModal && <OrganizationAllFeedsModal closeModal={closeModal} />}
    </div>
  );
};

export default OrganizationFeedbackCards;
