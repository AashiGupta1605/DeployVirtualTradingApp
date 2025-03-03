import React, { useMemo } from 'react';
import DatePicker from "react-datepicker";
import {
  Filter,
  X,
  Search as SearchIcon,
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
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

// Stars Component
const Stars = ({ rating, size = 16 }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={size}
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.number
};

// CustomOption Component
const CustomOption = ({ children, className = "", icon }) => (
  <div className={`flex items-center gap-2 px-2 py-1 ${className}`}>
    {icon && <span className="text-gray-500">{icon}</span>}
    {children}
  </div>
);

CustomOption.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node
};

// Filter Button Component
const FilterButton = ({ onClick, children, variant = "secondary" }) => (
  <button
    onClick={onClick}
    className={`h-10 px-4 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 
      ${variant === "primary" 
        ? "bg-lightBlue-600 text-white hover:bg-lightBlue-700" 
        : "border border-gray-300 hover:bg-gray-50"}`}
  >
    {children}
  </button>
);

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"])
};

// Common Filter Select Component
const FilterSelect = ({ name, value, onChange, options, label, width = "w-[200px]", icon }) => (
  <div className={width}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-10 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-lightBlue-500 text-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {typeof option.label === 'string' ? option.label : option.value}
          </option>
        ))}
      </select>
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
    </div>
  </div>
);

FilterSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  icon: PropTypes.node
};

// Date Range Filter Component
const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange, width = "w-[320px]" }) => (
  <div className={width}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      Date Range
    </label>
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="w-full h-10 pl-9 pr-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500 text-sm"
          dateFormat="dd/MM/yyyy"
          isClearable
        />
      </div>
      <div className="relative flex-1">
        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="w-full h-10 pl-9 pr-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-500 text-sm"
          dateFormat="dd/MM/yyyy"
          isClearable
        />
      </div>
    </div>
  </div>
);

DateRangeFilter.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  width: PropTypes.string
};

// Action Buttons Component with updated positioning
const ActionButtons = ({ onClear, onApply }) => (
  <div className="flex gap-2 ml-auto"> {/* Added ml-auto for right alignment */}
    <FilterButton onClick={onClear}>
      <X size={16} />
      Clear
    </FilterButton>
    <FilterButton onClick={onApply} variant="primary">
      Apply
    </FilterButton>
  </div>
);

ActionButtons.propTypes = {
  onClear: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired
};

