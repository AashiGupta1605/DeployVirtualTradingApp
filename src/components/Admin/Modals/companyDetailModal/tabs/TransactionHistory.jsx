// import React, { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import { 
//   DollarSign, 
//   Activity,
//   PieChart,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   Download,
//   ChevronDown,
//   Search
// } from 'lucide-react';
// import { useTradingContext } from '../hooks/TradingContext';

// const TransactionHistory = ({ currentPrice }) => {
//   const { state } = useTradingContext();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   // Analytics calculation
//   const analytics = useMemo(() => {
//     const transactions = state.transactions;
//     if (transactions.length === 0) return null;

//     const buyTransactions = transactions.filter(t => t.type === 'buy');
//     const sellTransactions = transactions.filter(t => t.type === 'sell');

//     const totalInvestment = buyTransactions.reduce((sum, t) => sum + t.total, 0);
//     const totalSold = sellTransactions.reduce((sum, t) => sum + t.total, 0);

//     const totalBuyQty = buyTransactions.reduce((sum, t) => sum + t.qty, 0);
//     const totalSellQty = sellTransactions.reduce((sum, t) => sum + t.qty, 0);

//     const avgBuyPrice = buyTransactions.length > 0
//       ? buyTransactions.reduce((sum, t) => sum + (t.price * t.qty), 0) / totalBuyQty
//       : 0;

//     const realizedPL = totalSold - (avgBuyPrice * totalSellQty);
//     const realizedPLPercentage = totalSold > 0 
//       ? ((realizedPL / (avgBuyPrice * totalSellQty)) * 100 )
//       : 0;

//     return {
//       totalInvestment,
//       avgBuyPrice,
//       currentHoldings: totalBuyQty - totalSellQty,
//       currentHoldingsValue: (totalBuyQty - totalSellQty) * currentPrice,
//       realizedPL,
//       realizedPLPercentage,
//       totalTrades: transactions.length,
//       buyTrades: buyTransactions.length,
//       sellTrades: sellTransactions.length
//     };
//   }, [state.transactions, currentPrice]);

//   // Filtered and sorted transactions
//   const filteredTransactions = useMemo(() => {
//     return state.transactions
//       .filter(transaction => {
//         const matchesSearch = transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesFilter = filterType === 'all' || transaction.type === filterType;
//         return matchesSearch && matchesFilter;
//       })
//       .sort((a, b) => {
//         if (sortConfig.key === 'date') {
//           return sortConfig.direction === 'asc'
//             ? new Date(a.date) - new Date(b.date)
//             : new Date(b.date) - new Date(a.date);
//         }
//         return sortConfig.direction === 'asc'
//           ? a[sortConfig.key] - b[sortConfig.key]
//           : b[sortConfig.key] - a[sortConfig.key];
//       });
//   }, [state.transactions, searchTerm, filterType, sortConfig]);

//   // Pagination
//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const paginatedTransactions = filteredTransactions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   const exportTransactions = () => {
//     const csv = [
//       ['Date', 'Type', 'Quantity', 'Price', 'Total'], ///add thedse fields in my models
//       ...filteredTransactions.map(t => [
//         t.date,
//         t.type,
//         t.qty,
//         t.price,
//         t.total
//       ])
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'transactions.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="w-full space-y-6">
//       {/* Analytics Dashboard */}
//       {analytics && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Total Investment Card */}
//           <div className="bg-white rounded-xl p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-sm text-gray-500">Total Investment</h4>
//               <DollarSign size={18} className="text-gray-400" />
//             </div>
//             <p className="text-xl font-bold text-gray-800">
//               ₹{analytics.totalInvestment.toFixed(2)}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               {analytics.totalTrades} total trades
//             </p>
//           </div>

//           {/* Current Holdings Card */}
//           <div className="bg-white rounded-xl p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-sm text-gray-500">Current Holdings</h4>
//               <PieChart size={18} className="text-gray-400" />
//             </div>
//             <p className="text-xl font-bold text-gray-800">
//               {analytics.currentHoldings} shares
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               Value: ₹{analytics.currentHoldingsValue.toFixed(2)}
//             </p>
//           </div>

