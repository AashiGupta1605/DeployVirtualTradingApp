import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationRegistrationForm = ({ isOpen, onClose, selectedOrg }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    website: "",
    contactPerson: "",
    email: "",
    mobile: "",
    status: true,
    createdBy: "",
  });

  // Pre-fill form data when selectedOrg changes
  useEffect(() => {
    if (selectedOrg) {
      setFormData({
        id: selectedOrg._id || "",
        name: selectedOrg.name || "",
        address: selectedOrg.address || "",
        website: selectedOrg.website || "",
        contactPerson: selectedOrg.contactPerson || "",
        email: selectedOrg.email || "",
        mobile: selectedOrg.mobile || "",
        status: selectedOrg.status || true,
        createdBy: selectedOrg.createdBy || "",
      });
    } else {
      // Reset form data if no selectedOrg (for new registration)
      setFormData({
        id: "",
        name: "",
        address: "",
        website: "",
        contactPerson: "",
        email: "",
        mobile: "",
        status: true,
        createdBy: "",
      });
    }
  }, [selectedOrg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedOrg
        ? `http://localhost:5000/api/organizations/${selectedOrg._id}`
        : "http://localhost:5000/api/organizations";
      const method = selectedOrg ? "put" : "post";
      const response = await axios[method](url, formData);
      alert(
        selectedOrg
          ? "Organization updated successfully!"
          : "Organization registered successfully!"
      );
      console.log(response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error:", error);
      alert(
        selectedOrg
          ? "Failed to update organization."
          : "Failed to register organization."
      );
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Organization Details Section */}
              <div className="bg-gray-50 p-6 rounded-xl flex-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-6">
                  Organization Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter organization ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter organization name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter organization URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter contact person name"
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
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter mobile number"
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
                className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {selectedOrg ? "Update Organization" : "Register Organization"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationRegistrationForm;