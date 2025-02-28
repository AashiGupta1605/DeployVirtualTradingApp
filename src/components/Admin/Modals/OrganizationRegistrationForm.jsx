import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  registerOrganization,
  updateOrganization,
  resetForm,
  selectRegistrationLoading,
  selectRegistrationError,
  selectRegistrationSuccess,
  selectNotificationStatus,
} from '../../../redux/Admin/OrganizationListPage/OrganizationRegisterSlice';
import { fetchOrganizations } from '../../../redux/Organization/auth/organizationAuthSlice';

const OrganizationRegistrationForm = ({ isOpen, onClose, selectedOrg, onSuccess }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.admin?.organizationRegistration?.isLoading ?? false);
  const error = useSelector((state) => state?.admin?.organizationRegistration?.error ?? null);
  const success = useSelector((state) => state?.admin?.organizationRegistration?.success ?? false);
  const notification = useSelector((state) => state?.admin?.organizationRegistration?.notification ?? {
    message: null,
    type: null
  });

  const { message, type } = notification;

  const initialValues = {
    name: "",
    address: "",
    website: "",
    contactPerson: "",
    email: "",
    mobile: "",
    approvalStatus: "approved",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Organization Name is required"),
    address: Yup.string().required("Address is required"),
    website: Yup.string().url("Invalid URL format"),
    contactPerson: Yup.string().required("Contact Person is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile is required"),
  });

  const generatePassword = (orgName) => {
    const symbols = ['@', '#', '$', '%', '&', '*', '!'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomNumbers = Math.floor(Math.random() * 900 + 100);
    return `${orgName}${randomSymbol}${randomNumbers}`;
  };

  useEffect(() => {
    if (success) {
      onSuccess?.();
      onClose();
      dispatch(resetForm());
    }
  }, [success, onClose, dispatch, onSuccess]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
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
        await dispatch(updateOrganization({
          id: selectedOrg._id,
          data: cleanedValues
        })).unwrap();
        toast.success('Organization updated successfully!');
      } else {
        const generatedPassword = generatePassword(values.name);
        const organizationData = {
          ...values,
          password: generatedPassword,
          approvalStatus: 'approved'
        };
        
        await dispatch(registerOrganization(organizationData)).unwrap();
        toast.success('Organization registered successfully!');
        await dispatch(fetchOrganizations());
      }
    } catch (err) {
      toast.error(err.message || 'Operation failed');
      console.error('Operation failed:', err);
      if (err.fieldErrors) {
        Object.keys(err.fieldErrors).forEach(field => {
          setFieldError(field, err.fieldErrors[field]);
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white"></i>
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
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        {/* Notification Display */}
        {(error || message) && (
          <div className={`p-4 mx-6 mt-4 text-sm rounded-lg ${
            type === 'error' ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'
          }`}>
            {error || message}
          </div>
        )}

        {/* Form Content */}
        <div className="p-6">
          <Formik
            initialValues={selectedOrg ? { ...initialValues, ...selectedOrg } : initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Organization Details Section */}
                  <div className="bg-gray-50 p-6 rounded-xl flex-1">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-6">
                      Organization Details
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Name <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter organization name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <Field
                          type="text"
                          name="website"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter website URL"
                        />
                        <ErrorMessage
                          name="website"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Person <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="contactPerson"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter contact person name"
                        />
                        <ErrorMessage
                          name="contactPerson"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="bg-gray-50 p-6 rounded-xl flex-1">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-6">
                      Contact Information
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter email address"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter address"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="mobile"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter mobile number"
                        />
                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

OrganizationRegistrationForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedOrg: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default OrganizationRegistrationForm;