import React, { useEffect, useState, useRef } from "react";
import UserDropdown from "../DropDowns/UserDropdown";
import logoImage from "../../../assets/img/PGR_logo.jpeg";
import { fetchOrgById } from "../../../redux/Organization/auth/organizationAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, ChevronDown } from 'lucide-react';
import OrganizationProfileModal from "../../../views/Organization/OrganizationDetails/Models/OrganizationProfileModal";

export default function OrganizationNavbar({ sidebarExpanded, setSidebarExpanded }) {
  const dispatch = useDispatch();
  const { orgId, currentOrg } = useSelector((state) => state.organization.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (orgId) {
      dispatch(fetchOrgById(orgId));
    }
  }, [dispatch, orgId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className={`sticky top-0 w-full -mb-18 h-auto min-h-[73px] z-30 bg-white shadow-lg transition-all duration-300 ease-in-out ${
        sidebarExpanded ? "lg:pl-0" : "lg:pl-0"
      }`}>
        <div className="w-full mx-auto flex flex-wrap items-center justify-between px-4 py-3 md:px-10">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button 
              className="lg:hidden p-2 mr-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              {sidebarExpanded ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <img 
              src={logoImage} 
              alt="PGR Logo" 
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="hidden lg:block text-xl ml-4 font-bold">PGR - Virtual Trading App</span>
          </div>

          {/* Search Bar */}
          <form className="hidden md:flex flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search here..."
                className="border border-gray-200 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pl-10 transition-all duration-200"
              />
            </div>
          </form>

          {/* Organization Name */}
          <div className="bg-lightBlue-600 text-white px-4 py-1 rounded-lg hover:bg-lightBlue-400 hover:text-gray-100 transition-all mx-4">
            <p title="organization name" className="text-lg uppercase">{currentOrg?.name}</p>
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-lightBlue-600 flex items-center justify-center text-white">
                  <i className="fas fa-user-circle text-xl"></i>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}/>
              </button>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                <div className="py-1">
                  <button 
                    onClick={() => {
                      setIsProfileModalOpen(true);
                      setIsDropdownOpen(false);
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => {
                      // Add change password functionality here
                      setIsDropdownOpen(false);
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      <OrganizationProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialValues={currentOrg || {}}
        refreshData={() => {
          if (orgId) {
            dispatch(fetchOrgById(orgId));
          }
        }}
      />
    </>
  );
}