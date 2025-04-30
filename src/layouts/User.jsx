import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Components
import DashboardFooter from "../components/User/Footers/DashboardFooter";
import UserNavbar from "../components/User/Navbars/UserNavbar";
import UserSidebar from "../components/User/Sidebar/UserSidebar";
import SessionExpiredModal from "../components/Organization/Session/SessionExpiredModal";

// Views
import Dashboard from "../views/user/userDashboard";
import Profile from "../views/user/Profile";
import EtfTable from "../views/user/etfTable";
import NiftyTable from "../views/user/niftyTable";
import Nifty500Table from "../views/user/nifty500table";
import FeedbackTable from "../views/user/feedbacktable";
import ComplaintTable from "../views/user/complainttable";
import TradingNifty from "../views/user/tradingnifty";
import EventsPage from "../views/user/eventsPage";
import MyEventsPage from "../views/user/MyEventsPage";
// import MyCertifications from "views/user/MyCertifications";
import MyCertifications from "../views/user/MyCertifications";

// Redux Actions
import { logout } from "../redux/User/authSlice";

export default function User() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const userData = useSelector((state) => state.user.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close sidebar when screen size changes to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarExpanded(false);
      } //else {
      //   setSidebarExpanded(true);
      // }
    };

    // Set initial state based on screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      setShowSessionExpiredModal(true);
    };

    window.addEventListener("show-session-expired-modal", handleSessionExpired);
    return () => {
      window.removeEventListener("show-session-expired-modal", handleSessionExpired);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Login Again");
    navigate("/");
  };

  return (
    <>
      <UserSidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />

      
      <div className="relative flex flex-col min-h-screen">
        <UserNavbar 
          sidebarExpanded={sidebarExpanded} 
          setSidebarExpanded={setSidebarExpanded} 
        />
        
        <div
          className={`flex-grow transition-all duration-300 ease-in-out ${
            sidebarExpanded ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="mx-auto w-full pb-16">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="niftytable" element={<NiftyTable />} />
              <Route path="nifty500table" element={<Nifty500Table />} />
              <Route path="etftable" element={<EtfTable />} />
              <Route path="profile" element={<Profile />} />
              <Route path="my-certificates" element={<MyCertifications />} />
              <Route path="feedback" element={<FeedbackTable />} />
              <Route path="complaint" element={<ComplaintTable />} />
              <Route path="tradingnifty" element={<TradingNifty />} />
              <Route path="eventspage" element={<EventsPage />} />
              <Route path="my-events" element={<MyEventsPage />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>

          </div>
        </div>
        
        <DashboardFooter />
      </div>

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