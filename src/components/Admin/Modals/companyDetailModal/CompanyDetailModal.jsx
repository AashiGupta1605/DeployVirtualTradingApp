// components/Common/Modals/CompanyDetailModal.jsx - Part 1

import React, { useState, useEffect } from 'react';
import { X, ArrowUpCircle, ArrowDownCircle, TrendingUp, BarChart3, Clock, Award } from 'lucide-react';
import { BASE_API_URL } from '../../../../utils/BaseUrl';
import Pagination from '../../../Common/TableItems/Pagination';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';


const LoadingSpinner = ({ message = "Loading data..." }) => (
  <div className="flex items-center justify-center h-[400px]">
    <div className="flex flex-col items-center gap-6">
      <div className="border-blue-500 inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-r-transparent align-[-0.125em]" role="status"></div>
      <div className="text-center">
        <p className="text-gray-800 text-lg font-medium">{message}</p>
        <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest information</p>
      </div>
    </div>
  </div>
);

const CompanyDetailModal = ({ isOpen, onClose, symbol, type = 'nifty' }) => {
  // State Management
  const [data, setData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('1D');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [chartData, setChartData] = useState({
    candlestick: []
  });

  // Pagination helper function
  const getPaginationData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = historicalData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(historicalData.length / itemsPerPage);

    return {
      indexOfLastItem,
      indexOfFirstItem,
      currentItems,
      totalPages
    };
  };

  // Process data for charts
  const processChartData = (data) => {
    if (!Array.isArray(data)) {
      console.error('Invalid chart data format:', data);
      return;
    }

    const candlestick = data.map(item => {
      // Ensure all values are numbers and not null/undefined
      const open = Number(item.open) || 0;
      const high = Number(item.high) || 0;
      const low = Number(item.low) || 0;
      const close = Number(item.close) || 0;
  
      return {
        x: new Date(item.date).getTime(),
        y: [open, high, low, close]
      };
    });
  
    setChartData({ candlestick });
  };

  // Filter change handler
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
    fetchHistoricalData(filter);
  };

  // components/Common/Modals/CompanyDetailModal.jsx - Part 2

  const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-2">Current Price</p>
        <div className="flex items-center">
          {data?.change >= 0 ? 
            <ArrowUpCircle className="text-green-500 mr-2" size={24} /> : 
            <ArrowDownCircle className="text-red-500 mr-2" size={24} />
          }
          <p className="text-xl font-bold text-gray-800">₹{data?.lastPrice}</p>
        </div>
        <p className={`text-sm mt-2 ${data?.pChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {data?.pChange}% {data?.change >= 0 ? 'Increase' : 'Decrease'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-2">Trading Volume</p>
        <div className="flex items-center">
          <BarChart3 className="text-blue-500 mr-2" size={24} />
          <p className="text-xl font-bold text-gray-800">
            {Number(data?.totalTradedVolume).toLocaleString()}
          </p>
        </div>
        <p className="text-sm mt-2 text-gray-500">Total Shares Traded Today</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-2">52 Week Range</p>
        <div className="flex items-center">
          <TrendingUp className="text-purple-500 mr-2" size={24} />
          <p className="text-xl font-bold text-gray-800">₹{data?.yearHigh}</p>
        </div>
        <p className="text-sm mt-2 text-gray-500">Low: ₹{data?.yearLow}</p>
      </div>
    </div>
  );

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <Clock className="mr-2" size={20} />
          Trading Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Open</p>
            <p className="font-semibold text-gray-800">₹{data?.open}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Previous Close</p>
            <p className="font-semibold text-gray-800">₹{data?.previousClose}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Day High</p>
            <p className="font-semibold text-gray-800">₹{data?.dayHigh}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Day Low</p>
            <p className="font-semibold text-gray-800">₹{data?.dayLow}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <Award className="mr-2" size={20} />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">1 Month Return</p>
            <p className={`font-semibold ${data?.perChange30d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data?.perChange30d}%
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">1 Year Return</p>
            <p className={`font-semibold ${data?.perChange365d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data?.perChange365d}%
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Traded Value</p>
            <p className="font-semibold text-gray-800">
              ₹{Number(data?.totalTradedValue).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Data fetching functions
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const currentEndpoint = type === 'etf' 
        ? `${BASE_API_URL}/admin/etf/${symbol}`
        : `${BASE_API_URL}/admin/nifty/company/${symbol}`;
  
      const response = await fetch(currentEndpoint);
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const currentData = await response.json();
      setData(currentData);
  
      // Fetch historical data with 1D filter initially
      await fetchHistoricalData('1D');
  
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // components/Common/Modals/CompanyDetailModal.jsx - Part 3

const fetchHistoricalData = async (timeRange = '') => {
  try {
    setHistoricalLoading(true);
    
    let endpoint;
    if (type === 'nifty') {
      // Only use nifty endpoints
      endpoint = activeTab === 'chart'
        ? `${BASE_API_URL}/admin/nifty/company/chart/${symbol}`
        : `${BASE_API_URL}/admin/nifty/company/history/${symbol}`;
    } else {
      // For ETF, only use history endpoint
      endpoint = `${BASE_API_URL}/admin/etf/historical/${symbol}`;
    }

    const url = `${endpoint}?timeRange=${timeRange}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    if (activeTab === 'chart' && type === 'nifty') {
      processChartData(data);
    } else {
      setHistoricalData(Array.isArray(data) ? data : []);
    }

  } catch (err) {
    console.error('Error fetching data:', err);
    setError(err.message);
  } finally {
    setHistoricalLoading(false);
  }
};

