
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrgById } from "../../../redux/Organization/auth/organizationAuthSlice";
import OrganizationProfileModal from "../../../views/Organization/OrganizationDetails/Models/OrganizationProfileModal";

const UserDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { orgId, currentOrg } = useSelector((state) => state.organization.auth);

  useEffect(() => {
    if (isModalOpen && orgId) {
      console.log("Dispatching fetchOrgById for orgId:", orgId);
      dispatch(fetchOrgById(orgId));
    }
  }, [isModalOpen, orgId, dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false); // Close the menu when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img
            src={currentOrg?.photo || "https://via.placeholder.com/150"}
            alt="User"
            className="w-full h-full object-cover"
          />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20">
            <button
              onClick={openModal}
              className="block w-full px-6 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Profile
            </button>
          </div>
        )}
      </div>
      
      <OrganizationProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialValues={currentOrg || {}}
        refreshData={() => {
          if (orgId) {
            dispatch(fetchOrgById(orgId)); // Refresh organization data using orgId
          }
        }}
      />
    </>
  );
};

export default UserDropdown;