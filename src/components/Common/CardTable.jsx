// CardTable.jsx - Part 1
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  ChevronDown, 
  ChevronRight, 
  Filter, 
  RefreshCw,
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  BarChart3,
  Clock,
  Award 
} from 'lucide-react';
import { BASE_API_URL } from '../../utils/BaseUrl';
import Pagination from '../Common/TableItems/Pagination';
import CompanyDetailModal from '../Admin/Modals/CompanyDetailModal';

const CardTable = () => {
  // State Management
  const [niftyData, setNiftyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  // Cache implementation
  const cache = useMemo(() => new Map(), []);

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  // Symbol click handler
  const handleSymbolClick = (symbol, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSymbol(symbol);
    setIsModalOpen(true);
  };

  // Data fetching with retry logic
  const fetchDataWithRetry = async (page, retries = 3) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/admin/nifty/data`, {
        params: {
          page,
          limit: itemsPerPage,
          search: searchTerm
        },
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchDataWithRetry(page, retries - 1);
      }
      throw error;
    }
  };

  // Main fetch function
  const fetchData = async (page = 1) => {
    const cacheKey = `nifty-data-${page}-${searchTerm}`;
    
    if (cache.has(cacheKey)) {
      setNiftyData(cache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, pagination: paginationData } = await fetchDataWithRetry(page);
      
      cache.set(cacheKey, data);
      setNiftyData(data);
    } catch (error) {
      console.error('Error fetching Nifty data:', error);
      setError(`Failed to fetch data. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Effect for fetching data
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchTerm, itemsPerPage]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== "") {
        setCurrentPage(1);
        fetchData(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sort data function
  const getSortedData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    if (sortConfig.direction === 'none') return data;

    return [...data].sort((a, b) => {
      const valueA = a[sortConfig.key] ?? "";
      const valueB = b[sortConfig.key] ?? "";

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "ascending" 
          ? valueA - valueB 
          : valueB - valueA;
      } else {
        return sortConfig.direction === "ascending"
          ? valueA.toString().localeCompare(valueB.toString())
          : valueB.toString().localeCompare(valueA.toString());
      }
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="mt-12 flex items-center justify-center w-full h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="border-blue-500 mt-72 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="text-gray-600 text-sm">Loading data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => fetchData(currentPage)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }
  // CardTable.jsx - Part 2 (continuing from Part 1)

  // Pagination calculations
  const filteredItems = getSortedData(niftyData[0]?.stocks || [])
    .filter(stock => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <>
      <div className="mx-2 overflow-hidden mt-5">
        {/* Header Section */}
        <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Filter className="mr-2 text-gray-600" size={20} />
            Nifty Data
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by symbol..."
              className="border p-2 pr-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto h-[28rem] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b sticky top-0">
              <tr>
                {[
                  'symbol',
                  'open',
                  'dayHigh',
                  'dayLow',
                  'previousClose',
                  'lastPrice',
                  'change',
                  'pChange',
                  'totalTradedVolume',
                  'totalTradedValue',
                  'yearHigh',
                  'yearLow',
                  'perChange365d',
                  'perChange30d'
                ].map((column) => (
                  <th
                    key={column}
                    onClick={() => requestSort(column)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                      {sortConfig.key === column && (
                        <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      expandedRow === index ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 flex items-center">
                      {expandedRow === index ? (
                        <ChevronDown className="mr-2 text-gray-500" size={16} />
                      ) : (
                        <ChevronRight className="mr-2 text-gray-500" size={16} />
                      )}
                      <button
                        onClick={(e) => handleSymbolClick(row.symbol, e)}
                        className="text-blue-500 hover:text-blue-800"
                      >
                        {row.symbol}
                      </button>
                    </td>
                    {[
                      'open',
                      'dayHigh',
                      'dayLow',
                      'previousClose',
                      'lastPrice',
                      'change',
                      'pChange',
                      'totalTradedVolume',
                      'totalTradedValue',
                      'yearHigh',
                      'yearLow',
                      'perChange365d',
                      'perChange30d'
                    ].map((field, idx) => (
                      <td key={idx} className="px-6 py-4">
                        {typeof row[field] === 'number'
                          ? field.includes('Change')
                            ? `${row[field].toFixed(2)}%`
                            : field.includes('tradedValue')
                            ? `₹${row[field].toLocaleString()}`
                            : field.includes('Price') || field.includes('High') || field.includes('Low') || field.includes('open')
                            ? `₹${row[field].toLocaleString()}`
                            : row[field].toLocaleString()
                          : row[field] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4 px-4 py-3 bg-white border rounded-lg">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm text-gray-600"
            >
              {[5, 10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <span className="text-sm text-gray-600">
              {`${indexOfFirstItem + 1}-${Math.min(
                indexOfLastItem,
                filteredItems.length
              )} of ${filteredItems.length}`}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
            >
              <ChevronRight className="rotate-180" size={20} />
            </button>
            
            {/* Page numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => 
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 py-1">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <CompanyDetailModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  symbol={selectedSymbol}
  type="nifty"
/>

    </>
  );
};

export default CardTable;