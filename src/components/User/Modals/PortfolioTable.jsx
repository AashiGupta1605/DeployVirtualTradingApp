import React, { useState, useMemo } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  ShoppingCart,
  Package
} from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Pagination from '../../Common/TableItems/Pagination';
import { selectLoadingState } from '../../../redux/User/trading/tradingSlice';
import { useSelector } from 'react-redux';
import Loader from '../../Common/Loader';

const PortfolioTable = ({ holdings, transactions, onStockClick }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { loading } = useSelector(selectLoadingState);

  // Helper function to calculate stock stats
  const getStockStats = (symbol) => {
    const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
    
    // Calculate total shares bought and sold
    const totalBuyShares = stockTransactions
      .filter(t => t.type === 'buy')
      .reduce((total, transaction) => total + transaction.numberOfShares, 0);
    
    const totalSellShares = stockTransactions
      .filter(t => t.type === 'sell')
      .reduce((total, transaction) => total + transaction.numberOfShares, 0);

    return {
      totalTrades: stockTransactions.length,
      buyTrades: totalBuyShares,
      sellTrades: totalSellShares
    };
  };

  // Helper functions to extract date and time
  const extractDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  // Combine holdings with transaction history to ensure all traded stocks are shown
  const combinedStocks = useMemo(() => {
    // Create a map of existing holdings
    const holdingsMap = new Map(
      holdings.map(holding => [holding.companySymbol, holding])
    );

    // Find unique symbols from transactions
    const transactionSymbols = new Set(
      transactions.map(t => t.companySymbol)
    );

    // Create combined list
    const combinedList = [...holdingsMap.keys(), ...transactionSymbols]
      .filter((symbol, index, self) => 
        self.indexOf(symbol) === index // Ensure unique symbols
      )
      .map(symbol => {
        // Prioritize holding data if exists, otherwise create a minimal object
        const holding = holdingsMap.get(symbol) || {
          companySymbol: symbol,
          quantity: 0,
          averageBuyPrice: 0,
          lastUpdated: transactions
            .filter(t => t.companySymbol === symbol)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]?.createdAt || new Date()
        };

        return holding;
      });

    return combinedList;
  }, [holdings, transactions]);

  // Sort combined stocks in descending order based on `lastUpdated`
  const sortedStocks = [...combinedStocks].sort((a, b) => {
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocks = sortedStocks.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages calculation
  const totalPages = Math.ceil(sortedStocks.length / itemsPerPage);

  if (loading) {
    return <Loader />;
  }

  if (!sortedStocks || sortedStocks.length === 0) {
    return (
      <div className="bg-white rounded shadow-lg overflow-hidden w-full p-8 text-center">
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          📊 No Stock Details Available
        </div>
        <div className="text-lg text-gray-500 mb-6">
          Start trading to see your portfolio history here.
        </div>
        <button
          onClick={() => onStockClick('start-trading')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Trading
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <div className="bg-white rounded shadow-lg overflow-y-auto w-full h-72 px-4">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Avg. Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Current Value</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Trading Activity</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Performance</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentStocks.map((stock) => {
              const stats = getStockStats(stock.companySymbol);
              const currentValue = stock.quantity * (stock.averageBuyPrice || 0);
              const isSoldOut = stock.quantity === 0;

              return (
                <tr
                  key={stock.companySymbol}
                  className={`hover:bg-gray-50 cursor-pointer ${isSoldOut ? 'opacity-50' : ''}`}
                  onClick={() => onStockClick(stock.companySymbol)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {stock.companySymbol}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {stock.quantity} {isSoldOut && '(Sold Out)'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {stock.averageBuyPrice ? `₹${stock.averageBuyPrice.toFixed(2)}` : '₹0.00'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ₹{currentValue.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <span 
                        id={`buy-tooltip-${stock.companySymbol}`}
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center space-x-1`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{stats.buyTrades}</span>
                      </span>
                      <Tooltip 
                        anchorId={`buy-tooltip-${stock.companySymbol}`}
                        content={`${stats.buyTrades} Shares Bought`}
                        place="top"
                      />

                      <span 
                        id={`sell-tooltip-${stock.companySymbol}`}
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center space-x-1`}
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>{stats.sellTrades}</span>
                      </span>
                      <Tooltip 
                        anchorId={`sell-tooltip-${stock.companySymbol}`}
                        content={`${stats.sellTrades} Shares Sold`}
                        place="top"
                      />
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
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {extractDate(stock.lastUpdated)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        filteredItems={sortedStocks}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
      />
    </div>
  );
};

export default PortfolioTable;