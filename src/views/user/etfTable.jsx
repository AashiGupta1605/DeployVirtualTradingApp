import React from "react";
// import CardTable from "../../components/Common/CardTable";
import StockTable from "../../components/Common/StockTable";

export default function etfTable() {
  return (
    <>
     <div className="flex flex-wrap ">
        <div className="w-full mb-45 px-4">
          <StockTable />
        </div>
      </div>
    </>
  );
}