//           {/* Realized P&L Card */}
//           <div className="bg-white rounded-xl p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-sm text-gray-500">Realized P&L</h4>
//               <Activity size={18} className="text-gray-400" />
//             </div>
//             <div className="flex items-baseline gap-2">
//               <p className={`text-xl font-bold ${
//                 analytics.realizedPL >= 0 ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 ₹{analytics.realizedPL.toFixed(2)}
//               </p>
//               <span className={`text-sm ${
//                 analytics.realizedPLPercentage >= 0 ? 'text-green-500' : 'text-red-500'
//               }`}>
//                 ({analytics.realizedPLPercentage.toFixed(2)}%)
//               </span>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               From {analytics.sellTrades} completed trades
//             </p>
//           </div>

//           {/* Trading Activity Card */}
//           <div className="bg-white rounded-xl p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="text-sm text-gray-500">Trading Activity</h4>
//               <Calendar size={18} className="text-gray-400" />
//             </div>
//             <div className="flex items-baseline gap-2">
//               <p className="text-xl font-bold text-gray-800">
//                 {analytics.buyTrades}/{analytics.sellTrades}
//               </p>
//               <span className="text-sm text-gray-500">Buy/Sell</span>
//             </div>
//             <div className="mt-2 space-y-1">
//               <div className="flex justify-between text-xs">
//                 <span className="text-gray-500">Avg Buy Price:</span>
//                 <span className="font-medium">₹{analytics.avgBuyPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-xs">
//                 <span className="text-gray-500">Success Rate:</span>
//                 <span className="font-medium">
//                   {((analytics.realizedPL > 0 ? analytics.sellTrades : 0) / 
//                     (analytics.sellTrades || 1) * 100).toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filters and Controls */}
//       <div className="bg-white rounded-xl shadow-sm p-4">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
//           {/* Heading on the Left */}
//           <div className="flex-1">
//             <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
//           </div>

//           {/* Search and Filter on the Right */}
//           <div className="flex items-center gap-4">
//             {/* Search Bar */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search transactions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-48 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Filter Dropdown */}
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Types</option>
//               <option value="buy">Buy Only</option>
//               <option value="sell">Sell Only</option>
//             </select>

//             {/* Export Button */}
//             <button
//               onClick={exportTransactions}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//             >
//               <Download size={18} />
//               <span>Export</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Transaction Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {[
//                   { key: 'date', label: 'Date' },
//                   { key: 'type', label: 'Type' },
//                   { key: 'qty', label: 'Quantity' },
//                   { key: 'price', label: 'Price' },
//                   { key: 'total', label: 'Total' }
//                 ].map(column => (
//                   <th
//                     key={column.key}
//                     onClick={() => handleSort(column.key)}
//                     className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>{column.label}</span>
//                       {sortConfig.key === column.key && (
//                         <ChevronDown
//                           size={14}
//                           className={`transform ${
//                             sortConfig.direction === 'asc' ? 'rotate-180' : ''
//                           }`}
//                         />
//                       )}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 bg-white">
//               {paginatedTransactions.map((transaction, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-900">
//                     {new Date(transaction.date).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`
//                       inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//                       ${transaction.type === 'buy'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-red-100 text-red-800'
//                       }`}>
//                       {transaction.type.toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-900">
//                     {transaction.qty}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-900">
//                     ₹{transaction.price.toFixed(2)}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-900">
//                     ₹{transaction.total.toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="border rounded px-2 py-1 text-sm"
//               >
//                 {[5, 10, 20, 50].map(value => (
//                   <option key={value} value={value}>
//                     {value} per page
//                   </option>
//                 ))}
//               </select>
//               <span className="text-sm text-gray-700">
//                 Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                 disabled={currentPage === 1}
//                 className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
//               >
//                 <ChevronLeft size={20} />
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1)
//                 .filter(page => (
//                   page === 1 ||
//                   page === totalPages ||
//                   (page >= currentPage - 1 && page <= currentPage + 1)
//                 ))
//                 .map((page, index, array) => (
//                   <React.Fragment key={page}>
//                     {index > 0 && array[index - 1] !== page - 1 && (
//                       <span className="px-2">...</span>
//                     )}
//                     <button
//                       onClick={() => setCurrentPage(page)}
//                       className={`px-3 py-1 rounded ${
//                         currentPage === page
//                           ? 'bg-blue-500 text-white'
//                           : 'hover:bg-gray-200'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   </React.Fragment>
//                 ))}
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                 disabled={currentPage === totalPages}
//                 className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// TransactionHistory.propTypes = {
//   currentPrice: PropTypes.number.isRequired
// };

