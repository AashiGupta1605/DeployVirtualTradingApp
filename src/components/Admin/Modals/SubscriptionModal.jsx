// components/Admin/Modals/SubscriptionModal.jsx

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from './ConformationModal';
import {
  createSubscription,
  updateSubscription,
  getUserSubscriptions,
  cancelSubscription,
  selectLoading,
  selectError,
  selectUserSubscriptions
} from '../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';

// Utility function for date calculation
const calculateEndDate = (startDate, duration) => {
  if (!startDate || !duration) return '';
  
  const date = new Date(startDate);
  switch (duration) {
    case '1 Month':
      date.setMonth(date.getMonth() + 1);
      break;
    case '3 Months':
      date.setMonth(date.getMonth() + 3);
      break;
    case '6 Months':
      date.setMonth(date.getMonth() + 6);
      break;
    default:
      return '';
  }
  return date.toISOString().split('T')[0];
};

// Plan configurations
const PLAN_CONFIGS = {
  Gold: {
    color: 'bg-yellow-500',
    textColor: 'text-yellow-800',
    bgLight: 'bg-yellow-50',
    amount: 1000000
  },
  Silver: {
    color: 'bg-gray-400',
    textColor: 'text-gray-800',
    bgLight: 'bg-gray-50',
    amount: 500000
  },
  Platinum: {
    color: 'bg-purple-500',
    textColor: 'text-purple-800',
    bgLight: 'bg-purple-50',
    amount: 2000000
  },
  Diamond: {
    color: 'bg-lightBlue-500',
    textColor: 'text-lightBlue-800',
    bgLight: 'bg-lightBlue-50',
    amount: 5000000
  }
};

