// // real working 

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import NotificationDropdown from "../Admin/Dropdowns/NotificationDropdown";
// import UserDropdown from "../Admin/Dropdowns/UserDropdown";
// import OrganizationRegistrationForm from "../../views/Organization/auth/OrganizationUserRegistration";

// export default function Sidebar({ sidebarExpanded, setSidebarExpanded }) {
//   const orgName = localStorage.getItem("orgName");
//   const [collapseShow, setCollapseShow] = useState("hidden");
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state
//   // const [isModalOpenLogin, setModalOpenLogin] = useState(false); // Modal state

//   const location = useLocation();

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

//   const menuItems = {
//     user: [
//       { to: "/profile", icon: "fas fa-user-circle", label: "Profile" },
//       { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
//       { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
//     ],
//     organization: [
//       { to: "/organization/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
//       { to: "/organization/userlist", icon: "fas fa-users", label: "User List" },
//       // { to: `/organization/${orgName}/users`, icon: "fas fa-users", label: "User List" },
     
//     ],
//   };

//   return (
//     <>
//       <nav
//         className={`${
//           sidebarExpanded ? "md:w-64" : "md:w-24"
//         } fixed md:left-0 md:top-0 md:bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-20`}
//       > 
//         <div className="flex flex-col h-full">
//           {/* Logo Section */}
//           <div className="flex items-center justify-between w-full h-20 px-6 border-b border-gray-200">
//             <Link
//               to="/"
//               className={`flex items-center space-x-3 ${!sidebarExpanded && "md:hidden"}`}
//             >
//               <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent">
//                 {orgName}
//               </span>
//             </Link>
//             <button
//               onClick={toggleSidebar}
//               className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
//             >
//               <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}></i>
//             </button>
//           </div>

//           {/* Mobile User Actions */}
//           <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
//             <NotificationDropdown />
//             <UserDropdown />
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
//                       : "text-gray-600"
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
//                         className={`fas fa-${getSectionIcon(section)} ${
//                           activeMenu === section
//                             ? "text-gray-800"
//                             : "text-gray-500"
//                         }`}
//                       ></i>
//                     </div>
//                     {sidebarExpanded && (
//                       <span className="font-medium capitalize">{section}</span>
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
//                         onClick={item.onClick} // Pass onClick handler
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* User Profile Preview */}
//           {sidebarExpanded && (
//             <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50">
//               <div className="flex items-center space-x-4">
//                 <div className="relative">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
//                     <i className="fas fa-user bg-gray-800"></i>
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                 </div>
//                 <div>
//                   <div className="font-medium text-gray-900">{orgName}</div>
//                   <div className="text-sm text-gray-500">Administrator</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Toggle */}
//       <button
//         className="fixed top-6 left-6 md:hidden p-3 rounded-xl bg-white text-gray-600 shadow-lg"
//         onClick={toggleSidebar}
//       >
//         <i className="fas fa-bars"></i>
//       </button>

//       {/* Organization Registration Modal */}
//       <OrganizationRegistrationForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
//       {/* <Login isOpen={isModalOpenLogin} onClose={() => setModalOpenLogin(false)} /> */}
//     </>
//   );
// }

// // Helper Components
// const MenuLink = ({ to, icon, label, isActive, onClick }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive
//           ? "bg-blue-50 text-blue-600"
//           : "text-gray-600 hover:bg-gray-100"
//       }`}
//       onClick={onClick} // Handle onClick
//     >
//       <div
//         className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//           isActive
//             ? "bg-blue-100"
//             : "bg-gray-100"
//         }`}
//       >
//         <i
//           className={`${icon} ${
//             isActive
//               ? "text-blue-600"
//               : "text-gray-500"
//           }`}
//         ></i>
//       </div>
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// };

// // Helper function to get section icons
// const getSectionIcon = (section) => {
//   const icons = {
//     user: "user",
//     organization: "building",
//   };
//   return icons[section] || "circle";
// };





// // new one responsive ness
// // import React, { useState } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import NotificationDropdown from "../Admin/Dropdowns/NotificationDropdown";
// // import UserDropdown from "../Admin/Dropdowns/UserDropdown";
// // import OrganizationRegistrationForm from "../../views/Organization/auth/Register";

