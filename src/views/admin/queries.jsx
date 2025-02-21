// QueriesPage.jsx - Part 1: Imports and Utility Components

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Search as SearchIcon,
  X,
  Filter,
  Calendar,
} from "lucide-react";
import CardStats from "../../components/Admin/Cards/CardStats";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

// Delete Modal Component
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this query? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
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
const getTypeColor = (type) => {
  const colors = {
    "General Inquiry": "bg-blue-100 text-blue-800",
    "Technical Support": "bg-green-100 text-green-800",
    "Billing Issue": "bg-red-100 text-red-800",
    "Feedback": "bg-yellow-100 text-yellow-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

const truncateText = (text, maxLength) => {
  return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// QueriesPage.jsx - Part 2: Component State and Functions

const QueriesPage = () => {
  // Basic States
  const [contacts, setContacts] = useState([]);
  const [orgCount, setOrgCount] = useState(0);
  const [users, setUsers] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter States
  const [typeFilter, setTypeFilter] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    type: "all",
    startDate: null,
    endDate: null,
  });

  // Active Filters State
  const [activeFilters, setActiveFilters] = useState({
    type: false,
    dateRange: false,
    search: false
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchAreaRef = useRef(null);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.querySelector('input[type="text"]').focus();
      }
      if (e.key === 'Escape') {
        clearFilters();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [contactsResponse, orgResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/contact"),
          axios.get("http://localhost:5000/api/org/display-all-org"),
          axios.get("http://localhost:5000/api/user/display-users"),
        ]);

        setContacts(contactsResponse.data);
        setOrgCount(orgResponse.data.length);
        setUsers(usersResponse.data.length);
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
    if (typeFilter !== 'all') count++;
    if (startDate && endDate) count++;
    if (searchQuery) count++;
    return count;
  };

  const getActiveFiltersText = () => {
    const filters = [];
    if (typeFilter !== 'all') filters.push(typeFilter);
    if (startDate && endDate) filters.push('Date Range');
    if (searchQuery) filters.push('Search');
    
    if (filters.length === 0) return '';
    if (filters.length === 1) return `: ${filters[0]}`;
    return `: ${filters[0]} +${filters.length - 1}`;
  };

  // Filter Contacts
  const filteredContacts = contacts.filter((contact) => {
    if (typeFilter !== "all" && contact.type !== typeFilter) return false;
    
    if (startDate && endDate) {
      const contactDate = new Date(contact.createDate);
      if (contactDate < startDate || contactDate > endDate) return false;
    }

    if (debouncedSearchQuery) {
      const searchLower = debouncedSearchQuery.toLowerCase();
      const searchFields = [
        contact.name,
        contact.email,
        contact.mobile,
        contact.type,
        contact.desc,
      ];
      return searchFields.some(
        (field) => field && field.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  // Handler Functions
  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${deleteId}`);
      setRefresh((prev) => !prev);
      setDeleteModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleTypeFilterChange = (e) => {
    setTempFilters({ ...tempFilters, type: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setTempFilters({ ...tempFilters, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setTempFilters({ ...tempFilters, endDate: date });
  };

  const applyFilters = () => {
    setTypeFilter(tempFilters.type);
    setStartDate(tempFilters.startDate);
    setEndDate(tempFilters.endDate);
    setIsFilterOpen(false);
    setCurrentPage(1);
    
    setActiveFilters({
      type: tempFilters.type !== 'all',
      dateRange: tempFilters.startDate && tempFilters.endDate,
      search: searchQuery !== ''
    });
  };

  const clearFilters = () => {
    setTempFilters({ type: "all", startDate: null, endDate: null });
    setTypeFilter("all");
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
    setCurrentPage(1);
    
    setActiveFilters({
      type: false,
      dateRange: false,
      search: false
    });
  };

  // QueriesPage.jsx - Part 3: Render Logic and JSX

// Continuing from the QueriesPage component...

return (
  <div className="mt-12 overflow-hidden">
    {/* Stats Cards Section */}
    <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 mx-auto w-full">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
            <CardStats
              statSubtitle="REGISTERED USERS"
              statTitle={users.toString()}
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
    <div className="px-8 mx-4 -mt-38">
      {/* Header with Search and Filters */}
      <div className="mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
        <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
          <Filter className="mr-2 text-gray-600" size={20} />
          Manage Queries
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
      placeholder="Search contacts..."
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
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={tempFilters.type}
                onChange={handleTypeFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              >
                <option value="all">All Types</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Billing Issue">Billing Issue</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
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
            <div className="flex gap-2">
              {typeFilter !== 'all' && (
                <span className="bg-lightBlue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {typeFilter}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((contact) => (
                    <React.Fragment key={contact._id}>
                      <tr className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{contact.mobile}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(contact.type)}`}>
                            {contact.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {expandedRow === contact._id ? contact.desc : truncateText(contact.desc, 50)}
                            {contact.desc?.length > 50 && (
                              <button
                                onClick={() => toggleRow(contact._id)}
                                className="ml-2 text-blue-500 hover:text-lightBlue-700"
                              >
                                {expandedRow === contact._id ? "Show less" : "Show more"}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(contact.createDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No queries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4 py-3">
      <div className="flex items-center space-x-4">
        {/* Left side - Rows per page */}
        <label className="flex items-center space-x-2">
  <span className="text-sm font-medium text-gray-700">Rows per page:</span>
  <select
    value={itemsPerPage}
    onChange={(e) => setItemsPerPage(Number(e.target.value))}
    className="form-select px-4 rounded-md border-gray-300 shadow-sm focus:border-lightBlue-500 focus:ring focus:ring-lightBlue-200 focus:ring-opacity-50 text-sm py-2"
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
            {Math.min(indexOfLastItem, filteredContacts.length)}
          </span>{" "}
          of <span className="font-semibold">{filteredContacts.length}</span>{" "}
          
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
    </div>
  </div>
);
};

export default QueriesPage;