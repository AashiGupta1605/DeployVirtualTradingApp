// src/pages/Admin/Events/AdminEventsPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  selectEvents,
  selectEventsStatus,
  selectEventsError
} from '../../redux/Admin/EventManage/eventSlice';
import {
  Calendar, Clock, Trophy, Gift, Users, Star, 
  ArrowRight, Info, Medal, Zap, Award, ChevronDown, 
  ChevronUp, BarChart2, DollarSign, Plus, Edit, 
  Trash2, Shield, BadgeCheck, Coins
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import EventModal from '../../components/Admin/Modals/EventModal';

const AdminEventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCreateEvent = (eventData) => {
    dispatch(createEvent(eventData));
    setIsModalOpen(false);
  };

  const handleUpdateEvent = (eventData) => {
    if (currentEvent) {
      dispatch(updateEvent({ 
        eventId: currentEvent._id, 
        eventData 
      }));
      setIsModalOpen(false);
      setCurrentEvent(null);
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(eventId));
    }
  };

  const openCreateModal = () => {
    setCurrentEvent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const toggleEventExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Event Management
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Create and manage trading events for your users. Design exciting competitions with attractive prizes!
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={openCreateModal}
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="mr-2" /> Create New Event
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events && events.length > 0 ? (
            events.map(event => (
              <div 
                key={event._id} 
                className={`rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${event.backgroundColor} border border-gray-200`}
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
                      {event.icon === 'Trophy' && <Trophy className="text-blue-500" size={24} />}
                      {event.icon === 'Medal' && <Medal className="text-yellow-500" size={24} />}
                      {event.icon === 'Gift' && <Gift className="text-purple-500" size={24} />}
                      {event.icon === 'Award' && <Award className="text-green-500" size={24} />}
                      {event.icon === 'Star' && <Star className="text-orange-500" size={24} />}
                      {event.icon === 'Zap' && <Zap className="text-red-500" size={24} />}
                      {event.icon === 'Users' && <Users className="text-green-500" size={24} />}
                      {event.icon === 'BarChart2' && <BarChart2 className="text-red-500" size={24} />}
                      {event.icon === 'Coins' && <Coins className="text-amber-500" size={24} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {event.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Shield className="text-gray-400 mr-1" size={14} />
                        <span className="text-xs text-gray-500">{event.requirements}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-5">{event.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{event.progressText}</span>
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${event.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex items-center">
                      <Calendar className="mr-2 text-gray-500" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Starts</p>
                        <p className="text-sm font-medium">{new Date(event.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 text-gray-500" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Ends</p>
                        <p className="text-sm font-medium">{new Date(event.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Award className="mr-2 text-gray-500" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Level</p>
                        <p className="text-sm font-medium">{event.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 text-gray-500" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Entry Fee</p>
                        <p className="text-sm font-medium">${event.entryFee}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Prize Pool Section */}
                  <div className="bg-white/80 p-4 rounded-lg mb-5 border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Medal className="mr-2 text-yellow-500" size={18} />
                        Total Prize Pool
                      </span>
                      <span className="font-bold text-blue-600">{event.prize}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600 flex items-center">
                        <BadgeCheck className="mr-2 text-green-500" size={18} />
                        Cashback Offer
                      </span>
                      <span className="font-bold text-green-600">
                        {event.cashbackPercentage}%
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleEventExpand(event._id)}
                      className="w-full text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center"
                    >
                      {expandedEvent === event._id ? (
                        <>
                          <span>Hide prize breakdown</span>
                          <ChevronUp className="ml-1" size={16} />
                        </>
                      ) : (
                        <>
                          <span>View prize breakdown</span>
                          <ChevronDown className="ml-1" size={16} />
                        </>
                      )}
                    </button>
                    
                    {/* Expanded Prize Breakdown */}
                    {expandedEvent === event._id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-500 mb-2">PRIZE DISTRIBUTION</h4>
                        <ul className="space-y-3">
                          {event.prizeBreakdown.map((item, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span className="text-sm font-medium">{item.position}</span>
                              <span className="text-sm text-gray-700">{item.reward}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Rewards List */}
                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <Zap className="mr-2 text-yellow-500" size={16} />
                      EVENT REWARDS
                    </h4>
                    <ul className="space-y-3">
                      {event.rewards.map((reward, index) => (
                        <li 
                          key={index} 
                          className="flex items-start text-sm text-gray-600"
                        >
                          <div className="mt-0.5 mr-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(event)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        aria-label="Edit event"
                      >
                        <Edit size={20} />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete event"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      Created: {new Date(event.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Calendar className="text-gray-400" size={36} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                No events created yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Get started by creating your first trading event for users to participate in.
              </p>
              <button 
                onClick={openCreateModal}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Event
              </button>
            </div>
          )}
        </div>

        {/* Event Modal */}
        {isModalOpen && (
  <EventModal 
    isOpen={true}  // Explicitly set to true
    onClose={() => setIsModalOpen(false)}
    event={currentEvent}
    onSubmit={currentEvent ? handleUpdateEvent : handleCreateEvent}
  />
)}
      </div>
    </div>
  );
};

export default AdminEventsPage;