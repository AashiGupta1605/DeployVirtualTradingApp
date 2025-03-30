// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import RegisterModal from "../../../views/auth/Register"; // Import Register component
// import LoginModal from "../../../views/auth/Login"; // Import LoginModal component
// import OrganizationRegistration from "../../../views/Organization/OrganizationDetails/Models/OrganizationRegistration.jsx";
// import OrganizationLogin from "../../../views/Organization/OrganizationDetails/Models/OrganizationLogin";

// const MainHomeNavbar = () => {
//   const [navbarOpen, setNavbarOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
//   const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
//   const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isUserLoginModalOpen, setUserLoginModalOpen] = useState(false);
//   const [isUserRegisterModalOpen, setUserRegisterModalOpen] = useState(false); // State for user register modal

//   const navigate = useNavigate();
//   const registerDropdownRef = useRef(null);
//   const loginDropdownRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         registerDropdownRef.current &&
//         !registerDropdownRef.current.contains(event.target)
//       ) {
//         setRegisterDropdownOpen(false);
//       }
//       if (
//         loginDropdownRef.current &&
//         !loginDropdownRef.current.contains(event.target)
//       ) {
//         setLoginDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     navigate("/auth/login");
//   };

//   const handleNavigation = (path) => {
//     setNavbarOpen(false);
//     navigate(path);
//   };

//   const toggleRegisterDropdown = () => {
//     setRegisterDropdownOpen(!registerDropdownOpen);
//   };

//   const toggleLoginDropdown = () => {
//     setLoginDropdownOpen(!loginDropdownOpen);
//   };

//   return (
//     <>
//       <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-4 py-3 navbar-expand-lg shadow-lg bg-white">
//         <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
//           {/* Left Side - Logo & App Name */}
//           <div className="flex items-center space-x-2">
//             {/* Logo Image */}
//             <img
//               src="https://media.licdn.com/dms/image/v2/C510BAQE1pPlwgZETKw/company-logo_200_200/company-logo_200_200/0/1630605647519/praedico_global_research_pvt_ltd_logo?e=2147483647&v=beta&t=8hAhEoZ7nj9gKxuh6iA-q10402A-rxdAP4GeUOAnFdQ"
//               alt="PGR Logo"
//               className="h-10 w-auto"
//             />
//             &nbsp;
//             {/* App Name */}
//             <span
//               className="text-black text-[17px] font-bold leading-relaxed uppercase cursor-pointer"
//               onClick={() => handleNavigation("/")}
//             >
//               PGR VIRTUAL-TRADING APP
//             </span>
//           </div>

//           {/* Hamburger Button for Mobile */}
//           <button
//             className="cursor-pointer text-black text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
//             type="button"
//             onClick={() => setNavbarOpen(!navbarOpen)}
//           >
//             <i className="fas fa-bars"></i>
//           </button>

//           {/* Navbar Links */}
//           <div
//             className={`lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none ${
//               navbarOpen ? "block" : "hidden"
//             }`}
//             id="navbar-links"
//           >
//             <ul className="flex flex-col lg:flex-row list-none lg:ml-auto space-x-6">
//               <li className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40" onClick={() => handleNavigation("/")}>
//                 Home
//               </li>
//               <li
//                 className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
//                 onClick={() => handleNavigation("/about")}
//               >
//                 About
//               </li>
//               <li
//                 className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
//                 onClick={() => handleNavigation("/contact")}
//               >
//                 Contact
//               </li>
//               <li
//                 className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
//                 onClick={() => handleNavigation("/services")}
//               >
//                 Services
//               </li>
//               <li
//                 className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
//                 onClick={() => handleNavigation("/nifty50")}
//               >
//                 Nifty50 Data
//               </li>
//               <li className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40" onClick={() => handleNavigation("/etf")}>
//                 ETF Data
//               </li>
//               <li
//                 className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
//                 onClick={() => handleNavigation("/pricing")}
//               >
//                 Pricing
//               </li>

//               {/* Login Dropdown */}
//               <li className="relative flex items-center" ref={loginDropdownRef}>
//                 <button
//                   className="bg-lightBlue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-blue-950"
//                   onClick={toggleLoginDropdown}
//                 >
//                   <i className="fas fa-user-plus mr-1"></i> Login
//                 </button>
//                 {loginDropdownOpen && (
//                   <ul className="absolute left-[-20px] top-[110%] w-48 bg-white border rounded shadow-lg z-50">
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => setUserLoginModalOpen(true)}
//                     >
//                       User
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => setIsModalLoginOpen(true)}
//                     >
//                       Organization
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               {/* Register Dropdown */}
//               <li
//                 className="relative flex items-center"
//                 ref={registerDropdownRef}
//               >
//                 <button
//                   className="bg-red-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-green-700"
//                   onClick={toggleRegisterDropdown}
//                 >
//                   <i className="fas fa-user-plus mr-1"></i> Register
//                 </button>
//                 {registerDropdownOpen && (
//                   <ul className="absolute left-[-30px] top-[110%] w-48 bg-white border rounded shadow-lg z-50">
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => setUserRegisterModalOpen(true)}
//                     >
//                       User
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => setModalOpen(true)}
//                     >
//                       Organization
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Modals */}
//         <OrganizationRegistration
//           isOpen={isModalOpen}
//           onClose={() => setModalOpen(false)}
//         />
//         <OrganizationLogin
//           isOpen={isModalLoginOpen}
//           onClose={() => setIsModalLoginOpen(false)}
//         />
//         <LoginModal
//           isOpen={isUserLoginModalOpen}
//           onClose={() => setUserLoginModalOpen(false)}
//         />
//         <RegisterModal
//           isOpen={isUserRegisterModalOpen}
//           onClose={() => setUserRegisterModalOpen(false)}
//         />
//       </nav>
//     </>
//   );
// };

