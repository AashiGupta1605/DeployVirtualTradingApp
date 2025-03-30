import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Components
import DashboardFooter from "../components/User/Footers/DashboardFooter";
import UserNavbar from "../components/User/Navbars/UserNavbar";
import UserSidebar from "../components/User/Sidebar/UserSidebar";
// import SessionExpiredModal from "../components/User/Modals/SessionExpiredModal";
import SessionExpiredModal from "../components/Organization/Session/SessionExpiredModal";

// Views
import Dashboard from "../views/user/userDashboard";
import Profile from "../views/user/Profile";
import EtfTable from "../views/user/etfTable";
import NiftyTable from "../views/user/niftyTable";
import Nifty500Table from "../views/user/nifty500table";
import FeedbackTable from "../views/user/feedbacktable";
import TradingNifty from "../views/user/tradingnifty";
import EventsPage from "../views/user/eventsPage";

// Redux Actions
import { logout } from "../redux/User/authSlice";

export default function User() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const userData = useSelector((state) => state.user.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSessionExpired = () => {
      setShowSessionExpiredModal(true);
    };

    // Listen for the custom event
    window.addEventListener("show-session-expired-modal", handleSessionExpired);

    // Cleanup
    return () => {
      window.removeEventListener("show-session-expired-modal", handleSessionExpired);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    toast.success("Login Again");
    navigate("/"); // Redirect to home page
  };

  return (
    <>
      <UserSidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        userData={userData}
      />
      <div
        className={`relative ${
          sidebarExpanded ? "md:ml-64" : "md:ml-20"
        } ml-16 bg-blueGray-100 transition-all duration-300 ease-in-out`}
      >
        <UserNavbar sidebarExpanded={sidebarExpanded} userData={userData} />
        <div className="mx-auto w-full -m-24">
          <div id="root">
            <main>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="niftytable" element={<NiftyTable />} />
                <Route path="nifty500table" element={<Nifty500Table />} />
                <Route path="etftable" element={<EtfTable />} />
                <Route path="profile" element={<Profile />} />
                <Route path="feedback" element={<FeedbackTable />} />
                <Route path="tradingnifty" element={<TradingNifty />} />
                <Route path="eventspage" element={<EventsPage />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </main>
          </div>
          <DashboardFooter />
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
