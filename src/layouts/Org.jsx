



import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import OrganizationNavbar from "../components/Organization/Navbars/OrganizationNavbar";
import OrganizationSidebar from "../components/Organization/Sidebars/OrganizationSidebar";
import OrganizationFooter from "../components/Organization/Footers/OrganizationFooter";

// pages
import OrganizationUsers from "../views/Organization/OrganizationUserDetails/OrganizationUsers";
import OrganizationDashboard from "../views/Organization/OrganizationDetails/OrganizationDashboard";
import Register from "../views/auth/Register";
import OrganizationUsersFeedback from "../views/Organization/OrganizationUserDetails/OrganizationUsersFeedback"
import OrganizationFeedback from "../views/Organization/OrganizationDetails/OrganizationFeedback";

// const orgName = localStorage.getItem("orgName");

export default function Org() {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false);

  return (
    <>
      <OrganizationSidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <div className={`relative ${sidebarExpanded ? "md:ml-64" : "md:ml-20"} ml-16 bg-blueGray-100 transition-all duration-300 ease-in-out`}>
        <OrganizationNavbar sidebarExpanded={sidebarExpanded}/>
        <div className="mx-auto w-full -m-24">
          <div id="root">
          <main>
          <Routes>
            <Route path="dashboard" element={<OrganizationDashboard />} />
            <Route path="userlist" element={<OrganizationUsers />} />
            <Route path="users/feedbacks" element={<OrganizationUsersFeedback />} />
            <Route path="org-feedabacks" element={<OrganizationFeedback />} />

            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
          </main>
          </div>
          <OrganizationFooter />
        </div>
      </div>
    </>
  );
}






