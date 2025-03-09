// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { Star } from "lucide-react";

// const OrganizationFeedbackFormModal = ({ isOpen, onClose, onSubmit }) => {
//   const [feedbackCategory, setFeedbackCategory] = useState("");
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const [rating, setRating] = useState(0);
//   const [recommend, setRecommend] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       feedbackCategory,
//       feedbackMessage,
//       rating,
//       recommend,
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Add Feedback</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               value={feedbackCategory}
//               onChange={(e) => setFeedbackCategory(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Website UI/UX">Website UI/UX</option>
//               <option value="Trading Features">Trading Features</option>
//               <option value="Data Accuracy">Data Accuracy</option>
//               <option value="Performance & Speed">Performance & Speed</option>
//               <option value="Customer Support">Customer Support</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Message
//             </label>
//             <textarea
//               value={feedbackMessage}
//               onChange={(e) => setFeedbackMessage(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Rating
//             </label>
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={20}
//                   className={`cursor-pointer ${
//                     i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
//                   }`}
//                   onClick={() => setRating(i + 1)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Would you recommend us?
//             </label>
//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 className={`px-4 py-2 rounded-lg ${
//                   recommend
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//                 onClick={() => setRecommend(true)}
//               >
//                 Yes
//               </button>
//               <button
//                 type="button"
//                 className={`px-4 py-2 rounded-lg ${
//                   !recommend
//                     ? "bg-red-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//                 onClick={() => setRecommend(false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrganizationFeedbackFormModal;

// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { Star } from "lucide-react";

// const OrganizationFeedbackFormModal = ({ isOpen, onClose, onSubmit }) => {
//   const [feedbackCategory, setFeedbackCategory] = useState("");
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const [rating, setRating] = useState(0);
//   const [recommend, setRecommend] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       feedbackCategory,
//       feedbackMessage,
//       rating,
//       recommend,
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Add Feedback</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 value={feedbackCategory}
//                 onChange={(e) => setFeedbackCategory(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 <option value="Website UI/UX">Website UI/UX</option>
//                 <option value="Trading Features">Trading Features</option>
//                 <option value="Data Accuracy">Data Accuracy</option>
//                 <option value="Performance & Speed">Performance & Speed</option>
//                 <option value="Customer Support">Customer Support</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Rating
//               </label>
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     size={20}
//                     className={`cursor-pointer ${
//                       i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
//                     }`}
//                     onClick={() => setRating(i + 1)}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="mb-4 md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Message
//               </label>
//               <textarea
//                 value={feedbackMessage}
//                 onChange={(e) => setFeedbackMessage(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="4"
//                 required
//               />
//             </div>
//             <div className="mb-4 md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Would you recommend us?
//               </label>
//               <div className="flex space-x-4">
//                 <button
//                   type="button"
//                   className={`px-4 py-2 rounded-lg ${
//                     recommend
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                   onClick={() => setRecommend(true)}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   type="button"
//                   className={`px-4 py-2 rounded-lg ${
//                     !recommend
//                       ? "bg-red-500 text-white"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                   onClick={() => setRecommend(false)}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrganizationFeedbackFormModal;






// new one

// working --- 
// import React, { useState, useEffect } from "react";
// import { X, Star } from "lucide-react";
// import { toast } from "react-hot-toast";

// const OrganizationFeedbackFormModal = ({ isOpen, onClose, onSubmit, feedbackData }) => {
//   const [formData, setFormData] = useState({
//     feedbackCategory: "",
//     feedbackMessage: "",
//     rating: 0,
//     recommend: true,
//   });

