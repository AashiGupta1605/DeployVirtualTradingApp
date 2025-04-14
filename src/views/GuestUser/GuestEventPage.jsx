import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Calendar,
  Clock,
  Trophy,
  Gift,
  Users,
  Star,
  ArrowRight,
  Info,
  Medal,
  Zap,
  Award,
  BarChart2,
  DollarSign,
  TrendingUp,
  Shield,
  BadgeCheck,
  Coins,
  X
} from 'lucide-react';
import { fetchEvents, selectEvents, selectEventsStatus } from '../../redux/Admin/EventManage/eventSlice';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../../views/auth/UnifiedLoginModal';
import RegisterModal from '../../views/auth/UnifiedRegistrationModal';

const EventDetailsModal = ({ event, onClose, onJoin }) => {
  if (!event) return null;

  const getIconComponent = (iconName, size = 24, className = "") => {
    const icons = {
      Trophy: <Trophy className={`text-blue-500 ${className}`} size={size} />,
      Medal: <Medal className={`text-yellow-500 ${className}`} size={size} />,
      Gift: <Gift className={`text-purple-500 ${className}`} size={size} />,
      Award: <Award className={`text-green-500 ${className}`} size={size} />,
      Star: <Star className={`text-orange-500 ${className}`} size={size} />,
      Zap: <Zap className={`text-red-500 ${className}`} size={size} />,
      Users: <Users className={`text-green-500 ${className}`} size={size} />,
      BarChart2: <BarChart2 className={`text-red-500 ${className}`} size={size} />,
      Coins: <Coins className={`text-amber-500 ${className}`} size={size} />,
      Info: <Info className={`text-blue-500 ${className}`} size={size} />,
    };
    return icons[iconName] || <Trophy className={`text-blue-500 ${className}`} size={size} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      <div className="relative w-full max-w-[60%] max-h-[80%] mx-2 my-4 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              {getIconComponent(event.icon, 24, "text-blue-600")}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="text-gray-500" size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Event Details */}
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Info className="mr-2 text-blue-500" size={18} />
                  Description
                </h3>
                <p className="text-gray-700">{event.description}</p>
              </div>

              {/* Date & Time */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Calendar className="mr-2 text-blue-500" size={18} />
                  Event Schedule
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">End Date</p>
                      <p className="font-medium">
                        {new Date(event.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Shield className="mr-2 text-blue-500" size={18} />
                  Participation Requirements
                </h3>
                <p className="text-gray-700">{event.requirements}</p>
              </div>
            </div>

            {/* Right Column - Financial Info */}
            <div className="space-y-6">
              {/* Prize Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Medal className="mr-2 text-blue-500" size={18} />
                  Prize Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Total Prize</p>
                      <p className="font-medium text-blue-600">{event.prize}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BadgeCheck className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Cashback</p>
                      <p className="font-medium text-green-600">
                        {event.cashbackPercentage}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Entry Fee</p>
                      <p className="font-medium">${event.entryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Difficulty</p>
                      <p className="font-medium">{event.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participation */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="mr-2 text-blue-500" size={18} />
                  Participation Stats
                </h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Participants:</span>
                  <span className="font-medium">{event.participants}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${event.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  {event.progressText}
                </p>
              </div>

              {/* Prize Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Award className="mr-2 text-blue-500" size={18} />
                  Prize Breakdown
                </h3>
                <ul className="space-y-2">
                  {event.prizeBreakdown.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="font-medium">{item.position}</span>
                      <span className="text-gray-700">{item.reward}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Zap className="mr-2 text-blue-500" size={18} />
                Event Rewards
              </h3>
              <ul className="space-y-2">
                {event.rewards.map((reward, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1.5 mr-2 w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-gray-700">{reward}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-center">
          <button
            onClick={onJoin}
            className="px-8 py-3 rounded-lg bg-lightBlue-600 text-white hover:bg-blue-700 transition-colors flex items-center"
          >
            <ArrowRight className="mr-2" size={16} /> Join Event Now
          </button>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  // Updated authentication state access
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState?.isAuthenticated || false;

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Calculate stats from existing events data
  const calculateStats = () => {
    const now = new Date();
    let activeTraders = 0;
    let activeEvents = 0;
    let upcomingEvents = 0;
    let totalPrizePool = 0;

    events.forEach(event => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      // Sum participants for active traders count
      activeTraders += event.participants || 0;
      
      // Calculate prize pool (remove non-numeric characters and sum)
      const prizeValue = parseFloat(event.prize?.replace(/[^0-9.]/g, '')) || 0;
      totalPrizePool += prizeValue;

      // Count active and upcoming events
      if (startDate <= now && endDate >= now) {
        activeEvents++;
      } else if (startDate > now) {
        upcomingEvents++;
      }
    });

    return {
      activeTraders,
      activeEvents,
      upcomingEvents,
      totalPrizePool: `$${totalPrizePool.toLocaleString()}`,
    };
  };

  const stats = calculateStats();

  const handleJoinEvent = () => {
    if (isAuthenticated) {
      console.log('Joining event:', selectedEvent?.title);
      setSelectedEvent(null);
    } else {
      setShowLoginModal(true);
      setSelectedEvent(null);
    }
  };

  const handleQuickJoin = (event) => {
    if (isAuthenticated) {
      console.log('Quick joining event:', event.title);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (selectedEvent) {
      console.log('Joining event after login:', selectedEvent?.title);
      setSelectedEvent(null);
    }
  };

  const handleRegisterClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleLoginClick = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Trophy: <Trophy className="text-blue-500" size={24} />,
      Medal: <Medal className="text-yellow-500" size={24} />,
      Gift: <Gift className="text-purple-500" size={24} />,
      Award: <Award className="text-green-500" size={24} />,
      Star: <Star className="text-orange-500" size={24} />,
      Zap: <Zap className="text-red-500" size={24} />,
      Users: <Users className="text-green-500" size={24} />,
      BarChart2: <BarChart2 className="text-red-500" size={24} />,
      Coins: <Coins className="text-amber-500" size={24} />,
    };
    return icons[iconName] || <Trophy className="text-blue-500" size={24} />;
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    if (activeTab === 'ongoing') {
      return startDate <= now && endDate >= now;
    } else if (activeTab === 'upcoming') {
      return startDate > now;
    } else if (activeTab === 'completed') {
      return endDate < now;
    }
    return true;
  });

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-12 -right-8 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-0 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="relative mt-16">
            <h1 className="text-4xl font-extrabold text-gray-900">
              DreamNifty Trading Events
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Compete in thrilling trading challenges, master new strategies, and win life-changing rewards! 
              Our events cater to all skill levels with prizes worth over $250,000 annually.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-xs p-4 mb-6 grid grid-cols-3 gap-4 border border-gray-100">
          {/* Active Traders Stat */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="text-green-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Traders</p>
              <p className="text-base font-semibold">
                {stats.activeTraders.toLocaleString()}+
              </p>
            </div>
          </div>

          {/* Active Events Stat */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <TrendingUp className="text-yellow-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Events</p>
              <p className="text-base font-semibold">
                {stats.activeEvents}
              </p>
            </div>
          </div>

          {/* Upcoming Events Stat */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Award className="text-blue-600" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Upcoming Events</p>
              <p className="text-base font-semibold">
                {stats.upcomingEvents}
              </p>
            </div>
          </div>
        </div>

        {/* Event Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full shadow-sm p-1 flex space-x-2 border border-gray-200">
            {['ongoing', 'upcoming', 'completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 flex items-center ${
                  activeTab === tab 
                    ? 'bg-lightBlue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab === 'ongoing' && <Zap className="mr-2" size={16} />}
                {tab === 'upcoming' && <Calendar className="mr-2" size={16} />}
                {tab === 'completed' && <Award className="mr-2" size={16} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div 
              key={event._id} 
              className={`relative rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${event.backgroundColor} border border-gray-200`}
            >
              {/* Highlight Badge */}
              {event.highlight && (
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-xs flex items-center">
                  <Zap className="mr-1 text-yellow-500" size={14} />
                  {event.highlight}
                </div>
              )}
              
              <div className="p-5">
                {/* Event Header */}
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-xs mr-4">
                    {getIconComponent(event.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {event.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Award className="text-gray-400 mr-1" size={14} />
                      <span className="text-xs text-gray-500">{event.difficulty}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
                
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium">
                        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Prize Pool</p>
                      <p className="text-sm font-medium">{event.prize}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <Info className="mr-1" size={16} />
                    View Details
                  </button>
                  <button 
                    onClick={() => handleQuickJoin(event)}
                    className="px-4 py-2 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Quick Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Calendar className="text-gray-400" size={36} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No {activeTab} events at the moment
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We're preparing exciting new challenges for you. Check back soon or explore our learning resources while you wait.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Notify Me About New Events
            </button>
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventDetailsModal 
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onJoin={handleJoinEvent}
          />
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-medium flex items-center">
                <Info className="text-blue-500 mr-3" size={20} />
                How do I participate in an event?
              </h3>
              <p className="mt-2 text-gray-600 pl-8">
                Simply click the "Join Event Now" button on any event card, complete the registration process, and pay the entry fee if applicable. You'll receive immediate access to the event dashboard.
              </p>
            </div>
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-medium flex items-center">
                <Info className="text-blue-500 mr-3" size={20} />
                Are there any requirements to join?
              </h3>
              <p className="mt-2 text-gray-600 pl-8">
                Most events require a minimum account balance or trading volume. Beginner events often have no requirements, while advanced competitions may require verification of trading experience.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-medium flex items-center">
                <Info className="text-blue-500 mr-3" size={20} />
                How are winners determined?
              </h3>
              <p className="mt-2 text-gray-600 pl-8">
                Winners are ranked based on event-specific metrics (ROI, accuracy, profit, etc.). All judging criteria are clearly outlined in each event's rules, and standings are updated in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterClick={handleRegisterClick}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLoginClick={handleLoginClick}
      />

      {/* Animated Background Elements */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;