import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const OrganizationRegistrationForm = ({ isOpen, onClose, selectedOrg }) => {
  const initialValues = {
    name: "",
    address: "",
    website: "",
    contactPerson: "",
    email: "",
    mobile: "",
    password: "",
    approvalStatus: "approved", // Default status for new organizations
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Organization Name is required"),
    address: Yup.string().required("Address is required"),
    website: Yup.string().url("Invalid URL format"),
    contactPerson: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile is required"),
    password: selectedOrg
      ? Yup.string()
      : Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  useEffect(() => {}, [selectedOrg]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const url = selectedOrg
        ? `http://localhost:5000/api/org/${selectedOrg._id}`
        : "http://localhost:5000/api/org/register";
      const method = selectedOrg ? "put" : "post";

      // Prepare the data to send
      const dataToSend = selectedOrg
        ? { ...values, password: undefined } // Exclude password for updates
        : values; // Include password and approvalStatus for new registrations

      const response = await axios[method](url, dataToSend);
      console.log("Data sent to backend:", dataToSend);
      console.log("Response from backend:", response.data);
      alert(
        selectedOrg
          ? "Organization updated successfully!"
          : "Organization registered successfully!"
      );
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response data:", error.response?.data);
      alert(
        selectedOrg
          ? "Failed to update organization. Please check the data and try again."
          : "Failed to register organization. Please check the data and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
      {/* Backdrop with solid gray background */}
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

      {/* Modal Container */}
      <div
        style={{ width: "100%", maxWidth: "80%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
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
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        {/* Modal Body */}
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
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Website
                        </label>
                        <Field
                          type="text"
                          name="website"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter organization URL"
                        />
                        <ErrorMessage
                          name="website"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Person
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
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Contact Details Section */}
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
                          className="text-red-500 text-sm"
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
                          className="text-red-500 text-sm"
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
                          className="text-red-500 text-sm"
                        />
                      </div>
                      {!selectedOrg && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <Field
                            type="password"
                            name="password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="Enter password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  >
                    {selectedOrg ? "Update Organization" : "Register Organization"}
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

export default OrganizationRegistrationForm;
