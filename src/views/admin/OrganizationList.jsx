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
modals
} = useSelector(state => state.admin.organizationList);

useEffect(() => {
dispatch(fetchOrganizations());
}, [dispatch]);

useEffect(() => {
dispatch(filterOrganizations());
}, [dispatch, filters, searchQuery]);

const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);

// In OrganizationList.jsx
const handleDelete = async (organization) => {
try {
if (!organization || !organization._id) {
toast.error('Invalid organization selected');
return;
}


// Show loading toast
toast.loading('Deleting organization...');

// Dispatch delete action
await dispatch(deleteOrganization(organization._id)).unwrap();

// Close the modal
setIsDeleteModalOpen(false);
setSelectedOrganization(null);

// Show success toast
toast.success('Organization deleted successfully!');

// Refresh the organizations list
dispatch(fetchOrganizations());
} catch (error) {
console.error('Error deleting organization:', error);
toast.error(error.message || 'Failed to delete organization');
}
};

// Handle delete button click
const handleDeleteClick = (organization) => {
if (!organization || !organization._id) {
toast.error('Invalid organization selected');
return;
}
setSelectedOrganization(organization);
setIsDeleteModalOpen(true);
};

const handleDeleteConfirm = async () => {
try {
const organizationId = selectedOrganization._id;
const loadingToast = toast.loading('Deleting organization...');


  // Delete the organization
  await dispatch(deleteOrganization(organizationId)).unwrap();

  // Fetch fresh data to update all states
  await Promise.all([
    dispatch(fetchOrganizations()),
    dispatch(filterOrganizations())
  ]);

  setIsDeleteModalOpen(false);
  setSelectedOrganization(null);
  toast.success('Organization deleted successfully!');
  toast.dismiss(loadingToast);
} catch (error) {
  console.error('Delete failed:', error);
  toast.error(error.message || 'Failed to delete organization');
}
};

const handleStatusChange = async (id, status) => {
  try {
    const loadingToast = toast.loading('Updating organization status...');
    
    // Dispatch the update action
    await dispatch(updateOrganizationStatus({ id, status })).unwrap();
    
    // Fetch updated organizations and reapply filters
    await Promise.all([
      dispatch(fetchOrganizations()),
      dispatch(filterOrganizations())
    ]);
    
    toast.dismiss(loadingToast);
    toast.success('Organization status updated successfully!');
  } catch (error) {
    console.error('Error updating status:', error);
    toast.error(error.message || 'Failed to update organization status');
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

const handleEditOrganization = (org) => {
dispatch(setModal({
isFormOpen: true,
selectedOrg: org
}));
};

return (
<div className="mt-12 overflow-hidden">
<StatsSection isDashboard={false} />


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
      onEdit={handleEditOrganization}
      onDelete={handleDeleteClick}
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