import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

// Import actions
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

// Import components
import OrganizationTable from '../../components/Admin/Tables/OrganizationTable/OrganizationTable';
import OrganizationRegistrationForm from '../../components/Admin/Modals/OrganizationRegistrationForm';
import Pagination from '../../components/Common/TableItems/Pagination';
import TableFilters from '../../components/Common/TableItems/TableFilters';
import StatsSection from "../../components/Admin/Cards/StatsSection";
import ConfirmationModal from "../../components/Admin/Modals/ConformationModal";

const OrganizationList = () => {
  const dispatch = useDispatch();
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    modals,
    stats
  } = useSelector(state => state.admin.organizationList);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchOrganizations())
      .unwrap()
      .then(() => {
        console.log('Organizations fetched successfully');
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
        toast.error(error.message || 'Failed to fetch organizations');
      });
  }, [dispatch]);

  // Filter effect
  useEffect(() => {
    dispatch(filterOrganizations());
  }, [dispatch, filters, searchQuery]);

  // Pagination calculations
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);

  // Handler functions
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
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
      search: !!searchQuery
    }));
    dispatch(setPagination({ currentPage: 1 }));
    dispatch(setModal({ isFilterOpen: false }));
    dispatch(filterOrganizations());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(setSearchQuery(''));
    dispatch(setActiveFilters({
      status: false,
      dateRange: false,
      search: false
    }));
    dispatch(setPagination({ currentPage: 1 }));
  };

  const handleDeleteClick = (organization) => {
    if (!organization?._id) {
      toast.error('Invalid organization selected');
      return;
    }
    setSelectedOrganization(organization);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const loadingToast = toast.loading('Deleting organization...');
      await dispatch(deleteOrganization(selectedOrganization._id)).unwrap();
      
      // Refresh data
      await Promise.all([
        dispatch(fetchOrganizations()),
        dispatch(filterOrganizations())
      ]);

      setIsDeleteModalOpen(false);
      setSelectedOrganization(null);
      toast.success('Organization deleted successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error(error.message || 'Failed to delete organization');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const loadingToast = toast.loading('Updating organization status...');
      
      await dispatch(updateOrganizationStatus({ id, status })).unwrap();
      
      // Refresh data
      await Promise.all([
        dispatch(fetchOrganizations()),
        dispatch(filterOrganizations())
      ]);
      
      toast.success('Organization status updated successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Failed to update organization status');
    }
  };

  const handleEditOrganization = (org) => {
    dispatch(setModal({
      isFormOpen: true,
      selectedOrg: org
    }));
  };

  // Loading state
  if (isLoading && !filteredOrganizations.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl bg-red-100 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 overflow-hidden">
      <StatsSection stats={stats} isDashboard={false} />

      <div className="px-8 mx-4 -mt-12">
        {/* Table Filters */}
        <TableFilters
          filterType="organizations"
          isFilterOpen={modals.isFilterOpen}
          setIsFilterOpen={(value) => dispatch(setModal({ isFilterOpen: value }))}
          tempFilters={filters}
          handleFilterChange={handleFilterChange}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          applyFilters={handleApplyFilters}
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
        />

        {/* Organization Table */}
        <div>
          <OrganizationTable
            organizations={currentItems}
            isLoading={isLoading}
            onEdit={handleEditOrganization}
            onDelete={handleDeleteClick}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Pagination */}
        {filteredOrganizations.length > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={Math.ceil(filteredOrganizations.length / pagination.itemsPerPage)}
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

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedOrganization(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the organization "${selectedOrganization?.name}"? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};

export default OrganizationList;