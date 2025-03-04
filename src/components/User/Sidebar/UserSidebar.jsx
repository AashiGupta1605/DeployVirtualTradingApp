// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import NotificationDropdown from "../Dropdowns/NotificationDropdown";
// import DashboardDropdown from "../Dropdowns/DashboardDropdown";

// // Function to get user details from localStorage
// const getUser = () => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   return token && user ? user : null;
// };

// export default function UserSidebar({ sidebarExpanded, setSidebarExpanded }) {
//   const [collapseShow, setCollapseShow] = React.useState("hidden");
//   const [activeMenu, setActiveMenu] = React.useState(null);
//   const location = useLocation();
//   const navigate = useNavigate(); // ✅ Replaced useHistory with useNavigate()

//   const user = getUser();
//   const userName = user ? user.name : "User";
//   const isAdmin = user && user.role === "admin";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login"); // ✅ Updated navigation
//   };

//   const toggleSidebar = () => {
//     setSidebarExpanded(!sidebarExpanded);
//     setCollapseShow("hidden");
//     setActiveMenu(null);
//   };

//   const toggleMenu = (menuName) => {
//     if (!sidebarExpanded) {
//       setSidebarExpanded(true);
//     }
//     setActiveMenu(activeMenu === menuName ? null : menuName);
//   };

//   const menuItems = isAdmin
//     ? {
//         admin: [
//           { to: "/admin/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
//           { to: "/admin/users", icon: "fas fa-users", label: "Manage Users" },
//           { to: "/admin/reports", icon: "fas fa-chart-line", label: "Reports" },
//         ],
//       }
//     : {
//         user: [
//           { to: "/user/niftytable", icon: "fas fa-table", label: "Nifty 50 Table" },
//           { to: "/user/etftable", icon: "fas fa-list", label: "ETF Table" },
//         ],
//       };

//   return (
//     <>
//      <nav
//   className={`${
//     sidebarExpanded ? "md:w-64" : "md:w-20"
//   } fixed left-0 top-0 bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-0`}
// >
//   <div className="flex flex-col h-full pb-16"> {/* Added padding-bottom to avoid footer overlap */}
//     <div className="flex items-center justify-between w-full h-[71px] px-6 border-b border-gray-200">
//       <Link
//         to={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
//         className={`flex items-center space-x-3 text-black ${!sidebarExpanded && "md:hidden"}`}
//       >
//         <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent capitalize">
//           My Account
//         </span>
//       </Link>
//       <button
//         onClick={toggleSidebar}
//         className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
//       >
//         <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}></i>
//       </button>
//     </div>

//     <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
//       <NotificationDropdown />
//       <DashboardDropdown />
//     </div>

//     <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
//       {Object.entries(menuItems).map(([section, items]) => (
//         <div key={section} className="space-y-4">
//           <button
//             onClick={() => toggleMenu(section)}
//             className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//               activeMenu === section
//                 ? "bg-lightBlue-600 text-white shadow-lg shadow-lightBlue-500/20"
//                 : "text-gray-600"
//             }`}
//           >
//             <div className="flex items-center space-x-2">
//               <div
//                 className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//                   activeMenu === section ? "bg-white/20" : "bg-lightBlue-100"
//                 }`}
//               >
//                 <i
//                   className={`fas fa-${isAdmin ? "user-shield" : "user"} ${
//                     activeMenu === section ? "text-gray-500" : "text-gray-500"
//                   }`}
//                 ></i>
//               </div>
//               {sidebarExpanded && <span className="font-medium capitalize">{userName}</span>}
//             </div>
//             {sidebarExpanded && (
//               <i
//                 className={`fas fa-chevron-${
//                   activeMenu === section ? "down" : "right"
//                 } transition-transform duration-200 text-sm`}
//               ></i>
//             )}
//           </button>

//           {sidebarExpanded && activeMenu === section && (
//             <div className="pl-4 space-y-2">
//               {items.map((item) => (
//                 <MenuLink
//                   key={item.to}
//                   to={item.to}
//                   icon={item.icon}
//                   label={item.label}
//                   isActive={location.pathname === item.to}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// </nav>

//     </>
//   );
// }

// // Helper Component for Menu Links
// const MenuLink = ({ to, icon, label, isActive }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive
//           ? "bg-blue-50  text-blue-600 "
//           : "text-gray-600 hover:bg-gray-100 "
//       }`}
//     >
//       <div
//         className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//           isActive
//             ? "bg-blue-100 "
//             : "bg-gray-100 "
//         }`}
//       >
//         <i
//           className={`${icon} ${
//             isActive
//               ? "text-blue-600 "
//               : "text-gray-500 "
//           }`}
//         ></i>
//       </div>
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// };
// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import NotificationDropdown from "../Dropdowns/NotificationDropdown";
// import DashboardDropdown from "../Dropdowns/DashboardDropdown";