// // export default function Sidebar({ sidebarExpanded, setSidebarExpanded }) {
// //   const [activeMenu, setActiveMenu] = useState(null);
// //   const [isModalOpen, setModalOpen] = useState(false);
// //   const location = useLocation();

// //   const toggleSidebar = () => {
// //     setSidebarExpanded(!sidebarExpanded);
// //     setActiveMenu(null);
// //   };

// //   const toggleMenu = (menuName) => {
// //     if (!sidebarExpanded) {
// //       setSidebarExpanded(true);
// //     }
// //     setActiveMenu(activeMenu === menuName ? null : menuName);
// //   };

// //   const menuItems = {
// //     user: [
// //       { to: "/profile", icon: "fas fa-user-circle", label: "Profile" },
// //       { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
// //       { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
// //     ],
// //     organization: [
// //       { to: "/organization/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
// //       { to: "/organization/userlist", icon: "fas fa-users", label: "User List" },
// //     ],
// //   };

// //   return (
// //     <>
// //       <nav
// //         className={`${
// //           sidebarExpanded ? "w-64" : "w-20"
// //         } fixed md:left-0 md:top-0 md:bottom-0 w-full md:w-auto bg-white shadow-xl transition-all duration-300 ease-in-out z-50`}
// //       >
// //         <div className="flex flex-col h-full">
// //           {/* Logo Section */}
// //           <div className="flex items-center justify-between w-full h-20 px-6 border-b border-gray-200">
// //             <Link
// //               to="/"
// //               className={`flex items-center space-x-3 ${!sidebarExpanded && "md:hidden"}`}
// //             >
// //               <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent">
// //                 Organization
// //               </span>
// //             </Link>
// //             <button
// //               onClick={toggleSidebar}
// //               className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
// //             >
// //               <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}></i>
// //             </button>
// //           </div>

// //           {/* Mobile User Actions */}
// //           <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
// //             <NotificationDropdown />
// //             <UserDropdown />
// //           </div>

// //           {/* Navigation */}
// //           <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
// //             {Object.entries(menuItems).map(([section, items]) => (
// //               <div key={section} className="space-y-4">
// //                 <button
// //                   onClick={() => toggleMenu(section)}
// //                   className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
// //                     activeMenu === section
// //                       ? "bg-lightBlue-600 text-white shadow-lg shadow-lightBlue-500/20"
// //                       : "text-gray-600"
// //                   }`}
// //                 >
// //                   <div className="flex items-center space-x-2">
// //                     <div
// //                       className={`w-8 h-8 flex items-center justify-center rounded-lg ${
// //                         activeMenu === section
// //                           ? "bg-white/20"
// //                           : "bg-gray-100"
// //                       }`}
// //                     >
// //                       <i
// //                         className={`fas fa-${getSectionIcon(section)} ${
// //                           activeMenu === section
// //                             ? "text-gray-800"
// //                             : "text-gray-500"
// //                         }`}
// //                       ></i>
// //                     </div>
// //                     {sidebarExpanded && (
// //                       <span className="font-medium capitalize">{section}</span>
// //                     )}
// //                   </div>
// //                   {sidebarExpanded && (
// //                     <i
// //                       className={`fas fa-chevron-${
// //                         activeMenu === section ? "down" : "right"
// //                       } transition-transform duration-200 text-sm`}
// //                     ></i>
// //                   )}
// //                 </button>

// //                 {sidebarExpanded && activeMenu === section && (
// //                   <div className="pl-4 space-y-2">
// //                     {items.map((item) => (
// //                       <MenuLink
// //                         key={item.to}
// //                         to={item.to}
// //                         icon={item.icon}
// //                         label={item.label}
// //                         isActive={location.pathname === item.to}
// //                         onClick={item.onClick} // Pass onClick handler
// //                       />
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* User Profile Preview */}
// //           {sidebarExpanded && (
// //             <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50">
// //               <div className="flex items-center space-x-4">
// //                 <div className="relative">
// //                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
// //                     <i className="fas fa-user bg-gray-800"></i>
// //                   </div>
// //                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
// //                 </div>
// //                 <div>
// //                   <div className="font-medium text-gray-900">Abhishek</div>
// //                   <div className="text-sm text-gray-500">Administrator</div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </nav>

