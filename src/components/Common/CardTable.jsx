import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Edit, Trash2, PlusCircle, Filter, Check, X } from 'lucide-react';
import ConfirmationModal from '../../components/Admin/Modals/ConformationModal';
import CardStats from '../../components/Admin/Cards/CardStats';

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

  // New state variables for pagination and search
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Existing useEffect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/niftydata');
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

  const getSortedData = (data) => {
    if (sortConfig.direction === 'none') return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  // Pagination and search calculations
  const filteredStocks = niftyData[0]?.stocks?.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const sortedStocks = getSortedData(filteredStocks);
  const paginatedStocks = sortedStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Existing sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  // Existing sort implementation

  // Rest of existing code remains unchanged
  // ... (toggleRow, handleActionClick, loading/error states)
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
      <div className="">
        {/* CardStats Section */}
        <div className="mx-2 overflow-hidden -mt-20">
          <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Filter className="mr-2 text-gray-600" size={20} />
              Nifty Data
            </h2>
            {/* Added search input */}
            <input
              type="text"
              placeholder="Search by Symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded shadow-md focus:outline-none"
            />
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
                      onClick={() => toggleRow(index)}
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

          {/* Added pagination controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(currentPage - 1)} 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(currentPage + 1)} 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
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