// Updated Filter Configurations with all necessary filters
// Updated Filter Configurations with corrected organization status options
const FILTER_CONFIGS = {
  queries: {
    type: {
      label: 'Query Type',
      width: 'w-[250px]',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'Technical Support', label: 'Technical Support' },
        { value: 'Billing Issue', label: 'Billing Issue' },
        { value: 'Feedback', label: 'Feedback' },
        { value: 'General Inquiry', label: 'General Inquiry' }
      ]
    },
    status: {
      label: 'Status',
      width: 'w-[200px]',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'open', label: 'Open' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' }
      ]
    },
    dateRange: {
      width: 'w-[320px]'
    }
  },
  users: {
    status: {
      label: 'Status',
      width: 'w-[200px]',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'disabled', label: 'Disabled' }
      ]
    },
    gender: {
      label: 'Gender',
      width: 'w-[180px]',
      options: [
        { value: 'all', label: 'All Genders' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    dateRange: {
      width: 'w-[320px]'
    }
  },
  organizations: {
    status: {
      label: 'Status',
      width: 'w-[200px]',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'Approved', label: <CustomOption icon={<UserCheck size={16} />}>Approved</CustomOption> },
        { value: 'Pending', label: <CustomOption icon={<Clock size={16} />}>Pending</CustomOption> },
        { value: 'Rejected', label: <CustomOption icon={<X size={16} />}>Rejected</CustomOption> }
      ]
    },
    dateRange: {
      width: 'w-[320px]'
    }
  },
  feedback: {
    category: {
      label: 'Category',
      width: 'w-[220px]',
      options: [
        { value: 'All', label: <CustomOption icon={<MessageSquare size={16} />}>All Categories</CustomOption> },
        { value: 'Website UI/UX', label: <CustomOption icon={<MessageSquare size={16} />}>Website UI/UX</CustomOption> },
        { value: 'Trading Features', label: <CustomOption icon={<MessageSquare size={16} />}>Trading Features</CustomOption> },
        { value: 'Data Accuracy', label: <CustomOption icon={<MessageSquare size={16} />}>Data Accuracy</CustomOption> },
        { value: 'Performance & Speed', label: <CustomOption icon={<MessageSquare size={16} />}>Performance & Speed</CustomOption> },
        { value: 'Customer Support', label: <CustomOption icon={<MessageSquare size={16} />}>Customer Support</CustomOption> },
        { value: 'Other', label: <CustomOption icon={<MessageSquare size={16} />}>Other</CustomOption> }
      ]
    },
    status: {
      label: 'Status',
      width: 'w-[180px]',
      options: [
        { 
          value: 'All', 
          label: <CustomOption icon={<UserCheck size={16} />}>All</CustomOption> 
        },
        { 
          value: 'Approved', // lowercase to match backend
          label: <CustomOption icon={<UserCheck size={16} />}>Approved</CustomOption> 
        },
        { 
          value: 'Rejected', // lowercase to match backend
          label: <CustomOption icon={<X size={16} />}>Rejected</CustomOption> 
        }
      ]
    },
    rating: {
      label: 'Rating',
      width: 'w-[200px]',
      options: [
        { value: 'All', label: <CustomOption>All Ratings</CustomOption> },
        { value: '5', label: <CustomOption><Stars rating={5} size={16} /><span>5 Stars</span></CustomOption> },
        { value: '4', label: <CustomOption><Stars rating={4} size={16} /><span>4 Stars</span></CustomOption> },
        { value: '3', label: <CustomOption><Stars rating={3} size={16} /><span>3 Stars</span></CustomOption> },
        { value: '2', label: <CustomOption><Stars rating={2} size={16} /><span>2 Stars</span></CustomOption> },
        { value: '1', label: <CustomOption><Stars rating={1} size={16} /><span>1 Star</span></CustomOption> }
      ]
    },
    dateRange: {
      width: 'w-[320px]'
    }
  }
};

// Layout configuration
const LAYOUT_CONFIGS = {
  queries: {
    type: 'inline',
    spacing: 'gap-4',
    containerClass: 'flex items-end',
    filtersClass: 'flex items-end gap-4 flex-grow'
  },
  users: {
    type: 'inline',
    spacing: 'gap-4',
    containerClass: 'flex items-end',
    filtersClass: 'flex items-end gap-4 flex-grow'
  },
  organizations: {
    type: 'inline',
    spacing: 'gap-4',
    containerClass: 'flex items-end',
    filtersClass: 'flex items-end gap-4 flex-grow'
  },
  feedback: {
    type: 'inline',
    spacing: 'gap-4',
    containerClass: 'flex items-end',
    filtersClass: 'flex items-end gap-4 flex-grow'
  }
};

