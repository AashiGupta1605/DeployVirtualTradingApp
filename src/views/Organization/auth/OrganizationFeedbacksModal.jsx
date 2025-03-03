// import React, { useState } from "react";
// import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

// const OrganizationFeedbacksModal = ({ isOpen, onClose, onSubmit }) => {
//   const [feedbackCategory, setFeedbackCategory] = useState("");
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const [rating, setRating] = useState(0);
//   const [recommend, setRecommend] = useState(true);
//   const [suggestions, setSuggestions] = useState("");

//   const handleSubmit = () => {
//     onSubmit({ feedbackCategory, feedbackMessage, rating, recommend, suggestions });
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Add Feedback</h2>
//         <div className="space-y-4">
//           <select
//             value={feedbackCategory}
//             onChange={(e) => setFeedbackCategory(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="">Select Category</option>
//             <option value="Website UI/UX">Website UI/UX</option>
//             <option value="Trading Features">Trading Features</option>
//             <option value="Data Accuracy">Data Accuracy</option>
//             <option value="Performance & Speed">Performance & Speed</option>
//             <option value="Customer Support">Customer Support</option>
//             <option value="Other">Other</option>
//           </select>
//           <textarea
//             value={feedbackMessage}
//             onChange={(e) => setFeedbackMessage(e.target.value)}
//             placeholder="Enter your feedback"
//             className="w-full p-2 border rounded-lg"
//             rows={4}
//           />
//           <textarea
//             value={suggestions}
//             onChange={(e) => setSuggestions(e.target.value)}
//             placeholder="Enter suggestions (optional)"
//             className="w-full p-2 border rounded-lg"
//             rows={2}
//           />
//           <div className="flex items-center space-x-2">
//             <span>Rating:</span>
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={`cursor-pointer ${
//                   i < rating ? "text-yellow-400" : "text-gray-300"
//                 }`}
//                 onClick={() => setRating(i + 1)}
//               />
//             ))}
//           </div>
//           <div className="flex items-center space-x-2">
//             <span>Recommend:</span>
//             <button
//               onClick={() => setRecommend(true)}
//               className={`p-2 rounded-lg ${
//                 recommend ? "bg-green-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               <ThumbsUp size={16} />
//             </button>
//             <button
//               onClick={() => setRecommend(false)}
//               className={`p-2 rounded-lg ${
//                 !recommend ? "bg-red-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               <ThumbsDown size={16} />
//             </button>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded-lg hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationFeedbacksModal;





// update modal same as register

import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

const OrganizationFeedbacksModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [suggestions, setSuggestions] = useState("");

  const handleSubmit = () => {
    onSubmit({ feedbackCategory, feedbackMessage, rating, recommend, suggestions });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

      {/* Modal container */}
      <div
        style={{ width: "100%", maxWidth: "90%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-comment-alt text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Add Feedback</h2>
          </div>
          {/* Close button */}
          <button
            onClick={() => {
              onClose();
            }}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="space-y-6">
            {/* Feedback Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Select Category</option>
                <option value="Website UI/UX">Website UI/UX</option>
                <option value="Trading Features">Trading Features</option>
                <option value="Data Accuracy">Data Accuracy</option>
                <option value="Performance & Speed">Performance & Speed</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Feedback Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Message</label>
              <textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Enter your feedback"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                rows={4}
              />
            </div>

            {/* Suggestions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Suggestions</label>
              <textarea
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Enter suggestions (optional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                rows={2}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`cursor-pointer ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
            </div>

            {/* Recommend */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recommend</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setRecommend(true)}
                  className={`px-4 py-2 rounded-lg ${
                    recommend ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <ThumbsUp size={16} />
                </button>
                <button
                  onClick={() => setRecommend(false)}
                  className={`px-4 py-2 rounded-lg ${
                    !recommend ? "bg-red-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <ThumbsDown size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Form actions */}
          <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationFeedbacksModal;