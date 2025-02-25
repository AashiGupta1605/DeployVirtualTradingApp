
// // new version filter colors number

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import OrganizationUserRegistration from "./auth/OrganizationUserRegistration";
// import ConfirmationModal from "../../components/Organization/ConfirmationModal";
// import Loader from "../../components/Common/Loader";
// import { Edit, Trash2, ChevronDown, ChevronRight, Filter, X, UserPlus, Trash, ChevronLeft } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Dashboard from "./OrganizationDashboard";
// import { BASE_API_URL } from "../../utils/BaseUrl";

// const OrganizationUsers = () => {
//   const [studentList, setStudentList] = useState([]);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [studentToDelete, setStudentToDelete] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [minAge, setMinAge] = useState("");
//   const [maxAge, setMaxAge] = useState("");
//   const [isFilterOpen, setFilterOpen] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const orgName = localStorage.getItem("orgName");

//   // Fetch students from the backend
//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${BASE_API_URL}/organization/${orgName}/users`, {
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           search: searchTerm,
//           startDate: startDate ? startDate.toISOString() : null,
//           endDate: endDate ? endDate.toISOString() : null,
//           minAge,
//           maxAge,
//         },
//       });
//       setStudentList(response.data.users);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error(error.response?.data?.msg || "Failed to fetch students.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [currentPage, searchTerm, startDate, endDate, minAge, maxAge, itemsPerPage]);

//   // Handle delete student
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_API_URL}/organization/user/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//       setConfirmationModalOpen(false);
//       fetchStudents(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error(error.response?.data?.msg || "Failed to delete student.");
//     }
//   };

//   // Handle edit student
//   const handleEdit = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   // Handle delete confirmation
//   const handleDeleteClick = (student) => {
//     setStudentToDelete(student);
//     setConfirmationModalOpen(true);
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Handle items per page change
//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1); // Reset to first page when items per page changes
//   };

//   // Debounced search
//   const debounce = (func, delay) => {
//     let debounceTimer;
//     return function (...args) {
//       const context = this;
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => func.apply(context, args), delay);
//     };
//   };

//   const debouncedSearch = useCallback(
//     debounce((value) => {
//       setSearchTerm(value);
//       setCurrentPage(1); // Reset to first page when search term changes
//     }, 500),
//     []
//   );

//   const handleSearchChange = (event) => {
//     debouncedSearch(event.target.value);
//   };

//   // Handle date and age filter changes
//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     setCurrentPage(1);
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date);
//     setCurrentPage(1);
//   };

//   const handleMinAgeChange = (event) => {
//     setMinAge(event.target.value);
//     setCurrentPage(1);
//   };

//   const handleMaxAgeChange = (event) => {
//     setMaxAge(event.target.value);
//     setCurrentPage(1);
//   };

//   // Clear filters
//   const clearStartDate = () => {
//     setStartDate(null);
//     setCurrentPage(1);
//   };

//   const clearEndDate = () => {
//     setEndDate(null);
//     setCurrentPage(1);
//   };

//   const clearMinAge = () => {
//     setMinAge("");
//     setCurrentPage(1);
//   };

//   const clearMaxAge = () => {
//     setMaxAge("");
//     setCurrentPage(1);
//   };

//   const clearAllFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setMinAge("");
//     setMaxAge("");
//     setCurrentPage(1);
//   };

//   // Toggle row expansion
//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };



//   const getAppliedFiltersCount = () => {
//     let count = 0;
//     if (startDate || endDate) count++; // Date Range is considered one filter
//     if (minAge || maxAge) count++; // Age Range is considered one filter
//     return count;
//   };
  
//   // Add a new function getAppliedFiltersText
//   const getAppliedFiltersText = () => {
//     const filters = [];
//     if (startDate || endDate) filters.push("Date Range");
//     if (minAge || maxAge) filters.push("Age Range");
//     return filters.join(", ");
//   };
  

