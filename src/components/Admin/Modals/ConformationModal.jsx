import React from "react";

const PORTAL_FEE = 25;

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  stockName,
  quantity,
  pricePerStock,
  type // 'buy' or 'sell'
}) => {
  // Calculate amounts
  const stockTotal = (quantity * pricePerStock).toFixed(2);
  const totalWithFee = type === 'buy' 
    ? (quantity * pricePerStock + PORTAL_FEE).toFixed(2)
    : (quantity * pricePerStock - PORTAL_FEE).toFixed(2);
  
  // Format the confirmation message with matching layout from TradingControls
  const formattedMessage = stockName && quantity && pricePerStock
    ? (
      <div className="space-y-2">
        <p className="mb-4">
          Are you sure you want to {type} {quantity} {quantity === 1 ? 'stock' : 'stocks'} of {stockName}?
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span>Stock Price:</span>
            <span>₹{pricePerStock.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Quantity:</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between">
            <span>Stock Total:</span>
            <span>₹{stockTotal}</span>
          </div>
          <div className="flex justify-between text-orange-600">
            <span>Portal Fee:</span>
            <span>₹{PORTAL_FEE.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>{type === 'buy' ? 'Total Cost:' : 'Net Proceeds:'}</span>
              <span className={type === 'buy' ? 'text-red-600' : 'text-green-600'}>
                ₹{totalWithFee}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
    : message;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className={`relative w-full max-w-md mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Confirm {type === 'buy' ? 'Purchase' : 'Sale'}
          </h2>
          <div className="mt-4 text-gray-600">{formattedMessage}</div>
          <div className="mt-6 flex justify-end space-x-4">
            <button 
              onClick={onClose} 
              className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className={`px-6 py-3 rounded-xl text-white transition-colors duration-200 ${
                type === 'buy' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {type === 'buy' ? 'Confirm Buy' : 'Confirm Sell'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;