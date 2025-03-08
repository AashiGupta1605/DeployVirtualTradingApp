import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import * as Icons from 'lucide-react';

// Utility Components
const ToolbarButton = ({ label, active, onClick, disabled, tooltip }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${
      active ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
    title={tooltip || label}
  >
    <span>{label}</span>
  </button>
);

const DropdownMenu = ({ trigger, items, position = 'bottom-left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-200 ${
            position === 'bottom-right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                disabled={item.disabled}
              >
                {item.icon && <item.icon size={16} className="mr-2" />}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = { info: 'bg-blue-500', success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500' }[type];
  const Icon = { info: Icons.AlertCircle, success: Icons.Check, error: Icons.X, warning: Icons.AlertTriangle }[type];

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
      <Icon size={20} className="mr-2" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:text-gray-200">
        <Icons.X size={16} />
      </button>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
  </div>
);

const AdvancedChartTab = ({
  symbol,
  data,
  chartData: initialChartData,
  onTimeRangeChange,
  loading,
  error,
  chartSettings,
  watchlist,
  customIndicators,
  onSettingsChange,
  onWatchlistUpdate,
  onIndicatorUpdate,
}) => {
  const [activeRange, setActiveRange] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const [showPanels, setShowPanels] = useState({
    watchlist: false,
    indicators: false,
    drawings: false,
    alerts: false,
    settings: false,
  });
  const [activeTool, setActiveTool] = useState(null);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [chartLayout, setChartLayout] = useState('single');
  const [toasts, setToasts] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const chartRef = useRef(null);

  const formatChartData = useCallback(() => {
    if (!initialChartData) return [];
    return [
      { name: 'Candlestick', type: 'candlestick', data: Array.isArray(initialChartData.candlestick) ? initialChartData.candlestick : [] },
      { name: 'Volume', type: 'bar', data: Array.isArray(initialChartData.volume) ? initialChartData.volume : [] },
      ...selectedIndicators.map((indicator) => ({
        name: indicator.name,
        type: 'line',
        data: initialChartData[indicator.key] || [],
      })),
    ].filter((series) => series.data.length > 0);
  }, [initialChartData, selectedIndicators]);

  const timeRanges = [
    { label: '1D', value: '1D', tooltip: '1 Day' },
    { label: '1W', value: '1W', tooltip: '1 Week' },
    { label: '1M', value: '1M', tooltip: '1 Month' },
    { label: '3M', value: '3M', tooltip: '3 Months' },
    { label: '6M', value: '6M', tooltip: '6 Months' },
    { label: '1Y', value: '1Y', tooltip: '1 Year' },
    { label: '2Y', value: '2Y', tooltip: '2 Years' },
    { label: '3Y', value: '3Y', tooltip: '3 Years' },
    { label: '5Y', value: '5Y', tooltip: '5 Years' },
  ];

  const chartTypes = [
    { label: 'Candlestick', value: 'candlestick', icon: Icons.BarChart2 },
    { label: 'Line', value: 'line', icon: Icons.TrendingUp },
    { label: 'Area', value: 'area', icon: Icons.Activity },
    { label: 'Bar', value: 'bar', icon: Icons.BarChart2 },
    { label: 'Heikin Ashi', value: 'heikinashi', icon: Icons.PieChart },
  ];

  const drawingTools = [
    { name: 'Trend Line', icon: Icons.TrendingUp },
    { name: 'Horizontal Line', icon: Icons.Edit3 },
    { name: 'Rectangle', icon: Icons.Square },
    { name: 'Fibonacci', icon: Icons.Activity },
    { name: 'Text', icon: Icons.Type },
    { name: 'Arrow', icon: Icons.ArrowRight },
  ];

  const availableIndicators = [
    { name: 'Moving Average (MA)', type: 'overlay', category: 'trend', key: 'sma' },
    { name: 'Bollinger Bands', type: 'overlay', category: 'volatility', key: 'bollinger' },
    { name: 'RSI', type: 'separate', category: 'momentum', key: 'rsi' },
    { name: 'MACD', type: 'separate', category: 'momentum', key: 'macd' },
    { name: 'Stochastic', type: 'separate', category: 'momentum', key: 'stochastic' },
    { name: 'Volume', type: 'separate', category: 'volume', key: 'volume' },
  ];

  const handleChartClick = useCallback(
    (event, chartContext, config) => {
      if (activeTool) {
        const { dataPointIndex, seriesIndex } = config;
        const clickedPoint = {
          x: chartContext.data.twoDSeriesX[dataPointIndex],
          y: chartContext.data.twoDSeriesY[seriesIndex][dataPointIndex],
        };
        handleDrawingAction(clickedPoint);
      }
    },
    [activeTool]
  );

  const handleDrawingAction = useCallback(
    (point) => {
      switch (activeTool) {
        case 'Trend Line':
          setAnnotations((prev) => [...prev, { type: 'line', points: [point], incomplete: true }]);
          break;
        case 'Rectangle':
          setAnnotations((prev) => [...prev, { type: 'rect', points: [point], incomplete: true }]);
          break;
        default:
          break;
      }
    },
    [activeTool]
  );

  const handleChartSelection = useCallback(
    (chartContext, { xaxis, yaxis }) => {
      if (activeTool === 'Rectangle') {
        setAnnotations((prev) => [
          ...prev,
          { type: 'rect', x: xaxis.min, y: yaxis.min, width: xaxis.max - xaxis.min, height: yaxis.max - yaxis.min },
        ]);
      }
    },
    [activeTool]
  );

  const handleChartZoom = useCallback((chartContext, { xaxis }) => {
    setZoomLevel((prevZoom) => (xaxis.max - xaxis.min) / (prevZoom * 1000));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 3000);
  }, []);

  const togglePanel = useCallback(
    (panelName) => setShowPanels((prev) => ({ ...prev, [panelName]: !prev[panelName] })),
    []
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setActiveTool(null);
        setShowPanels((prev) =>
          Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {})
        );
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (error) addToast(error, 'error');
  }, [error, addToast]);

  const handleCustomTooltip = useCallback(
    ({ seriesIndex, dataPointIndex, w }) => {
      if (!w.globals.seriesCandleO) return '';
      const o = w.globals.seriesCandleO[0][dataPointIndex];
      const h = w.globals.seriesCandleH[0][dataPointIndex];
      const l = w.globals.seriesCandleL[0][dataPointIndex];
      const c = w.globals.seriesCandleC[0][dataPointIndex];
      const volume = w.globals.series[1]?.[dataPointIndex];
      const date = new Date(w.globals.seriesX[0][dataPointIndex]);
      let indicatorValues = '';
      selectedIndicators.forEach((indicator) => {
        const value = w.globals.series[indicator.seriesIndex]?.[dataPointIndex];
        if (value !== undefined) {
          indicatorValues += `<div class="flex justify-between"><span class="text-gray-500">${indicator.name}:</span><span class="font-medium">₹${value.toFixed(2)}</span></div>`;
        }
      });
      return `<div class="bg-white p-4 rounded-lg shadow-lg border border-gray-200"><div class="text-sm font-medium text-gray-800 mb-2">${date.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })}</div><div class="space-y-1"><div class="grid grid-cols-2 gap-x-4 gap-y-1"><div class="flex justify-between"><span class="text-gray-500">Open:</span><span class="font-medium">₹${o?.toFixed(2) || 'N/A'}</span></div><div class="flex justify-between"><span class="text-gray-500">High:</span><span class="font-medium">₹${h?.toFixed(2) || 'N/A'}</span></div><div class="flex justify-between"><span class="text-gray-500">Low:</span><span class="font-medium">₹${l?.toFixed(2) || 'N/A'}</span></div><div class="flex justify-between"><span class="text-gray-500">Close:</span><span class="font-medium">₹${c?.toFixed(2) || 'N/A'}</span></div>${
        volume !== undefined
          ? `<div class="flex justify-between col-span-2"><span class="text-gray-500">Volume:</span><span class="font-medium">${new Intl.NumberFormat('en-IN').format(volume)}</span></div>`
          : ''
      }</div>${indicatorValues}</div></div>`;
    },
    [selectedIndicators]
  );

  const chartOptions = {
    chart: {
      type: chartType,
      height: 500,
      animations: { enabled: true },
      background: 'transparent',
      zoom: { enabled: true, type: 'xy', autoScaleYaxis: true },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
      },
      events: { click: handleChartClick, selection: handleChartSelection, zoomed: handleChartZoom },
    },
    theme: { mode: chartSettings?.theme || 'light' },
    grid: { show: chartSettings?.showGrid, borderColor: '#f0f0f0', strokeDashArray: 0, position: 'back' },
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false, format: 'dd MMM yyyy HH:mm', style: { colors: '#666', fontSize: '12px' } },
      axisBorder: { show: true, color: '#e0e0e0' },
      crosshairs: {
        show: true,
        width: 1,
        position: 'back',
        opacity: 0.9,
        stroke: { color: '#b6b6b6', width: 1, dashArray: 0 },
      },
    },
    yaxis: [
      {
        title: { text: 'Price', style: { fontSize: '12px' } },
        labels: { formatter: (value) => `₹${value.toFixed(2)}`, style: { fontSize: '12px' } },
        tickAmount: 8,
        floating: false,
      },
      {
        title: { text: 'Volume', style: { fontSize: '12px' } },
        opposite: true,
        labels: {
          formatter: (value) => {
            if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
            if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
            return `${(value / 1000).toFixed(1)}K`;
          },
        },
        show: showPanels.volume,
      },
    ],
    tooltip: { shared: true, custom: handleCustomTooltip, intersect: false, theme: chartSettings?.theme },
    plotOptions: {
      candlestick: { colors: { upward: '#26A69A', downward: '#EF5350' }, wick: { useFillColor: true } },
      bar: {
        columnWidth: '60%',
        colors: {
          ranges: [
            { from: -1000, to: 0, color: '#EF5350' },
            { from: 1, to: 1000, color: '#26A69A' },
          ],
        },
      },
    },
    annotations: {
      yaxis: annotations.filter((a) => a.type === 'yaxis'),
      xaxis: annotations.filter((a) => a.type === 'xaxis'),
      points: annotations.filter((a) => a.type === 'point'),
    },
    responsive: [
      { breakpoint: 1024, options: { chart: { height: 500 } } },
      { breakpoint: 768, options: { chart: { height: 400 } } },
    ],
  };

  const renderToolbar = () => (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <DropdownMenu
          trigger={
            <ToolbarButton
              icon={chartTypes.find((t) => t.value === chartType)?.icon}
              label="Chart Type"
              active={false}
            />
          }
          items={chartTypes.map((type) => ({
            label: type.label,
            icon: type.icon,
            onClick: () => setChartType(type.value),
          }))}
        />
        <div className="flex space-x-1">
          {timeRanges.map((range) => (
            <ToolbarButton
              key={range.value}
              label={range.label}
              active={activeRange === range.value}
              onClick={() => {
                setActiveRange(range.value);
                onTimeRangeChange(range.value);
              }}
              tooltip={range.tooltip}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <ToolbarButton
          icon={Icons.Layers}
          label="Indicators"
          active={showPanels.indicators}
          onClick={() => togglePanel('indicators')}
        />
        <ToolbarButton
          icon={Icons.Edit3}
          label="Draw"
          active={showPanels.drawings}
          onClick={() => togglePanel('drawings')}
        />
        <ToolbarButton
          icon={Icons.Bell}
          label="Alerts"
          active={showPanels.alerts}
          onClick={() => togglePanel('alerts')}
        />
        <ToolbarButton
          icon={isFullscreen ? Icons.Minimize2 : Icons.Maximize2}
          label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          onClick={() => {
            if (!document.fullscreenElement) {
              chartRef.current?.requestFullscreen();
              setIsFullscreen(true);
            } else {
              document.exitFullscreen();
              setIsFullscreen(false);
            }
          }}
        />
        <ToolbarButton
          icon={Icons.Download}
          label="Export"
          onClick={() => {
            try {
              const chart = chartRef.current?.chart;
              if (chart) {
                chart.exportToCSV();
                addToast('Chart data exported successfully', 'success');
              }
            } catch (error) {
              addToast('Failed to export chart data', 'error');
            }
          }}
        />
      </div>
    </div>
  );

  const renderDrawingTools = () =>
    showPanels.drawings && (
      <div className="absolute top-20 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
        <div className="flex flex-col space-y-1">
          {drawingTools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => setActiveTool(activeTool === tool.name ? null : tool.name)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                activeTool === tool.name ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <tool.icon size={16} className="mr-2" />
              {tool.name}
            </button>
          ))}
        </div>
      </div>
    );

  const renderIndicatorsPanel = () =>
    showPanels.indicators && (
      <div className="absolute top-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Indicators</h3>
          <button onClick={() => togglePanel('indicators')} className="text-gray-400 hover:text-gray-600">
            <Icons.X size={16} />
          </button>
        </div>
        <div className="space-y-2">
          {availableIndicators.map((indicator) => (
            <div key={indicator.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{indicator.name}</span>
                <span className="text-xs text-gray-500">{indicator.category}</span>
              </div>
              <button
                onClick={() => handleIndicatorToggle(indicator)}
                className={`p-1.5 rounded-md transition-colors ${
                  selectedIndicators.find((i) => i.name === indicator.name)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icons.Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );

  const renderChart = () => {
    if (loading) return <LoadingSpinner />;
    return <ReactApexChart options={chartOptions} series={formatChartData()} type={chartType} height={500} />;
  };

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-red-50 rounded-xl p-6">
        <Icons.AlertCircle className="text-red-500 w-12 h-12 mb-4" />
        <p className="text-red-800 font-medium text-lg">Error Loading Chart</p>
        <p className="text-red-600 text-sm mt-2">{error}</p>
        <button
          onClick={() => onTimeRangeChange(activeRange)}
          className="mt-4 flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
        >
          <Icons.RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );

  return (
    <div className="relative space-y-4" ref={chartRef}>
      {renderToolbar()}
      <div className="relative bg-white rounded-xl border border-gray-200 p-4">
        {renderChart()}
        {renderDrawingTools()}
        {renderIndicatorsPanel()}
      </div>
  
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
};

AdvancedChartTab.propTypes = {
  symbol: PropTypes.string.isRequired,
  data: PropTypes.shape({
    open: PropTypes.number,
    dayHigh: PropTypes.number,
    dayLow: PropTypes.number,
    lastPrice: PropTypes.number,
    previousClose: PropTypes.number,
    change: PropTypes.number,
    pChange: PropTypes.number,
    totalTradedVolume: PropTypes.number,
    totalTradedValue: PropTypes.number,
    lastUpdateTime: PropTypes.string,
  }),
  chartData: PropTypes.shape({
    candlestick: PropTypes.arrayOf(
      PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.arrayOf(PropTypes.number).isRequired })
    ),
    volume: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired })),
    sma: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number })),
    ema: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number })),
    rsi: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number })),
    macd: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number })),
  }),
  onTimeRangeChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  chartSettings: PropTypes.shape({
    theme: PropTypes.oneOf(['light', 'dark']),
    showGrid: PropTypes.bool,
    showVolume: PropTypes.bool,
    showDetails: PropTypes.bool,
  }),
  watchlist: PropTypes.arrayOf(PropTypes.string),
  customIndicators: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string, type: PropTypes.string, parameters: PropTypes.object })
  ),
  onSettingsChange: PropTypes.func,
  onWatchlistUpdate: PropTypes.func,
  onIndicatorUpdate: PropTypes.func,
};

AdvancedChartTab.defaultProps = {
  loading: false,
  error: null,
  data: null,
  chartData: {
    candlestick: [],
    volume: [],
    sma: [],
    ema: [],
    rsi: [],
    macd: [],
  },
  chartSettings: {
    theme: 'light',
    showGrid: true,
    showVolume: true,
    showDetails: true,
  },
  watchlist: [],
  customIndicators: [],
  onSettingsChange: () => {},
  onWatchlistUpdate: () => {},
  onIndicatorUpdate: () => {},
};

export default AdvancedChartTab;