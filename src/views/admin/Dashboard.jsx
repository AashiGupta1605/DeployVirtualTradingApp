// pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/User/userSlice";
import { fetchOrganizations } from "../../redux/Organization/auth/organizationAuthSlice";
import CardPageVisits from "../../components/Admin/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";
import StatsSection from "../../components/Admin/Cards/StatsSection";

export default function Dashboard() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users.list);
  const orgCount = useSelector((state) => state.organization.list.length);
  const userStatus = useSelector((state) => state.user.users.status);
  const orgStatus = useSelector((state) => state.organization.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
    if (orgStatus === 'idle') {
      dispatch(fetchOrganizations());
    }
  }, [userStatus, orgStatus, dispatch]);

  const userCount = users.length;

  return (
    <div className="mt-12 overflow-hidden">
      {/* Stats Section with optional additional stats */}
      <StatsSection />

       {/* Dashboard Content */}
       <div className="px-4 mx-auto w-full -mt-24">
        <div className="flex flex-wrap">
          {/* Page Visits */}
          <div className="w-full xl:w-8/12 px-4">
             <CardPageVisits />
          </div>

          {/* Social Traffic */}
          <div className="w-full xl:w-4/12 px-4">
             <CardSocialTraffic />
          </div>
        </div>
      </div>
    </div>
  );
}