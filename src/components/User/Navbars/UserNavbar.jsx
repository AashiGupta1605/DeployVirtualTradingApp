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
import React, { useState, useEffect, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import CardSettings from "../Cards/CardSettings";
import logoImage from "../../../assets/img/PGR_logo.jpeg";
import { fetchUserData, updateUserProfile, deleteUserProfile } from "../../../redux/User/userprofileSlice";
import ConfirmationModal from "../Cards/ConfirmationModal";


import ChangePasswordModal from "../Cards/ChangePasswordModal"; // Import Change Password Modal


import { useDispatch, useSelector } from "react-redux";

export default function UserNavbar({ sidebarExpanded }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user.profile);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false); // State for change password modal
  const navigate = useNavigate(); // Hook for navigation
  const dropdownRef = useRef(null);

 // Fetch user data when sidebar is expanded
  React.useEffect(() => {
    if (sidebarExpanded) {
      dispatch(fetchUserData()); // Fetch user profile when sidebar opens
    }
  }, [sidebarExpanded, dispatch]);


  const userName = userData ? userData.name : "User";
  const userPhoto = userData?.userPhoto || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"; // Default image

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true); // Open profile modal
  };

  const handleChangePassword = () => setIsChangePasswordModalOpen(true); // Open password change modal

 // Close dropdown when clicking outside
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
    <nav className="sticky top-0 w-full z-5 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 shadow-lg transition-all duration-300 ease-in-out">
      <div className="w-full mx-auto flex items-center justify-between md:flex-nowrap flex-wrap md:px-10 px-4 gap-x-3">
        {/* Brand with Icon */}
        <a
          className={`text-gray-700 text-lg uppercase lg:flex hidden items-center space-x-4 font-bold hover:text-gray-900 transition-colors ${
            sidebarExpanded ? 'ml-0' : 'ml-0'  // Adjust these values based on your sidebar width
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

        {/* Search Form */}
        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
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
        <div className="bg-lightBlue-600 text-white px-4 py-1 rounded-lg hover:bg-lightBlue-400 hover:text-gray-100 transition-all">
          <p title="username" className="text-lg">{userName}</p>
        </div>


        {/* Logout Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 font-semibold focus:outline-none"
          >
            <img
              src={userPhoto}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover cursor-pointer"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={handleProfile}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              {/* <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button> */}
               <button onClick={handleChangePassword} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <CardSettings isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      )}

{isChangePasswordModalOpen && <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} />}
    </nav>
  );
}