import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  X,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from 'lucide-react';

const MetricCard = ({ label, value, isHighlighted, type }) => {
  const getHighlightColor = () => {
    if (!isHighlighted) return 'bg-blue-50/80';
    return type === 'positive' ? 'bg-green-50/80' : 'bg-red-50/80';
  };

  const getTextColor = () => {
    if (!isHighlighted) return 'text-gray-900';
    return type === 'positive' ? 'text-green-700' : 'text-red-700';
  };

  return (
    <div className={`px-4 py-2 ${getHighlightColor()} backdrop-blur-sm rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow`}>
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      <div className={`text-sm font-bold tabular-nums ${getTextColor()}`}>{value}</div>
    </div>
  );
};

const ModalHeader = ({ type, onClose, symbol, data, loading, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatValue = (value, formatType = 'number') => {
    if (value === undefined || value === null) return 'N/A';
    
    switch (formatType) {
      case 'currency':
        return `₹${Number(value).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        })}`;
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      case 'volume':
        const num = Number(value);
        if (num >= 10000000) return `${(num / 10000000).toFixed(2)}Cr`;
        if (num >= 100000) return `${(num / 100000).toFixed(2)}L`;
        return num.toLocaleString('en-IN');
      default:
        return value;
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing || loading) return;
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const isPriceUp = data?.lastPrice > data?.previousClose;
  const getPriceChangeColor = () => {
    if (data?.pChange === 0) return 'text-blue-600';
    return data?.pChange > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6 border-b border-gray-200 bg-white">
      {!loading && data ? (
        <div className="flex items-center justify-between">
          {/* Left Side - Company Info and Current Price */}
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-lightBlue-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-105">
              <span className="text-2xl font-bold text-white">{symbol.charAt(0)}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{symbol}</h2>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-2xl font-bold tabular-nums ${getPriceChangeColor()}`}>
                    {formatValue(data.lastPrice, 'currency')}
                  </span>
                  <div className={`flex items-center px-2.5 py-1 rounded-full ${
                    data.pChange > 0 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : data.pChange < 0
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {data.pChange > 0 ? (
                      <ArrowUpRight size={16} className="mr-1" />
                    ) : data.pChange < 0 ? (
                      <ArrowDownRight size={16} className="mr-1" />
                    ) : null}
                    <span className="font-semibold tabular-nums">
                      {formatValue(data.pChange, 'percentage')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {type === 'etf' ? 'ETF' : 'Stock'}
                </span>
                <span className="text-sm text-gray-500">NSE India</span>
              </div>
            </div>
          </div>

          {/* Right Side - OHLCV and Controls */}
          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              <MetricCard 
                label="Open" 
                value={formatValue(data.open, 'currency')}
                isHighlighted={data.open !== data.previousClose}
                type={data.open > data.previousClose ? 'positive' : 'negative'}
              />
              <MetricCard 
                label="High" 
                value={formatValue(data.dayHigh, 'currency')}
                isHighlighted={data.lastPrice === data.dayHigh}
                type="positive"
              />
              <MetricCard 
                label="Low" 
                value={formatValue(data.dayLow, 'currency')}
                isHighlighted={data.lastPrice === data.dayLow}
                type="negative"
              />
              <MetricCard 
                label="Prev. Close" 
                value={formatValue(data.previousClose, 'currency')}
                isHighlighted={false}
              />
              <MetricCard 
                label="Volume" 
                value={formatValue(data.totalTradedVolume, 'volume')}
                isHighlighted={false}
              />
            </div>

            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
              <button
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
                className={`p-2.5 rounded-xl transition-all duration-200 relative group 
                  ${loading || isRefreshing
                    ? 'bg-gray-100 cursor-not-allowed'
                    : 'hover:bg-gray-50 active:bg-gray-100'
                  } border border-gray-200 hover:border-gray-300 shadow-sm`}
                title="Refresh data"
              >
                <RefreshCw 
                  size={18} 
                  className={`text-gray-600 transition-all duration-700 ${
                    isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
                  }`}
                />
              </button>

              <button 
                onClick={onClose}
                className="p-2.5 rounded-xl transition-all duration-200 group hover:bg-gray-50 
                  active:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-sm"
              >
                <X 
                  className="text-gray-600 group-hover:text-gray-800 transition-colors" 
                  size={18} 
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Loading State
        <div className="flex items-center justify-between">
          <div className="animate-pulse flex items-center space-x-6">
            <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-28 h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      )}
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
    open: PropTypes.number,
    dayHigh: PropTypes.number,
    dayLow: PropTypes.number,
    previousClose: PropTypes.number,
    totalTradedVolume: PropTypes.number,
    lastUpdateTime: PropTypes.string
  }),
  onRefresh: PropTypes.func
};

ModalHeader.defaultProps = {
  loading: false,
  data: null,
  onRefresh: () => {}
};

export default ModalHeader;