// export default TransactionHistory;




// redux implemented

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
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
import { useSelector } from 'react-redux';

const TransactionHistory = ({ currentPrice }) => {
  const { transactions } = useSelector((state) => state.user.userTrading);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Analytics calculation
  const analytics = useMemo(() => {
    if (transactions.length === 0) return null;

    const buyTransactions = transactions.filter(t => t.type === 'buy');
    const sellTransactions = transactions.filter(t => t.type === 'sell');

    const totalInvestment = buyTransactions.reduce((sum, t) => sum + t.total, 0);
    const totalSold = sellTransactions.reduce((sum, t) => sum + t.total, 0);

    const totalBuyQty = buyTransactions.reduce((sum, t) => sum + t.qty, 0);
    const totalSellQty = sellTransactions.reduce((sum, t) => sum + t.qty, 0);

    const avgBuyPrice = buyTransactions.length > 0
      ? buyTransactions.reduce((sum, t) => sum + (t.price * t.qty), 0) / totalBuyQty
      : 0;

    const realizedPL = totalSold - (avgBuyPrice * totalSellQty);
    const realizedPLPercentage = totalSold > 0 
      ? ((realizedPL / (avgBuyPrice * totalSellQty)) * 100 )
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
      sellTrades: sellTransactions.length
    };
  }, [transactions, currentPrice]);

  // Filtered and sorted transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
        const matchesSearch = transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || transaction.type === filterType;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortConfig.key === 'date') {
          return sortConfig.direction === 'asc'
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        }
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      });
  }, [transactions, searchTerm, filterType, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const exportTransactions = () => {
    const csv = [
      ['Date', 'Type', 'Quantity', 'Price', 'Total'],
      ...filteredTransactions.map(t => [
        t.date,
        t.type,
        t.qty,
        t.price,
        t.total
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Analytics Dashboard */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Investment Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500">Total Investment</h4>
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-800">
              ₹{analytics.totalInvestment.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {analytics.totalTrades} total trades
            </p>
          </div>

          {/* Current Holdings Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500">Current Holdings</h4>
              <PieChart size={18} className="text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-800">
              {analytics.currentHoldings} shares
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Value: ₹{analytics.currentHoldingsValue.toFixed(2)}
            </p>
          </div>

          {/* Realized P&L Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500">Realized P&L</h4>
              <Activity size={18} className="text-gray-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className={`text-xl font-bold ${
                analytics.realizedPL >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ₹{analytics.realizedPL.toFixed(2)}
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
          <div className="bg-white rounded-xl p-4 shadow-sm">
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
                  {((analytics.realizedPL > 0 ? analytics.sellTrades : 0) / 
                    (analytics.sellTrades || 1) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Heading on the Left */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
          </div>

          {/* Search and Filter on the Right */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Dropdown */}
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
                  { key: 'date', label: 'Date' },
                  { key: 'type', label: 'Type' },
                  { key: 'qty', label: 'Quantity' },
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
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleString()}
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
                    {transaction.qty}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ₹{transaction.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ₹{transaction.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1 text-sm"
              >
                {[5, 10, 20, 50].map(value => (
                  <option key={value} value={value}>
                    {value} per page
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ))
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TransactionHistory.propTypes = {
  currentPrice: PropTypes.number.isRequired
};

export default TransactionHistory;