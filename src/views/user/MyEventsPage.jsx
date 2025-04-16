import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  fetchUserEvents,
  setFilter,
  setSortBy,
  setActiveEvent,
  clearActiveEvent,
  selectAllEvents,
  selectEventStatus,
  selectEventError,
  selectEventFilters,
  selectEventStatistics,
  selectActiveEvent
} from '../../redux/User/events/eventsSlice';
import {
  Calendar,
  Clock,
  Trophy,
  X,
  CheckCircle,
  Users,
  Info,
  Medal,
  BarChart2,
  TrendingUp,
  Shield,
  Download,
  ChevronDown,
  Zap,
  Award,
  Star,
  IndianRupee
} from 'lucide-react';

const MyEventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Redux selectors
  const events = useSelector(selectAllEvents);
  const status = useSelector(selectEventStatus);
  const error = useSelector(selectEventError);
  const filters = useSelector(selectEventFilters);
  const statistics = useSelector(selectEventStatistics);
  const user = useSelector((state) => state.user.auth.user);
  const isAuthenticated = useSelector((state) => state.user.auth.isAuthenticated);
  const activeEvent = useSelector(selectActiveEvent);

  // Format currency with ₹ symbol
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Fetch events on component mount and when filters change
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserEvents());
    }
  }, [dispatch, isAuthenticated, filters]);

  // Handle filter changes
  const handleFilterChange = (value) => {
    dispatch(setFilter(value));
  };

  // Handle sort changes
  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
  };

  const openDetailsModal = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedEvent(null);
    setIsDetailsModalOpen(false);
  };

  // Handle setting active event
  const handleSetActiveEvent = (event) => {
    if (activeEvent && activeEvent._id === event._id) {
      dispatch(clearActiveEvent());
      toast.success('Event deactivated');
    } else {
      dispatch(setActiveEvent(event));
      toast.success(`${event.title} is now active`);
    }
  };

  // Calculate event progress
  const getEventProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now < start) return 0;
    if (now > end) return 100;

    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  // Filter and sort events
  const filteredEvents = [...events].filter(event => {
    if (filters.status === 'all') return true;
    
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    if (filters.status === 'Ongoing') {
      return startDate <= now && endDate >= now;
    } else if (filters.status === 'Completed') {
      return endDate < now;
    } else if (filters.status === 'Upcoming') {
      return startDate > now;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'startDate') {
      return new Date(a.startDate) - new Date(b.startDate);
    } else if (filters.sortBy === 'entryFee') {
      return a.entryFee - b.entryFee;
    } else if (filters.sortBy === 'performance') {
      return (b.currentPnL || 0) - (a.currentPnL || 0);
    }
    return 0;
  });

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Events</h2>
          <p className="mb-6 text-red-500">{error || 'Failed to fetch events'}</p>
          <button 
            onClick={() => dispatch(fetchUserEvents())}
            className="px-6 py-3 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Authentication check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="mb-6">You need to be logged in to view your events</p>
          <Link 
            to="/login"
            className="px-6 py-3 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Registered': { color: 'text-green-700 bg-green-100', icon: CheckCircle },
      'Completed': { color: 'text-purple-700 bg-purple-100', icon: Trophy },
      'Ongoing': { color: 'text-blue-700 bg-blue-100', icon: BarChart2 },
      'Upcoming': { color: 'text-yellow-700 bg-yellow-100', icon: Clock }
    };

    const config = statusConfig[status] || statusConfig['Registered'];
    const Icon = config.icon;

    return (
      <span className={`flex items-center px-3 py-1 rounded-full text-sm ${config.color}`}>
        <Icon size={14} className="mr-1" />
        {status}
      </span>
    );
  };

  // Progress Bar Component
  const ProgressBar = ({ progress, className }) => {
    return (
      <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
        <div 
          className="bg-lightBlue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  // Event Performance Card Component
  const EventPerformanceCard = ({ event }) => {
    const progress = getEventProgress(event.startDate, event.endDate);
    
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-800">Performance Overview</h4>
          <StatusBadge status={event.status} />
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Current P&L</span>
              <span className={`font-semibold ${
                (event.currentPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {(event.currentPnL || 0) >= 0 ? '+' : ''}{event.currentPnL || '0'}%
              </span>
            </div>
            <ProgressBar 
              progress={Math.abs(event.currentPnL || 0)} 
              className="mb-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Trades</p>
              <p className="font-semibold">{event.totalTrades || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Win Rate</p>
              <p className="font-semibold">{event.winRate || '0'}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Trade</p>
              <p className="font-semibold">{formatCurrency(event.avgTradeSize || 0)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Volume</p>
              <p className="font-semibold">{formatCurrency(event.tradingVolume || 0)}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Event Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </div>
    );
  };

  // Event Rewards Card Component
  const EventRewardsCard = ({ event }) => {
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Potential Rewards</h4>
        <div className="space-y-3">
          {event.rewardTiers?.map((tier, index) => (
            <div 
              key={index}
              className="flex items-center p-2 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Trophy className="text-lightBlue-600" size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{tier.tier}</p>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Event Details Modal Component
  const EventDetailsModal = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) return null;

    const getEventStatus = () => {
      const now = new Date();
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      if (now < startDate) return { text: 'Upcoming', color: 'text-lightBlue-600', bg: 'bg-blue-100' };
      if (now > endDate) return { text: 'Completed', color: 'text-purple-600', bg: 'bg-purple-100' };
      return { text: 'Ongoing', color: 'text-green-600', bg: 'bg-green-100' };
    };

    const status = getEventStatus();

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />
        <div className="relative w-full max-w-[60%] max-h-[80%] mx-2 my-4 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                <Trophy className="text-lightBlue-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
                <div className="flex items-center mt-2 space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${status.bg} ${status.color}`}>
                    {status.text}
                  </span>
                  <span className="text-sm text-gray-500">
                    ID: {event._id.slice(-8).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <X className="text-gray-500" size={24} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Info className="mr-2 text-lightBlue-600" size={18} />
                    Event Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Date</span>
                      <span className="font-medium">
                        {new Date(event.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date</span>
                      <span className="font-medium">
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date</span>
                      <span className="font-medium">
                        {new Date(event.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">
                        {Math.ceil((new Date(event.endDate) - new Date(event.startDate)) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                </div>

                <EventPerformanceCard event={event} />
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Trophy className="mr-2 text-lightBlue-600" size={18} />
                    Prize Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entry Fee Paid</span>
                      <span className="font-medium">₹{event.entryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prize Pool</span>
                      <span className="font-medium text-green-600">{event.prize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potential Rewards</span>
                      <span className="font-medium text-purple-600">
                        Up to {event.maxReward || '200'}% returns
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Shield className="mr-2 text-lightBlue-600" size={18} />
                    Rules & Requirements
                  </h3>
                  <ul className="space-y-2">
                    {event.rules?.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-1.5 mr-2 w-2 h-2 rounded-full bg-lightBlue-600"></div>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>

            <Link
  to={{
    pathname: `/user/tradingnifty`,
    state: { eventId: event._id }
  }}
  className="px-4 py-2 bg-lightBlue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
>
  <BarChart2 className="mr-2" size={16} />
  View Trading Dashboard
</Link>
          </div>
        </div>
      </div>
    );
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Calendar className="text-gray-400" size={36} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-600 mb-4">
        No events found
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        {filters.status !== 'all' 
          ? `No ${filters.status.toLowerCase()} events found. Try changing your filters.`
          : 'Start your trading journey by joining exciting events and competitions!'}
      </p>
      <Link 
        to="/user/eventspage"
        className="px-6 py-3 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
      >
        Browse Events
      </Link>
    </div>
  );

  // Event Card Component
  const EventCard = ({ event, onViewDetails }) => {
    const getEventProgress = () => {
      const now = new Date();
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      
      if (now < start) return 0;
      if (now > end) return 100;
      
      const total = end - start;
      const elapsed = now - start;
      return Math.round((elapsed / total) * 100);
    };
  
    return (
      <div 
        className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200"
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xs mr-3">
                <Trophy className="text-lightBlue-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {event.title}
                </h3>
                <StatusBadge status={
                  new Date() > new Date(event.endDate) ? 'Completed' : 
                  new Date() < new Date(event.startDate) ? 'Upcoming' : 'Ongoing'
                } />
              </div>
            </div>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Calendar className="mr-1.5 text-gray-500" size={14} />
                <span className="text-gray-600">
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center text-sm">
                <IndianRupee className="mr-1.5 text-gray-500" size={14} />
                <div>
                  <span className="text-gray-500">Entry Fee</span>
                  <p className="font-medium">₹{event.entryFee}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-1.5 text-gray-500" size={14} />
                <div>
                  <span className="text-gray-500">Participants</span>
                  <p className="font-medium">{event.participants} joined</p>
                </div>
              </div>
            </div>
  
            {event.currentPnL !== undefined && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Current P&L</span>
                  <span className={`text-sm font-semibold ${
                    (event.currentPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {(event.currentPnL || 0) >= 0 ? '+' : ''}{event.currentPnL || '0'}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      (event.currentPnL || 0) >= 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(Math.abs(event.currentPnL || 0), 100)}%` }}
                  />
                </div>
              </div>
            )}
  
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Event Progress</span>
                <span className="text-gray-700 font-medium">{getEventProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-lightBlue-600 h-1.5 rounded-full"
                  style={{ width: `${getEventProgress()}%` }}
                />
              </div>
            </div>
  
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Medal className="mr-1.5 text-yellow-500" size={14} />
                  <span className="text-sm text-gray-600">Prize Pool</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{event.prize}</span>
              </div>
              {event.maxReward && (
                <div className="text-xs text-gray-500 mt-1">
                  Up to {event.maxReward}% potential returns
                </div>
              )}
            </div>
  
            <div className="flex space-x-2">
              <button
                onClick={onViewDetails}
                className="flex-1 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors flex items-center justify-center"
              >
                <Info className="mr-2" size={16} />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-12 -right-8 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-0 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="relative mt-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              My Trading Events
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Track your event participation, performance, and potential rewards
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-xs p-4 mb-6 grid grid-cols-4 gap-4 border border-gray-100">
          {/* Active Events Stat */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <BarChart2 className="text-green-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Events</p>
              <p className="text-base font-semibold">
                {statistics.activeEvents || 0}
              </p>
            </div>
          </div>

          {/* Total Invested Stat */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <IndianRupee className="text-lightBlue-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Invested</p>
              <p className="text-base font-semibold">
                {formatCurrency(statistics.totalInvested || 0)}
              </p>
            </div>
          </div>

          {/* Completed Events Stat */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Award className="text-purple-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Completed Events</p>
              <p className="text-base font-semibold">
                {statistics.completedEvents || 0}
              </p>
            </div>
          </div>

          {/* Total Rewards Stat */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Trophy className="text-yellow-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Rewards</p>
              <p className="text-base font-semibold">
                {formatCurrency(statistics.totalRewards || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Event Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full shadow-sm p-1 flex space-x-2 border border-gray-200">
            {['all', 'Ongoing', 'Upcoming', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 flex items-center ${
                  filters.status === tab 
                    ? 'bg-lightBlue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab === 'Ongoing' && <Zap className="mr-2" size={16} />}
                {tab === 'Upcoming' && <Calendar className="mr-2" size={16} />}
                {tab === 'Completed' && <Award className="mr-2" size={16} />}
                {tab === 'all' && 'All Events'}
                {tab !== 'all' && `${tab} Events`}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="startDate">Sort by Date</option>
              <option value="entryFee">Sort by Entry Fee</option>
              <option value="performance">Sort by Performance</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event._id}
                event={event}
                onViewDetails={() => openDetailsModal(event)}
              />
            ))}
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={closeDetailsModal}
            event={selectedEvent}
          />
        )}

        {/* Download Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => window.print()}
            className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center"
          >
            <Download className="text-gray-700" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;