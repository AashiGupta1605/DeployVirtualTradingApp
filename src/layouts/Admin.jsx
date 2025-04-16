import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import AdminNavbar from "../components/Admin/Navbars/AdminNavbar";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import FooterAdmin from "../components/Admin/Footers/FooterAdmin";

// Views
import Dashboard from "../views/admin/Dashboard";
import Settings from "../views/admin/Settings";
import OrgRegister from "../views/Admin/OrganizationList";
import ETFTable from "../views/admin/EtfTable";
import NiftyTable from "../views/admin/NiftyTable";
import Nifty500Table from "../views/admin/nifty500table";
import RegisteredUsers from "../views/Admin/UserList";
import Queries from "../views/Admin/QueryList";
import FeedbackList from "../views/Admin/FeedbackList";
import ComplaintList from "../views/admin/ComplaintList";
import OrgComplaintList from "../views/admin/OrgComplaintList";
import GalleryImages from "../views/admin/gallery/GalleryImages";
import GalleryCategories from "../views/admin/gallery/GalleryCategories";
import UserDemo from "../views/admin/bookDemo/UserDemo";
import OrgDemo from "../views/admin/bookDemo/OrgDemo";
import AdminEventsPage from "../views/admin/AdminEventsPage";
import Participants from "../views/admin/Participants";
export default function Admin() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-blueGray-100">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <div
        className={`flex-1 flex flex-col ${
          sidebarExpanded ? "md:ml-64" : "md:ml-20"
        } transition-all duration-300 ease-in-out`}
      >
        <AdminNavbar sidebarExpanded={sidebarExpanded} />
        <div className="flex-1 relative"> {/* Changed to relative */}
          <div className="absolute inset-0 overflow-auto"> {/* Added this wrapper */}
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="participants" element={<Participants />} />
              <Route path="settings" element={<Settings />} />
              <Route path="niftytable" element={<NiftyTable />} />
              <Route path="nifty500table" element={<Nifty500Table />} />
              <Route path="etftable" element={<ETFTable />} />
              <Route path="queries" element={<Queries />} />
              <Route path="feedback" element={<FeedbackList />} />
              <Route path="complaint" element={<ComplaintList />} />
              <Route path="org-complaint" element={<OrgComplaintList />} />
              <Route path="RegisteredUsers" element={<RegisteredUsers />} />
              <Route path="OrgRegister" element={<OrgRegister />} />
              <Route path="gallery/images" element={<GalleryImages sidebarExpanded={sidebarExpanded}/>}/>
              <Route path="gallery/categories" element={<GalleryCategories sidebarExpanded={sidebarExpanded}/>}/>
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
              <Route path="demo/userDemo" element={<UserDemo sidebarExpanded={sidebarExpanded}/>}/>
              <Route path="demo/organizationDemo" element={<OrgDemo sidebarExpanded={sidebarExpanded}/>}/>
            </Routes>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </div>
  );
}