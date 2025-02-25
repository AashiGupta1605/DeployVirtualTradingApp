import React from "react";
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