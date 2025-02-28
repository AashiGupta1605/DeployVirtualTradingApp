// pages/RegisterUserList.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusCircle } from 'lucide-react';

import StatsSection from "../../components/Admin/Cards/StatsSection";
import Pagination from '../../components/Common/TableItems/Pagination';
import TableFilters from '../../components/Common/TableItems/TableFilters';
import UsersTable from "../../components/Admin/Tables/UserTable/UsersTable";
import RegisterModal from "../../components/Admin/Modals/UserRegister";
import ConfirmationModal from "../../components/Admin/Modals/ConformationModal";

import {
fetchUsers,
createUser,
updateUser,
deleteUser
} from "../../redux/Admin/RegisteredUsersPage/RegisteredUserListSlice";

import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterUserList = () => {
const dispatch = useDispatch();

const handleRegistrationSuccess = async () => {
// Refresh the users list
await dispatch(fetchUsers());
// Close the modal
setIsRegisterModalOpen(false);
};

// Modify the selector to provide default values
const {
list: users = [],
status = 'idle',
isLoading = false,
isDeleting = false
} = useSelector(state => state.admin?.registeredUsersTable || {});

// States
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [selectedUser, setSelectedUser] = useState(null);
const [activeFilters, setActiveFilters] = useState({
type: false,
dateRange: false,
search: false
});

// Modal States
const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

// Temp Filters State
const [tempFilters, setTempFilters] = useState({
status: "all",
gender: "all",
startDate: null,
endDate: null,
});

// Validation Schema
const validationSchema = Yup.object().shape({
name: Yup.string()
.required("Name is required")
.min(2, "Name must be at least 2 characters"),
email: Yup.string()
.email("Invalid email address")
.required("Email is required"),
mobile: Yup.string()
.matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
.required("Mobile is required"),
gender: Yup.string()
.oneOf(['Male', 'Female'], 'Invalid gender')
.required('Gender is required'),
status: Yup.string()
.oneOf(['active', 'pending', 'disabled'], 'Invalid status')
.default('pending')
});

// Formik Configuration
const formik = useFormik({
initialValues: {
name: "",
email: "",
mobile: "",
gender: "",
status: "pending"
},
validationSchema,
onSubmit: async (values) => {
try {
if (selectedUser) {
// Update existing user
await dispatch(updateUser({
userId: selectedUser._id,
userData: values
})).unwrap();
} else {
// Create new user
await dispatch(createUser(values)).unwrap();
}


    // Close modal and reset form
    closeRegisterModal();
  } catch (error) {
    console.error("Operation failed", error);
    // Optionally handle error (show error message)
  }
},
enableReinitialize: true,
});

// Fetch users on component mount
useEffect(() => {
dispatch(fetchUsers());
}, [dispatch]);

// Filtered Users Logic
const filteredUsers = useMemo(() => {
return users.filter(user => {
// Status Filter
if (tempFilters.status !== 'all' && user.status !== tempFilters.status)
return false;



  // Gender Filter
  if (tempFilters.gender !== 'all' && user.gender !== tempFilters.gender)
    return false;

  // Date Range Filter
  if (tempFilters.startDate && tempFilters.endDate) {
    const userDate = new Date(user.createdDate);
    if (userDate < tempFilters.startDate || userDate > tempFilters.endDate) 
      return false;
  }

  // Search Filter
  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    return ['name', 'email', 'mobile'].some(field => 
      user[field]?.toLowerCase().includes(searchLower)
    );
  }

  return true;
});
}, [users, tempFilters, searchQuery]);

// Pagination Logic
const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

// Handler Functions
const handleTypeFilterChange = (e) => {
setTempFilters(prev => ({
...prev,
[e.target.name]: e.target.value
}));
};

const handleStartDateChange = (date) => {
setTempFilters(prev => ({ ...prev, startDate: date }));
};

const handleEndDateChange = (date) => {
setTempFilters(prev => ({ ...prev, endDate: date }));
};

// Update the applyFilters function
const applyFilters = () => {
  setActiveFilters({
  status: tempFilters.status !== 'all',
  gender: tempFilters.gender !== 'all',
  dateRange: !!(tempFilters.startDate && tempFilters.endDate),
  search: !!searchQuery
  });
  setIsFilterOpen(false); // This will close the filter window
  setCurrentPage(1);
  };
  
  const clearFilters = () => {
  setTempFilters({
  status: "all",
  gender: "all",
  startDate: null,
  endDate: null,
  });
  setSearchQuery("");
  setActiveFilters({
  status: false,
  gender: false,
  dateRange: false,
  search: false
  });
  setCurrentPage(1);
  setIsFilterOpen(false); // Optional: close filter window on clear
  };
  
  // Modal Handlers
  const openRegisterModal = (user = null) => {
  setSelectedUser(user);
  if (user) {
  formik.setValues({
  name: user.name || "",
  email: user.email || "",
  mobile: user.mobile || "",
  gender: user.gender || "",
  status: user.status || "pending"
  });
  } else {
  formik.resetForm();
  }
  setIsRegisterModalOpen(true);
  };
  
  const closeRegisterModal = () => {
  setIsRegisterModalOpen(false);
  setSelectedUser(null);
  formik.resetForm();
  };
  
  const handleDeleteClick = (user) => {
  setSelectedUser(user);
  setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
  if (selectedUser) {
  dispatch(deleteUser(selectedUser._id));
  setIsDeleteModalOpen(false);
  setSelectedUser(null);
  }
  };
  
  // Loading state
  if (isLoading) {
  return (
  <div className="flex justify-center items-center h-64">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue-500"></div>
  </div>
  );
  }
  
  return (
  <div className="mt-12 overflow-hidden">
  <StatsSection isDashboard={false} />
  
  
    <div className="px-8 mx-4 -mt-12"> 
  <TableFilters
  filterType="users"
  isFilterOpen={isFilterOpen}
  setIsFilterOpen={setIsFilterOpen}
  tempFilters={tempFilters}
  handleTypeFilterChange={handleTypeFilterChange}
  handleStartDateChange={handleStartDateChange}
  handleEndDateChange={handleEndDateChange}
  pageTitle="Manage Users"
  showAddButton={true}
  onAddNew={() => openRegisterModal()}
  applyFilters={applyFilters} // Fixed the prop name here
  clearFilters={clearFilters}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  activeFilters={activeFilters}
  setActiveFilters={setActiveFilters}
  statusOptions={[
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'disabled', label: 'Disabled' }
  ]}
  />
  
  

      <UsersTable 
        users={currentItems}
        onEditClick={openRegisterModal}
        onDeleteClick={handleDeleteClick}
      />
  
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        filteredItems={filteredUsers}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
      />
    </div>
  
    {/* Register Modal */}
    <RegisterModal
      isOpen={isRegisterModalOpen}
      onClose={closeRegisterModal}
      onSuccess={handleRegistrationSuccess}
      selectedUser={selectedUser}
    />
  
    {/* Delete Confirmation Modal */}
    <ConfirmationModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      onConfirm={confirmDelete}
      title="Confirm Deletion"
      message="Are you sure you want to delete this user? This action cannot be undone."
    />
  </div>
  );
  };
  
  export default RegisterUserList;