// // Function to get user details from localStorage
// const getUser = () => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   return token && user ? user : null;
// };

// export default function UserSidebar({ sidebarExpanded, setSidebarExpanded }) {
//   const [collapseShow, setCollapseShow] = React.useState("hidden");
//   const [activeMenu, setActiveMenu] = React.useState(null);
//   const location = useLocation();
//   const navigate = useNavigate(); // ✅ Replaced useHistory with useNavigate()

//   const user = getUser();
//   const userName = user ? user.name : "User";
//   const isAdmin = user && user.role === "admin";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login"); // ✅ Updated navigation
//   };

//   const toggleSidebar = () => {
//     setSidebarExpanded(!sidebarExpanded);
//     setCollapseShow("hidden");
//     setActiveMenu(null);
//   };

//   const toggleMenu = (menuName) => {
//     if (!sidebarExpanded) {
//       setSidebarExpanded(true);
//     }
//     setActiveMenu(activeMenu === menuName ? null : menuName);
//   };

//   const menuItems = isAdmin
//     ? {
//         admin: [
//           { to: "/admin/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
//           { to: "/admin/users", icon: "fas fa-users", label: "Manage Users" },
//           { to: "/admin/reports", icon: "fas fa-chart-line", label: "Reports" },
//         ],
//       }
//     : {
//         user: [
//           { to: "/user/niftytable", icon: "fas fa-table", label: "Nifty 50 Table" },
//           { to: "/user/etftable", icon: "fas fa-list", label: "ETF Table" },
//         ],
//       };

//   return (
//     <>
//       <nav
//         className={`${
//           sidebarExpanded ? "md:w-64" : "md:w-24"
//         } fixed md:left-0 md:top-0 md:bottom-0 bg-white  shadow-xl transition-all duration-300 ease-in-out z-50`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo Section */}
//           <div className="flex items-center justify-between w-full h-[71px] px-6 border-b border-gray-200 ">

//             <Link
//               to={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
//               className={`flex items-center space-x-3 ${!sidebarExpanded && "md:hidden"}`}
//             >
//               <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent capitalize">
//                 {userName}
//               </span>
//             </Link>
//             <button
//               onClick={toggleSidebar}
//               className="p-1 rounded-lg hover:bg-gray-200  transition-colors focus:outline-none focus:ring-0 ml-auto"
//             >
//               <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400  text-base`}></i>
//             </button>
//           </div>

//           {/* Mobile User Actions */}
//           <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50 ">
//             <NotificationDropdown />
//             <DashboardDropdown />
//           </div>

//           {/* Navigation */}
//           <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
//             {Object.entries(menuItems).map(([section, items]) => (
//               <div key={section} className="space-y-4">
//                 <button
//                   onClick={() => toggleMenu(section)}
//                   className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//                     activeMenu === section
//                       ? "bg-lightBlue-600 text-white shadow-lg shadow-lightBlue-500/20"
//                       : "text-gray-600 "
//                   }`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <div
//                       className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//                         activeMenu === section
//                           ? "bg-white/20"
//                           : "bg-gray-100"
//                       }`}
//                     >
//                       <i
//                         className={`fas fa-${isAdmin ? "user-shield" : "user"} ${
//                           activeMenu === section
//                             ? "text-gray-800"
//                             : "text-gray-500 "
//                         }`}
//                       ></i>
//                     </div>
//                     {sidebarExpanded && (
//                       <span className="font-medium capitalize">{userName}</span>
//                     )}
//                   </div>
//                   {sidebarExpanded && (
//                     <i
//                       className={`fas fa-chevron-${
//                         activeMenu === section ? "down" : "right"
//                       } transition-transform duration-200 text-sm`}
//                     ></i>
//                   )}
//                 </button>

//                 {sidebarExpanded && activeMenu === section && (
//                   <div className="pl-4 space-y-2">
//                     {items.map((item) => (
//                       <MenuLink
//                         key={item.to}
//                         to={item.to}
//                         icon={item.icon}
//                         label={item.label}
//                         isActive={location.pathname === item.to}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Logout Button */}
//           {/* {user && (
//             <div className="p-4">
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
//               >
//                 <i className="fas fa-sign-out-alt"></i>
//                 {sidebarExpanded && <span>Logout</span>}
//               </button>
//             </div>
//           )} */}
//         </div>
//       </nav>
//     </>
//   );
// }

