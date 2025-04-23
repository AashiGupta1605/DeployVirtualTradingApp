import React from "react";
import StockTable from '../../components/Common/StockTable';
import { motion } from 'framer-motion';

const Show_ETFData_Page = () => {
  return (
    <>
  {/* Hero Section - Full Width */}
  <motion.div 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
    className="w-full mt-32 bg-lightBlue-600 rounded-none px-4  sm:px-6 lg:px-8 py-10 shadow-lg"
  >
    <div className="max-w-7xl mx-auto text-center ">
      <h1 className="text-3xl font-bold text-white flex items-center">
        <span>ETF Market Data</span>
      </h1>
      <p className="mt-2 text-lg text-blue-100">
        Real-time stock market information with advanced analytics.
      </p>
    </div>
  </motion.div>

  {/* Main Section */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mt-16"
  >
    {/* Card Table Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      <StockTable />
    </motion.div>

    {/* Footer Section */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-8 text-center text-gray-500 text-sm"
    >
      <p>Data updates every 5 minutes. Last updated: {new Date().toLocaleString()}</p>
    </motion.div>
  </motion.div>
</>

  );
};

export default Show_ETFData_Page;
