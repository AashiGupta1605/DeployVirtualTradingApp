import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutOrganization } from "../../../redux/Organization/auth/organizationAuthSlice";
import RegisterModal from "../../../views/auth/Register";
import LoginModal from "../../../views/auth/Login";
import OrganizationRegistration from "../../../views/Organization/OrganizationDetails/Models/OrganizationRegistration.jsx";
import OrganizationLogin from "../../../views/Organization/OrganizationDetails/Models/OrganizationLogin";
import { LogIn, ChevronDown, Menu, X } from "lucide-react";
import CertificateValidationModal from "../../../components/User/Modals/CertificateValidationModal";

const MainHomeNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserLoginModalOpen, setUserLoginModalOpen] = useState(false);
  const [isUserRegisterModalOpen, setUserRegisterModalOpen] = useState(false);

  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const registerDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);

  // Get organization authentication state from Redux
  const { orgName, orgId, org, currentOrg } = useSelector(
    (state) => state.organization.auth
  );
  const isAuthenticated = !!orgName;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        registerDropdownRef.current &&
        !registerDropdownRef.current.contains(event.target)
      ) {
        setRegisterDropdownOpen(false);
      }
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutOrganization());
    navigate("/");
  };

  const handleNavigation = (path) => {
    setNavbarOpen(false);
    navigate(path);
  };

  const toggleRegisterDropdown = () => {
    setRegisterDropdownOpen(!registerDropdownOpen);
    setLoginDropdownOpen(false); // Close login dropdown if open
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
    setRegisterDropdownOpen(false); // Close register dropdown if open
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to check if path starts with a certain prefix (for nested routes)
  const isActivePrefix = (prefix) => {
    return location.pathname.startsWith(prefix);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
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
                <span className="ml-3 text-lg font-bold text-gray-900 hidden sm:block">
                  PGR - VIRTUAL TRADING APP
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <div className="flex space-x-1">
                <button
                  onClick={() => handleNavigation("/")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/")
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => handleNavigation("/about")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/about")
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  About
                </button>

                <button
                  onClick={() => handleNavigation("/contact")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/contact")
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Contact
                </button>

                <button
                  onClick={() => handleNavigation("/services")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
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
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center group-hover:bg-gray-100 ${
                      isActivePrefix("/nifty50") || isActivePrefix("/etf")
                        ? "bg-lightBlue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                    }`}
                  >
                    Stock Data
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {/* Dropdown menu - hidden by default, shown on hover */}
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
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/pricing")
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Pricing
                </button>

                <button
                  onClick={() => handleNavigation("/gallery")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/gallery")
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Gallery
                </button>

                <button
                  onClick={() => handleNavigation("/event")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/event")
                      ? "bg-lightBlue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
                  }`}
                >
                  Events
                </button>

                {/* <button
                  onClick={() => setIsCertificateModalOpen(true)}
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600 group relative"
                  title="Validate Certificate"
                >
                  <i className="fas fa-certificate"></i>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Validate Certificate
                  </span>
                </button> */}

                <button
                  onClick={() => setIsCertificateModalOpen(true)}
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-blue-500 hover:bg-gray-100 hover:text-blue-700 group relative"
                  title="Validate Certificate"
                >
                  <i className="fas fa-certificate"></i>
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Validate Certificate
                  </span>
                </button>
              </div>

              {/* Conditional Rendering Based on Authentication */}
              {isAuthenticated ? (
                <div className="ml-4">
                  <button
                    onClick={() => navigate(`/organization`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {orgName}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 ml-4">
                  {/* Login Dropdown */}
                  <div className="relative" ref={loginDropdownRef}>
                    <button
                      onClick={toggleLoginDropdown}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Login
                    </button>
                    {loginDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setLoginDropdownOpen(false);
                              setUserLoginModalOpen(true);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              isActivePrefix("/login")
                                ? "bg-blue-50 text-lightBlue-600 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            User Login
                          </button>
                          <button
                            onClick={() => {
                              setLoginDropdownOpen(false);
                              setIsModalLoginOpen(true);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              isActivePrefix("/org-login")
                                ? "bg-blue-50 text-lightBlue-600 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            Organization Login
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Register Dropdown */}
                  <div className="relative" ref={registerDropdownRef}>
                    <button
                      onClick={toggleRegisterDropdown}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Register
                    </button>
                    {registerDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setRegisterDropdownOpen(false);
                              setUserRegisterModalOpen(true);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              isActivePrefix("/register")
                                ? "bg-blue-50 text-lightBlue-600 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            User Register
                          </button>
                          <button
                            onClick={() => {
                              setRegisterDropdownOpen(false);
                              setModalOpen(true);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              isActivePrefix("/org-register")
                                ? "bg-blue-50 text-lightBlue-600 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            Organization Register
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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

        {/* Mobile menu */}
        <div className={`md:hidden ${navbarOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
            <button
              onClick={() => handleNavigation("/")}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavigation("/about")}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/about")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavigation("/contact")}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/contact")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => handleNavigation("/services")}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/services")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              Services
            </button>

            <div className="px-4 py-2">
              <button
                onClick={() => handleNavigation("/nifty50")}
                className={`block w-full text-left px-4 py-2 text-base font-medium ${
                  isActivePrefix("/nifty50")
                    ? "bg-blue-50 text-lightBlue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Nifty50 Data
              </button>
              <button
                onClick={() => handleNavigation("/etf")}
                className={`block w-full text-left px-4 py-2 text-base font-medium ${
                  isActivePrefix("/etf")
                    ? "bg-blue-50 text-lightBlue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                ETF Data
              </button>
            </div>

            <button
              onClick={() => handleNavigation("/pricing")}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/pricing")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              Pricing
            </button>

            <button
              onClick={() => handleNavigation("/gallery")}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/gallery")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              Gallery
            </button>

            <button
              onClick={() => handleNavigation("/event")}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/event")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              Events
            </button>

            {/* <button
              onClick={() => {
                setNavbarOpen(false);
                setIsCertificateModalOpen(true);
              }}
              className={`block w-full text-left px-4 py-2 text-base font-medium ${
                isActive("/certificate")
                  ? "bg-lightBlue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-lightBlue-600"
              }`}
            >
              <i className="fas fa-certificate mr-2"></i>
              Certificate
            </button> */}

            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-blue-500 hover:bg-gray-100 hover:text-blue-700 group relative"
              title="Validate Certificate"
            >
              <i className="fas fa-certificate"></i>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Validate Certificate
              </span>
            </button>

            {/* Mobile Authentication Buttons */}
            {isAuthenticated ? (
              <div className="px-4 py-2">
                <button
                  onClick={() => navigate(`/organization`)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  {orgName}
                </button>
              </div>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <button
                  onClick={() => {
                    setNavbarOpen(false);
                    setUserLoginModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700"
                >
                  User Login
                </button>
                <button
                  onClick={() => {
                    setNavbarOpen(false);
                    setIsModalLoginOpen(true);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-lightBlue-600 hover:bg-blue-700"
                >
                  Organization Login
                </button>
                <button
                  onClick={() => {
                    setNavbarOpen(false);
                    setUserRegisterModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  User Register
                </button>
                <button
                  onClick={() => {
                    setNavbarOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Organization Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <OrganizationRegistration
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
        <OrganizationLogin
          isOpen={isModalLoginOpen}
          onClose={() => setIsModalLoginOpen(false)}
        />
        <LoginModal
          isOpen={isUserLoginModalOpen}
          onClose={() => setUserLoginModalOpen(false)}
        />
        <RegisterModal
          isOpen={isUserRegisterModalOpen}
          onClose={() => setUserRegisterModalOpen(false)}
        />

        <CertificateValidationModal
          isOpen={isCertificateModalOpen}
          onClose={() => setIsCertificateModalOpen(false)}
        />
      </nav>
    </>
  );
};

export default MainHomeNavbar;
