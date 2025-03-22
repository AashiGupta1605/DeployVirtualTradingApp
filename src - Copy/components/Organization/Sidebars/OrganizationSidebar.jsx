
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrgById, logoutOrganization } from "../../../redux/Organization/auth/organizationAuthSlice";
import NotificationDropdown from "../../Admin/Dropdowns/NotificationDropdown";
import UserDropdown from "../../Admin/Dropdowns/UserDropdown";
import OrganizationProfileModal from "../../../views/Organization/OrganizationDetails/Models/OrganizationProfileModal";
import toast from "react-hot-toast";
import Tooltip from "../../Common/Tooltip";

export default function OrganizationSidebar({ sidebarExpanded, setSidebarExpanded }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get orgId and currentOrg from Redux state
  const { orgId, currentOrg } = useSelector((state) => state.organization.auth);

  // State for managing menu collapse and active menu
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [hoveredTooltip, setHoveredTooltip] = useState(null); // Tooltip hover state

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
    setCollapseShow("hidden");
    setActiveMenu(null);
  };

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
    setActiveMenu(null);
  };
  // Toggle menu collapse
  const toggleMenu = (menuName) => {
    if (!sidebarExpanded) {
      setSidebarExpanded(true);
    }
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutOrganization()); // Dispatch logout action
    toast.success("Logout Successfully");
    navigate("/"); // Redirect to home page
  };

  // Menu items (conditional rendering based on orgId)
  const menuItems = {
    organization: [
      { to: "/organization/dashboard", icon: "fas fa-chart-line", label: "Organization Dashboard" },
      { to: "/organization/org-feedabacks", icon: "fa fa-check", label: "Organization Feedbacks" },
    ],
    user: [
      { to: "/organization/userlist", icon: "fas fa-users", label: "User List" },
      { to: "/organization/users/feedbacks", icon: "fa fa-check", label: "User Feedbacks" },
    ],
  };

  // Helper function to get section icons
  const getSectionIcon = (section) => {
    const icons = {
      user: "user",
      organization: "building",
    };
    return icons[section] || "circle";
  };

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`${
          sidebarExpanded ? "md:w-64" : "md:w-20"
        } fixed md:left-0 md:top-0 md:bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-5`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}

{/* <div className={`flex items-center w-full h-[73px] border-b border-gray-200 ${sidebarExpanded ? "justify-between px-5" : "justify-center px-0"}`}>
  <div className="flex items-center space-x-3">
    {sidebarExpanded && (
      <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
        <span className="text-lg font-bold leading-relaxed uppercase">
          {currentOrg?.name || "Organization"}
        </span>
      </Link>
    )}
  </div>

  <button
    onClick={handleSidebarToggle}
    className="p-2 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 flex items-center justify-center"
  >
    <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-lg`}></i>
  </button>
</div> */}
<div className="flex items-center justify-between w-full h-[73px] px-6 border-b border-gray-200">
          <span className="text-lg font-bold leading-relaxed uppercase">
            {sidebarExpanded ? currentOrg?.name || "Organization" : ""}
          </span>
          <button
            onClick={handleSidebarToggle}
            className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
          >
            <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}></i>
          </button>
        </div>


          {/* Mobile User Actions */}
          <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
            <NotificationDropdown />
            <UserDropdown />
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
  {Object.entries(menuItems).map(([section, items]) => (
    <div key={section} className="space-y-4">
      <button
        onClick={() => toggleMenu(section)}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
          activeMenu === section
            ? "bg-lightBlue-600 text-white shadow-lg shadow-lightBlue-500/20"
            : "text-gray-600"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              activeMenu === section ? "bg-white/20" : "hover:bg-gray-200"
            }`}
          >
            <i
              className={`fas fa-${getSectionIcon(section)} ${
                activeMenu === section ? "text-gray-800" : "text-gray-500"
              }`}
            ></i>
          </div>
          {sidebarExpanded && (
            <span className="font-medium capitalize">{section}</span>
          )}
        </div>
        {sidebarExpanded && (
          <i
            className={`fas fa-chevron-${
              activeMenu === section ? "down" : "right"
            } transition-transform duration-200 text-sm`}
          ></i>
        )}
      </button>

      {sidebarExpanded && activeMenu === section && (
        <div className="pl-4 space-y-2">
          {items.map((item) => (
            <MenuLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>
      )}
    </div>
  ))}
</div>


          {/* Logout Button */}
<div className="mt-auto p-4">
  <Tooltip title="Logout" isVisible={!sidebarExpanded && hoveredTooltip === "logout"}>
    <button
      onClick={handleLogout}
      onMouseEnter={() => setHoveredTooltip("logout")}
      onMouseLeave={() => setHoveredTooltip(null)}
      className={`w-full flex items-center justify-center text-red-500 hover:text-red-700 transition-colors rounded-lg p-3
        ${sidebarExpanded ? "bg-red-50 hover:bg-red-100 space-x-2" : "hover:bg-red-50"}`}
    >
      <i className="fas fa-sign-out-alt"></i>
      {sidebarExpanded && <span>Logout</span>}
    </button>
  </Tooltip>
</div>


  <div className={`border-t bg-gray-50 p-4 flex items-center ${sidebarExpanded ? "justify-between" : "justify-center"}`}>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-lightBlue-600 flex items-center justify-center shadow-lg">
          <i className="fas fa-user text-white"></i>
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      {sidebarExpanded && (
        <div>
          <div className="font-medium text-gray-900">{currentOrg?.name || "Organization"}</div>
          <div className="text-sm text-gray-500">Administrator</div>
        </div>
      )}
    </div>
  </div>


        </div>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-6 left-6 md:hidden p-3 rounded-xl bg-white text-gray-600 shadow-lg"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Organization Profile Modal */}
      <OrganizationProfileModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={currentOrg || {}}
        refreshData={() => {
          if (orgId) {
            dispatch(fetchOrgById(orgId)); // Refresh organization data using orgId
          }
        }}
      />
    </>
  );
}

// Helper Component for Menu Links
const MenuLink = ({ to, icon, label, isActive, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={` w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-lg ${
          isActive ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        <i className={`${icon} ${isActive ? "text-blue-600" : "text-gray-500"}`}></i>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

// Logout Button Component
const LogoutButton = ({ onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <i className="fas fa-sign-out-alt text-gray-500"></i>
      </div>
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
};