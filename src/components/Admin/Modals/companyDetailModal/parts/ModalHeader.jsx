// components/Common/Modals/CompanyDetail/ModalHeader.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { 
  X,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const MetricBadge = ({ label, value, type = 'neutral' }) => {
  const getTypeStyles = () => {
    const styles = {
      positive: 'bg-green-50 text-green-700 border-green-200',
      negative: 'bg-red-50 text-red-700 border-red-200',
      neutral: 'bg-gray-50 text-gray-700 border-gray-200',
      warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      info: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return styles[type] || styles.neutral;
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getTypeStyles()}`}>
      <span className="text-xs font-medium">{label}:</span>
      <span className="ml-1 text-xs font-bold">{value}</span>
    </div>
  );
};

const ModalHeader = ({ type, onClose, symbol, data, loading }) => {
  const formatValue = (value, type = 'number') => {
    if (value === undefined || value === null) return 'N/A';
    
    switch (type) {
      case 'currency':
        return `₹${Number(value).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        })}`;
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      default:
        return value;
    }
  };

  const getMarketStatus = () => {
    if (!data) return { text: 'Unknown', type: 'neutral' };
    
    const currentTime = new Date();
    const marketOpen = currentTime.getHours() >= 9 && currentTime.getHours() < 16;
    const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;

    if (isWeekend) return { text: 'Market Closed (Weekend)', type: 'warning' };
    if (!marketOpen) return { text: 'Market Closed', type: 'neutral' };
    return { text: 'Market Open', type: 'positive' };
  };

  const marketStatus = getMarketStatus();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-lightBlue-50 to-lightBlue-100">
        {/* Left Side - Title */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-chart-line text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {type === 'etf' ? 'ETF Details' : 'Stock Details'}
            </h2>
            <p className="text-sm text-gray-600">
              View detailed {type === 'etf' ? 'ETF' : 'stock'} information and historical data
            </p>
          </div>
        </div>

        {/* Right Side - Symbol Info */}
        {!loading && data && (
          <div className="flex items-center space-x-6">
            {/* Symbol and Type */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lightBlue-500 to-lightBlue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">{symbol.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{symbol}</h3>
                <span className="text-sm text-gray-500">
                  {type === 'etf' ? 'ETF' : 'Stock'}
                </span>
              </div>
            </div>

            {/* Price and Change */}
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatValue(data.lastPrice, 'currency')}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`flex items-center text-sm font-medium ${
                  data.pChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.pChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {formatValue(data.pChange, 'percentage')}
                </span>
                <MetricBadge 
                  label="Status" 
                  value={marketStatus.text} 
                  type={marketStatus.type} 
                />
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="text-gray-500" size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ModalHeader.propTypes = {
  type: PropTypes.oneOf(['nifty', 'etf']).isRequired,
  onClose: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.shape({
    lastPrice: PropTypes.number,
    pChange: PropTypes.number,
    lastUpdateTime: PropTypes.string
  }),
};

ModalHeader.defaultProps = {
  type: 'nifty',
  loading: false,
  data: null,
};

export default ModalHeader;