// import React from "react";
// import { Trash2 } from "lucide-react";

// const  OrgUserFeedbackTable = ({ feedbacks, onDelete }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-x-auto">
//     <table className="w-full">
//       <thead className="bg-gray-50 border-b">
//         <tr>
//           {["User Name", "Email", "Mobile", "Category", "Message", "Rating", "Recommend", "Actions"].map((header) => (
//             <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {feedbacks.map((feedback) => (
//           <tr key={feedback._id}>
//             <td className="px-6 py-4">{feedback.userId?.name || "N/A"}</td>
//             <td className="px-6 py-4">{feedback.userId?.email || "N/A"}</td>
//             <td className="px-6 py-4">{feedback.userId?.mobile || "N/A"}</td>
//             <td className="px-6 py-4">{feedback.feedbackCategory}</td>
//             <td className="px-6 py-4">{feedback.feedbackMessage}</td>
//             <td className="px-6 py-4">{feedback.rating}</td>
//             <td className="px-6 py-4">{feedback.recommend ? "Yes" : "No"}</td>
//             <td className="px-6 py-4">
//               <button
//                 onClick={() => onDelete(feedback)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   );
// };

// export default OrgUserFeedbackTable;

// working
// import React from "react";
// import { Trash2 } from "lucide-react";

// const OrgUserFeedbackTable = ({ feedbacks, onDelete }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-50 border-b">
//           <tr>
//             {["User Name", "Email", "Mobile", "Category", "Message", "Rating", "Recommend", "Actions"].map((header) => (
//               <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {feedbacks.map((feedback) => (
//             <tr key={feedback._id}>
//               <td className="px-6 py-4">{feedback.userId?.name || "N/A"}</td>
//               <td className="px-6 py-4">{feedback.userId?.email || "N/A"}</td>
//               <td className="px-6 py-4">{feedback.userId?.mobile || "N/A"}</td>
//               <td className="px-6 py-4">{feedback.feedbackCategory}</td>
//               <td className="px-6 py-4">{feedback.feedbackMessage}</td>
//               <td className="px-6 py-4">{feedback.rating}</td>
//               <td className="px-6 py-4">{feedback.recommend ? "Yes" : "No"}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => onDelete(feedback._id)} // Pass only the feedback ID
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrgUserFeedbackTable;

// import React from "react";
// import { Trash2, Star, ThumbsUp, ThumbsDown } from "lucide-react";

// const OrgUserFeedbackTable = ({ feedbacks, onDelete }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {["User Name", "Email", "Mobile", "Category", "Message", "Rating", "Recommend", "Actions"].map((header) => (
//                 <th
//                   key={header}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {feedbacks.map((feedback) => (
//               <tr key={feedback._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {feedback.userId?.name || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {feedback.userId?.email || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {feedback.userId?.mobile || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                     {feedback.feedbackCategory}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-500">
//                   {feedback.feedbackMessage}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={16}
//                         className={i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
//                       />
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center">
//                   {feedback.recommend ? (
//                     <ThumbsUp className="text-green-500 inline" size={20} />
//                   ) : (
//                     <ThumbsDown className="text-red-500 inline" size={20} />
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button
//                     onClick={() => onDelete(feedback._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrgUserFeedbackTable;

// add status:

// import React, { useState, useEffect } from "react";
// import { Trash2, Star, ThumbsUp, ThumbsDown } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import Tooltip from "../../../Common/Tooltip"; // Adjust the import path as necessary
// import {
//   deleteOrganizationFeedback,
//   updateUserFeedbackStatus,
// } from "../../../../redux/Organization/feedbacks/organizationUsersFeedbackSlice";
// import ConfirmationModal from "../../Modals/ConfirmationModal";

// const CATEGORY_COLORS = {
//   "Website UI/UX": "bg-blue-100 text-blue-800",
//   "Trading Features": "bg-green-100 text-green-800",
//   "Data Accuracy": "bg-purple-100 text-purple-800",
//   "Performance & Speed": "bg-yellow-100 text-yellow-800",
//   "Customer Support": "bg-orange-100 text-orange-800",
//   Other: "bg-gray-100 text-gray-800",
// };

// // Toggle Switch Component
// const ToggleSwitch = ({ isOn, onToggle, disabled }) => (
//   <label className="relative inline-flex items-center cursor-pointer">
//     <input
//       type="checkbox"
//       className="sr-only"
//       checked={isOn}
//       onChange={onToggle}
//       disabled={disabled}
//     />
//     <div
//       className={`
//         relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
//         ${isOn ? "bg-green-500" : "bg-red-500"}
//         ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
//       `}
//     >
//       <div
//         className={`
//           absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out
//           ${isOn ? "translate-x-5" : "translate-x-0"}
//         `}
//       />
//     </div>
//   </label>
// );

