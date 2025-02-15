import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import NotificationDropdown from "../Dropdowns/NotificationDropdown.js";
// import NotificationDropdown from "components/Admin/Dropdowns/NotificationDropdown";
import NotificationDropdown from "../Admin/Dropdowns/NotificationDropdown";
// import UserDropdown from "../Dropdowns/UserDropdown.js";
// import UserDropdown from "components/Admin/Dropdowns/UserDropdown";
import UserDropdown from "../Admin/Dropdowns/UserDropdown";
// import OrganizationRegistrationForm from "views/Organization/auth/Register.js";
// import OrganizationRegistrationForm from "views/Organization/auth/Register";
import OrganizationRegistrationForm from "../../views/Organization/auth/Register";
// import Login from "views/Organization/auth/Login.js";

export default function Sidebar({ sidebarExpanded, setSidebarExpanded }) {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  // const [isModalOpenLogin, setModalOpenLogin] = useState(false); // Modal state
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
    setCollapseShow("hidden");
    setActiveMenu(null);
  };

  const toggleMenu = (menuName) => {
    if (!sidebarExpanded) {
      setSidebarExpanded(true);
    }
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const menuItems = {
    user: [
      { to: "/profile", icon: "fas fa-user-circle", label: "Profile" },
      { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
      { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
    ],
    organization: [
      { to: "/organization/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
    //   { to: "#", icon: "fas fa-user-graduate", label: "User Register", onClick: () => setModalOpen(true) },
      // { to: "#", icon: "fas fa-sign-in-alt", label: "Student Login", onClick: () => setModalOpenLogin(true) },
      { to: "/organization/userlist", icon: "fas fa-users", label: "User List" },
    ],
  };

  return (
    <>
      <nav
        className={`${
          sidebarExpanded ? "md:w-64" : "md:w-24"
        } fixed md:left-0 md:top-0 md:bottom-0 bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between w-full h-20 px-6 border-b border-gray-200 dark:border-gray-800">
            <Link
              to="/"
              className={`flex items-center space-x-3 ${!sidebarExpanded && "md:hidden"}`}
            >
              <span className="text-lg font-semibold bg-gradient-to-r from-lightblue-600 to-lightblue-800 bg-clip-text text-transparent">
                Organization
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-0 ml-auto"
            >
              <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 dark:text-gray-500 text-base`}></i>
            </button>
          </div>

          {/* Mobile User Actions */}
          <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50 dark:bg-gray-800/50">
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
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                        activeMenu === section
                          ? "bg-white/20"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <i
                        className={`fas fa-${getSectionIcon(section)} ${
                          activeMenu === section
                            ? "text-gray-800"
                            : "text-gray-500 dark:text-gray-400"
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
                        onClick={item.onClick} // Pass onClick handler
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Profile Preview */}
          {sidebarExpanded && (
            <div className="mt-auto p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <i className="fas fa-user bg-gray-800"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:bg-gray-800">Abhishek</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Administrator</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Toggle */}
      <button
        className="fixed top-6 left-6 md:hidden p-3 rounded-xl bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow-lg"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Organization Registration Modal */}
      <OrganizationRegistrationForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      {/* <Login isOpen={isModalOpenLogin} onClose={() => setModalOpenLogin(false)} /> */}
    </>
  );
}

// Helper Components
const MenuLink = ({ to, icon, label, isActive, onClick }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={onClick} // Handle onClick
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-lg ${
          isActive
            ? "bg-blue-100 dark:bg-blue-900/40"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <i
          className={`${icon} ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        ></i>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

// Helper function to get section icons
const getSectionIcon = (section) => {
  const icons = {
    user: "user",
    organization: "building",
  };
  return icons[section] || "circle";
};