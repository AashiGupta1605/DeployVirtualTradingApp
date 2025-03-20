import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react';

const TradingViewTab = ({ symbol, loading }) => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState(null);

  // Robust symbol formatting function
  const formatSymbolForTradingView = useCallback((inputSymbol) => {
    if (!inputSymbol) {
      console.warn('Invalid symbol provided');
      return 'BSE:SENSEX'; // Fallback symbol
    }

    // Remove any whitespace
    inputSymbol = inputSymbol.trim().toUpperCase();

    // Check if symbol already has exchange prefix
    if (inputSymbol.includes(':')) {
      return inputSymbol;
    }

    // Default to BSE, but check for common NSE prefixes
    const nseSymbols = ['NIFTY', 'BANKNIFTY'];
    return nseSymbols.some(prefix => inputSymbol.startsWith(prefix)) 
      ? `NSE:${inputSymbol}` 
      : `BSE:${inputSymbol}`;
  }, []);

  // Fullscreen toggle function
  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
    if (!isFullScreen) {
      document.documentElement.requestFullscreen?.() || document.body.requestFullscreen?.();
      document.body.style.overflow = 'hidden';
    } else {
      document.exitFullscreen?.();
      document.body.style.overflow = 'auto';
    }
  };

  // Chart refresh function
  const refreshChart = () => {
    setError(null);
    setRefreshKey((prev) => prev + 1);
  };

  // Add custom styles
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      .tradingview-widget-container {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Main TradingView widget loading effect
  useEffect(() => {
    // Reset error state
    setError(null);

    // Validate symbol
    const formattedSymbol = formatSymbolForTradingView(symbol);

    // Remove previous script if exists
    if (scriptRef.current) {
      scriptRef.current.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;

    // Error handling for script loading
    script.onerror = (error) => {
      console.error('Failed to load TradingView script:', error);
      setError('Failed to load TradingView chart');
    };

    // Widget configuration
    const widgetConfig = {
      autosize: true,
      symbol: formattedSymbol,
      timezone: 'Asia/Kolkata',
      theme: 'light',
      style: '1',
      locale: 'en',
      withdateranges: true,
      range: 'ALL',
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: false,
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      support_host: 'https://www.tradingview.com',
      
      // Ensure a valid container is specified
      container_id: 'tradingview-widget-container'
    };

    try {
      // Ensure the container exists before setting innerHTML
      if (containerRef.current) {
        // Clear previous content
        containerRef.current.innerHTML = '';

        // Create widget container
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'tradingview-widget-container';
        widgetContainer.className = 'tradingview-widget-container__widget';
        widgetContainer.style.height = '100%';
        widgetContainer.style.width = '100%';

        // Append container
        containerRef.current.appendChild(widgetContainer);

        // Set script content
        script.innerHTML = JSON.stringify(widgetConfig);
        scriptRef.current = script;

        // Append script
        containerRef.current.appendChild(script);
      }
    } catch (err) {
      console.error('Error setting up TradingView widget:', err);
      setError('Failed to configure TradingView chart');
    }

    // Cleanup function
    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [symbol, refreshKey, formatSymbolForTradingView]);

  return (
    <div
      className={`m-4 p-4 bg-gray-100 shadow-2xl rounded transition-all ${
        isFullScreen ? 'fixed top-0 left-0 w-screen h-screen z-50' : 'relative'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">TradingView Chart</h2>
        <div className="flex space-x-4">
          <button
            onClick={refreshChart}
            className="p-2 bg-gray-200 mx-4 rounded-full hover:bg-gray-300 transition"
            title="Refresh Chart"
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={toggleFullScreen}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            title="Toggle Fullscreen"
          >
            {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
      <div className="relative w-full h-[80vh] bg-white rounded-md overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div ref={containerRef} className="tradingview-widget-container w-full h-full" />
        )}
      </div>
    </div>
  );
};

TradingViewTab.propTypes = {
  symbol: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

TradingViewTab.defaultProps = {
  loading: false,
};

export default TradingViewTab;