// export default MainHomeNavbar;






// add conditional rendring

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutOrganization } from "../../../redux/Organization/auth/organizationAuthSlice"; // Import logout action
import RegisterModal from "../../../views/auth/Register"; // Import Register component
import LoginModal from "../../../views/auth/Login"; // Import LoginModal component
import OrganizationRegistration from "../../../views/Organization/OrganizationDetails/Models/OrganizationRegistration.jsx";
import OrganizationLogin from "../../../views/Organization/OrganizationDetails/Models/OrganizationLogin";
import {LogIn} from "lucide-react";

const MainHomeNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserLoginModalOpen, setUserLoginModalOpen] = useState(false);
  const [isUserRegisterModalOpen, setUserRegisterModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);

  // Get organization authentication state from Redux
  const { orgName, orgId, org, currentOrg } = useSelector((state) => state.organization.auth);
console.log( currentOrg);
console.log( currentOrg?.name);
  
  const isAuthenticated = !!orgName; // Check if organization is logged in

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
    dispatch(logoutOrganization()); // Dispatch logout action
    navigate("/"); // Redirect to home page
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
          {/* Left Side - Logo & App Name */}
          <div className="flex items-center space-x-2">
            {/* Logo Image */}
            <img
              src="https://media.licdn.com/dms/image/v2/C510BAQE1pPlwgZETKw/company-logo_200_200/company-logo_200_200/0/1630605647519/praedico_global_research_pvt_ltd_logo?e=2147483647&v=beta&t=8hAhEoZ7nj9gKxuh6iA-q10402A-rxdAP4GeUOAnFdQ"
              alt="PGR Logo"
              className="h-10 w-auto"
            />
            &nbsp;
            {/* App Name */}
            <span
              className="text-black text-[17px] font-bold leading-relaxed uppercase cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              PGR - VIRTUAL TRADING APP
            </span>
          </div>

          {/* Hamburger Button for Mobile */}
          <button
            className="cursor-pointer text-black text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Navbar Links */}
          <div
            className={`lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none ${
              navbarOpen ? "block" : "hidden"
            }`}
            id="navbar-links"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto space-x-6">
              <li className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40" 
              onClick={() => handleNavigation("/")}
              >
                Home
              </li>
              <li
                className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
                onClick={() => handleNavigation("/about")}
              >
                About
              </li>
              <li
                className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
                onClick={() => handleNavigation("/contact")}
              >
                Contact
              </li>
              <li
                className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
                onClick={() => handleNavigation("/services")}
              >
                Services
              </li>
              <li
                className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
                onClick={() => handleNavigation("/nifty50")}
              >
                Nifty50 Data
              </li>
              <li className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40" onClick={() => handleNavigation("/etf")}>
                ETF Data
              </li>
              <li
                className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
                onClick={() => handleNavigation("/pricing")}
              >
                Pricing
              </li>
              <li
                className="nav-item cursor-pointer text-s pt-1 font-semibold text-gray-600 ease-in-out hover:scale-102 transition duration-40"
                onClick={() => handleNavigation("/event")}
              >
                Events
              </li>

              {/* Conditional Rendering Based on Authentication */}
              {isAuthenticated ? (
                // Display Organization Name and Logout Button
                <li className="flex items-center space-x-4">
                  <button
                    className="bg-lightBlue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-blue-500 flex flex-row items-center gap-x-2"
                    onClick={() => navigate(`/organization`)} // Navigate to organization dashboard
                  >
                    <LogIn size={16}/>   
                   <span>{orgName}</span> 
                   {/* Display organization name */}
                  </button>
                  {/* <button
                    className="bg-red-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button> */}
                </li>
              ) : (
                // Display Login and Register Dropdowns
                <>
                  {/* Login Dropdown */}
                  <li className="relative flex items-center" ref={loginDropdownRef}>
                    <button
                      className="bg-lightBlue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-blue-950"
                      onClick={toggleLoginDropdown}
                    >
                      <i className="fas fa-user-plus mr-1"></i> Login
                    </button>
                    {loginDropdownOpen && (
                      <ul className="absolute left-[-20px] top-[110%] w-48 bg-white border rounded shadow-lg z-50">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setUserLoginModalOpen(true)}
                        >
                          User
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setIsModalLoginOpen(true)}
                        >
                          Organization
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Register Dropdown */}
                  <li className="relative flex items-center" ref={registerDropdownRef}>
                    <button
                      className="bg-red-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-green-700"
                      onClick={toggleRegisterDropdown}
                    >
                      <i className="fas fa-user-plus mr-1"></i> Register
                    </button>
                    {registerDropdownOpen && (
                      <ul className="absolute left-[-30px] top-[110%] w-48 bg-white border rounded shadow-lg z-50">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setUserRegisterModalOpen(true)}
                        >
                          User
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setModalOpen(true)}
                        >
                          Organization
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              )}
            </ul>
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
      </nav>
    </>
  );
};

export default MainHomeNavbar;