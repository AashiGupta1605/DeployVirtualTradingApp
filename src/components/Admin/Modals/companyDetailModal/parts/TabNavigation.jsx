import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
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
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex items-center gap-2 px-5 py-2.5 
        rounded-lg transition-all duration-300 
        font-medium text-sm focus:outline-none 
        transform hover:scale-102.5
        ${active 
          ? 'text-blue-600 bg-blue-50 shadow-sm translate-y-[-1px]' 
          : disabled 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }
      `}
    >
      <Icon 
        size={18} 
        className={`transition-colors duration-200 ${
          active ? 'text-blue-600' : 'text-gray-500'
        }`} 
      />
      <span className="relative">
        {label}
        {active && (
          <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-blue-600 rounded-full" />
        )}
      </span>
      {badge && (
        <span className={`
          absolute -top-2 -right-2 
          px-2 py-0.5 text-xs font-bold 
          rounded-full shadow-sm
          transform transition-transform duration-200
          ${active 
            ? 'bg-blue-600 text-white scale-110' 
            : 'bg-gray-100 text-gray-600'
          }
        `}>
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
    },
    {
      id: 'advanced-chart',
      label: 'Advanced Chart',
      icon: BarChart2,
    },
    {
      id: 'trading-view',
      label: 'TradingView',
      icon: TrendingUp,
      badge: 'PRO',
    },
    {
      id: 'historical',
      label: 'Historical',
      icon: Clock,
    },
    {
      id: 'trading',
      label: 'Trade',
      icon: ShoppingCart,
      badge: 'LIVE',
    },
  ].filter(tab => availableTabs.includes(tab.id));

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl transition-all duration-300">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600 font-medium">Loading...</span>
          </div>
        </div>
      )}

      <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              icon={tab.icon}
              label={tab.label}
              disabled={tab.disabled}
              badge={tab.badge}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

TabNavigation.propTypes = {
  activeTab: PropTypes.oneOf([
    'overview',
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

export default TabNavigation;