//   return (
//     <div className="relative">
//       <Dashboard type="student-list" />
//       <Toaster />
//       <div className="mx-auto w-full">
//         <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-50">
//           <div className="px-8 py-8 -mt-38 z-50">
//             <div className="z-50 mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
//               <h2 className="text-base md:text-xl font-bold text-gray-800 flex-grow">Manage Users</h2>
//               <button
//   onClick={() => setFilterOpen(!isFilterOpen)}
//   className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4 relative"
// >
//   <Filter size={16} />
//   {getAppliedFiltersCount() > 0 && (
//     <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
//       {getAppliedFiltersCount()}
//     </span>
//   )}
//   {getAppliedFiltersText() && (
//     <span className="ml-2 text-[0px] sm:text-[10px] text-white">
//       {getAppliedFiltersText()}
//     </span>
//   )}
// </button>
//               <div className="flex items-center w-full max-w-xs mr-4 relative mx-2">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   onChange={handleSearchChange}
//                   className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
//                 />
//                 {searchTerm && (
//                   <button onClick={() => setSearchTerm("")} className="focus:outline-none absolute right-2 text-gray-500 hover:text-gray-700">
//                     <X size={16} />
//                   </button>
//                 )}
//               </div>
//               <button
//                 onClick={() => {
//                   setSelectedStudent(null);
//                   setModalOpen(true);
//                 }}
//                 className="z-50 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4"
//               >
//                 <UserPlus size={16} />
//               </button>
//             </div>
//             {isFilterOpen && (
//               <div className="bg-gray-50 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Date Range:</label>
//                     <div className="flex space-x-2 items-center">
//                       <DatePicker
//                         selected={startDate}
//                         onChange={handleStartDateChange}
//                         selectsStart
//                         startDate={startDate}
//                         endDate={endDate}
//                         placeholderText="Start Date"
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {startDate && (
//                         <button onClick={clearStartDate} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                     <div className="flex space-x-2 items-center mt-2">
//                       <DatePicker
//                         selected={endDate}
//                         onChange={handleEndDateChange}
//                         selectsEnd
//                         startDate={startDate}
//                         endDate={endDate}
//                         minDate={startDate}
//                         placeholderText="End Date"
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {endDate && (
//                         <button onClick={clearEndDate} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Age Range:</label>
//                     <div className="flex space-x-2 items-center">
//                       <input
//                         type="number"
//                         placeholder="Min Age"
//                         value={minAge}
//                         onChange={handleMinAgeChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {minAge && (
//                         <button onClick={clearMinAge} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                     <div className="flex space-x-2 items-center mt-2">
//                       <input
//                         type="number"
//                         placeholder="Max Age"
//                         value={maxAge}
//                         onChange={handleMaxAgeChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {maxAge && (
//                         <button onClick={clearMaxAge} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end mt-4">
//                   <button
//                     onClick={clearAllFilters}
//                     className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//                   >
//                     Clear All Filters
//                     <Trash className="inline ml-2" size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="pt-16 px-8 -mt-24 z-20">
//               <div className="bg-white h-[30rem] shadow-md rounded-lg overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       {["Name", "Email", "Mobile", "Gender", "Date of Birth", "Added By", "Status", "Actions"].map((header) => (
//                         <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           {header}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {studentList.map((student) => (
//                       <React.Fragment key={student._id}>
//                         <tr
//                           onClick={() => toggleRow(student._id)}
//                           className={`cursor-pointer hover:bg-gray-50 transition-colors ${expandedRow === student._id ? "bg-gray-50" : ""}`}
//                         >
//                           <td className="px-6 py-4 flex items-center">
//                             {expandedRow === student._id ? (
//                               <ChevronDown className="mr-2 text-gray-500" size={16} />
//                             ) : (
//                               <ChevronRight className="mr-2 text-gray-500" size={16} />
//                             )}
//                             {student.name}
//                           </td>
//                           <td className="px-6 py-4">{student.email}</td>
//                           <td className="px-6 py-4">{student.mobile}</td>
//                           <td className="px-6 py-4">{student.gender}</td>
//                           <td className="px-6 py-4">{new Date(student.dob).toISOString().split("T")[0]}</td>
//                           <td className="px-6 py-4">{student.addedby}</td>
//                           <td className="px-6 py-4">true</td>
//                           <td className="px-6 py-4 flex space-x-2 relative group">
//                             <div className="relative">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleEdit(student);
//                                 }}
//                                 className="text-lightBlue-500 hover:text-lightBlue-700 mr-2"
//                               >
//                                 <Edit size={14} />
//                               </button>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleDeleteClick(student);
//                                 }}
//                                 className="text-red-500 hover:text-red-700"
//                               >
//                                 <Trash2 size={14} />
//                               </button>
//                               <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white rounded-md shadow-md text-sm whitespace-nowrap">
//                                 Actions
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                         {expandedRow === student._id && (
//                           <tr>
//                             <td colSpan="10" className="px-6 py-4 bg-gray-50">
//                               <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-sm">
//                                 <div>
//                                   <p className="text-sm font-semibold text-gray-600 mb-1">Created Date</p>
//                                   <p className="text-sm text-gray-800">{new Date(student.createdDate).toLocaleDateString("en-US")}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm font-semibold text-gray-600 mb-1">Last Updated</p>
//                                   <p className="text-sm text-gray-800">{new Date(student.updatedDate).toLocaleDateString("en-US")}</p>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="flex justify-between items-center mt-4 px-4 py-3">
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-gray-700">Rows per page:</span>
//                   <select
//                     value={itemsPerPage}
//                     onChange={handleItemsPerPageChange}
//                     className="border rounded px-2 py-1 text-sm text-gray-600"
//                   >
//                     {[5, 10, 15, 25, 50, 100].map((num) => (
//                       <option key={num} value={num}>{num}</option>
//                     ))}
//                   </select>
//                   <span className="text-sm text-gray-600">
//                     {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, studentList.length)} of {studentList.length}
//                   </span>
//                 </div>

//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => setCurrentPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//                   >
//                     <ChevronLeft size={16} />
//                   </button>

//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => setCurrentPage(page)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === page
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => setCurrentPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Organization User Registration Modal */}
//           <OrganizationUserRegistration
//             isOpen={isModalOpen}
//             onClose={() => setModalOpen(false)}
//             initialValues={selectedStudent}
//             refreshStudents={fetchStudents} // Pass a function to refresh the list after adding/editing
//           />

//           {/* Confirmation Modal for Delete */}
//           <ConfirmationModal
//             isOpen={isConfirmationModalOpen}
//             onClose={() => setConfirmationModalOpen(false)}
//             onConfirm={() => handleDelete(studentToDelete._id)}
//             message={`Are you sure you want to delete student ${studentToDelete?.name}?`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationUsers;




// redux toolkit: working latent:

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrganizationUsers,
//   deleteOrganizationUser,
//   setCurrentPage,
//   setItemsPerPage,
//   setSearchTerm,
//   setStartDate,
//   setEndDate,
//   setMinAge,
//   setMaxAge,
//   clearFilters,
// } from "../../redux/Organization/users/organizationUsersSlice";
// import toast, { Toaster } from "react-hot-toast";
// import OrganizationUserRegistration from "./auth/OrganizationUserRegistration";
// import ConfirmationModal from "../../components/Organization/ConfirmationModal";
// import Loader from "../../components/Common/Loader";
// import { Edit, Trash2, ChevronDown, ChevronRight, Filter, X, UserPlus, Trash, ChevronLeft } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Dashboard from "./OrganizationDashboard";
// import { fetchDashboardData } from "../../redux/Organization/dashboard/organizationDashboardSlice";

// const OrganizationUsers = () => {
//   const dispatch = useDispatch();
//   const {
//     users: studentList,
//     loading,
//     currentPage,
//     totalPages,
//     itemsPerPage,
//     searchTerm,
//     startDate,
//     endDate,
//     minAge,
//     maxAge,
//   } = useSelector((state) => state.organization.users);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [studentToDelete, setStudentToDelete] = useState(null);
//   const [isFilterOpen, setFilterOpen] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const orgName = localStorage.getItem("orgName");

//   // Fetch students when filters or pagination change
//   useEffect(() => {
//     dispatch(
//       fetchOrganizationUsers({
//         orgName,
//         page: currentPage,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate,
//         endDate,
//         minAge,
//         maxAge,
//       })
//     );
//   }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate, minAge, maxAge]);

//   // Handle delete student
//   const handleDelete = async (id) => {

//     try {
//       await dispatch(deleteOrganizationUser(id)).unwrap(); // Wait for the delete action to complete
//       // toast.success("User deleted successfully!");
  
//       // Refresh the user list
//       dispatch(
//         fetchOrganizationUsers({
//           orgName,
//           page: currentPage,
//           limit: itemsPerPage,
//           search: searchTerm,
//           startDate,
//           endDate,
//           minAge,
//           maxAge,
//         })
//       );
  
//       // Refresh the dashboard data
//       dispatch(fetchDashboardData(orgName));
//     } catch (error) {
//       toast.error("Failed to delete user.", error);
//     } finally {
//       setConfirmationModalOpen(false); // Close the confirmation modal
//     }
//   };

//   // Handle edit student
//   const handleEdit = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//     dispatch(fetchDashboardData(orgName));
//   };

//   // Handle delete confirmation
//   const handleDeleteClick = (student) => {
//     setStudentToDelete(student);
//     setConfirmationModalOpen(true);
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     dispatch(setCurrentPage(page));
//   };

//   // Handle items per page change
//   const handleItemsPerPageChange = (event) => {
//     dispatch(setItemsPerPage(Number(event.target.value)));
//     dispatch(setCurrentPage(1)); // Reset to first page when items per page changes
//   };

//   // Handle search term change
//   const handleSearchChange = (event) => {
//     dispatch(setSearchTerm(event.target.value));
//     dispatch(setCurrentPage(1)); // Reset to first page when search term changes
//   };

//   // Handle date and age filter changes
//   const handleStartDateChange = (date) => {
//     dispatch(setStartDate(date));
//     dispatch(setCurrentPage(1));
//   };

//   const handleEndDateChange = (date) => {
//     dispatch(setEndDate(date));
//     dispatch(setCurrentPage(1));
//   };

//   const handleMinAgeChange = (event) => {
//     dispatch(setMinAge(event.target.value));
//     dispatch(setCurrentPage(1));
//   };

//   const handleMaxAgeChange = (event) => {
//     dispatch(setMaxAge(event.target.value));
//     dispatch(setCurrentPage(1));
//   };

//   // Clear filters
//   const clearAllFilters = () => {
//     dispatch(clearFilters());
//     dispatch(setCurrentPage(1));
//   };

//   // Toggle row expansion
//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   // Get applied filters count
//   const getAppliedFiltersCount = () => {
//     let count = 0;
//     if (startDate || endDate) count++; // Date Range is considered one filter
//     if (minAge || maxAge) count++; // Age Range is considered one filter
//     return count;
//   };

//   // Get applied filters text
//   const getAppliedFiltersText = () => {
//     const filters = [];
//     if (startDate || endDate) filters.push("Date Range");
//     if (minAge || maxAge) filters.push("Age Range");
//     return filters.join(", ");
//   };

//   return (
//     <div className="relative">
//       <Dashboard type="student-list" />
//       <Toaster />
//       <div className="mx-auto w-full">
//         <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-50">
//           <div className="px-8 py-8 -mt-38 z-50">
//             <div className="z-50 mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
//               <h2 className="text-base md:text-xl font-bold text-gray-800 flex-grow">Manage Users</h2>
//               <button
//                 onClick={() => setFilterOpen(!isFilterOpen)}
//                 className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4 relative"
//               >
//                 <Filter size={16} />
//                 {getAppliedFiltersCount() > 0 && (
//                   <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
//                     {getAppliedFiltersCount()}
//                   </span>
//                 )}
//                 {getAppliedFiltersText() && (
//                   <span className="ml-2 text-[0px] sm:text-[10px] text-white">{getAppliedFiltersText()}</span>
//                 )}
//               </button>
//               <div className="flex items-center w-full max-w-xs mr-4 relative mx-2">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   onChange={handleSearchChange}
//                   value={searchTerm}
//                   className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
//                 />
//                 {searchTerm && (
//                   <button onClick={() => dispatch(setSearchTerm(""))} className="focus:outline-none absolute right-2 text-gray-500 hover:text-gray-700">
//                     <X size={16} />
//                   </button>
//                 )}
//               </div>
//               <button
//                 onClick={() => {
//                   setSelectedStudent(null);
//                   setModalOpen(true);
//                 }}
//                 className="z-50 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4"
//               >
//                 <UserPlus size={16} />
//               </button>
//             </div>
//             {isFilterOpen && (
//               <div className="bg-gray-50 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Date Range:</label>
//                     <div className="flex space-x-2 items-center">
//                       <DatePicker
//                         selected={startDate}
//                         onChange={handleStartDateChange}
//                         selectsStart
//                         startDate={startDate}
//                         endDate={endDate}
//                         placeholderText="Start Date"
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {startDate && (
//                         <button onClick={() => dispatch(setStartDate(null))} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                     <div className="flex space-x-2 items-center mt-2">
//                       <DatePicker
//                         selected={endDate}
//                         onChange={handleEndDateChange}
//                         selectsEnd
//                         startDate={startDate}
//                         endDate={endDate}
//                         minDate={startDate}
//                         placeholderText="End Date"
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {endDate && (
//                         <button onClick={() => dispatch(setEndDate(null))} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Age Range:</label>
//                     <div className="flex space-x-2 items-center">
//                       <input
//                         type="number"
//                         placeholder="Min Age"
//                         value={minAge}
//                         onChange={handleMinAgeChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {minAge && (
//                         <button onClick={() => dispatch(setMinAge(""))} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                     <div className="flex space-x-2 items-center mt-2">
//                       <input
//                         type="number"
//                         placeholder="Max Age"
//                         value={maxAge}
//                         onChange={handleMaxAgeChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       />
//                       {maxAge && (
//                         <button onClick={() => dispatch(setMaxAge(""))} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                           <X size={16} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end mt-4">
//                   <button
//                     onClick={clearAllFilters}
//                     className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//                   >
//                     Clear All Filters
//                     <Trash className="inline ml-2" size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="pt-16 px-8 -mt-24 z-20">
//               <div className="bg-white h-[30rem] shadow-md rounded-lg overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       {["Name", "Email", "Mobile", "Gender", "Date of Birth", "Added By", "Status", "Actions"].map((header) => (
//                         <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           {header}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {studentList.map((student) => (
//                       <React.Fragment key={student._id}>
//                         <tr
//                           onClick={() => toggleRow(student._id)}
//                           className={`cursor-pointer hover:bg-gray-50 transition-colors ${expandedRow === student._id ? "bg-gray-50" : ""}`}
//                         >
//                           <td className="px-6 py-4 flex items-center">
//                             {expandedRow === student._id ? (
//                               <ChevronDown className="mr-2 text-gray-500" size={16} />
//                             ) : (
//                               <ChevronRight className="mr-2 text-gray-500" size={16} />
//                             )}
//                             {student.name}
//                           </td>
//                           <td className="px-6 py-4">{student.email}</td>
//                           <td className="px-6 py-4">{student.mobile}</td>
//                           <td className="px-6 py-4">{student.gender}</td>
//                           <td className="px-6 py-4">
//                             {student.dob && !isNaN(new Date(student.dob)) ? new Date(student.dob).toISOString().split("T")[0] : "N/A"}
//                           </td>
//                           <td className="px-6 py-4">{student.addedby}</td>
//                           <td className="px-6 py-4">true</td>
//                           <td className="px-6 py-4 flex space-x-2 relative group">
//                             <div className="relative">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleEdit(student);
//                                 }}
//                                 className="text-lightBlue-500 hover:text-lightBlue-700 mr-2"
//                               >
//                                 <Edit size={14} />
//                               </button>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleDeleteClick(student);
//                                 }}
//                                 className="text-red-500 hover:text-red-700"
//                               >
//                                 <Trash2 size={14} />
//                               </button>
//                               <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white rounded-md shadow-md text-sm whitespace-nowrap">
//                                 Actions
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                         {expandedRow === student._id && (
//                           <tr>
//                             <td colSpan="10" className="px-6 py-4 bg-gray-50">
//                               <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-sm">
//                                 <div>
//                                   <p className="text-sm font-semibold text-gray-600 mb-1">Created Date</p>
//                                   <p className="text-sm text-gray-800">{new Date(student.createdDate).toLocaleDateString("en-US")}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm font-semibold text-gray-600 mb-1">Last Updated</p>
//                                   <p className="text-sm text-gray-800">{new Date(student.updatedDate).toLocaleDateString("en-US")}</p>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="flex justify-between items-center mt-4 px-4 py-3">
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-gray-700">Rows per page:</span>
//                   <select
//                     value={itemsPerPage}
//                     onChange={handleItemsPerPageChange}
//                     className="border rounded px-2 py-1 text-sm text-gray-600"
//                   >
//                     {[5, 10, 15, 25, 50, 100].map((num) => (
//                       <option key={num} value={num}>{num}</option>
//                     ))}
//                   </select>
//                   <span className="text-sm text-gray-600">
//                     {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, studentList.length)} of {studentList.length}
//                   </span>
//                 </div>

//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//                   >
//                     <ChevronLeft size={16} />
//                   </button>

//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === page
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
       
//             </div>
//           )}

//           {/* Organization User Registration Modal */}
//           <OrganizationUserRegistration
//             isOpen={isModalOpen}
//             onClose={() => setModalOpen(false)}
//             initialValues={selectedStudent}
//             refreshStudents={() => dispatch(fetchOrganizationUsers({
//               orgName,
//               page: currentPage,
//               limit: itemsPerPage,
//               search: searchTerm,
//               startDate,
//               endDate,
//               minAge,
//               maxAge,
//             }))}
//             refreshDashboard = {() => dispatch(fetchDashboardData(orgName))}
//           />

//           {/* Confirmation Modal for Delete */}
//           <ConfirmationModal
//             isOpen={isConfirmationModalOpen}
//             onClose={() => setConfirmationModalOpen(false)}
//             onConfirm={() => handleDelete(studentToDelete._id)}
//             message={`Are you sure you want to delete student ${studentToDelete?.name}?`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationUsers;













// hello new compement version:


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrganizationUsers,
//   deleteOrganizationUser,
//   setCurrentPage,
//   setItemsPerPage,
//   setSearchTerm,
//   setStartDate,
//   setEndDate,
//   setMinAge,
//   setMaxAge,
//   clearFilters,
// } from "../../redux/Organization/users/organizationUsersSlice";
// import { fetchDashboardData } from "../../redux/Organization/dashboard/organizationDashboardSlice";
// import Pagination from "../../components/Organization/Pagination";
// import FilterComponent from "../../components/Organization/FilterComponent";
// import OrgUserTable from "../../components/Organization/OrgUserTable";
// import OrganizationUserRegistration from "./auth/OrganizationUserRegistration";
// import ConfirmationModal from "../../components/Organization/ConfirmationModal";
// import Loader from "../../components/Common/Loader";
// // import { UserPlusEdit, Trash2, ChevronDown, ChevronRight, Filter, X, UserPlus, Trash, ChevronLeft  } from "lucide-react";
// import { Edit, Trash2, ChevronDown, ChevronRight, Filter, X, UserPlus, Trash, ChevronLeft } from "lucide-react";

// import Dashboard from "./OrganizationDashboard";

// const OrganizationUsers = () => {
//   const dispatch = useDispatch();
//   const {
//     users: studentList,
//     loading,
//     currentPage,
//     totalPages,
//     itemsPerPage,
//     searchTerm,
//     startDate,
//     endDate,
//     minAge,
//     maxAge,
//   } = useSelector((state) => state.organization.users);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [studentToDelete, setStudentToDelete] = useState(null);
//   const [isFilterOpen, setFilterOpen] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const orgName = localStorage.getItem("orgName");

//   // Fetch students when filters or pagination change
//   useEffect(() => {
//     dispatch(
//       fetchOrganizationUsers({
//         orgName,
//         page: currentPage,
//         limit: itemsPerPage,
//         search: searchTerm,
//         startDate,
//         endDate,
//         minAge,
//         maxAge,
//       })
//     );
//   }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate, minAge, maxAge]);

//   // Handle delete student
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteOrganizationUser(id)).unwrap();
//       dispatch(fetchDashboardData(orgName));
//     } catch (error) {
//       console.error("Failed to delete user:", error);
//     } finally {
//       setConfirmationModalOpen(false);
//     }
//   };

//   // Handle edit student
//   const handleEdit = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   // Handle delete confirmation
//   const handleDeleteClick = (student) => {
//     setStudentToDelete(student);
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

//   // Handle date and age filter changes
//   const handleStartDateChange = (date) => {
//     dispatch(setStartDate(date));
//     dispatch(setCurrentPage(1));
//   };

//   const handleEndDateChange = (date) => {
//     dispatch(setEndDate(date));
//     dispatch(setCurrentPage(1));
//   };

//   const handleMinAgeChange = (event) => {
//     dispatch(setMinAge(event.target.value));
//     dispatch(setCurrentPage(1));
//   };

//   const handleMaxAgeChange = (event) => {
//     dispatch(setMaxAge(event.target.value));
//     dispatch(setCurrentPage(1));
//   };

//   // Clear filters
//   const clearAllFilters = () => {
//     dispatch(clearFilters());
//     dispatch(setCurrentPage(1));
//   };

//   // Toggle row expansion
//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };


//   const getAppliedFiltersCount = () => {
//     let count = 0;
//     if (startDate || endDate) count++; // Date Range is considered one filter
//     if (minAge || maxAge) count++; // Age Range is considered one filter
//     return count;
//   };

//   // Get applied filters text
//   const getAppliedFiltersText = () => {
//     const filters = [];
//     if (startDate || endDate) filters.push("Date Range");
//     if (minAge || maxAge) filters.push("Age Range");
//     return filters.join(", ");
//   };

//   return (
//     <div className="relative">
//       <Dashboard type="student-list"/>
//       <div className="mx-auto w-full">
//         <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-50">
//           <div className="px-8 py-8 -mt-38 z-50">
//             <div className="z-50 mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
//               <h2 className="text-base md:text-xl font-bold text-gray-800 flex-grow">Manage Users</h2>
//               <button
//                 onClick={() => setFilterOpen(!isFilterOpen)}
//                 className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4 relative"
//               >
//                 <Filter size={16} />
//                 {getAppliedFiltersCount() > 0 && (
//                   <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
//                     {getAppliedFiltersCount()}
//                   </span>
//                 )}
//                 {getAppliedFiltersText() && (
//                   <span className="ml-2 text-[0px] sm:text-[10px] text-white">{getAppliedFiltersText()}</span>
//                 )}
//               </button>
//               <div className="flex items-center w-full max-w-xs mr-4 relative mx-2">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   onChange={handleSearchChange}
//                   value={searchTerm}
//                   className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
//                 />
//                 {searchTerm && (
//                   <button onClick={() => dispatch(setSearchTerm(""))} className="focus:outline-none absolute right-2 text-gray-500 hover:text-gray-700">
//                     <X size={16} />
//                   </button>
//                 )}
//               </div>
//               <button
//                 onClick={() => {
//                   setSelectedStudent(null);
//                   setModalOpen(true);
//                 }}
//                 className="z-50 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4"
//               >
//                 <UserPlus size={16} />
//               </button>
//             </div>
//             {isFilterOpen && (
//               <FilterComponent
//                 isFilterOpen={isFilterOpen}
//                 setFilterOpen={setFilterOpen}
//                 searchTerm={searchTerm}
//                 onSearchChange={handleSearchChange}
//                 startDate={startDate}
//                 onStartDateChange={handleStartDateChange}
//                 endDate={endDate}
//                 onEndDateChange={handleEndDateChange}
//                 minAge={minAge}
//                 onMinAgeChange={handleMinAgeChange}
//                 maxAge={maxAge}
//                 onMaxAgeChange={handleMaxAgeChange}
//                 onClearFilters={clearAllFilters}
//                 appliedFiltersCount={getAppliedFiltersCount()}
//                 appliedFiltersText={getAppliedFiltersText()}
//               />
//             )}
//           </div>
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="pt-16 px-8 -mt-24 z-20">
//               <OrgUserTable
//                 users={studentList}
//                 onEdit={handleEdit}
//                 onDelete={handleDeleteClick}
//                 expandedRow={expandedRow}
//                 toggleRow={toggleRow}
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

//           {/* Organization User Registration Modal */}
//           <OrganizationUserRegistration
//             isOpen={isModalOpen}
//             onClose={() => setModalOpen(false)}
//             initialValues={selectedStudent}
//             refreshStudents={() => dispatch(fetchOrganizationUsers({
//               orgName,
//               page: currentPage,
//               limit: itemsPerPage,
//               search: searchTerm,
//               startDate,
//               endDate,
//               minAge,
//               maxAge,
//             }))}
//             refreshDashboard={() => dispatch(fetchDashboardData(orgName))}
//           />

//           {/* Confirmation Modal for Delete */}
//           <ConfirmationModal
//             isOpen={isConfirmationModalOpen}
//             onClose={() => setConfirmationModalOpen(false)}
//             onConfirm={() => handleDelete(studentToDelete._id)}
//             message={`Are you sure you want to delete student ${studentToDelete?.name}?`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationUsers;









// debouncing and seaprate filter text and count function

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizationUsers,
  deleteOrganizationUser,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
  setStartDate,
  setEndDate,
  setMinAge,
  setMaxAge,
  clearFilters,
} from "../../redux/Organization/users/organizationUsersSlice";
import { fetchDashboardData } from "../../redux/Organization/dashboard/organizationDashboardSlice";
import Pagination from "../../components/Organization/Pagination";
import FilterComponent from "../../components/Organization/FilterComponent";
import OrgUserTable from "../../components/Organization/OrgUserTable";
import OrganizationUserRegistration from "./auth/OrganizationUserRegistration";
import ConfirmationModal from "../../components/Organization/ConfirmationModal";
import Loader from "../../components/Common/Loader";
import { Edit, Trash2, ChevronDown, ChevronRight, Filter, X, UserPlus, Trash, ChevronLeft } from "lucide-react";
import Dashboard from "./OrganizationDashboard";
import { getAppliedFiltersCount, getAppliedFiltersText } from "../../utils/filterFunctions";

const OrganizationUsers = () => {
  const dispatch = useDispatch();
  const {
    users: studentList,
    loading,
    currentPage,
    totalPages,
    itemsPerPage,
    searchTerm,
    startDate,
    endDate,
    minAge,
    maxAge,
  } = useSelector((state) => state.organization.users);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const orgName = localStorage.getItem("orgName");

  // Fetch students when filters or pagination change
  useEffect(() => {
    dispatch(
      fetchOrganizationUsers({
        orgName,
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        startDate,
        endDate,
        minAge,
        maxAge,
      })
    );
  }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate, minAge, maxAge]);

  // Handle delete student
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrganizationUser(id)).unwrap();
      dispatch(fetchDashboardData(orgName));
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  // Handle edit student
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
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

  // Handle date and age filter changes
  const handleStartDateChange = (date) => {
    dispatch(setStartDate(date));
    dispatch(setCurrentPage(1));
  };

  const handleEndDateChange = (date) => {
    dispatch(setEndDate(date));
    dispatch(setCurrentPage(1));
  };

  const handleMinAgeChange = (event) => {
    dispatch(setMinAge(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleMaxAgeChange = (event) => {
    dispatch(setMaxAge(event.target.value));
    dispatch(setCurrentPage(1));
  };

  // Clear filters
  const clearAllFilters = () => {
    dispatch(clearFilters());
    dispatch(setCurrentPage(1));
  };

  // Toggle row expansion
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="relative">
      <Dashboard type="student-list"/>
      <div className="mx-auto w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-50">
          <div className="px-8 py-8 -mt-38 z-50">
            <div className="z-50 mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
              <h2 className="text-base md:text-xl font-bold text-gray-800 flex-grow">Manage Users</h2>
              <button
                onClick={() => setFilterOpen(!isFilterOpen)}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4 relative"
              >
                <Filter size={16} />
                {getAppliedFiltersCount({ startDate, endDate, minAge, maxAge }) > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
                    {getAppliedFiltersCount({ startDate, endDate, minAge, maxAge })}
                  </span>
                )}
                {getAppliedFiltersText({ startDate, endDate, minAge, maxAge }) && (
                  <span className="ml-2 text-[0px] sm:text-[10px] text-white">{getAppliedFiltersText({ startDate, endDate, minAge, maxAge })}</span>
                )}
              </button>
              <div className="flex items-center w-full max-w-xs mr-4 relative mx-2">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  value={searchTerm}
                  className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                />
                {searchTerm && (
                  <button onClick={() => dispatch(setSearchTerm(""))} className="focus:outline-none absolute right-2 text-gray-500 hover:text-gray-700">
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setModalOpen(true);
                }}
                className="z-50 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-4"
              >
                <UserPlus size={16} />
              </button>
            </div>
            {isFilterOpen && (
              <FilterComponent
                isFilterOpen={isFilterOpen}
                setFilterOpen={setFilterOpen}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                startDate={startDate}
                onStartDateChange={handleStartDateChange}
                endDate={endDate}
                onEndDateChange={handleEndDateChange}
                minAge={minAge}
                onMinAgeChange={handleMinAgeChange}
                maxAge={maxAge}
                onMaxAgeChange={handleMaxAgeChange}
                onClearFilters={clearAllFilters}
              />
            )}
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="pt-16 px-8 -mt-24 z-20">
              <OrgUserTable
                users={studentList}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                expandedRow={expandedRow}
                toggleRow={toggleRow}
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

          {/* Organization User Registration Modal */}
          <OrganizationUserRegistration
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            initialValues={selectedStudent}
            refreshStudents={() => dispatch(fetchOrganizationUsers({
              orgName,
              page: currentPage,
              limit: itemsPerPage,
              search: searchTerm,
              startDate,
              endDate,
              minAge,
              maxAge,
            }))}
            refreshDashboard={() => dispatch(fetchDashboardData(orgName))}
          />

          {/* Confirmation Modal for Delete */}
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setConfirmationModalOpen(false)}
            onConfirm={() => handleDelete(studentToDelete._id)}
            message={`Are you sure you want to delete student ${studentToDelete?.name}?`}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationUsers;




