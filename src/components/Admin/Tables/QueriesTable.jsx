// components/Admin/Tables/QueriesTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import ConfirmationModal from '../Modals/ConformationModal';

const TYPE_COLORS = {
  "General Inquiry": "bg-blue-100 text-blue-800",
  "Technical Support": "bg-green-100 text-green-800",
  "Billing Issue": "bg-red-100 text-red-800",
  "Feedback": "bg-yellow-100 text-yellow-800",
};

const TableHeader = () => (
  <tr>
    {['Name', 'Email', 'Mobile', 'Type', 'Description', 'Join Date', 'Actions'].map(header => (
      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {header}
      </th>
    ))}
  </tr>
);

const QueriesTable = ({ tempFilters, searchQuery, currentPage, itemsPerPage, setTotalItems, setOrgCount, setUsers }) => {
  const [state, setState] = useState({
    contacts: [],
    expandedRow: null,
    isLoading: false,
    deleteError: null,
    isDeleting: false,
    showDeleteModal: false,
    deleteId: null
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, isLoading: true, deleteError: null }));
    try {
      const [contacts, orgs, users] = await Promise.all([
        axios.get("http://localhost:5000/api/contact"),
        axios.get("http://localhost:5000/api/org/display-all-org"),
        axios.get("http://localhost:5000/api/user/display-users"),
      ]);

      if (!contacts.data) throw new Error('No data received');

      setState(prev => ({ ...prev, contacts: contacts.data }));
      setOrgCount(orgs.data.length);
      setUsers(users.data.length);
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        deleteError: error.response?.data?.message || "Failed to fetch data" 
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredContacts = state.contacts.filter(contact => {
    if (tempFilters.type !== 'all' && contact.type !== tempFilters.type) return false;
    if (tempFilters.startDate && tempFilters.endDate) {
      const contactDate = new Date(contact.createDate);
      if (contactDate < tempFilters.startDate || contactDate > tempFilters.endDate) return false;
    }
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return ['name', 'email', 'type'].some(field => 
        contact[field]?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  useEffect(() => { setTotalItems(filteredContacts.length); }, [filteredContacts.length, setTotalItems]);

  const currentItems = filteredContacts.slice(
    currentPage * itemsPerPage - itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteClick = (id) => {
    setState(prev => ({ 
      ...prev, 
      showDeleteModal: true, 
      deleteId: id 
    }));
  };

  const handleDeleteConfirm = async () => {
    setState(prev => ({ ...prev, isDeleting: true, deleteError: null }));
    try {
      await axios.delete(`http://localhost:5000/api/contact/${state.deleteId}`);
      await fetchData();
      setState(prev => ({ ...prev, showDeleteModal: false, deleteId: null }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        deleteError: error.response?.data?.message || "Failed to delete contact",
        showDeleteModal: false
      }));
    } finally {
      setState(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const toggleRow = (id) => {
    setState(prev => ({ ...prev, expandedRow: prev.expandedRow === id ? null : id }));
  };

  if (state.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue-500" />
        <p className="mt-4 text-gray-500">Loading data...</p>
      </div>
    );
  }

  return (
    <>
      <ConfirmationModal
        isOpen={state.showDeleteModal}
        onClose={() => setState(prev => ({ ...prev, showDeleteModal: false, deleteId: null }))}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this contact? This action cannot be undone."
      />

      <div className="bg-white rounded-lg shadow-lg">
        {state.deleteError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{state.deleteError}</span>
            <button onClick={fetchData} className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
              Retry
            </button>
            <button onClick={() => setState(prev => ({ ...prev, deleteError: null }))} className="absolute right-0 px-4 py-3">
              ×
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b"><TableHeader /></thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length ? currentItems.map(contact => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {contact.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {contact.mobile}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${TYPE_COLORS[contact.type] || "bg-gray-100 text-gray-800"}`}>
                      {contact.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {state.expandedRow === contact._id 
                        ? contact.desc 
                        : contact.desc?.length > 50 
                          ? `${contact.desc.substring(0, 50)}...` 
                          : contact.desc}
                      {contact.desc?.length > 50 && (
                        <button
                          onClick={() => toggleRow(contact._id)}
                          className="ml-2 text-blue-500 hover:text-lightBlue-700"
                        >
                          {state.expandedRow === contact._id ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(contact.createDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button 
                      onClick={() => handleDeleteClick(contact._id)}
                      className={`text-red-600 hover:text-red-900 flex items-center ${state.isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={state.isDeleting}
                    >
                      <Trash2 size={16} />
                      {state.isDeleting && <span className="ml-2 text-xs">Deleting...</span>}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="px-6 py-4 text-center text-gray-500">No queries found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

QueriesTable.propTypes = {
  tempFilters: PropTypes.shape({
    type: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }).isRequired,
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setTotalItems: PropTypes.func.isRequired,
  setOrgCount: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default QueriesTable;