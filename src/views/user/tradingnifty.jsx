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
  Info,
  X
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

  // Format date range
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
  };



  // Selected Event Banner Component
  const SelectedEventBanner = () => {
    if (!selectedEvent) return null;

    const daysRemaining = getDaysRemaining(selectedEvent.endDate);
    const progress = Math.min(
      100,
      Math.max(
        0,
        ((new Date() - new Date(selectedEvent.startDate)) /
          (new Date(selectedEvent.endDate) - new Date(selectedEvent.startDate))) *
          100
      )
    );

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-800 mr-3">
                {selectedEvent.title}
              </h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {daysRemaining > 0 ? `${daysRemaining} days left` : 'Completed'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {formatDateRange(selectedEvent.startDate, selectedEvent.endDate)}
            </p>
          </div>
          
          <div className="w-full md:w-64">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Event Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Event Performance Summary Component
  const EventPerformanceSummary = () => {
    if (!selectedEvent || !eventPerformance) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Event Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Time Remaining</span>
            </div>
            <p className="text-lg font-semibold mt-1">
              {getDaysRemaining(selectedEvent.endDate)} days
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Current Rank</span>
            </div>
            <p className="text-lg font-semibold mt-1">
              {eventPerformance.rank || 'N/A'} / {selectedEvent.participants || 'N/A'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
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
      <div className="bg-lightBlue-600 md:pt-8 pb-16 pt-12">
        <div className="px-4 mx-auto w-full max-w-7xl">


          {/* Selected Event Banner */}
          {selectedEvent && <SelectedEventBanner />}

          {/* Event Performance Summary */}
          {selectedEvent && <EventPerformanceSummary />}

          {/* Stats Cards */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="VIRTUAL AMOUNT"
                value={selectedEvent 
                  ? `₹${selectedEvent.virtualAmount?.toFixed(2)}`
                  : activeSubscription?.vertualAmount
                  ? `₹${activeSubscription.vertualAmount.toFixed(2)}`
                  : "₹0.00"}
                icon={<DollarSign className="w-5 h-5" />}
                description={selectedEvent
                  ? `Available for ${selectedEvent.title}`
                  : "Available Virtual Balance"}
                change={currentStats.balanceChange !== undefined
                  ? `${currentStats.balanceChange >= 0 ? '+' : ''}${currentStats.balanceChange}%`
                  : null}
                changeColor={currentStats.balanceChange >= 0 ? "text-emerald-500" : "text-red-500"}
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="TOTAL INVESTMENT"
                value={`₹${currentStats.totalInvestment?.toFixed(2) || '0.00'}`}
                icon={<TrendingUp className="w-5 h-5" />}
                description={selectedEvent
                  ? `Invested in ${selectedEvent.title}`
                  : "Total Amount Invested"}
                change={currentStats.investmentChange !== undefined
                  ? `${currentStats.investmentChange >= 0 ? '+' : ''}${currentStats.investmentChange}%`
                  : null}
                changeColor={currentStats.investmentChange >= 0 ? "text-emerald-500" : "text-red-500"}
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="TRADING PERFORMANCE"
                value={`${currentStats.successRate?.toFixed(2) || '0.00'}%`}
                icon={<BarChart2 className="w-5 h-5" />}
                description={selectedEvent
                  ? `Win Rate in ${selectedEvent.title}`
                  : "Overall Success Rate"}
                change={currentStats.totalTrades
                  ? `${currentStats.winningTrades}/${currentStats.totalTrades} trades`
                  : null}
                changeColor="text-gray-700"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <StatsCard
                title="PROFIT & LOSS"
                value={`₹${currentStats.realizedPL?.toFixed(2) || '0.00'}`}
                icon={<Award className="w-5 h-5" />}
                description={selectedEvent
                  ? `P&L in ${selectedEvent.title}`
                  : "Overall P&L"}
                change={currentStats.realizedPLPercentage !== undefined
                  ? `${currentStats.realizedPLPercentage >= 0 ? '+' : ''}${currentStats.realizedPLPercentage?.toFixed(2)}%`
                  : null}
                changeColor={currentStats.realizedPLPercentage >= 0 ? "text-emerald-500" : "text-red-500"}
              />
            </div>
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

