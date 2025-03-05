// hooks/useCompanyData.js
import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../../../../utils/BaseUrl';

const useCompanyData = (isOpen, symbol, type) => {
  console.log('useCompanyData called with:', { isOpen, symbol, type });

  // Basic State Management
  const [data, setData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false); // Start with false
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('1D');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Advanced Chart Features State
  const [chartSettings, setChartSettings] = useState({
    showTopToolbar: true,
    showBottomToolbar: true,
    showSymbolDescription: true,
    showDrawingTools: true,
    showVolume: true,
    showDetails: true,
    showHotlist: true,
    allowSymbolChange: true,
    showWatchlist: true,
    showIndicators: true,
    theme: 'light'
  });

  // Chart Data State
  const [chartData, setChartData] = useState({
    candlestick: [],
    volume: [],
    sma: [],
    ema: [],
    rsi: [],
    macd: [],
    bollinger: [],
    fibonacci: [],
    customIndicators: []
  });

  // Additional Features State
  const [watchlist, setWatchlist] = useState([]);
  const [customIndicators, setCustomIndicators] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [symbolSearchResults, setSymbolSearchResults] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [hotlist, setHotlist] = useState({
    topGainers: [],
    topLosers: [],
    mostActive: []
  });

  // Technical Analysis Functions
  const calculateSMA = (data, period = 20) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    const sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        sma.push({ x: data[i].x, y: null });
        continue;
      }
      
      let sum = 0;
      let validPoints = 0;
      for (let j = 0; j < period; j++) {
        const price = data[i - j]?.y?.[3];
        if (typeof price === 'number' && !isNaN(price)) {
          sum += price;
          validPoints++;
        }
      }
      sma.push({ 
        x: data[i].x, 
        y: validPoints > 0 ? sum / validPoints : null 
      });
    }
    return sma;
  };

    // Data Fetching Functions
    const fetchData = async () => {
      if (!symbol) {
        console.log('No symbol provided, skipping fetch');
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
        setError(null);
        
        const currentEndpoint = type === 'etf'
    ? `${BASE_API_URL}/admin/etf/${symbol}`
    : `${BASE_API_URL}/admin/nifty/company/${symbol}`
  
        console.log('Fetching data from:', currentEndpoint);
        
        const response = await fetch(currentEndpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const currentData = await response.json();
        console.log('Received data:', currentData);
        
        setData(currentData);
        
        // Fetch historical data if needed
        if (activeTab === 'chart' || activeTab === 'advanced-chart') {
          await fetchHistoricalData(activeFilter);
        }
  
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchHistoricalData = async (timeRange = '') => {
      try {
        setHistoricalLoading(true);
        console.log('Fetching historical data for:', { symbol, timeRange });
    
        const endpoint = `${BASE_API_URL}/admin/nifty/company/chart/${symbol}`;
        const url = `${endpoint}?timeRange=${timeRange}`;
        
        console.log('Fetching from:', url);
    
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch historical data: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Raw historical data:', data);
    
        if (activeTab === 'chart' || activeTab === 'advanced-chart') {
          processChartData(data);
        } else {
          setHistoricalData(Array.isArray(data) ? data : []);
        }
    
      } catch (err) {
        console.error('Error fetching historical data:', err);
        setError(err.message);
      } finally {
        setHistoricalLoading(false);
      }
    };
    // Data Processing Function
    const processChartData = (data) => {
      if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid chart data format:', data);
        return;
      }
    
      try {
        // Process candlestick data
        const candlestick = data.map(item => ({
          x: new Date(item.date).getTime(),
          y: [
            Number(item.open),
            Number(item.high),
            Number(item.low),
            Number(item.close)
          ]
        })).filter(item => 
          !item.y.some(val => isNaN(val)) && 
          !isNaN(item.x)
        );
    
        // Process volume data
        const volume = data.map(item => ({
          x: new Date(item.date).getTime(),
          y: Number(item.volume) || 0
        })).filter(item => !isNaN(item.x));
    
        console.log('Processed chart data:', { candlestick, volume });
    
        if (candlestick.length === 0) {
          throw new Error('No valid candlestick data after processing');
        }
    
        // Update chart data state
        setChartData({
          candlestick,
          volume,
          sma: calculateSMA(candlestick, 20),
          ema: [],
          rsi: [],
          macd: [],
          bollinger: [],
          fibonacci: [],
          customIndicators: []
        });
    
      } catch (err) {
        console.error('Error processing chart data:', err);
        setError('Error processing chart data');
      }
    };

      // Effects
  useEffect(() => {
    console.log('Modal state changed:', { isOpen, symbol });
    if (isOpen && symbol) {
      console.log('Modal opened, fetching data for symbol:', symbol);
      fetchData();
    }
    return () => {
      // Cleanup function
      if (!isOpen) {
        console.log('Modal closed, resetting states');
        resetStates();
      }
    };
  }, [isOpen, symbol]);

  // Handler Functions
  const handleTabChange = (tab) => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
    if (tab === 'chart' || tab === 'advanced-chart' || tab === 'historical') {
      fetchHistoricalData(activeFilter);
    }
  };

  const handleFilterChange = (filter) => {
    console.log('Filter changed to:', filter);
    setActiveFilter(filter);
    setCurrentPage(1);
    fetchHistoricalData(filter);
  };

  const resetStates = () => {
    setData(null);
    setHistoricalData([]);
    setLoading(false);
    setHistoricalLoading(false);
    setError(null);
    setActiveTab('overview');
    setActiveFilter('1D');
    setCurrentPage(1);
    setChartData({
      candlestick: [],
      volume: [],
      sma: [],
      ema: [],
      rsi: [],
      macd: [],
      bollinger: [],
      fibonacci: [],
      customIndicators: []
    });
  };

  // Return object
  return {
    // States
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
    chartSettings,
    watchlist,
    customIndicators,
    drawings,
    symbolSearchResults,
    selectedSymbol,
    hotlist,

    // Functions
    setActiveTab: handleTabChange,
    setCurrentPage,
    setItemsPerPage,
    handleFilterChange,
    fetchHistoricalData,
    resetStates,
    
    // Chart Settings
    updateChartSettings: (settings) => {
      console.log('Updating chart settings:', settings);
      setChartSettings(prev => ({ ...prev, ...settings }));
    },

    // Watchlist Functions
    addToWatchlist: (symbol) => setWatchlist(prev => [...new Set([...prev, symbol])]),
    removeFromWatchlist: (symbol) => setWatchlist(prev => prev.filter(s => s !== symbol)),

    // Technical Analysis
    calculateSMA,
  };
};

export { useCompanyData };