// components/Common/Modals/CompanyDetail/index.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, AlertCircle } from 'lucide-react';
import { useCompanyData } from './hooks/useCompanyData';
import ModalHeader from './parts/ModalHeader';
import SymbolSection from './parts/SymbolSection';
import TabNavigation from './parts/TabNavigation';
import OverviewTab from './tabs/OverviewTab';
import ChartTab from './tabs/ChartTab';
import HistoricalTab from './tabs/HistoricalTab';
import AdvancedChartTab from './tabs/ChartTab2';

const LoadingOverlay = ({ message = "Loading data..." }) => (
  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  </div>
);

const ErrorDisplay = ({ error, onRetry, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full mx-4">
      <div className="flex flex-col items-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h3>
        <p className="text-gray-600 text-center mb-6">{error}</p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  </div>
);

const CompanyDetailModal = ({
  isOpen,
  onClose,
  symbol,
  type = 'nifty'
}) => {
  console.log('CompanyDetailModal rendered:', { isOpen, symbol, type });

  const {
    data,
    historicalData,
    loading,
    historicalLoading,
    error,
    activeTab,
    activeFilter,
    currentPage,
    itemsPerPage,
    chartData,
    setActiveTab,
    setCurrentPage,
    setItemsPerPage,
    handleFilterChange,
    resetStates,
    fetchHistoricalData
  } = useCompanyData(isOpen, symbol, type);

  useEffect(() => {
    console.log('Modal state:', { loading, error, data });
  }, [loading, error, data]);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Error handling
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => fetchHistoricalData(activeFilter)}
        onClose={onClose}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            data={data} 
            loading={loading} 
            error={error} 
          />
        );
      case 'chart':
        return (
          <ChartTab
            symbol={symbol}
            data={data}
            chartData={chartData}
            onTimeRangeChange={handleFilterChange}
            loading={historicalLoading}
            error={error}
          />
        );
      case 'advanced-chart':
        return (
          <AdvancedChartTab
            symbol={symbol}
            data={data}
            chartData={chartData}
            onTimeRangeChange={handleFilterChange}
            loading={historicalLoading}
            error={error}
          />
        );
      case 'historical':
        return (
          <HistoricalTab
            data={historicalData}
            loading={historicalLoading}
            error={error}
            onTimeRangeChange={handleFilterChange}
            onRefresh={() => fetchHistoricalData(activeFilter)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-[90%] h-[90%] bg-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-all duration-200 z-10 group"
            aria-label="Close modal"
          >
            <X 
              size={24} 
              className="group-hover:scale-110 transition-transform duration-200" 
            />
          </button>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-gray-50">
              <ModalHeader
                type={type}
                onClose={onClose}
                symbol={symbol}
                data={data}
                loading={loading}
              />
            </div>

            {/* Symbol Section */}
            <div className="px-6 py-4">
              <SymbolSection
                symbol={symbol}
                type={type}
                data={data}
                loading={loading}
              />
            </div>

            {/* Main Content */}
            <div className="px-6 pb-6">
              {/* Tab Navigation */}
              <div className="sticky top-[72px] z-10 bg-gray-50 py-4">
                <TabNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  type={type}
                  loading={loading}
                  availableTabs={['overview', 'chart', 'advanced-chart', 'historical']}
                />
              </div>

              {/* Tab Content */}
              <div className="mt-6 relative">
                {loading && <LoadingOverlay />}
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 space-y-2 sm:space-y-0">
              <p className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Last updated: {data?.lastUpdateTime ? 
                  new Date(data.lastUpdateTime).toLocaleString() : 
                  'N/A'
                }
              </p>
              <p className="text-gray-400">
                Data provided by NSE India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CompanyDetailModal Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          error="An unexpected error occurred"
          onClose={this.props.onClose}
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}

// Custom scrollbar styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Wrap the modal with error boundary
const CompanyDetailModalWithErrorBoundary = (props) => (
  <ErrorBoundary onClose={props.onClose}>
    <CompanyDetailModal {...props} />
  </ErrorBoundary>
);

CompanyDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['nifty', 'etf'])
};

CompanyDetailModal.defaultProps = {
  type: 'nifty'
};

export default CompanyDetailModalWithErrorBoundary;