import React, { useState, useEffect } from "react";
import axios from "axios";

const UserAllFeedsModal = ({ closeModal }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [userData, setUserData] = useState([]);
  const [err, setErr] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdDate");
  const [order, setOrder] = useState("decreasing");
  const [showOption, setShowOption] = useState("feedbackMessage");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          category === ""
            ? `http://localhost:5000/v1/api/guestUser/userFeedback/${sortBy}/${order}`
            : `http://localhost:5000/v1/api/guestUser/userFeedback/${category}/${sortBy}/${order}`;

        const response1 = await axios.get(url);
        setFeedbacks(response1.data.feedbackData);

        console.log("Users Feedbacks Object: ", response1.data);
        console.log("User Feedbacks: ", response1.data.feedbackData);

        const response2 = await axios.get(
          "http://localhost:5000/v1/api/user/display-users"
        );
        setUserData(response2.data);
        console.log("User Data", response2.data);
      } catch (error) {
        setErr(error.response?.data?.message || "Something went wrong.");
      }
    };
    fetchData();
  }, [sortBy, order, category]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(17,24,38,0.4)] rounded-4xl pt-21" // Light background
      onClick={closeModal}
    >
      <div
        className="relative bg-white pl-4 pr-4 pb-4 pt-0 rounded-lg shadow-lg w-[70%] max-h-[85vh] relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
      <div className="sticky top-0 bg-white left-0 w-full decoration-3 border-b-2 border-gray-500 mb-6">
        <div className="flex justify-between items-center mb-5 pt-4">
          <h2 className="text-lg font-semibold text-[#1a2c47">
            All Users Feedbacks
          </h2>
          {/* Right side container */}
          <div className="flex items-center gap-4 ">
            {/* First heading before*/}
            <h6 className="text-[18] font-semibold text-gray-500">
              Total Feedbacks: {feedbacks.length}
            </h6>
            <button
            onClick={closeModal}
            className="w-15 text-bold text-2xl text-red-500 hover:text-white hover:bg-red-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <i className="fas fa-times"></i>
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
                <select name="Content"
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
                  <option value="Website UI/UX">Website UI/UX</option>
                  <option value="Data Accuracy">Data Accuracy</option>
                  <option value="Trading Features">Trading Features</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Performance & Speed">Performance & Speed</option>
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
                <select name="sortBy"
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
                <select name="Order"
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
        <div className="max-h-[60vh] overflow-y-auto px-4">
        {feedbacks.length > 0 ? (
          feedbacks.map((card, index) => {
            const user = userData.find((user) => user._id === card.userId);
            console.log(
              "Get user data by stored userID refrence in Feedback modal",
              user
            );

            return (
              <div
                key={index}
                className="w-[850px] h-[100px] mb-2 bg-white p-6 decoration-3 border-b-2 border-gray-300 overflow-hidden"
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
                  <span className="font-semibold">{card.feedbackCategory}: </span>
                  {card[showOption] || "No content available"}
                </p>
                <h5 className="mt-4 text-right text-sm font-semibold text-gray-600">
                  - {user ? user.name : "Anonymous"}
                </h5>
              </div>
            );
          })
        ) : (
          <div>
            <font color="red">
              <b>Loading...</b>
              <h4>No content available</h4>
            </font>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="px-6 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-3 mb-5 sticky bottom-0 bg-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
    </div>
  );
};

export default UserAllFeedsModal;