// Inline Filter Layout (for queries, users, and organizations)
const InlineFilterLayout = ({
  filterConfig,
  tempFilters,
  handleFilterChange,
  handleStartDateChange,
  handleEndDateChange,
  applyFilters,
  clearFilters,
  setIsFilterOpen,
  filterType
}) => {
  // Function to render filters based on filter type
  const renderFilters = () => {
    const filters = [];

    // Add status filter for users and organizations
    if ((filterType === 'users' || filterType === 'organizations') && filterConfig.status) {
      filters.push(
        <FilterSelect
          key="status"
          name="status"
          value={tempFilters.status}
          onChange={handleFilterChange}
          options={filterConfig.status.options}
          label={filterConfig.status.label}
          width={filterConfig.status.width}
          icon={filterConfig.status.icon}
        />
      );
    }

    // Add gender filter for users
    if (filterType === 'users' && filterConfig.gender) {
      filters.push(
        <FilterSelect
          key="gender"
          name="gender"
          value={tempFilters.gender}
          onChange={handleFilterChange}
          options={filterConfig.gender.options}
          label={filterConfig.gender.label}
          width={filterConfig.gender.width}
          icon={filterConfig.gender.icon}
        />
      );
    }

    // Add query type filter for queries
    if (filterType === 'queries' && filterConfig.type) {
      filters.push(
        <FilterSelect
          key="type"
          name="type"
          value={tempFilters.type}
          onChange={handleFilterChange}
          options={filterConfig.type.options}
          label={filterConfig.type.label}
          width={filterConfig.type.width}
          icon={filterConfig.type.icon}
        />
      );
    }

    return filters;
  };

  return (
    <div className="flex items-end w-full">
      <div className="flex items-end gap-4 flex-grow">
        {/* Render specific filters based on filter type */}
        {renderFilters()}

        {/* Date Range Filter */}
        {filterConfig.dateRange && (
          <DateRangeFilter
            startDate={tempFilters.startDate}
            endDate={tempFilters.endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            width={filterConfig.dateRange.width}
          />
        )}
      </div>

      <div className="ml-6">
        <ActionButtons
          onClear={clearFilters}
          onApply={() => {
            applyFilters();
            setIsFilterOpen(false);
          }}
        />
      </div>
    </div>
  );
};

InlineFilterLayout.propTypes = {
  filterConfig: PropTypes.object.isRequired,
  tempFilters: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired
};

// Feedback Filter Layout
const FeedbackFilterLayout = ({
  filterConfig,
  tempFilters,
  handleFilterChange,
  handleStartDateChange,
  handleEndDateChange,
  applyFilters,
  clearFilters,
  setIsFilterOpen
}) => {
  return (
    <div className="flex items-end w-full">
      <div className="flex items-end gap-4 flex-grow">
        {/* Category Filter */}
        <FilterSelect
          name="category"
          value={tempFilters.category}
          onChange={handleFilterChange}
          options={filterConfig.category.options}
          label={filterConfig.category.label}
          width={filterConfig.category.width}
          icon={filterConfig.category.icon}
        />

        {/* Status Filter */}
        <FilterSelect
          name="status"
          value={tempFilters.status}
          onChange={handleFilterChange}
          options={filterConfig.status.options}
          label={filterConfig.status.label}
          width={filterConfig.status.width}
          icon={filterConfig.status.icon}
        />

        {/* Rating Filter */}
        <FilterSelect
          name="rating"
          value={tempFilters.rating}
          onChange={handleFilterChange}
          options={filterConfig.rating.options}
          label={filterConfig.rating.label}
          width={filterConfig.rating.width}
          icon={filterConfig.rating.icon}
        />

        {/* Date Range */}
        <DateRangeFilter
          startDate={tempFilters.startDate}
          endDate={tempFilters.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          width={filterConfig.dateRange.width}
        />
      </div>

      <div className="ml-6">
        <ActionButtons
          onClear={clearFilters}
          onApply={() => {
            applyFilters();
            setIsFilterOpen(false);
          }}
        />
      </div>
    </div>
  );
};

FeedbackFilterLayout.propTypes = {
  filterConfig: PropTypes.object.isRequired,
  tempFilters: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired
};

// Active Filters Display Component
const ActiveFiltersDisplay = ({
  activeFilters,
  tempFilters,
  searchQuery,
  filterConfig,
  clearFilters,
  filterType
}) => {
  const renderFilterValue = (key, value, config) => {
    if (key === 'search') {
      return `${searchQuery}`;
    }
    if (key === 'dateRange') {
      return `${tempFilters.startDate?.toLocaleDateString()} - ${tempFilters.endDate?.toLocaleDateString()}`;
    }

    // Special rendering for feedback filters
    if (filterType === 'feedback') {
      if (key === 'rating') {
        return (
          <div className="flex items-center gap-1">
            <Stars rating={parseInt(value)} size={14} />
            <span>{value} Star{value !== '1' ? 's' : ''}</span>
          </div>
        );
      }
      if (key === 'recommend') {
        return (
          <div className="flex items-center gap-1">
            {value === 'true' ? (
              <>
                <ThumbsUp size={14} className="text-green-500" />
                <span>Recommended</span>
              </>
            ) : (
              <>
                <ThumbsDown size={14} className="text-red-500" />
                <span>Not Recommended</span>
              </>
            )}
          </div>
        );
      }
    }

    // For users and organizations specific filters
    if (key === 'status' || key === 'gender' || key === 'type') {
      const option = config?.options.find(opt => opt.value === value);
      return option?.label || value;
    }

    const option = config?.options?.find(opt => opt.value === value);
    return option?.label || value;
  };

  const getFilterLabel = (key) => {
    switch (key) {
      case 'search':
        return 'Search';
      case 'dateRange':
        return 'Date Range';
      case 'status':
        return 'Status';
      case 'gender':
        return 'Gender';
      case 'type':
        return 'Type';
      case 'category':
        return 'Category';
      case 'rating':
        return 'Rating';
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  return (
    <div className="bg-gray-50 mt-0 px-6 py-2 rounded-lg flex items-center justify-between border border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-small text-gray-600">Active Filters:</span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, isActive]) => {
            if (!isActive) return null;

            const config = filterConfig[key];
            const value = tempFilters[key];
            const label = getFilterLabel(key);
            
            return (
              <span
                key={key}
                className="bg-blue-50 text-blue-700 text-sm font-small px-3 py-1 
                         rounded-full flex items-center gap-2 border border-blue-100"
              >
                {config?.icon && <span className="text-blue-500">{config.icon}</span>}
                <span className="font-semibold">{label}:</span>
                <span className="flex items-center gap-1">
                  {renderFilterValue(key, value, config)}
                </span>
              </span>
            );
          })}
        </div>
      </div>
      
      <button
        onClick={clearFilters}
        className="text-sm text-gray-600 hover:text-gray-800 flex items-center font-medium"
      >
        <X size={16} className="mr-1" />
        Clear All
      </button>
    </div>
  );
};

