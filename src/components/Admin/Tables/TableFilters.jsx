import React from 'react';
import PropTypes from 'prop-types';
import { Filter, X, Search as SearchIcon } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TableFilters = ({
  isFilterOpen,
  setIsFilterOpen,
  tempFilters,
  handleTypeFilterChange,
  handleStartDateChange,
  handleEndDateChange,
  applyFilters,
  clearFilters,
  searchQuery,
  setSearchQuery,
  activeFilters,
  setActiveFilters,
}) => {
  // Internal functions for filter counting and display
  const getActiveFiltersCount = () => {
    let count = 0;
    if (tempFilters.type !== 'all') count++;
    if (tempFilters.startDate && tempFilters.endDate) count++;
    if (searchQuery) count++;
    return count;
  };

  const getActiveFiltersText = () => {
    const filters = [];
    if (tempFilters.type !== 'all') filters.push(tempFilters.type);
    if (tempFilters.startDate && tempFilters.endDate) filters.push('Date Range');
    if (searchQuery) filters.push('Search');
    
    if (filters.length === 0) return '';
    if (filters.length === 1) return `: ${filters[0]}`;
    return `: ${filters[0]} +${filters.length - 1}`;
  };

  return (
    <>
      {/* Header with Search and Filters */}
      <div className="mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
        <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
          <Filter className="mr-2 text-gray-600" size={20} />
          Manage Queries
        </h2>
        
        <div className="flex items-center space-x-4">
          {/* Filter Button */}
          <div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 
                         transition-colors duration-200 flex items-center space-x-2 mr-4"
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
        <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden 
                      transition-max-height duration-300 ease-in-out max-h-96 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={tempFilters.type}
                onChange={handleTypeFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-lightBlue-500"
              >
                <option value="all">All Types</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Billing Issue">Billing Issue</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="flex space-x-2">
                <DatePicker
                  selected={tempFilters.startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={tempFilters.startDate}
                  endDate={tempFilters.endDate}
                  placeholderText="Start Date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-lightBlue-500"
                />
                <DatePicker
                  selected={tempFilters.endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={tempFilters.startDate}
                  endDate={tempFilters.endDate}
                  minDate={tempFilters.startDate}
                  placeholderText="End Date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-lightBlue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={applyFilters}
              className="px-4 py-2 mx-4 rounded-lg bg-lightBlue-600 text-white 
                       hover:bg-lightBlue-700 transition-colors duration-150"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 
                       transition-colors duration-150"
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
              {tempFilters.type !== 'all' && (
                <span className="bg-lightBlue-100 text-blue-800 text-xs font-medium 
                               px-2.5 py-0.5 rounded-full">
                  {tempFilters.type}
                </span>
              )}
              {tempFilters.startDate && tempFilters.endDate && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium 
                               px-2.5 py-0.5 rounded-full">
                  Date Range: {tempFilters.startDate.toLocaleDateString()} - 
                  {tempFilters.endDate.toLocaleDateString()}
                </span>
              )}
              {searchQuery && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium 
                               px-2.5 py-0.5 rounded-full">
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
    </>
  );
};

TableFilters.propTypes = {
    isFilterOpen: PropTypes.bool.isRequired,
    setIsFilterOpen: PropTypes.func.isRequired,
    tempFilters: PropTypes.shape({
      type: PropTypes.string.isRequired,
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date),
    }).isRequired,
    handleTypeFilterChange: PropTypes.func.isRequired,
    handleStartDateChange: PropTypes.func.isRequired,
    handleEndDateChange: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    activeFilters: PropTypes.object.isRequired,
    setActiveFilters: PropTypes.func.isRequired,
  };
  
  export default TableFilters;