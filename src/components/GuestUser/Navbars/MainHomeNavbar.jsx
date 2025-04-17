import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutOrganization } from "../../../redux/Organization/auth/organizationAuthSlice";
import { LogIn, ChevronDown, Menu, X } from "lucide-react";
import BookDemoBGModal from "../BookDemo/BookDemoBGModal";
import UnifiedLoginModal from "../../../views/auth/UnifiedLoginModal";
import UnifiedRegisterModal from "../../../views/auth/UnifiedRegistrationModal";
import { FaWhatsapp } from "react-icons/fa";

const MobileMenu = ({
  isOpen,
  isAuthenticated,
  orgName,
  handleNavigation,
  handleOpenLogin,
  handleOpenRegister,
  isActive,
  isActivePrefix
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40">
      <div className="pt-2 pb-4 space-y-1">
        <button
          onClick={() => handleNavigation("/")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActive("/") 
              ? "bg-lightBlue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => handleNavigation("/about")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActive("/about") 
              ? "bg-lightBlue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
          }`}
        >
          About
        </button>

        <button
          onClick={() => handleNavigation("/contact")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActive("/contact") 
              ? "bg-lightBlue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
          }`}
        >
          Contact
        </button>

        <button
          onClick={() => handleNavigation("/services")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActive("/services") 
              ? "bg-lightBlue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
          }`}
        >
          Services
        </button>

        <button
          onClick={() => handleNavigation("/nifty50")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActivePrefix("/nifty50") 
              ? "bg-blue-50 text-lightBlue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Nifty50 Data
        </button>
        <button
          onClick={() => handleNavigation("/etf")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActivePrefix("/etf") 
              ? "bg-blue-50 text-lightBlue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          ETF Data
        </button>

        <button
          onClick={() => handleNavigation("/pricing")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActive("/pricing") 
              ? "bg-lightBlue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
          }`}
        >
          Pricing
        </button>

        <button
          onClick={() => handleNavigation("/gallery")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActive("/gallery") 
              ? "bg-lightBlue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
          }`}
        >
          Gallery
        </button>

        <button
          onClick={() => handleNavigation("/event")}
          className={`block w-full text-left px-5 py-3 text-base font-medium ${
            isActive("/event") 
              ? "bg-lightBlue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
          }`}
        >
          Events
        </button>

        {isAuthenticated ? (
          <div className="px-5 pt-2">
            <button
              onClick={() => handleNavigation("/organization")}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700"
            >
              <LogIn className="mr-2 h-5 w-5" />
              {orgName}
            </button>
          </div>
        ) : (
          <div className="px-5 pt-2 space-y-3">
            <button
              onClick={handleOpenLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={handleOpenRegister}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Register
            </button>
            <a
              href="https://chat.whatsapp.com/GCNCQb6Ul4l5FRwlT5y3Tb"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600"
            >
              <FaWhatsapp className="mr-2 h-5 w-5" />
              Join WhatsApp Group
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const MainHomeNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isBookDemoBGModal, setIsBookDemoBGModal] = useState(false);

  const openBookDemoBGModal = () => setIsBookDemoBGModal(true);
  const closeBookDemoBGModal = () => setIsBookDemoBGModal(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get organization authentication state from Redux
  const { orgName } = useSelector((state) => state.organization.auth);
  const isAuthenticated = !!orgName;

  const handleLogout = () => {
    dispatch(logoutOrganization());
    navigate("/");
  };

  const handleNavigation = (path) => {
    setNavbarOpen(false);
    navigate(path);
  };

  const handleOpenRegister = () => {
    setNavbarOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleOpenLogin = () => {
    setNavbarOpen(false);
    setIsLoginModalOpen(true);
  };

  const isActive = (path) => location.pathname === path;
  const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-8xl ml-4 mr-4">
          <div className="flex justify-between h-16 items-center">
            {/* Left Side - Logo & App Name */}
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => handleNavigation("/")}
              >
                <img
                  src="https://media.licdn.com/dms/image/v2/C510BAQE1pPlwgZETKw/company-logo_200_200/company-logo_200_200/0/1630605647519/praedico_global_research_pvt_ltd_logo?e=2147483647&v=beta&t=8hAhEoZ7nj9gKxuh6iA-q10402A-rxdAP4GeUOAnFdQ"
                  alt="PGR Logo"
                  className="h-10 w-auto"
                />
                <span className="ml-3 text-lg font-bold text-gray-900 hidden sm:block whitespace-nowrap">
                  PGR - VIRTUAL TRADING APP
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {/* Nav items start */}
              <div className="flex space-x-1 mr-6">
                <button
                  onClick={() => handleNavigation("/")}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive("/") 
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => handleNavigation("/about")}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive("/about") 
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  About
                </button>

                <button
                  onClick={() => handleNavigation("/contact")}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive("/contact") 
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Contact
                </button>

                <button
                  onClick={() => handleNavigation("/services")}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive("/services") 
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Services
                </button>

                {/* Stock Data Dropdown */}
                <div className="relative group">
                  <button
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap ${
                      isActivePrefix("/nifty50") || isActivePrefix("/etf")
                        ? "bg-lightBlue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                    }`}
                  >
                    Stock Data
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="hidden group-hover:block absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => handleNavigation("/nifty50")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          isActivePrefix("/nifty50") 
                            ? "bg-blue-50 text-lightBlue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Nifty50 Data
                      </button>
                      <button
                        onClick={() => handleNavigation("/etf")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          isActivePrefix("/etf") 
                            ? "bg-blue-50 text-lightBlue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        ETF Data
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleNavigation("/pricing")}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive("/pricing") 
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Pricing
                </button>

                <button
                  onClick={() => handleNavigation("/gallery")}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive("/gallery") 
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Gallery
                </button>

                <button
                  onClick={() => handleNavigation("/event")}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive("/event") 
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Events
                </button>
              </div>
              {/* nav items end */}

              {/* Book Demo Button */}
              <button
                onClick={openBookDemoBGModal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-700 whitespace-nowrap"
              >
                Book A Demo
              </button>

              {/* Conditional Rendering Based on Authentication */}
              {isAuthenticated ? (
                <div className="ml-2">
                  <button
                    onClick={() => navigate("/organization")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700 whitespace-nowrap"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {orgName}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 ml-2">
                  <button
                    onClick={handleOpenLogin}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700 whitespace-nowrap"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleOpenRegister}
                    className="inline-flex mx-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 whitespace-nowrap"
                  >
                    Register
                  </button>
                  <a
                    href="https://chat.whatsapp.com/GCNCQb6Ul4l5FRwlT5y3Tb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {navbarOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={navbarOpen}
          isAuthenticated={isAuthenticated}
          orgName={orgName}
          handleNavigation={handleNavigation}
          handleOpenLogin={handleOpenLogin}
          handleOpenRegister={handleOpenRegister}
          isActive={isActive}
          isActivePrefix={isActivePrefix}
        />
      </nav>

      <UnifiedLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <UnifiedRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onOpenLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      
      {isBookDemoBGModal && (
        <BookDemoBGModal closeModal={closeBookDemoBGModal} />
      )}
    </>
  );
};

export default MainHomeNavbar;


{/* <ul className="flex flex-col lg:flex-row list-none lg:ml-auto space-x-6">
<li className={`nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md transition duration-40 
${location.pathname === "/" ? "bg-gray-200 text-gray-800 rounded-md pl-2 pr-2" : ""}`}
onClick={() => handleNavigation("/")}
>
  Home
</li>
<li
  className={`nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md transition duration-40 
  ${location.pathname === "/about" ? "bg-gray-200 text-gray-800 rounded-md pl-2 pr-2" : ""}`}
  onClick={() => handleNavigation("/about")}
>
  About
</li>
<li
  className={`nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md transition duration-40 
  ${location.pathname === "/contact" ? "bg-gray-200 text-gray-800 rounded-md pl-2 pr-2" : ""}`}
  onClick={() => handleNavigation("/contact")}
>
  Contact
</li>
<li
  className={`nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md transition duration-40 
  ${location.pathname === "/services" ? "bg-gray-200 text-gray-800 rounded-md pl-2 pr-2" : ""}`}
  onClick={() => handleNavigation("/services")}
>
  Services
</li>

<div className="relative group">
  <button className={`focus:outline-none pl-2 pr-2 -ml-2 -mr-2 nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:text-gray-700 hover:bg-gray-100 hover:rounded-md
  ${(location.pathname === "/nifty50" || location.pathname === "/etf") ? "bg-gray-200 text-gray-800 rounded-md" : ""}`}>
    Stock Data
  </button>
  <ul className="absolute hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10 min-w-[150px]">
    <li
    className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer
    ${location.pathname === "/nifty50" ? "bg-gray-200 text-gray-800" : ""}`}
    onClick={() => handleNavigation("/nifty50")}
    >
      Nifty50 Data
    </li>
    <li
    className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer
    ${location.pathname === "/etf" ? "bg-gray-200 text-gray-800" : ""}`}
    onClick={() => handleNavigation("/etf")}
    >
      ETF Data
    </li>
  </ul>
</div>
<li
  className={`nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md transition duration-40 
  ${location.pathname === "/pricing" ? "bg-gray-200 text-gray-800 rounded-md pl-2 pr-2" : ""}`}
  onClick={() => handleNavigation("/pricing")}
>
  Pricing
</li>
<li
  className={`nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md transition duration-40 
  ${location.pathname === "/gallery" ? "bg-gray-200 text-gray-800 rounded-md pl-2 pr-2" : ""}`}
  onClick={() => handleNavigation("/gallery")}
>
  Gallery
</li>
<li
  className={`nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-103 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md transition duration-40 
  ${location.pathname === "/event" ? "bg-gray-200 text-gray-800 rounded-md pl-2 pr-2" : ""}`}
  onClick={() => handleNavigation("/event")}
>
  Events
</li>
</ul> */}