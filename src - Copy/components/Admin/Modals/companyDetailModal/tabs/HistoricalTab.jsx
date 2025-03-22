import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  Calendar,
  Clock,
  Download,
  Filter,
  RefreshCcw,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Search
} from 'lucide-react';
import Pagination from '../../../../Common/TableItems/Pagination';

const TimeRangeButton = ({ label, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${active 
        ? 'bg-lightBlue-500 text-white shadow-sm' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }
    `}
  >
    {Icon && <Icon size={16} className="mr-2" />}
    {label}
  </button>
);

const TableHeader = ({ 
  column, 
  sortColumn, 
  sortDirection, 
  onSort 
}) => {
  const isSorted = sortColumn === column.key;
  
  return (
    <th 
      className="px-6 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 sticky top-0"
      onClick={() => onSort(column.key)}
    >
      <div className="flex items-center space-x-1">
        <span>{column.label}</span>
        <div className="flex flex-col">
          <ChevronUp 
            size={12} 
            className={`${isSorted && sortDirection === 'asc' ? 'text-lightBlue-500' : 'text-gray-400'}`}
          />
          <ChevronDown 
            size={12} 
            className={`${isSorted && sortDirection === 'desc' ? 'text-lightBlue-500' : 'text-gray-400'}`}
          />
        </div>
      </div>
    </th>
  );
};

const HistoricalTab = ({
  data,
  loading,
  error,
  onTimeRangeChange,
  onRefresh
}) => {
  // State management
  const [activeRange, setActiveRange] = useState('1D');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Time range options
  const timeRanges = [
    { label: '1D', value: '1D', icon: Clock },
    { label: '1W', value: '1W', icon: Calendar },
    { label: '1M', value: '1M', icon: Calendar },
    { label: '3M', value: '3M', icon: Calendar },
    { label: 'YTD', value: 'YTD', icon: Calendar },
  ];

  // Table columns configuration
  const columns = [
    { key: 'date', label: 'Date & Time' },
    { key: 'open', label: 'Open' },
    { key: 'high', label: 'High' },
    { key: 'low', label: 'Low' },
    { key: 'close', label: 'Close' },
    { key: 'change', label: 'Change (%)' },
    { key: 'volume', label: 'Volume' },
    { key: 'value', label: 'Value' },
  ];

  // Sorting and filtering logic
  const sortedAndFilteredData = useMemo(() => {
    let processedData = [...(data || [])];

    if (searchTerm) {
      processedData = processedData.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    processedData.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === 'date') {
        aValue = new Date(a.lastUpdateTime).getTime();
        bValue = new Date(b.lastUpdateTime).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    return processedData;
  }, [data, searchTerm, sortColumn, sortDirection]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-red-50 rounded-xl border border-red-200 p-6">
        <AlertCircle className="text-red-500 w-12 h-12 mb-4" />
        <p className="text-red-800 font-medium text-lg">Error Loading Data</p>
        <p className="text-red-600 text-sm mt-2">{error}</p>
        <button
          onClick={onRefresh}
          className="mt-4 flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls - Fixed at top */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {timeRanges.map(range => (
              <TimeRangeButton
                key={range.value}
                label={range.label}
                icon={range.icon}
                active={activeRange === range.value}
                onClick={() => {
                  setActiveRange(range.value);
                  onTimeRangeChange(range.value);
                }}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Container - Fixed height */}
      <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[550px]">
        {/* Table with sticky header and scrollable body */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-y-auto h-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-white z-10 border-b border-gray-200">
                <tr>
                  {columns.map(column => (
                    <TableHeader
                      key={column.key}
                      column={column}
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={(key) => {
                        if (sortColumn === key) {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortColumn(key);
                          setSortDirection('asc');
                        }
                      }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-lightBlue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-2 text-gray-500">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, index) => (
                    <tr 
                      key={row.id || index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(row.lastUpdateTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{row.open?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{row.high?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{row.low?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{row.close?.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium
                        ${row.pChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {row.pChange?.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {Number(row.volume).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{Number(row.value).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination - Fixed at bottom */}
        <div className="border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedAndFilteredData.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setCurrentPage={setCurrentPage}
            filteredItems={sortedAndFilteredData}
            indexOfFirstItem={(currentPage - 1) * itemsPerPage}
            indexOfLastItem={Math.min(currentPage * itemsPerPage, sortedAndFilteredData.length)}
          />
        </div>
      </div>
    </div>
  );
};

HistoricalTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    lastUpdateTime: PropTypes.string,
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    close: PropTypes.number,
    pChange: PropTypes.number,
    volume: PropTypes.number,
    value: PropTypes.number
  })),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onTimeRangeChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
};

HistoricalTab.defaultProps = {
  loading: false,
  error: null,
  data: []
};

export default HistoricalTab;