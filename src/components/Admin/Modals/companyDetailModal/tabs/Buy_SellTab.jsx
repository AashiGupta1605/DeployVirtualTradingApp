import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Clock,
  DollarSign,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
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
import toast from 'react-hot-toast';

const Buy_SellTab = ({ symbol, data, loading, error }) => {
  const dispatch = useDispatch();
  
  // Safe data handling
  const safeData = data || {};
  const currentMarketPrice = safeData.currentPrice || 0;

  // Debug log
  useEffect(() => {
    console.log('Buy_SellTab Data:', {
      data,
      currentMarketPrice,
      safeData
    });
  }, [data, currentMarketPrice]);

  // State management
  const [activeTab, setActiveTab] = useState('buy');
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(currentMarketPrice);
  const [stopPrice, setStopPrice] = useState(currentMarketPrice);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Redux selectors
  const userId = useSelector(state => state.user.auth?.user?._id);
  const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
  const transactions = useSelector(selectTransactions);
  const holdings = useSelector(selectHoldings);
  const currentHolding = useSelector(state => selectHoldingBySymbol(state, symbol));
  const statistics = useSelector(selectStatistics);
  const { loading: tradingLoading, orderStatus } = useSelector(selectLoadingState);

  // Get active subscription
  const activeSubscription = userSubscriptions.find(sub => 
    sub.status === 'Active' && !sub.isDeleted
  );

  // Order Types Configuration
  const orderTypes = {
    market: {
      label: "Market Order",
      icon: Clock,
      hint: "Execute immediately at market price"
    },
    limit: {
      label: "Limit Order",
      icon: DollarSign,
      hint: activeTab === "buy" ? "Buy at or below this price" : "Sell at or above this price"
    },
    [activeTab === "sell" ? "stop_loss" : "stop_buy"]: {
      label: activeTab === "sell" ? "Stop Loss" : "Stop Buy",
      icon: AlertCircle,
      hint: activeTab === "sell" ? "Sell when price falls to trigger" : "Buy when price rises to trigger"
    }
  };
    // Helper functions
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
  
    const calculateRemainingBalance = () => {
      if (!activeSubscription) return 0;
      
      const totalHoldings = holdings.reduce((total, holding) => {
        return total + (holding.quantity * holding.averageBuyPrice);
      }, 0);
      
      return activeSubscription.vertualAmount - totalHoldings;
    };
  
    const calculateTotal = () => {
      const orderPrice = orderType === "market" ? currentMarketPrice : price;
      return quantity * orderPrice;
    };
  
    // Effects
    useEffect(() => {
      if (userId) {
        dispatch(getUserSubscriptions(userId));
      }
    }, [dispatch, userId]);
  
    useEffect(() => {
      if (userId && activeSubscription?._id) {
        dispatch(fetchTransactionHistory({
          userId,
          subscriptionPlanId: activeSubscription._id
        }));
      }
    }, [dispatch, userId, activeSubscription?._id]);
  
    useEffect(() => {
      if (currentMarketPrice > 0) {
        setPrice(currentMarketPrice);
        setStopPrice(currentMarketPrice);
      }
    }, [currentMarketPrice]);
  
    useEffect(() => {
      setQuantity(0);
      setOrderType("market");
      setPrice(currentMarketPrice);
      setStopPrice(currentMarketPrice);
    }, [activeTab, currentMarketPrice]);
  
    // Trading Controls Helper Functions
    const handleQuantityChange = (value) => {
      let newValue;
      if (typeof value === 'string') {
        newValue = parseInt(value) || 0;
      } else {
        newValue = value;
      }
      
      // Ensure value is not negative
      newValue = Math.max(0, newValue);
  
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
  
    const incrementQuantity = () => {
      handleQuantityChange(quantity + 1);
    };
  
    const decrementQuantity = () => {
      handleQuantityChange(quantity - 1);
    };
  
    // Order validation
    const validateOrder = () => {
      if (!activeSubscription) {
        throw new Error('No active subscription found');
      }
  
      if (activeSubscription.status !== 'Active') {
        throw new Error('Your subscription is not active');
      }
  
      if (new Date() > new Date(activeSubscription.endDate)) {
        throw new Error('Your subscription has expired');
      }
  
      if (!quantity || quantity <= 0) {
        throw new Error('Please enter a valid quantity');
      }
  
      // Price validation based on order type
      if (orderType === "market") {
        if (!currentMarketPrice || currentMarketPrice <= 0) {
          throw new Error('Market price is not available');
        }
      } else {
        if (!price || price <= 0) {
          throw new Error('Please enter a valid price');
        }
        if (orderType === 'stop_loss' || orderType === 'stop_buy') {
          if (!stopPrice || stopPrice <= 0) {
            throw new Error('Please enter a valid stop price');
          }
        }
      }
  
      const total = calculateTotal();
      const availableBalance = calculateRemainingBalance();
  
      if (activeTab === 'buy') {
        if (total > availableBalance) {
          throw new Error(`Insufficient balance. Required: ₹${total.toFixed(2)}, Available: ₹${availableBalance.toFixed(2)}`);
        }
      } else {
        const availableShares = currentHolding?.quantity || 0;
        if (quantity > availableShares) {
          throw new Error(`Insufficient shares. Required: ${quantity}, Available: ${availableShares}`);
        }
      }
    };
  
    // Order placement
    const handlePlaceOrder = async () => {
      try {
        if (!userId || !activeSubscription?._id) {
          throw new Error('User or subscription not found');
        }
  
        validateOrder();

        
  
        const orderPrice = orderType === "market" ? currentMarketPrice : price;
        const orderTotal = quantity * orderPrice;
  
        const orderDetails = {
          userId,
          subscriptionPlanId: activeSubscription._id,
          symbol,
          type: activeTab,
          numberOfShares: quantity,
          price: orderPrice,
          orderType,
          total: orderTotal
        };
  
        // Debug log
        console.log('Placing order:', {
          ...orderDetails,
          currentMarketPrice,
          calculatedTotal: orderTotal
        });
  
        const result = await dispatch(placeOrder(orderDetails)).unwrap();
  
        toast.success(
          `Successfully placed ${activeTab.toUpperCase()} order for ${quantity} shares at ₹${orderPrice.toFixed(2)}`,
          {
            duration: 4000,
            position: "top-center",
            style: {
              background: activeTab === "buy" ? "#dcfce7" : "#fee2e2",
              color: activeTab === "buy" ? "#166534" : "#991b1b",
              border: `1px solid ${activeTab === "buy" ? "#bbf7d0" : "#fecaca"}`,
            },
          }
        );
  
        await dispatch(fetchHoldings(userId));
        // Refresh data
        await dispatch(fetchTransactionHistory({
          userId,
          subscriptionPlanId: activeSubscription._id
        }));
  
        // Reset form
        setShowConfirmation(false);
        setQuantity(0);
        setOrderType("market");
        setPrice(currentMarketPrice);
        setStopPrice(currentMarketPrice);
  
        return result;
  
      } catch (error) {
        console.error('Order placement failed:', {
          error,
          orderType: activeTab,
          symbol,
          quantity,
          price: orderType === "market" ? currentMarketPrice : price
        });
        
        toast.error(
          error.message || 'Failed to place order. Please try again.',
          {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #fecaca",
            },
          }
        );
  
        setShowConfirmation(false);
        throw error;
      }
    };
  
    // Trading status checks
    const canTrade = activeSubscription?.status === 'Active' && calculateRemainingBalance() > 0;
    const isDisabled = quantity === 0 || loading || tradingLoading;
      // UI Components
  const renderAccountSummary = () => {
    if (!activeSubscription) {
      return (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-700">No active subscription found</p>
        </div>
      );
    }

    // Safe value calculations
    const balance = calculateRemainingBalance();
    const vertualAmount = activeSubscription.vertualAmount || 0;
    const currentQuantity = currentHolding?.quantity || 0;
    const avgBuyPrice = currentHolding?.averageBuyPrice || 0;
    const currentValue = currentQuantity * currentMarketPrice;

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <h4 className="text-sm text-gray-500 mb-2">Account Summary</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm text-gray-500 mb-2">Available Balance</h4>
            <p className="text-xl font-bold text-green-600">
              ₹{balance.toFixed(2)}
            </p>
            <div className="text-xs text-gray-500 mt-1">
              <p>Plan: {activeSubscription.plan || 'N/A'}</p>
              <p>Valid till: {formatDate(activeSubscription.endDate)}</p>
              <p>Initial Amount: ₹{vertualAmount.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm text-gray-500 mb-2">Current Holdings</h4>
            <p className="text-xl font-bold text-blue-600">
              {currentQuantity} shares
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Avg. Buy Price: ₹{avgBuyPrice.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              Value: ₹{currentValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Loading State
  if (loading || tradingLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-500">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Error Loading Data</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Subscription Check
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

  // Main Component Return
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex gap-6">
        {/* Trading Information */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6" style={{ flex: '0 0 60%' }}>
          {/* Account Summary */}
          {renderAccountSummary()}

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
              ...safeData,
              signals: {
                strongBuy: safeData.change > 5 ? 12 : 6,
                buy: safeData.pChange > 2 ? 8 : 4,
                hold: safeData.change === 0 ? 3 : 2,
                sell: safeData.change < -2 ? 2 : 1,
                strongSell: safeData.change < -5 ? 1 : 0,
              },
            }}
            timeframe="1D"
          />
        </div>
      </div>
            {/* Trading Controls Section */}
            <div className="bg-gray-50 rounded-2xl shadow-lg p-4 space-y-4">
        {/* Order Type Buttons */}
        <div className="flex gap-2">
          {Object.entries(orderTypes).map(([type, { label, icon: Icon, hint }]) => (
            <button
              key={type}
              type="button"
              onClick={() => setOrderType(type)}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors
                ${
                  orderType === type
                    ? activeTab === "sell"
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-green-50 text-green-600 border border-green-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              title={hint}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Left Column: Quantity Input */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Quantity</span>
                <span className="text-xs text-gray-500">
                  Current Price: ₹{currentMarketPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  disabled={quantity <= 0}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="flex-1 text-center text-lg font-bold bg-gray-50 py-2 rounded-lg"
                  min="0"
                />
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Quick Selection Options */}
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-2">Quick Select:</div>
                <div className="flex flex-wrap gap-2">
                  {[5, 10, 25, 50, 100].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleQuantityChange(value)}
                      className={`
                        px-3 py-1.5 text-sm rounded-lg transition-all
                        ${quantity === value 
                          ? 'bg-blue-100 text-blue-600 font-medium' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Controls */}
            {orderType !== "market" && (
              <div className="bg-white p-3 rounded-lg space-y-2">
                <label className="text-sm text-gray-700">
                  {orderType === "limit" ? "Limit Price" : "Stop Price"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={orderType === "limit" ? price : stopPrice}
                    onChange={(e) => {
                      const value = Math.max(0, parseFloat(e.target.value) || 0);
                      orderType === "limit" ? setPrice(value) : setStopPrice(value);
                    }}
                    className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-lg"
                    step="0.01"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Price</span>
                <span className="font-medium">₹{currentMarketPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium">{quantity}</span>
              </div>
              {orderType !== "market" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {orderType === "limit" ? "Limit Price" : "Stop Price"}
                  </span>
                  <span className="font-medium">
                    ₹{(orderType === "limit" ? price : stopPrice).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-blue-600">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={() => setShowConfirmation(true)}
          disabled={isDisabled}
          className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${
            isDisabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
            activeTab === "sell" ? "bg-red-500 hover:bg-red-600 text-white" :
            "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Place {activeTab.toUpperCase()} Order
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-50 rounded-xl p-6">
        <TransactionHistory 
          currentPrice={currentMarketPrice}
          symbol={symbol}
        />
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handlePlaceOrder}
          title="Confirm Order"
          message={`Are you sure you want to ${activeTab} ${quantity} shares at ₹${(
            orderType === "market" ? currentMarketPrice : price
          ).toFixed(2)}?`}
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
    marketCap: 0
  },
  loading: false,
  error: null,
};

export default Buy_SellTab;