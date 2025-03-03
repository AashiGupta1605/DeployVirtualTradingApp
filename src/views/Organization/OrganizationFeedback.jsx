import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizationFeedback,
  registerOrganizationFeedback,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
  setStartDate,
  setEndDate,
  clearFilters,
  deleteOrganizationFeedback
} from "../../redux/Organization/feedbacks/organizationUsersFeedbackSlice";
import Pagination from "../../components/Organization/Pagination";
import OrganizationFeedbackTable from "../../components/Organization/OrganizationFeedbackTable";
import OrganizationFeedbacksModal from "./auth/OrganizationFeedbacksModal";
import Loader from "../../components/Common/Loader";
import { Filter, X, SearchIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrganizationUsersFeedbackDashboard from "./OrganizationUsersFeedbackDashboard";
import toast from "react-hot-toast";
const OrganizationFeedback = () => {
  const dispatch = useDispatch();
  const { feedbacks, loading, currentPage, totalPages, itemsPerPage, searchTerm, startDate, endDate } =
    useSelector((state) => state.organization.feedbacks);

  const [isAddFeedbackModalOpen, setAddFeedbackModalOpen] = useState(false);
  const orgName = localStorage.getItem("orgName");

  useEffect(() => {
    dispatch(
      fetchOrganizationFeedback({
        orgName,
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        startDate,
        endDate,
      })
    );
  }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate]);

  const handleAddFeedback = (feedbackData) => {
    dispatch(registerOrganizationFeedback({ ...feedbackData, orgName }));


    
  // Handle delete feedback


  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await dispatch(deleteOrganizationFeedback(feedbackId)).unwrap();
      toast.success("Feedback deleted successfully");
    } catch (error) {
      console.error("Failed to delete feedback:", error);
      toast.error("Failed to delete feedback");
    }
  };

  return (
    <div className="relative">
        <OrganizationUsersFeedbackDashboard/>
      <div className="mx-auto w-[90%]">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg -mt-12">
          {/* Header with Search and Filters */}
          <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b z-20">
            <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
              <Filter className="mr-2 text-gray-600" size={20} />
              Manage Feedbacks
            </h2>
            <button
              onClick={() => setAddFeedbackModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Feedback
            </button>
          </div>

          {/* Feedback Table and Pagination */}
          {loading ? (
            <Loader />
          ) : (
            <div className="pt-16 -mt-14">
              <OrganizationFeedbackTable feedbacks={feedbacks}   onDelete={handleDeleteFeedback} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => dispatch(setCurrentPage(page))}
                onItemsPerPageChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
              />
            </div>
          )}
        </div>
      </div>

      {/* Add Feedback Modal */}
      <OrganizationFeedbacksModal
        isOpen={isAddFeedbackModalOpen}
        onClose={() => setAddFeedbackModalOpen(false)}
        onSubmit={handleAddFeedback}
      />
    </div>
  );
};

export default OrganizationFeedback;




// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrganizationFeedback,
//   registerOrganizationFeedback,
//   deleteOrganizationFeedback,
//   setCurrentPage,
//   setItemsPerPage,
//   setSearchTerm,
//   setStartDate,
//   setEndDate,
//   clearFilters,
// } from "../../redux/Organization/feedbacks/organizationUsersFeedbackSlice";
// import Pagination from "../../components/Organization/Pagination";
// import OrganizationFeedbackTable from "../../components/Organization/OrganizationFeedbackTable";
// import OrganizationFeedbacksModal from "./auth/OrganizationFeedbacksModal";
// import Loader from "../../components/Common/Loader";
// import { Filter, X, SearchIcon } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import toast from "react-hot-toast";

// const OrganizationFeedback = () => {
//   const dispatch = useDispatch();
//   const {
//     feedbacks,
//     loading,
//     currentPage,
//     totalPages,
//     itemsPerPage,
//     searchTerm,
//     startDate,
//     endDate,
//   } = useSelector((state) => state.organization.feedbacks);

//   const [isAddFeedbackModalOpen, setAddFeedbackModalOpen] = useState(false);
//   const [localStartDate, setLocalStartDate] = useState(startDate ? new Date(startDate) : null);
//   const [localEndDate, setLocalEndDate] = useState(endDate ? new Date(endDate) : null);
//   const orgName = localStorage.getItem("orgName");

//   // Fetch feedbacks when filters or pagination change
//   useEffect(() => {
//     dispatch(
//       fetchOrganizationFeedback({
//         orgName,
//         page: currentPage,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate,
//         endDate,
//       })
//     );
//   }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate]);

