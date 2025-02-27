import React, { useMemo } from 'react';
import DatePicker from "react-datepicker";
import { 
  Filter, 
  X, 
  Search as SearchIcon, 
  ChevronDown, 
  ChevronUp,
  PlusCircle
} from 'lucide-react';
import PropTypes from 'prop-types';

const FILTER_CONFIGS = {
  queries: {
    type: {
      label: 'Type',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'Technical Support', label: 'Technical Support' },
        { value: 'Billing Issue', label: 'Billing Issue' },
        { value: 'Feedback', label: 'Feedback' },
        { value: 'General Inquiry', label: 'General Inquiry' }
      ]
    },
    dateRange: true
  },
  users: {
    gender: {
      label: 'Gender',
      options: [
        { value: 'all', label: 'All Genders' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    },
    dateRange: true
  },
  organizations: {
    status: {
      label: 'Status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'approved', label: 'Approved' },
        { value: 'pending', label: 'Pending' },
        { value: 'rejected', label: 'Rejected' }
      ]
    },
    dateRange: true
  }
};

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
  pageTitle = "Manage Items",
  showAddButton = false,
  onAddNew = null,
  addButtonText = "Add New",
  filterType = 'default'
}) => {
  const filterConfig = FILTER_CONFIGS[filterType] || {};

  const localActiveFilters = useMemo(() => {
    const filters = {
      search: !!searchQuery,
      dateRange: !!(tempFilters.startDate && tempFilters.endDate)
    };

    if (filterType === 'queries') {
      filters.type = tempFilters.type !== 'all';
    } else if (filterType === 'users') {
      filters.gender = tempFilters.gender !== 'all';
    } else if (filterType === 'organizations') {
      filters.status = tempFilters.status !== 'all';
    }

    return filters;
  }, [tempFilters, searchQuery, filterType]);

  

  const activeFiltersCount = useMemo(() => {
    return Object.values(localActiveFilters).filter(Boolean).length;
  }, [localActiveFilters]);

  const activeFiltersText = useMemo(() => {
    const activeFilterLabels = [];

    if (filterType === 'queries' && localActiveFilters.type) {
      activeFilterLabels.push(`Type: ${tempFilters.type}`);
    } else if (filterType === 'users' && localActiveFilters.gender) {
      activeFilterLabels.push(`Gender: ${tempFilters.gender}`);
    } else if (filterType === 'organizations' && localActiveFilters.status) {
      activeFilterLabels.push(`Status: ${tempFilters.status}`);
    }

    if (localActiveFilters.dateRange) {
      activeFilterLabels.push('Date Range');
    }

    if (localActiveFilters.search) {
      activeFilterLabels.push('Search');
    }

    if (activeFilterLabels.length === 0) return '';
    if (activeFilterLabels.length === 1) return `: ${activeFilterLabels[0]}`;
    return `: ${activeFilterLabels[0]} +${activeFilterLabels.length - 1}`;
  }, [localActiveFilters, tempFilters, filterType]);

  const renderTypeSpecificFilter = () => {
    const config = filterConfig[Object.keys(filterConfig)[0]];
    if (!config || !config.options) return null;

    return (
      <select
        name={filterType === 'queries' ? 'type' : filterType === 'users' ? 'gender' : 'status'}
        value={tempFilters[filterType === 'queries' ? 'type' : filterType === 'users' ? 'gender' : 'status']}
        onChange={handleTypeFilterChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
      >
        {config.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const getFilterOptions = () => {
    if (!filterConfig[Object.keys(filterConfig)[0]]) return [];
    return filterConfig[Object.keys(filterConfig)[0]].options || [];
  };

  return (
    <>
      {/* Header with Search and Filters */}
      <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
        <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
          <Filter className="mr-2 text-gray-600" size={20} />
          {pageTitle}
        </h2>
        
        <div className="flex items-center space-x-4">
          {/* Filter Button */}
          <div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 mr-4"
            >
              <Filter size={16} />
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-lightBlue-600 text-white rounded-full px-2 py-0.5 text-xs">
                  {activeFiltersCount}
                </span>
              )}
              {/* {activeFiltersText && (
                <span className="ml-2 text-gray-600 text-sm">
                  {activeFiltersText}
                </span>
              )} */}
              {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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

          {/* Add New Button */}
          {showAddButton && onAddNew && (
            <button
              onClick={onAddNew}
              className="flex items-center bg-lightBlue-600 text-white px-4 py-2 rounded-lg hover:bg-lightBlue-700 transition-colors"
            >
              <PlusCircle className="mr-2" size={16} />
              {addButtonText}
            </button>
          )}
        </div>
      </div>

{/* Filter Panel */}
{isFilterOpen && (
  <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out p-6">
    <div className="flex items-center space-x-6">
      {/* Type-specific Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {filterConfig[Object.keys(filterConfig)[0]]?.label}
        </label>
        <div className="w-full">
          {renderTypeSpecificFilter()}
        </div>
      </div>

      {/* Date Range Filter */}
      {filterConfig.dateRange && (
        <div className="flex-2 min-w-[400px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <DatePicker
                selected={tempFilters.startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={tempFilters.startDate}
                endDate={tempFilters.endDate}
                placeholderText="Start Date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
              />
            </div>
            <div className="flex-1">
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
      )}

      {/* Filter Actions */}
      <div className="flex flex-col justify-end">
        <label className="block text-sm font-medium text-gray-700 mb-1">
  
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              if (typeof applyFilters === 'function') {
                applyFilters();
                setIsFilterOpen(false);
              }
            }}
            className="px-4 py-2 rounded-lg bg-lightBlue-600 text-white hover:bg-lightBlue-700 whitespace-nowrap"
          >
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 whitespace-nowrap"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="bg-gray-50 px-6 py-2 mt-2 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Active Filters:</span>
            <div className="flex flex-wrap gap-2">
              {(localActiveFilters.type || localActiveFilters.gender || localActiveFilters.status) && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {filterConfig[Object.keys(filterConfig)[0]]?.label}: {
                    getFilterOptions().find(option => 
                      option.value === tempFilters[Object.keys(filterConfig)[0]]
                    )?.label
                  }
                </span>
              )}

              {localActiveFilters.dateRange && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Date Range: {tempFilters.startDate?.toLocaleDateString()} - {tempFilters.endDate?.toLocaleDateString()}
                </span>
              )}

              {localActiveFilters.search && (
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
    </>
  );
};

TableFilters.propTypes = {
  isFilterOpen: PropTypes.bool.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired,
  tempFilters: PropTypes.shape({
    type: PropTypes.string,
    gender: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date)
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
  pageTitle: PropTypes.string,
  showAddButton: PropTypes.bool,
  onAddNew: PropTypes.func,
  addButtonText: PropTypes.string,
  filterType: PropTypes.oneOf(['queries', 'users', 'organizations', 'default'])
};

export default TableFilters;