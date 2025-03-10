
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  placeOrder, 
  selectLoadingState, 
  fetchTransactionHistory, 
  selectTransactions, 
  selectHoldings, 
  selectStatistics, 
  selectHoldingBySymbol, 
  fetchHoldings 
} from '../../../../../redux/User/trading/tradingSlice';
import { getUserSubscriptions } from '../../../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import ConfirmationModal from '../../ConformationModal';
import PraedicoAnalysis from './PraedicoAnalysis';
import TransactionHistory from './TransactionHistory';
import TradingControls from './TradingControls';

const Buy_SellTab = ({ symbol, data, loading, error }) => {
  const dispatch = useDispatch();
    // Safely extract market price
    const safeData = useMemo(() => data || {}, [data]);
    const currentMarketPrice = useMemo(() => safeData.currentPrice || 0, [safeData]);
  
    // State management
    const [activeTab, setActiveTab] = useState('buy');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [virtualAmount, setVirtualAmount] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [orderType, setOrderType] = useState('market');
    const [price, setPrice] = useState(currentMarketPrice);
    const [stopPrice, setStopPrice] = useState(currentMarketPrice);
  
    // Redux selectors
    const userId = useSelector(state => state.user.auth?.user?._id);
    const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
    const transactions = useSelector(selectTransactions);
    const holdings = useSelector(selectHoldings);
    const currentHolding = useSelector(state => selectHoldingBySymbol(state, symbol));
    const statistics = useSelector(selectStatistics);
    const { loading: tradingLoading, orderStatus } = useSelector(selectLoadingState);
      // Active subscription
  const activeSubscription = useMemo(() => 
    userSubscriptions.find(sub => sub.status === 'Active' && !sub.isDeleted),
    [userSubscriptions]
  );

  // Calculate remaining balance
  const calculateRemainingBalance = () => {
    if (!activeSubscription) return 0;
    const totalHoldings = holdings.reduce(
      (total, holding) => total + (holding.quantity * holding.averageBuyPrice), 
      0
    );
    return activeSubscription.vertualAmount - totalHoldings;
  };
    // Effects for resetting prices and quantities
    useEffect(() => {
      setPrice(currentMarketPrice);
      setStopPrice(currentMarketPrice);
    }, [currentMarketPrice]);
  
    useEffect(() => {
      setQuantity(0);
      setOrderType('market');
      setPrice(currentMarketPrice);
      setStopPrice(currentMarketPrice);
    }, [activeTab, currentMarketPrice]);
  
    // Fetch data on component mount or when dependencies change
    useEffect(() => {
      if (userId) {
        dispatch(getUserSubscriptions(userId));
        dispatch(fetchHoldings(userId));
        if (activeSubscription?._id) {
          dispatch(fetchTransactionHistory({ 
            userId, 
            subscriptionPlanId: activeSubscription._id 
          }));
        }
      }
    }, [dispatch, userId, activeSubscription?._id]);
      // Quantity change handler with validation
  const handleQuantityChange = (value) => {
    let newValue = Math.max(0, parseInt(value) || 0);

    // Validate against available balance/holdings
    if (activeTab === 'buy') {
      const maxAffordable = Math.floor(calculateRemainingBalance() / currentMarketPrice);
      newValue = Math.min(newValue, maxAffordable);
    } else {
      const availableShares = currentHolding?.quantity || 0;
      newValue = Math.min(newValue, availableShares);
    }

    setQuantity(newValue);
  };

  // Order placement handler
  const handlePlaceOrder = async (orderDetails) => {
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
      
      setShowConfirmation(false);
    } catch (error) {
      console.error('Order Placement Error:', error);
      toast.error(
        error.message || 'Failed to place order. Please try again.',
        { position: 'top-right' }
      );
      setShowConfirmation(false);
    }
  };


    // Trading eligibility checks
    const canTrade = activeSubscription?.status === 'Active' && calculateRemainingBalance() > 0;
    const isDisabled = loading || tradingLoading;
  
    // Rendering conditions
    if (loading || tradingLoading) {
      return (
        <div className="w-full bg-white rounded-xl shadow-lg p-6 animate-pulse">
          Loading...
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="w-full bg-white rounded-xl shadow-lg p-6 text-center text-red-500">
          Error: {error}
        </div>
      );
    }
  
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
      // Main component render
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex gap-6">
        <div className="flex-1 bg-gray-50 rounded-xl p-6" style={{ flex: '0 0 60%' }}>
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <h4 className="text-sm text-gray-500 mb-2">Account Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm text-gray-500 mb-2">Virtual Amount</h4>
                <p className="text-xl font-bold text-green-600">
                  ₹{virtualAmount !== null 
                    ? virtualAmount.toFixed(2) 
                    : activeSubscription.vertualAmount.toFixed(2)}
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  <p>Plan: {activeSubscription.plan || 'N/A'}</p>
                  <p>Valid till: {new Date(activeSubscription.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm text-gray-500 mb-2">Current Holdings</h4>
                <p className="text-xl font-bold text-blue-600">
                  {currentHolding?.quantity || 0} shares
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Avg. Buy Price: ₹{currentHolding?.averageBuyPrice?.toFixed(2) || '0.00'}
                </p>
                <p className="text-xs text-gray-500">
                  Value: ₹{((currentHolding?.quantity || 0) * currentMarketPrice).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
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
      <TradingControls
        activeTab={activeTab}
        currentMarketPrice={currentMarketPrice}
        quantity={quantity}
        setQuantity={handleQuantityChange}
        orderType={orderType}
        setOrderType={setOrderType}
        price={price}
        setPrice={setPrice}
        stopPrice={stopPrice}
        setStopPrice={setStopPrice}
        isDisabled={isDisabled}
        setShowConfirmation={setShowConfirmation}
        calculateTotal={() => quantity * (orderType === "market" ? currentMarketPrice : price)}
      />
      <div className="bg-gray-50 rounded-xl p-6">
        <TransactionHistory currentPrice={currentMarketPrice} symbol={symbol} />
      </div>
      {showConfirmation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={() => handlePlaceOrder({
            userId,
            subscriptionPlanId: activeSubscription._id,
            symbol,
            type: activeTab,
            numberOfShares: quantity,
            price: orderType === "market" ? currentMarketPrice : price,
            orderType,
            total: quantity * (orderType === "market" ? currentMarketPrice : price),
            currentMarketPrice
          })}
          title="Confirm Order"
          message={`Are you sure you want to ${activeTab} ${quantity} shares at ₹${(orderType === "market" ? currentMarketPrice : price).toFixed(2)}?`}
        />
      )}
    </div>
  );
};
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
};

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
};

export default Buy_SellTab;