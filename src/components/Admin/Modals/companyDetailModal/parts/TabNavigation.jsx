// TabNavigation.jsx
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  BarChart2,
  Clock,
  Info,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';

const TabButton = memo(({
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
});

const BalanceCard = memo(({ balance, plan, validTill }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      <div className="space-y-1">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-gray-500">Available Balance</span>
          <span className="text-lg font-semibold text-green-600">
            ₹{balance.toLocaleString('en-IN', { 
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Plan:</span>
            <span className="font-medium text-gray-700">{plan}</span>
          </div>
          <div className="flex justify-between">
            <span>Valid till:</span>
            <span className="font-medium text-gray-700">{validTill}</span>
          </div>
        </div>
      </div>
    </div>
  );
});



const AccountSummaryCards = memo(({ data }) => {
  if (!data) return null;

  return (
    <div className="min-w-[200px]">
      <BalanceCard 
        balance={data.balance}
        plan={data.plan}
        validTill={data.validTill}
      />
    </div>
  );
});

const TabNavigation = memo(({
  activeTab,
  onTabChange,
  type,
  loading = false,
  availableTabs = ['overview', 'historical', 'trading-view', 'trading'],
  accountSummary = null
}) => {
  const allTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Info,
    },
    {
      id: 'historical',
      label: 'Historical',
      icon: Clock,
    },
    {
      id: 'trading-view',
      label: 'TradingView',
      icon: TrendingUp,
      badge: 'PRO',
    },
    {
      id: 'trading',
      label: 'Trade',
      icon: ShoppingCart,
      badge: 'LIVE',
    },
  ];

  const visibleTabs = allTabs.filter(tab => availableTabs.includes(tab.id));

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {visibleTabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
                icon={tab.icon}
                label={tab.label}
                badge={tab.badge}
              />
            ))}
          </div>

          {/* Account Summary Cards */}
          {accountSummary && (
            <div className="ml-4">
              <AccountSummaryCards data={accountSummary} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Add display names for debugging
TabButton.displayName = 'TabButton';
BalanceCard.displayName = 'BalanceCard';

AccountSummaryCards.displayName = 'AccountSummaryCards';
TabNavigation.displayName = 'TabNavigation';

// PropTypes
TabButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  badge: PropTypes.string,
};

BalanceCard.propTypes = {
  balance: PropTypes.number.isRequired,
  plan: PropTypes.string.isRequired,
  validTill: PropTypes.string.isRequired,
};



AccountSummaryCards.propTypes = {
  data: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    plan: PropTypes.string.isRequired,
    validTill: PropTypes.string.isRequired,
    initialAmount: PropTypes.number.isRequired,
    currentHoldings: PropTypes.number,
    avgBuyPrice: PropTypes.number,
    currentValue: PropTypes.number,
  }),
};

TabNavigation.propTypes = {
  activeTab: PropTypes.oneOf([
    'overview',
    'historical',
    'trading-view',
    'trading',
  ]).isRequired,
  onTabChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['nifty50', 'nifty500', 'etf']).isRequired,
  loading: PropTypes.bool,
  availableTabs: PropTypes.arrayOf(PropTypes.string),
  accountSummary: PropTypes.shape({
    balance: PropTypes.number,
    plan: PropTypes.string,
    validTill: PropTypes.string,
    initialAmount: PropTypes.number,
    currentHoldings: PropTypes.number,
    avgBuyPrice: PropTypes.number,
    currentValue: PropTypes.number,
  }),
};

TabNavigation.defaultProps = {
  loading: false,
  availableTabs: ['overview', 'historical', 'trading-view', 'trading'],
  accountSummary: null,
};

export default TabNavigation;