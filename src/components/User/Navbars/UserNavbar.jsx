// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CardSettings from "../Cards/CardSettings";

// export default function UserNavbar({ sidebarExpanded }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token from localStorage
//     navigate("/login"); // Redirect to login page
//   };

//   const handleProfile = () => {
//     setIsProfileModalOpen(true); // Open profile modal instead of navigating
//   };

//   return (
//     <nav
//       className="absolute top-0 w-full z-10 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 shadow-lg transition-all duration-300 ease-in-out"
//     >
//       <div className="w-full mx-auto flex items-center justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
//         {/* Brand with Icon */}
//         <div className="flex items-center space-x-2">
//           <i className="fas fa-briefcase text-xl text-gray-700"></i>
//           <span className="text-gray-700 text-lg font-semibold">StockSphere</span>
//         </div>

//         {/* Search Form */}
//         <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
//           <div className="relative flex w-full flex-wrap items-stretch">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search here..."
//               className="border border-gray-200 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pl-10 transition-all duration-200"
//             />
//           </div>
//         </form>

//         {/* Logout Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center space-x-2 text-gray-700 font-semibold focus:outline-none"
//           >
//             <i className="fas fa-user-circle text-2xl"></i>
//           </button>
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
//               <button
//                 onClick={handleProfile}
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       {isProfileModalOpen && (
//         <CardSettings isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
//       )}
//     </nav>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CardSettings from "../Cards/CardSettings";
import logoImage from "../../../assets/img/PGR_logo.jpeg";
import { fetchUserData } from "../../../redux/User/userprofileSlice";
import ChangePasswordModal from "../Cards/ChangePasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { Trophy, X } from 'lucide-react';
import { clearActiveEvent, selectActiveEvent } from "../../../redux/User/events/eventsSlice";
import { toast } from 'react-hot-toast';

export default function UserNavbar({ sidebarExpanded }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user.profile);
  const activeEvent = useSelector(selectActiveEvent);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch user data when sidebar is expanded
  useEffect(() => {
    if (sidebarExpanded) {
      dispatch(fetchUserData());
    }
  }, [sidebarExpanded, dispatch]);

  const userName = userData ? userData.name : "User";
  const userPhoto = userData?.userPhoto || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleChangePassword = () => setIsChangePasswordModalOpen(true);

  const handleClearActiveEvent = () => {
    dispatch(clearActiveEvent());
    toast.success('Event deactivated');
  };

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
    <nav className="sticky top-0 w-full z-50 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 shadow-lg transition-all duration-300 ease-in-out">
      <div className="w-full mx-auto flex items-center justify-between md:flex-nowrap flex-wrap md:px-10 px-4 gap-x-3">
        {/* Brand with Icon */}
        <a
          className={`text-gray-700 text-lg uppercase lg:flex hidden items-center space-x-4 font-bold hover:text-gray-900 transition-colors ${
            sidebarExpanded ? 'ml-0' : 'ml-0'
          } transition-all duration-300`}
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          <img 
            src={logoImage} 
            alt="PGR Logo" 
            className="h-10 w-10 object-contain rounded-full"
          />
          <span className="text-xl">PGR - Virtual Trading App</span>
        </a>

        {/* Active Event Display - Center aligned */}
        <div className="flex-1 flex justify-center">
          {activeEvent && (
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full text-sm text-blue-800 shadow-sm max-w-md mx-4">
              <Trophy className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{activeEvent.title}</span>
              <button 
                onClick={handleClearActiveEvent}
                className="ml-2 p-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Right side elements */}
        <div className="flex items-center space-x-4">
          {/* Search Form - Hidden on smaller screens */}
          <form className="hidden md:flex flex-row flex-wrap items-center">
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

          {/* User Name */}
          <div className="bg-lightBlue-600 text-white px-4 py-1 rounded-lg hover:bg-lightBlue-400 hover:text-gray-100 transition-all hidden sm:block">
            <p title="username" className="text-sm sm:text-base truncate max-w-xs">{userName}</p>
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 font-semibold focus:outline-none"
            >
              <img
                src={userPhoto}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-all"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                <button 
                  onClick={handleChangePassword} 
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center border-t border-gray-100"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <CardSettings 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      )}

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal 
          isOpen={isChangePasswordModalOpen} 
          onClose={() => setIsChangePasswordModalOpen(false)} 
        />
      )}
    </nav>
  );
}