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
  const safeData = useMemo(() => data || {}, [data]);
  const currentMarketPrice = useMemo(() => safeData.currentPrice || 0, [safeData]);

  const [activeTab, setActiveTab] = useState('buy');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [virtualAmount, setVirtualAmount] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [orderType, setOrderType] = useState('market');
  const [price, setPrice] = useState(currentMarketPrice);
  const [stopPrice, setStopPrice] = useState(currentMarketPrice);

  const userId = useSelector(state => state.user.auth?.user?._id);
  const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
  const transactions = useSelector(selectTransactions);
  const holdings = useSelector(selectHoldings);
  const currentHolding = useSelector(state => selectHoldingBySymbol(state, symbol));
  const statistics = useSelector(selectStatistics);
  const { loading: tradingLoading, orderStatus } = useSelector(selectLoadingState);

  const activeSubscription = useMemo(() => 
    userSubscriptions.find(sub => sub.status === 'Active' && !sub.isDeleted),
    [userSubscriptions]
  );

  const calculateRemainingBalance = () => {
    if (!activeSubscription) return 0;
    const totalHoldings = holdings.reduce(
      (total, holding) => total + (holding.quantity * holding.averageBuyPrice), 
      0
    );
    return activeSubscription.vertualAmount - totalHoldings;
  };

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

  const handleQuantityChange = (value) => {
    let newValue = Math.max(0, parseInt(value) || 0);

    if (activeTab === 'buy') {
      const maxAffordable = Math.floor(calculateRemainingBalance() / currentMarketPrice);
      newValue = Math.min(newValue, maxAffordable);
    } else {
      const availableShares = currentHolding?.quantity || 0;
      newValue = Math.min(newValue, availableShares);
    }

    setQuantity(newValue);
  };

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

  const canTrade = activeSubscription?.status === 'Active' && calculateRemainingBalance() > 0;
  const isDisabled = loading || tradingLoading;

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
              onClick={() => setActiveTab('buy')} 
              className={`px-6 py-1 rounded-md transition-all duration-200 text-lg font-semibold ${
                activeTab === 'buy' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              Buy
            </button>
            <button 
              onClick={() => setActiveTab('sell')} 
              className={`px-6 py-1 rounded-md transition-all duration-200 text-lg font-semibold ${
                activeTab === 'sell' 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-red-50'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Trading Controls */}
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
        </div>

        {/* Right Side: Praedico Analysis */}
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

      {/* Transaction History at the Bottom */}
      <div className="bg-gray-50 rounded-xl p-6">
        <TransactionHistory currentPrice={currentMarketPrice} symbol={symbol} />
      </div>

      {/* Confirmation Modal */}
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