const renderChartTab = () => {
  if (type === 'etf') {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-2">Chart view is not available for ETFs</p>
          <p className="text-gray-400 text-sm">Please use the Historical Data tab to view ETF data</p>
        </div>
      </div>
    );
  }

  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 400,
      toolbar: {
        show: false
      },
      background: '#fff'
    },
    title: {
      text: `${symbol} Price Chart`,
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#1f2937'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'inherit'
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM'
        }
      },
      axisBorder: {
        show: true,
        color: '#e5e7eb'
      },
      axisTicks: {
        show: true,
        color: '#e5e7eb'
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: (value) => `₹${value.toFixed(2)}`,
        style: {
          fontSize: '12px',
          fontFamily: 'inherit'
        }
      }
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#26C281',
          downward: '#ED5565'
        },
        wick: {
          useFillColor: true,
        }
      }
    },
    tooltip: {
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex] || 0;
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex] || 0;
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex] || 0;
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex] || 0;
        const date = new Date(w.globals.seriesX[seriesIndex][dataPointIndex]);
        
        return `
          <div class="p-2 bg-white rounded-lg shadow-md border border-gray-200">
            <div class="font-medium text-gray-800 mb-1">
              ${date.toLocaleDateString('en-GB', { 
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="text-gray-600">Open:</div>
              <div class="font-medium">₹${o.toFixed(2)}</div>
              <div class="text-gray-600">High:</div>
              <div class="font-medium">₹${h.toFixed(2)}</div>
              <div class="text-gray-600">Low:</div>
              <div class="font-medium">₹${l.toFixed(2)}</div>
              <div class="text-gray-600">Close:</div>
              <div class="font-medium">₹${c.toFixed(2)}</div>
            </div>
          </div>
        `;
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {/* Filter Buttons Section */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Time Range:</span>
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-lg">
            {['1D', '1W', '1M', '3M'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {historicalLoading ? (
        <LoadingSpinner message="Loading chart data..." />
      ) : (
        <div className="chart-container">
          <ReactApexChart
            options={chartOptions}
            series={[{ data: chartData.candlestick }]}
            type="candlestick"
            height={400}
          />
        </div>
      )}

      {/* Empty State */}
      {!historicalLoading && chartData.candlestick.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg">No chart data available</p>
          <p className="text-gray-400 text-sm mt-2">Try changing the time range filter</p>
        </div>
      )}
    </div>
  );
};

// components/Common/Modals/CompanyDetailModal.jsx - Part 4

