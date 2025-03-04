// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrganizationFeedbacks,
//   deleteOrganizationFeedback,
//   setCurrentPage,
//   setItemsPerPage,
//   setSearchTerm,
//   setStartDate,
//   setEndDate,
//   clearFilters,
// } from "../../redux/Organization/feedbacks/organizationUsersFeedbackSlice";
// import Pagination from "../../components/Organization/Pagination";
// import FilterComponent from "../../components/Organization/FilterComponent";
// import OrgUserFeedbackTable from "../../components/Organization/OrgUserFeedbackTable";
// import ConfirmationModal from "../../components/Organization/ConfirmationModal";
// import Loader from "../../components/Common/Loader";
// import { Filter, X, SearchIcon } from "lucide-react";
// import OrganizationUsersFeedbackDashboard from "./OrganizationUsersFeedbackDashboard";
// import { getAppliedFiltersCount, getAppliedFiltersText } from "../../utils/filterFunctions";

// const OrganizationUsersFeedbacks = () => {
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

//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [feedbackToDelete, setFeedbackToDelete] = useState(null);
//   const [isFilterOpen, setFilterOpen] = useState(false);
//   const orgName = localStorage.getItem("orgName");

//   // Fetch feedbacks when filters or pagination change
//   useEffect(() => {
//     dispatch(
//       fetchOrganizationFeedbacks({
//         orgName,
//         page: currentPage,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate,
//         endDate,
//       })
//     );
//   }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate]);

//   // Handle delete feedback
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteOrganizationFeedback(id)).unwrap();
//     } catch (error) {
//       console.error("Failed to delete feedback:", error);
//     } finally {
//       setConfirmationModalOpen(false);
//     }
//   };

//   // Handle delete confirmation
//   const handleDeleteClick = (feedbackId) => {
//     setFeedbackToDelete(feedbackId);
//     setConfirmationModalOpen(true);
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
//     if (date instanceof Date && !isNaN(date)) {
//       dispatch(setStartDate(date.toISOString()));
//     } else {
//       dispatch(setStartDate(null));
//     }
//   };

//   // Handle end date change
//   const handleEndDateChange = (date) => {
//     if (date instanceof Date && !isNaN(date)) {
//       dispatch(setEndDate(date.toISOString()));
//     } else {
//       dispatch(setEndDate(null));
//     }
//   };

//   // Clear filters
//   const clearAllFilters = () => {
//     dispatch(clearFilters());
//     dispatch(setCurrentPage(1));
//   };

//   // Handle apply filters
//   const handleApplyFilters = () => {
//     dispatch(setCurrentPage(1));
//     dispatch(
//       fetchOrganizationFeedbacks({
//         orgName,
//         page: 1,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate: startDate ? new Date(startDate).toISOString() : null,
//         endDate: endDate ? new Date(endDate).toISOString() : null,
//       })
//     );
//   };

//   // Get applied filters count
//   const appliedFiltersCount = getAppliedFiltersCount({ startDate, endDate });

//   // Get applied filters text
//   const appliedFiltersText = getAppliedFiltersText({ startDate, endDate });

//   return (
//     <div className="relative">
//       <OrganizationUsersFeedbackDashboard type="feedback-list" />
//       <div className="mx-auto w-[95%]">
//         <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-50">
//           {/* Header with Search and Filters */}
//           <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b z-30">
//             <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
//               <Filter className="mr-2 text-gray-600" size={20} />
//               Manage Feedbacks
//             </h2>

//             <div className="flex items-center space-x-4">
//               {/* Filter Button */}
//               <div>
//                 <button
//                   onClick={() => setFilterOpen(!isFilterOpen)}
//                   className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mr-4"
//                 >
//                   <Filter size={16} />
//                   {appliedFiltersCount > 0 && (
//                     <span className="ml-2 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
//                       {appliedFiltersCount}
//                     </span>
//                   )}
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
//           {isFilterOpen && (
//             <FilterComponent
//               isFilterOpen={isFilterOpen}
//               setFilterOpen={setFilterOpen}
//               startDate={startDate}
//               onStartDateChange={handleStartDateChange}
//               endDate={endDate}
//               onEndDateChange={handleEndDateChange}
//               onClearFilters={clearAllFilters}
//               onApplyFilters={handleApplyFilters}
//             />
//           )}

