// src/components/User/Trading/ETFTable.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchUserEvents, 
  fetchEventPerformance,
  setSelectedEvent,
  selectAllEvents,
  selectActiveEvents,
  selectSelectedEvent,
  selectEventPerformance,
  selectEventStatus,
  selectEventTransactions,
  fetchEventSpecificTransactions
} from "../../redux/User/events/eventsSlice";
import { 
  selectUserSubscriptions, 
  getUserSubscriptions 
} from "../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice";
import {
  selectStatistics,
  fetchTransactionHistory,
  
} from "../../redux/User/trading/tradingSlice";
import {
  ChevronDown,
  Trophy,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  BarChart2,
  Clock,
  Award,
  Info
} from 'lucide-react';
import TradingModal from "../../components/User/Modals/tradingModal";
import { toast } from 'react-hot-toast';

const ETFTable = () => {
  const dispatch = useDispatch();
  
  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  
  // Redux selectors
  const allEvents = useSelector(selectAllEvents);
  const activeEvents = useSelector(selectActiveEvents);
  const selectedEvent = useSelector(selectSelectedEvent);
  const eventPerformance = useSelector(selectEventPerformance);
  const eventStatus = useSelector(selectEventStatus);
  const statistics = useSelector(selectStatistics);
  const userSubscriptions = useSelector(selectUserSubscriptions);
  const eventTransactions = useSelector(selectEventTransactions);
  
  // Get active subscription
  const activeSubscription = userSubscriptions?.find(
    sub => sub.status === 'Active' && !sub.isDeleted
  );

  // Initial data fetch
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(getUserSubscriptions(userId));
      dispatch(fetchUserEvents());
    }
  }, [dispatch]);

  // Fetch event-specific data when event is selected
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (selectedEvent?._id) {
      dispatch(fetchEventPerformance(selectedEvent._id));
      dispatch(fetchEventSpecificTransactions({ 
        userId,
        eventId: selectedEvent._id 
      }));
    } else if (userId) {
      dispatch(fetchTransactionHistory({ userId }));
    }
  }, [dispatch, selectedEvent]);

  // Get combined statistics
  const getCombinedStats = () => {
    if (!selectedEvent) return statistics;
    
    return {
      ...statistics,
      ...(eventPerformance || {}),
      virtualAmount: selectedEvent.virtualAmount || 0,
      totalInvestment: eventPerformance?.totalInvestment || 0,
      successRate: eventPerformance?.successRate || 0,
      realizedPL: eventPerformance?.realizedPL || 0,
      realizedPLPercentage: eventPerformance?.realizedPLPercentage || 0,
      recentTrades: eventTransactions || []
    };
  };

  const currentStats = getCombinedStats();

  // Event Selector Component
  const EventSelector = () => {
    const handleEventSelect = (event) => {
      dispatch(setSelectedEvent(event));
      setIsEventDropdownOpen(false);
      
      if (event) {
        toast.success(`Switched to ${event.title}`);
      } else {
        toast.success('Switched to overall trading view');
      }
    };

    return (
      <div className="relative mb-6">
        <div className="flex items-center justify-between mb-2">

          {selectedEvent && (
            <button
              onClick={() => handleEventSelect(null)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              View All Trading
            </button>
          )}
        </div>
        
        <button
          onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
          className="w-full md:w-72 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
        >
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-gray-700">
              {selectedEvent ? selectedEvent.title : 'Select Trading Event'}
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
            isEventDropdownOpen ? 'transform rotate-180' : ''
          }`} />
        </button>

        {isEventDropdownOpen && (
          <div className="absolute top-full left-0 w-full md:w-72 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {activeEvents.length > 0 ? (
              activeEvents.map(event => (
                <button
                  key={event._id}
                  onClick={() => handleEventSelect(event)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{event.title}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString()} - 
                        {new Date(event.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {selectedEvent?._id === event._id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                No active events found
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Stats Card Configuration
  const cardConfigurations = [
    {
      subtitle: "Virtual Amount",
      title: selectedEvent 
        ? `₹${selectedEvent.virtualAmount?.toFixed(2)}` 
        : activeSubscription?.vertualAmount 
          ? `₹${activeSubscription.vertualAmount.toFixed(2)}` 
          : "₹0.00",
      icon: <DollarSign className="w-5 h-5 text-white" />,
      iconColor: "bg-indigo-500",
      description: selectedEvent 
        ? `Available Balance for ${selectedEvent.title}`
        : "Available Virtual Balance",
      stats: currentStats.balanceChange !== undefined 
        ? `${currentStats.balanceChange >= 0 ? '+' : ''}${currentStats.balanceChange}%` 
        : null
    },
    {
      subtitle: "Total Investment",
      title: `₹${currentStats.totalInvestment?.toFixed(2) || '0.00'}`,
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      iconColor: "bg-green-500",
      description: selectedEvent 
        ? `Invested in ${selectedEvent.title}`
        : "Total Amount Invested",
      stats: currentStats.investmentChange !== undefined 
        ? `${currentStats.investmentChange >= 0 ? '+' : ''}${currentStats.investmentChange}%` 
        : null
    },
    {
      subtitle: "Trading Performance",
      title: `${currentStats.successRate?.toFixed(2) || '0.00'}%`,
      icon: <BarChart2 className="w-5 h-5 text-white" />,
      iconColor: "bg-orange-500",
      description: selectedEvent 
        ? `Win Rate in ${selectedEvent.title}`
        : "Overall Success Rate",
      stats: currentStats.totalTrades 
        ? `${currentStats.winningTrades}/${currentStats.totalTrades} trades` 
        : null
    },
    {
      subtitle: "Profit & Loss",
      title: `₹${currentStats.realizedPL?.toFixed(2) || '0.00'}`,
      icon: <Award className="w-5 h-5 text-white" />,
      iconColor: currentStats.realizedPL >= 0 ? "bg-emerald-500" : "bg-red-500",
      description: selectedEvent 
        ? `P&L in ${selectedEvent.title}`
        : "Overall P&L",
      stats: currentStats.realizedPLPercentage !== undefined 
        ? `${currentStats.realizedPLPercentage >= 0 ? '+' : ''}${currentStats.realizedPLPercentage?.toFixed(2)}%` 
        : null
    }
  ];

  // Enhanced Stats Card Component
  const EnhancedCard = ({ config }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{config.subtitle}</p>
          <h3 className="text-xl font-semibold mt-1">{config.title}</h3>
          <p className="text-xs text-gray-500 mt-2">{config.description}</p>
        </div>
        <div className={`p-3 rounded-full ${config.iconColor}`}>
          {config.icon}
        </div>
      </div>
      {config.stats && (
        <div className="mt-3 text-sm font-medium">
          <span className={config.subtitle === "Profit & Loss" 
            ? (parseFloat(config.stats) >= 0 ? 'text-green-600' : 'text-red-600') 
            : 'text-gray-700'
          }>
            {config.stats}
          </span>
        </div>
      )}
    </div>
  );

  // Event Performance Summary Component
  const EventPerformanceSummary = () => {
    if (!selectedEvent || !eventPerformance) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Event Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Time Remaining</span>
            </div>
            <p className="text-lg font-semibold mt-1">
  {Math.max(0, Math.ceil((new Date(selectedEvent.endDate) - new Date()) / (1000 * 60 * 60 * 24)))} days
</p>

          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Current Rank</span>
            </div>
            <p className="text-lg font-semibold mt-1">
              {eventPerformance.rank || 'N/A'} / {selectedEvent.participants || 'N/A'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Target Achievement</span>
            </div>
            <p className="text-lg font-semibold mt-1">
              {eventPerformance.targetAchievement?.toFixed(2) || '0.00'}%
            </p>
          </div>
        </div>
      </div>
    );
  };


  // Main Render
  return (
    <div className="mt-24">
      <div className="bg-lightBlue-600 md:pt-8 pb-16 pt-12">
        <div className="px-4 mx-auto w-full max-w-7xl">
          {/* Event Selector */}
          <EventSelector />

          {/* Event Performance Summary */}
          {selectedEvent && <EventPerformanceSummary />}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cardConfigurations.map((config, index) => (
              <EnhancedCard key={index} config={config} />
            ))}
          </div>


        </div>
      </div>

      {/* Trading Modal */}
      <TradingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedEvent={selectedEvent}
        virtualAmount={selectedEvent?.virtualAmount || activeSubscription?.vertualAmount}
      />
    </div>
  );
};

export default ETFTable;