// //       {/* Mobile Toggle */}
// //       <button
// //         className="fixed top-6 left-6 md:hidden p-3 rounded-xl bg-white text-gray-600 shadow-lg"
// //         onClick={toggleSidebar}
// //       >
// //         <i className="fas fa-bars"></i>
// //       </button>

// //       {/* Organization Registration Modal */}
// //       <OrganizationRegistrationForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
// //     </>
// //   );
// // }

// // // Helper Components
// // const MenuLink = ({ to, icon, label, isActive, onClick }) => {
// //   return (
// //     <Link
// //       to={to}
// //       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
// //         isActive
// //           ? "bg-blue-50 text-blue-600"
// //           : "text-gray-600 hover:bg-gray-100"
// //       }`}
// //       onClick={onClick} // Handle onClick
// //     >
// //       <div
// //         className={`w-8 h-8 flex items-center justify-center rounded-lg ${
// //           isActive
// //             ? "bg-blue-100"
// //             : "bg-gray-100"
// //         }`}
// //       >
// //         <i
// //           className={`${icon} ${
// //             isActive
// //               ? "text-blue-600"
// //               : "text-gray-500"
// //           }`}
// //         ></i>
// //       </div>
// //       <span className="text-sm font-medium">{label}</span>
// //     </Link>
// //   );
// // };

// // // Helper function to get section icons
// // const getSectionIcon = (section) => {
// //   const icons = {
// //     user: "user",
// //     organization: "building",
// //   };
// //   return icons[section] || "circle";
// // };









// redux toolkit: working

// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutOrganization } from "../../redux/Organization/auth/organizationAuthSlice";
// import NotificationDropdown from "../Admin/Dropdowns/NotificationDropdown";
// import UserDropdown from "../Admin/Dropdowns/UserDropdown";
// import OrganizationRegistrationForm from "../../views/Organization/auth/OrganizationUserRegistration";
// import toast from "react-hot-toast";

// export default function Sidebar({ sidebarExpanded, setSidebarExpanded }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get orgName from Redux state or localStorage
//   const orgName = useSelector((state) => state.organization.auth.orgName) || localStorage.getItem("orgName");

//   // State for managing menu collapse and active menu
//   const [collapseShow, setCollapseShow] = useState("hidden");
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state

//   // Toggle sidebar expansion
//   const toggleSidebar = () => {
//     setSidebarExpanded(!sidebarExpanded);
//     setCollapseShow("hidden");
//     setActiveMenu(null);
//   };

//   // Toggle menu collapse
//   const toggleMenu = (menuName) => {
//     if (!sidebarExpanded) {
//       setSidebarExpanded(true);
//     }
//     setActiveMenu(activeMenu === menuName ? null : menuName);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logoutOrganization()); // Dispatch logout action
//     toast.success("logout successfully");
//     navigate("/"); // Redirect to home page
//   };

//   // Menu items (conditional rendering based on orgName)
//   const menuItems = {
//     user: [
//       { to: "/profile", icon: "fas fa-user-circle", label: "Profile" },
//       ...(!orgName
//         ? [
//             { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
//             { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
//           ]
//         : []),
//     ],
//     organization: [
//       { to: "/organization/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
//       { to: "/organization/userlist", icon: "fas fa-users", label: "User List" },
//     ],
//   };

//   // Helper function to get section icons
//   const getSectionIcon = (section) => {
//     const icons = {
//       user: "user",
//       organization: "building",
//     };
//     return icons[section] || "circle";
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <nav
//         className={`${
//           sidebarExpanded ? "md:w-64" : "md:w-24"
//         } fixed md:left-0 md:top-0 md:bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-20`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo Section */}
//           <div className="flex items-center justify-between w-full h-20 px-6 border-b border-gray-200">
//             <Link
//               to="/"
//               className={`flex items-center space-x-3 ${!sidebarExpanded && "md:hidden"}`}
//             >
//               <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent">
//                 {orgName || "Organization"}
//               </span>
//             </Link>
//             <button
//               onClick={toggleSidebar}
//               className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
//             >
//               <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}></i>
//             </button>
//           </div>

//           {/* Mobile User Actions */}
//           <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
//             <NotificationDropdown />
//             <UserDropdown />
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
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <div
//                       className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//                         activeMenu === section ? "bg-white/20" : "bg-gray-100"
//                       }`}
//                     >
//                       <i
//                         className={`fas fa-${getSectionIcon(section)} ${
//                           activeMenu === section ? "text-gray-800" : "text-gray-500"
//                         }`}
//                       ></i>
//                     </div>
//                     {sidebarExpanded && (
//                       <span className="font-medium capitalize">{section}</span>
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

