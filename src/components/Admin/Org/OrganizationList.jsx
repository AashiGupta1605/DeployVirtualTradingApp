// OrganizationList.jsx - Part 1: Imports and Utility Components

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Edit,
  Trash2,
  PlusCircle,
  Filter,
  MoreVertical,
  Check,
  X,
  Calendar,
  MapPin,
  Search as SearchIcon
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModal from "../Modals/ConformationModal";
import OrganizationRegistrationForm from "./OrganizationRegistrationForm";
import OrgUserListModal from "../Modals/OrgUserList";

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
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800"
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

// Constants
const FAMOUS_INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", 
  "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal", 
  "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra"
];

// OrganizationList.jsx - Part 2: Component State and Functions

const OrganizationList = () => {
  // Basic States
  const [organizations, setOrganizations] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal States
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Filter & Search States
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [tempFilters, setTempFilters] = useState({
    status: "all",
    startDate: null,
    endDate: null,
    city: "all"
  });

  // Active Filters State
  const [activeFilters, setActiveFilters] = useState({
    status: false,
    dateRange: false,
    search: false,
    city: false
  });

  // Fetch Data
  useEffect(() => {
    const fetchOrganizations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/org/display-all-org");
        setOrganizations(response.data || []);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrganizations();
  }, [refresh]);

  // Filter Functions
  const getActiveFiltersCount = () => {
    let count = 0;
    if (statusFilter !== 'all') count++;
    if (startDate && endDate) count++;
    if (searchQuery) count++;
    if (cityFilter !== 'all') count++;
    return count;
  };

  const getActiveFiltersText = () => {
    const filters = [];
    if (statusFilter !== 'all') filters.push(`Status: ${statusFilter}`);
    if (startDate && endDate) filters.push('Date Range');
    if (searchQuery) filters.push('Search');
    if (cityFilter !== 'all') filters.push(`City: ${cityFilter}`);
    
    if (filters.length === 0) return '';
    if (filters.length === 1) return `: ${filters[0]}`;
    return `: ${filters[0]} +${filters.length - 1}`;
  };

  // Filter Organizations
  const filteredOrganizations = organizations.filter((org) => {
    // Status Filter
    if (statusFilter !== "all" && org.approvalStatus?.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    
    // Date Filter
    if (startDate && endDate) {
      const orgDate = new Date(org.createDate);
      if (isNaN(orgDate.getTime()) || orgDate < startDate || orgDate > endDate) {
        return false;
      }
    }

    // City Filter
    if (cityFilter !== "all") {
      const orgCity = org.address?.split(",").pop()?.trim().toLowerCase();
      if (cityFilter === "other") {
        if (FAMOUS_INDIAN_CITIES.map(city => city.toLowerCase()).includes(orgCity)) {
          return false;
        }
      } else if (!orgCity?.includes(cityFilter.toLowerCase())) {
        return false;
      }
    }

    // Search Filter
    if (debouncedSearchQuery) {
      const searchLower = debouncedSearchQuery.toLowerCase();
      const searchFields = [
        org.name,
        org.contactPerson,
        org.email,
        org.mobile,
        org.address
      ].filter(Boolean);
      
      return searchFields.some(field => 
        String(field).toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);

  // Handler Functions
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/org/${id}`);
      setRefresh(prev => !prev);
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/org/${id}/approval-status`, { status });
      setRefresh(prev => !prev);
      setDropdownOpen(null);
      setIsActionModalOpen(false);
    } catch (error) {
      console.error("Error updating approval status:", error);
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
    setCityFilter(tempFilters.city);
    setIsFilterOpen(false);
    setCurrentPage(1);
    
    setActiveFilters({
      status: tempFilters.status !== 'all',
      dateRange: tempFilters.startDate && tempFilters.endDate,
      search: searchQuery !== '',
      city: tempFilters.city !== 'all'
    });
  };

  const clearFilters = () => {
    setTempFilters({
      status: "all",
      startDate: null,
      endDate: null,
      city: "all"
    });
    setStatusFilter("all");
    setStartDate(null);
    setEndDate(null);
    setCityFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
    
    setActiveFilters({
      status: false,
      dateRange: false,
      search: false,
      city: false
    });
  };

  const fetchStudentsByOrgName = async (orgName) => {
    setLoadingStudents(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/org/users/${encodeURIComponent(orgName)}`);
      setStudents(response.data);
      setIsStudentModalOpen(true);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  // OrganizationList.jsx - Part 3: Initial JSX and UI Components

return (
  <div className="mt-12 overflow-hidden">


    {/* Main Content Section */}
    <div className="px-2 mt-22">
      {/* Header with Search and Filters */}
      <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
        <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
          <Filter className="mr-2 text-gray-600" size={20} />
          Manage Organizations
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
                    <span className="ml-2 bg-lightBlue-500 text-white rounded-full px-2 py-0.5 text-xs">
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
      placeholder="Search organizations..."
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

          {/* Register New Organization Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center bg-lightBlue-600 text-white px-4 py-2 rounded-lg hover:bg-lightBlue-700 transition-colors ml-4"
          >
            <PlusCircle className="mr-2" size={16} />
            Add New Organization
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
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
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
                />
                <DatePicker
                  selected={tempFilters.endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={tempFilters.startDate}
                  endDate={tempFilters.endDate}
                  minDate={tempFilters.startDate}
                  placeholderText="End Date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                value={tempFilters.city}
                onChange={(e) => setTempFilters(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              >
                <option value="all">All Cities</option>
                {FAMOUS_INDIAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
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
              {cityFilter !== 'all' && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  City: {cityFilter}
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.length > 0 ? (
            currentItems.map((org) => (
              <React.Fragment key={org._id}>
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button 
                        onClick={() => toggleRow(org._id)}
                        className="mr-2 focus:outline-none"
                      >
                        {expandedRow === org._id ? (
                          <ChevronDown className="text-gray-500" size={16} />
                        ) : (
                          <ChevronRight className="text-gray-500" size={16} />
                        )}
                      </button>
                      <div className="text-sm font-medium text-gray-900">
                        <span 
                          className="cursor-pointer hover:text-lightBlue-600"
                          onClick={() => fetchStudentsByOrgName(org.name)}
                        >
                          {org.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{org.contactPerson || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{org.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{org.mobile || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(org.approvalStatus)}`}>
                      {org.approvalStatus || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(org.createDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <Tooltip text="Edit organization">
                        <button
                          onClick={() => {
                            setSelectedOrg(org);
                            setIsFormOpen(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors focus:outline-none"
                        >
                          <Edit size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Delete organization">
                        <button
                          onClick={() => {
                            setSelectedOrg(org);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900 transition-colors focus:outline-none"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Change status">
                        <div className="relative">
                          <button
                            onClick={() => setDropdownOpen(dropdownOpen === org._id ? null : org._id)}
                            className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {dropdownOpen === org._id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                              <button
                                onClick={() => {
                                  setPendingAction('approved');
                                  setSelectedOrg(org);
                                  setIsActionModalOpen(true);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-lightBlue-50"
                              >
                                <Check size={16} className="inline mr-2" />
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setPendingAction('rejected');
                                  setSelectedOrg(org);
                                  setIsActionModalOpen(true);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-lightBlue-50"
                              >
                                <X size={16} className="inline mr-2" />
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
                {expandedRow === org._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold mb-1">Address:</p>
                          <p className="text-sm text-gray-600">{org.address || 'No address provided'}</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Website:</p>
                          <p className="text-sm text-gray-600">{org.website || 'No website provided'}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                No organizations found
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
        {Math.min(indexOfLastItem, filteredOrganizations.length)}
      </span>{" "}
      of <span className="font-semibold">{filteredOrganizations.length}</span>{" "}
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
<OrganizationRegistrationForm
  isOpen={isFormOpen}
  onClose={() => {
    setIsFormOpen(false);
    setSelectedOrg(null);
  }}
  selectedOrg={selectedOrg}
/>

<OrgUserListModal
  isOpen={isStudentModalOpen}
  onClose={() => setIsStudentModalOpen(false)}
  students={students}
  loading={loadingStudents}
  orgName={selectedOrg?.name || ""}
/>

<ConfirmationModal
  isOpen={isActionModalOpen}
  onClose={() => setIsActionModalOpen(false)}
  onConfirm={() => handleApproval(selectedOrg._id, pendingAction)}
  title={`Confirm ${pendingAction === "approved" ? "Approval" : "Rejection"}`}
  message={`Are you sure you want to ${pendingAction} this organization?`}
/>

<ConfirmationModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onConfirm={() => handleDelete(selectedOrg._id)}
  title="Confirm Deletion"
  message="Are you sure you want to delete this organization?"
/>

<ConfirmationModal
  isOpen={isSuccessModalOpen}
  onClose={() => setIsSuccessModalOpen(false)}
  onConfirm={() => setIsSuccessModalOpen(false)}
  title="Success"
  message="Organization deleted successfully!"
/>
</div>
</div>
);
};

export default OrganizationList;