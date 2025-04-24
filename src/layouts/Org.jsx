import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OrganizationNavbar from "../components/Organization/Navbars/OrganizationNavbar";
import OrganizationSidebar from "../components/Organization/Sidebars/OrganizationSidebar";
import OrganizationFooter from "../components/Organization/Footers/OrganizationFooter";
import OrganizationUsers from "../views/Organization/OrganizationUserDetails/OrganizationUsers";
import OrganizationDashboard from "../views/Organization/OrganizationDetails/OrganizationDashboard";
import Register from "../views/auth/Register";
import OrganizationUsersFeedback from "../views/Organization/OrganizationUserDetails/OrganizationUsersFeedback";
import OrganizationFeedback from "../views/Organization/OrganizationDetails/OrganizationFeedback";
import OrganizationComplaint from "../views/Organization/OrganizationDetails/OrganizationComplaint";
import ProtectedRoute from "../components/Organization/ProtectedRoutes/ProtectedRoute";
import ResetPasswordModal from "../views/auth/ResetPasswordModal";
import SessionExpiredModal from "../components/Organization/Session/SessionExpiredModal";
import { logoutOrganization } from "../redux/Organization/auth/organizationAuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function Org() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSessionExpired = () => {
      setShowSessionExpiredModal(true);
    };

    window.addEventListener('show-session-expired-modal', handleSessionExpired);
    return () => {
      window.removeEventListener('show-session-expired-modal', handleSessionExpired);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutOrganization());
    toast.success("Login Again");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-blueGray-100">
      <OrganizationSidebar 
        sidebarExpanded={sidebarExpanded} 
        setSidebarExpanded={setSidebarExpanded} 
      />
      
      <div className={`flex-1 flex flex-col ${
        sidebarExpanded ? "lg:ml-64" : "lg:ml-20"
      } transition-all duration-300 ease-in-out`}>
        <OrganizationNavbar 
          sidebarExpanded={sidebarExpanded} 
          setSidebarExpanded={setSidebarExpanded} 
        />
        
        <div className="flex-1 relative">
          <div className="absolute inset-0 overflow-auto">
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<OrganizationDashboard />} />
                <Route path="userlist" element={<OrganizationUsers />} />
                <Route path="users/feedbacks" element={<OrganizationUsersFeedback />} />
                <Route path="org-feedabacks" element={<OrganizationFeedback />} />
                <Route path="org-complaints" element={<OrganizationComplaint />} />
              </Route>
              <Route path="*" element={<Navigate to="dashboard" replace />} />
              <Route path="register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPasswordModal />} />
            </Routes>
          </div>
        </div>
        
        <OrganizationFooter />
      </div>

      <SessionExpiredModal
        show={showSessionExpiredModal}
        onHide={() => {
          setShowSessionExpiredModal(false);
          handleLogout();
        }}
      />
    </div>
  );
}