//           {/* Active Filters Display */}
//           {appliedFiltersCount > 0 && (
//             <div className="bg-gray-50 px-6 py-2 mt-2 rounded-lg flex items-center justify-between z-50">
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">Active Filters:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {appliedFiltersText && (
//                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                       {appliedFiltersText}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <button
//                 onClick={clearAllFilters}
//                 className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
//               >
//                 <X size={14} className="mr-1" />
//                 Clear All
//               </button>
//             </div>
//           )}

//           {/* Feedback Table and Pagination */}
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="pt-16 -mt-14 z-20">
//               <OrgUserFeedbackTable
//                 feedbacks={feedbacks}
//                 onDelete={handleDeleteClick}
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

//           {/* Confirmation Modal for Delete */}
//           <ConfirmationModal
//             isOpen={isConfirmationModalOpen}
//             onClose={() => setConfirmationModalOpen(false)}
//             onConfirm={() => handleDelete(feedbackToDelete._id)}
//             message={`Are you sure you want to delete feedback from ${feedbackToDelete?.userId}?`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationUsersFeedbacks;




// working --
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrganizationFeedbacks,
//   deleteOrganizationFeedback,
//   setCurrentPage,
//   setItemsPerPage,
//   setSearchTerm,
//   setStartDate,
//   setEndDate,
//   clearFilters,
// } from "../../redux/Organization/feedbacks/organizationUsersFeedbackSlice";
// import Pagination from "../../components/Organization/Pagination";
// import FilterComponent from "../../components/Organization/FilterComponent";
// import OrgUserFeedbackTable from "../../components/Organization/OrgUserFeedbackTable";
// import ConfirmationModal from "../../components/Organization/ConfirmationModal";
// import Loader from "../../components/Common/Loader";
// import { Filter, X, SearchIcon } from "lucide-react";
// import OrganizationUsersFeedbackDashboard from "./OrganizationUsersFeedbackDashboard";
// import { getAppliedFiltersCount, getAppliedFiltersText } from "../../utils/filterFunctions";
// import toast from "react-hot-toast";

// const OrganizationUsersFeedbacks = () => {
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

//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [feedbackToDelete, setFeedbackToDelete] = useState(null);
//   const [isFilterOpen, setFilterOpen] = useState(false);
//   const orgName = localStorage.getItem("orgName");

//   // Fetch feedbacks when filters or pagination change
//   useEffect(() => {
//     dispatch(
//       fetchOrganizationFeedbacks({
//         orgName,
//         page: currentPage,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate,
//         endDate,
//       })
//     );
//   }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate]);

//   // Handle delete feedback
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteOrganizationFeedback(id)).unwrap();
//       toast.success("feedback deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete feedback:", error);
//     } finally {
//       setConfirmationModalOpen(false);
//     }
//   };

//   // Handle delete confirmation
//   const handleDeleteClick = (feedbackId) => {
//     setFeedbackToDelete(feedbackId); // Set the feedback ID to delete
//     setConfirmationModalOpen(true);
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
//     if (date instanceof Date && !isNaN(date)) {
//       dispatch(setStartDate(date.toISOString()));
//     } else {
//       dispatch(setStartDate(null));
//     }
//   };

//   // Handle end date change
//   const handleEndDateChange = (date) => {
//     if (date instanceof Date && !isNaN(date)) {
//       dispatch(setEndDate(date.toISOString()));
//     } else {
//       dispatch(setEndDate(null));
//     }
//   };

//   // Clear filters
//   const clearAllFilters = () => {
//     dispatch(clearFilters());
//     dispatch(setCurrentPage(1));
//   };

//   // Handle apply filters
//   const handleApplyFilters = () => {
//     dispatch(setCurrentPage(1));
//     dispatch(
//       fetchOrganizationFeedbacks({
//         orgName,
//         page: 1,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate: startDate ? new Date(startDate).toISOString() : null,
//         endDate: endDate ? new Date(endDate).toISOString() : null,
//       })
//     );
//   };

//   // Get applied filters count
//   const appliedFiltersCount = getAppliedFiltersCount({ startDate, endDate });

//   // Get applied filters text
//   const appliedFiltersText = getAppliedFiltersText({ startDate, endDate });

//   // Find the feedback to delete
//   const feedbackToDeleteDetails = feedbacks.find(
//     (feedback) => feedback._id === feedbackToDelete
//   );

