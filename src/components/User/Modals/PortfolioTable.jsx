// import React from 'react';
// import { ArrowUp, ArrowDown } from 'lucide-react';

// const PortfolioTable = ({ holdings, transactions, onStockClick }) => {
//   console.log(holdings);
//   console.log(transactions);

  
//   const getStockStats = (symbol) => {
//     const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
//     const buyTransactions = stockTransactions.filter(t => t.type === 'buy');
//     const sellTransactions = stockTransactions.filter(t => t.type === 'sell');
    
//     return {
//       totalTrades: stockTransactions.length,
//       buyTrades: buyTransactions.length,
//       sellTrades: sellTransactions.length
//     };
//   };


//     // Function to extract date from ISO string
//     const extractDate = (isoString) => {
//       const date = new Date(isoString);
//       return date.toLocaleDateString(); // Format: MM/DD/YYYY or based on locale
//     };
  
//     // Function to extract time from ISO string
//     const extractTime = (isoString) => {
//       const date = new Date(isoString);
//       return date.toLocaleTimeString(); // Format: HH:MM:SS or based on locale
//     };


//     // if(!holdings || transactions){
//     //   return (
//     //     <div>no stocks detail found</div>
//     //   )
//     // }

//     if (!holdings || holdings.length === 0) {
//       return (
//         <div className="bg-white rounded shadow-lg overflow-hidden w-full p-8 text-center">
//           <div className="text-2xl font-semibold text-gray-700 mb-4">
//             📊 No Stock Details Available
//           </div>
//           <div className="text-lg text-gray-500 mb-6">
//             Start trading to see your portfolio history here.
//           </div>
//           <button
//             onClick={() => onStockClick('start-trading')} // Trigger a function to start trading
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Start Trading
//           </button>
//         </div>
//       );
//     }
  
  

//   return (
//     <div className="bg-white rounded shadow-lg overflow-hidden w-full">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Avg. Price</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Current Value</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Trades</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Performance</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Time</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {holdings.map((holding) => {
//             const stats = getStockStats(holding.companySymbol);
//             const currentValue = holding.quantity * holding.averageBuyPrice;
            
