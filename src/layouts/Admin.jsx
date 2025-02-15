import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import AdminNavbar from "../components/Admin/Navbars/AdminNavbar";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import FooterAdmin from "../components/Admin/Footers/FooterAdmin";

// Views
import Dashboard from "../views/admin/Dashboard";
import Settings from "../views/admin/Settings";
import OrgRegister from "../views/admin/OrgRegsiter";
import ETFTable from "../views/admin/EtfTable";
import NiftyTable from "../views/admin/NiftyTable";
import RegisteredUsers from "../views/admin/registeredUsers";
import Queries from "../views/admin/queries";

export default function Admin() {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-blueGray-100">
      {/* Sidebar */}
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col ${
          sidebarExpanded ? "md:ml-64" : "md:ml-20"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Navbar */}
        <AdminNavbar sidebarExpanded={sidebarExpanded} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="niftytable" element={<NiftyTable />} />
            <Route path="etftable" element={<ETFTable />} />
            <Route path="queries" element={<Queries />} />
            <Route path="RegisteredUsers" element={<RegisteredUsers />} />
            <Route path="OrgRegister" element={<OrgRegister />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>

        {/* Footer */}
        <FooterAdmin />
      </div>
    </div>
  );
}