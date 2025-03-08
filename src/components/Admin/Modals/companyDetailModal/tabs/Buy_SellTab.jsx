import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PraedicoAnalysis from './PraedicoAnalysis';
import TransactionHistory from './TransactionHistory';
import TradingControls from './TradingControls';
import { useTradingContext } from '../hooks/TradingContext';

const Buy_SellTab = ({ symbol, data, loading, error }) => {
  const { state, dispatch } = useTradingContext();
  const [activeTab, setActiveTab] = useState('buy');

  const {
    dayHigh = data?.dayHigh || 0,
    dayLow = data?.dayLow || 0,
    yearHigh = data?.yearHigh || 0,
    yearLow = data?.yearLow || 0,
    volume = data?.totalTradedVolume || 0,
    marketCap = data?.marketCap || 0,
    currentPrice = data?.lastPrice || 0,
  } = data || {};

  const handlePlaceOrder = (orderDetails) => {
    if (orderDetails.type === 'buy' && orderDetails.total > state.balance) {
      alert('Insufficient balance');
      return;
    }

    if (orderDetails.type === 'sell' && orderDetails.quantity > state.holdings) {
      alert('Insufficient holdings');
      return;
    }

    dispatch({
      type: 'PLACE_ORDER',
      payload: orderDetails,
    });

    alert(`${orderDetails.type.toUpperCase()} order placed successfully`);
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex gap-6">
        {/* Trading Information */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6" style={{ flex: '0 0 60%' }}>
          {/* Trading Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="text-sm text-gray-500 mb-1">Day's Range</h4>
              <p className="text-base font-semibold">
                <span className="text-green-600">₹{dayHigh.toFixed(2)}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-red-600">₹{dayLow.toFixed(2)}</span>
              </p>
              <div className="mt-4">
                <h4 className="text-sm text-gray-500 mb-1">Volume</h4>
                <p className="text-base font-semibold">{volume.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="text-sm text-gray-500 mb-1">52 Week Range</h4>
              <p className="text-base font-semibold">
                <span className="text-green-600">₹{yearHigh.toFixed(2)}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-red-600">₹{yearLow.toFixed(2)}</span>
              </p>
              <div className="mt-4">
                <h4 className="text-sm text-gray-500 mb-1">Market Cap</h4>
                <p className="text-base font-semibold">₹{marketCap.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <h4 className="text-sm text-gray-500 mb-2">Account Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm text-gray-500 mb-2">Available Balance</h4>
                <p className="text-xl font-bold text-green-600">₹{state.balance.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm text-gray-500 mb-2">Current Holdings</h4>
                <p className="text-xl font-bold text-blue-600">{state.holdings} shares</p>
              </div>
            </div>
          </div>

          {/* Buy/Sell Controls */}
          <div className="bg-gray-100 p-1 rounded-lg inline-flex gap-2 shadow-md">
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-10 py-3 rounded-md transition-all duration-200 text-lg font-semibold ${
                activeTab === 'buy'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`px-10 py-3 rounded-md transition-all duration-200 text-lg font-semibold ${
                activeTab === 'sell'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-red-50'
              }`}
            >
              Sell
            </button>
          </div>
        </div>

        {/* Praedico Analysis */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6" style={{ flex: '0 0 40%' }}>
          <PraedicoAnalysis
            data={{
              ...data,
              signals: {
                strongBuy: data?.change > 5 ? 12 : 6,
                buy: data?.pChange > 2 ? 8 : 4,
                hold: data?.change === 0 ? 3 : 2,
                sell: data?.change < -2 ? 2 : 1,
                strongSell: data?.change < -5 ? 1 : 0,
              },
            }}
            timeframe="1D"
          />
        </div>
      </div>

      {/* Trading Controls */}
      <TradingControls
        activeTab={activeTab}
        currentPrice={currentPrice}
        onPlaceOrder={handlePlaceOrder}
        maxQuantity={activeTab === 'sell' ? state.holdings : Math.floor(state.balance / currentPrice)}
        availableBalance={state.balance}
      />

      {/* Transaction History */}
      <div className="bg-gray-50 rounded-xl p-6">
        <TransactionHistory />
      </div>
    </div>
  );
};

Buy_SellTab.propTypes = {
  symbol: PropTypes.string.isRequired,
  data: PropTypes.shape({
    lastPrice: PropTypes.number,
    change: PropTypes.number,
    pChange: PropTypes.number,
    dayHigh: PropTypes.number,
    dayLow: PropTypes.number,
    yearHigh: PropTypes.number,
    yearLow: PropTypes.number,
    totalTradedVolume: PropTypes.number,
    marketCap: PropTypes.number,
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default Buy_SellTab;