//             return (
//               <tr 
//                 key={holding.companySymbol}
//                 className="hover:bg-gray-50 cursor-pointer"
//                 onClick={() => onStockClick(holding.companySymbol)}
//               >
//                 <td className="px-6 py-4">
//                   <div className="text-sm font-medium text-gray-900">
//                     {holding.companySymbol}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">{holding.quantity}</div>
//                   {/* if quantity is still 0 then still shows table - but there shoudl be atrasnaction */}
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     ₹{holding.averageBuyPrice.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     ₹{currentValue.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <span className="text-sm text-green-600">
//                       {stats.buyTrades} Buy
//                     </span>
//                     <span className="text-sm text-red-600">
//                       {stats.sellTrades} Sell
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center text-sm">
//                     {currentValue > 0 ? (
//                       <ArrowUp className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <ArrowDown className="w-4 h-4 text-red-500" />
//                     )}
//                     <span className="ml-1">0.00%</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {extractDate(holding.lastUpdated)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {extractTime(holding.lastUpdated)}
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PortfolioTable;



// updated code....



// import React from 'react';
// import { ArrowUp, ArrowDown } from 'lucide-react';

// const PortfolioTable = ({ holdings, transactions, onStockClick }) => {
//   const getStockStats = (symbol) => {
//     const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
//     const buyTransactions = stockTransactions.filter(t => t.type === 'buy');
//     const sellTransactions = stockTransactions.filter(t => t.type === 'sell');
//     console.log(holdings);
//     console.log(transactions);
    
    
    
//     return {
//       totalTrades: stockTransactions.length,
//       buyTrades: buyTransactions.length,
//       sellTrades: sellTransactions.length
//     };
//   };

//   const extractDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString();
//   };

//   const extractTime = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleTimeString();
//   };

//   if (!holdings || holdings.length === 0) {
//     return (
//       <div className="bg-white rounded shadow-lg overflow-hidden w-full p-8 text-center">
//         <div className="text-2xl font-semibold text-gray-700 mb-4">
//           📊 No Stock Details Available
//         </div>
//         <div className="text-lg text-gray-500 mb-6">
//           Start trading to see your portfolio history here.
//         </div>
//         <button
//           onClick={() => onStockClick('start-trading')}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Start Trading
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded shadow-lg overflow-hidden w-full">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Avg. Price</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Current Value</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Trades</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Performance</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Time</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {holdings.map((holding) => {
//             const stats = getStockStats(holding.companySymbol);
//             const currentValue = holding.quantity * holding.averageBuyPrice;
//             const isSoldOut = holding.quantity === 0;

//             return (
//               <tr 
//                 key={holding.companySymbol}
//                 className={`hover:bg-gray-50 cursor-pointer ${isSoldOut ? 'opacity-50' : ''}`}
//                 onClick={() => onStockClick(holding.companySymbol)}
//               >
//                 <td className="px-6 py-4">
//                   <div className="text-sm font-medium text-gray-900">
//                     {holding.companySymbol}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {holding.quantity} {isSoldOut && '(Sold Out)'}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     ₹{holding.averageBuyPrice.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     ₹{currentValue.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <span className="text-sm text-green-600">
//                       {stats.buyTrades} Buy
//                     </span>
//                     <span className="text-sm text-red-600">
//                       {stats.sellTrades} Sell
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center text-sm">
//                     {currentValue > 0 ? (
//                       <ArrowUp className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <ArrowDown className="w-4 h-4 text-red-500" />
//                     )}
//                     <span className="ml-1">0.00%</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {extractDate(holding.lastUpdated)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {extractTime(holding.lastUpdated)}
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PortfolioTable;




// import React from 'react';
// import { ArrowUp, ArrowDown } from 'lucide-react';

// const PortfolioTable = ({ holdings, transactions, onStockClick }) => {
//   const getStockStats = (symbol) => {
//     const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
//     const buyTransactions = stockTransactions.filter(t => t.type === 'buy');
//     const sellTransactions = stockTransactions.filter(t => t.type === 'sell');
    
//     return {
//       totalTrades: stockTransactions.length,
//       buyTrades: buyTransactions.length,
//       sellTrades: sellTransactions.length
//     };
//   };

//   const extractDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString();
//   };

//   const extractTime = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleTimeString();
//   };

//   if (!holdings || holdings.length === 0) {
//     return (
//       <div className="bg-white rounded shadow-lg overflow-hidden w-full p-8 text-center">
//         <div className="text-2xl font-semibold text-gray-700 mb-4">
//           📊 No Stock Details Available
//         </div>
//         <div className="text-lg text-gray-500 mb-6">
//           Start trading to see your portfolio history here.
//         </div>
//         <button
//           onClick={() => onStockClick('start-trading')}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Start Trading
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded shadow-lg overflow-hidden w-full">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Avg. Price</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Current Value</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Trades</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Performance</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Time</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {/* {holdings.map((holding) => {
//             const stats = getStockStats(holding.companySymbol);
//             const currentValue = holding.quantity * holding.averageBuyPrice;
//             const isSoldOut = holding.quantity === 0;

//             return (
//               <tr 
//                 key={holding.companySymbol}
//                 className={`hover:bg-gray-50 cursor-pointer ${isSoldOut ? 'opacity-50' : ''}`}
//                 onClick={() => onStockClick(holding.companySymbol)}
//               >
//                 <td className="px-6 py-4">
//                   <div className="text-sm font-medium text-gray-900">
//                     {holding.companySymbol}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {holding.quantity} {isSoldOut && '(Sold Out)'}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     ₹{holding.averageBuyPrice.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     ₹{currentValue.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <span className="text-sm text-green-600">
//                       {stats.buyTrades} Buy
//                     </span>
//                     <span className="text-sm text-red-600">
//                       {stats.sellTrades} Sell
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center text-sm">
//                     {currentValue > 0 ? (
//                       <ArrowUp className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <ArrowDown className="w-4 h-4 text-red-500" />
//                     )}
//                     <span className="ml-1">0.00%</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {extractDate(holding.lastUpdated)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {extractTime(holding.lastUpdated)}
//                   </div>
//                 </td>
//               </tr>
//             );
//           })} */}
//           {holdings.map((holding) => {
//   const stats = getStockStats(holding.companySymbol);
//   const currentValue = holding.quantity * (holding.averageBuyPrice || 0);
//   const isSoldOut = holding.quantity === 0;

//   return (
//     <tr 
//       key={holding.companySymbol}
//       className={`hover:bg-gray-50 cursor-pointer ${isSoldOut ? 'opacity-50' : ''}`}
//       onClick={() => onStockClick(holding.companySymbol)}
//     >
//       <td className="px-6 py-4">
//         <div className="text-sm font-medium text-gray-900">
//           {holding.companySymbol}
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="text-sm text-gray-900">
//           {holding.quantity} {isSoldOut && '(Sold Out)'}
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="text-sm text-gray-900">
//           {holding.averageBuyPrice ? `₹${holding.averageBuyPrice.toFixed(2)}` : '₹0.00'}
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="text-sm text-gray-900">
//           ₹{currentValue.toFixed(2)}
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="flex space-x-2">
//           <span className="text-sm text-green-600">
//             {stats.buyTrades} Buy
//           </span>
//           <span className="text-sm text-red-600">
//             {stats.sellTrades} Sell
//           </span>
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="flex items-center text-sm">
//           {currentValue > 0 ? (
//             <ArrowUp className="w-4 h-4 text-green-500" />
//           ) : (
//             <ArrowDown className="w-4 h-4 text-red-500" />
//           )}
//           <span className="ml-1">0.00%</span>
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="text-sm text-gray-900">
//           {extractDate(holding.lastUpdated)}
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <div className="text-sm text-gray-900">
//           {extractTime(holding.lastUpdated)}
//         </div>
//       </td>
//     </tr>
//   );
// })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PortfolioTable;






// import React, { useState } from 'react';
// import { ArrowUp, ArrowDown } from 'lucide-react';
// import Pagination from '../../Common/TableItems/Pagination'; // Import the Pagination component
// import { selectLoadingState } from '../../../redux/User/trading/tradingSlice';
// import { useSelector } from 'react-redux';
// import Loader from '../../Common/Loader';
// const PortfolioTable = ({ holdings, transactions, onStockClick }) => {
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const { loading } = useSelector(selectLoadingState);
//   // Helper function to calculate stock stats
//   const getStockStats = (symbol) => {
//     const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
//     const buyTransactions = stockTransactions.filter(t => t.type === 'buy');
//     const sellTransactions = stockTransactions.filter(t => t.type === 'sell');

//     return {
//       totalTrades: stockTransactions.length,
//       buyTrades: buyTransactions.length,
//       sellTrades: sellTransactions.length,
//     };
//   };

//   // Helper functions to extract date and time
//   const extractDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString();
//   };

//   const extractTime = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleTimeString();
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentHoldings = holdings.slice(indexOfFirstItem, indexOfLastItem);

//   // Total pages calculation
//   const totalPages = Math.ceil(holdings.length / itemsPerPage);

//   if (loading) {
//     return <Loader />;
//   }


//   if (!holdings || holdings.length === 0) {
//     return (
//       <div className="bg-white rounded shadow-lg overflow-hidden w-full p-8 text-center">
//         <div className="text-2xl font-semibold text-gray-700 mb-4">
//           📊 No Stock Details Available
//         </div>
//         <div className="text-lg text-gray-500 mb-6">
//           Start trading to see your portfolio history here.
//         </div>
//         <button
//           onClick={() => onStockClick('start-trading')}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Start Trading
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className='flex flex-col'>

//     <div className="bg-white rounded shadow-lg overflow-y-auto w-full h-72 px-4">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Avg. Price</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Current Value</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Trades</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Performance</th>
//             <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {currentHoldings.map((holding) => {
//             const stats = getStockStats(holding.companySymbol);
//             const currentValue = holding.quantity * (holding.averageBuyPrice || 0);
//             const isSoldOut = holding.quantity === 0;

//             return (
//               <tr
//                 key={holding.companySymbol}
//                 className={`hover:bg-gray-50 cursor-pointer ${isSoldOut ? 'opacity-50' : ''}`}
//                 onClick={() => onStockClick(holding.companySymbol)}
//               >
//                 <td className="px-6 py-4">
//                   <div className="text-sm font-medium text-gray-900">
//                     {holding.companySymbol}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {holding.quantity} {isSoldOut && '(Sold Out)'}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {holding.averageBuyPrice ? `₹${holding.averageBuyPrice.toFixed(2)}` : '₹0.00'}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     ₹{currentValue.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <span className="text-sm text-green-600">
//                       {stats.buyTrades} Buy
//                     </span>
//                     <span className="text-sm text-red-600">
//                       {stats.sellTrades} Sell
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center text-sm">
//                     {currentValue > 0 ? (
//                       <ArrowUp className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <ArrowDown className="w-4 h-4 text-red-500" />
//                     )}
//                     <span className="ml-1">0.00%</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     {extractDate(holding.lastUpdated)}
//                   </div>
//                 </td>
              
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
 
  
//     </div>

//     {/* Pagination */}

//     <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         itemsPerPage={itemsPerPage}
//         setItemsPerPage={setItemsPerPage}
//         setCurrentPage={setCurrentPage}
//         filteredItems={holdings}
//         indexOfFirstItem={indexOfFirstItem}
//         indexOfLastItem={indexOfLastItem}
//         />
//     </div>

//   );
// };

// export default PortfolioTable;









// sorted code 


import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Pagination from '../../Common/TableItems/Pagination'; // Import the Pagination component
import { selectLoadingState } from '../../../redux/User/trading/tradingSlice';
import { useSelector } from 'react-redux';
import Loader from '../../Common/Loader';

const PortfolioTable = ({ holdings, transactions, onStockClick }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { loading } = useSelector(selectLoadingState);

  // Helper function to calculate stock stats
  const getStockStats = (symbol) => {
    const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
    const buyTransactions = stockTransactions.filter(t => t.type === 'buy');
    const sellTransactions = stockTransactions.filter(t => t.type === 'sell');

    return {
      totalTrades: stockTransactions.length,
      buyTrades: buyTransactions.length,
      sellTrades: sellTransactions.length,
    };
  };

  // Helper functions to extract date and time
  const extractDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  const extractTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  // Sort holdings in descending order based on `lastUpdated`
  const sortedHoldings = [...holdings].sort((a, b) => {
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHoldings = sortedHoldings.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages calculation
  const totalPages = Math.ceil(sortedHoldings.length / itemsPerPage);

  if (loading) {
    return <Loader />;
  }

  if (!holdings || holdings.length === 0) {
    return (
      <div className="bg-white rounded shadow-lg overflow-hidden w-full p-8 text-center">
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          📊 No Stock Details Available
        </div>
        <div className="text-lg text-gray-500 mb-6">
          Start trading to see your portfolio history here.
        </div>
        <button
          onClick={() => onStockClick('start-trading')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Trading
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <div className="bg-white rounded shadow-lg overflow-y-auto w-full h-72 px-4">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Avg. Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Current Value</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Trades</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Performance</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentHoldings.map((holding) => {
              const stats = getStockStats(holding.companySymbol);
              const currentValue = holding.quantity * (holding.averageBuyPrice || 0);
              const isSoldOut = holding.quantity === 0;

              return (
                <tr
                  key={holding.companySymbol}
                  className={`hover:bg-gray-50 cursor-pointer ${isSoldOut ? 'opacity-50' : ''}`}
                  onClick={() => onStockClick(holding.companySymbol)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {holding.companySymbol}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {holding.quantity} {isSoldOut && '(Sold Out)'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {holding.averageBuyPrice ? `₹${holding.averageBuyPrice.toFixed(2)}` : '₹0.00'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ₹{currentValue.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <span className="text-sm text-green-600">
                        {stats.buyTrades} Buy
                      </span>
                      <span className="text-sm text-red-600">
                        {stats.sellTrades} Sell
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm">
                      {currentValue > 0 ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className="ml-1">0.00%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {extractDate(holding.lastUpdated)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        filteredItems={sortedHoldings}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
      />
    </div>
  );
};

export default PortfolioTable;