// OrganizationRegistrationForm.jsx - Part 1
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  registerOrganization,
  updateOrganization,
  resetForm,
  selectRegistrationState
} from '../../../redux/Admin/OrganizationListPage/OrganizationRegisterSlice';
import { fetchOrganizations } from '../../../redux/Organization/auth/organizationAuthSlice';

const OrganizationRegistrationForm = ({ isOpen, onClose, selectedOrg, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    success,
    notification
  } = useSelector(selectRegistrationState);

  const initialValues = useMemo(() => ({
    name: selectedOrg?.name || "",
    address: selectedOrg?.address || "",
    website: selectedOrg?.website || "",
    contactPerson: selectedOrg?.contactPerson || "",
    email: selectedOrg?.email || "",
    mobile: selectedOrg?.mobile || "",
    approvalStatus: selectedOrg?.approvalStatus || "approved",
  }), [selectedOrg]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Organization Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),
    address: Yup.string()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters"),
    website: Yup.string()
      .url("Invalid URL format")
      .nullable(),
    contactPerson: Yup.string()
      .required("Contact Person is required")
      .min(2, "Contact person name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const generatePassword = (orgName) => {
    const symbols = ['@', '#', '$', '%', '&', '*', '!'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomNumbers = Math.floor(Math.random() * 900 + 100);
    return `${orgName}${randomSymbol}${randomNumbers}`;
  };

  useEffect(() => {
    if (success) {
      onClose();
      dispatch(resetForm());
      dispatch(fetchOrganizations());
    }
  }, [success, dispatch, onClose]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

// Part of OrganizationRegistrationForm.jsx

// OrganizationRegistrationForm.jsx
const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  try {
    const cleanedValues = Object.fromEntries(
      Object.entries(values)
        .filter(([key, value]) =>
          value !== undefined &&
          value !== '' &&
          !['_id', 'password', 'createDate', 'updateDate', '__v'].includes(key)
        )
    );

    if (selectedOrg) {
      const updateResult = await dispatch(updateOrganization({
        id: selectedOrg._id,
        data: cleanedValues
      })).unwrap();

      // Handle update success
      toast.success(updateResult.message || 'Organization updated successfully!');
      await dispatch(fetchOrganizations());
      onClose();
      onSuccess?.();
    } else {
      const generatedPassword = generatePassword(values.name);
      const organizationData = {
        ...cleanedValues,
        password: generatedPassword,
        approvalStatus: 'approved'
      };
      
      const response = await dispatch(registerOrganization(organizationData)).unwrap();
      
      // Check if registration was successful based on the response
      if (response.data) {
        toast.success(response.message || 'Organization registered successfully!');
        await dispatch(fetchOrganizations());
        onClose();
        onSuccess?.();
      } else {
        // If there's an error message but registration succeeded
        if (response.message && response.message.includes('successfully')) {
          toast.success(response.message);
          await dispatch(fetchOrganizations());
          onClose();
          onSuccess?.();
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      }
    }
  } catch (err) {
    console.error('Operation failed:', err);
    
    // Handle field-specific errors
    if (err.fieldErrors) {
      Object.entries(err.fieldErrors).forEach(([field, error]) => {
        setFieldError(field, error);
      });
    }

    // Only show error toast if it's actually an error
    if (!err.message?.includes('successfully')) {
      toast.error(err.message || 'Operation failed');
    }
  } finally {
    setSubmitting(false);
  }
};

// Success effect
useEffect(() => {
  if (success) {
    const handleSuccess = async () => {
      await dispatch(fetchOrganizations());
      onClose();
      dispatch(resetForm());
    };
    handleSuccess();
  }
}, [success, dispatch, onClose]);

// Cleanup effect
useEffect(() => {
  return () => {
    dispatch(resetForm());
  };
}, [dispatch]);

// Remove the other useEffect that was handling success state
  // OrganizationRegistrationForm.jsx - Part 2

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50" />
      <div style={{ width: "100%", maxWidth: "80%" }} className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedOrg ? "Edit Organization" : "Register New Organization"}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            disabled={isLoading} 
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Notification Display */}
        {(error || notification.message) && (
          <div 
            className={`p-4 mx-6 mt-4 text-sm rounded-lg ${
              notification.type === 'error' || error 
                ? 'text-red-700 bg-red-100' 
                : 'text-green-700 bg-green-100'
            }`}
          >
            {error || notification.message}
          </div>
        )}

        {/* Form Content */}
        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
           {({ isSubmitting }) => (
  <Form className="space-y-6">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Organization Details Section */}
      <div className="p-6 rounded-xl flex-1">
        <div className="space-y-6">
          <FormField
            name="name"
            label="Organization Name"
            required
            placeholder="Enter organization name"
          />
          <FormField
            name="website"
            label="Website"
            placeholder="Enter website URL"
          />
          <FormField
            name="contactPerson"
            label="Contact Person"
            required
            placeholder="Enter contact person name"
          />
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="p-6 rounded-xl flex-1">
        <div className="space-y-6">
          <FormField
            name="email"
            type="email"
            label="Email"
            required
            placeholder="Enter email address"
          />
          <FormField
            name="address"
            label="Address"
            required
            placeholder="Enter address"
          />
          <FormField
            name="mobile"
            label="Mobile"
            required
            placeholder="Enter mobile number"
          />
           {/* <FormField
            name="accreditation"
            label="Accreditation"
            required
            placeholder="Enter accreditation details"
          /> */}
        
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading || isSubmitting}
                    className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 flex items-center"
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      selectedOrg ? "Update Organization" : "Register Organization"
                    )}
                  </button>
                </div>
  </Form>
)}

          </Formik>
        </div>
      </div>
    </div>
  );
};

// Form Field Component
const FormField = ({ name, label, required = false, type = "text", placeholder, className = "" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Field
      type={type}
      name={name}
      className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
                        bg-white text-gray-900 
                        focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
                        focus:outline-none transition-all duration-200"
      placeholder={placeholder}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

OrganizationRegistrationForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedOrg: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default OrganizationRegistrationForm;