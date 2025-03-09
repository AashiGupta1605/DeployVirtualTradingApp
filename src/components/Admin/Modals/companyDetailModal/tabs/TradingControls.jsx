import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Clock, DollarSign, AlertCircle, Plus, Minus, AlertTriangle 
} from 'lucide-react';
import { placeOrder } from '../../../../../redux/User/trading/tradingSlice';
import ConfirmationModal from '../../ConformationModal';
import toast from 'react-hot-toast';

const TradingControls = ({ 
  activeTab,
  symbol,
  currentPrice = 0, // Add default value
  maxQuantity = 0,  // Add default value
}) => {
  const dispatch = useDispatch();

  // Redux selectors with safe defaults
  const { loading = false, error = null } = useSelector(state => state.user.tradingModal || {});
  const userId = useSelector(state => state.user.auth?.user?._id);
  const subscription = useSelector(state => state.user.subscriptionPlan?.userSubscriptions?.[0]);
  const availableBalance = subscription?.vertualAmount || 0;

  // Local state with safe defaults
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(currentPrice || 0);
  const [stopPrice, setStopPrice] = useState(currentPrice || 0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Update price when currentPrice changes
  useEffect(() => {
    if (currentPrice) {
      setPrice(currentPrice);
      setStopPrice(currentPrice);
    }
  }, [currentPrice]);

  // Reset form on tab change
  useEffect(() => {
    setQuantity(0);
    setOrderType("market");
    if (currentPrice) {
      setPrice(currentPrice);
      setStopPrice(currentPrice);
    }
  }, [activeTab, currentPrice]);

  // Basic validation
  if (!currentPrice || currentPrice <= 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-600">
        Loading price data...
      </div>
    );
  }

  // Calculate total with safety check
  const calculateTotal = () => {
    const basePrice = orderType === "market" ? currentPrice : price;
    return (quantity * basePrice) || 0;
  };

  // Handle quantity changes with validation
  const handleQuantityChange = (value) => {
    const parsedValue = parseInt(value) || 0;
    const newQuantity = Math.max(0, Math.min(parsedValue, maxQuantity));
    setQuantity(newQuantity);
  };

  // Place order handler
  const handlePlaceOrder = async () => {
    if (!userId) {
      toast.error('Please login to place orders');
      return;
    }

    if (!subscription?.status === 'Active') {
      toast.error('Please activate your subscription to trade');
      return;
    }

    const total = calculateTotal();
    if (activeTab === 'buy' && total > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }

    try {
      const orderDetails = {
        userId,
        symbol,
        type: activeTab,
        orderType,
        quantity,
        price: orderType === "market" ? currentPrice : price,
        stopPrice: orderType === "stop_loss" || orderType === "stop_buy" ? stopPrice : null,
        total
      };

      await dispatch(placeOrder(orderDetails)).unwrap();
      
      toast.success(
        `${activeTab.toUpperCase()} order placed successfully`,
        { duration: 3000 }
      );

      // Reset form
      setShowConfirmation(false);
      setQuantity(0);
      setOrderType("market");
      setPrice(currentPrice);
      setStopPrice(currentPrice);
    } catch (err) {
      toast.error(err.message || 'Failed to place order');
    }
  };

  // Disable button conditions
  const isDisabled = 
    !userId || 
    quantity === 0 || 
    (activeTab === 'buy' && calculateTotal() > availableBalance) ||
    (activeTab === 'sell' && quantity > maxQuantity) ||
    loading;

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      {/* Balance Display */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-sm text-gray-600">Available Balance</div>
        <div className="text-lg font-semibold text-green-600">
          ₹{availableBalance.toFixed(2)}
        </div>
      </div>

      {/* Quantity Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Quantity (Max: {maxQuantity})
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 0 || loading}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="flex-1 p-2 border rounded text-center"
            min="0"
            max={maxQuantity}
            disabled={loading}
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity || loading}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span>Price per share</span>
          <span>₹{currentPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>
        <div className="flex justify-between font-medium pt-2 border-t">
          <span>Total Amount</span>
          <span>₹{calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={() => setShowConfirmation(true)}
        disabled={isDisabled}
        className={`
          w-full py-2 rounded-lg font-medium text-white
          ${isDisabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : activeTab === 'buy'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          }
        `}
      >
        {loading ? 'Processing...' : `Place ${activeTab.toUpperCase()} Order`}
      </button>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handlePlaceOrder}
        title={`Confirm ${activeTab.toUpperCase()} Order`}
        message={`Are you sure you want to ${activeTab} ${quantity} shares at ₹${currentPrice.toFixed(2)} per share?`}
      />
    </div>
  );
};

TradingControls.propTypes = {
  activeTab: PropTypes.oneOf(['buy', 'sell']).isRequired,
  symbol: PropTypes.string.isRequired,
  currentPrice: PropTypes.number,
  maxQuantity: PropTypes.number,
};

TradingControls.defaultProps = {
  currentPrice: 0,
  maxQuantity: 0,
};

export default TradingControls;