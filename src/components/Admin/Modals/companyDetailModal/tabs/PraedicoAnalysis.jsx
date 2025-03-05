import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  BarChart2,
  RefreshCcw
} from 'lucide-react';

const AnalysisMeter = ({ signals, className }) => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [meterPosition, setMeterPosition] = useState(50);

  const totalSignals = Object.values(signals).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const calculatePosition = () => {
      const weights = {
        strongSell: signals.strongSell * 0,
        sell: signals.sell * 25,
        hold: signals.hold * 50,
        buy: signals.buy * 75,
        strongBuy: signals.strongBuy * 100
      };
      const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
      return totalWeight / totalSignals;
    };

    const newPosition = calculatePosition();
    setMeterPosition(newPosition);
  }, [signals, totalSignals]);

  const sections = [
    { name: 'Strong Sell', color: 'bg-red-500', value: signals.strongSell },
    { name: 'Sell', color: 'bg-orange-400', value: signals.sell },
    { name: 'Hold', color: 'bg-yellow-400', value: signals.hold },
    { name: 'Buy', color: 'bg-blue-400', value: signals.buy },
    { name: 'Strong Buy', color: 'bg-green-500', value: signals.strongBuy }
  ];

  return (
    <div className={`relative py-6 ${className}`}>
      {/* Meter Background */}
      <div className="h-3 rounded-full overflow-hidden flex">
        {sections.map((section) => (
          <div
            key={section.name}
            className={`flex-1 ${section.color} relative group cursor-pointer transition-all duration-200`}
            onMouseEnter={() => setHoveredSection(section.name)}
            onMouseLeave={() => setHoveredSection(null)}
            data-tooltip-id="section-tooltip"
            data-tooltip-content={`${section.name}: ${section.value} signals`}
          >
            {hoveredSection === section.name && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                {section.name}: {section.value} signals
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="border-4 border-transparent border-t-gray-800" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Indicator Needle */}
      <div
        className="absolute w-0.5 h-6 bg-gray-800 transform -translate-x-1/2 cursor-pointer transition-all duration-500"
        style={{ left: `${meterPosition}%`, top: '0' }}
        data-tooltip-id="needle-tooltip"
        data-tooltip-content={`Signal Strength: ${meterPosition.toFixed(1)}%`}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-gray-800 -mt-1 -ml-1" />
      </div>

      {/* Labels and Counts */}
      <div className="flex justify-between mt-3">
        {sections.map((section) => (
          <div
            key={section.name}
            className="text-center group relative cursor-pointer"
            onMouseEnter={() => setHoveredSection(section.name)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <span className={`hidden md:block text-xs font-medium ${
              section.name.includes('Strong') ? 'text-xs' : 'text-sm'
            }`}>
              {section.name.split(' ').map(word => (
                <span key={word} className="block">{word}</span>
              ))}
            </span>
            <span className="md:hidden text-xs font-medium">
              {section.name.split(' ').map(word => word[0]).join('')}
            </span>
            <span className="text-xs text-gray-500 mt-1 block">
              {section.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PraedicoAnalysis = ({ data, timeframe = '1D' }) => {
  const [selectedTime, setSelectedTime] = useState(timeframe);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const timeframes = [
    { label: '1M', value: '1M' },
    { label: '5M', value: '5M' },
    { label: '15M', value: '15M' },
    { label: '1H', value: '1H' },
    { label: '4H', value: '4H' },
    { label: '1D', value: '1D' }
  ];

  const refreshAnalysis = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getRecommendation = () => {
    const { strongBuy, buy, hold, sell, strongSell } = data.signals;
    const buySignals = strongBuy * 2 + buy;
    const sellSignals = strongSell * 2 + sell;
    
    if (buySignals > sellSignals * 1.5) return 'STRONG BUY';
    if (buySignals > sellSignals) return 'BUY';
    if (sellSignals > buySignals * 1.5) return 'STRONG SELL';
    if (sellSignals > buySignals) return 'SELL';
    return 'HOLD';
  };

  const recommendation = getRecommendation();

  const getRecommendationColor = () => {
    switch (recommendation) {
      case 'STRONG BUY': return 'text-green-600';
      case 'BUY': return 'text-blue-600';
      case 'HOLD': return 'text-yellow-600';
      case 'SELL': return 'text-orange-600';
      case 'STRONG SELL': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case 'STRONG BUY':
      case 'BUY':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'STRONG SELL':
      case 'SELL':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <Activity className="w-6 h-6 text-yellow-500" />;
    }
  };

  const indicators = [
    { name: 'RSI', value: data.rsi || 45, type: data.rsi > 70 ? 'overbought' : data.rsi < 30 ? 'oversold' : 'neutral' },
    { name: 'MACD', value: data.macd || 'Bullish', type: 'bullish' },
    { name: 'MA', value: data.ma || 'Above', type: 'above' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-5 w-full md:w-[700px] max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-800">Praedico Analysis</h2>
          <button 
            onClick={refreshAnalysis}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCcw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {timeframes.map((time) => (
            <button
              key={time.value}
              onClick={() => setSelectedTime(time.value)}
              className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
                selectedTime === time.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
          {getRecommendationIcon()}
          <h3 className={`text-2xl font-bold ${getRecommendationColor()}`}>
            {recommendation}
          </h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Based on technical analysis
        </p>
      </div>

      {/* Analysis Meter */}
      <AnalysisMeter signals={data.signals} className="mb-6" />

      {/* Technical Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center border-t pt-4">
        {indicators.map((indicator) => (
          <div key={indicator.name} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">{indicator.name}</p>
            <p className={`text-sm font-semibold ${
              indicator.type === 'bullish' ? 'text-green-600' :
              indicator.type === 'bearish' ? 'text-red-600' :
              'text-blue-600'
            }`}>
              {indicator.value}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Analysis */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">Volume Analysis</h4>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Volume Trend</span>
            <span className="text-sm font-medium text-green-600">Increasing</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">Price Action</h4>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Trend Direction</span>
            <span className="text-sm font-medium text-blue-600">Upward</span>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <Tooltip id="section-tooltip" />
      <Tooltip id="needle-tooltip" />
    </div>
  );
};

PraedicoAnalysis.propTypes = {
  data: PropTypes.shape({
    signals: PropTypes.shape({
      strongBuy: PropTypes.number,
      buy: PropTypes.number,
      hold: PropTypes.number,
      sell: PropTypes.number,
      strongSell: PropTypes.number,
    }),
    rsi: PropTypes.number,
    macd: PropTypes.string,
    ma: PropTypes.string,
  }).isRequired,
  timeframe: PropTypes.string,
};

AnalysisMeter.propTypes = {
  signals: PropTypes.shape({
    strongBuy: PropTypes.number,
    buy: PropTypes.number,
    hold: PropTypes.number,
    sell: PropTypes.number,
    strongSell: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};

export default PraedicoAnalysis;