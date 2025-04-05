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
  ArrowRight, Medal, Zap, Award, ChevronDown, 
  BarChart2, DollarSign, Plus, Edit, 
  Trash2, Shield, BadgeCheck, Coins, Info, Percent
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import EventModal from '../../components/Admin/Modals/EventModal';
import EventDetailsModal from '../../components/Admin/Modals/EventDetailsModal';
import StatsSection from '../../components/Admin/Cards/StatsSection';

const AdminEventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    setIsCreateModalOpen(false);
  };

  const handleUpdateEvent = (eventData) => {
    if (currentEvent) {
      dispatch(updateEvent({ 
        eventId: currentEvent._id, 
        eventData 
      }));
      setIsCreateModalOpen(false);
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
    setIsCreateModalOpen(true);
  };

  const openEditModal = (event) => {
    setCurrentEvent(event);
    setIsCreateModalOpen(true);
  };

  const openDetailsModal = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

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
    };
    return icons[iconName] || <Trophy className={`text-blue-600 ${className}`} size={size} />;
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
      <StatsSection isDashboard={false} pageType="events" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Event Management
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Create and manage trading competitions with performance-based rewards!
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
                className={`rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${event.backgroundColor || 'bg-gradient-to-br from-blue-50 to-blue-100'} border border-gray-200`}
              >
                <div className="p-5">
                  {/* Event Header */}
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-xs mr-4">
                      {getIconComponent(event.icon, 24)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {event.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Shield className="text-gray-400 mr-1" size={14} />
                        <span className="text-xs text-gray-500">Entry: ${event.entryFee || 'Free'}</span>
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
                  
                  {/* Reward Requirements Preview */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <Percent className="mr-1 text-gray-500" size={16} />
                      <span className="font-medium">Reward Tiers:</span>
                      <span className="ml-1">
                        {event.rewardTiers?.slice(0, 3).map(tier => tier.tier).join(', ')}
                        {event.rewardTiers?.length > 3 && '...'}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {event.participants || 0} participants
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{event.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${event.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => openDetailsModal(event)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Info className="mr-1" size={16} />
                      View Details
                    </button>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(event)}
                        className="text-gray-500 hover:text-blue-500 transition-colors"
                        aria-label="Edit event"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event._id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Delete event"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
                Get started by creating your first trading competition.
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

        {/* Create/Edit Event Modal */}
        {isCreateModalOpen && (
          <EventModal 
            event={currentEvent}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={currentEvent ? handleUpdateEvent : handleCreateEvent}
          />
        )}

        {/* Event Details Modal */}
        {isDetailsModalOpen && selectedEvent && (
          <EventDetailsModal 
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            event={selectedEvent}
            onEdit={() => {
              setIsDetailsModalOpen(false);
              openEditModal(selectedEvent);
            }}
            onDelete={() => {
              setIsDetailsModalOpen(false);
              handleDeleteEvent(selectedEvent._id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;