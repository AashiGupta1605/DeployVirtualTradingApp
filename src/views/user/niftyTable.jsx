import React from "react";
import CardTable from "../../components/Common/CardTable";
// import StockTable from "../../components/Common/StockTable";

export default function TablesPage() {
  return (
    <>
      <div className="flex flex-wrap mt-50">
        <div className="w-full mb-45 px-4">
          <CardTable />
        </div>
      </div>
    </>
  );
}