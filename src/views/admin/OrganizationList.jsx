// components/Admin/Organization/OrganizationList.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrganizations,
  deleteOrganization,
  updateOrganizationStatus,
  setFilters,
  setActiveFilters,
  setSearchQuery,
  setPagination,
  setModal,
  clearFilters,
  filterOrganizations
} from '../../redux/Admin/OrganizationListPage/OrganizationListSlice';

import OrganizationTable from '../../components/Admin/Tables/OrganizationTable/OrganizationTable';
import OrganizationRegistrationForm from '../../components/Admin/Modals/OrganizationRegistrationForm';
import Pagination from '../../components/Common/TableItems/Pagination';
import TableFilters from '../../components/Common/TableItems/TableFilters';
import StatsSection from "../../components/Admin/Cards/StatsSection";

const OrganizationList = () => {
  const dispatch = useDispatch();
  
  // Select state from Redux store
  const {
    organizations,
    filteredOrganizations,
    isLoading,
    error,
    filters,
    activeFilters,
    searchQuery,
    pagination,
    modals
  } = useSelector(state => state.admin.organizationList);

  // Fetch organizations on component mount
  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  // Apply filters whenever filter criteria changes
  useEffect(() => {
    dispatch(filterOrganizations());
  }, [dispatch, filters, searchQuery]);

  // Calculate current items for pagination
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);

  // Handler Functions
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrganization(id)).unwrap();
      dispatch(filterOrganizations());
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateOrganizationStatus({ id, status })).unwrap();
      dispatch(filterOrganizations());
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleTypeFilterChange = (e) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  const handleStartDateChange = (date) => {
    dispatch(setFilters({ startDate: date }));
  };

  const handleEndDateChange = (date) => {
    dispatch(setFilters({ endDate: date }));
  };

  const handleApplyFilters = () => {
    dispatch(setActiveFilters({
      status: filters.status !== 'all',
      dateRange: !!(filters.startDate && filters.endDate),
      search: !!searchQuery,
      city: filters.city !== 'all'
    }));
    dispatch(setPagination({ currentPage: 1 }));
    dispatch(setModal({ isFilterOpen: false }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="mt-12 overflow-hidden">
      <StatsSection />

      <div className="px-8 mx-4 -mt-12">
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        {/* Table Filters */}
        <TableFilters
  filterType="organizations"
  isFilterOpen={modals.isFilterOpen}
  setIsFilterOpen={(value) => dispatch(setModal({ isFilterOpen: value }))}
  tempFilters={filters}
  handleTypeFilterChange={handleTypeFilterChange}
  handleStartDateChange={handleStartDateChange}
  handleEndDateChange={handleEndDateChange}
  applyFilters={handleApplyFilters}  // Make sure this prop is being passed
  clearFilters={handleClearFilters}
  searchQuery={searchQuery}
  setSearchQuery={(value) => dispatch(setSearchQuery(value))}
  activeFilters={activeFilters}
  setActiveFilters={(filters) => dispatch(setActiveFilters(filters))}
  pageTitle="Manage Organizations"
  showAddButton={true}
  addButtonText="Add Organization"
  onAddNew={() => {
    dispatch(setModal({ 
      isFormOpen: true,
      selectedOrg: null 
    }));
  }}
  statusOptions={[
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' }
  ]}
/>

        {/* Organization Table */}
        <div>
          <OrganizationTable
            organizations={currentItems}
            isLoading={isLoading}
            onEdit={(org) => {
              dispatch(setModal({ 
                isFormOpen: true,
                selectedOrg: org 
              }));
            }}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Pagination */}
        {!isLoading && filteredOrganizations.length > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              itemsPerPage={pagination.itemsPerPage}
              setItemsPerPage={(value) => 
                dispatch(setPagination({ itemsPerPage: value }))
              }
              setCurrentPage={(value) => 
                dispatch(setPagination({ currentPage: value }))
              }
              filteredItems={filteredOrganizations}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
            />
          </div>
        )}

        {/* Registration Form Modal */}
        <OrganizationRegistrationForm
          isOpen={modals.isFormOpen}
          onClose={() => {
            dispatch(setModal({ 
              isFormOpen: false,
              selectedOrg: null 
            }));
          }}
          selectedOrg={modals.selectedOrg}
          onSuccess={() => {
            dispatch(fetchOrganizations());
            dispatch(setModal({ 
              isFormOpen: false,
              selectedOrg: null 
            }));
          }}
        />
      </div>
    </div>
  );
};

export default OrganizationList;