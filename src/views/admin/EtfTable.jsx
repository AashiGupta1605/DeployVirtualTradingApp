<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/User/userSlice";
import { fetchOrganizations } from "../../redux/Organization/auth/organizationAuthSlice";
>>>>>>> d2b4b6b293b00bb5db96a63c4327b654926dfb24
import StockTable from "../../components/Common/StockTable";
import StatsSection from "../../components/Admin/Cards/StatsSection";

export default function ETfTable() {
  return (
    <div className="mt-12 overflow-hidden">
      <StatsSection />
      
      {/* Etf Table Section */}
      <div className="flex flex-wrap -mt-6">
        <div className="w-full mb-12 px-4 -mt-42">
          <StockTable />
        </div>
      </div>
    </div>
  );
}