// components/Common/Modals/CompanyDetail/Tabs/OverviewTab.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { 
  Clock, 
  Award, 
  BarChart2, 
  Percent,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const StatItem = ({ label, value, change }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-500">{label}</span>
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-900">{value}</span>
      {change && (
        <span className={`text-xs font-medium flex items-center ${
          change.startsWith('+') ? 'text-green-600' : 'text-red-600'
        }`}>
          {change.startsWith('+') ? 
            <ArrowUpRight size={14} className="mr-0.5" /> : 
            <ArrowDownRight size={14} className="mr-0.5" />
          }
          {change}
        </span>
      )}
    </div>
  </div>
);

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="flex items-center space-x-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
      <Icon size={16} className="text-gray-600" />
      <h3 className="text-sm font-medium text-gray-800">{title}</h3>
    </div>
    <div className="p-4 divide-y divide-gray-100">
      {children}
    </div>
  </div>
);

const OverviewTab = ({ data, loading, error }) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] bg-red-50 rounded-xl border border-red-200 p-6">
        <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
        <p className="text-red-800 font-medium text-lg">Error Loading Overview</p>
        <p className="text-red-600 text-sm mt-2">{error}</p>
      </div>
    );
  }

  const formatValue = (value, type = 'number') => {
    if (value === undefined || value === null) return 'N/A';
    
    switch (type) {
      case 'currency':
        return `₹${Number(value).toLocaleString('en-IN', {
          maximumFractionDigits: 2
        })}`;
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      case 'volume':
        return Number(value).toLocaleString('en-IN');
      default:
        return value;
    }
  };

  const formatChange = (value) => {
    if (value === undefined || value === null) return null;
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Trading Information */}
      <SectionCard title="Trading Information" icon={Clock}>
        <StatItem 
          label="Open Price" 
          value={formatValue(data?.open, 'currency')}
        />
        <StatItem 
          label="Previous Close" 
          value={formatValue(data?.previousClose, 'currency')}
        />
        <StatItem 
          label="Day High" 
          value={formatValue(data?.dayHigh, 'currency')}
        />
        <StatItem 
          label="Day Low" 
          value={formatValue(data?.dayLow, 'currency')}
        />
      </SectionCard>

      {/* Performance Metrics */}
      <SectionCard title="Performance Metrics" icon={Award}>
        <StatItem 
          label="52 Week High" 
          value={formatValue(data?.yearHigh, 'currency')}
        />
        <StatItem 
          label="52 Week Low" 
          value={formatValue(data?.yearLow, 'currency')}
        />
        <StatItem 
          label="Price Change" 
          value={formatValue(data?.change, 'currency')}
          change={formatChange(data?.pChange)}
        />
      </SectionCard>

      {/* Return Statistics */}
      <SectionCard title="Return Statistics" icon={Percent}>
        <StatItem 
          label="1 Month Return" 
          value={formatValue(data?.perChange30d, 'percentage')}
          change={formatChange(data?.perChange30d)}
        />
        <StatItem 
          label="3 Month Return" 
          value={formatValue(data?.perChange90d, 'percentage')}
          change={formatChange(data?.perChange90d)}
        />
        <StatItem 
          label="1 Year Return" 
          value={formatValue(data?.perChange365d, 'percentage')}
          change={formatChange(data?.perChange365d)}
        />
      </SectionCard>

      {/* Trading Statistics */}
      <SectionCard title="Trading Statistics" icon={BarChart2}>
        <StatItem 
          label="Total Traded Value" 
          value={formatValue(data?.totalTradedValue, 'currency')}
        />
        <StatItem 
          label="Average Volume" 
          value={formatValue(data?.avgTradedVolume, 'volume')}
        />
        <StatItem 
          label="Price to Book" 
          value={formatValue(data?.priceToBook, 'number')}
        />
      </SectionCard>
    </div>
  );
};

OverviewTab.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default OverviewTab;