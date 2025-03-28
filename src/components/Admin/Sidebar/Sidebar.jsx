// Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { resetAdminState } from '../../../redux/Admin/AdminSlice';
import toast from "react-hot-toast";
import logoImage from "../../../assets/img/PGR_logo.jpeg";

export default function Sidebar({ sidebarExpanded, setSidebarExpanded }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
    setActiveMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(resetAdminState());
    toast.success("Logout Successfully");
    navigate('/');
  };

  const handleMenuToggle = (menuName) => {
    if (!sidebarExpanded) {
      setSidebarExpanded(true);
    }
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const menuItems = {
    admin: [
      { to: "/admin/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
      { to: "/admin/niftytable", icon: "fas fa-table", label: "Nifty 50" },
      { to: "/admin/nifty500table", icon: "fas fa-chart-line", label: "Nifty 500" },
      { to: "/admin/etftable", icon: "fas fa-list", label: "ETF" },
      { to: "/admin/registeredUsers", icon: "fas fa-users", label: "Users" },
      { to: "/admin/OrgRegister", icon: "fas fa-building", label: "Organizations" },
      { to: "/admin/queries", icon: "fas fa-envelope", label: "Queries" },
      { to: "/admin/feedback", icon: "fas fa-comments", label: "Feedback" },
      { to: "/admin/settings", icon: "fas fa-cog", label: "Settings" },

    ],
    events: [
      { to: "/admin/events", icon: "fas fa-calendar-alt", label: "Events" },
    //   { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
    //   { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
    ],
    // organization: [
    //   { to: "/admin/organization/register", icon: "fas fa-users", label: "Student Register" },
    //   { to: "/admin/organization/login", icon: "fas fa-sign-in-alt", label: "Student Login" },
    // ],
  };

  return (
    <nav className={`${sidebarExpanded ? "md:w-64" : "md:w-20"} fixed left-0 top-0 bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-50`}>
      <div className="flex flex-col h-full ">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full h-[73px] px-6 border-b border-gray-200">
          <span className="text-lg font-bold leading-relaxed uppercase">
            {sidebarExpanded ? "Admin" : ""}
          </span>
          <button
            onClick={handleSidebarToggle}
            className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
          >
            <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}></i>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {Object.entries(menuItems).map(([section, items]) => (
            <div key={section} className="space-y-4">
              <button
                onClick={() => handleMenuToggle(section)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  activeMenu === section
                    ? "bg-lightBlue-600 text-white shadow-lg shadow-lightBlue-500/20"
                    : "text-gray-600"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 bg-white flex items-center justify-center rounded-lg ${activeMenu === section ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
                    <i className={`fas fa-${getSectionIcon(section)} ${activeMenu === section ? "text-gray-500" : "text-gray-500"}`}></i>
                  </div>
                  {sidebarExpanded && <span className="font-medium capitalize">{section}</span>}
                </div>
                {sidebarExpanded && (
                  <i className={`fas fa-chevron-${activeMenu === section ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
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

        <div className="p-4">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center justify-center text-red-500 hover:text-red-700 transition-colors rounded-lg p-3
              ${sidebarExpanded ? "bg-red-50 hover:bg-red-100 space-x-2" : "hover:bg-red-50"}`}
          >
            <i className="fas fa-sign-out-alt"></i>
            {sidebarExpanded && <span>Logout</span>}
          </button>
        </div>
        {/* User Profile Section */}
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
                <div className="font-medium">Admin</div>
                <div className="text-sm">Administrator</div>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}

      </div>
    </nav>
  );
}

const MenuLink = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive ? "bg-lightBlue-50 text-lightBlue-600" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isActive ? "bg-lightBlue-100" : "bg-gray-100"}`}>
      <i className={`${icon} ${isActive ? "text-lightBlue-600" : "text-gray-500"}`}></i>
    </div>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const getSectionIcon = (section) => {
  const icons = {
    admin: "shield-alt",
    user: "user",
    organization: "building",
  };
  return icons[section] || "circle";
};

Sidebar.propTypes = {
  sidebarExpanded: PropTypes.bool.isRequired,
  setSidebarExpanded: PropTypes.func.isRequired,
};

MenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};