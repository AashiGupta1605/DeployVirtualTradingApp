import React from "react";
// import CardTable from "../../components/Common/CardTable";
import StockTable from "../../components/Common/StockTable";

export default function etfTable() {
  return (
    <>
      <div className="flex flex-wrap mt-24">
        <div className="w-full mb-12 px-4 mt-24">
          <StockTable />
        </div>
      </div>
    </>
  );
}