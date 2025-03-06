import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  BarChart,
  BarChart2,
  Clock,
  Info,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';

const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
  disabled = false,
  badge = null,
}) => {
  const baseClasses = `
    flex items-center gap-2 px-6 py-3 
    rounded-lg transition-all duration-300 
    font-medium text-sm focus:outline-none 
    relative hover:bg-gray-50
  `;
  
  const activeClasses = `
    text-lightBlue-600 bg-blue-50 
    shadow-sm hover:bg-blue-50
  `;
  
  const inactiveClasses = `
    text-gray-600 hover:text-gray-900
  `;
  
  const disabledClasses = `
    opacity-50 cursor-not-allowed 
    text-gray-400 hover:bg-transparent
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${active ? activeClasses : disabled ? disabledClasses : inactiveClasses}
      `}
    >
      <Icon size={20} className={active ? 'text-lightBlue-600' : 'text-gray-500'} />
      <span>{label}</span>
      {badge && (
        <span
          className={`
            absolute -top-2 -right-2 
            px-2 py-0.5 text-xs font-bold 
            rounded-full shadow-sm
            ${active 
              ? 'bg-lightBlue-600 text-white' 
              : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

const TabNavigation = ({
  activeTab,
  onTabChange,
  type,
  loading = false,
  availableTabs = ['overview', 'chart', 'historical', 'trading'],
}) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Info,
      tooltip: 'Company overview and key metrics',
    },
    {
      id: 'chart',
      label: 'Price Chart',
      icon: LineChart,
      tooltip: 'Interactive price visualization',
      disabled: type === 'etf',
    },
    {
      id: 'advanced-chart',
      label: 'Advanced Chart',
      icon: BarChart2,
      tooltip: 'Technical analysis tools',
    },
    {
      id: 'trading-view',
      label: 'TradingView',
      icon: TrendingUp,
      tooltip: 'Professional TradingView charts',
      badge: 'PRO',
    },
    {
      id: 'historical',
      label: 'Historical',
      icon: Clock,
      tooltip: 'Historical price data',
    },
    {
      id: 'trading',
      label: 'Trade',
      icon: ShoppingCart,
      tooltip: 'Buy and sell stocks',
      badge: 'LIVE',
    },
  ].filter(tab => availableTabs.includes(tab.id));

  const [tooltipData, setTooltipData] = React.useState({
    visible: false,
    content: '',
    x: 0,
    y: 0,
  });

  const showTooltip = (content, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipData({
      visible: true,
      content,
      x: rect.left + rect.width / 2,
      y: rect.top - 5,
    });
  };

  const hideTooltip = () => {
    setTooltipData(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-lg">
            <div className="w-5 h-5 border-3 border-lightBlue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600 font-medium">Loading...</span>
          </div>
        </div>
      )}

      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="relative"
              onMouseEnter={(e) => showTooltip(tab.tooltip, e)}
              onMouseLeave={hideTooltip}
            >
              <TabButton
                active={activeTab === tab.id}
                onClick={() => !tab.disabled && onTabChange(tab.id)}
                icon={tab.icon}
                label={tab.label}
                disabled={tab.disabled}
                badge={tab.badge}
              />
            </div>
          ))}
        </div>
      </div>

      {tooltipData.visible && (
        <div
          className="absolute z-50 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipData.x,
            top: tooltipData.y,
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {tooltipData.content}
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  badge: PropTypes.string,
};

TabNavigation.propTypes = {
  activeTab: PropTypes.oneOf([
    'overview',
    'chart',
    'advanced-chart',
    'trading-view',
    'historical',
    'trading',
  ]).isRequired,
  onTabChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['nifty', 'etf']).isRequired,
  loading: PropTypes.bool,
  availableTabs: PropTypes.arrayOf(PropTypes.string),
};

TabNavigation.defaultProps = {
  loading: false,
  availableTabs: ['overview', 'chart', 'historical', 'trading'],
};

export default TabNavigation;