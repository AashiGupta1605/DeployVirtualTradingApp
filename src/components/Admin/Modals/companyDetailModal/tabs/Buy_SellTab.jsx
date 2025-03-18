import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// Import components
import TradingControls from './TradingControls';
import PraedicoAnalysis from './PraedicoAnalysis';
import TransactionHistory from './TransactionHistory';
import ConfirmationModal from './../../ConformationModal';

// Import Redux actions and selectors
import {
  placeOrder,
  selectLoadingState,
  fetchTransactionHistory,
  fetchHoldings,
  selectTransactions,
  selectHoldings,
  selectStatistics,
  selectHoldingBySymbol
} from '../../../../../redux/User/trading/tradingSlice';
import {
  getUserSubscriptions,
  selectUserSubscriptions
} from '../../../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';

// Loading Component
const LoadingIndicator = ({ message = "Loading trading data..." }) => (
  <div className="w-full h-96 flex items-center justify-center flex-col">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-600">{message}</p>
  </div>
);

// Error Component
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="w-full bg-white rounded-xl shadow-lg p-6 text-center text-red-500">
    <p>Error: {message}</p>
    <button
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Retry
    </button>
  </div>
);

// Market Timing Utility Hook
const useMarketTiming = () => {
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [nextMarketOpenTime, setNextMarketOpenTime] = useState(null);

  useEffect(() => {
    const checkMarketTiming = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Market is open Monday to Friday, 9:30 AM to 3:30 PM
      const isWeekday = currentDay > 0 && currentDay < 6;
      const isWithinMarketHours = 
        (currentHour > 9 || (currentHour === 9 && currentMinute >= 30)) &&
        (currentHour < 15 || (currentHour === 15 && currentMinute <= 30));

      setIsMarketOpen(isWeekday && isWithinMarketHours);

      // Calculate next market open time
      let nextOpenTime = new Date(now);
      
      if (!isWeekday || !isWithinMarketHours) {
        if (currentDay === 0) { // Sunday
          nextOpenTime.setDate(nextOpenTime.getDate() + 1);
          nextOpenTime.setHours(9, 30, 0, 0);
        } else if (currentDay === 6) { // Saturday
          nextOpenTime.setDate(nextOpenTime.getDate() + 2);
          nextOpenTime.setHours(9, 30, 0, 0);
        } else if (currentHour < 9 || (currentHour === 9 && currentMinute < 30)) {
          nextOpenTime.setHours(9, 30, 0, 0);
        } else {
          nextOpenTime.setDate(nextOpenTime.getDate() + 1);
          nextOpenTime.setHours(9, 30, 0, 0);
        }
      }

      setNextMarketOpenTime(nextOpenTime);
    };

    checkMarketTiming();
    const intervalId = setInterval(checkMarketTiming, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return { isMarketOpen, nextMarketOpenTime };
};

const Buy_SellTab = ({ symbol, data, loading, error, onRefresh = () => {} }) => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);

  // Selectors
  const userId = useSelector(state => state.user.auth?.user?._id);
  const userSubscriptions = useSelector(selectUserSubscriptions);
  const transactions = useSelector(selectTransactions);
  const holdings = useSelector(selectHoldings);
  const currentHolding = useSelector(state => selectHoldingBySymbol(state, symbol));
  const statistics = useSelector(selectStatistics);
  const { loading: tradingLoading, orderStatus } = useSelector(selectLoadingState);

  // Market Timing Hook
  const { isMarketOpen, nextMarketOpenTime } = useMarketTiming();

  // State Management
  const [localState, setLocalState] = useState({
    loading: true,
    error: null,
    activeTab: 'buy',
    showConfirmation: false,
    quantity: 0,
    orderType: 'market',
  });

  // Comprehensive Data Validation
  const safeData = useMemo(() => {
    const defaultData = {
      companyName: symbol || 'Unknown',
      currentPrice: 0,
      change: 0,
      changePercent: 0,
      dayHigh: 0,
      dayLow: 0,
      yearHigh: 0,
      yearLow: 0,
      volume: 0,
      marketCap: 0,
    };

    if (!data) return defaultData;

    return {
      ...defaultData,
      ...Object.keys(defaultData).reduce((acc, key) => {
        acc[key] = data[key] !== undefined ? data[key] : defaultData[key];
        return acc;
      }, {})
    };
  }, [data, symbol]);

  // Active Subscription Selection
  const activeSubscription = useMemo(() => {
    const possibleActiveStatuses = ['Active', 'active', 'ACTIVE'];

    return userSubscriptions.find(sub => 
      possibleActiveStatuses.includes(sub.status) && 
      (!sub.isDeleted || sub.isDeleted === false)
    );
  }, [userSubscriptions]);

  // Current Market Price Calculation
  const currentMarketPrice = useMemo(() => {
    return safeData.currentPrice || 0;
  }, [safeData]);

  // Comprehensive Loading and Error Check
  const isLoading = useMemo(() => {
    const loadingConditions = [
      loading,
      localState.loading,
      tradingLoading,
      !userId,
      !activeSubscription
    ];

    const isCurrentlyLoading = loadingConditions.some(condition => condition);

    console.log('Loading Conditions:', {
      externalLoading: loading,
      localLoading: localState.loading,
      tradingLoading,
      userIdMissing: !userId,
      subscriptionMissing: !activeSubscription
    });

    return isCurrentlyLoading;
  }, [
    loading,
    localState.loading,
    tradingLoading,
    userId,
    activeSubscription
  ]);

  // Error Message Compilation
  const errorMessage = useMemo(() => {
    const errors = [
      localState.error,
      error,
      !userId && 'User not authenticated',
      !activeSubscription && 'No active subscription'
    ].filter(Boolean);

    return errors[0] || null;
  }, [localState.error, error, userId, activeSubscription]);

  // Data Fetching Effect
  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        // Your existing fetch logic
      } catch (err) {
        // Error handling
      }
    };

    if (userId && activeSubscription) {
      fetchData();

      // Add timeout
      timeoutId = setTimeout(() => {
        console.warn('Data fetching timed out');
        setLocalState(prev => ({
          ...prev,
          loading: false,
          error: 'Data fetching timed out'
        }));
      }, 15000); // 15 seconds timeout
    } else {
      setLocalState(prev => ({ 
        ...prev, 
        loading: false 
      }));
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch, userId, symbol, activeSubscription]);

  // Render Loading State
  if (isLoading) {
    return (
      <LoadingIndicator
        message={`Loading trading data for ${symbol}...`}
      />
    );
  }

  // Render Error State
  if (errorMessage) {
    return (
      <ErrorDisplay
        message={errorMessage}
        onRetry={() => {
          onRefresh();
          dispatch(getUserSubscriptions(userId));
        }}
      />
    );
  }

  // Market Closed Check
  if (!isMarketOpen) {
    return (
      <div className="w-full h-96 flex items-center justify-center flex-col gap-4 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Market is Closed</h2>
          <p className="text-gray-600 mb-2">Trading is only available Monday to Friday, 9:30 AM to 3:30 PM IST</p>
          {nextMarketOpenTime && (
            <p className="text-gray-500">Next market open: {nextMarketOpenTime.toLocaleString()}</p>
          )}
        </div>
        <div className="flex space-x-4 mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-blue-700">Market Hours</h3>
            <p className="text-gray-600">Monday - Friday<br />9:30 AM - 3:30 PM IST</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-green-700">Trading Holidays</h3>
            <p className="text-gray-600">Closed on weekends<br />and market holidays</p>
          </div>
        </div>
      </div>
    );
  }

  // Remaining Balance Calculation
  const calculateRemainingBalance = useCallback(() => {
    if (!activeSubscription) return 0;
    const totalHoldings = holdings.reduce(
      (total, holding) => total + (holding.quantity * holding.averageBuyPrice),
      0
    );
    return activeSubscription.vertualAmount - totalHoldings;
  }, [activeSubscription, holdings]);

  // State Update Handlers
  const updateLocalState = useCallback((updates) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Quantity Change Handler
  const handleQuantityChange = useCallback((value) => {
    let newValue = Math.max(0, parseInt(value) || 0);

    if (localState.activeTab === 'buy') {
      const maxAffordable = Math.floor(calculateRemainingBalance() / currentMarketPrice);
      newValue = Math.min(newValue, maxAffordable);
    } else {
      const availableShares = currentHolding?.quantity || 0;
      newValue = Math.min(newValue, availableShares);
    }

    updateLocalState({ quantity: newValue });
  }, [
    localState.activeTab,
    calculateRemainingBalance,
    currentMarketPrice,
    currentHolding,
    updateLocalState
  ]);

  // Order Placement Handler
  const handlePlaceOrder = useCallback(async (orderDetails) => {
    try {
      const result = await dispatch(placeOrder({
        ...orderDetails,
        symbol: orderDetails.symbol,
        currentMarketPrice: orderDetails.currentMarketPrice
      })).unwrap();
      
      toast.success(
        `Successfully placed ${orderDetails.type.toUpperCase()} order for ${orderDetails.numberOfShares} shares at ₹${orderDetails.price.toFixed(2)}`,
        { position: 'top-right' }
      );
      
      updateLocalState({ showConfirmation: false });
    } catch (error) {
      console.error('Order Placement Error:', error);
      toast.error(
        error.message || 'Failed to place order. Please try again.',
        { position: 'top-right' }
      );
      updateLocalState({ showConfirmation: false });
    }
  }, [dispatch, updateLocalState]);

  // Check if trading is possible
  const canTrade = activeSubscription?.status === 'Active' && calculateRemainingBalance() > 0;

  // No active subscription handling
  if (!canTrade) {
    return (
      <div className="w-full h-96 flex items-center justify-center flex-col gap-4">
        <div className="text-xl text-gray-600">
          {!activeSubscription
            ? "Please subscribe to start trading"
            : "Your subscription has expired or has insufficient balance"}
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
        {/* Left Side: Account Summary, Buy/Sell Tabs, and Trading Controls */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6" style={{ flex: '0 0 60%' }}>
          {/* Account Summary - Small Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Shares Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-100">
              <h4 className="text-sm text-gray-600 mb-2">Shares</h4>
              <p className="text-xl font-bold text-blue-600">
                {currentHolding?.quantity || 0}
              </p>
            </div>

            {/* Avg. Buy Price Card */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 shadow-sm border border-green-100">
              <h4 className="text-sm text-gray-600 mb-2">Avg. Buy Price</h4>
              <p className="text-xl font-bold text-green-600">
                ₹{currentHolding?.averageBuyPrice?.toFixed(2) || '0.00'}
              </p>
            </div>

            {/* Value Card */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 shadow-sm border border-purple-100">
              <h4 className="text-sm text-gray-600 mb-2">Value</h4>
              <p className="text-xl font-bold text-purple-600">
                ₹{((currentHolding?.quantity || 0) * currentMarketPrice).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Buy/Sell Tabs */}
          <div className="bg-gray-100 p-0.5 rounded-lg inline-flex gap-1 shadow-md mb-2">
            <button 
              onClick={() => updateLocalState({ activeTab: 'buy' })} 
              className={`px-6 py-1 rounded-md transition-all duration-200 text-lg font-semibold ${
                localState.activeTab === 'buy' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              Buy
            </button>
            <button 
              onClick={() => updateLocalState({ activeTab: 'sell' })} 
              className={`px-6 py-1 rounded-md transition-all duration-200 text-lg font-semibold ${
                localState.activeTab === 'sell' 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-red-50'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Trading Controls Component */}
          <TradingControls
            activeTab={localState.activeTab}
            currentMarketPrice={currentMarketPrice}
            quantity={localState.quantity}
            setQuantity={handleQuantityChange}
            orderType={localState.orderType}
            setOrderType={(type) => updateLocalState({ orderType: type })}
            price={currentMarketPrice}
            setPrice={() => {}} // Not used in this implementation
            stopPrice={currentMarketPrice}
            setStopPrice={() => {}} // Not used in this implementation
            isDisabled={!isMarketOpen || loading || tradingLoading}
            setShowConfirmation={() => updateLocalState({ showConfirmation: true })}
            calculateTotal={() => localState.quantity * currentMarketPrice}
          />
        </div>

        {/* Right Side: Praedico Analysis Component */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6" style={{ flex: '0 0 40%' }}>
          <PraedicoAnalysis 
            data={{ 
              ...safeData, 
              signals: { 
                strongBuy: safeData.change > 5 ? 12 : 6, 
                buy: safeData.pChange > 2 ? 8 : 4, 
                hold: safeData.change === 0 ? 3 : 2, 
                sell: safeData.change < -2 ? 2 : 1, 
                strongSell: safeData.change < -5 ? 1 : 0 
              } 
            }} 
            timeframe="1D" 
          />
        </div>
      </div>

      {/* Transaction History Component */}
      <div className="bg-gray-50 rounded-xl p-6">
        <TransactionHistory currentPrice={currentMarketPrice} symbol={symbol} />
      </div>

      {/* Confirmation Modal */}
      {localState.showConfirmation && (
        <ConfirmationModal
          isOpen={localState.showConfirmation}
          onClose={() => updateLocalState({ showConfirmation: false })}
          onConfirm={() => handlePlaceOrder({
            userId,
            subscriptionPlanId: activeSubscription._id,
            symbol,
            type: localState.activeTab,
            numberOfShares: localState.quantity,
            price: localState.orderType === "market" ? currentMarketPrice : currentMarketPrice,
            orderType: localState.orderType,
            total: localState.quantity * currentMarketPrice,
            currentMarketPrice
          })}
          title="Confirm Order"
          message={`Are you sure you want to ${localState.activeTab} ${localState.quantity} shares at ₹${currentMarketPrice.toFixed(2)}?`}
        />
      )}
    </div>
  );
};

// PropTypes
Buy_SellTab.propTypes = {
  symbol: PropTypes.string.isRequired,
  data: PropTypes.shape({
    companyName: PropTypes.string,
    currentPrice: PropTypes.number,
    change: PropTypes.number,
    changePercent: PropTypes.number,
    dayHigh: PropTypes.number,
    dayLow: PropTypes.number,
    yearHigh: PropTypes.number,
    yearLow: PropTypes.number,
    volume: PropTypes.number,
    marketCap: PropTypes.number,
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func
};

// Default Props
Buy_SellTab.defaultProps = {
  data: {
    companyName: '',
    currentPrice: 0,
    change: 0,
    changePercent: 0,
    dayHigh: 0,
    dayLow: 0,
    yearHigh: 0,
    yearLow: 0,
    volume: 0,
    marketCap: 0,
  },
  loading: false,
  error: null,
  onRefresh: () => {}
};

export default Buy_SellTab;