//   useEffect(() => {
//     if (isOpen) {
//       if (feedbackData) {
//         setFormData({
//           feedbackCategory: feedbackData.feedbackCategory,
//           feedbackMessage: feedbackData.feedbackMessage,
//           rating: feedbackData.rating,
//           recommend: feedbackData.recommend,
//         });
//       } else {
//         setFormData({
//           feedbackCategory: "",
//           feedbackMessage: "",
//           rating: 0,
//           recommend: true,
//         });
//       }
//     }
//   }, [isOpen, feedbackData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRatingChange = (rating) => {
//     setFormData({ ...formData, rating });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.feedbackCategory || !formData.feedbackMessage || !formData.rating) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
//     onSubmit(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">{feedbackData ? "Edit Feedback" : "Add Feedback"}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 name="feedbackCategory"
//                 value={formData.feedbackCategory}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 <option value="Website UI/UX">Website UI/UX</option>
//                 <option value="Trading Features">Trading Features</option>
//                 <option value="Data Accuracy">Data Accuracy</option>
//                 <option value="Performance & Speed">Performance & Speed</option>
//                 <option value="Customer Support">Customer Support</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Rating
//               </label>
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     size={20}
//                     className={`cursor-pointer ${
//                       i < formData.rating ? "text-yellow-400 fill-current" : "text-gray-300"
//                     }`}
//                     onClick={() => handleRatingChange(i + 1)}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="mb-4 md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Message
//               </label>
//               <textarea
//                 name="feedbackMessage"
//                 value={formData.feedbackMessage}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="4"
//                 required
//               />
//             </div>
//             <div className="mb-4 md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Would you recommend us?
//               </label>
//               <div className="flex space-x-4">
//                 <button
//                   type="button"
//                   className={`px-4 py-2 rounded-lg ${
//                     formData.recommend
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                   onClick={() => setFormData({ ...formData, recommend: true })}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   type="button"
//                   className={`px-4 py-2 rounded-lg ${
//                     !formData.recommend
//                       ? "bg-red-500 text-white"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                   onClick={() => setFormData({ ...formData, recommend: false })}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
//             >
//               {feedbackData ? "Update" : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrganizationFeedbackFormModal;





import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "react-hot-toast";

const OrganizationFeedbackFormModal = ({ isOpen, onClose, onSubmit, feedbackData }) => {
  const [formData, setFormData] = useState({
    feedbackCategory: "",
    feedbackMessage: "",
    rating: 0,
    recommend: true,
  });

  useEffect(() => {
    if (isOpen) {
      if (feedbackData) {
        setFormData({
          feedbackCategory: feedbackData.feedbackCategory,
          feedbackMessage: feedbackData.feedbackMessage,
          rating: feedbackData.rating,
          recommend: feedbackData.recommend,
        });
      } else {
        setFormData({
          feedbackCategory: "",
          feedbackMessage: "",
          rating: 0,
          recommend: true,
        });
      }
    }
  }, [isOpen, feedbackData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.feedbackCategory || !formData.feedbackMessage || !formData.rating) {
      toast.error("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div style={{ width: "100%", maxWidth: "80%", height: "auto", maxHeight: "80vh" }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <i className="fas fa-comment-dots text-blue-600 mr-2 "></i> {feedbackData ? "Edit Feedback" : "Submit Feedback"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Category</label>
                <select
                  name="feedbackCategory"
                  value={formData.feedbackCategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className="cursor-pointer"
                      fill={star <= formData.rating ? "#FFD700" : "none"}
                      stroke={star <= formData.rating ? "#FFD700" : "gray"}
                      onClick={() => handleRatingChange(star)}
                    />
                  ))}
                </div>
              </div>

              {/* Feedback Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Message</label>
                <textarea
                  name="feedbackMessage"
                  value={formData.feedbackMessage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                ></textarea>
              </div>
            </div>

            {/* Recommendation */}
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">Would you recommend us?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="recommend" 
                    value="true" 
                    checked={formData.recommend === true} 
                    onChange={() => setFormData({ ...formData, recommend: true })} 
                    className="mr-1" 
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="recommend" 
                    value="false" 
                    checked={formData.recommend === false} 
                    onChange={() => setFormData({ ...formData, recommend: false })} 
                    className="mr-1" 
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 text-white" disabled={!formData.feedbackCategory || !formData.feedbackMessage || !formData.rating}>
                {feedbackData ? "Update Feedback" : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationFeedbackFormModal;