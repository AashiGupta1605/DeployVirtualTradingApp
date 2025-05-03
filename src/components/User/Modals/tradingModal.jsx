import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ChevronDown, BookUser, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Redux imports
import {
  fetchTransactionHistory,
  selectHoldings,
  selectStatistics,
  fetchEventSpecificTransactions,
  selectFilteredTransactions,
} from "../../../redux/User/trading/tradingSlice";
import { getUserSubscriptions } from "../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice";
import {
  selectActiveEvent,
  selectActiveEvents,
  setActiveEvent,
  fetchUserEvents,
} from "../../../redux/User/events/eventsSlice";

// Component imports
import StockDetailsModal from "./StockDetailsModal";
import PortfolioTable from "./PortfolioTable";
import StatsSection from "../Cards/StatsSection";
import { useUserStats } from "../../../hooks/userUserStats";
import logoImage from "../../../assets/img/PGR_logo.jpeg";

const UserPortfolioPage = () => {
  // State management
  const { refetch } = useUserStats();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Redux selectors
  const activeEvent = useSelector(selectActiveEvent);
  const activeEvents = useSelector(selectActiveEvents);
  const userId = useSelector((state) => state.user.auth?.user?._id);
  const user = useSelector((state) => state.user.auth?.user || {});
  const userSubscriptions = useSelector(
    (state) => state.user.subscriptionPlan?.userSubscriptions || []
  );
  const transactions = useSelector((state) =>
    selectFilteredTransactions(state, activeEvent?._id || "none")
  );
  const holdings = useSelector(selectHoldings);
  const statistics = useSelector(selectStatistics);

  // Component state
  const [selectedStock, setSelectedStock] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Find active subscription
  const activeSubscription = userSubscriptions.find(
    (sub) => sub.status === "Active" && !sub.isDeleted
  );

  // Determine stock type based on symbol pattern
  const getStockType = (symbol) => {
    if (!symbol) return 'nifty50';
    if (symbol.includes('.ETF') || symbol.includes('-ETF')) return 'etf';
    if (symbol.length <= 4) return 'nifty50';
    return 'nifty500';
  };

  // Initialize event from location state
  useEffect(() => {
    const initializeEvent = async () => {
      if (location.state?.eventId) {
        try {
          let event = activeEvents.find((e) => e._id === location.state.eventId);
          
          if (!event) {
            await dispatch(fetchUserEvents());
            const updatedEvents = useSelector(selectActiveEvents);
            event = updatedEvents.find((e) => e._id === location.state.eventId);
          }
          
          if (event) {
            dispatch(setActiveEvent(event));
          }
        } catch (error) {
          console.error("Error initializing event:", error);
        }
      }
      setIsLoading(false);
    };

    initializeEvent();
  }, [location.state, dispatch]);

  // Fetch event-specific transactions when event changes
  useEffect(() => {
    if (location.state?.eventId) {
      const event = activeEvents.find((e) => e._id === location.state.eventId);
      if (event) {
        dispatch(setActiveEvent(event));
      } else {
        dispatch(fetchUserEvents()).then(() => {
          const foundEvent = useSelector(selectActiveEvents).find(
            (e) => e._id === location.state.eventId
          );
          if (foundEvent) {
            dispatch(setActiveEvent(foundEvent));
          }
        });
      }
    }
  }, [location.state, activeEvents, dispatch]);

  // Fetch data when user or event changes
  useEffect(() => {
    if (userId && !isLoading) {
      dispatch(getUserSubscriptions(userId));
      
      if (activeEvent?._id) {
        dispatch(
          fetchEventSpecificTransactions({
            userId,
            eventId: activeEvent._id,
          })
        );
      } else {
        dispatch(
          fetchTransactionHistory({
            userId,
            eventId: "none",
          })
        );
      }
    }
  }, [dispatch, userId, activeEvent, isLoading]);

  // Handle stock click to show details modal
  const handleStockClick = (symbol, type) => {
    const stockTransactions = transactions
      .filter((t) => t.companySymbol === symbol)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const stockHolding = holdings.find((h) => h.companySymbol === symbol);
    
    setSelectedStock({
      symbol,
      type: type || getStockType(symbol), // Use passed type or determine it
      transactions: stockTransactions,
      holding: stockHolding,
    });
    setShowDetailsModal(true);
  };

  // Generate PDF report (unchanged)
  const generatePDF = async () => {
    try {
      // ... existing PDF generation code ...
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Event dropdown component (unchanged)
  const EventDropdown = ({ activeEvent, onSelectEvent }) => {
    // ... existing EventDropdown code ...
  };

  // Main component render
  return (
    <div className="pb-10">
      <div className="-mt-24">
        <StatsSection isDashboard={false} pageType="trading" />
      </div>

      <div className="px-4 md:px-8 mx-4 -mt-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center">
              <BookUser className="text-gray-600 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                {activeEvent
                  ? `${activeEvent.title} Portfolio`
                  : "Basic Trading Portfolio"}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0 gap-x-3">
              <button
                onClick={generatePDF}
                className="flex items-center space-x-2 bg-lightBlue-600 hover:bg-lightBlue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 mb-0 md:mb-0"
              >
                <Download size={18} />
                <span>Export PDF Report</span>
              </button>
              <EventDropdown
                activeEvent={activeEvent}
                onSelectEvent={(event) => dispatch(setActiveEvent(event))}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <PortfolioTable
              transactions={transactions}
              holdings={holdings}
              onStockClick={handleStockClick}
            />
          </div>
        </div>
      </div>

      {showDetailsModal && selectedStock && (
        <StockDetailsModal
          stock={selectedStock}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default UserPortfolioPage;