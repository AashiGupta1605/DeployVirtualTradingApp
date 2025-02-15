import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"

// Components

import DashboardFooter from "../components/User/Footers/DashboardFooter";

// Views
import Dashboard from "../views/user/userDashboard";
import Profile from "../views/user/Profile";
import EtfTable from "../views/user/etfTable";
import NiftyTable from "../views/user/niftyTable";
import UserNavbar from "../components/User/Navbars/UserNavbar";
import UserSidebar from "../components/User/Sidebar/UserSidebar";

export default function User() {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false);

  return (
    <>
      {/* Pass sidebarExpanded and setSidebarExpanded as props */}
      <UserSidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <div
        className={`relative ${
          sidebarExpanded ? "md:ml-64" : "md:ml-20"
        } ml-16 bg-blueGray-100 transition-all duration-300 ease-in-out`}
      >
        {/* Pass sidebarExpanded as a prop */}
        <UserNavbar sidebarExpanded={sidebarExpanded} />
        <div className="mx-auto w-full -m-24">
        <Routes>
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="niftytable" element={<NiftyTable />} />
               <Route path="etftable" element={<EtfTable />} />
              <Route path="profile" element={<Profile />} />
             <Route path="*" element={<Navigate to="dashboard" replace />} />
     </Routes>

          <DashboardFooter />
        </div>
      </div>
    </>
  );
}