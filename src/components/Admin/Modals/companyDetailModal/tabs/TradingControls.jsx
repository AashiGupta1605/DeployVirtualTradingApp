// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { 
//   Clock,
//   DollarSign,
//   AlertCircle,
//   Plus,
//   Minus
// } from 'lucide-react';
// import { useTradingContext } from '../hooks/TradingContext';
// import ConfirmationModal from '../../ConformationModal';
// import toast from 'react-hot-toast';

// const TradingControls = ({ 
//   activeTab,
//   currentPrice,
//   onPlaceOrder,
//   maxQuantity
// }) => {
//   const { state } = useTradingContext();
//   const [orderType, setOrderType] = useState("market");
//   const [quantity, setQuantity] = useState(0);
//   const [price, setPrice] = useState(currentPrice);
//   const [stopPrice, setStopPrice] = useState(currentPrice);
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   useEffect(() => {
//     setPrice(currentPrice);
//     setStopPrice(currentPrice);
//   }, [currentPrice]);

//   useEffect(() => {
//     setQuantity(0);
//     setOrderType("market");
//     setPrice(currentPrice);
//     setStopPrice(currentPrice);
//   }, [activeTab, currentPrice]);

//   const orderTypes = {
//     market: {
//       label: "Market Order",
//       icon: Clock,
//       hint: "Execute immediately at market price"
//     },
//     limit: {
//       label: "Limit Order",
//       icon: DollarSign,
//       hint: activeTab === "buy" ? "Buy at or below this price" : "Sell at or above this price"
//     },
//     [activeTab === "sell" ? "stop_loss" : "stop_buy"]: {
//       label: activeTab === "sell" ? "Stop Loss" : "Stop Buy",
//       icon: AlertCircle,
//       hint: activeTab === "sell" ? "Sell when price falls to trigger" : "Buy when price rises to trigger"
//     }
//   };

//   const handleQuantityChange = (value) => {
//     const newQuantity = Math.max(0, Math.min(parseInt(value) || 0, maxQuantity));
//     setQuantity(newQuantity);
//   };

//   const calculateTotal = () => quantity * (orderType === "market" ? currentPrice : price);

//   const confirmOrder = () => {
//     const orderDetails = {
//       type: activeTab,
//       orderType,
//       quantity,
//       price: orderType === "market" ? currentPrice : price,
//       stopPrice,
//       total: calculateTotal()
//     };

//     try {
//       onPlaceOrder(orderDetails);
      
//       // Success toast
//       toast.success(
//         `Successfully placed ${activeTab} order for ${quantity} shares at ₹${(
//           orderType === "market" ? currentPrice : price
//         ).toFixed(2)}`,
//         {
//           duration: 4000,
//           position: 'top-center',
//           style: {
//             background: activeTab === 'buy' ? '#dcfce7' : '#fee2e2',
//             color: activeTab === 'buy' ? '#166534' : '#991b1b',
//             border: `1px solid ${activeTab === 'buy' ? '#bbf7d0' : '#fecaca'}`,
//           },
//         }
//       );

//       // Reset form
//       setShowConfirmation(false);
//       setQuantity(0);
//     } catch (error) {
//       // Error toast
//       toast.error(
//         `Failed to place order: ${error.message}`,
//         {
//           duration: 4000,
//           position: 'top-center',
//         }
//       );
//     }
//   };

//   const isDisabled = quantity === 0 || 
//     (activeTab === 'buy' && calculateTotal() > state.balance) ||
//     (activeTab === 'sell' && quantity > state.holdings);

//   return (
//     <div className="bg-gray-50 rounded-2xl shadow-lg p-4 space-y-4">
//       {/* Order Type Buttons */}
//       <div className="flex gap-2">
//         {Object.entries(orderTypes).map(([type, { label, icon: Icon, hint }]) => (
//           <button
//             key={type}
//             onClick={() => setOrderType(type)}
//             className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors
//               ${
//                 orderType === type
//                   ? activeTab === "sell"
//                     ? "bg-red-50 text-red-600 border border-red-200"
//                     : "bg-green-50 text-green-600 border border-green-200"
//                   : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//               }`}
//             title={hint}
//           >
//             <Icon size={16} />
//             <span>{label}</span>
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         {/* Left Column: Quantity Input */}
//         <div className="space-y-4">
//           <div className="bg-white p-3 rounded-lg">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm text-gray-700">Quantity (Max: {maxQuantity})</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleQuantityChange(quantity - 1)}
//                 className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={quantity <= 0}
//               >
//                 <Minus size={16} />
//               </button>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => handleQuantityChange(e.target.value)}
//                 className="flex-1 text-center text-lg font-bold bg-gray-50 py-2 rounded-lg"
//                 min="0"
//                 max={maxQuantity}
//               />
//               <button
//                 onClick={() => handleQuantityChange(quantity + 1)}
//                 className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={quantity >= maxQuantity}
//               >
//                 <Plus size={16} />
//               </button>
//             </div>
            
//             {/* Quick Selection Options */}
//             <div className="mt-3">
//               <div className="text-xs text-gray-500 mb-2">Quick Select:</div>
//               <div className="flex flex-wrap gap-2">
//                 {[5, 10, 25, 50, 100].map((value) => (
//                   <button
//                     key={value}
//                     onClick={() => handleQuantityChange(value)}
//                     className={`
//                       px-3 py-1.5 text-sm rounded-lg transition-all
//                       ${quantity === value 
//                         ? 'bg-blue-100 text-blue-600 font-medium' 
//                         : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
//                       }
//                       ${value > maxQuantity ? 'opacity-50 cursor-not-allowed' : ''}
//                     `}
//                     disabled={value > maxQuantity}
//                   >
//                     {value}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Price Controls */}
//           {orderType !== "market" && (
//             <div className="bg-white p-3 rounded-lg space-y-2">
//               <label className="text-sm text-gray-700">
//                 {orderType === "limit" ? "Limit Price" : "Stop Price"}
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//                 <input
//                   type="number"
//                   value={orderType === "limit" ? price : stopPrice}
//                   onChange={(e) => {
//                     const value = Math.max(0, parseFloat(e.target.value) || 0);
//                     orderType === "limit" ? setPrice(value) : setStopPrice(value);
//                   }}
//                   className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-lg"
//                   step="0.01"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Column: Order Summary */}
//         <div className="bg-white p-4 rounded-lg">
//           <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h4>
//           <div className="space-y-3">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Market Price</span>
//               <span className="font-medium">₹{currentPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Quantity</span>
//               <span className="font-medium">{quantity}</span>
//             </div>
//             {orderType !== "market" && (
//               <div className="flex justify-between">
//                 <span className="text-gray-600">
//                   {orderType === "limit" ? "Limit Price" : "Stop Price"}
//                 </span>
//                 <span className="font-medium">
//                   ₹{(orderType === "limit" ? price : stopPrice).toFixed(2)}
//                 </span>
//               </div>
//             )}
//             <div className="pt-3 border-t">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Total Amount</span>
//                 <span className="font-semibold text-blue-600">₹{calculateTotal().toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-gray-600">Available {activeTab === 'buy' ? 'Balance' : 'Holdings'}</span>
//                 <span className="font-medium text-green-600">
//                   {activeTab === 'buy' 
//                     ? `₹${state.balance.toFixed(2)}`
//                     : `${state.holdings} shares`
//                   }
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Place Order Button */}
//       <button
//         onClick={() => setShowConfirmation(true)}
//         disabled={isDisabled}
//         className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${
//           isDisabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
//           activeTab === "sell" ? "bg-red-500 hover:bg-red-600 text-white" :
//           "bg-green-500 hover:bg-green-600 text-white"
//         }`}
//       >
//         Place {activeTab.toUpperCase()} Order
//       </button>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={showConfirmation}
//         onClose={() => setShowConfirmation(false)}
//         onConfirm={confirmOrder}
//         title="Confirm Order"
//         message={`Are you sure you want to ${activeTab} ${quantity} shares at ₹${(
//           orderType === "market" ? currentPrice : price
//         ).toFixed(2)}?`}
//       />
//     </div>
//   );
// };

// TradingControls.propTypes = {
//   activeTab: PropTypes.oneOf(['buy', 'sell']).isRequired,
//   currentPrice: PropTypes.number.isRequired,
//   onPlaceOrder: PropTypes.func.isRequired,
//   maxQuantity: PropTypes.number.isRequired
// };

// export default TradingControls;





// redux implemented

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Clock,
  DollarSign,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
import ConfirmationModal from '../../ConformationModal';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const TradingControls = ({ 
  activeTab,
  currentPrice,
  onPlaceOrder,
  maxQuantity
}) => {
  const { balance, holdings, transactions } = useSelector((state) => state.user.userTrading);
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(currentPrice);
  const [stopPrice, setStopPrice] = useState(currentPrice);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setPrice(currentPrice);
    setStopPrice(currentPrice);
  }, [currentPrice]);

  useEffect(() => {
    setQuantity(0);
    setOrderType("market");
    setPrice(currentPrice);
    setStopPrice(currentPrice);
  }, [activeTab, currentPrice]);

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

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(0, Math.min(parseInt(value) || 0, maxQuantity));
    setQuantity(newQuantity);
  };

  const calculateTotal = () => quantity * (orderType === "market" ? currentPrice : price);

  const confirmOrder = () => {
    const orderDetails = {
      type: activeTab,
      orderType,
      quantity,
      price: orderType === "market" ? currentPrice : price,
      stopPrice,
      total: calculateTotal()
    };

    try {
      onPlaceOrder(orderDetails);
      
      // Success toast
      toast.success(
        `Successfully placed ${activeTab} order for ${quantity} shares at ₹${(
          orderType === "market" ? currentPrice : price
        ).toFixed(2)}`,
        {
          duration: 4000,
          position: 'top-center',
          style: {
            background: activeTab === 'buy' ? '#dcfce7' : '#fee2e2',
            color: activeTab === 'buy' ? '#166534' : '#991b1b',
            border: `1px solid ${activeTab === 'buy' ? '#bbf7d0' : '#fecaca'}`,
          },
        }
      );

      // Reset form
      setShowConfirmation(false);
      setQuantity(0);
    } catch (error) {
      // Error toast
      toast.error(
        `Failed to place order: ${error.message}`,
        {
          duration: 4000,
          position: 'top-center',
        }
      );
    }
  };

  const isDisabled = quantity === 0 || 
    (activeTab === 'buy' && calculateTotal() > balance) ||
    (activeTab === 'sell' && quantity > holdings);

  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg p-4 space-y-4">
      {/* Order Type Buttons */}
      <div className="flex gap-2">
        {Object.entries(orderTypes).map(([type, { label, icon: Icon, hint }]) => (
          <button
            key={type}
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
              <span className="text-sm text-gray-700">Quantity (Max: {maxQuantity})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 0}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="flex-1 text-center text-lg font-bold bg-gray-50 py-2 rounded-lg"
                min="0"
                max={maxQuantity}
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity >= maxQuantity}
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
                    onClick={() => handleQuantityChange(value)}
                    className={`
                      px-3 py-1.5 text-sm rounded-lg transition-all
                      ${quantity === value 
                        ? 'bg-blue-100 text-blue-600 font-medium' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }
                      ${value > maxQuantity ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={value > maxQuantity}
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
              <span className="font-medium">₹{currentPrice.toFixed(2)}</span>
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
                <span className="font-semibold text-blue-600">₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Available {activeTab === 'buy' ? 'Balance' : 'Holdings'}</span>
                <span className="font-medium text-green-600">
                  {activeTab === 'buy' 
                    ? `₹${balance.toFixed(2)}`
                    : `${holdings} shares`
                  }
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmOrder}
        title="Confirm Order"
        message={`Are you sure you want to ${activeTab} ${quantity} shares at ₹${(
          orderType === "market" ? currentPrice : price
        ).toFixed(2)}?`}
      />
    </div>
  );
};

TradingControls.propTypes = {
  activeTab: PropTypes.oneOf(['buy', 'sell']).isRequired,
  currentPrice: PropTypes.number.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
  maxQuantity: PropTypes.number.isRequired
};

export default TradingControls;