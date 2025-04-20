import UserDropdown from "../Dropdowns/UserDropdown";
import logoImage from "../../../assets/img/PGR_logo.jpeg";
import React, { useState } from "react";

export default function AdminNavbar({ sidebarExpanded }) {
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // const handleProfile = () => {
  //   setIsProfileModalOpen(true); // Open profile modal instead of navigating
  // };

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  console.log(user.name);
  

  

  return (
    <nav className="fixed z-40 top-0 left-0 right-0 z-10 bg-white shadow-lg">
      <div className="w-full mx-auto flex items-center justify-between p-4 md:px-10 px-4">
        {/* Brand with Logo - Adjust margin based on sidebar state */}
        <a
          className={`text-gray-700 text-lg lg:flex hidden items-center space-x-4 font-bold hover:text-gray-900 transition-colors ${
            sidebarExpanded ? 'ml-64' : 'ml-20'  // Adjust these values based on your sidebar width
          } transition-all duration-300`}
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          <img 
            src={logoImage} 
            alt="PGR Logo" 
            className="h-10 w-10 object-contain rounded-full"
          />
          <span className="text-xl font-bold text-gray-900">PGR - Virtual Trading App</span>
        </a>

        {/* Form */}
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
            {/* <input
              type="text"
              placeholder="Search here..."
              className="border border-gray-200 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pl-10 transition-all duration-200"
            /> */}
            <div className="relative w-[270px]">
              {/* Search Icon */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="search"
                className="absolute left-3 top-1/4 transform -translate-y-1/2 w-4 h-4"
              />
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-400 pl-10 pr-2 py-2 rounded-lg w-full h-[36px] focus:outline-none focus:shadow-md focus:border-black"
              />
            </div>
          </div>
        </form>

        <div className="bg-lightBlue-600 text-white px-4 py-1 rounded-lg hover:bg-lightBlue-400 hover:text-gray-100 transition-all mx-4">
          <p title="username" className="text-lg">{user.name}</p>
        </div>

        {/* Logout Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 font-semibold focus:outline-none"
          >
            <i className="fas fa-user-circle text-2xl"></i>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                // onClick={handleProfile}
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}