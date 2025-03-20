
import React, { useState } from 'react';
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

import BackToTop from './components/GuestUser/BackToTop';
import StartScreenPopupModal from './components/GuestUser/Home/StartScreenPopupModal';

import { Toaster } from 'react-hot-toast';

const App = () => {
import SessionExpiredModal from './components/Organization/Session/SessionExpiredModal';
import { logoutOrganization } from './redux/Organization/auth/organizationAuthSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const App = () => {
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logoutOrganization()); // Dispatch logout action
      toast.success("Login Again");
      navigate("/"); // Redirect to home page
    };
  return (
    <div>
      <StartScreenPopupModal/>
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