//   return (
//     <div className="relative">
//       <OrganizationUsersFeedbackDashboard type="feedback-list" />
//       <div className="mx-auto w-[95%]">
//         <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-50 -mt-12">
//           {/* Header with Search and Filters */}
//           <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b z-50">
//             <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
//               <Filter className="mr-2 text-gray-600" size={20} />
//               Manage Feedbacks
//             </h2>

//             <div className="flex items-center space-x-4">
//               {/* Filter Button */}
//               <div>
//                 <button
//                   onClick={() => setFilterOpen(!isFilterOpen)}
//                   className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mr-4"
//                 >
//                   <Filter size={16} />
//                   {appliedFiltersCount > 0 && (
//                     <span className="ml-2 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
//                       {appliedFiltersCount}
//                     </span>
//                   )}
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
//           {isFilterOpen && (
//             <FilterComponent
//               isFilterOpen={isFilterOpen}
//               setFilterOpen={setFilterOpen}
//               startDate={startDate}
//               onStartDateChange={handleStartDateChange}
//               endDate={endDate}
//               onEndDateChange={handleEndDateChange}
//               onClearFilters={clearAllFilters}
//               onApplyFilters={handleApplyFilters}
//             />
//           )}

//           {/* Active Filters Display */}
//           {appliedFiltersCount > 0 && (
//             <div className="bg-gray-50 px-6 py-2 mt-2 rounded-lg flex items-center justify-between z-50">
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">Active Filters:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {appliedFiltersText && (
//                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                       {appliedFiltersText}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <button
//                 onClick={clearAllFilters}
//                 className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
//               >
//                 <X size={14} className="mr-1" />
//                 Clear All
//               </button>
//             </div>
//           )}

//           {/* Feedback Table and Pagination */}
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="pt-16 -mt-14 z-20">
//               <OrgUserFeedbackTable
//                 feedbacks={feedbacks}
//                 onDelete={handleDeleteClick}
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

//           {/* Confirmation Modal for Delete */}
//           <ConfirmationModal
//             isOpen={isConfirmationModalOpen}
//             onClose={() => setConfirmationModalOpen(false)}
//             onConfirm={() => handleDelete(feedbackToDelete)}
//             message={`Are you sure you want to delete feedback from ${
//               feedbackToDeleteDetails?.userId?.name || "this user"
//             }?`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationUsersFeedbacks;







// // same theme sa admin


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrganizationFeedbacks,
//   deleteOrganizationFeedback,
//   setCurrentPage,
//   setItemsPerPage,
//   setSearchTerm,
//   setStartDate,
//   setEndDate,
//   clearFilters,
// } from "../../redux/Organization/feedbacks/organizationUsersFeedbackSlice";
// import Pagination from "../../components/Organization/Pagination";
// import FilterComponent from "../../components/Organization/FilterComponent";
// import OrgUserFeedbackTable from "../../components/Organization/OrgUserFeedbackTable";
// import ConfirmationModal from "../../components/Organization/ConfirmationModal";
// import Loader from "../../components/Common/Loader";
// import { Filter, X, SearchIcon } from "lucide-react";
// import { getAppliedFiltersCount, getAppliedFiltersText } from "../../utils/filterFunctions";
// import toast from "react-hot-toast";
// import OrganizationDashboard from "./OrganizationDashboard";
// import OrganizationUsersFeedbackDashboard from "./OrganizationUsersFeedbackDashboard";

// const OrganizationUsersFeedbacks = () => {
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

//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [feedbackToDelete, setFeedbackToDelete] = useState(null);
//   const [isFilterOpen, setFilterOpen] = useState(false);
//   const orgName = localStorage.getItem("orgName");

//   // Fetch feedbacks when filters or pagination change
//   useEffect(() => {
//     dispatch(
//       fetchOrganizationFeedbacks({
//         orgName,
//         page: currentPage,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate,
//         endDate,
//       })
//     );
//   }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate]);

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

//   // Handle delete confirmation
//   const handleDeleteClick = (feedbackId) => {
//     setFeedbackToDelete(feedbackId); // Set the feedback ID to delete
//     setConfirmationModalOpen(true);
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
//     if (date instanceof Date && !isNaN(date)) {
//       dispatch(setStartDate(date.toISOString()));
//     } else {
//       dispatch(setStartDate(null));
//     }
//   };

