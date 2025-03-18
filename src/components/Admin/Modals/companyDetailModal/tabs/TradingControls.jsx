import React from 'react';
import PropTypes from 'prop-types';
import { Clock, DollarSign, AlertCircle, Plus, Minus } from 'lucide-react';

const TradingControls = ({
  activeTab,
  currentMarketPrice,
  quantity,
  setQuantity,
  orderType,
  setOrderType,
  price,
  setPrice,
  stopPrice,
  setStopPrice,
  isDisabled,
  setShowConfirmation,
  calculateTotal,
}) => {
  const orderTypes = {
    market: { 
      label: "Market Order", 
      icon: Clock, 
      hint: "Execute immediately at market price" 
    },
    limit: { 
      label: "Limit Order", 
      icon: DollarSign, 
      hint: activeTab === "buy" 
        ? "Buy at or below this price" 
        : "Sell at or above this price" 
    },
    [activeTab === "sell" ? "stop_loss" : "stop_buy"]: { 
      label: activeTab === "sell" ? "Stop Loss" : "Stop Buy", 
      icon: AlertCircle, 
      hint: activeTab === "sell" 
        ? "Sell when price falls to trigger" 
        : "Buy when price rises to trigger" 
    },
  };

  const handleQuantityChange = (value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setQuantity(newValue);
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  const isButtonDisabled = isDisabled || quantity === 0;

  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg p-4 space-y-4">
      {/* Order Type Selection */}
      <div className="flex gap-2">
        {Object.entries(orderTypes).map(([type, { label, icon: Icon, hint }]) => (
          <button
            key={type}
            type="button"
            onClick={() => setOrderType(type)}
            className={`
              flex-1 flex items-center justify-center gap-2 p-2 
              rounded-lg text-sm font-medium transition-colors 
              ${orderType === type 
                ? (activeTab === "sell" 
                  ? "bg-red-50 text-red-600 border border-red-200" 
                  : "bg-green-50 text-green-600 border border-green-200")
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            title={hint}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Quantity and Order Summary Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column: Quantity Input */}
        <div className="space-y-4">
          {/* Quantity Control */}
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

            {/* Quick Select Buttons */}
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
                      }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Control for Limit/Stop Orders */}
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
        // disabled={isDisabled} 
        disabled={isButtonDisabled} 
        className={`
          w-full py-2.5 rounded-lg font-semibold transition-colors 
          ${isButtonDisabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
            : activeTab === "sell" 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
      >
        Place {activeTab.toUpperCase()} Order
      </button>
    </div>
  );
};

TradingControls.propTypes = {
  activeTab: PropTypes.oneOf(['buy', 'sell']).isRequired,
  currentMarketPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  orderType: PropTypes.string.isRequired,
  setOrderType: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  setPrice: PropTypes.func.isRequired,
  stopPrice: PropTypes.number.isRequired,
  setStopPrice: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  setShowConfirmation: PropTypes.func.isRequired,
  calculateTotal: PropTypes.func.isRequired
};

TradingControls.defaultProps = {
  activeTab: 'buy',
  currentMarketPrice: 0,
  quantity: 0,
  orderType: 'market',
  price: 0,
  stopPrice: 0,
  isDisabled: false
};

export default TradingControls;