import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";
import logoImage from "../../../assets/img/PGR_logo.jpeg";

export default function AdminNavbar({ sidebarExpanded }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
      <div className="w-full mx-auto flex items-center justify-between p-4 md:px-10 px-4">
        {/* Brand with Logo - Adjust margin based on sidebar state */}
        <a
          className={`text-gray-700 text-lg uppercase lg:flex hidden items-center space-x-4 font-bold hover:text-gray-900 transition-colors ${
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
          <span className="text-xl">PGR VirtualTrading App</span>
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
            <input
              type="text"
              placeholder="Search here..."
              className="border border-gray-200 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pl-10 transition-all duration-200"
            />
          </div>
        </form>

        {/* User */}
        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
          <UserDropdown />
        </ul>
      </div>
    </nav>
  );
}