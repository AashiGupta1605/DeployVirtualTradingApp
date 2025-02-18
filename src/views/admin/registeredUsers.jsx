import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ChevronDown, ChevronRight, Trash2, Filter, PlusCircle, Edit } from "lucide-react";
import CardStats from "../../components/Admin/Cards/CardStats";
import RegisterModal from "../auth/Register";
import ConfirmationModal from "../../components/Admin/Modals/ConformationModal";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterUserList = () => {
  const [contacts, setContacts] = useState([]);
  const [orgCount, setOrgCount] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile is required"),
    address: Yup.string().required("Address is required"),
    // Add other fields as necessary
  });

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      // Initialize other fields as necessary
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (selectedUser) {
          // Update existing user
          await axios.put(`http://localhost:5000/api/user/users/${selectedUser._id}`, values);
        } else {
          // Create new user
          await axios.post("http://localhost:5000/api/user/register", values);
        }
        closeRegisterModal();
        setRefresh((prev) => !prev); // Refresh user list
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again.");
      }
    },
    enableReinitialize: true, // This is important to reinitialize form when selectedUser changes
  });

  useEffect(() => {
    fetchContacts();
    fetchOrgCount();
    fetchUsers();
  }, [refresh]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/display-users");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again later.");
    }
  };

  const fetchOrgCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/org/display-all-org");
      setOrgCount(response.data.length);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/display-users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/users/${id}`);
      setRefresh((prev) => !prev);
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const toggleRow = useCallback((id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "disabled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  const userCount = contacts.length;

  const openRegisterModal = () => {
    setSelectedUser(null);
    formik.resetForm(); // Reset form when opening for new registration
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setSelectedUser(null);
    formik.resetForm(); // Reset form when closing the modal
  };

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    formik.setValues({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      // Set other fields as necessary
    });
    setIsRegisterModalOpen(true);
  };

  return (
    <div className="mt-12 overflow-hidden">
      <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <CardStats
                statSubtitle="REGISTERED USERS"
                statTitle={userCount.toString()}
                statArrow="up"
                statPercent="100"
                statPercentColor="text-emerald-500"
                statDescription="Total users registered"
                statIconName="fas fa-users"
                statIconColor="bg-pink-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <CardStats
                statSubtitle="REGISTERED ORGANIZATIONS"
                statTitle={orgCount.toString()}
                statArrow="up"
                statPercent="100"
                statPercentColor="text-emerald-500"
                statDescription="Total organizations registered"
                statIconName="fas fa-building"
                statIconColor="bg-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 mx-4 -mt-24">
        <div className="rounded bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Filter className="mr-2 text-gray-600" size={20} />
            Manage Users
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={openRegisterModal}
              className="flex items-center bg-lightBlue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <PlusCircle className="mr-2" size={16} />
              Register New
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        <div className="bg-white h-[28rem] shadow-md rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["Name", "Email", "Mobile", "Join Date", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <React.Fragment key={user._id}>
                  <tr
                    onClick={() => toggleRow(user._id)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      expandedRow === user._id ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 flex items-center">
                      {expandedRow === user._id ? (
                        <ChevronDown className="mr-2 text-gray-500" size={16} />
                      ) : (
                        <ChevronRight className="mr-2 text-gray-500" size={16} />
                      )}
                      {user.name}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.mobile}</td>
                    <td className="px-6 py-4">
                      {new Date(user.createdDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 flex space-x-4 relative">
                      {/* Edit Button with Tooltip */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(user);
                        }}
                        className="text-yellow-500 mx-2 hover:text-yellow-600 transition-colors relative group"
                      >
                        <Edit size={24} />
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Edit
                        </span>
                      </button>
                      {/* Delete Button with Tooltip */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(user._id);
                        }}
                        className="text-red-500 mx-2 hover:text-red-600 transition-colors relative group"
                      >
                        <Trash2 size={24} />
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Delete
                        </span>
                      </button>
                    </td>
                  </tr>
                  {expandedRow === user._id && (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-sm">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Address</p>
                            <p className="text-sm text-gray-800">{user.address}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Created By</p>
                            <p className="text-sm text-gray-800">{user.createdBy}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Last Updated</p>
                            <p className="text-sm text-gray-800">
                              {new Date(user.updateDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register/Edit Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        formik={formik} // Pass Formik instance to the modal
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDelete(selectedUserId)}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
      />

      {/* Success Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        onConfirm={closeSuccessModal}
        message="User deleted successfully!"
      />
    </div>
  );
};

export default RegisterUserList;
