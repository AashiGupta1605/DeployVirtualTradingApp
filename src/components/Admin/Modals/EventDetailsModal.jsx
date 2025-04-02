import React from 'react';
import PropTypes from 'prop-types';
import {
  Calendar, Clock, Trophy, Medal, Award,
  DollarSign, Users, BarChart2, Coins,
  X, Edit, Trash2, Shield, BadgeCheck, Zap,
  Info, Gift, Star, Percent, ChevronDown
} from 'lucide-react';

const EventDetailsModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  const getIconComponent = (iconName, size = 24, className = "") => {
    const icons = {
      Trophy: <Trophy className={`text-blue-600 ${className}`} size={size} />,
      Medal: <Medal className={`text-yellow-500 ${className}`} size={size} />,
      Gift: <Gift className={`text-purple-500 ${className}`} size={size} />,
      Award: <Award className={`text-green-500 ${className}`} size={size} />,
      Star: <Star className={`text-orange-500 ${className}`} size={size} />,
      Zap: <Zap className={`text-red-500 ${className}`} size={size} />,
      Users: <Users className={`text-green-500 ${className}`} size={size} />,
      BarChart2: <BarChart2 className={`text-red-500 ${className}`} size={size} />,
      Coins: <Coins className={`text-amber-500 ${className}`} size={size} />,
      Info: <Info className={`text-blue-600 ${className}`} size={size} />,
    };
    return icons[iconName] || <Trophy className={`text-blue-600 ${className}`} size={size} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      <div className="relative w-full max-w-[60%] max-h-[80%] mx-2 my-4 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-xl ${event.backgroundColor || 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
              {getIconComponent(event.icon, 24, "text-gray-100")}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <Shield className="mr-1" size={14} />
                {event.requirements || 'No requirements specified'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="text-gray-500" size={24} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1">
          <div className="p-6 grid md:grid-cols-2 gap-8">
            {/* Left Column - Event Details */}
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Info className="mr-2 text-blue-600" size={18} />
                  Description
                </h3>
                <p className="text-gray-700">{event.description}</p>
              </div>

              {/* Date & Time */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Calendar className="mr-2 text-blue-600" size={18} />
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
                  <Shield className="mr-2 text-blue-600" size={18} />
                  Participation Requirements
                </h3>
                <p className="text-gray-700">{event.requirements || 'No requirements specified'}</p>
              </div>

              {/* Highlight */}
              {event.highlight && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <Zap className="mr-2 text-blue-600" size={18} />
                    Event Highlight
                  </h3>
                  <p className="text-gray-700">{event.highlight}</p>
                </div>
              )}
            </div>

            {/* Right Column - Financial Info */}
            <div className="space-y-6">
              {/* Prize Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Medal className="mr-2 text-blue-600" size={18} />
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
                  <Users className="mr-2 text-blue-600" size={18} />
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
                  {event.progressText || `${event.progress}% complete`}
                </p>
              </div>

              {/* Prize Breakdown */}
              {/* <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Award className="mr-2 text-blue-600" size={18} />
                  Prize Breakdown
                </h3>
                <ul className="space-y-2">
                  {event.prizeBreakdown?.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="font-medium">{item.position}</span>
                      <span className="text-gray-700">{item.reward}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>

          {/* Rewards Section */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Zap className="mr-2 text-blue-600" size={18} />
                Event Rewards
              </h3>
              <ul className="space-y-2">
                {event.rewards?.filter(r => r.trim() !== '').map((reward, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1.5 mr-2 w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-gray-700">{reward}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reward Tiers Section */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Percent className="mr-2 text-blue-600" size={18} />
                Performance Reward Tiers
              </h3>
              <ul className="space-y-4">
                {event.rewardTiers?.map((tier, index) => (
                  <li key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-3">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-800 mr-2">Tier Name:</span>
                            <span className="text-gray-700">{tier.tier}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pl-9">
                      <span className="font-semibold text-gray-800 mr-2">Reward Description:</span>
                      <span className="text-gray-600">{tier.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Created: {new Date(event.createdAt).toLocaleDateString()}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onEdit}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center"
            >
              <Edit className="mr-2" size={16} /> Edit Event
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center"
            >
              <Trash2 className="mr-2" size={16} /> Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EventDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    description: PropTypes.string.isRequired,
    requirements: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    prize: PropTypes.string.isRequired,
    cashbackPercentage: PropTypes.number,
    entryFee: PropTypes.number,
    difficulty: PropTypes.string,
    participants: PropTypes.number,
    progress: PropTypes.number,
    progressText: PropTypes.string,
    prizeBreakdown: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.string.isRequired,
        reward: PropTypes.string.isRequired
      })
    ),
    rewards: PropTypes.arrayOf(PropTypes.string),
    rewardTiers: PropTypes.arrayOf(
      PropTypes.shape({
        tier: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ),
    createdAt: PropTypes.string,
    backgroundColor: PropTypes.string,
    highlight: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventDetailsModal;