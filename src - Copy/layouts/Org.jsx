



import React, { useEffect, useState } from "react";
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
import ProtectedRoute from "../components/Organization/ProtectedRoutes/ProtectedRoute";
// const orgName = localStorage.getItem("orgName");
import SessionExpiredModal from "../components/Organization/Session/SessionExpiredModal";
import { logoutOrganization } from "../redux/Organization/auth/organizationAuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
export default function Org() {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleSessionExpired = () => {
      setShowSessionExpiredModal(true);
    };

    // Listen for the custom event
    window.addEventListener('show-session-expired-modal', handleSessionExpired);

    // Cleanup
    return () => {
      window.removeEventListener('show-session-expired-modal', handleSessionExpired);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutOrganization()); // Dispatch logout action
    toast.success("Login Again");
    navigate("/"); // Redirect to home page
  };
  return (
    <>
      <OrganizationSidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />

      <div className={`relative ${sidebarExpanded ? "md:ml-64" : "md:ml-20"} ml-16 bg-blueGray-100 transition-all duration-300 ease-in-out`}>
        {/* <div className="z-0"> */}
        <OrganizationNavbar sidebarExpanded={sidebarExpanded}/>
        {/* </div> */}
        <div className="mx-auto w-full -m-24">
          <div id="root">
          <main>
          <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<OrganizationDashboard />} />
            <Route path="userlist" element={<OrganizationUsers />} />
            <Route path="users/feedbacks" element={<OrganizationUsersFeedback />} />
            <Route path="org-feedabacks" element={<OrganizationFeedback />} />
            </Route>
            <Route path="*" element={<Navigate to="dashboard" replace />} />
            <Route path="register" element={<Register />} />
          </Routes>
          </main>
          </div>
          <OrganizationFooter />
        </div>
      </div>

        {/* Session Expired Modal */}
        <SessionExpiredModal
        show={showSessionExpiredModal}
        onHide={() => {
          setShowSessionExpiredModal(false);
          handleLogout();
        }}
      />
    </>
  );
}






