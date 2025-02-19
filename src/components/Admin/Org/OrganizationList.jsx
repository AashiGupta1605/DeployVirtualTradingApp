import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  PlusCircle,
  Filter,
  MoreVertical,
  Check,
  X,
  Search as SearchIcon, // Import the Search icon
  Calendar,
  MapPin,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModal from "../Modals/ConformationModal";
import OrganizationRegistrationForm from "./OrganizationRegistrationForm";
import OrgUserListModal from "../Modals/OrgUserList";

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Filter & Search States
  const [filter, setFilter] = useState("all"); // existing filter
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Additional Filter States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cityFilter, setCityFilter] = useState("all");
  const searchAreaRef = useRef(null);

  // New state for manual city input
  const [manualCityInput, setManualCityInput] = useState("");

  // List of famous Indian cities
  const famousIndianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    // Add more cities as needed
  ];

  // Fetch organizations on component mount or refresh
  useEffect(() => {
    fetchOrganizations();
  }, [refresh]);

  // Fetch organizations from the API
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/org/display-all-org");
      setOrganizations(response.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const handleOrgNameClick = async (org, e) => {
    e.stopPropagation();
    setSelectedOrg(org);
    await fetchStudentsByOrgName(org.name); // Pass the organization name dynamically
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

  const handleCloseStudentModal = () => {
    setIsStudentModalOpen(false);
    setSelectedOrg(null);
    setStudents([]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/org/${id}`);
      setRefresh((prev) => !prev);
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/org/${id}/approval-status`, { status });
      setRefresh((prev) => !prev);
      setDropdownOpen(null);
      setIsActionModalOpen(false);
    } catch (error) {
      console.error(`Error updating approval status:`, error);
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleActionClick = (org, action) => {
    setSelectedOrg(org);
    setPendingAction(action);
    setIsActionModalOpen(true);
  };

  const handleDeleteClick = (org) => {
    setSelectedOrg(org);
    setIsDeleteModalOpen(true);
  };

  const handleRegisterClick = (org) => {
    setSelectedOrg(org || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedOrg(null);
  };

  const getStatusColor = (approvalStatus) => {
    switch (approvalStatus) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearchInput = () => {
    setSearchQuery("");
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Handle changes to the manual city input
  const handleManualCityInputChange = (e) => {
    setManualCityInput(e.target.value);
    setCityFilter(e.target.value); // Update cityFilter immediately
  };

  const handleCityFilterChange = (e) => {
    setCityFilter(e.target.value);
    setManualCityInput(""); // Clear manual input when selecting from dropdown
  };

  const filteredOrganizations = organizations.filter((org) => {
    if (filter !== "all" && org.approvalStatus !== filter) {
      return false;
    }

    if (searchQuery && !org.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (startDate && endDate) {
      const orgDate = new Date(org.createDate);
      if (orgDate < startDate || orgDate > endDate) {
        return false;
      }
    }

    // City filtering logic:
    if (cityFilter !== "all") {
      const orgCity = org.address?.split(",").pop()?.trim().toLowerCase();
      if (cityFilter === "other") {
        // Check if the organization's city is NOT in the famous cities list AND not in the existing cities from the database
        const allKnownCities = [
          ...famousIndianCities.map((city) => city.toLowerCase()),
          ...new Set(
            organizations.map((o) => o.address?.split(",").pop()?.trim().toLowerCase())
          ),
        ];
        if (allKnownCities.includes(orgCity)) {
          return false; // Exclude if it's a known city
        }
      } else if (!orgCity?.includes(cityFilter.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  // Get unique cities from organizations and combine with famous cities
  const uniqueCities = [
    ...new Set(organizations.map((org) => org.address?.split(",").pop()?.trim())),
  ];
  const allCitiesForDropdown = [...new Set([...famousIndianCities, ...uniqueCities])].sort();

  // Function to clear all filters
  const clearFilters = () => {
    setFilter("all");
    setSearchQuery("");
    setStartDate(null);
    setEndDate(null);
    setCityFilter("all");
    setManualCityInput("");
  };

  // Function to apply filters (currently, it just closes the filter)
  const applyFilters = () => {
    toggleFilterVisibility(); // Just close the filter for now
  };

  return (
    <div className="mx-2 overflow-hidden mt-8">
      {/* Header Section */}
      <div className="mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
        <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
          <Filter className="mr-2 text-gray-600" size={20} />
          Manage Organizations
        </h2>
        <button
          onClick={() => handleRegisterClick(null)}
          className="flex items-center bg-lightBlue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mr-4"
        >
          <PlusCircle className="mr-2" size={16} />
          Register New
        </button>
        {/* Search Bar with Clear Button */}
        <div className="flex items-center w-full max-w-xs mr-4 relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
          />
          {searchQuery && (
            <button
              onClick={clearSearchInput}
              className="focus:outline-none absolute right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {/* Filter Icon Button */}
        <div className="relative group">
          <button
            onClick={toggleFilterVisibility}
            className="focus:outline-none bg-white rounded-md shadow-sm px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors flex items-center"
          >
            <Filter className="mr-2" size={16} />
          </button>
          <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md text-sm whitespace-nowrap">
            Filters
          </div>
        </div>
      </div>
      {/* Sliding Search Area */}
      <div
        ref={searchAreaRef}
        className={`bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out ${
          isFilterOpen ? "max-h-96 p-6" : "max-h-0 p-0"
        }`}
      >
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Approval Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="all">All Organizations</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {/* Date Range Filter */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              <Calendar className="mr-2" size={16} />
              Join Date Range:
            </label>
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          {/* City Filter */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              <MapPin className="mr-2" size={16} />
              City:
            </label>
            {/* Input field for manual city input */}
            <input
              type="text"
              placeholder="Enter city name..."
              value={manualCityInput}
              onChange={handleManualCityInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
            {/* Select dropdown */}
            <select
              value={cityFilter}
              onChange={handleCityFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="all">All Cities</option>
              {allCitiesForDropdown.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={clearFilters}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear Filters
          </button>
          <button
            onClick={applyFilters}
            className="bg-lightBlue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Apply Filters
          </button>
        </div>
      </div>
      {/* Table Section */}
      <div className="bg-white h-[28rem] shadow-md rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {["Name", "Contact", "Email", "Mobile", "Join Date", "Last Updated", "Status", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrganizations.map((org) => (
              <React.Fragment key={org._id}>
                <tr
                  onClick={() => toggleRow(org._id)}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    expandedRow === org._id ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 flex items-center">
                    {expandedRow === org._id ? (
                      <ChevronDown className="mr-2 text-gray-500" size={16} />
                    ) : (
                      <ChevronRight className="mr-2 text-gray-500" size={16} />
                    )}
                    <span onClick={(e) => handleOrgNameClick(org, e)} className="hover:underline cursor-pointer">
                      {org.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">{org.contactPerson}</td>
                  <td className="px-6 py-4">{org.email}</td>
                  <td className="px-6 py-4">{org.mobile}</td>
                  <td className="px-6 py-4">
                    {org.createDate ? new Date(org.createDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {org.updateDate ? new Date(org.updateDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(org.approvalStatus)}`}
                    >
                      {org.approvalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-4 relative">
                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegisterClick(org);
                        }}
                        className="text-yellow-500 hover:text-yellow-600 transition-colors"
                      >
                        <Edit size={24} />
                      </button>
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Edit
                      </span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(org);
                        }}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={24} />
                      </button>
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Delete
                      </span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownOpen(dropdownOpen === org._id ? null : org._id);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MoreVertical size={20} />
                      </button>
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        More Actions
                      </span>
                    </div>
                  </td>
                </tr>
                {/* Expanded Row (Details) */}
                {expandedRow === org._id && (
                  <tr>
                    <td colSpan={8} className="p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Address:</p>
                          <p>{org.address || "N/A"}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Description:</p>
                          <p>{org.description || "N/A"}</p>
                        </div>
                        {/* You can add more organization details here */}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onConfirm={() => {
          if (pendingAction === "approve") {
            handleApproval(selectedOrg._id, "approved");
          } else if (pendingAction === "reject") {
            handleApproval(selectedOrg._id, "rejected");
          }
        }}
        title={`Confirm ${pendingAction === "approve" ? "Approval" : "Rejection"}`}
        message={`Are you sure you want to ${pendingAction} ${selectedOrg?.name}?`}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(selectedOrg._id)}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${selectedOrg?.name}? This action cannot be undone.`}
      />
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={() => setIsSuccessModalOpen(false)}
        title="Success"
        message="Organization deleted successfully!"
      />
      <OrganizationRegistrationForm isOpen={isFormOpen} onClose={handleCloseForm} org={selectedOrg} setRefresh={setRefresh} />
      <OrgUserListModal isOpen={isStudentModalOpen} onClose={handleCloseStudentModal} students={students} loading={loadingStudents} orgName={selectedOrg?.name} />
    </div>
  );
};

export default OrganizationList;
