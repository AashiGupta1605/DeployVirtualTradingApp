import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Award,
  DollarSign,
  BookUser,
  Star,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
  PlusCircle,
  MessageSquare
} from 'lucide-react';
import { 
  fetchTransactionHistory,
  selectTransactions,
  selectHoldings,
  selectStatistics,
  fetchEventSpecificTransactions
} from '../../../redux/User/trading/tradingSlice';
import { 
  getUserSubscriptions 
} from '../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import { 
  selectActiveEvent,
  selectActiveEvents,
  setActiveEvent
} from '../../../redux/User/events/eventsSlice';
import StockDetailsModal from './StockDetailsModal';
import PortfolioTable from './PortfolioTable';

const UserPortfolioPage = () => {
  const dispatch = useDispatch();
  const activeEvent = useSelector(selectActiveEvent);
  const userId = useSelector(state => state.user.auth?.user?._id);
  const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
  
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getUserSubscriptions(userId));
      
      if (activeEvent?._id) {
        dispatch(fetchEventSpecificTransactions({ 
          userId, 
          eventId: activeEvent._id 
        }));
      } else {
        dispatch(fetchTransactionHistory({ userId }));
      }
    }
  }, [dispatch, userId, activeEvent?._id]);
  
  const { transactions, holdings } = useSelector(state => state.user.tradingModal);
  const statistics = useSelector(selectStatistics);

  const activeSubscription = userSubscriptions.find(sub => 
    sub.status === 'Active' && !sub.isDeleted
  );

  const handleStockClick = (symbol) => {
    const stockTransactions = transactions
      .filter(t => t.companySymbol === symbol)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const stockHolding = holdings.find(h => h.companySymbol === symbol);
    
    setSelectedStock({
      symbol,
      transactions: stockTransactions,
      holding: stockHolding
    });
    setShowDetailsModal(true);
  };

  const EventDropdown = ({ activeEvent, onSelectEvent }) => {
    const events = useSelector(selectActiveEvents);
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200 hover:bg-gray-50"
        >
          <span className="font-medium">{activeEvent?.title || 'Select Event'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}/>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            {events.map(event => (
              <button
                key={event._id}
                onClick={() => {
                  onSelectEvent(event);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                  activeEvent?._id === event._id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {event.title}
              </button>
            ))}
            <button
              onClick={() => {
                onSelectEvent(null);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-t border-gray-200 text-sm text-gray-700"
            >
              All Transactions
            </button>
          </div>
        )}
      </div>
    );
  };

  // Stats Card Component
  const StatsCard = ({ title, value, icon, description, change, changeColor }) => {
    return (
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {title}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {value}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                {icon}
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className={`${changeColor} mr-2`}>
              {change}
            </span>
            <span className="whitespace-nowrap">{description}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-24">
      {/* Stats Cards Section */}
      <div className="bg-lightBlue-600 md:pt-8 pb-16 pt-12">
        <div className="px-4 w-full mx-1">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="VIRTUAL BALANCE"
                value={activeSubscription?.vertualAmount ? `₹${activeSubscription.vertualAmount.toFixed(2)}` : "₹0.00"}
                icon={<DollarSign className="w-5 h-5" />}
                description="Available Virtual Balance"
                change={statistics.balanceChange !== undefined ? `${statistics.balanceChange >= 0 ? '+' : ''}${statistics.balanceChange}%` : null}
                changeColor={statistics.balanceChange >= 0 ? "text-emerald-500" : "text-red-500"}
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="TOTAL INVESTMENT"
                value={`₹${statistics.totalInvestment?.toFixed(2) || '0.00'}`}
                icon={<TrendingUp className="w-5 h-5" />}
                description="Total Amount Invested"
                change={statistics.investmentChange !== undefined ? `${statistics.investmentChange >= 0 ? '+' : ''}${statistics.investmentChange}%` : null}
                changeColor={statistics.investmentChange >= 0 ? "text-emerald-500" : "text-red-500"}
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="TRADING PERFORMANCE"
                value={`${statistics.successRate?.toFixed(2) || '0.00'}%`}
                icon={<BarChart2 className="w-5 h-5" />}
                description="Overall Success Rate"
                change={statistics.totalTrades ? `${statistics.winningTrades}/${statistics.totalTrades} trades` : null}
                changeColor="text-gray-700"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="PROFIT & LOSS"
                value={`₹${statistics.realizedPL?.toFixed(2) || '0.00'}`}
                icon={<Award className="w-5 h-5" />}
                description="Overall P&L"
                change={statistics.realizedPLPercentage !== undefined ? `${statistics.realizedPLPercentage >= 0 ? '+' : ''}${statistics.realizedPLPercentage?.toFixed(2)}%` : null}
                changeColor={statistics.realizedPLPercentage >= 0 ? "text-emerald-500" : "text-red-500"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="px-4 md:px-8 mx-4 -mt-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center">
              <BookUser className="text-gray-600 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                {activeEvent ? `${activeEvent.title} Portfolio` : 'My Portfolio'}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <div className="text-center">
                  <div className="flex items-center space-x-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-xl font-semibold">{statistics.buyTrades}</span>
                  </div>
                  <p className="text-sm text-gray-500">Buy Shares</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-2 text-red-600">
                    <TrendingDown className="w-5 h-5" />
                    <span className="text-xl font-semibold">{statistics.sellTrades}</span>
                  </div>
                  <p className="text-sm text-gray-500">Sell Shares</p>
                </div>
              </div>
              <EventDropdown 
                activeEvent={activeEvent}
                onSelectEvent={(event) => dispatch(setActiveEvent(event))}
              />
            </div>
          </div>

          {/* Portfolio Table - Updated to match feedback table style */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Stock", "Quantity", "Avg. Price", "Current Value", "Trading Activity", "Performance", "Date"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {holdings.length > 0 ? (
                  holdings.map((holding) => {
                    const stockTransactions = transactions
                      .filter(t => t.companySymbol === holding.companySymbol)
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    
                    const totalBuy = stockTransactions
                      .filter(t => t.type === 'buy')
                      .reduce((sum, t) => sum + t.numberOfShares, 0);
                    
                    const totalSell = stockTransactions
                      .filter(t => t.type === 'sell')
                      .reduce((sum, t) => sum + t.numberOfShares, 0);

                    const currentValue = holding.quantity * holding.averageBuyPrice;
                    const isSoldOut = holding.quantity === 0;

                    return (
                      <tr key={holding.companySymbol} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {holding.companySymbol}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {holding.quantity} {isSoldOut && '(Sold Out)'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{holding.averageBuyPrice?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{currentValue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <div className="flex items-center text-green-600">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              <span>{totalBuy}</span>
                            </div>
                            <div className="flex items-center text-red-600">
                              <TrendingDown className="w-4 h-4 mr-1" />
                              <span>{totalSell}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {currentValue > 0 ? (
                              <span className="text-green-600">+0.00%</span>
                            ) : (
                              <span className="text-red-600">-0.00%</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(holding.lastUpdated).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No holdings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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