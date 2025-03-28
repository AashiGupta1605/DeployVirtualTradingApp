// src/pages/Admin/Events/EventModal.js
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Trophy, Medal, Gift, Award, Star, Zap,
  Users, BarChart2, Coins, Plus, Trash2
} from 'lucide-react';

const EventModal = ({ event, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(event ? { 
    ...event,
    startDate: event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : '',
    endDate: event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : '',
    prizeBreakdown: event.prizeBreakdown || [{ position: '', reward: '' }],
    rewards: event.rewards || [''],
    participants: event.participants || 0,
    cashbackPercentage: event.cashbackPercentage || 0,
    entryFee: event.entryFee || 0,
    backgroundColor: event.backgroundColor || 'bg-gradient-to-br from-blue-50 to-blue-100',
    highlight: event.highlight || '',
    requirements: event.requirements || '',
    progress: event.progress || 0,
    progressText: event.progressText || '',
    icon: event.icon || 'Trophy',
  } : {
    title: '',
    type: 'ongoing',
    description: '',
    startDate: '',
    endDate: '',
    participants: 0,
    prize: '',
    prizeBreakdown: [{ position: '', reward: '' }],
    cashbackPercentage: 0,
    difficulty: 'Beginner',
    entryFee: 0,
    rewards: [''],
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    highlight: '',
    requirements: '',
    progress: 0,
    progressText: '',
    icon: 'Trophy',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrizeBreakdownChange = (index, field, value) => {
    const newPrizeBreakdown = [...formData.prizeBreakdown];
    newPrizeBreakdown[index][field] = value;
    setFormData(prev => ({
      ...prev,
      prizeBreakdown: newPrizeBreakdown
    }));
  };

  const addPrizeBreakdownRow = () => {
    setFormData(prev => ({
      ...prev,
      prizeBreakdown: [...prev.prizeBreakdown, { position: '', reward: '' }]
    }));
  };

  const removePrizeBreakdownRow = (index) => {
    if (formData.prizeBreakdown.length > 1) {
      const newPrizeBreakdown = formData.prizeBreakdown.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        prizeBreakdown: newPrizeBreakdown
      }));
    }
  };

  const handleRewardsChange = (index, value) => {
    const newRewards = [...formData.rewards];
    newRewards[index] = value;
    setFormData(prev => ({
      ...prev,
      rewards: newRewards
    }));
  };

  const addReward = () => {
    setFormData(prev => ({
      ...prev,
      rewards: [...prev.rewards, '']
    }));
  };

  const removeReward = (index) => {
    if (formData.rewards.length > 1) {
      const newRewards = formData.rewards.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        rewards: newRewards
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation
    const errors = [];
  
    if (!formData.title.trim()) errors.push('Event title is required');
    if (!formData.description.trim()) errors.push('Event description is required');
    if (!formData.startDate) errors.push('Start date is required');
    if (!formData.endDate) errors.push('End date is required');
  
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
  
    if (end < start) errors.push('End date must be after start date');
  
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }
  
    // Clean up empty reward entries before submitting
    const cleanedFormData = {
      ...formData,
      rewards: formData.rewards.filter(reward => reward.trim() !== '')
    };
  
    onSubmit(cleanedFormData);
  };

  const iconOptions = [
    { value: 'Trophy', label: 'Trophy', icon: <Trophy className="inline mr-2" size={16} /> },
    { value: 'Medal', label: 'Medal', icon: <Medal className="inline mr-2" size={16} /> },
    { value: 'Gift', label: 'Gift', icon: <Gift className="inline mr-2" size={16} /> },
    { value: 'Award', label: 'Award', icon: <Award className="inline mr-2" size={16} /> },
    { value: 'Star', label: 'Star', icon: <Star className="inline mr-2" size={16} /> },
    { value: 'Zap', label: 'Zap', icon: <Zap className="inline mr-2" size={16} /> },
    { value: 'Users', label: 'Users', icon: <Users className="inline mr-2" size={16} /> },
    { value: 'BarChart2', label: 'Chart', icon: <BarChart2 className="inline mr-2" size={16} /> },
    { value: 'Coins', label: 'Coins', icon: <Coins className="inline mr-2" size={16} /> },
  ];

  const backgroundOptions = [
    { value: 'bg-gradient-to-br from-blue-50 to-blue-100', label: 'Blue Gradient' },
    { value: 'bg-gradient-to-br from-green-50 to-green-100', label: 'Green Gradient' },
    { value: 'bg-gradient-to-br from-purple-50 to-purple-100', label: 'Purple Gradient' },
    { value: 'bg-gradient-to-br from-yellow-50 to-yellow-100', label: 'Yellow Gradient' },
    { value: 'bg-gradient-to-br from-pink-50 to-pink-100', label: 'Pink Gradient' },
    { value: 'bg-gradient-to-br from-red-50 to-red-100', label: 'Red Gradient' },
    { value: 'bg-gradient-to-br from-amber-50 to-amber-100', label: 'Amber Gradient' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Basic Event Details */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Difficulty *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Total Prize *</label>
              <input
                type="text"
                name="prize"
                value={formData.prize}
                onChange={handleChange}
                placeholder="Total Prize Pool"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Entry Fee</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Cashback Percentage</label>
              <div className="relative">
                <input
                  type="number"
                  name="cashbackPercentage"
                  value={formData.cashbackPercentage}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="100"
                  className="w-full p-2 pr-8 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Participants</label>
              <input
                type="number"
                name="participants"
                value={formData.participants}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Background</label>
              <select
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {backgroundOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event description"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                required
              />
            </div>

            {/* Prize Breakdown */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Prize Breakdown</label>
              <div className="space-y-2">
                {formData.prizeBreakdown.map((breakdown, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Position (e.g., 1st)"
                      value={breakdown.position}
                      onChange={(e) => handlePrizeBreakdownChange(index, 'position', e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Reward"
                      value={breakdown.reward}
                      onChange={(e) => handlePrizeBreakdownChange(index, 'reward', e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removePrizeBreakdownRow(index)}
                      className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formData.prizeBreakdown.length <= 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPrizeBreakdownRow}
                  className="mt-2 flex items-center text-blue-500 hover:text-blue-700 text-sm"
                >
                  <Plus size={16} className="mr-1" /> Add Prize Position
                </button>
              </div>
            </div>

            {/* Rewards */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Rewards</label>
              <div className="space-y-2">
                {formData.rewards.map((reward, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Reward description"
                      value={reward}
                      onChange={(e) => handleRewardsChange(index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeReward(index)}
                      className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formData.rewards.length <= 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addReward}
                  className="mt-2 flex items-center text-blue-500 hover:text-blue-700 text-sm"
                >
                  <Plus size={16} className="mr-1" /> Add Reward
                </button>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Highlight</label>
              <input
                type="text"
                name="highlight"
                value={formData.highlight}
                onChange={handleChange}
                placeholder="Event highlight"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Event requirements"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Progress</label>
              <div className="relative">
                <input
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="100"
                  className="w-full p-2 pr-8 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Progress Text</label>
              <input
                type="text"
                name="progressText"
                value={formData.progressText}
                onChange={handleChange}
                placeholder="Progress description"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;