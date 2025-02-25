// components/Admin/Tables/OrganizationTable.jsx - Part 1

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  MoreVertical,
  Check,
  X
} from 'lucide-react';
import ConfirmationModal from '../../Modals/ConformationModal';

// Tooltip Component
const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

// Add PropTypes for Tooltip
Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired
};

const getStatusColor = (status) => {
  if (!status || typeof status !== 'string') {
    return "bg-gray-100 text-gray-800";
  }

  const statusColors = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800"
  };

  return statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

const OrganizationTable = ({ 
  organizations = [], 
  isLoading = false,
  onEdit,
  onDelete,
  onStatusChange 
}) => {
  const [state, setState] = useState({
    expandedRow: null,
    dropdownOpen: null,
    showDeleteModal: false,
    showActionModal: false,
    selectedOrg: null,
    pendingAction: null
  });

  const toggleRow = (id) => {
    setState(prev => ({
      ...prev,
      expandedRow: prev.expandedRow === id ? null : id
    }));
  };

  const handleDeleteClick = (org) => {
    setState(prev => ({
      ...prev,
      showDeleteModal: true,
      selectedOrg: org
    }));
  };

  const handleStatusClick = (org, action) => {
    setState(prev => ({
      ...prev,
      showActionModal: true,
      selectedOrg: org,
      pendingAction: action,
      dropdownOpen: null
    }));
  };

  const toggleDropdown = (id) => {
    setState(prev => ({
      ...prev,
      dropdownOpen: prev.dropdownOpen === id ? null : id
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue-500"></div>
      </div>
    );
  }

  

  // components/Admin/Tables/OrganizationTable.jsx - Part 2

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {organizations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No organizations found
                  </td>
                </tr>
              ) : (
                organizations.map((org) => (
                  <React.Fragment key={org._id}>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      {/* Name Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button 
                            onClick={() => toggleRow(org._id)}
                            className="mr-2 focus:outline-none"
                          >
                            {state.expandedRow === org._id ? (
                              <ChevronDown className="text-gray-500" size={16} />
                            ) : (
                              <ChevronRight className="text-gray-500" size={16} />
                            )}
                          </button>
                          <div className="text-sm font-medium text-gray-900">
                            {org.name}
                          </div>
                        </div>
                      </td>

                      {/* Contact Person Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {org.contactPerson || 'N/A'}
                        </div>
                      </td>

                      {/* Email Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {org.email || 'N/A'}
                        </div>
                      </td>

                      {/* Mobile Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {org.mobile || 'N/A'}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(org.approvalStatus)}`}>
                          {org.approvalStatus || 'N/A'}
                        </span>
                      </td>

                      {/* Join Date Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(org.createDate)}
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <Tooltip text="Edit organization">
                            <button
                              onClick={() => onEdit(org)}
                              className="text-yellow-600 hover:text-yellow-900 transition-colors focus:outline-none"
                            >
                              <Edit size={16} />
                            </button>
                          </Tooltip>

                          <Tooltip text="Delete organization">
                            <button
                              onClick={() => handleDeleteClick(org)}
                              className="text-red-600 hover:text-red-900 transition-colors focus:outline-none"
                            >
                              <Trash2 size={16} />
                            </button>
                          </Tooltip>

                          <Tooltip text="Change status">
                            <div className="relative">
                              <button
                                onClick={() => toggleDropdown(org._id)}
                                className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
                              >
                                <MoreVertical size={16} />
                              </button>
                              
                              {state.dropdownOpen === org._id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                  <button
                                    onClick={() => handleStatusClick(org, 'approved')}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Check size={16} className="inline mr-2" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleStatusClick(org, 'rejected')}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <X size={16} className="inline mr-2" />
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {state.expandedRow === org._id && (
                      <tr className="bg-gray-50">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold mb-1">Address:</p>
                              <p className="text-sm text-gray-600">{org.address || 'No address provided'}</p>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">Website:</p>
                              <p className="text-sm text-gray-600">{org.website || 'No website provided'}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={state.showDeleteModal}
        onClose={() => setState(prev => ({ ...prev, showDeleteModal: false }))}
        onConfirm={() => {
          onDelete(state.selectedOrg?._id);
          setState(prev => ({ ...prev, showDeleteModal: false }));
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this organization?"
      />

      <ConfirmationModal
        isOpen={state.showActionModal}
        onClose={() => setState(prev => ({ ...prev, showActionModal: false }))}
        onConfirm={() => {
          onStatusChange(state.selectedOrg?._id, state.pendingAction);
          setState(prev => ({ ...prev, showActionModal: false }));
        }}
        title={`Confirm ${state.pendingAction === "approved" ? "Approval" : "Rejection"}`}
        message={`Are you sure you want to ${state.pendingAction} this organization?`}
      />
    </div>
  );
};

OrganizationTable.propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      contactPerson: PropTypes.string,
      email: PropTypes.string,
      mobile: PropTypes.string,
      approvalStatus: PropTypes.string,
      createDate: PropTypes.string,
      address: PropTypes.string,
      website: PropTypes.string
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

export default OrganizationTable;