//   // Handle add feedback
//   const handleAddFeedback = async (feedbackData) => {
//     try {
//       await dispatch(registerOrganizationFeedback({ ...feedbackData, orgName })).unwrap();
//       toast.success("Feedback submitted successfully");
//     } catch (error) {
//       console.error("Failed to submit feedback:", error);
//       toast.error("Failed to submit feedback");
//     }
//   };

//   // Handle delete feedback
//   const handleDeleteFeedback = async (feedbackId) => {
//     try {
//       await dispatch(deleteOrganizationFeedback(feedbackId)).unwrap();
//       toast.success("Feedback deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete feedback:", error);
//       toast.error("Failed to delete feedback");
//     }
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     dispatch(setCurrentPage(page));
//   };

//   // Handle items per page change
//   const handleItemsPerPageChange = (event) => {
//     dispatch(setItemsPerPage(Number(event.target.value)));
//     dispatch(setCurrentPage(1));
//   };

//   // Handle search term change
//   const handleSearchChange = (event) => {
//     dispatch(setSearchTerm(event.target.value));
//     dispatch(setCurrentPage(1));
//   };

//   // Handle start date change
//   const handleStartDateChange = (date) => {
//     setLocalStartDate(date);
//   };

//   // Handle end date change
//   const handleEndDateChange = (date) => {
//     setLocalEndDate(date);
//   };

//   // Clear filters
//   const clearAllFilters = () => {
//     setLocalStartDate(null);
//     setLocalEndDate(null);
//     dispatch(clearFilters());
//     dispatch(setCurrentPage(1));
//   };

//   // Handle apply filters
//   const handleApplyFilters = () => {
//     dispatch(setStartDate(localStartDate));
//     dispatch(setEndDate(localEndDate));
//     dispatch(setCurrentPage(1));
//   };

//   return (
//     <div className="relative">
//       <div className="mx-auto w-[95%]">
//         <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg -mt-12">
//           {/* Header with Search and Filters */}
//           <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b z-20">
//             <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
//               <Filter className="mr-2 text-gray-600" size={20} />
//               Manage Feedbacks
//             </h2>

//             <div className="flex items-center space-x-4">
//               {/* Filter Button */}
//               <div>
//                 <button
//                   onClick={() => setAddFeedbackModalOpen(true)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   Add Feedback
//                 </button>
//               </div>

//               {/* Search Bar */}
//               <div className="flex-grow max-w-xl">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <SearchIcon size={16} className="text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lightBlue-500 focus:border-lightBlue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm transition duration-150 ease-in-out"
//                   />
//                   {searchTerm && (
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                       <button
//                         onClick={() => dispatch(setSearchTerm(""))}
//                         className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-150"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Filter Panel */}
//           {isAddFeedbackModalOpen && (
//             <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6 z-50">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Date Range Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date Range
//                   </label>
//                   <div className="flex space-x-2">
//                     <DatePicker
//                       selected={localStartDate}
//                       onChange={handleStartDateChange}
//                       selectsStart
//                       startDate={localStartDate}
//                       endDate={localEndDate}
//                       placeholderText="Start Date"
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
//                     />
//                     <DatePicker
//                       selected={localEndDate}
//                       onChange={handleEndDateChange}
//                       selectsEnd
//                       startDate={localStartDate}
//                       endDate={localEndDate}
//                       minDate={localStartDate}
//                       placeholderText="End Date"
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
//                     />
//                   </div>
//                 </div>

//                 {/* Apply and Clear Buttons */}
//                 <div className="flex justify-end items-end gap-4">
//                   <button
//                     onClick={handleApplyFilters}
//                     className="px-4 py-2 rounded-lg bg-lightBlue-600 text-white hover:bg-lightBlue-700 text-sm md:text-base"
//                   >
//                     Apply Filters
//                   </button>
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm md:text-base"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Feedback Table and Pagination */}
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="pt-16 -mt-14">
//               <OrganizationFeedbackTable
//                 feedbacks={feedbacks}
//                 onDelete={handleDeleteFeedback}
//               />
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={handlePageChange}
//                 onItemsPerPageChange={handleItemsPerPageChange}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add Feedback Modal */}
//       <OrganizationFeedbacksModal
//         isOpen={isAddFeedbackModalOpen}
//         onClose={() => setAddFeedbackModalOpen(false)}
//         onSubmit={handleAddFeedback}
//       />
//     </div>
//   );
// };

// export default OrganizationFeedback;