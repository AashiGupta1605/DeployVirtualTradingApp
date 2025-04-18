import React from 'react';
import CardTable from '../../components/Common/CardTable';
import { motion } from 'framer-motion';

const Show_Nifty500Data_Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto px-4 mt-32 sm:px-6 lg:px-8 py-8 max-w-7xl"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 relative z-20 bg-lightBlue-600 rounded-xl p-6 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-white flex items-center">
          <span>Nifty 500 Market Data</span>
        </h1>
        <p className="mt-2 text-lg text-indigo-100">
          Comprehensive stock market information covering the top 500 companies.
        </p>
      </motion.div>

      {/* Card Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-xl -mt-36 shadow-lg overflow-hidden border border-gray-100 relative z-10"
      >
        <CardTable tableType="nifty500" />
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
  );
};

export default Show_Nifty500Data_Page;