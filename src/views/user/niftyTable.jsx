import React from "react";
import CardTable from "../../components/Common/CardTable";
// import StockTable from "../../components/Common/StockTable";

export default function TablesPage() {
  return (
    <>
      <div className="flex flex-wrap mt-24">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
      </div>
    </>
  );
}