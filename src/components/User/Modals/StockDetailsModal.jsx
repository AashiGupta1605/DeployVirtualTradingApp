// import React from 'react';
// import CompanyDetailModal from "../../Common/CompanyDetailModal";
// const StockDetailsModal = ({ stock, onClose }) => {
//   if (stock.length === 0) {
//     return (
//       <div className='text-center flex justify-center items-center h-screen text-4xl'>
//         PLEASE DO TRADING TO SEE THE HISTORY....
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Overlay with gray transparent background */}
//       <div 
//         className="fixed inset-0 bg-black opacity-50"
//         onClick={onClose}
//       ></div>

//       {/* Modal Content */}
//       <div className="relative bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
//         {/* Modal Header */}
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
//           <h3 className="text-xl font-semibold text-gray-800">{stock.symbol} Trading History</h3>
//           <button 
//             onClick={onClose} 
//             className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {/* Modal Body */}
//         <div className="p-6">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-100">
//               <h4 className="text-sm text-blue-600 mb-2">Total Shares</h4>
//               <p className="text-2xl font-bold text-blue-800">
//                 {stock.holding?.quantity || 0} shares
//               </p>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-100">
//               <h4 className="text-sm text-green-600 mb-2">Average Price</h4>
//               <p className="text-2xl font-bold text-green-800">
//                 ₹{stock.holding?.averageBuyPrice?.toFixed(2) || '0.00'}
//               </p>
//             </div>
//           </div>

//           {/* Transactions Table */}
//           <div className="overflow-x-auto rounded-lg border border-gray-100">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {stock.transactions.map((transaction, index) => (
//                   <tr 
//                     key={index}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-700">
//                       {new Date(transaction.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         transaction.type === 'buy' 
//                           ? 'bg-green-100 text-green-700' 
//                           : 'bg-red-100 text-red-700'
//                       }`}>
//                         {transaction.type.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{transaction.numberOfShares}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">₹{transaction.price.toFixed(2)}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">₹{transaction.total.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//       <CompanyDetailModal
//         isOpen={!!selectedSymbol}
//         onClose={handleCloseModal}
//         symbol={selectedSymbol}
//         data={companyDetails.stockData}
//         chartData={companyDetails.chartData}
//         onTimeRangeChange={handleTimeRangeChange}
//         loading={companyDetails.loading}
//         error={companyDetails.error}
//         chartSettings={{
//           theme: 'light',
//           showGrid: true,
//           showVolume: true,
//           showDetails: true
//         }}
//         type={tableType}
//         userData={userData}
//       />
    

// export default StockDetailsModal;




import React, { useState } from 'react';
import CompanyDetailModal from "../../Common/CompanyDetailModal";

const StockDetailsModal = ({ stock, onClose }) => {
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  if (stock.length === 0) {
    return (
      <div className='text-center flex justify-center items-center h-screen text-4xl'>
        PLEASE DO TRADING TO SEE THE HISTORY....
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with gray transparent background */}
      <div 
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h3 className="text-xl font-semibold text-gray-800">{stock.symbol} Trading History</h3>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm text-blue-600 mb-2">Total Shares</h4>
              <p className="text-2xl font-bold text-blue-800">
                {stock.holding?.quantity || 0} shares
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-100">
              <h4 className="text-sm text-green-600 mb-2">Average Price</h4>
              <p className="text-2xl font-bold text-green-800">
                ₹{stock.holding?.averageBuyPrice?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stock.transactions.map((transaction, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === 'buy' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.numberOfShares}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₹{transaction.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₹{transaction.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Button to Open CompanyDetailModal */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowCompanyModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Company Details
            </button>
          </div>
        </div>
      </div>

      {/* CompanyDetailModal */}
      {showCompanyModal && (
        <CompanyDetailModal
          isOpen={showCompanyModal}
          onClose={() => setShowCompanyModal(false)}
          symbol={stock.symbol}
          data={{}}
          chartData={{}}
          onTimeRangeChange={() => {}}
          loading={false}
          error={null}
          chartSettings={{
            theme: 'light',
            showGrid: true,
            showVolume: true,
            showDetails: true
          }}
          type="stock"
          userData={{}}
        />
      )}
    </div>
  );
};

export default StockDetailsModal;