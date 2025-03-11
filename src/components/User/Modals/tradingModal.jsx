// import React, { useState } from "react";

// const TradingModal = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState("buy");
//   const [historicalData, setHistoricalData] = useState([
//     { type: "buy", date: "2024-02-28", shares: 300, price: 140 },
//     { type: "sell", date: "2024-02-27", shares: 150, price: 145 },
//   ]);

//   if (!isOpen) return null;

//   const handleTransaction = (type) => {
//     const newTransaction = {
//       type,
//       date: new Date().toISOString().split("T")[0],
//       shares: Math.floor(Math.random() * 200) + 50,
//       price: Math.floor(Math.random() * 50) + 100,
//     };

//     setHistoricalData((prevData) => [newTransaction, ...prevData]);
//     setActiveTab(type);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
//       <div   style={{ width: "100%", maxWidth: "80%" }} className="relative w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
//         <button
//           className="absolute top-2 right-2 pr-1 text-gray-600 hover:text-black"
//           onClick={onClose}
//         >
//          <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//         </button>
        


//         {/* Buy/Sell Tabs */}
//         <div className="flex justify-center gap-4 mb-9">
//           <button
//             onClick={() => setActiveTab("buy")}
//             className={`w-1/2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
//               activeTab === "buy" ? "bg-green-600 text-white shadow-md" : "bg-gray-300"
//             }`}
//           >
//             Buy
//           </button>
//           <button
//             onClick={() => setActiveTab("sell")}
//             className={`w-1/2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
//               activeTab === "sell" ? "bg-red-600 text-white shadow-md" : "bg-gray-300"
//             }`}
//           >
//             Sell
//           </button>
//         </div>
         
//          {/* Company Info & Market Analysis */}
//         <div className="flex justify-between mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
//           <div className="w-1/2 border-r pr-4">
//             <h3 className="text-lg font-semibold text-gray-800">Axis Bank</h3>
//             <p className="text-gray-600">Open: <span className="text-black font-semibold">$145</span></p>
//             <p className="text-gray-600">Close: <span className="text-black font-semibold">$148</span></p>
//             <p className="text-gray-600">High: <span className="text-black font-semibold">$150</span></p>
//             <p className="text-gray-600">Low: <span className="text-black font-semibold">$142</span></p>
//           </div>
//           <div className="w-1/2 pl-4">
//             <h3 className="text-lg font-semibold text-gray-800">Market Analysis</h3>
//             <p className="text-green-600">Strong Buy: 40%</p>
//             <p className="text-blue-500">Buy: 25%</p>
//             <p className="text-gray-500">Hold: 15%</p>
//             <p className="text-yellow-500">Sell: 10%</p>
//             <p className="text-red-500">Strong Sell: 10%</p>
//           </div>
//         </div>
//         {/* Buy/Sell Content */}
//         <div className="border p-6 rounded-lg shadow-md bg-gray-50 text-center">
//           {activeTab === "buy" ? (
//             <>
//               <h3 className="text-xl font-semibold text-green-700">Buy Stocks</h3>
//               <p className="text-gray-600">Available Stock: <span className="text-black font-semibold">1000</span></p>
//               <button
//                 onClick={() => handleTransaction("buy")}
//                 className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all"
//               >
//                 Buy Now
//               </button>
//             </>
//           ) : (
//             <>
//               <h3 className="text-xl font-semibold text-red-700">Sell Stocks</h3>
//               <p className="text-gray-600">Available Stock: <span className="text-black font-semibold">500</span></p>
//               <button
//                 onClick={() => handleTransaction("sell")}
//                 className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all"
//               >
//                 Sell Now
//               </button>
//             </>
//           )}
//         </div>

//         {/* Historical Data */}
//         <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-100">
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">Historical Data ({activeTab})</h3>
//           <ul className="text-gray-700 space-y-2">
//             {historicalData
//               .filter((entry) => entry.type === activeTab)
//               .map((entry, index) => (
//                 <li key={index} className="flex items-center gap-2">
//                   {entry.type === "buy" ? "📈" : "📉"} 
//                   <span className="font-medium">{entry.date}:</span> {entry.type === "buy" ? "Bought" : "Sold"} 
//                   <span className="font-semibold">{entry.shares}</span> shares at 
//                   <span className="text-black font-semibold">${entry.price}</span>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TradingModal;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchTransactionHistory,
  selectTransactions,
  selectHoldings,
  selectStatistics
} from '../../../redux/User/trading/tradingSlice';
import { getUserSubscriptions } from '../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import PortfolioHeader from './PortfolioHeader';
import PortfolioTable from './PortfolioTable';
import StockDetailsModal from './StockDetailsModal';

const UserPortfolioPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.auth?.user?._id);
  const user = useSelector(state => state.user.auth?.user);
  const transactions = useSelector(selectTransactions);
  const holdings = useSelector(selectHoldings);
  const statistics = useSelector(selectStatistics);
  const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
  
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getUserSubscriptions(userId));
      dispatch(fetchTransactionHistory({ userId }));
    }
  }, [dispatch, userId]);

  const activeSubscription = userSubscriptions.find(sub => 
    sub.status === 'Active' && !sub.isDeleted
  );

  const handleStockClick = (symbol) => {
    const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
    const stockHolding = holdings.find(h => h.companySymbol === symbol);
    
    setSelectedStock({
      symbol,
      transactions: stockTransactions,
      holding: stockHolding
    });
    setShowDetailsModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PortfolioHeader 
        user={user}
        statistics={statistics}
        balance={activeSubscription?.vertualAmount || 0}
      />
      
      <PortfolioTable 
        holdings={holdings}
        transactions={transactions}
        onStockClick={handleStockClick}
      />

      {showDetailsModal && selectedStock && (
        <StockDetailsModal
          stock={selectedStock}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default UserPortfolioPage;