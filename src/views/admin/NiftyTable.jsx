import React from "react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/User/userSlice";
import { fetchOrganizations } from "../../redux/Organization/auth/organizationAuthSlice";
import CardTable from "../../components/Common/CardTable";
import StatsSection from "../../components/Admin/Cards/StatsSection";

export default function NiftyTable() {
  return (
    <div className="mt-12 overflow-hidden">
      <StatsSection />
      
      {/* Nifty Table Section */}
      <div className="flex flex-wrap -mt-6">
        <div className="w-full mb-12 px-4 -mt-42">
        <CardTable />
        </div>
      </div>
    </div>
  );
}
