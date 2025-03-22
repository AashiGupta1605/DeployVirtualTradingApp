
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import Admin from './layouts/Admin';
import Auth from './layouts/Auth';
import Org from './layouts/Org';
import User from './layouts/User';
import GuestUser from './layouts/GuestUser';

// Views without layouts
import Profile from './views/user/Profile';
import CompanyDetailsPage from "./views/admin/CompanyDetail";

// import BackToTop from './components/GuestUser/BackToTop';
// import StartScreenPopupModal from './components/GuestUser/Home/StartScreenPopupModal';



import SessionExpiredModal from './components/Organization/Session/SessionExpiredModal';
import { logoutOrganization } from './redux/Organization/auth/organizationAuthSlice';
import { logout } from './redux/User/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logoutOrganization()); // Dispatch logout action
      dispatch(logout());
      toast.success("Login Again");
      navigate("/"); // Redirect to home page
    };

    useEffect(() => {
      const checkSession = () => {
        const orgToken = localStorage.getItem("token");
        const userToken = localStorage.getItem("userToken");
        
        if (!orgToken && !userToken) return; // Don't show modal if tokens are not found
        
        try {
          const decodeToken = (token) => JSON.parse(atob(token.split(".")[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          
          if (orgToken) {
            const decodedOrgToken = decodeToken(orgToken);
            if (decodedOrgToken.exp < currentTime) {
              setShowSessionExpiredModal(true);
              return;
            }
          }
          
          if (userToken) {
            const decodedUserToken = decodeToken(userToken);
            if (decodedUserToken.exp < currentTime) {
              setShowSessionExpiredModal(true);
              return;
            }
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          return; // Prevent showing modal due to decoding errors
        }
      };
      
      const sessionCheckTimeout = setTimeout(checkSession, 2000); // Delay initial check to allow token storage
      const interval = setInterval(checkSession, 60000);
      
      return () => {
        clearTimeout(sessionCheckTimeout);
        clearInterval(interval);
      };
    }, []);
  
  

  return (
    <div>
      <Toaster/>
      {/* <BackToTop /> */}
      <SessionExpiredModal
        show={showSessionExpiredModal}
        onHide={() => {
          setShowSessionExpiredModal(false);
          handleLogout();
        }}
      />
    <Routes>
      {/* Routes with layouts */}
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/organization/*" element={<Org />} />
      <Route path="/user/*" element={<User/>}/>
      <Route path="/*" element={<GuestUser/>}/>

      {/* Routes without layouts */}
      <Route path="/company/:symbol" element={<CompanyDetailsPage />} />
      <Route path="/profile" element={<Profile />} />

      {/* Redirect for unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
    </div>
  );
};

export default App;



// import React, { useState } from 'react';

// import { Routes, Route, Navigate } from 'react-router-dom';

// // Layouts
// import Admin from './layouts/Admin';
// import Auth from './layouts/Auth';
// import Org from './layouts/Org';
// import User from './layouts/User';

// // Views without layouts
// import Profile from './views/user/Profile';
// import CompanyDetailsPage from "./views/admin/CompanyDetail";

// import MainHomePage from './views/GuestUser/MainHomePage';
// import AboutPage from './views/GuestUser/AboutPage';
// import ContactPage from './views/GuestUser/ContactPage';
// import ServicePage from './views/GuestUser/ServicePage';
// import Show_Nifty50Data_Page from './views/GuestUser/Show_Nifty50Data_Page';
// import Show_ETFData_Page from './views/GuestUser/Show_ETFData_Page';
// import PricingPage from './views/GuestUser/PricingPage';
// import BackToTop from './components/GuestUser/BackToTop';
// import SessionExpiredModal from './components/Organization/Session/SessionExpiredModal';
// import { logoutOrganization } from './redux/Organization/auth/organizationAuthSlice';
// import toast, { Toaster } from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// const App = () => {
//   const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//     const handleLogout = () => {
//       dispatch(logoutOrganization()); // Dispatch logout action
//       toast.success("Login Again");
//       navigate("/"); // Redirect to home page
//     };
  
//   return (
//     <div>
//       <Toaster/>
//       {/* <BackToTop /> */}
//       <SessionExpiredModal
//         show={showSessionExpiredModal}
//         onHide={() => {
//           setShowSessionExpiredModal(false);
//           handleLogout();
//         }}
//       />
//     <Routes>
//       {/* Routes with layouts */}
//       <Route path="/admin/*" element={<Admin />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="/organization/*" element={<Org />} />
//       <Route path="/user/*" element={<User/>}/>

//       {/* Routes without layouts */}
//       <Route path="/company/:symbol" element={<CompanyDetailsPage />} />
//       <Route path="/profile" element={<Profile />} />
      
//       <Route path="/" element={<MainHomePage/>} />
//       <Route path="/about" element={<AboutPage/>} />
//       <Route path="/contact" element={<ContactPage />} />
//       <Route path="/services" element={<ServicePage />} />
//       <Route path="/nifty50" element={<Show_Nifty50Data_Page/>} />
//       <Route path="/etf" element={<Show_ETFData_Page/>} />
//       <Route path="/pricing" element={<PricingPage/>} />
//       {/* <Route path="/feed" element={<OrganizationAllFeedbacksTable/>} /> */}

//       {/* Redirect for unknown routes */}
//       <Route path="*" element={<Navigate to="/" />} />

//     </Routes>
//     </div>
//   );
// };

// export default App;