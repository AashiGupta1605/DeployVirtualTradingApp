import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const PortfolioTable = ({ holdings, transactions, onStockClick }) => {
  const getStockStats = (symbol) => {
    const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
    const buyTransactions = stockTransactions.filter(t => t.type === 'buy');
    const sellTransactions = stockTransactions.filter(t => t.type === 'sell');
    
    return {
      totalTrades: stockTransactions.length,
      buyTrades: buyTransactions.length,
      sellTrades: sellTransactions.length
    };
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden w-full">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Avg. Price</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Current Value</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Trades</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Performance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {holdings.map((holding) => {
            const stats = getStockStats(holding.companySymbol);
            const currentValue = holding.quantity * holding.averageBuyPrice;
            
            return (
              <tr 
                key={holding.companySymbol}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onStockClick(holding.companySymbol)}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {holding.companySymbol}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{holding.quantity}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    ₹{holding.averageBuyPrice.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    ₹{currentValue.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <span className="text-sm text-green-600">
                      {stats.buyTrades} Buy
                    </span>
                    <span className="text-sm text-red-600">
                      {stats.sellTrades} Sell
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm">
                    {currentValue > 0 ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className="ml-1">0.00%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;