// // Helper Component for Menu Links
// const MenuLink = ({ to, icon, label, isActive }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive
//           ? "bg-blue-50  text-blue-600 "
//           : "text-gray-600 hover:bg-gray-100 "
//       }`}
//     >
//       <div
//         className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//           isActive
//             ? "bg-blue-100 "
//             : "bg-gray-100 "
//         }`}
//       >
//         <i
//           className={`${icon} ${
//             isActive
//               ? "text-blue-600 "
//               : "text-gray-500 "
//           }`}
//         ></i>
//       </div>
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// };
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import DashboardDropdown from "../Dropdowns/DashboardDropdown";
import { useDispatch, useSelector } from "react-redux";

export default function UserSidebar({ sidebarExpanded, setSidebarExpanded }) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [activeMenu, setActiveMenu] = React.useState(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user.profile);
  const location = useLocation();
  const navigate = useNavigate();

  const userName = userData ? userData.name : "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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

  const menuItems = [
    { to: "/user/niftytable", icon: "fas fa-table", label: "Nifty 50 Table" },
    { to: "/user/etftable", icon: "fas fa-list", label: "ETF Table" },
  
  ];
  

  return (
    <>
      <nav
        className={`${
          sidebarExpanded ? "md:w-64" : "md:w-20"
        } fixed left-0 top-0 bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-0`}
      >
        <div className="flex flex-col h-full pb-0">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between w-full h-[71px] px-6 border-b border-gray-200">
            <Link
              to="/user/dashboard"
              className={`flex items-center space-x-3 text-black ${
                !sidebarExpanded && "md:hidden"
              }`}
            >
              <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent capitalize">
                {userName}
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
            >
              <i
                className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}
              ></i>
            </button>
          </div>

          {/* Mobile Dropdowns */}
          <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
            <NotificationDropdown />
            <DashboardDropdown />
          </div>

          {/* Sidebar Menu */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            
  {/* Nifty Table Dropdown */}
  <div className="space-y-4">
    <button
      onClick={() => toggleMenu("nifty")}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
        activeMenu === "nifty" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "nifty" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
          <i className="fas fa-chart-line text-gray-500"></i>
        </div>
        {sidebarExpanded && <span className="font-medium capitalize">Nifty Table</span>}
      </div>
      {sidebarExpanded && (
        <i className={`fas fa-chevron-${activeMenu === "nifty" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
      )}
    </button>

    {sidebarExpanded && activeMenu === "nifty" && (
      <div className="pl-4 space-y-2">
        <MenuLink to="/user/niftytable" icon="fas fa-table" label="Nifty Table" isActive={location.pathname === "/user/niftytable"} />
      </div>
    )}
  </div>

  {/* ETF Table Dropdown */}
  <div className="space-y-4">
    <button
      onClick={() => toggleMenu("etf")}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
        activeMenu === "etf" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "etf" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200 "}`}>
          <i className="fas fa-chart-bar text-gray-500"></i>
        </div>
        {sidebarExpanded && <span className="font-medium capitalize">ETF Table</span>}
      </div>
      {sidebarExpanded && (
        <i className={`fas fa-chevron-${activeMenu === "etf" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
      )}
    </button>

    {sidebarExpanded && activeMenu === "etf" && (
      <div className="pl-4 space-y-2">
        <MenuLink to="/user/etftable" icon="fas fa-table" label="ETF Table" isActive={location.pathname === "/user/etftable"} />
      </div>
    )}
  </div>

  <div className="space-y-4">
  <Link
    to="/user/feedback"
    onClick={() => toggleMenu("feedback")}
    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      activeMenu === "feedback" ? "bg-lightBlue-600 text-white" : "text-gray-600"
    }`}
  >
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-lg ${
        activeMenu === "feedback" ? "bg-lightBlue-500 text-white" : "hover:bg-gray-200"
      }`}
    >
      <i className={`fas fa-comment ${activeMenu === "feedback" ? "text-white" : "text-gray-500"}`}></i>
    </div>
    {sidebarExpanded && <span className="font-medium">Feedback</span>}
  </Link>
</div>

</div>

          
          {/* Logout */}
          {userData && (
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                <i className="fas fa-sign-out-alt"></i>
                {sidebarExpanded && <span>Logout</span>}
              </button>
            </div>
          )}

      {sidebarExpanded && (
            <div className="mt-auto p-6 border-t bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-lightBlue-600 flex items-center justify-center shadow-lg">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-medium">{userName}</div>
                  <div className="text-sm">User</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

const MenuLink = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isActive ? "bg-blue-100" : "bg-gray-100"}`}>
        <i className={`${icon} ${isActive ? "text-blue-600" : "text-gray-500"}`}></i>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};
