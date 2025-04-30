// BuySellTab.jsx - Part 1
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  selectActiveEvent,
} from '../../../../../redux/User/events/eventsSlice';
import {
  placeOrder,
  selectLoadingState,
  fetchTransactionHistory,
  selectTransactions,
  selectHoldings,
  selectHoldingBySymbol,
  fetchHoldings,
} from '../../../../../redux/User/trading/tradingSlice';
import { 
  fetchHistoricalData,
  selectCurrentPrice,
  selectPriceAnalysis,
  selectHistoricalData
} from '../../../../../redux/Common/companyDetailsSlice';
import { getUserSubscriptions } from '../../../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import ConfirmationModal from '../../ConformationModal';
import PraedicoAnalysis from './PraedicoAnalysis';
import TransactionHistory from './TransactionHistory';
import TradingControls from './TradingControls';
import MarketStatusOverlay from './../parts/MarketStatusOverlay';
import { isMarketOpen } from '../../../../../utils/marketStatus';

// Helper function to format currency
const formatCurrency = (amount) => {
  if (!amount || isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Helper function to validate order
const validateOrder = (orderDetails, holdings, remainingBalance) => {
  const { type, numberOfShares, price, currentMarketPrice, symbol } = orderDetails;
  const orderValue = numberOfShares * (price || currentMarketPrice);

  if (!numberOfShares || numberOfShares <= 0) {
    throw new Error('Please enter a valid number of shares');
  }

  if (type === 'buy') {
    if (orderValue > remainingBalance) {
      throw new Error('Insufficient balance for this order');
    }
  } else if (type === 'sell') {
    // Case-insensitive symbol matching and proper quantity check
    const currentHolding = holdings.find(h => 
      h.companySymbol.toLowerCase() === symbol.toLowerCase()
    );
    
    if (!currentHolding) {
      throw new Error(`No holdings found for ${symbol}`);
    }
    
    if (currentHolding.quantity < numberOfShares) {
      throw new Error(`Insufficient shares to sell. You only have ${currentHolding.quantity} shares`);
    }
  }

  return true;
};

const BuySellTab = ({ symbol, data, loading, error, onOpenSubscriptionModal }) => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const userId = useSelector((state) => state.user.auth?.user?._id);
  const userSubscriptions = useSelector((state) => 
    state.user.subscriptionPlan?.userSubscriptions || []
  );
  const holdings = useSelector(selectHoldings);
  const currentHolding = useSelector((state) => selectHoldingBySymbol(state, symbol));
  const { loading: tradingLoading } = useSelector(selectLoadingState);
  const activeEvent = useSelector(selectActiveEvent);
  const currentPrice = useSelector(selectCurrentPrice);
  const priceAnalysis = useSelector(selectPriceAnalysis);
  const historicalData = useSelector(selectHistoricalData);

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [orderType, setOrderType] = useState('market');
  const [price, setPrice] = useState(currentPrice);
  const [stopPrice, setStopPrice] = useState(currentPrice);

  // Memoized values
  const safeData = useMemo(() => data || {}, [data]);
  
  const currentMarketPrice = useMemo(() => {
    const price = Number(currentPrice) || 
                 Number(safeData.currentPrice) || 
                 Number(safeData.lastPrice) || 0;
    return isNaN(price) ? 0 : price;
  }, [currentPrice, safeData]);

  const activeSubscription = useMemo(
    () => userSubscriptions.find((sub) => sub.status === 'Active' && !sub.isDeleted),
    [userSubscriptions]
  );

  const calculateRemainingBalance = useMemo(() => {
    if (!activeSubscription) return 0;
    const totalHoldings = holdings.reduce(
      (total, holding) => total + (holding.quantity * holding.averageBuyPrice),
      0
    );
    return activeSubscription.vertualAmount - totalHoldings;
  }, [activeSubscription, holdings]);

  const marketOpen = isMarketOpen();

  // BuySellTab.jsx - Part 2

  // Effects
  useEffect(() => {
    const initializeData = async () => {
      if (symbol && userId) {
        try {
          setIsLoading(true);
          await Promise.all([
            dispatch(fetchHistoricalData({ 
              symbol, 
              type: data?.type || 'nifty50', 
              timeRange: '1M' 
            })),
            dispatch(getUserSubscriptions(userId)),
            dispatch(fetchHoldings(userId)),
            dispatch(fetchTransactionHistory({ userId, symbol }))
          ]);
        } catch (error) {
          console.error('Error initializing data:', error);
          toast.error('Failed to load trading data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeData();
  }, [dispatch, symbol, userId, data?.type]);

  useEffect(() => {
    setPrice(currentMarketPrice);
    setStopPrice(currentMarketPrice);
  }, [currentMarketPrice]);

  useEffect(() => {
    // Reset form when tab changes
    setQuantity(0);
    setOrderType('market');
    setPrice(currentMarketPrice);
    setStopPrice(currentMarketPrice);
  }, [activeTab, currentMarketPrice]);

  // Handlers
  const handleQuantityChange = (value) => {
    let newValue = Math.max(0, parseInt(value) || 0);
    
    if (activeTab === 'buy') {
      const maxAffordable = Math.floor(calculateRemainingBalance / currentMarketPrice);
      newValue = Math.min(newValue, maxAffordable);
    } else {
      const availableShares = currentHolding?.quantity || 0;
      newValue = Math.min(newValue, availableShares);
    }
    
    setQuantity(newValue);
  };

  const handlePriceChange = (value) => {
    const newPrice = Math.max(0, parseFloat(value) || 0);
    setPrice(newPrice);
  };

  const handleStopPriceChange = (value) => {
    const newStopPrice = Math.max(0, parseFloat(value) || 0);
    setStopPrice(newStopPrice);
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    if (type === 'market') {
      setPrice(currentMarketPrice);
      setStopPrice(currentMarketPrice);
    }
  };

  const calculateOrderValue = () => {
    const orderPrice = orderType === 'market' ? currentMarketPrice : price;
    return quantity * orderPrice;
  };

  const handlePlaceOrder = async (orderDetails) => {
    try {
      // Validate order before proceeding
      validateOrder(orderDetails, holdings, calculateRemainingBalance);
  
      // Add additional order metadata
      const enrichedOrderDetails = {
        ...orderDetails,
        symbol,
        currentMarketPrice,
        eventId: activeEvent?._id,
        orderValue: calculateOrderValue(),
        timestamp: new Date().toISOString(),
        subscriptionPlanId: activeSubscription._id // Make sure this is included
      };
  
      // Dispatch order placement
      await dispatch(placeOrder(enrichedOrderDetails)).unwrap();

      // Show success message
      const PORTAL_FEE = 25;
      const orderTotal = orderDetails.total;
      const totalWithFee = orderDetails.type === 'buy' 
        ? orderTotal + PORTAL_FEE 
        : orderTotal - PORTAL_FEE;
  
      // Show success message with correct variables
// Show success message with center position
toast.success(
  `Successfully ${orderDetails.type}${orderDetails.type === 'sell' ? 'sold' : 'bought'} ${orderDetails.numberOfShares} shares of ${symbol} for ₹${totalWithFee.toFixed(2)} (including ₹${PORTAL_FEE} portal fee)`,
  {
    position: 'top-center', // Changed from 'top-right' to 'top-center'
    duration: 3000,
    style: {
      backgroundColor: '#fff',
      padding: '16px',
      color: '#333',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    }
  }
);

// Also update the error toast to match
// toast.error(
//   error.message || 'Failed to place order. Please try again.',
//   {
//     position: 'top-center', // Changed from 'top-right' to 'top-center'
//     duration: 3000,
//     style: {
//       backgroundColor: '#fff',
//       padding: '16px',
//       color: '#333',
//       borderRadius: '8px',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//     }
//   }
// );

      // Reset form and close confirmation
      setShowConfirmation(false);
      setQuantity(0);
      setOrderType('market');
      setPrice(currentMarketPrice);
      setStopPrice(currentMarketPrice);
      
      // Refresh holdings and transaction history
      if (userId) {
        await Promise.all([
          dispatch(fetchHoldings(userId)),
          dispatch(fetchTransactionHistory({ userId, symbol }))
        ]);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to place order. Please try again.', {
        position: 'top-center',
      });
      setShowConfirmation(false);
    }
  };

  // Render helpers
  const renderTradingStats = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 border border-blue-100">
        <h4 className="text-xs sm:text-sm text-gray-600 mb-1">Holdings</h4>
        <p className="text-lg sm:text-xl font-bold text-lightBlue-600">
          {currentHolding?.quantity || 0} shares
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 sm:p-4 border border-green-100">
        <h4 className="text-xs sm:text-sm text-gray-600 mb-1">Avg. Price</h4>
        <p className="text-lg sm:text-xl font-bold text-green-600">
          {formatCurrency(currentHolding?.averageBuyPrice || 0)}
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 border border-purple-100">
        <h4 className="text-xs sm:text-sm text-gray-600 mb-1">Current Value</h4>
        <p className="text-lg sm:text-xl font-bold text-purple-600">
          {formatCurrency((currentHolding?.quantity || 0) * currentMarketPrice)}
        </p>
      </div>
    </div>
  );

  // BuySellTab.jsx - Part 3

  const renderTradingTabs = () => (
    <div className="bg-gray-100 p-0.5 rounded-lg inline-flex gap-1 shadow-sm mb-3 sm:mb-4">
      <button
        onClick={() => setActiveTab('buy')}
        className={`px-4 sm:px-6 py-1 rounded-md text-sm sm:text-base font-semibold ${
          activeTab === 'buy'
            ? 'bg-green-500 text-white'
            : 'text-gray-600 hover:bg-green-50'
        }`}
      >
        Buy
      </button>
      <button
        onClick={() => setActiveTab('sell')}
        className={`px-4 sm:px-6 py-1 rounded-md text-sm sm:text-base font-semibold ${
          activeTab === 'sell'
            ? 'bg-red-500 text-white'
            : 'text-gray-600 hover:bg-red-50'
        }`}
      >
        Sell
      </button>
    </div>
  );

  // const renderOrderSummary = () => (
  //   <div className="bg-gray-50 rounded-lg p-4 mt-4">
  //     <h4 className="text-sm font-semibold text-gray-700 mb-3">Order Summary</h4>
  //     <div className="space-y-2">
  //       <div className="flex justify-between text-sm">
  //         <span className="text-gray-600">Order Type</span>
  //         <span className="font-medium">{orderType.toUpperCase()}</span>
  //       </div>
  //       <div className="flex justify-between text-sm">
  //         <span className="text-gray-600">Quantity</span>
  //         <span className="font-medium">{quantity} shares</span>
  //       </div>
  //       <div className="flex justify-between text-sm">
  //         <span className="text-gray-600">Price per share</span>
  //         <span className="font-medium">
  //           {formatCurrency(orderType === 'market' ? currentMarketPrice : price)}
  //         </span>
  //       </div>
  //       <div className="border-t border-gray-200 my-2 pt-2">
  //         <div className="flex justify-between text-sm font-semibold">
  //           <span className="text-gray-700">Total Value</span>
  //           <span className="text-gray-900">{formatCurrency(calculateOrderValue())}</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // Loading State
  if (loading || tradingLoading || isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded-lg mb-4 w-1/2"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-500 flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">Error Loading Data</span>
          <span className="text-sm">{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-lightBlue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Subscription Check
  const canTrade = activeSubscription?.status === 'Active' && calculateRemainingBalance > 0;
  
  if (!canTrade) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center flex-col gap-4 p-4">
        <div className="text-lg sm:text-xl text-gray-600 text-center">
          {!activeSubscription
            ? 'Please subscribe to start trading'
            : 'Your subscription has expired or has insufficient balance'}
        </div>
        <button
          onClick={onOpenSubscriptionModal}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-lightBlue-600 transition-colors"
        >
          View Subscription Plans
        </button>
      </div>
    );
  }

  // Main Render
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6 relative">
      {!marketOpen && <MarketStatusOverlay tradingPreference={activeSubscription?.tradingPreference} />}

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Side - Trading Controls */}
        <div className="flex-1 bg-gray-50 rounded-xl p-4 sm:p-6">
          {renderTradingStats()}
          {renderTradingTabs()}

          <TradingControls
            activeTab={activeTab}
            currentMarketPrice={currentMarketPrice}
            quantity={quantity}
            setQuantity={handleQuantityChange}
            orderType={orderType}
            setOrderType={handleOrderTypeChange}
            price={price}
            setPrice={handlePriceChange}
            stopPrice={stopPrice}
            setStopPrice={handleStopPriceChange}
            isDisabled={!marketOpen}
            setShowConfirmation={setShowConfirmation}
            calculateTotal={calculateOrderValue}
            maxQuantity={activeTab === 'buy' 
              ? Math.floor(calculateRemainingBalance / currentMarketPrice)
              : currentHolding?.quantity || 0
            }
          />

          {/* {renderOrderSummary()} */}
        </div>

        {/* Right Side - Analysis */}
        <div className="flex-1 bg-gray-50 rounded-xl p-4 sm:p-6">
          <PraedicoAnalysis
            data={{
              lastPrice: currentMarketPrice,
              historicalData: historicalData,
              type: data?.type || 'nifty50',
              priceAnalysis: priceAnalysis
            }}
          />
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <TransactionHistory 
          symbol={symbol}
          currentPrice={currentMarketPrice}
        />
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
  <ConfirmationModal
    isOpen={showConfirmation}
    onClose={() => setShowConfirmation(false)}
    onConfirm={() =>
      handlePlaceOrder({
        userId,
        subscriptionPlanId: activeSubscription._id,
        symbol,
        type: activeTab,
        numberOfShares: quantity,
        price: orderType === 'market' ? currentMarketPrice : price,
        orderType,
        total: calculateOrderValue(),
        currentMarketPrice,
      })
    }
    title="Confirm Order"
    stockName={data?.companyName || symbol}
    quantity={quantity}
    pricePerStock={orderType === 'market' ? currentMarketPrice : price}
    type={activeTab}
  />
)}
    </div>
  );
};

BuySellTab.propTypes = {
  symbol: PropTypes.string.isRequired,
  data: PropTypes.shape({
    type: PropTypes.string,
    companyName: PropTypes.string,
    currentPrice: PropTypes.number,
    lastPrice: PropTypes.number,
    change: PropTypes.number,
    changePercent: PropTypes.number,
    dayHigh: PropTypes.number,
    dayLow: PropTypes.number,
    yearHigh: PropTypes.number,
    yearLow: PropTypes.number,
    volume: PropTypes.number,
    marketCap: PropTypes.number,
    historicalData: PropTypes.array
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onOpenSubscriptionModal: PropTypes.func.isRequired,
};

BuySellTab.defaultProps = {
  data: {
    type: 'nifty50',
    companyName: '',
    currentPrice: 0,
    lastPrice: 0,
    change: 0,
    changePercent: 0,
    dayHigh: 0,
    dayLow: 0,
    yearHigh: 0,
    yearLow: 0,
    volume: 0,
    marketCap: 0,
    historicalData: []
  },
  loading: false,
  error: null,
};

export default BuySellTab;