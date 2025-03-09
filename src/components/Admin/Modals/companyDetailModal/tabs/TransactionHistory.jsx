// components/TransactionHistory.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory } from '../../../../../redux/User/trading/tradingSlice';
import { 
  DollarSign, 
  Activity,
  PieChart,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronDown,
  Search
} from 'lucide-react';
import PropTypes from 'prop-types';


const TransactionHistory = ({ currentPrice }) => {
  const dispatch = useDispatch();

  // Redux selectors
  const userData = useSelector(state => state.user?.auth?.user);
  const transactions = useSelector(state => state.user?.tradingModal?.transactions || []);
  const loading = useSelector(state => state.user?.tradingModal?.loading);
  const subscription = useSelector(state => state.user?.subscriptionPlan?.userSubscriptions?.[0]);

  // Local state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch transaction history
  useEffect(() => {
    if (userData?._id) {
      dispatch(fetchTransactionHistory(userData._id));
    }
  }, [dispatch, userData]);

    // Analytics calculation
    const analytics = useMemo(() => {
      if (!transactions.length) return null;
  
      try {
        const buyTransactions = transactions.filter(t => t.type === 'buy');
        const sellTransactions = transactions.filter(t => t.type === 'sell');
  
        const totalInvestment = buyTransactions.reduce((sum, t) => 
          sum + (t.price * t.numberOfShares), 0);
        const totalSold = sellTransactions.reduce((sum, t) => 
          sum + (t.price * t.numberOfShares), 0);
  
        const totalBuyQty = buyTransactions.reduce((sum, t) => 
          sum + t.numberOfShares, 0);
        const totalSellQty = sellTransactions.reduce((sum, t) => 
          sum + t.numberOfShares, 0);
  
        const avgBuyPrice = totalBuyQty > 0
          ? totalInvestment / totalBuyQty
          : 0;
  
        const realizedPL = totalSold - (avgBuyPrice * totalSellQty);
        const realizedPLPercentage = totalSellQty > 0 
          ? ((realizedPL / (avgBuyPrice * totalSellQty)) * 100)
          : 0;
  
        return {
          totalInvestment,
          avgBuyPrice,
          currentHoldings: totalBuyQty - totalSellQty,
          currentHoldingsValue: (totalBuyQty - totalSellQty) * currentPrice,
          realizedPL,
          realizedPLPercentage,
          totalTrades: transactions.length,
          buyTrades: buyTransactions.length,
          sellTrades: sellTransactions.length,
          successRate: sellTransactions.length > 0
            ? (sellTransactions.filter(t => t.price > avgBuyPrice).length / sellTransactions.length) * 100
            : 0
        };
      } catch (error) {
        console.error('Error calculating analytics:', error);
        return null;
      }
    }, [transactions, currentPrice]);
  
    // Filtered and sorted transactions
    const filteredTransactions = useMemo(() => {
      try {
        return transactions
          .filter(transaction => {
            const matchesSearch = 
              transaction.companySymbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              transaction.type?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === 'all' || transaction.type === filterType;
            return matchesSearch && matchesFilter;
          })
          .sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (sortConfig.key === 'createdAt') {
              return sortConfig.direction === 'asc'
                ? new Date(aValue) - new Date(bValue)
                : new Date(bValue) - new Date(aValue);
            }
            
            if (sortConfig.key === 'total') {
              const aTotal = a.price * a.numberOfShares;
              const bTotal = b.price * b.numberOfShares;
              return sortConfig.direction === 'asc'
                ? aTotal - bTotal
                : bTotal - aTotal;
            }
            
            return sortConfig.direction === 'asc'
              ? (aValue || 0) - (bValue || 0)
              : (bValue || 0) - (aValue || 0);
          });
      } catch (error) {
        console.error('Error filtering transactions:', error);
        return [];
      }
    }, [transactions, searchTerm, filterType, sortConfig]);
  
    // Pagination calculations
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    // Handlers
    const handleSort = (key) => {
      setSortConfig(prev => ({
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    };
  
    const exportTransactions = () => {
      try {
        const csv = [
          ['Date', 'Symbol', 'Type', 'Shares', 'Price', 'Total'],
          ...filteredTransactions.map(t => [
            new Date(t.createdAt).toLocaleString(),
            t.companySymbol,
            t.type,
            t.numberOfShares,
            t.price.toFixed(2),
            (t.price * t.numberOfShares).toFixed(2)
          ])
        ].map(row => row.join(',')).join('\n');
  
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error exporting transactions:', error);
        toast.error('Failed to export transactions');
      }
    };
      // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-500 text-sm">Loading transactions...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!transactions.length) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <div className="mb-4">
          <Activity className="h-12 w-12 text-gray-400 mx-auto" />
        </div>
        <p className="text-gray-500 mb-2">No transaction history available</p>
        <p className="text-sm text-gray-400">
          Your trading activity will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Analytics Dashboard */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Investment Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500">Total Investment</h4>
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-800">
              ₹{analytics.totalInvestment.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {analytics.totalTrades} total trades
            </p>
          </div>

          {/* Current Holdings Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500">Current Holdings</h4>
              <PieChart size={18} className="text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-800">
              {analytics.currentHoldings.toLocaleString()} shares
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Value: ₹{analytics.currentHoldingsValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          </div>

          {/* Realized P&L Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500">Realized P&L</h4>
              <Activity size={18} className="text-gray-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className={`text-xl font-bold ${
                analytics.realizedPL >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ₹{analytics.realizedPL.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
              <span className={`text-sm ${
                analytics.realizedPLPercentage >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                ({analytics.realizedPLPercentage.toFixed(2)}%)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              From {analytics.sellTrades} completed trades
            </p>
          </div>

          {/* Trading Activity Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500">Trading Activity</h4>
              <Calendar size={18} className="text-gray-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-gray-800">
                {analytics.buyTrades}/{analytics.sellTrades}
              </p>
              <span className="text-sm text-gray-500">Buy/Sell</span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Avg Buy Price:</span>
                <span className="font-medium">₹{analytics.avgBuyPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Success Rate:</span>
                <span className="font-medium">
                  {analytics.successRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
            {/* Filters and Controls */}
            <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
            <p className="text-sm text-gray-500">
              {filteredTransactions.length} transactions found
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="buy">Buy Only</option>
              <option value="sell">Sell Only</option>
            </select>

            {/* Export Button */}
            <button
              onClick={exportTransactions}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: 'createdAt', label: 'Date' },
                  { key: 'companySymbol', label: 'Symbol' },
                  { key: 'type', label: 'Type' },
                  { key: 'numberOfShares', label: 'Shares' },
                  { key: 'price', label: 'Price' },
                  { key: 'total', label: 'Total' }
                ].map(column => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {sortConfig.key === column.key && (
                        <ChevronDown
                          size={14}
                          className={`transform ${
                            sortConfig.direction === 'asc' ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedTransactions.map((transaction, index) => (
                <tr 
                  key={transaction._id || index} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.companySymbol}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${transaction.type === 'buy'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {transaction.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.numberOfShares.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ₹{transaction.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ₹{(transaction.price * transaction.numberOfShares).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                {/* Pagination */}
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Items per page and showing count */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[5, 10, 20, 50].map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-700">entries</span>
              </div>
              
              <span className="text-sm text-gray-700 hidden sm:block">
                Showing {filteredTransactions.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{' '}
                {filteredTransactions.length} entries
              </span>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous page"
              >
                <ChevronLeft size={20} className={currentPage === 1 ? 'text-gray-400' : 'text-gray-600'} />
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ))
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 py-1 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-200'
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
                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next page"
              >
                <ChevronRight size={20} className={currentPage === totalPages ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* No results message */}
      {filteredTransactions.length === 0 && searchTerm && (
        <div className="text-center py-8 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">No transactions found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-blue-500 hover:text-blue-600"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

// PropTypes
TransactionHistory.propTypes = {
  currentPrice: PropTypes.number.isRequired
};

// Default props
TransactionHistory.defaultProps = {
  currentPrice: 0
};

export default TransactionHistory;