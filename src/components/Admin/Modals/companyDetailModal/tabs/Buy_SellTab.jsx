// Buy_SellTab.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTradingContext } from '../hooks/TradingContext';
import PraedicoAnalysis from './PraedicoAnalysis';
import TransactionHistory from './TransactionHistory';
import TradingControls from './TradingControls';
import { fetchTransactionHistory } from '../../../../../redux/User/trading/tradingSlice';
import { getUserSubscriptions } from '../../../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import toast from 'react-hot-toast';

const Buy_SellTab = ({ symbol, data, loading, error }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('buy');
  
  // Trading Context
  const { state: tradingState } = useTradingContext();
  
  // Redux selectors
  const userData = useSelector(state => state.user.auth.user);
  const userId = useSelector(state => state.user.auth?.user?._id);
  const subscription = useSelector(state => state.user.subscriptionPlan?.userSubscriptions?.[0]);
  const virtualAmount = subscription?.vertualAmount || tradingState.balance || 0;

  // Fetch initial data
  useEffect(() => {
    if (userId) {
      dispatch(fetchTransactionHistory(userId));
      dispatch(getUserSubscriptions(userId));
    }
  }, [dispatch, userId]);

  // Calculate holdings from trading context
  const holdings = tradingState.holdings || 0;

  // Extract stock data with safe defaults
  const {
    dayHigh = data?.dayHigh || 0,
    dayLow = data?.dayLow || 0,
    yearHigh = data?.yearHigh || 0,
    yearLow = data?.yearLow || 0,
    totalTradedVolume = data?.totalTradedVolume || 0,
    marketCap = data?.marketCap || 0,
    lastPrice = data?.lastPrice || 0,
  } = data || {};

  // Check if trading is allowed
  const canTrade = subscription?.status === 'Active' || tradingState.balance > 0;

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

  if (!canTrade) {
    return (
      <div className="w-full h-96 flex items-center justify-center flex-col gap-4">
        <div className="text-xl text-gray-600">
          Please subscribe to start trading
        </div>
        <button
          onClick={() => toast.error('Subscription feature coming soon')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Subscription Plans
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex gap-6">
        {/* Trading Information */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6" style={{ flex: '0 0 60%' }}>
          {/* Account Summary - Dynamic Amount */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <h4 className="text-sm text-gray-500 mb-2">Account Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm text-gray-500 mb-2">Available Balance</h4>
                <p className="text-xl font-bold text-green-600">
                  ₹{virtualAmount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {subscription?.plan && `Plan: ${subscription.plan} | Valid till: ${new Date(subscription?.endDate).toLocaleDateString()}`}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm text-gray-500 mb-2">Current Holdings</h4>
                <p className="text-xl font-bold text-blue-600">{holdings} shares</p>
                <p className="text-xs text-gray-500 mt-1">
                  Value: ₹{(holdings * lastPrice).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Trading Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* ... Rest of your trading metrics code ... */}
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
        symbol={symbol}
        currentPrice={lastPrice}
        maxQuantity={activeTab === 'sell' 
          ? holdings 
          : Math.floor(virtualAmount / lastPrice)
        }
        availableBalance={virtualAmount}
      />

      {/* Transaction History */}
      <div className="bg-gray-50 rounded-xl p-6">
        <TransactionHistory 
          transactions={tradingState.transactions}
          currentPrice={lastPrice}
        />
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

Buy_SellTab.defaultProps = {
  data: {},
  loading: false,
  error: null,
};

export default Buy_SellTab;