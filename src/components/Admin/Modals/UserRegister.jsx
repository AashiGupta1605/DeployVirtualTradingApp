import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  registerUser,
  updateUser,
  resetForm,
  selectRegistrationLoading,
  selectRegistrationError,
  selectRegistrationSuccess,
  selectNotificationStatus,
} from '../../../redux/Admin/RegisteredUsersPage/UserRegisterSlice';
import { fetchUsers } from '../../../redux/User/userSlice';

const UserRegisterModal = ({ isOpen, onClose, selectedUser, onSuccess }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectRegistrationLoading);
  const error = useSelector(selectRegistrationError);
  const success = useSelector(selectRegistrationSuccess);
  const notification = useSelector(selectNotificationStatus);

  // Initial form values
  const initialValues = {
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    mobile: selectedUser?.mobile || "",
    gender: selectedUser?.gender || "",
    dob: selectedUser?.dob ? new Date(selectedUser.dob).toISOString().split('T')[0] : "",
    // orgtype: selectedUser?.orgtype || ""
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(['Male', 'Female', 'Other'], "Invalid gender selection"),
    dob: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future"),
    // orgtype: Yup.string()
    //   .optional()
    //   .min(2, "Organization type must be at least 2 characters"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (selectedUser) {
          await dispatch(updateUser({
            id: selectedUser._id,
            data: values
          })).unwrap();
          toast.success('User updated successfully!');
        } else {
          const result = await dispatch(registerUser(values)).unwrap();
          await dispatch(fetchUsers());
        }
        onSuccess?.();
        resetForm();
        onClose();
      } catch (err) {
        toast.error(err.message || 'Operation failed');
        console.error('Operation failed:', err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
      dispatch(resetForm());
    }
  }, [isOpen, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Small screen styling (mobile) */}
      <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden sm:hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-lightBlue-600 rounded-xl flex items-center justify-center">
              <i className="fas fa-user text-white text-sm"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedUser ? "Edit User" : "Register New User"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            disabled={formik.isSubmitting}
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600 text-sm"></i>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={formik.handleSubmit} className="p-4">
          <div className="flex-1 max-h-[300px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                {...formik.getFieldProps('name')}
                className={`w-full px-3 py-2 !rounded-xl border ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter full name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                {...formik.getFieldProps('email')}
                className={`w-full px-3 py-2 !rounded-xl border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter email address"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                {...formik.getFieldProps('mobile')}
                className={`w-full px-3 py-2 !rounded-xl border ${
                  formik.touched.mobile && formik.errors.mobile
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter mobile number"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.mobile}</p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                {...formik.getFieldProps('gender')}
                className={`w-full px-3 py-2 rounded-xl border ${
                  formik.touched.gender && formik.errors.gender
                    ? 'border-red-500'
                    : 'border-gray-200'
                } focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.gender}</p>
              )}
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                {...formik.getFieldProps('dob')}
                className={`w-full px-3 py-2 rounded-xl border ${
                  formik.touched.dob && formik.errors.dob
                    ? 'border-red-500'
                    : 'border-gray-200'
                }  border-gray-200 
                   focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 
                   focus:outline-none transition-all duration-200`}
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.dob}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                {...formik.getFieldProps('dob')}
                className={`w-full px-3 py-2 rounded-xl border ${
                  formik.touched.dob && formik.errors.dob
                    ? 'border-red-500'
                    : 'border-gray-200'
                }  border-gray-200 
                   focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 
                   focus:outline-none transition-all duration-200`}
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.dob}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                {...formik.getFieldProps('dob')}
                className={`w-full px-3 py-2 rounded-xl border ${
                  formik.touched.dob && formik.errors.dob
                    ? 'border-red-500'
                    : 'border-gray-200'
                }  border-gray-200 
                   focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 
                   focus:outline-none transition-all duration-200`}
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.dob}</p>
              )}
            </div>

            {/* Organization Type Field */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Type
              </label>
              <input
                type="text"
                name="orgtype"
                {...formik.getFieldProps('orgtype')}
                className={`w-full px-3 py-2 !rounded-xl border ${
                  formik.touched.orgtype && formik.errors.orgtype
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter organization type"
              />
              {formik.touched.orgtype && formik.errors.orgtype && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.orgtype}</p>
              )}
            </div> */}
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Form Actions */}
          <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t border-gray-100">
          <div className="flex justify-end items-center space-x-3  pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className={`px-4 py-2 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 text-sm ${
                (formik.isSubmitting || !formik.isValid) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {formik.isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : selectedUser ? (
                'Update User'
              ) : (
                'Register User'
              )}
            </button>
          </div>
          </div>
        </form>
      </div>

      {/* Large screen styling (desktop) */}
      <div className="relative hidden sm:block  lg:w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center">
              <i className="fas fa-user text-white text-base"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedUser ? "Edit User" : "Register New User"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            disabled={formik.isSubmitting}
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600 text-base"></i>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={formik.handleSubmit} className="p-6 ">
          <div className="flex-1 max-h-[300px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                {...formik.getFieldProps('name')}
                className={`w-full px-4 py-3 !rounded-xl border ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter full name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                {...formik.getFieldProps('email')}
                className={`w-full px-4 py-3 !rounded-xl border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter email address"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                {...formik.getFieldProps('mobile')}
                className={`w-full px-4 py-3 !rounded-xl border ${
                  formik.touched.mobile && formik.errors.mobile
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter mobile number"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.mobile}</p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                {...formik.getFieldProps('gender')}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.gender && formik.errors.gender
                    ? 'border-red-500'
                    : 'border-gray-200'
                } focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.gender}</p>
              )}
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                {...formik.getFieldProps('dob')}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.dob && formik.errors.dob
                    ? 'border-red-500'
                    : 'border-gray-200'
                }  border-gray-200 
                   focus:border-lightBlue-600 focus:ring-2 focus:ring-lightBlue-600/20 
                   focus:outline-none transition-all duration-200`}
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.dob}</p>
              )}
            </div>

            {/* Organization Type Field */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Type
              </label>
              <input
                type="text"
                name="orgtype"
                {...formik.getFieldProps('orgtype')}
                className={`w-full px-4 py-3 !rounded-xl border ${
                  formik.touched.orgtype && formik.errors.orgtype
                    ? 'border-red-500'
                    : 'border-gray-200'
                } !border-gray-200 
                 bg-white text-gray-900 
                 focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                 focus:outline-none transition-all duration-200`}
                placeholder="Enter organization type"
              />
              {formik.touched.orgtype && formik.errors.orgtype && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.orgtype}</p>
              )}
            </div> */}
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-xl text-base">
              {error}
            </div>
          )}

          {/* Form Actions */}
          <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t border-gray-100">
          <div className="flex justify-end items-center space-x-4  pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-base"
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className={`px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 text-base ${
                (formik.isSubmitting || !formik.isValid) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {formik.isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : selectedUser ? (
                'Update User'
              ) : (
                'Register User'
              )}
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

UserRegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default UserRegisterModal;