import React from 'react';
import { User, Wallet, TrendingUp, TrendingDown, BookUser } from 'lucide-react';

const PortfolioHeader = ({ user, statistics, balance }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">

      <div className="grid grid-cols-3 gap-4">

        {/* Left - User Info */}
        <div className="flex items-center space-x-2">
            <BookUser className="" size={28} />
            <h2 className="text-xl font-bold text-gray-800 flex items-center flex-grow">
            My Portfolio</h2>
        </div>

        {/* Center - Balance */}
        {/* <div className="flex items-center justify-center space-x-4">
          <div className="p-3 bg-green-50 rounded-full">
            <Wallet className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">₹{balance.toFixed(2)}</h3>
            <p className="text-sm text-gray-500">Available Balance</p>
          </div>
        </div> */}

        {/* Right - Trade Stats */}
        <div className="flex items-center justify-end space-x-6">
          <div className="text-center">
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xl font-semibold">{statistics.buyTrades}</span>
            </div>
            <p className="text-sm text-gray-500">Buy Trades</p>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-2 text-red-600">
              <TrendingDown className="w-5 h-5" />
              <span className="text-xl font-semibold">{statistics.sellTrades}</span>
            </div>
            <p className="text-sm text-gray-500">Sell Trades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;