// // Status Badge Component
// const StatusBadge = ({ status }) => (
//   <span
//     className={`
//       px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
//       ${
//         status === "approved"
//           ? "bg-green-100 text-green-800"
//           : "bg-red-100 text-red-800"
//       }
//     `}
//   >
//     {status === "approved" ? "Approved" : "Rejected"}
//   </span>
// );

// const OrgUserFeedbackTable = ({ feedbacks, onDelete }) => {
//   const dispatch = useDispatch();
//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [feedbackToDelete, setFeedbackToDelete] = useState(null);
//   const [toggleStates, setToggleStates] = useState({});

//   // Initialize toggle states
//   useEffect(() => {
//     const initialToggleStates = feedbacks.reduce(
//       (acc, feedback) => ({
//         ...acc,
//         [feedback._id]: feedback.status === "approved",
//       }),
//       {}
//     );
//     setToggleStates(initialToggleStates);
//   }, [feedbacks]);

//   // Handle status toggle
//   // const handleStatusToggle = async (id) => {
//   //   try {
//   //     const newStatus = toggleStates[id] ? "rejected" : "approved";
//   //     const loadingToast = toast.loading("Updating status...");

//   //     // Update local state immediately for better UX
//   //     setToggleStates((prev) => ({
//   //       ...prev,
//   //       [id]: !prev[id],
//   //     }));

//   //     await dispatch(updateFeedbackStatus({ id, status: newStatus })).unwrap();
//   //     toast.success(`Status updated to ${newStatus}`, { id: loadingToast });
//   //   } catch (error) {
//   //     // Revert toggle state on error
//   //     setToggleStates((prev) => ({
//   //       ...prev,
//   //       [id]: !prev[id],
//   //     }));
//   //     toast.error(error.message || "Failed to update status");
//   //   }
//   // };

//   const handleStatusToggle = async (id) => {
//     try {
//       const newStatus = toggleStates[id] ? "rejected" : "approved";
//       const loadingToast = toast.loading("Updating status...");

//       setToggleStates((prev) => ({
//         ...prev,
//         [id]: !prev[id],
//       }));

//       await dispatch(updateFeedbackStatus({ id, status: newStatus })).unwrap();
//       toast.success(`Status updated to ${newStatus}`, { id: loadingToast });
//     } catch (error) {
//       setToggleStates((prev) => ({
//         ...prev,
//         [id]: !prev[id],
//       }));
//       toast.error(error.payload?.msg || "Failed to update status");
//     }
//   };

