
// same design as admin

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Star,
  ThumbsUp,
  Clock,
  ThumbsDown,
  UserCheck,
  Building2,
  MessageSquare,
  Calendar,
  Users
} from 'lucide-react';
import {
  fetchOrganizationUsers,
  deleteOrganizationUser,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
  setStartDate,
  setEndDate,
  setGender,
  clearFilters,
} from "../../../redux/Organization/users/organizationUsersSlice";
import { fetchDashboardData } from "../../../redux/Organization/dashboard/organizationDashboardSlice";
import Pagination from "../../../components/Organization/TableFunctions/Pagination";
import FilterComponent from "../../../components/Organization/TableFunctions/FilterComponent";
import OrgUserTable from "../../../components/Organization/Tables/UserTable/OrgUserTable";
import OrganizationUserRegistration from "./Models/OrganizationUserRegistrationUpdateModal";
import ConfirmationModal from "../../../components/Organization/Modals/ConfirmationModal";
import Loader from "../../../components/Common/Loader";
import { Filter, X, UserPlus, SearchIcon } from "lucide-react";
import { getAppliedFiltersCount, getAppliedFiltersText } from "../../../utils/filterFunctions";
import Dashboard from "../../../components/Organization/Dashboards/Dashboard";
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
    gender,
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
        gender,
      })
    );
  }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate, gender]);

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

  // Handle start date change
  const handleStartDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      dispatch(setStartDate(date.toISOString()));
    } else {
      dispatch(setStartDate(null));
    }
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      dispatch(setEndDate(date.toISOString()));
    } else {
      dispatch(setEndDate(null));
    }
  };

  // Handle gender change
  const handleGenderChange = (value) => {
    dispatch(setGender(value));
  };

  // Clear filters
  const clearAllFilters = () => {
    dispatch(clearFilters());
    dispatch(setCurrentPage(1));
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    dispatch(setCurrentPage(1));
    dispatch(
      fetchOrganizationUsers({
        orgName,
        page: 1,
        limit: itemsPerPage,
        search: searchTerm,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
        gender,
      })
    );
  };

  // Toggle row expansion
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Get applied filters count
  const appliedFiltersCount = getAppliedFiltersCount({ startDate, endDate, gender });

  // Get applied filters text
  const appliedFiltersText = getAppliedFiltersText({ startDate, endDate, gender });

  return (
    <div className="relative">
      {/* <OrganizationDashboard type="user-list" /> */}
      <Dashboard type="user-list" showAllCards={false} showCardsTable={false}/>
      <div className="mx-auto w-[95%] z-30">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-5 -mt-12">
          {/* Header with Search and Filters */}
          <div className="bg-gray-50 mt-3 px-6 py-2 h-19 rounded-lg flex items-center z-30 justify-between border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
            <Users className="mr-2 text-gray-600" size={24} />

              Manage Users
            </h2>

            <div className="flex items-center space-x-4">
              {/* Filter Button */}
              <div>
                <button
                  onClick={() => setFilterOpen(!isFilterOpen)}
                  className="h-10 px-4 rounded-lg mr-4 border border-gray-400 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lightBlue-600  transition-colors flex items-center space-x-2"
                >
                  <Filter size={18} />
                  {appliedFiltersCount > 0 && (
                    <span className="ml-1 bg-lightBlue-600 text-white rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {appliedFiltersCount}
                    </span>
                  )}
                   {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {/* Search Bar */}
             <div className="flex-grow max-w-xl">
              <div className="relative w-[300px] border border-gray-50 rounded-lg 
                  focus-within:border-gray-300 focus-within:ring-1 
                  focus-within:ring-lightBlue-500 transition-colors">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
       <SearchIcon size={18} className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full h-10 pl-10 pr-10 rounded-lg bg-transparent text-sm 
                 placeholder-gray-500 focus:outline-none"
    />
    {searchTerm && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          onClick={() => dispatch(setSearchTerm(""))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
    )}
  </div>
</div>


              {/* Add New Button */}
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setModalOpen(true);
                }}
                className="flex items-center bg-lightBlue-600 text-white px-4 py-2 rounded-lg hover:bg-lightBlue-700 transition-colors"
              >
                 <PlusCircle size={18} className="mr-2" />

                Add New
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <FilterComponent
              isFilterOpen={isFilterOpen}
              setFilterOpen={setFilterOpen}
              startDate={startDate}
              onStartDateChange={handleStartDateChange}
              endDate={endDate}
              onEndDateChange={handleEndDateChange}
              gender={gender}
              onGenderChange={handleGenderChange}
              onClearFilters={clearAllFilters}
              onApplyFilters={handleApplyFilters}
            />
          )}

          {/* Active Filters Display */}
          {appliedFiltersCount > 0 && (
            <div className="bg-gray-50 px-6 py-2 mt-2 rounded-lg flex items-center justify-between z-50">
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

          {/* User Table and Pagination */}
          {loading ? (
            <Loader />
          ) : (
            <div className="pt-18 -mt-18 z-20">
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
              gender,
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