//           {/* User Profile Preview and Logout Button */}
//           {sidebarExpanded && (
            
//             <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50">
              
//               <div className="flex items-center space-x-4">
//                 <div className="relative">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
//                     <i className="fas fa-user text-white"></i>
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                 </div>
//                 <div>
//                   <div className="font-medium text-gray-900">{orgName || "Organization"}</div>
//                   <div className="text-sm text-gray-500">Administrator</div>
//                 </div>
//               </div>

//               <button
//                 onClick={handleLogout}
//                 className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
//               >
//                 Logout
//               </button>
            
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Toggle Button */}
//       <button
//         className="fixed top-6 left-6 md:hidden p-3 rounded-xl bg-white text-gray-600 shadow-lg"
//         onClick={toggleSidebar}
//       >
//         <i className="fas fa-bars"></i>
//       </button>

//       {/* Organization Registration Modal */}
//       <OrganizationRegistrationForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
//     </>
//   );
// }

// // Helper Component for Menu Links
// const MenuLink = ({ to, icon, label, isActive }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
//       }`}
//     >
//       <div
//         className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//           isActive ? "bg-blue-100" : "bg-gray-100"
//         }`}
//       >
//         <i className={`${icon} ${isActive ? "text-blue-600" : "text-gray-500"}`}></i>
//       </div>
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// };










// logout button position fiexed:


// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutOrganization } from "../../redux/Organization/auth/organizationAuthSlice";
// import NotificationDropdown from "../Admin/Dropdowns/NotificationDropdown";
// import UserDropdown from "../Admin/Dropdowns/UserDropdown";
// import OrganizationRegistrationForm from "../../views/Organization/auth/OrganizationUserRegistration";
// import toast from "react-hot-toast";

// export default function Sidebar({ sidebarExpanded, setSidebarExpanded }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get orgName from Redux state or localStorage
//   const orgName = useSelector((state) => state.organization.auth.orgName) || localStorage.getItem("orgName");

//   // State for managing menu collapse and active menu
//   const [collapseShow, setCollapseShow] = useState("hidden");
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state

//   // Toggle sidebar expansion
//   const toggleSidebar = () => {
//     setSidebarExpanded(!sidebarExpanded);
//     setCollapseShow("hidden");
//     setActiveMenu(null);
//   };

//   // Toggle menu collapse
//   const toggleMenu = (menuName) => {
//     if (!sidebarExpanded) {
//       setSidebarExpanded(true);
//     }
//     setActiveMenu(activeMenu === menuName ? null : menuName);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logoutOrganization()); // Dispatch logout action
//     toast.success("logout successfully");
//     navigate("/"); // Redirect to home page
//   };

//   // Menu items (conditional rendering based on orgName)
//   const menuItems = {
//     user: [
//       { to: "/profile", icon: "fas fa-user-circle", label: "Profile" },
//       ...(!orgName
//         ? [
//             { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
//             { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
//           ]
//         : []),
//     ],
//     organization: [
//       { to: "/organization/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
//       { to: "/organization/userlist", icon: "fas fa-users", label: "User List" },
//     ],
//   };

//   // Helper function to get section icons
//   const getSectionIcon = (section) => {
//     const icons = {
//       user: "user",
//       organization: "building",
//     };
//     return icons[section] || "circle";
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <nav
//         className={`${
//           sidebarExpanded ? "md:w-64" : "md:w-24"
//         } fixed md:left-0 md:top-0 md:bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-20`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo Section */}
//           <div className="flex items-center justify-between w-full h-20 px-6 border-b border-gray-200">
//             <Link
//               to="/"
//               className={`flex items-center space-x-3 ${!sidebarExpanded && "md:hidden"}`}
//             >
//               <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent">
//                 {orgName || "Organization"}
//               </span>
//             </Link>
//             <button
//               onClick={toggleSidebar}
//               className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
//             >
//               <i className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}></i>
//             </button>
//           </div>