//   // Handle delete feedback
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteOrganizationFeedback(id)).unwrap();
//       toast.success("Feedback deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete feedback:", error);
//     } finally {
//       setConfirmationModalOpen(false);
//     }
//   };

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {[
//                   "User Name",
//                   "Email",
//                   "Mobile",
//                   "Category",
//                   "Message",
//                   "Rating",
//                   "Recommend",
//                   "Date",
//                   "Status",
//                   "Actions",
//                 ].map((header) => (
//                   <th
//                     key={header}
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {feedbacks.map((feedback) => (
//                 <tr
//                   key={feedback._id}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {feedback.userId?.name || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {feedback.userId?.email || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {feedback.userId?.mobile || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         CATEGORY_COLORS[feedback.feedbackCategory]
//                       }`}
//                     >
//                       {feedback.feedbackCategory}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {feedback.feedbackMessage}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={16}
//                           className={
//                             i < feedback.rating
//                               ? "text-yellow-400 fill-current"
//                               : "text-gray-300"
//                           }
//                         />
//                       ))}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     {feedback.recommend ? (
//                       <ThumbsUp className="text-green-500 inline" size={20} />
//                     ) : (
//                       <ThumbsDown className="text-red-500 inline" size={20} />
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(feedback.createdDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <StatusBadge status={feedback.status} />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-4">
//                       <ToggleSwitch
//                         isOn={toggleStates[feedback._id]}
//                         onToggle={() => handleStatusToggle(feedback._id)}
//                         disabled={false}
//                       />
//                       {/* <button
//                         onClick={() => {
//                           setFeedbackToDelete(feedback._id);
//                           setConfirmationModalOpen(true);
//                         }}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash2 size={18} />
//                       </button> */}
//                        <Tooltip title="Delete Feedback" isVisible={true}>
//                         <button
//                           onClick={() => {
//                             setFeedbackToDelete(feedback._id);
//                             setConfirmationModalOpen(true);
//                           }}
//                           className="text-red-500 hover:text-red-700 overflow-hidden"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </Tooltip>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Confirmation Modal for Delete */}
//       <ConfirmationModal
//         isOpen={isConfirmationModalOpen}
//         onClose={() => setConfirmationModalOpen(false)}
//         onConfirm={() => handleDelete(feedbackToDelete)}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this feedback?"
//       />
//     </>
//   );
// };

// export default OrgUserFeedbackTable;






// new one ----

import React, { useState, useEffect } from "react";
import { Trash2, Edit3, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Tooltip from "../../../Common/Tooltip";
import {
  deleteOrganizationUsersFeedback,
  updateOrganizationUsersFeedbackStatus,
} from "../../../../redux/Organization/feedbacks/organizationFeedbackSlice"; //organization user slcie
import ConfirmationModal from "../../Modals/ConfirmationModal";

const CATEGORY_COLORS = {
  "Website UI/UX": "bg-blue-100 text-blue-800",
  "Trading Features": "bg-green-100 text-green-800",
  "Data Accuracy": "bg-purple-100 text-purple-800",
  "Performance & Speed": "bg-yellow-100 text-yellow-800",
  "Customer Support": "bg-orange-100 text-orange-800",
  Other: "bg-gray-100 text-gray-800",
};

// Toggle Switch Component
const ToggleSwitch = ({ isOn, onToggle, disabled }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only"
      checked={isOn}
      onChange={onToggle}
      disabled={disabled}
    />
    <div
      className={`
        relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
        ${isOn ? "bg-green-500" : "bg-red-500"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <div
        className={`
          absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out
          ${isOn ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </div>
  </label>
);

// Status Badge Component
const StatusBadge = ({ status }) => (
  <span
    className={`
      px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
      ${
        status === "approved"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }
    `}
  >
    {status === "approved" ? "Approved" : "Rejected"}
  </span>
);

const OrgUserFeedbackTable = ({ feedbacks, onDelete, onEdit }) => {
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [toggleStates, setToggleStates] = useState({});

  useEffect(() => {
    const initialToggleStates = feedbacks.reduce(
      (acc, feedback) => ({
        ...acc,
        [feedback._id]: feedback.status === "approved",
      }),
      {}
    );
    setToggleStates(initialToggleStates);
  }, [feedbacks]);

  const handleStatusToggle = async (id) => {
    try {
      const newStatus = toggleStates[id] ? "rejected" : "approved";
      const loadingToast = toast.loading("Updating status...");

      setToggleStates((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      await dispatch(updateOrganizationUsersFeedbackStatus({ id, status: newStatus })).unwrap();
      toast.success(`Status updated to ${newStatus}`, { id: loadingToast });
    } catch (error) {
      setToggleStates((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
      toast.error(error.payload?.msg || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrganizationUsersFeedback(id)).unwrap();
      toast.success("Feedback deleted successfully");
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "User Name",
                  "Email",
                  "Mobile",
                  "Category",
                  "Message",
                  "Rating",
                  "Recommend",
                  "Date",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr
                  key={feedback._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {feedback.userId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.userId?.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.userId?.mobile || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        CATEGORY_COLORS[feedback.feedbackCategory]
                      }`}
                    >
                      {feedback.feedbackCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {feedback.feedbackMessage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < feedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {feedback.recommend ? (
                      <ThumbsUp className="text-green-500 inline" size={20} />
                    ) : (
                      <ThumbsDown className="text-red-500 inline" size={20} />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(feedback.createdDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={feedback.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <ToggleSwitch
                        isOn={toggleStates[feedback._id]}
                        onToggle={() => handleStatusToggle(feedback._id)}
                        disabled={false}
                      />
                      <Tooltip title="Edit Feedback" isVisible={true}>
                        <button
                          onClick={() => onEdit(feedback)}
                          className="text-blue-500 hover:text-blue-700 overflow-hidden"
                        >
                          <Edit3 size={18} />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete Feedback" isVisible={true}>
                        <button
                          onClick={() => {
                            setFeedbackToDelete(feedback._id);
                            setConfirmationModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 overflow-hidden"
                        >
                          <Trash2 size={18} />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={() => handleDelete(feedbackToDelete)}
        title="Confirm Delete"
        message="Are you sure you want to delete this feedback?"
      />
    </>
  );
};

export default OrgUserFeedbackTable;