const renderHistoricalTab = () => {
  const { indexOfLastItem, indexOfFirstItem, currentItems, totalPages } = getPaginationData();

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
      {/* Filter Buttons Section */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Time Range:</span>
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-lg">
            {['1D', '1W', '1M', '3M'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Data Table */}
      {historicalLoading ? (
        <LoadingSpinner message="Loading historical trading data..." />
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Open
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    High
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Low
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Close
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Change (%)
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(data.lastUpdateTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{data.open?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{data.dayHigh?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{data.dayLow?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{data.lastPrice?.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium
                      ${data.pChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {data.pChange?.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Number(data.totalTradedVolume).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{Number(data.totalTradedValue).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {currentItems.length === 0 && !historicalLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 text-lg">No historical data available</p>
              <p className="text-gray-400 text-sm mt-2">Try changing the time range filter</p>
            </div>
          )}

          {/* Pagination Component */}
          {currentItems.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
              setCurrentPage={setCurrentPage}
              filteredItems={historicalData}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
            />
          )}
        </div>
      )}
    </div>
  );
};

useEffect(() => {
  if (isOpen && symbol) {
    setActiveFilter('1D');
    setCurrentPage(1);
    fetchData();
  }
}, [isOpen, symbol, type]);

// components/Common/Modals/CompanyDetailModal.jsx - Part 5

if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
    <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
    
    <div className="relative w-[95%] max-w-7xl h-[85vh] mx-auto my-6 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
      {/* Modal Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-lightBlue-50 to-lightBlue-100 rounded-t-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-chart-line text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {type === 'etf' ? 'ETF Details' : 'Stock Details'}
            </h2>
            <p className="text-sm text-gray-600">
              View detailed {type === 'etf' ? 'ETF' : 'stock'} information and historical data
            </p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200"
        >
          <X className="text-gray-500" size={24} />
        </button>
      </div>

      {/* Symbol Section */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-lightBlue-100 rounded-full flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-lightBlue-600">
              {symbol?.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{symbol}</h3>
            {!loading && data && (
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${data?.pChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  shadow-sm`}>
                  {data?.pChange >= 0 ? 'Trending Up' : 'Trending Down'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 overflow-y-auto" style={{ height: 'calc(70vh - 100px)' }}>
        {error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-red-500 p-6 bg-red-50 rounded-xl">
              <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
              <p className="text-lg">{error}</p>
            </div>
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <QuickStats />
            
            <div className="bg-gradient-to-r from-lightBlue-50 to-lightBlue-100 p-6 rounded-xl shadow-sm my-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-lightBlue-800">
                    {type === 'etf' ? 'ETF Analysis' : 'Stock Analysis'}
                  </h3>
                  <p className="text-lightBlue-600 mt-1">Current and historical performance data</p>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-4">
                <button
                  className={`px-4 py-2 font-medium text-sm rounded-lg transition-all duration-200 ${
                    activeTab === 'overview'
                      ? 'bg-lightBlue-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                {type === 'nifty' && (
                  <button
                    className={`px-4 py-2 font-medium text-sm rounded-lg transition-all duration-200 ${
                      activeTab === 'chart'
                        ? 'bg-lightBlue-500 text-white shadow-md'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('chart')}
                  >
                    Chart
                  </button>
                )}
                <button
                  className={`px-4 py-2 font-medium text-sm rounded-lg transition-all duration-200 ${
                    activeTab === 'historical'
                      ? 'bg-lightBlue-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('historical')}
                >
                  Historical Data
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' 
              ? renderOverviewTab() 
              : activeTab === 'chart' && type === 'nifty'
              ? renderChartTab()
              : renderHistoricalTab()}
          </>
        )}
      </div>
    </div>
  </div>
);
};

CompanyDetailModal.propTypes = {
isOpen: PropTypes.bool.isRequired,
onClose: PropTypes.func.isRequired,
symbol: PropTypes.string.isRequired,
type: PropTypes.oneOf(['nifty', 'etf']),
};

export default CompanyDetailModal;