//   // Handle end date change
//   const handleEndDateChange = (date) => {
//     if (date instanceof Date && !isNaN(date)) {
//       dispatch(setEndDate(date.toISOString()));
//     } else {
//       dispatch(setEndDate(null));
//     }
//   };

//   // Clear filters
//   const clearAllFilters = () => {
//     dispatch(clearFilters());
//     dispatch(setCurrentPage(1));
//   };

//   // Handle apply filters
//   const handleApplyFilters = () => {
//     dispatch(setCurrentPage(1));
//     dispatch(
//       fetchOrganizationFeedbacks({
//         orgName,
//         page: 1,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate: startDate ? new Date(startDate).toISOString() : null,
//         endDate: endDate ? new Date(endDate).toISOString() : null,
//       })
//     );
//   };

//   // Get applied filters count
//   const appliedFiltersCount = getAppliedFiltersCount({ startDate, endDate });

//   // Get applied filters text
//   const appliedFiltersText = getAppliedFiltersText({ startDate, endDate });

//   // Find the feedback to delete
//   const feedbackToDeleteDetails = feedbacks.find(
//     (feedback) => feedback._id === feedbackToDelete
//   );

//   return (
//     <div className="relative">
//       <OrganizationUsersFeedbackDashboard/>
//       <div className="mx-auto w-[95%]">
//         <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-50 -mt-12">
//           {/* Header with Search and Filters */}
//           <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b z-30">
//             <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
//               <Filter className="mr-2 text-gray-600" size={20} />
//               Manage Feedbacks
//             </h2>

//             <div className="flex items-center space-x-4">
//               {/* Filter Button */}
//               <div>
//                 <button
//                   onClick={() => setFilterOpen(!isFilterOpen)}
//                   className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mr-4"
//                 >
//                   <Filter size={16} />
//                   {appliedFiltersCount > 0 && (
//                     <span className="ml-2 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
//                       {appliedFiltersCount}
//                     </span>
//                   )}
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
//           {isFilterOpen && (
//             <FilterComponent
//               isFilterOpen={isFilterOpen}
//               setFilterOpen={setFilterOpen}
//               startDate={startDate}
//               onStartDateChange={handleStartDateChange}
//               endDate={endDate}
//               onEndDateChange={handleEndDateChange}
//               onClearFilters={clearAllFilters}
//               onApplyFilters={handleApplyFilters}
//             />
//           )}

//           {/* Active Filters Display */}
//           {appliedFiltersCount > 0 && (
//             <div className="bg-gray-50 px-6 py-2 mt-2 rounded-lg flex items-center justify-between z-50">
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">Active Filters:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {appliedFiltersText && (
//                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                       {appliedFiltersText}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <button
//                 onClick={clearAllFilters}
//                 className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
//               >
//                 <X size={14} className="mr-1" />
//                 Clear All
//               </button>
//             </div>
//           )}

//           {/* Feedback Table and Pagination */}
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="pt-16 -mt-14 z-20">
//               <OrgUserFeedbackTable
//                 feedbacks={feedbacks}
//                 onDelete={handleDeleteClick}
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

//           {/* Confirmation Modal for Delete */}
//           <ConfirmationModal
//             isOpen={isConfirmationModalOpen}
//             onClose={() => setConfirmationModalOpen(false)}
//             onConfirm={() => handleDelete(feedbackToDelete)}
//             message={`Are you sure you want to delete feedback from ${
//               feedbackToDeleteDetails?.userId?.name || "this user"
//             }?`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationUsersFeedbacks;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizationFeedbacks,
  deleteOrganizationFeedback,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
  setStartDate,
  setEndDate,
  clearFilters,
} from "../../../redux/Organization/feedbacks/organizationUsersFeedbackSlice";
import Pagination from "../../../components/Organization/TableFunctions/Pagination";
import OrgUserFeedbackTable from "../../../components/Organization/Tables/FeedbackTable/OrgUserFeedbackTable";
import ConfirmationModal from "../../../components/Organization/Modals/ConfirmationModal";
import Loader from "../../../components/Common/Loader";
import { Filter, X, SearchIcon } from "lucide-react";
import { getAppliedFiltersCount, getAppliedFiltersText } from "../../../utils/filterFunctions";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrganizationUsersFeedbackDashboard from "./OrganizationUsersFeedbackDashboard";

