import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle, Calendar } from 'lucide-react';
import { 
  isMarketOpen, 
  getNextMarketOpenTime, 
  getTimeRemaining, 
  getMarketTimes 
} from '../../../../../utils/marketStatus';

// Custom CSS for flip animation
const CountdownStyles = `
@keyframes flip-in {
  0% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}

.countdown-item {
  position: relative;
  perspective: 400px;
  overflow: hidden;
}

.countdown-value {
  display: inline-block;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  animation: flip-in 0.6s ease-in-out;
}
`;

const MarketStatusOverlay = ({ tradingPreference }) => {
  const [marketCurrentlyOpen, setMarketCurrentlyOpen] = useState(isMarketOpen());
  const [nextMarketOpenTime, setNextMarketOpenTime] = useState(getNextMarketOpenTime());
  const [timeToMarketOpen, setTimeToMarketOpen] = useState(getTimeRemaining(nextMarketOpenTime));
  const [marketTimes, setMarketTimes] = useState(getMarketTimes());

  useEffect(() => {
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = CountdownStyles;
    document.head.appendChild(styleSheet);

    const interval = setInterval(() => {
      const currentMarketOpen = isMarketOpen();
      setMarketCurrentlyOpen(currentMarketOpen);
      const newNextMarketOpenTime = getNextMarketOpenTime();
      setNextMarketOpenTime(newNextMarketOpenTime);
      setTimeToMarketOpen(getTimeRemaining(newNextMarketOpenTime));
      setMarketTimes(getMarketTimes());
    }, 1000);

    return () => {
      clearInterval(interval);
      styleSheet.remove();
    };
  }, []);

  // Determine if overlay should be shown based on trading preference
  const shouldShowOverlay = () => {
    if (tradingPreference === "Market Hours") {
      return !marketCurrentlyOpen;
    } else if (tradingPreference === "Off-Market Hours") {
      return marketCurrentlyOpen;
    }
    return false;
  };

  if (!shouldShowOverlay()) {
    return null;
  }

  const overlayTitle = tradingPreference === "Market Hours" 
    ? "Market is Closed" 
    : "Market is Open";

  const overlayMessage = tradingPreference === "Market Hours"
    ? "Trading is currently unavailable. The market will reopen soon."
    : "Trading is currently unavailable during off-market hours.";

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl z-50">
      <div className="bg-white w-[450px] -mt-[20rem] rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-lightBlue-600 p-3 text-white">
          <div className="flex items-center justify-center space-x-3">
            <AlertCircle className="w-8 h-8 text-white" strokeWidth={2} />
            <h3 className="text-lg font-bold tracking-wide">{overlayTitle}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 text-center bg-gray-50">
          <p className="text-gray-800 mb-3 text-base font-medium">
            Trading is{" "}
            <span className="text-red-500 font-semibold">
              {tradingPreference === "Market Hours" ? "currently unavailable" : "restricted"}
            </span>
            . {overlayMessage}
          </p>

          {tradingPreference === "Market Hours" && (
            <>
              {/* Time Remaining Section */}
              <div className="grid grid-flow-col gap-3 text-center auto-cols-max justify-center mb-3">
                {/* Hours */}
                <div className="flex flex-col p-2 bg-gray-100 rounded-xl shadow-sm border border-gray-100 countdown-item">
                  <span className="countdown font-mono text-3xl font-bold text-lightBlue-600">
                    <span
                      className="countdown-value"
                      style={{ "--value": timeToMarketOpen.hours }}
                      aria-live="polite"
                    >
                      {timeToMarketOpen.hours.toString().padStart(2, '0')}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500 mt-1 font-medium uppercase tracking-wider">
                    Hours
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col p-2 bg-gray-100 rounded-xl shadow-sm border border-gray-100 countdown-item">
                  <span className="countdown font-mono text-3xl font-bold text-lightBlue-600">
                    <span
                      className="countdown-value"
                      style={{ "--value": timeToMarketOpen.minutes }}
                      aria-live="polite"
                    >
                      {timeToMarketOpen.minutes.toString().padStart(2, '0')}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500 mt-1 font-medium uppercase tracking-wider">
                    Minutes
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col p-2 bg-gray-100 rounded-xl shadow-sm border border-gray-100 countdown-item">
                  <span className="countdown font-mono text-3xl font-bold text-lightBlue-600">
                    <span
                      className="countdown-value"
                      style={{ "--value": timeToMarketOpen.seconds }}
                      aria-live="polite"
                    >
                      {timeToMarketOpen.seconds.toString().padStart(2, '0')}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500 mt-1 font-medium uppercase tracking-wider">
                    Seconds
                  </span>
                </div>
              </div>

              {/* Market Information Section */}
              <div className="grid grid-cols-2 gap-3">
                {/* Market Days */}
                <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-lightBlue-600" />
                    <h4 className="text-sm font-semibold text-gray-800">Market Days</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Monday to Friday
                  </p>
                </div>

                {/* Market Hours */}
                <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <h4 className="text-sm font-semibold text-gray-800">Market Hours</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    9:30 AM - 3:30 PM IST
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 border-t border-gray-200 p-3 text-center">
          <p className="text-xs text-gray-500 font-medium">
            {tradingPreference === "Market Hours" 
              ? "Next trading session will begin shortly" 
              : "Trading will resume during market hours"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketStatusOverlay;