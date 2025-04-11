// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import NotificationDropdown from "../Dropdowns/NotificationDropdown";
// import DashboardDropdown from "../Dropdowns/DashboardDropdown";
// import toast from "react-hot-toast";
// import Modal from  "../Modals/tradingModal"
// import { useDispatch, useSelector } from "react-redux";

// export default function UserSidebar({ sidebarExpanded, setSidebarExpanded }) {
//   const [collapseShow, setCollapseShow] = React.useState("hidden");
//   const [activeMenu, setActiveMenu] = React.useState(null);
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user.profile);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const userName = userData ? userData.name : "User";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logout Successfully");
//     navigate("/login");
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

//   const menuItems = [
//     { to: "/user/niftytable", icon: "fas fa-table", label: "Nifty 50 Table" },
//     { to: "/user/etftable", icon: "fas fa-list", label: "ETF Table" },
  
//   ];
  

//   return (
//     <>
//       <nav
//         className={`${
//           sidebarExpanded ? "md:w-64" : "md:w-20"
//         } fixed left-0 top-0 bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-0`}
//       >
//         <div className="flex flex-col h-full pb-0">
//           {/* Sidebar Header */}
//           <div className="flex items-center justify-between w-full h-[71px] px-6 border-b border-gray-200">
//             <Link
//               to="/user/dashboard"
//               className={`flex items-center space-x-3 text-black ${
//                 !sidebarExpanded && "md:hidden"
//               }`}
//             >
//               <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent capitalize">
//                 {userName}
//               </span>
//             </Link>
//             <button
//               onClick={toggleSidebar}
//               className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
//             >
//               <i
//                 className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}
//               ></i>
//             </button>
//           </div>

//           {/* Mobile Dropdowns */}
//           <div className="md:hidden flex items-center space-x-4 px-4 py-4 bg-gray-50">
//             <NotificationDropdown />
//             <DashboardDropdown />
//           </div>

//           {/* Sidebar Menu */}
//           <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            
//   {/* Nifty Table Dropdown */}
//   <div className="space-y-4">
//     <button
//       onClick={() => toggleMenu("nifty")}
//       className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//         activeMenu === "nifty" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
//       }`}
//     >
//       <div className="flex items-center space-x-2">
//         <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "nifty" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
//           <i className="fas fa-chart-line text-gray-500"></i>
//         </div>
//         {sidebarExpanded && <span className="font-medium capitalize">Nifty 50 Table</span>}
//       </div>
//       {sidebarExpanded && (
//         <i className={`fas fa-chevron-${activeMenu === "nifty" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
        
//       )}
      
//     </button>

//     {sidebarExpanded && activeMenu === "nifty" && (
//     <div className="pl-4 space-y-2">
//       {/* Nifty Table Option */}
//       <MenuLink to="/user/niftytable" icon="fas fa-table" label="Nifty Table" isActive={location.pathname === "/user/niftytable"} />
      
//       {/* Trading Option inside Nifty Table */}
//       <MenuLink to="/user/tradingnifty" icon="fas fa-exchange-alt" label="Trading" isActive={location.pathname === "/user/tradingnifty"} />
//     </div>
//   )}
//   </div>

//   {/* ETF Table Dropdown */}
//   <div className="space-y-4">
//     <button
//       onClick={() => toggleMenu("etf")}
//       className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//         activeMenu === "etf" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
//       }`}
//     >
//       <div className="flex items-center space-x-2">
//         <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "etf" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200 "}`}>
//           <i className="fas fa-chart-bar text-gray-500"></i>
//         </div>
//         {sidebarExpanded && <span className="font-medium capitalize">ETF Table</span>}
//       </div>
//       {sidebarExpanded && (
//         <i className={`fas fa-chevron-${activeMenu === "etf" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
//       )}
//     </button>

//     {sidebarExpanded && activeMenu === "etf" && (
//       <div className="pl-4 space-y-2">
//         <MenuLink to="/user/etftable" icon="fas fa-table" label="ETF Table" isActive={location.pathname === "/user/etftable"} />
//       </div>
//     )}
//   </div>

//   <div className="space-y-4">
//   <Link
//     to="/user/feedback"
//     onClick={() => toggleMenu("feedback")}
//     className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
//       activeMenu === "feedback" ? "bg-lightBlue-600 text-white" : "text-gray-600"
//     }`}
//   >
//     <div
//       className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//         activeMenu === "feedback" ? "bg-lightBlue-500 text-white" : "hover:bg-gray-200"
//       }`}
//     >
//       <i className={`fas fa-comment ${activeMenu === "feedback" ? "text-white" : "text-gray-500"}`}></i>
//     </div>
//     {sidebarExpanded && <span className="font-medium">Feedback</span>}
//   </Link>
// </div>

// </div>

          
//           {/* Logout */}
//           <div className="p-4">
//           <button 
//             onClick={handleLogout}
//             className={`w-full flex items-center justify-center text-red-500 hover:text-red-700 transition-colors rounded-lg p-3
//               ${sidebarExpanded ? "bg-red-50 hover:bg-red-100 space-x-2" : "hover:bg-red-50"}`}
//           >
//             <i className="fas fa-sign-out-alt"></i>
//             {sidebarExpanded && <span>Logout</span>}
//           </button>
//         </div>

// <div className={`border-t bg-gray-50 p-4 flex items-center ${sidebarExpanded ? "justify-between" : "justify-center"}`}>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-xl bg-lightBlue-600 flex items-center justify-center shadow-lg">
//                 <i className="fas fa-user text-white"></i>
//               </div>
//               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//             {sidebarExpanded && (
//               <div>
//                 <div className="font-medium">{userName}</div>
//                 <div className="text-sm">User</div>
//               </div>
//             )}
//           </div>
//         </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// const MenuLink = ({ to, icon, label, isActive }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
//       }`}
//     >
//       <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isActive ? "bg-blue-100" : "bg-gray-100"}`}>
//         <i className={`${icon} ${isActive ? "text-blue-600" : "text-gray-500"}`}></i>
//       </div>
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// };

// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { fetchUserData } from "../../../redux/User/userprofileSlice";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";

// export default function UserSidebar({ sidebarExpanded, setSidebarExpanded }) {
//   const [activeMenu, setActiveMenu] = React.useState(null);
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user.profile);
//   const location = useLocation();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   const userName = userData ? userData.name : "User";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logout Successfully");
//     navigate("/");
//   };

//   const toggleSidebar = () => {
//     setSidebarExpanded(!sidebarExpanded);
//     setActiveMenu(null);
//   };

//   const toggleMenu = (menuName) => {
//     if (!sidebarExpanded) {
//       setSidebarExpanded(true);
//     }
//     setActiveMenu(activeMenu === menuName ? null : menuName);
//   };

//   return (
//     <nav
//       className={`${
//         sidebarExpanded ? "md:w-64" : "md:w-20"
//       } fixed left-0 top-0 bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-0`}
//     >
//       <div className="flex flex-col h-full pb-0">
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between w-full h-[73px] px-6 border-b border-gray-200">
//           <Link
//             to="/user/dashboard"
//             className={`flex items-center space-x-3 text-black ${
//               !sidebarExpanded && "md:hidden"
//             }`}
//           >
//             <span className="text-lg font-semibold bg-gray-800 bg-clip-text text-transparent capitalize">
//               {userName}
//             </span>
//           </Link>
//           <button
//             onClick={toggleSidebar}
//             className="p-1 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-0 ml-auto"
//           >
//             <i
//               className={`fas fa-${sidebarExpanded ? "times" : "bars"} text-gray-400 text-base`}
//             ></i>
//           </button>
//         </div>

//         {/* Sidebar Menu */}

//         {/* <div className="flex-1 overflow-y-auto px-4 py-1 space-y-0"> */}
//         <div className={`${sidebarExpanded ? "px-3" : "px-6"} flex-1 overflow-y-auto py-1 space-y-0`}>
      
//           <Link
//             to="/user/dashboard"
//             className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
//               location.pathname === "/user/dashboard" ? "bg-lightBlue-600 text-white" : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//               location.pathname === "/user/dashboard" ? "bg-white/20" : "bg-lightBlue-100"
//             }`}>
//               <i className={`fas fa-home ${location.pathname === "/user/dashboard" ? "text-white" : "text-gray-500"}`}></i>
//             </div>
//             {sidebarExpanded && <span className="font-medium">Dashboard</span>}
//           </Link>

//           {/* Tables Dropdown */}
//           <div className="space-y-4">
//             <button
//               onClick={() => toggleMenu("tables")}

//               className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
//                 activeMenu === "tables" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"

//        //       className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//          //       activeMenu === "tables" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"

//               }`}
//             >
//               <div className="flex items-center space-x-2">
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
//                   activeMenu === "tables" ? "bg-white/20" : "bg-lightBlue-100"
//                 }`}>
//                   <i className="fas fa-table text-gray-500"></i>
//                 </div>
//                 {sidebarExpanded && <span className="font-medium capitalize">Tables</span>}
//               </div>
//               {sidebarExpanded && (
//                 <i className={`fas fa-chevron-${activeMenu === "tables" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
//               )}
//             </button>

//             {sidebarExpanded && activeMenu === "tables" && (
//               <div className="pl-4 space-y-1">
//                 <MenuLink 
//                   to="/user/niftytable" 
//                   icon="fas fa-chart-line" 
//                   label="Nifty 50 Table" 
//                   isActive={location.pathname === "/user/niftytable"} 
//                 />
//                 <MenuLink 
//                   to="/user/etftable" 
//                   icon="fas fa-table" 
//                   label="ETF Table" 
//                   isActive={location.pathname === "/user/etftable"} 
//                 />
//                 <MenuLink 
//                   to="/user/nifty500table" 
//                   icon="fas fa-chart-bar" 
//                   label="Nifty 500 Table" 
//                   isActive={location.pathname === "/user/nifty500table"} 
//                 />
//               </div>
//             )}
//           </div>

//           {/* My Portfolio Dropdown */}
//           <div className="space-y-1">
//             <button
//               onClick={() => toggleMenu("portfolio")}

//               className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
//                 activeMenu === "portfolio" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"

//            //   className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//              //   activeMenu === "portfolio" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"

//               }`}
//             >
//               <div className="flex items-center space-x-2">
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
//                   activeMenu === "portfolio" ? "bg-white/20" : "bg-lightBlue-100"
//                 }`}>
//                   <i className="fas fa-briefcase text-gray-500"></i>
//                 </div>
//                 {sidebarExpanded && <span className="font-medium capitalize">My Portfolio</span>}
//               </div>
//               {sidebarExpanded && (
//                 <i className={`fas fa-chevron-${activeMenu === "portfolio" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
//               )}
//             </button>

//             {sidebarExpanded && activeMenu === "portfolio" && (

//               <div className="pl-4 space-y-1">
//  <MenuLink to="/user/tradingnifty" icon="fas fa-exchange-alt" label="Trading" isActive={location.pathname === "/user/tradingnifty"} />
//                 { /* <MenuLink 
//                   to="/user/holdings" 
//                   icon="fas fa-chart-area" 
//                   label="Holdings" 
//                   isActive={location.pathname === "/user/holdings"} 
//                 /> */
//               <div className="pl-4 space-y-2">
//                 <MenuLink 
//                   to="/user/tradingnifty" 
//                   icon="fas fa-exchange-alt" 
//                   label="Trading" 
//                   isActive={location.pathname === "/user/tradingnifty"} 
//                 />
//               </div>
//             )}
//           </div>

//           {/* Events Dropdown */}
//           <div className="space-y-4">
//             <button
//               onClick={() => toggleMenu("events")}
//               className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//                 activeMenu === "events" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               <div className="flex items-center space-x-2">
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
//                   activeMenu === "events" ? "bg-white/20" : "bg-lightBlue-100"
//                 }`}>
//                   <i className="fas fa-calendar-alt text-gray-500"></i>
//                 </div>
//                 {sidebarExpanded && <span className="font-medium capitalize">Events</span>}
//               </div>
//               {sidebarExpanded && (
//                 <i className={`fas fa-chevron-${activeMenu === "events" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
//               )}
//             </button>

//             {sidebarExpanded && activeMenu === "events" && (
//               <div className="pl-4 space-y-2">
//                 <MenuLink 
//                   to="/user/eventspage" 
//                   icon="fas fa-search" 
//                   label="Explore Events" 
//                   isActive={location.pathname === "/user/eventspage"} 
//                 />
//                 <MenuLink 
//                   to="/user/my-events" 
//                   icon="fas fa-ticket-alt" 
//                   label="My Events" 
//                   isActive={location.pathname === "/user/my-events"} 
//                 />

//               </div>
//             )}
//           </div>


//           {/* Feedback Dropdown */}
//          {/* <div className="space-y-1">
//             <Link
//               to="/user/feedback"
//               onClick={() => toggleMenu("feedback")}
//               className={`w-full flex items-center space-x-3 p-1 rounded-lg transition-all duration-200 ${
//                 activeMenu === "feedback" ? "bg-lightBlue-600 text-white" : "text-gray-600"

//           {/* Feedback Link */}
//           <div className="space-y-4">
//             <Link
//               to="/user/feedback"
//               className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
//                 location.pathname === "/user/feedback" ? "bg-lightBlue-600 text-white" : "text-gray-600 hover:bg-gray-100"

//               }`}
//             >
//               <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//                 location.pathname === "/user/feedback" ? "bg-white/20" : "bg-lightBlue-100"
//               }`}>
//                 <i className={`fas fa-comment ${location.pathname === "/user/feedback" ? "text-white" : "text-gray-500"}`}></i>
//               </div>
//               {sidebarExpanded && <span className="font-medium">Feedback</span>}
//             </Link>

//           </div> */}

//           {/* Events Dropdown */}
// {/* <div className="space-y-1">
//   <Link
//     to="/user/eventspage"
//     onClick={() => toggleMenu("events")}
//     className={`w-full flex items-center space-x-3 p-1 rounded-lg transition-all duration-200 ${
//       activeMenu === "events" ? "bg-lightBlue-600 text-white" : "text-gray-600"
//     }`}
//   >
//     <div
//       className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//         activeMenu === "events" ? "bg-lightBlue-500 text-white" : "hover:bg-gray-200"
//       }`}
//     >
//       <i className={`fas fa-calendar-alt ${activeMenu === "events" ? "text-white" : "text-gray-500"}`}></i>
//     </div>
//     {sidebarExpanded && <span className="font-medium">Events</span>}
//   </Link>
// </div> */}





// {/* updateed code -- */}
//           {/* Feedback Dropdown */}
//           <div className="space-y-1">
//             <button
//               onClick={() => toggleMenu("feedback")}
//               className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
//                 activeMenu === "feedback" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
//               }`}
//             >
//               <div className="flex items-center space-x-2">
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "feedback" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
//                   <i className="fas fa-comment text-gray-500"></i>
//                 </div>
//                 {sidebarExpanded && <span className="font-medium capitalize">Feedback</span>}
//               </div>
//               {sidebarExpanded && (
//                 <i className={`fas fa-chevron-${activeMenu === "feedback" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
//               )}
//             </button>

//             {sidebarExpanded && activeMenu === "feedback" && (
//               <div className="pl-4 space-y-1">
//                 <MenuLink 
//                   to="/user/feedback" 
//                   icon="fas fa-comment-dots" 
//                   label="Submit Feedback" 
//                   isActive={location.pathname === "/user/feedback"} 
//                 />
//                 {/* <MenuLink 
//                   to="/user/feedback-history" 
//                   icon="fas fa-history" 
//                   label="Feedback History" 
//                   isActive={location.pathname === "/user/feedback-history"} 
//                 /> */}
//               </div>
//             )}
//           </div>

//           {/* Events Dropdown */}
//           <div className="space-y-1">
//             <button
//               onClick={() => toggleMenu("events")}
//               className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
//                 activeMenu === "events" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
//               }`}
//             >
//               <div className="flex items-center space-x-2">
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "events" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
//                   <i className="fas fa-calendar-alt text-gray-500"></i>
//                 </div>
//                 {sidebarExpanded && <span className="font-medium capitalize">Events</span>}
//               </div>
//               {sidebarExpanded && (
//                 <i className={`fas fa-chevron-${activeMenu === "events" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
//               )}
//             </button>

//             {sidebarExpanded && activeMenu === "events" && (
//               <div className="pl-4 space-y-1">
//                 <MenuLink 
//                   to="/user/eventspage" 
//                   icon="fas fa-calendar-check" 
//                   label="View Events" 
//                   isActive={location.pathname === "/user/eventspage"} 
//                 />
//                 {/* <MenuLink 
//                   to="/user/past-events" 
//                   icon="fas fa-calendar-minus" 
//                   label="Past Events" 
//                   isActive={location.pathname === "/user/past-events"} 
//                 /> */}
//               </div>
//             )}

//           </div>
//         </div>

//         {/* Logout and User Info */}
//         <div className="p-4">
//           <button 
//             onClick={handleLogout}
//             className={`w-full flex items-center justify-center text-red-500 hover:text-red-700 transition-colors rounded-lg p-3
//               ${sidebarExpanded ? "bg-red-50 hover:bg-red-100 space-x-2" : "hover:bg-red-50"}`}
//           >
//             <i className="fas fa-sign-out-alt"></i>
//             {sidebarExpanded && <span>Logout</span>}
//           </button>
//         </div>

//         <div className={`border-t bg-gray-50 p-4 flex items-center ${sidebarExpanded ? "justify-between" : "justify-center"}`}>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-xl bg-lightBlue-600 flex items-center justify-center shadow-lg">
//                 <i className="fas fa-user text-white"></i>
//               </div>
//               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//             {sidebarExpanded && (
//               <div>
//                 <div className="font-medium">{userName}</div>
//                 <div className="text-sm">User</div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// const MenuLink = ({ to, icon, label, isActive }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center space-x-3 px-4 py-1 rounded-xl transition-all duration-200 ${
//         isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
//       }`}
//     >
//       <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isActive ? "bg-blue-100" : "bg-gray-100"}`}>
//         <i className={`${icon} ${isActive ? "text-blue-600" : "text-gray-500"}`}></i>
//       </div>
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// };

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import DashboardDropdown from "../Dropdowns/DashboardDropdown";
import { fetchUserData, updateUserProfile, deleteUserProfile } from "../../../redux/User/userprofileSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function UserSidebar({ sidebarExpanded, setSidebarExpanded }) {
  const [activeMenu, setActiveMenu] = React.useState(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user.profile);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user data when sidebar is expanded
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

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
    setActiveMenu(null);
  };

  const toggleMenu = (menuName) => {
    if (!sidebarExpanded) {
      setSidebarExpanded(true);
    }
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <nav
      className={`${
        sidebarExpanded ? "md:w-64" : "md:w-20"
      } fixed left-0 top-0 bottom-0 bg-white shadow-xl transition-all duration-300 ease-in-out z-0`}
    >
      <div className="flex flex-col h-full pb-0">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between w-full h-[73px] px-6 border-b border-gray-200">
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

        {/* Sidebar Menu */}
        {/* <div className="flex-1 overflow-y-auto px-4 py-1 space-y-0"> */}
        <div className={`${sidebarExpanded ? "px-3" : "px-6"} flex-1 overflow-y-auto py-1 space-y-0`}>


{/* Dashboard Dropdown - matches other menu items */}
<div className="space-y-1">
  <button
    onClick={() => toggleMenu("dashboard")}
    className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
      activeMenu === "dashboard" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
    }`}
  >
    <div className="flex items-center space-x-2">
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "dashboard" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
        <i className="fas fa-tachometer-alt text-gray-500"></i>
      </div>
      {sidebarExpanded && <span className="font-medium capitalize">Dashboard</span>}
    </div>
    {sidebarExpanded && (
      <i className={`fas fa-chevron-${activeMenu === "dashboard" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
    )}
  </button>

  {sidebarExpanded && activeMenu === "dashboard" && (
    <div className="pl-4 space-y-1">
      <MenuLink 
        to="/user/dashboard" 
        icon="fas fa-tachometer-alt" 
        label="Dashboard" 
        isActive={location.pathname === "/user/dashboard"} 
      />
    </div>
  )}
</div>

          {/* Tables Dropdown */}
          <div className="space-y-4">
            <button
              onClick={() => toggleMenu("tables")}
              className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
                activeMenu === "tables" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "tables" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
                  <i className="fas fa-table text-gray-500"></i>
                </div>
                {sidebarExpanded && <span className="font-medium capitalize">Tables</span>}
              </div>
              {sidebarExpanded && (
                <i className={`fas fa-chevron-${activeMenu === "tables" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
              )}
            </button>
{sidebarExpanded && activeMenu === "tables" && (
              <div className="pl-4 space-y-1">
                <MenuLink 
                  to="/user/niftytable" 
                  icon="fas fa-chart-line" 
                  label="Nifty 50 Table" 
                  isActive={location.pathname === "/user/niftytable"} 
                />
                
<MenuLink to="/user/etftable" icon="fas fa-table" label="ETF Table" isActive={location.pathname === "/user/etftable"} />

                <MenuLink 
                  to="/user/nifty500table" 
                  icon="fas fa-chart-bar" 
                  label="Nifty 500 Table" 
                  isActive={location.pathname === "/user/nifty500table"} 
                />
              </div>
            )}
          </div>

          {/* My Portfolio Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("portfolio")}
              className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
                activeMenu === "portfolio" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "portfolio" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
                  <i className="fas fa-briefcase text-gray-500"></i>
                </div>
                {sidebarExpanded && <span className="font-medium capitalize">My Portfolio</span>}
              </div>
              {sidebarExpanded && (
                <i className={`fas fa-chevron-${activeMenu === "portfolio" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
              )}
            </button>

            {sidebarExpanded && activeMenu === "portfolio" && (
              <div className="pl-4 space-y-1">
 <MenuLink to="/user/tradingnifty" icon="fas fa-exchange-alt" label="Trading" isActive={location.pathname === "/user/tradingnifty"} />
                {/* <MenuLink 
                  to="/user/holdings" 
                  icon="fas fa-chart-area" 
                  label="Holdings" 
                  isActive={location.pathname === "/user/holdings"} 
                /> */}
              </div>
            )}
          </div>

          {/* Feedback Dropdown */}
         {/* <div className="space-y-1">
            <Link
              to="/user/feedback"
              onClick={() => toggleMenu("feedback")}
              className={`w-full flex items-center space-x-3 p-1 rounded-lg transition-all duration-200 ${
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
          </div> */}

          {/* Events Dropdown */}
{/* <div className="space-y-1">
  <Link
    to="/user/eventspage"
    onClick={() => toggleMenu("events")}
    className={`w-full flex items-center space-x-3 p-1 rounded-lg transition-all duration-200 ${
      activeMenu === "events" ? "bg-lightBlue-600 text-white" : "text-gray-600"
    }`}
  >
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-lg ${
        activeMenu === "events" ? "bg-lightBlue-500 text-white" : "hover:bg-gray-200"
      }`}
    >
      <i className={`fas fa-calendar-alt ${activeMenu === "events" ? "text-white" : "text-gray-500"}`}></i>
    </div>
    {sidebarExpanded && <span className="font-medium">Events</span>}
  </Link>
</div> */}
{/* updateed code -- */}
          {/* Feedback Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("feedback")}
              className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
                activeMenu === "feedback" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "feedback" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
                  <i className="fas fa-comment text-gray-500"></i>
                </div>
                {sidebarExpanded && <span className="font-medium capitalize">Feedback</span>}
              </div>
              {sidebarExpanded && (
                <i className={`fas fa-chevron-${activeMenu === "feedback" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
              )}
            </button>

            {sidebarExpanded && activeMenu === "feedback" && (
              <div className="pl-4 space-y-1">
                <MenuLink 
                  to="/user/feedback" 
                  icon="fas fa-comment-dots" 
                  label="Submit Feedback" 
                  isActive={location.pathname === "/user/feedback"} 
                />
                {/* <MenuLink 
                  to="/user/feedback-history" 
                  icon="fas fa-history" 
                  label="Feedback History" 
                  isActive={location.pathname === "/user/feedback-history"} 
                /> */}
              </div>
            )}
          </div>
          {/* Complaint Dropdown */}
               <div className="space-y-1">
                <button
                 onClick={() => toggleMenu("complaint")}
                 className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
                 activeMenu === "complaint" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
             }`}
         >
        <div className="flex items-center space-x-2">
         <div
           className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
            activeMenu === "complaint"
             ? "bg-white/20"
             : "bg-lightBlue-100 hover:bg-gray-200"
           }`}
        >
          <i className="fas fa-exclamation-circle text-gray-500"></i>
          </div>
          {sidebarExpanded && (
          <span className="font-medium capitalize">Complaint</span>
           )}
        </div>
         {sidebarExpanded && (
      <i
        className={`fas fa-chevron-${
          activeMenu === "complaint" ? "down" : "right"
        } transition-transform duration-200 text-sm`}
      ></i>
    )}
  </button>

      {sidebarExpanded && activeMenu === "complaint" && (
        <div className="pl-4 space-y-1">
          <MenuLink
           to="/user/complaint"
           icon="fas fa-exclamation-triangle"
           label="Submit Complaint"
           isActive={location.pathname === "/user/complaint"}
        />
      {/* <MenuLink
        to="/user/complaint-history"
        icon="fas fa-history"
        label="Complaint History"
        isActive={location.pathname === "/user/complaint-history"}
      /> */}
        </div>
      )}
     </div>
                
          

          {/* Events Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("events")}
              className={`w-full flex items-center justify-between p-1 rounded-lg transition-all duration-200 ${
                activeMenu === "events" ? "bg-lightBlue-600 text-white shadow-lg" : "text-gray-600"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${activeMenu === "events" ? "bg-white/20" : "bg-lightBlue-100 hover:bg-gray-200"}`}>
                  <i className="fas fa-calendar-alt text-gray-500"></i>
                </div>
                {sidebarExpanded && <span className="font-medium capitalize">Events</span>}
              </div>
              {sidebarExpanded && (
                <i className={`fas fa-chevron-${activeMenu === "events" ? "down" : "right"} transition-transform duration-200 text-sm`}></i>
              )}
            </button>

            {sidebarExpanded && activeMenu === "events" && (
              <div className="pl-4 space-y-1">
                <MenuLink 
                  to="/user/eventspage" 
                  icon="fas fa-calendar-check" 
                  label="View Events" 
                  isActive={location.pathname === "/user/eventspage"} 
                />
                <MenuLink 
                  to="/user/my-events" 
                  icon="fas fa-calendar-minus" 
                  label="My Events" 
                  isActive={location.pathname === "/user/my-events"} 
                />
              </div>
            )}
          </div>
        </div>


        {/* Logout and User Info */}
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
                <div className="font-medium">{userName}</div>
                <div className="text-sm">User</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const MenuLink = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-1 rounded-xl transition-all duration-200 ${
        isActive ? "bg-blue-50 text-lightBlue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isActive ? "bg-blue-100" : "bg-gray-100"}`}>
        <i className={`${icon} ${isActive ? "text-lightBlue-600" : "text-gray-500"}`}></i>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};