const OrganizationUsersFeedbacks = () => {
  const dispatch = useDispatch();
  const {
    feedbacks,
    loading,
    currentPage,
    totalPages,
    itemsPerPage,
    searchTerm,
    startDate,
    endDate,
  } = useSelector((state) => state.organization.feedbacks);

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(startDate ? new Date(startDate) : null);
  const [localEndDate, setLocalEndDate] = useState(endDate ? new Date(endDate) : null);
  const orgName = localStorage.getItem("orgName");

  // Fetch feedbacks when filters or pagination change
  useEffect(() => {
    dispatch(
      fetchOrganizationFeedbacks({
        orgName,
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        startDate,
        endDate,
      })
    );
  }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate]);

  // Handle delete feedback
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrganizationFeedback(id)).unwrap();
      toast.success("Feedback deleted successfully");
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (feedbackId) => {
    setFeedbackToDelete(feedbackId); // Set the feedback ID to delete
    setConfirmationModalOpen(true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    dispatch(setItemsPerPage(Number(event.target.value)));
    dispatch(setCurrentPage(1));
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(setCurrentPage(1));
  };

  // Handle start date change
  const handleStartDateChange = (date) => {
    setLocalStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setLocalEndDate(date);
  };

  // Clear filters
  const clearAllFilters = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    dispatch(clearFilters());
    dispatch(setCurrentPage(1));
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    dispatch(setStartDate(localStartDate));
    dispatch(setEndDate(localEndDate));
    dispatch(setCurrentPage(1));
  };

  // Get applied filters count
  const appliedFiltersCount = getAppliedFiltersCount({ startDate, endDate });

  // Get applied filters text
  const appliedFiltersText = getAppliedFiltersText({ startDate, endDate });

  // Find the feedback to delete
  const feedbackToDeleteDetails = feedbacks.find(
    (feedback) => feedback._id === feedbackToDelete
  );

  return (
    <div className="relative">
      <OrganizationUsersFeedbackDashboard/>
      <div className="mx-auto w-[95%]">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg -mt-12">
          {/* Header with Search and Filters */}
          <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b z-20">
            <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
              <Filter className="mr-2 text-gray-600" size={20} />
              Manage Feedbacks
            </h2>

            <div className="flex items-center space-x-4">
              {/* Filter Button */}
              <div>
                <button
                  onClick={() => setFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mr-4"
                >
                  <Filter size={16} />
                  {appliedFiltersCount > 0 && (
                    <span className="ml-2 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
                      {appliedFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex-grow max-w-xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lightBlue-500 focus:border-lightBlue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm transition duration-150 ease-in-out"
                  />
                  {searchTerm && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        onClick={() => dispatch(setSearchTerm(""))}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-150"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6 z-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <div className="flex space-x-2">
                    <DatePicker
                      selected={localStartDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={localStartDate}
                      endDate={localEndDate}
                      placeholderText="Start Date"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
                    />
                    <DatePicker
                      selected={localEndDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={localStartDate}
                      endDate={localEndDate}
                      minDate={localStartDate}
                      placeholderText="End Date"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
                    />
                  </div>
                </div>

                {/* Apply and Clear Buttons */}
                <div className="flex justify-end items-end gap-4">
                  <button
                    onClick={handleApplyFilters}
                    className="px-4 py-2 rounded-lg bg-lightBlue-600 text-white hover:bg-lightBlue-700 text-sm md:text-base"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm md:text-base"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {appliedFiltersCount > 0 && (
            <div className="bg-gray-50 px-6 py-2 mt-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Active Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {appliedFiltersText && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {appliedFiltersText}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                <X size={14} className="mr-1" />
                Clear All
              </button>
            </div>
          )}

          {/* Feedback Table and Pagination */}
          {loading ? (
            <Loader />
          ) : (
            <div className="pt-16 -mt-14">
              <OrgUserFeedbackTable
                feedbacks={feedbacks}
                onDelete={handleDeleteClick}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}

          {/* Confirmation Modal for Delete */}

          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setConfirmationModalOpen(false)}
            onConfirm={() => handleDelete(feedbackToDelete)}
            message={`Are you sure you want to delete feedback from ${
              feedbackToDeleteDetails?.userId?.name || "this user"
              }?`}
              />
        </div>
      </div>
    </div>
  );
};

export default OrganizationUsersFeedbacks;