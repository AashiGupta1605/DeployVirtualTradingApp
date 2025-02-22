// RegisterUserList.jsx - Part 1: Imports and Utility Components

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { 
  ChevronDown, 
  ChevronRight,
  ChevronLeft, 
  Trash2, 
  Filter, 
  PlusCircle, 
  Edit,
  X,
  Calendar,
  Search as SearchIcon
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CardStats from "../../components/Admin/Cards/CardStats";
import RegisterModal from "../auth/Register";
import ConfirmationModal from "../../components/Admin/Modals/ConformationModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_API_URL } from "../../utils/BaseUrl";

// Tooltip Component
const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

// Custom Hook for Debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Utility Functions
const getStatusColor = (status) => {
  if (!status || typeof status !== 'string') {
    return "bg-gray-100 text-gray-800";
  }

  const statusColors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    disabled: "bg-red-100 text-red-800"
  };

  return statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  status: Yup.string()
    .oneOf(['active', 'pending', 'disabled'], 'Invalid status')
    .default('pending')
});

// RegisterUserList.jsx - Part 2: Component State and Functions

const RegisterUserList = () => {
  // Basic States
  const [users, setUsers] = useState([]);
  const [orgCount, setOrgCount] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal States
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter & Search States
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [tempFilters, setTempFilters] = useState({
    status: "all",
    startDate: null,
    endDate: null,
  });

  // Active Filters State
  const [activeFilters, setActiveFilters] = useState({
    status: false,
    dateRange: false,
    search: false
  });

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      status: "pending"
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (selectedUser) {
          await axios.put(`${BASE_API_URL}/user/users/${selectedUser._id}`, values);
        } else {
          await axios.post(`${BASE_API_URL}/user/register`, values);
        }
        closeRegisterModal();
        setRefresh(prev => !prev);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again.");
      }
    },
    enableReinitialize: true,
  });

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersResponse, orgResponse] = await Promise.all([
          axios.get(`${BASE_API_URL}/user/display-users`),
          axios.get(`${BASE_API_URL}/organization/display-all-org`),
        ]);
        setUsers(usersResponse.data || []);
        setOrgCount(orgResponse.data?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  // Filter Functions
  const getActiveFiltersCount = () => {
    let count = 0;
    if (statusFilter !== 'all') count++;
    if (startDate && endDate) count++;
    if (searchQuery) count++;
    return count;
  };

  const getActiveFiltersText = () => {
    const filters = [];
    if (statusFilter !== 'all') filters.push(`Status: ${statusFilter}`);
    if (startDate && endDate) filters.push('Date Range');
    if (searchQuery) filters.push('Search');
    
    if (filters.length === 0) return '';
    if (filters.length === 1) return `: ${filters[0]}`;
    return `: ${filters[0]} +${filters.length - 1}`;
  };

// Replace the existing filteredUsers function with this:

const filteredUsers = users.filter((user) => {
  // Status Filter
  if (statusFilter !== "all") {
    const userStatus = String(user?.status || '').toLowerCase();
    const filterStatus = statusFilter.toLowerCase();
    if (userStatus !== filterStatus) {
      return false;
    }
  }
  
  // Date Filter
  if (startDate && endDate) {
    const userDate = new Date(user?.createdDate);
    if (isNaN(userDate.getTime()) || userDate < startDate || userDate > endDate) {
      return false;
    }
  }

  // Search Filter
  if (debouncedSearchQuery) {
    const searchLower = debouncedSearchQuery.toLowerCase();
    const searchFields = [
      user?.name,
      user?.email,
      user?.mobile,
      user?.address,
    ].filter(Boolean); // Remove null/undefined values
    
    return searchFields.some(field => 
      String(field).toLowerCase().includes(searchLower)
    );
  }

  return true;
});
  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Handler Functions
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_API_URL}/user/users/${id}`);
      setRefresh(prev => !prev);
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleStatusFilterChange = (e) => {
    setTempFilters(prev => ({ ...prev, status: e.target.value }));
  };

  const handleStartDateChange = (date) => {
    setTempFilters(prev => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setTempFilters(prev => ({ ...prev, endDate: date }));
  };

  const applyFilters = () => {
    setStatusFilter(tempFilters.status);
    setStartDate(tempFilters.startDate);
    setEndDate(tempFilters.endDate);
    setIsFilterOpen(false);
    setCurrentPage(1);
    
    setActiveFilters({
      status: tempFilters.status !== 'all',
      dateRange: tempFilters.startDate && tempFilters.endDate,
      search: searchQuery !== ''
    });
  };

  const clearFilters = () => {
    setTempFilters({ status: "all", startDate: null, endDate: null });
    setStatusFilter("all");
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
    setCurrentPage(1);
    
    setActiveFilters({
      status: false,
      dateRange: false,
      search: false
    });
  };

  
const getTypeColor = (type) => {
  const colors = {
    "Male": "bg-lightBlue-100 text-lightBlue-600",
    "male": "bg-lightBlue-100 text-lightBlue-600",
    "Female": "bg-red-100 text-red-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

  // Modal Handlers
  const openRegisterModal = () => {
    setSelectedUser(null);
    formik.resetForm();
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setSelectedUser(null);
    formik.resetForm();
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    formik.setValues({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      address: user.address || "",
      status: user.status || "pending"
    });
    setIsRegisterModalOpen(true);
  };

  // RegisterUserList.jsx - Part 3: Initial JSX and UI Components

return (
  <div className="mt-12 overflow-hidden">
    {/* Stats Cards Section */}
    <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 mx-auto w-full">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
            <CardStats
              statSubtitle="REGISTERED USERS"
              statTitle={users.length.toString()}
              statArrow="up"
              statPercent="100"
              statPercentColor="text-emerald-500"
              statDescription="Total users registered"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
            <CardStats
              statSubtitle="REGISTERED ORGANIZATIONS"
              statTitle={orgCount.toString()}
              statArrow="up"
              statPercent="100"
              statPercentColor="text-emerald-500"
              statDescription="Total organizations registered"
              statIconName="fas fa-building"
              statIconColor="bg-orange-500"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Main Content Section */}
    <div className="px-8 mx-4 -mt-14">
{/* Header with Search and Filters */}
<div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
  <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
    <Filter className="mr-2 text-gray-600" size={20} />
    Manage Users
  </h2>
  
  <div className="flex items-center space-x-4">
    {/* Filter Button */}
    <div>
      <Tooltip text="Toggle filters">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mr-4"
        >
          <div className="flex items-center">
            <Filter size={16} />
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
                {getActiveFiltersCount()}
              </span>
            )}
            {getActiveFiltersText() && (
              <span className="ml-2 text-gray-600 text-sm">
                {getActiveFiltersText()}
              </span>
            )}
          </div>
        </button>
      </Tooltip>
    </div>

    {/* Search Bar */}
    <div className="flex-grow max-w-xl">
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <SearchIcon size={16} className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Search users..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setActiveFilters(prev => ({
          ...prev,
          search: e.target.value !== ''
        }));
      }}
      className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-lightBlue-500 
                 focus:border-lightBlue-500 text-gray-900 placeholder-gray-500 
                 bg-white shadow-sm transition duration-150 ease-in-out"
    />
    {searchQuery && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          onClick={() => {
            setSearchQuery("");
            setActiveFilters(prev => ({
              ...prev,
              search: false
            }));
          }}
          className="text-gray-400 hover:text-gray-600 focus:outline-none 
                     focus:text-gray-600 transition-colors duration-150"
        >
          <X size={16} />
        </button>
      </div>
    )}
  </div>
</div>

    {/* Register New User Button */}
    <button
      onClick={openRegisterModal}
      className="flex items-center bg-lightBlue-600 text-white px-4 py-2 rounded-lg hover:bg-lightBlue-600 transition-colors ml-4"
    >
      <PlusCircle className="mr-2" size={16} />
      Add New User
    </button>
  </div>
</div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={tempFilters.status}
                onChange={handleStatusFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date Range</label>
              <div className="flex space-x-2">
                <DatePicker
                  selected={tempFilters.startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={tempFilters.startDate}
                  endDate={tempFilters.endDate}
                  placeholderText="Start Date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
                />
                <DatePicker
                  selected={tempFilters.endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={tempFilters.startDate}
                  endDate={tempFilters.endDate}
                  minDate={tempFilters.startDate}
                  placeholderText="End Date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-4">
          <button
              onClick={applyFilters}
              className="px-4 py-2 mx-4 rounded-lg bg-lightBlue-600 text-white hover:bg-lightBlue-600"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Clear
            </button>
            
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="bg-gray-50 px-6 py-2 mt-2 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Active Filters:</span>
            <div className="flex flex-wrap gap-2">
              {statusFilter !== 'all' && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Status: {statusFilter}
                </span>
              )}
              {startDate && endDate && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Date Range: {formatDate(startDate)} - {formatDate(endDate)}
                </span>
              )}
              {searchQuery && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
          >
            <X size={14} className="mr-1" />
            Clear All
          </button>
        </div>
      )}

{/* Table Section */}
<div className="bg-white rounded-lg shadow-lg">
  {isLoading ? (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue-500"></div>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.length > 0 ? (
            currentItems.map((user) => (
              <React.Fragment key={user._id}>
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button 
                        onClick={() => toggleRow(user._id)}
                        className="mr-2 focus:outline-none"
                      >
                        {expandedRow === user._id ? (
                          <ChevronDown className="text-gray-500" size={16} />
                        ) : (
                          <ChevronRight className="text-gray-500" size={16} />
                        )}
                      </button>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.mobile || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(user.gender)}`}>
                            {user.gender}
                          </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(user.dob)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(user.createdDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <Tooltip text="Edit user">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors focus:outline-none"
                        >
                          <Edit size={24} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Delete user">
                        <button
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900 transition-colors focus:outline-none"
                        >
                          <Trash2 size={24} />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
                {expandedRow === user._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        <p className="font-semibold mb-2">Address:</p>
                        <p>{user.address || 'No address provided'}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}
</div>

{/* Pagination Controls */}
<div className="flex justify-between items-center mt-4 px-4 py-3">
  <div className="flex items-center space-x-4">
    {/* Left side - Rows per page */}
    <label className="flex items-center space-x-2">
  <span className="text-sm font-medium text-gray-700">Rows per page:</span>
  <select
    value={itemsPerPage}
    onChange={(e) => setItemsPerPage(Number(e.target.value))}
    className="form-select px-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm py-2"
  >
    {[2, 5, 15, 25, 50, 100].map((num) => (
      <option key={num} value={num} className="text-gray-700">
        {num}
      </option>
    ))}
  </select>
</label>

    <div className="hidden sm:block text-sm text-gray-700">
      <span className="font-semibold">{indexOfFirstItem + 1}</span> -{" "}
      <span className="font-semibold">
        {Math.min(indexOfLastItem, filteredUsers.length)}
      </span>{" "}
      of <span className="font-semibold">{filteredUsers.length}</span>{" "}
    </div>
  </div>

  {/* Pagination */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (totalPages <= 5) return true;
            if (page === 1 || page === totalPages) return true;
            return Math.abs(page - currentPage) <= 1;
          })
          .map((page, i, arr) => (
            <React.Fragment key={page}>
              {i > 0 && arr[i - 1] !== page - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-lightBlue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
</div>

{/* Modals */}
<RegisterModal
  isOpen={isRegisterModalOpen}
  onClose={closeRegisterModal}
  formik={formik}
  isEditing={!!selectedUser}
/>

<ConfirmationModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onConfirm={() => handleDelete(selectedUserId)}
  title="Confirm Deletion"
  message="Are you sure you want to delete this user? This action cannot be undone."
/>

<ConfirmationModal
  isOpen={isSuccessModalOpen}
  onClose={() => setIsSuccessModalOpen(false)}
  onConfirm={() => setIsSuccessModalOpen(false)}
  title="Success"
  message="User deleted successfully!"
/>
</div>
</div>
);
};

export default RegisterUserList;