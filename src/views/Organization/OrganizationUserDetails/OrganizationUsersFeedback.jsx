import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  ChevronDown,
  ChevronUp,
  PlusCircle,
  MessageSquare,
  Filter,
  X,
  SearchIcon
} from 'lucide-react';
import {
  fetchOrganizationUsersFeedbacks,
  deleteOrganizationUsersFeedback,
  updateOrganizationUsersFeedback,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
  setStartDate,
  setEndDate,
  clearFilters,
} from "../../../redux/Organization/feedbacks/organizationFeedbackSlice";
import Pagination from "../../../components/Organization/TableFunctions/Pagination";
import OrgUserFeedbackTable from "../../../components/Organization/Tables/FeedbackTable/OrgUserFeedbackTable";
import OrganizationFeedbackFormModal from "../../../components/Organization/Modals/OrganizationFeedbackFormModal";
import ConfirmationModal from "../../../components/Organization/Modals/ConfirmationModal";
import Loader from "../../../components/Common/Loader";
import { getAppliedFiltersCount, getAppliedFiltersText } from "../../../utils/filterFunctions";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StatsSection from "../../../components/Organization/Cards/StatsSection";
import { useOrganizationDashboard } from "../../../hooks/useOrganizationDashbaord";

const OrganizationUsersFeedbacks = () => {
  const [refreshDependency, setRefreshDependency] = useState(0);
  useOrganizationDashboard(refreshDependency);
  
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
  } = useSelector((state) => state.organization.userFeedbacks);

  const [isFeedbackFormModalOpen, setFeedbackFormModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [feedbackToEdit, setFeedbackToEdit] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(startDate ? new Date(startDate) : null);
  const [localEndDate, setLocalEndDate] = useState(endDate ? new Date(endDate) : null);
  const orgName = localStorage.getItem("orgName");

  useEffect(() => {
    dispatch(
      fetchOrganizationUsersFeedbacks({
        orgName,
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        startDate,
        endDate,
      })
    );
  }, [dispatch, orgName, currentPage, itemsPerPage, searchTerm, startDate, endDate]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrganizationUsersFeedback(id)).unwrap();
      toast.success("Feedback deleted successfully");
      setRefreshDependency((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  const handleDeleteClick = (feedbackId) => {
    setFeedbackToDelete(feedbackId);
    setConfirmationModalOpen(true);
  };

  const handleEditClick = (feedback) => {
    setFeedbackToEdit(feedback);
    setFeedbackFormModalOpen(true);
  };

  const handleFormSubmit = async (feedbackData) => {
    if (feedbackToEdit) {
      try {
        await dispatch(
          updateOrganizationUsersFeedback({
            id: feedbackToEdit._id,
            feedbackData,
          })
        ).unwrap();
        toast.success("Feedback updated successfully");
      } catch (error) {
        console.error("Failed to update feedback:", error);
      } finally {
        setFeedbackFormModalOpen(false);
        setFeedbackToEdit(null);
      }
    } else {
      setRefreshDependency((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (event) => {
    dispatch(setItemsPerPage(Number(event.target.value)));
    dispatch(setCurrentPage(1));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleStartDateChange = (date) => {
    setLocalStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setLocalEndDate(date);
  };

  const clearAllFilters = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    dispatch(clearFilters());
    dispatch(setCurrentPage(1));
  };

  const handleApplyFilters = () => {
    dispatch(setStartDate(localStartDate));
    dispatch(setEndDate(localEndDate));
    dispatch(setCurrentPage(1));
    setFilterOpen(false); // Close filter panel after applying
  };

  const appliedFiltersCount = getAppliedFiltersCount({ startDate, endDate });
  const appliedFiltersText = getAppliedFiltersText({ startDate, endDate });

  const feedbackToDeleteDetails = feedbacks.find(
    (feedback) => feedback._id === feedbackToDelete
  );

  return (
    <div className="relative">
      <div className="mt-18">
        <StatsSection isDashboard={false} pageType="userFeedbacks" stats={feedbacks} />
      </div>
      
      <div className="mx-auto w-full md:w-[95%] px-4 md:px-0">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg z-0 -mt-12">
          {/* Header Section */}
          <div className="bg-gray-50 mt-0 px-4 md:px-6 py-4 rounded-lg border border-gray-200">
            {/* Desktop Layout - Single Row */}
            <div className="hidden md:flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <MessageSquare className="mr-2 text-gray-600" size={24} />
                Manage Feedbacks
              </h2>
              
              <div className="flex items-center gap-4 w-2/3">
                {/* Search Bar */}
                <div className="flex-grow">
                  <div className="relative w-full border border-gray-200 rounded-lg 
                      focus-within:border-gray-300 focus-within:ring-1 
                      focus-within:ring-lightBlue-500 transition-colors">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search feedbacks..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-lightBlue-500 
                   text-sm placeholder-gray-500"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => dispatch(setSearchTerm(""))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => setFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-300 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lightBlue-600 transition-colors"
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                  {appliedFiltersCount > 0 && (
                    <span className="ml-1 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
                      {appliedFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="md:hidden">
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <MessageSquare className="mr-2 text-gray-600" size={24} />
                Manage Feedbacks
              </h2>
              
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative w-full border border-gray-200 rounded-lg 
                    focus-within:border-gray-300 focus-within:ring-1 
                    focus-within:ring-lightBlue-500 transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search feedbacks..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-lightBlue-500 
                 text-sm placeholder-gray-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => dispatch(setSearchTerm(""))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-300 
                   hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lightBlue-600 transition-colors"
              >
                <Filter size={16} className="mr-2" />
                Filters
                {appliedFiltersCount > 0 && (
                  <span className="ml-1 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {appliedFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="bg-gray-50 shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 w-full">
                {/* Date Range filter */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <DatePicker
                      selected={localStartDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={localStartDate}
                      endDate={localEndDate}
                      placeholderText="Start Date"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600 h-[42px]"
                    />
                    <DatePicker
                      selected={localEndDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={localStartDate}
                      endDate={localEndDate}
                      minDate={localStartDate}
                      placeholderText="End Date"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600 h-[42px]"
                    />
                  </div>
                </div>

                {/* Clear & Apply buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center px-4 py-2 h-[42px] rounded-lg border border-gray-300 hover:bg-gray-50 text-sm md:text-base"
                  >
                    <X size={16} className="mr-1" />
                    Clear
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="px-4 py-2 h-[42px] rounded-lg bg-lightBlue-600 text-white hover:bg-lightBlue-700 text-sm md:text-base"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {appliedFiltersCount > 0 && (
            <div className="bg-gray-50 px-4 md:px-6 py-2 mt-2 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
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
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center mt-2 sm:mt-0"
              >
                <X size={14} className="mr-1" />
                Clear all
              </button>
            </div>
          )}

          {/* Table Section */}
          {loading ? (
            <Loader />
          ) : (
            <div className="pt-16 -mt-17 overflow-x-auto">
              <OrgUserFeedbackTable
                feedbacks={feedbacks}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
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

          {/* Modals */}
          <OrganizationFeedbackFormModal
            isOpen={isFeedbackFormModalOpen}
            onClose={() => setFeedbackFormModalOpen(false)}
            onSubmit={handleFormSubmit}
            feedbackData={feedbackToEdit}
          />

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