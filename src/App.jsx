import React, {useState} from 'react';

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

  return (
    <div>
      <StartScreenPopupModal/>
      <Toaster/>
      {/* <BackToTop /> */}
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