const SubscriptionModal = ({ isOpen, onClose, selectedUser, onSuccess }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const userSubscriptions = useSelector(selectUserSubscriptions);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const activePlan = userSubscriptions?.find(plan => plan.status === 'Active' && !plan.isDeleted);

  const validationSchema = Yup.object().shape({
    plan: Yup.string()
      .required('Plan is required')
      .oneOf(['Gold', 'Silver', 'Platinum', 'Diamond']),
    vertualAmount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive'),
    duration: Yup.string()
      .required('Duration is required')
      .oneOf(['1 Month', '3 Months', '6 Months']),
    startDate: Yup.date()
      .required('Start date is required')
      .min(new Date(), 'Start date cannot be in the past'),
    endDate: Yup.date()
      .required('End date is required')
  });

  const formik = useFormik({
    initialValues: {
      plan: activePlan?.plan || '',
      vertualAmount: activePlan?.vertualAmount || '',
      duration: activePlan?.duration || '',
      startDate: activePlan?.startDate ? new Date(activePlan.startDate).toISOString().split('T')[0] : '',
      endDate: activePlan?.endDate ? new Date(activePlan.endDate).toISOString().split('T')[0] : '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const subscriptionData = {
          ...values,
          userId: selectedUser._id,
        };
        
        if (activePlan) {
          const result = await dispatch(updateSubscription({
            id: activePlan._id,
            updateData: subscriptionData
          })).unwrap();
          
          if (result) {
            toast.success('Subscription updated successfully');
            setIsEditing(false);
            onSuccess?.();
            dispatch(getUserSubscriptions(selectedUser._id));
          }
        } else {
          const result = await dispatch(createSubscription(subscriptionData)).unwrap();
          
          if (result) {
            toast.success('Subscription created successfully');
            setIsEditing(false);
            onSuccess?.();
            dispatch(getUserSubscriptions(selectedUser._id));
          }
        }
      } catch (error) {
        toast.error(error.message || 'Failed to process subscription');
      }
    },
  });

  useEffect(() => {
    if (isOpen && selectedUser?._id) {
      dispatch(getUserSubscriptions(selectedUser._id))
        .unwrap()
        .then(response => {
          console.log('Subscription data received:', response);
        })
        .catch(error => {
          console.error('Error fetching subscriptions:', error);
          toast.error('Failed to fetch subscription details');
        });
    }
  }, [dispatch, isOpen, selectedUser]);

  useEffect(() => {
    if (formik.values.startDate && formik.values.duration) {
      const calculatedEndDate = calculateEndDate(formik.values.startDate, formik.values.duration);
      formik.setFieldValue('endDate', calculatedEndDate);
    }
  }, [formik.values.startDate, formik.values.duration]);

  useEffect(() => {
    if (formik.values.plan) {
      const planConfig = PLAN_CONFIGS[formik.values.plan];
      formik.setFieldValue('vertualAmount', planConfig.amount);
    }
  }, [formik.values.plan]);

  const handleDelete = async () => {
    try {
      await dispatch(cancelSubscription(activePlan._id)).unwrap();
      setShowConfirmDelete(false);
      toast.success('Subscription cancelled successfully');
      onSuccess?.();
      dispatch(getUserSubscriptions(selectedUser._id));
    } catch (error) {
      toast.error(error.message || 'Failed to cancel subscription');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isOpen) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPlanStyle = (plan) => {
    return PLAN_CONFIGS[plan] || {
      bgLight: 'bg-gray-100',
      textColor: 'text-gray-800'
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative w-full max-w-5xl mx-auto my-8 bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-lightBlue-50 to-lightBlue-100 rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-credit-card text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {activePlan ? "Subscription Details" : "New Subscription"}
              </h2>
              <p className="text-sm text-gray-600">Manage subscription plan details</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200"
          >
            <i className="fas fa-times text-gray-500 text-xl"></i>
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${activePlan ? getPlanStyle(activePlan.plan).bgLight : 'bg-lightBlue-100'} 
              rounded-full flex items-center justify-center shadow-md`}>
              <span className={`text-2xl font-bold ${activePlan ? getPlanStyle(activePlan.plan).textColor : 'text-lightBlue-600'}`}>
                {selectedUser?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{selectedUser?.name}</h3>
              <p className="text-gray-600">{selectedUser?.email}</p>
              {activePlan && (
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${getPlanStyle(activePlan.plan).bgLight} ${getPlanStyle(activePlan.plan).textColor}
                    shadow-sm`}>
                    {activePlan.plan} Plan
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subscription Content */}
        <div className="p-6">
          {!activePlan && !isEditing ? (
            // No Active Plan View
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <i className="fas fa-plus text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Active Subscription</h3>
              <p className="text-gray-600 mb-6">Create a new subscription plan for this user</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-8 py-4 bg-lightBlue-600 text-white rounded-xl hover:bg-lightBlue-700 transition-all duration-200 shadow-lg"
              >
                <i className="fas fa-plus-circle mr-2"></i>
                Create New Subscription
              </button>
            </div>
          ) : !isEditing ? (
            // View Mode
            <div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-lightBlue-50 to-lightBlue-100 p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-lightBlue-800">Active Plan Details</h3>
                      <p className="text-lightBlue-600 mt-1">Current subscription information</p>
                    </div>
                  </div>
                </div>

                {/* Plan Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Plan Type */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-2">Plan Type</p>
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full ${getPlanStyle(activePlan?.plan).color} mr-2`}></span>
                      <p className="text-xl font-bold text-gray-800">{activePlan?.plan}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-2">Amount</p>
                    <p className="text-xl font-bold text-gray-800">
                      ₹{activePlan?.vertualAmount?.toLocaleString()}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-2">Duration</p>
                    <p className="text-xl font-bold text-gray-800">{activePlan?.duration}</p>
                  </div>

                  {/* Status */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-2">Status</p>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(activePlan?.status)}`}>
                      {activePlan?.status}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-2">Start Date</p>
                    <p className="text-xl font-bold text-gray-800">{formatDate(activePlan?.startDate)}</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-600 mb-2">End Date</p>
                    <p className="text-xl font-bold text-gray-800">{formatDate(activePlan?.endDate)}</p>
                  </div>
                </div>

                {/* Edit and Cancel Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 mx-4 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-200 shadow-sm"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit Plan
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(true)}
                    className="px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-sm"
                  >
                    <i className="fas fa-trash-alt mr-2"></i>
                    Cancel Plan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Edit/Create Form
            <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-8">
                {/* Form fields */}
                <div className="col-span-2 bg-lightBlue-50 p-4 rounded-xl mb-6">
                  <p className="text-lightBlue-800">
                    <i className="fas fa-info-circle mr-2"></i>
                    Select a plan and duration. The amount will be automatically set based on the plan.
                  </p>
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="plan"
                    {...formik.getFieldProps('plan')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lightBlue-500 focus:ring-2 focus:ring-lightBlue-500/20 transition-all duration-200"
                  >
                    <option value="">Select Plan</option>
                    {Object.keys(PLAN_CONFIGS).map(plan => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                  {formik.touched.plan && formik.errors.plan && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.plan}</p>
                  )}
                </div>

                {/* Amount (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    value={formik.values.vertualAmount ? 
                      `₹${parseInt(formik.values.vertualAmount).toLocaleString()}` : ''}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="duration"
                    {...formik.getFieldProps('duration')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lightBlue-500 focus:ring-2 focus:ring-lightBlue-500/20 transition-all duration-200"
                  >
                    <option value="">Select Duration</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                  {formik.touched.duration && formik.errors.duration && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.duration}</p>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    {...formik.getFieldProps('startDate')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lightBlue-500 focus:ring-2 focus:ring-lightBlue-500/20 transition-all duration-200"
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.startDate}</p>
                  )}
                </div>

                {/* End Date (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formik.values.endDate}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Automatically calculated based on duration
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end items-center space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 mx-4 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 transition-all duration-200 shadow-lg"
                >
                  {activePlan ? 'Update Subscription' : 'Create Subscription'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Cancel Subscription"
        message={`Are you sure you want to cancel the ${activePlan?.plan} subscription plan? This action cannot be undone.`}
      />
    </div>
  );
};

SubscriptionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default SubscriptionModal;