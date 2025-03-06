import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../../../views/auth/Register"; // Import Register component
import LoginModal from "../../../views/auth/Login"; // Import LoginModal component
import OrganizationRegistration from "../../../views/Organization/OrganizationDetails/Models/OrganizationRegistration.jsx";
import OrganizationLogin from "../../../views/Organization/OrganizationDetails/Models/OrganizationLogin";


const MainHomeNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserLoginModalOpen, setUserLoginModalOpen] = useState(false);
  const [isUserRegisterModalOpen, setUserRegisterModalOpen] = useState(false); // State for user register modal

  const navigate = useNavigate();
  const registerDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

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
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  const handleNavigation = (path) => {
    setNavbarOpen(false);
    navigate(path);
  };

  const toggleRegisterDropdown = () => {
    setRegisterDropdownOpen(!registerDropdownOpen);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-4 py-3 navbar-expand-lg shadow-lg bg-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div
              className="text-black text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <i className="fas fa-briefcase mr-2 text-xl"></i>
              StockSphere
            </div>
            <button
              className="cursor-pointer text-white text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={`lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none ${
              navbarOpen ? "block" : "hidden"
            }`}
            id="navbar-links"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto space-x-6">
              <li
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                onClick={() => handleNavigation("/")}
              >
                Home
              </li>
              <li
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                onClick={() => handleNavigation("/about")}
              >
                About
              </li>
              <li
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                onClick={() => handleNavigation("/contact")}
              >
                Contact
              </li>
              <li
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                onClick={() => handleNavigation("/services")}
              >
                Services
              </li>
              <li
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                onClick={() => handleNavigation("/nifty50")}
              >
                Nifty50 Data
              </li>
              <li
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                onClick={() => handleNavigation("/etf")}
              >
                ETF Data
              </li>
              <li
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                onClick={() => handleNavigation("/pricing")}
              >
                Pricing
              </li>
              
                <>
                  <li className="relative flex items-center" ref={loginDropdownRef}>
                    <button
                      className="bg-lightBlue-500 text-white active:bg-blue-950 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-blue-950 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                      onClick={toggleLoginDropdown}
                    >
                      <i className="fas fa-user-plus mr-1"></i> Login
                    </button>
                    {loginDropdownOpen && (
                      <div className="absolute right-0 mt-16 w-48 bg-white border rounded shadow-lg z-50">
                        <li
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                          onClick={() => setIsModalLoginOpen(true)}
                        >
                          Organization
                        </li>
                        <li
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                          onClick={() => setUserLoginModalOpen(true)}
                        >
                          User
                        </li>
                      </div>
                    )}
                  </li>

                  <li className="relative flex items-center" ref={registerDropdownRef}>
                    <button
                      className="bg-red-500 text-white active:bg-green-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-green-700 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                      onClick={toggleRegisterDropdown}
                    >
                      <i className="fas fa-user-plus mr-1"></i> Register
                    </button>
                    {registerDropdownOpen && (
                      <div className="absolute right-0 mt-16 w-48 bg-white border rounded shadow-lg z-50">
                        <li
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                          onClick={() => setUserRegisterModalOpen(true)}
                        >
                          User
                        </li>
                        <li
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                          onClick={() => setModalOpen(true)}
                        >
                          Organization
                        </li>
                      </div>
                    )}
                  </li>
                </>
             
            </ul>
          </div>
        </div>

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
      </nav>
    </>
  );
}

export default MainHomeNavbar
