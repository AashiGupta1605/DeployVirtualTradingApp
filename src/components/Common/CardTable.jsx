import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, ChevronLeft, Edit, Trash2, PlusCircle, Filter, Check, X } from 'lucide-react';
import ConfirmationModal from '../../components/Admin/Modals/ConformationModal';
import CardStats from '../../components/Admin/Cards/CardStats';
import { BASE_API_URL } from '../../utils/BaseUrl';

const CardTable = () => {
  // Existing state variables
  const [niftyData, setNiftyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [expandedRow, setExpandedRow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);

  // Pagination and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Data fetching useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/admin/nifty/data`);
        if (response.data && Array.isArray(response.data)) {
          const sortedData = response.data.sort((a, b) => new Date(b.fetchTime) - new Date(a.fetchTime));
          setNiftyData([sortedData[0]]);
        } else {
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching Nifty data:', error);
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


   // Sorting logic
   const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (sortConfig.direction === 'none') {
      return data;
    }
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Pagination and filtering calculations
  const filteredStocks = niftyData[0]?.stocks?.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  
  const sortedStocks = getSortedData(filteredStocks);

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const paginatedStocks = sortedStocks.slice(indexOfFirstItem, indexOfLastItem);

  
  // Enhanced pagination rendering
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      );
    });
  };

 

  if (loading) {
    return (
      <div className="mt-12 flex items-center justify-center w-full h-64">
        <div className="flex flex-col items-center gap-4">
          <div
            className="border-blue-500 mt-72 inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <p className="text-gray-600 text-sm">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <>

        <div className="mx-2 overflow-hidden -mt-20">
          <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Filter className="mr-2 text-gray-600" size={20} />
              Nifty Data
            </h2>
            {/* <input
              type="text"
              placeholder="Search by Symbol..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-4 py-2 rounded shadow-md focus:outline-none"
            /> */}
             <div className="relative">
  <input
    type="text"
    placeholder="Search by symbol..."
    className="border p-2 pr-10 rounded w-full"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  {searchTerm && (
    <button
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-0"
      onClick={() => setSearchTerm("")}
    >
      ✕
    </button>
  )}
</div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-x-auto h-[28rem] overflow-y-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b sticky top-0">
                <tr>
                  {['symbol', 'open', 'dayHigh', 'dayLow', 'previousClose', 'lastPrice', 'change', 'pChange', 'totalTradedVolume', 'totalTradedValue', 'yearHigh', 'yearLow', 'perChange365d', 'perChange30d'].map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort(column)}
                    >
                      {column.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      {sortConfig.key === column && (sortConfig.direction === 'ascending' ? ' ▲' : sortConfig.direction === 'descending' ? ' ▼' : '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedStocks.map((row, index) => (
                  <React.Fragment key={index}>
                    <tr
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
                        <Link to={`/company/${row.symbol}`} className="text-blue-500 hover:text-blue-800">
                          {row.symbol}
                        </Link>
                      </td>
                      {['open', 'dayHigh', 'dayLow', 'previousClose', 'lastPrice', 'change', 'pChange', 'totalTradedVolume', 'totalTradedValue', 'yearHigh', 'yearLow', 'perChange365d', 'perChange30d'].map((field, idx) => (
                        <td key={idx} className="px-6 py-4">
                          {row[field]}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Updated pagination controls */}
          <div className="flex justify-between items-center mt-4 px-4 py-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-6 py-2 text-sm text-gray-600"
              >
                {[5, 10, 15, 25, 50, 100, 200].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <span className="text-sm text-gray-600">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredStocks.length)} {" "}
                 of {" "} {filteredStocks.length}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>

              {renderPageNumbers()}

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
     

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        message={`Are you sure you want to ${pendingAction} this stock?`}
      />
    </>
  );
};

export default CardTable;