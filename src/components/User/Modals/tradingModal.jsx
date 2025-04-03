import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { 
  fetchTransactionHistory,
  selectTransactions,
  selectHoldings,
  selectStatistics,
  selectFilteredTransactions
} from '../../../redux/User/trading/tradingSlice';
import { 
  getUserSubscriptions 
} from '../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import { 
  selectActiveEvent,
  selectActiveEvents,
  setActiveEvent
} from '../../../redux/User/events/eventsSlice';
import PortfolioHeader from './PortfolioHeader';
import PortfolioTable from './PortfolioTable';
import StockDetailsModal from './StockDetailsModal';

const UserPortfolioPage = () => {
  const dispatch = useDispatch();
  const activeEvent = useSelector(selectActiveEvent);
  const transactions = useSelector(state => 
    selectFilteredTransactions(state, activeEvent?._id)
  );
  const userId = useSelector(state => state.user.auth?.user?._id);
  const user = useSelector(state => state.user.auth?.user);
  const holdings = useSelector(selectHoldings);
  const statistics = useSelector(selectStatistics);
  const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
  
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getUserSubscriptions(userId));
      dispatch(fetchTransactionHistory({ 
        userId,
        eventId: activeEvent?._id 
      }));
    }
  }, [dispatch, userId, activeEvent?._id]);

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
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200"
        >
          <span>{activeEvent?.title || 'Select Event'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}/>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
            {events.map(event => (
              <button
                key={event._id}
                onClick={() => {
                  onSelectEvent(event);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  activeEvent?._id === event._id ? 'bg-blue-50' : ''
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
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-t border-gray-200"
            >
              All Transactions
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-8 mx-4 -mt-12 h-19 p-4 mb-8.5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {activeEvent ? `${activeEvent.title} Portfolio` : 'My Portfolio'}
        </h2>
        <EventDropdown 
          activeEvent={activeEvent}
          onSelectEvent={(event) => dispatch(setActiveEvent(event))}
        />
      </div>
      <PortfolioHeader 
        user={user}
        statistics={statistics}
        balance={activeSubscription?.vertualAmount || 0}
      />
      
      <div className="mt-0.5">
        <PortfolioTable 
          holdings={holdings}
          transactions={transactions}
          onStockClick={handleStockClick}
        />
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