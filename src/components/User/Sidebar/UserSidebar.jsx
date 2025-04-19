import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../../redux/User/userprofileSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { X, ChevronDown, ChevronRight } from 'lucide-react';

export default function UserSidebar({ sidebarExpanded, setSidebarExpanded }) {
  const [activeMenu, setActiveMenu] = React.useState(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user.profile);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  
  const userName = userData ? userData.name : "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    navigate("/");
  };

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <>
      {sidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
          onClick={() => setSidebarExpanded(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 z-30 w-64 bg-white shadow-xl transition-all duration-300 ease-in-out
          ${sidebarExpanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between w-full h-[73px] px-4 border-b border-gray-200">
            {sidebarExpanded ? (
              <div className="flex items-center justify-between w-full">
                <Link
                  to="/user/dashboard"
                  className="text-lg font-semibold capitalize truncate"
                >
                  {userName}
                </Link>
                <button
                  onClick={() => setSidebarExpanded(false)}
                  className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <button
                  onClick={() => setSidebarExpanded(true)}
                  className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none"
                >
                  <i className="fas fa-bars text-gray-600"></i>
                </button>
              </div>
            )}
          </div>

          <div className={`flex-1 overflow-y-auto ${sidebarExpanded ? "px-1" : "px-0"}`}>
            <SidebarSection
              name="dashboard"
              icon="fas fa-tachometer-alt"
              label="Dashboard"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              sidebarExpanded={sidebarExpanded}
            >
              <MenuLink 
                to="/user/dashboard" 
                icon="fas fa-tachometer-alt" 
                label="Dashboard" 
                isActive={location.pathname === "/user/dashboard"} 
                sidebarExpanded={sidebarExpanded}
              />
            </SidebarSection>

            <SidebarSection
              name="tables"
              icon="fas fa-table"
              label="Tables"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              sidebarExpanded={sidebarExpanded}
            >
              <MenuLink 
                to="/user/niftytable" 
                icon="fas fa-chart-line" 
                label="Nifty 50 Table" 
                isActive={location.pathname === "/user/niftytable"} 
                sidebarExpanded={sidebarExpanded}
              />
              <MenuLink 
                to="/user/etftable" 
                icon="fas fa-table" 
                label="ETF Table" 
                isActive={location.pathname === "/user/etftable"} 
                sidebarExpanded={sidebarExpanded}
              />
              <MenuLink 
                to="/user/nifty500table" 
                icon="fas fa-chart-bar" 
                label="Nifty 500 Table" 
                isActive={location.pathname === "/user/nifty500table"} 
                sidebarExpanded={sidebarExpanded}
              />
            </SidebarSection>

            <SidebarSection
              name="portfolio"
              icon="fas fa-briefcase"
              label="My Portfolio"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              sidebarExpanded={sidebarExpanded}
            >
              <MenuLink 
                to="/user/tradingnifty" 
                icon="fas fa-exchange-alt" 
                label="Trading" 
                isActive={location.pathname === "/user/tradingnifty"} 
                sidebarExpanded={sidebarExpanded}
              />
            </SidebarSection>
            
            <SidebarSection
              name="feedback"
              icon="fas fa-comment"
              label="Feedback"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              sidebarExpanded={sidebarExpanded}
            >
              <MenuLink 
                to="/user/feedback" 
                icon="fas fa-comment-dots" 
                label="Submit Feedback" 
                isActive={location.pathname === "/user/feedback"} 
                sidebarExpanded={sidebarExpanded}
              />
            </SidebarSection>

            <SidebarSection
              name="complaint"
              icon="fas fa-exclamation-circle"
              label="Complaint"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              sidebarExpanded={sidebarExpanded}
            >
              <MenuLink 
                to="/user/complaint" 
                icon="fas fa-exclamation-triangle" 
                label="Submit Complaint" 
                isActive={location.pathname === "/user/complaint"} 
                sidebarExpanded={sidebarExpanded}
              />
            </SidebarSection>

            <SidebarSection
              name="events"
              icon="fas fa-calendar-alt"
              label="Events"
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              sidebarExpanded={sidebarExpanded}
            >
              <MenuLink 
                to="/user/eventspage" 
                icon="fas fa-calendar-check" 
                label="View Events" 
                isActive={location.pathname === "/user/eventspage"} 
                sidebarExpanded={sidebarExpanded}
              />
              <MenuLink 
                to="/user/my-events" 
                icon="fas fa-calendar-minus" 
                label="My Events" 
                isActive={location.pathname === "/user/my-events"} 
                sidebarExpanded={sidebarExpanded}
              />
            </SidebarSection>
          </div>

          <div className="mt-auto">
            <div className="p-4">
              <button 
                onClick={handleLogout}
                className={`w-full flex items-center justify-center text-red-500 hover:text-red-700 transition-colors rounded-lg p-3
                  ${sidebarExpanded ? "bg-red-50 hover:bg-red-100 space-x-2" : "hover:bg-red-50"}`}
                title={!sidebarExpanded ? "Logout" : ""}
              >
                <i className="fas fa-sign-out-alt"></i>
                {sidebarExpanded && <span>Logout</span>}
              </button>
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
                    <div className="font-medium truncate">{userName}</div>
                    <div className="text-sm text-gray-500">User</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const SidebarSection = ({ name, icon, label, activeMenu, toggleMenu, sidebarExpanded, children }) => {
  return (
    <div className="space-y-1">
      <button
        onClick={() => toggleMenu(name)}
        className={`w-full flex items-center ${sidebarExpanded ? "justify-between p-2" : "justify-center p-3"} rounded-lg transition-all duration-200 
          ${activeMenu === name ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"}`}
        title={!sidebarExpanded ? label : ""}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 
            ${activeMenu === name ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
            <i className={`${icon} ${activeMenu === name ? "text-white" : "text-gray-500"}`}></i>
          </div>
          {sidebarExpanded && <span className="font-medium">{label}</span>}
        </div>
        {sidebarExpanded && (
          activeMenu === name ? (
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-4 h-4 transition-transform duration-200" />
          )
        )}
      </button>
      {sidebarExpanded && activeMenu === name && (
        <div className="pl-4 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const MenuLink = ({ to, icon, label, isActive, sidebarExpanded }) => {
  return (
    <Link
      to={to}
      className={`flex items-center ${sidebarExpanded ? "space-x-3 px-4 py-2" : "justify-center p-3"} rounded-lg transition-all duration-200 
        ${isActive ? "bg-blue-50 text-lightBlue-600" : "text-gray-600 hover:bg-gray-100"}`}
      title={!sidebarExpanded ? label : ""}
    >
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
        isActive ? "bg-blue-100" : "bg-gray-100"
      }`}>
        <i className={`${icon} ${isActive ? "text-lightBlue-600" : "text-gray-500"}`}></i>
      </div>
      {sidebarExpanded && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};