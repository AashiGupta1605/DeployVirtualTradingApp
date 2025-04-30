import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Award,
  DollarSign,
  BookUser,
} from 'lucide-react';

import { 
  fetchTransactionHistory,
  selectHoldings,
  selectStatistics,
  fetchEventSpecificTransactions,
  selectFilteredTransactions
} from '../../../redux/User/trading/tradingSlice';
import { 
  getUserSubscriptions 
} from '../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import { 
  selectActiveEvent,
  selectActiveEvents,
  setActiveEvent,
  fetchUserEvents
} from '../../../redux/User/events/eventsSlice';
import StockDetailsModal from './StockDetailsModal';
import PortfolioTable from './PortfolioTable';
import StatsSection from "../Cards/StatsSection";
import { useUserStats } from "../../../hooks/userUserStats";
const UserPortfolioPage = () => {
const {refetch} = useUserStats();
    const dispatch = useDispatch();
    const location = useLocation();
    const activeEvent = useSelector(selectActiveEvent);
    const activeEvents = useSelector(selectActiveEvents);
    const userId = useSelector(state => state.user.auth?.user?._id);
    const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
    
    const [selectedStock, setSelectedStock] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    // Get filtered transactions based on active event
    const transactions = useSelector(state => 
      selectFilteredTransactions(state, activeEvent?._id || 'none')
    );
    
    const holdings = useSelector(selectHoldings);
    const statistics = useSelector(selectStatistics);
  
    const activeSubscription = userSubscriptions.find(sub => 
      sub.status === 'Active' && !sub.isDeleted
    );



  useEffect(() => {
    const initializeEvent = async () => {
      if (location.state?.eventId) {
        try {
          // First check if we already have the events loaded
          let event = activeEvents.find(e => e._id === location.state.eventId);
          
          if (!event) {
            // If event not found, fetch events
            await dispatch(fetchUserEvents());
            const updatedEvents = useSelector(selectActiveEvents);
            event = updatedEvents.find(e => e._id === location.state.eventId);
          }
          
          if (event) {
            dispatch(setActiveEvent(event));
          }
        } catch (error) {
          console.error('Error initializing event:', error);
        }
      }
      setIsLoading(false);
    };

    initializeEvent();
  }, [location.state, dispatch]);

  useEffect(() => {
    if (location.state?.eventId) {
      // First check if the event is already in activeEvents
      const event = activeEvents.find(e => e._id === location.state.eventId);
      if (event) {
        dispatch(setActiveEvent(event));
      } else {
        // If event not found, fetch events first
        dispatch(fetchUserEvents()).then(() => {
          const foundEvent = useSelector(selectActiveEvents).find(e => e._id === location.state.eventId);
          if (foundEvent) {
            dispatch(setActiveEvent(foundEvent));
          }
        });
      }
    }
  }, [location.state, activeEvents, dispatch]);

  useEffect(() => {
    if (userId && !isLoading) {
      dispatch(getUserSubscriptions(userId));
      
      if (activeEvent?._id) {
        dispatch(fetchEventSpecificTransactions({ 
          userId, 
          eventId: activeEvent._id 
        }));
      } else {
        dispatch(fetchTransactionHistory({ 
          userId, 
          eventId: 'none'
        }));
      }
    }
  }, [dispatch, userId, activeEvent, isLoading]);

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
    const [isOpen, setIsOpen] = useState(false);
    const activeEvents = useSelector(selectActiveEvents);
  
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200 hover:bg-gray-50"
        >
          <span className="font-medium">
            {activeEvent ? activeEvent.title : 'Basic Transactions'}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}/>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <button
              onClick={() => {
                onSelectEvent(null);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                !activeEvent ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              Basic Transactions
            </button>
            {activeEvents.map(event => (
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
          </div>
        )}
      </div>
    );
  };

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
    <div>
          <div className="-mt-24">
        <StatsSection isDashboard={false} pageType="trading" />
          </div>

        {/* </div> */}
      {/* </div> */}

      {/* Portfolio Content */}
      <div className="px-4 md:px-8 mx-4 -mt-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center">
              <BookUser className="text-gray-600 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                {activeEvent ? `${activeEvent.title} Portfolio` : 'Basic Trading Portfolio'}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0">
              <EventDropdown 
                activeEvent={activeEvent}
                onSelectEvent={(event) => dispatch(setActiveEvent(event))}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <PortfolioTable 
              transactions={transactions} 
              holdings={holdings} 
              onStockClick={handleStockClick} 
            />
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