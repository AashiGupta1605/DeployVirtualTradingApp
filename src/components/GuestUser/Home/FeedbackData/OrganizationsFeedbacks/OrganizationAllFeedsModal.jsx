import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../../utils/BaseUrl";

const OrganizationAllFeedsModal = ({ closeModal }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [orgData, setOrgData] = useState([]);

  const [err, setErr] = useState("");
  const [category, setCategory] = useState(" ");
  const [organization, setOrganization] = useState(" ");
  const [sortBy, setSortBy] = useState("createdDate");
  const [order, setOrder] = useState("decreasing");
  const [showOption, setShowOption] = useState("feedbackMessage");

  const fetchOrganizationFeedbacks = async () => {
    try {
      const response = await axios.get(
        // `${BASE_API_URL}/guestUser/organizationFeedbacks/${organization}/${category}/${sortBy}/${order}`
        `http://localhost:5000/v1/api/guestUser/organizationFeedbacks/${organization}/${category}/${sortBy}/${order}`
      );
      setFeedbacks(response.data.feedbackData);

      console.log("Users Feedbacks Object: ", response.data);
      console.log("User Feedbacks: ", feedbacks);
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.");
    }
  };
  const fetchOrganizationsData = async () => {
    try {
      const response = await axios.get(
        // `${BASE_API_URL}/guestUser/getAllOrganizations`
        `http://localhost:5000/v1/api/guestUser/getAllOrganizations`
      );
      setOrgData(response.data.data);
      setErr("");
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchOrganizationFeedbacks();
        fetchOrganizationsData();
        setErr("");
      } catch (error) {
        setErr(error.response?.data?.message || "Something went wrong.");
      }
    };
    fetchData();
  }, [sortBy, order, category, organization]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(17,24,38,0.4)] rounded-4xl pt-21" // Light background
      onClick={closeModal}
    >
      <div
        className="relative bg-white pl-4 pr-4 pb-4 pt-0 rounded-lg shadow-lg w-[80%] h-[83vh] relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <div className="sticky top-0 bg-white left-0 w-full border-b border-gray-300 mb-4">
          <div className="flex justify-between items-center mb-3 pt-4">
            <h2 className="text-lg font-semibold text-gray-700">
              &nbsp;&nbsp;All Organizations Feedbacks
            </h2>
            {/* Right side container */}
            <div className="flex items-center gap-4 ">
              {/* First heading before*/}
              <h6 className="text-sm font-semibold text-gray-500">
                Total Feedbacks: {feedbacks.length}
              </h6>
              {/* <button
            onClick={closeModal}
            className="w-15 text-bold text-2xl text-red-500 hover:text-white hover:bg-red-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <i className="fas fa-times"></i>
          </button> */}
              <button
                onClick={closeModal}
                className="w-10 p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 ml-auto">
              {/* First Select Box */}
              <div className="flex flex-col">
                {/* <label className="text-sm font-medium text-gray-700 mb-2">
                Select Content
              </label> */}
                <div className="relative">
                  <select
                    name="Content"
                    className="border rounded-lg px-5 py-1 text-sm appearance-none w-36 pr-8"
                    value={showOption}
                    onChange={(e) =>
                      setShowOption(e.target.value || "feedbackMessage")
                    }
                  >
                    <option disabled>Content</option>
                    <option value="feedbackMessage">Feedback Messages</option>
                    <option value="recommend">Recommendations</option>
                    <option value="suggestions">Suggestions</option>
                  </select>
                </div>
              </div>
              {/* First Select Box */}
              <div className="flex flex-col">
                {/* <label className="text-sm font-medium text-gray-700 mb-2">
                Select Organization
              </label> */}
                <div className="relative overflow-visible">
                  <select
                    name="Organization"
                    className="relative border rounded-lg px-5 py-1 text-sm appearance-none w-36 pr-8"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value || "")}
                  >
                    <option disabled className="sticky top-0">Organization</option>
                    <option value="">All</option>
                    {orgData.map((org) => (
                      <option key={org._id} value={org.name}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* First Select Box */}
              <div className="flex flex-col">
                {/* <label className="text-sm font-medium text-gray-700 mb-2">
                Select Category
              </label> */}
                <div className="relative">
                  <select
                    className="border rounded-lg px-5 py-1 text-sm appearance-none w-36 pr-8"
                    value={category}
                    onChange={(e) => setCategory(e.target.value || "")}
                  >
                    <option disabled>Category</option>
                    <option value="">All</option>
                    <option value="Website UI">Website UI/UX</option>
                    <option value="Data Accuracy">Data Accuracy</option>
                    <option value="Trading Features">Trading Features</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Performance & Speed">
                      Performance & Speed
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* First Select Box */}
              <div className="flex flex-col">
                {/* <label className="text-sm font-medium text-gray-700 mb-2">
                SortBy
              </label> */}
                <div className="relative">
                  <select
                    name="sortBy"
                    className="border rounded-lg px-5 py-1 text-sm appearance-none w-36 pr-8"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value || "createdDate")}
                  >
                    <option disabled>SortBy</option>
                    <option value="createdDate">Recent Feedback</option>
                    <option value="rating">Ratings</option>
                  </select>
                </div>
              </div>

              {/* First Select Box */}
              <div className="flex flex-col">
                {/* <label className="text-sm font-medium text-gray-700 mb-2">
                Order
              </label> */}
                <div className="relative">
                  <select
                    name="Order"
                    className="border rounded-lg px-5 py-1 text-sm appearance-none w-36 pr-8"
                    value={order}
                    onChange={(e) => setOrder(e.target.value || "decreasing")}
                  >
                    <option disabled>Order</option>
                    <option value="decreasing">High</option>
                    <option value="increasing">Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {err && <p className="text-red-500">{err}</p>}

        {/* List of Feedbacks */}
        <div className="h-[57vh] flex flex-col px-4">
        <div className="flex-1 overflow-y-auto h-[calc(60vh-60px)]">
          {feedbacks.length > 0 ? (
            feedbacks.map((card, index) => {
              const organizationName = orgData.find(
                (org) => org._id === card.organizationId
              );
              console.log(
                "Get user data by stored userID refrence in Feedback modal",
                organizationName
              );

              return (
                <div
                  key={index}
                  className="w-full h-[100px] mb-0 bg-white p-6 decoration-3 border-b-2 border-gray-300 overflow-hidden"
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
                    {card[showOption] || "No content available"}
                  </p>
                  <h5 className="mt-4 text-right text-sm font-semibold text-gray-600">
                    -{" "}
                    {organizationName ? organizationName.name : "Organization"}
                  </h5>
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

          {/* Close Button */}
          <div className="sticky bottom-0 -pb-2 bg-white py-1 border-t border-gray-300 flex justify-end">
            <button
              onClick={closeModal}
              className="px-6 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-white transition mt-2 -mb-6"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationAllFeedsModal;