ActiveFiltersDisplay.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  tempFilters: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  filterConfig: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired
};

// Search Bar Component
const SearchBar = ({ searchQuery, setSearchQuery, setActiveFilters }) => (
  <div className="relative w-[300px]">
    <SearchIcon 
      size={18} 
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
    />
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setActiveFilters(prev => ({ ...prev, search: e.target.value !== '' }));
      }}
      className="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-lightBlue-500 
                 text-sm placeholder-gray-500"
    />
    {searchQuery && (
      <button
        onClick={() => {
          setSearchQuery("");
          setActiveFilters(prev => ({ ...prev, search: false }));
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    )}
  </div>
);

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setActiveFilters: PropTypes.func.isRequired
};

// Main TableFilters Component
const TableFilters = ({
  isFilterOpen,
  setIsFilterOpen,
  tempFilters,
  handleFilterChange,
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
  const layoutConfig = LAYOUT_CONFIGS[filterType] || {};

  // Calculate active filters
  const localActiveFilters = useMemo(() => {
    const filters = {
      search: !!searchQuery,
      dateRange: !!(tempFilters.startDate && tempFilters.endDate)
    };

    // Add type-specific filters
    if (filterType === 'users') {
      filters.status = tempFilters.status !== 'all';
      filters.gender = tempFilters.gender !== 'all';
    } else if (filterType === 'organizations') {
      filters.status = tempFilters.status !== 'all';
    } else if (filterType === 'queries') {
      filters.type = tempFilters.type !== 'all';
      filters.status = tempFilters.status !== 'all';
    } else if (filterType === 'feedback') {
      filters.category = tempFilters.category !== 'all';
      filters.status = tempFilters.status !== 'all';
      filters.rating = tempFilters.rating !== 'all';
    }

    return filters;
  }, [tempFilters, searchQuery, filterType]);

  const activeFiltersCount = useMemo(() =>
    Object.values(localActiveFilters).filter(Boolean).length,
    [localActiveFilters]
  );

  // Get the appropriate icon for the page title
  const getTitleIcon = () => {
    switch (filterType) {
      case 'queries':
        return <MessageSquare className="mr-2 text-gray-600" size={24} />;
      case 'users':
        return <Users className="mr-2 text-gray-600" size={24} />;
      case 'organizations':
        return <Building2 className="mr-2 text-gray-600" size={24} />;
      case 'feedback':
        return <MessageSquare className="mr-2 text-gray-600" size={24} />;
      default:
        return <Filter className="mr-2 text-gray-600" size={24} />;
    }
  };

  // Render appropriate filter layout based on type
  const renderFilterLayout = () => {
    switch (filterType) {
      case 'feedback':
        return (
          <FeedbackFilterLayout
            filterConfig={filterConfig}
            tempFilters={tempFilters}
            handleFilterChange={handleFilterChange}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            setIsFilterOpen={setIsFilterOpen}
          />
        );
      case 'queries':
      case 'users':
      case 'organizations':
        return (
          <InlineFilterLayout
            filterConfig={filterConfig}
            tempFilters={tempFilters}
            handleFilterChange={handleFilterChange}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            setIsFilterOpen={setIsFilterOpen}
            filterType={filterType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-white mb-0 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          {getTitleIcon()}
          {pageTitle}
        </h2>

        <div className="flex items-center space-x-4">
          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="h-10 px-4 rounded-lg mr-4 border border-gray-300 
                     hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter size={18} />
            {activeFiltersCount > 0 && (
              <span className="ml-1 bg-lightBlue-600 text-white rounded-full px-2.5 py-0.5 text-xs font-medium">
                {activeFiltersCount}
              </span>
            )}
            {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveFilters={setActiveFilters}
          />

          {/* Add Button */}
          {showAddButton && onAddNew && (
            <button
              onClick={onAddNew}
              className="h-10 px-4 bg-lightBlue-600 text-white rounded-lg 
                       hover:bg-lightBlue-700 transition-colors flex items-center"
            >
              <PlusCircle size={18} className="mr-2" />
              <span className="font-medium">{addButtonText}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className={`bg-gray-50 mb-0 shadow-l p-6 border border-gray-200 
                        ${layoutConfig.containerClass || ''}`}>
          {renderFilterLayout()}
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <ActiveFiltersDisplay
          activeFilters={localActiveFilters}
          tempFilters={tempFilters}
          searchQuery={searchQuery}
          filterConfig={filterConfig}
          clearFilters={clearFilters}
          filterType={filterType}
        />
      )}
    </div>
  );
};

// PropTypes validation
TableFilters.propTypes = {
  isFilterOpen: PropTypes.bool.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired,
  tempFilters: PropTypes.shape({
    category: PropTypes.string,
    status: PropTypes.string,
    rating: PropTypes.string,
    recommend: PropTypes.string,
    type: PropTypes.string,
    gender: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date)
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
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
  filterType: PropTypes.oneOf(['queries', 'users', 'organizations', 'feedback', 'default'])
};

// Default props
TableFilters.defaultProps = {
  pageTitle: "Manage Items",
  showAddButton: false,
  onAddNew: null,
  addButtonText: "Add New",
  filterType: 'default'
};

export default TableFilters;