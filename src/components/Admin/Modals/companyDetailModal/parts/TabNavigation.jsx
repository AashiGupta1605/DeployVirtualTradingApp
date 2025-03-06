// components/Common/Modals/CompanyDetail/TabNavigation.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { 
  LineChart, 
  BarChart,
  BarChart2, 
  Clock, 
  Info,
  AlertCircle,
  ShoppingCart // Add this import for the buy/sell icon
} from 'lucide-react';

const TabButton = ({ 
  active, 
  onClick, 
  icon: Icon, 
  label, 
  disabled = false,
  badge = null 
}) => {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue-500";
  const activeClasses = "bg-lightBlue-500 text-white shadow-md hover:bg-lightBlue-600";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  const disabledClasses = "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${active ? activeClasses : disabled ? disabledClasses : inactiveClasses}
        relative
      `}
    >
      <Icon size={18} />
      <span className="font-medium text-sm">{label}</span>
      {badge && (
        <span className={`
          absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded-full
          ${active ? 'bg-white text-lightBlue-500' : 'bg-lightBlue-500 text-white'}
        `}>
          {badge}
        </span>
      )}
      {/* {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg">
          <AlertCircle className="text-gray-400" size={16} />
          <span className="ml-1 text-xs text-gray-500">Not Available</span>
        </div>
      )} */}
    </button>
  );
};

const TabNavigation = ({ 
  activeTab, 
  onTabChange, 
  type,
  loading = false,
  availableTabs = ['overview', 'chart', 'historical', 'trading']
}) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Info,
      tooltip: 'General information and key metrics'
    },
    {
      id: 'chart',
      label: 'Price Chart',
      icon: LineChart,
      tooltip: 'Interactive price chart visualization',
      disabled: type === 'etf'
    },
    {
      id: 'advanced-chart',
      label: 'Advanced Chart',
      icon: BarChart2,
      tooltip: 'Advanced technical analysis chart'
    },
    {
      id: 'historical',
      label: 'Historical Data',
      icon: Clock,
      tooltip: 'Past trading data and statistics'
    },
    {
      id: 'trading', // New tab
      label: 'Buy/Sell',
      icon: ShoppingCart,
      tooltip: 'Trade stocks and view transactions',
      badge: 'Live' // Optional badge
    }
  ];

  // Custom hook for handling tooltips
  const useTooltip = () => {
    const [tooltip, setTooltip] = React.useState({ visible: false, content: '', x: 0, y: 0 });

    const showTooltip = (content, event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltip({
        visible: true,
        content,
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    };

    const hideTooltip = () => {
      setTooltip({ ...tooltip, visible: false });
    };

    return { tooltip, showTooltip, hideTooltip };
  };

  const { tooltip, showTooltip, hideTooltip } = useTooltip();

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-lightBlue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
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

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-20 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1/2 -translate-x-1/2"></div>
        </div>
      )}

      {/* Tab Description
      <div className="mt-4 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          {tabs.find(tab => tab.id === activeTab)?.tooltip}
        </p>
      </div> */}
    </div>
  );
};

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  badge: PropTypes.string
};

TabNavigation.propTypes = {
  activeTab: PropTypes.oneOf(['overview', 'chart', 'advanced-chart', 'historical', 'trading']).isRequired,
  onTabChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['nifty', 'etf']).isRequired,
  loading: PropTypes.bool,
  availableTabs: PropTypes.arrayOf(PropTypes.string)
};

TabNavigation.defaultProps = {
  loading: false,
  availableTabs: ['overview', 'chart', 'historical', 'trading']
};

export default TabNavigation;