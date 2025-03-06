import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizationUsersFeedbacks,
  deleteOrganizationUsersFeedback,
  updateOrganizationUsersFeedback,
  updateOrganizationUsersFeedbackStatus,
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
import { Filter, X, SearchIcon } from "lucide-react";
import { getAppliedFiltersCount, getAppliedFiltersText } from "../../../utils/filterFunctions";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dashboard from "../../../components/Organization/Dashboards/Dashboard";

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
      // Implement the create feedback logic here
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
  };

  const appliedFiltersCount = getAppliedFiltersCount({ startDate, endDate });
  const appliedFiltersText = getAppliedFiltersText({ startDate, endDate });

  const feedbackToDeleteDetails = feedbacks.find(
    (feedback) => feedback._id === feedbackToDelete
  );

  return (
    <div className="relative">
      <Dashboard type="organization-user-feedback" showAllCards={false} showCardsTable={false} />
      <div className="mx-auto w-[95%]">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg -mt-28">
          <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b z-20">
            <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
              <Filter className="mr-2 text-gray-600" size={20} />
              Manage Feedbacks
            </h2>

            <div className="flex items-center space-x-4">
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

          {isFilterOpen && (
            <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6 z-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {loading ? (
            <Loader />
          ) : (
            <div className="pt-16 -mt-17">
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