//           {/* Mobile User Actions */}
//           <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
//             <NotificationDropdown />
//             <UserDropdown />
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
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <div
//                       className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//                         activeMenu === section ? "bg-white/20" : "bg-gray-100"
//                       }`}
//                     >
//                       <i
//                         className={`fas fa-${getSectionIcon(section)} ${
//                           activeMenu === section ? "text-gray-800" : "text-gray-500"
//                         }`}
//                       ></i>
//                     </div>
//                     {sidebarExpanded && (
//                       <span className="font-medium capitalize">{section}</span>
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
//           {sidebarExpanded &&  (
//             <div className="mt-auto px-4 py-3">
//               <MenuLink
//                 to="#"
//                 icon="fas fa-sign-out-alt"
//                 label="Logout"
//                 isActive={false}
//                 onClick={handleLogout}
//               />
//             </div>
//           )}

//           {/* User Profile Preview */}
//           {sidebarExpanded && (
//             <div className="p-6 border-t border-gray-100 bg-gray-50">
//               <div className="flex items-center space-x-4">
//                 <div className="relative">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
//                     <i className="fas fa-user text-white"></i>
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                 </div>
//                 <div>
//                   <div className="font-medium text-gray-900">{orgName || "Organization"}</div>
//                   <div className="text-sm text-gray-500">Administrator</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Toggle Button */}
//       <button
//         className="fixed top-6 left-6 md:hidden p-3 rounded-xl bg-white text-gray-600 shadow-lg"
//         onClick={toggleSidebar}
//       >
//         <i className="fas fa-bars"></i>
//       </button>

//       {/* Organization Registration Modal */}
//       <OrganizationRegistrationForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
//     </>
//   );
// }

// // Helper Component for Menu Links
// const MenuLink = ({ to, icon, label, isActive, onClick }) => {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
//       }`}
//     >
//       <div
//         className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//           isActive ? "bg-blue-100" : "bg-gray-100"
//         }`}
//       >
//         <i className={`${icon} ${isActive ? "text-blue-600" : "text-gray-500"}`}></i>
//       </div>
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// };









// new one updated:

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutOrganization } from "../../redux/Organization/auth/organizationAuthSlice";
import NotificationDropdown from "../Admin/Dropdowns/NotificationDropdown";
import UserDropdown from "../Admin/Dropdowns/UserDropdown";
import OrganizationRegistrationForm from "../../views/Organization/auth/OrganizationUserRegistration";
import toast from "react-hot-toast";

export default function Sidebar({ sidebarExpanded, setSidebarExpanded }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get orgName from Redux state or localStorage
  const orgName = useSelector((state) => state.organization.auth.orgName) || localStorage.getItem("orgName");

  // State for managing menu collapse and active menu
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
    setCollapseShow("hidden");
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

  // Menu items (conditional rendering based on orgName)
  const menuItems = {
    // user: [
    //   { to: "/profile", icon: "fas fa-user-circle", label: "Profile" },
    //   ...(!orgName
    //     ? [
    //         { to: "/auth/register", icon: "fas fa-user-plus", label: "Register" },
    //         { to: "/auth/login", icon: "fas fa-sign-in-alt", label: "Login" },
    //       ]
    //     : []),
    // ],
    organization: [
      { to: "/organization/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
      { to: "/organization/userlist", icon: "fas fa-users", label: "User List" },
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
          sidebarExpanded ? "md:w-64" : "md:w-24"
        } fixed md:left-0 md:top-0 md:bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-20`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between w-full h-20 px-6 border-b border-gray-200">
            <Link
              to="/"
              className={`flex items-center space-x-3 ${!sidebarExpanded && "md:hidden"}`}
            >
              <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent">
                {orgName || "Organization"}
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
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
                        activeMenu === section ? "bg-white/20" : "bg-gray-100"
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
          {sidebarExpanded && (
            <div className="mt-auto p-4">
              <LogoutButton onClick={handleLogout} />
            </div>
          )}

          {/* User Profile Preview */}
          {sidebarExpanded && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{orgName || "Organization"}</div>
                  <div className="text-sm text-gray-500">Administrator</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-6 left-6 md:hidden p-3 rounded-xl bg-white text-gray-600 shadow-lg"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Organization Registration Modal */}
      <OrganizationRegistrationForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

// Helper Component for Menu Links
const MenuLink = ({ to, icon, label, isActive, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
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
const LogoutButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <i className="fas fa-sign-out-alt text-gray-500"></i>
      </div>
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
};