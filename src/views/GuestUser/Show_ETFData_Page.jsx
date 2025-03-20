import React from "react";
import StockTable from '../../components/Common/StockTable';

const Show_ETFData_Page = () => {
  return (
    <>
      <div className="mx-2 mt-3 overflow-hidden" style={{ paddingBottom: '120px' }}>
      <StockTable/>
      </div>
    </>
  );
};

export default Show_ETFData_Page;
