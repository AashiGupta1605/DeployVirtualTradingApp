// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { ChevronDown, BookUser, Download } from "lucide-react";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// // Redux imports
// import {
//   fetchTransactionHistory,
//   selectHoldings,
//   selectStatistics,
//   fetchEventSpecificTransactions,
//   selectFilteredTransactions,
// } from "../../../redux/User/trading/tradingSlice";
// import { getUserSubscriptions } from "../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice";
// import {
//   selectActiveEvent,
//   selectActiveEvents,
//   setActiveEvent,
//   fetchUserEvents,
// } from "../../../redux/User/events/eventsSlice";

// // Component imports
// import StockDetailsModal from "./StockDetailsModal";
// import PortfolioTable from "./PortfolioTable";
// import StatsSection from "../Cards/StatsSection";
// import { useUserStats } from "../../../hooks/userUserStats";
// import logoImage from "../../../assets/img/PGR_logo.jpeg";

// const UserPortfolioPage = () => {
//   // State management
//   const { refetch } = useUserStats();
//   const dispatch = useDispatch();
//   const location = useLocation();
  
//   // Redux selectors
//   const activeEvent = useSelector(selectActiveEvent);
//   const activeEvents = useSelector(selectActiveEvents);
//   const userId = useSelector((state) => state.user.auth?.user?._id);
//   const user = useSelector((state) => state.user.auth?.user || {});
//   const userSubscriptions = useSelector(
//     (state) => state.user.subscriptionPlan?.userSubscriptions || []
//   );
//   const transactions = useSelector((state) =>
//     selectFilteredTransactions(state, activeEvent?._id || "none")
//   );
//   const holdings = useSelector(selectHoldings);
//   const statistics = useSelector(selectStatistics);

//   // Component state
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Find active subscription
//   const activeSubscription = userSubscriptions.find(
//     (sub) => sub.status === "Active" && !sub.isDeleted
//   );

//   // Determine stock type based on symbol pattern
//   const getStockType = (symbol) => {
//     if (!symbol) return 'nifty50';
//     if (symbol.includes('.ETF') || symbol.includes('-ETF')) return 'etf';
//     if (symbol.length <= 4) return 'nifty50';
//     return 'nifty500';
//   };

//   // Initialize event from location state
//   useEffect(() => {
//     const initializeEvent = async () => {
//       if (location.state?.eventId) {
//         try {
//           let event = activeEvents.find((e) => e._id === location.state.eventId);
          
//           if (!event) {
//             await dispatch(fetchUserEvents());
//             const updatedEvents = useSelector(selectActiveEvents);
//             event = updatedEvents.find((e) => e._id === location.state.eventId);
//           }
          
//           if (event) {
//             dispatch(setActiveEvent(event));
//           }
//         } catch (error) {
//           console.error("Error initializing event:", error);
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeEvent();
//   }, [location.state, dispatch]);

//   // Fetch event-specific transactions when event changes
//   useEffect(() => {
//     if (location.state?.eventId) {
//       const event = activeEvents.find((e) => e._id === location.state.eventId);
//       if (event) {
//         dispatch(setActiveEvent(event));
//       } else {
//         dispatch(fetchUserEvents()).then(() => {
//           const foundEvent = useSelector(selectActiveEvents).find(
//             (e) => e._id === location.state.eventId
//           );
//           if (foundEvent) {
//             dispatch(setActiveEvent(foundEvent));
//           }
//         });
//       }
//     }
//   }, [location.state, activeEvents, dispatch]);

//   // Fetch data when user or event changes
//   useEffect(() => {
//     if (userId && !isLoading) {
//       dispatch(getUserSubscriptions(userId));
      
//       if (activeEvent?._id) {
//         dispatch(
//           fetchEventSpecificTransactions({
//             userId,
//             eventId: activeEvent._id,
//           })
//         );
//       } else {
//         dispatch(
//           fetchTransactionHistory({
//             userId,
//             eventId: "none",
//           })
//         );
//       }
//     }
//   }, [dispatch, userId, activeEvent, isLoading]);

//   // Handle stock click to show details modal
//   const handleStockClick = (symbol, type) => {
//     const stockTransactions = transactions
//       .filter((t) => t.companySymbol === symbol)
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     const stockHolding = holdings.find((h) => h.companySymbol === symbol);
    
//     setSelectedStock({
//       symbol,
//       type: type || getStockType(symbol), // Use passed type or determine it
//       transactions: stockTransactions,
//       holding: stockHolding,
//     });
//     setShowDetailsModal(true);
//   };

//   // Generate PDF report (unchanged)
//   const generatePDF = async () => {
//     try {
//       // ... existing PDF generation code ...
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   // Event dropdown component (unchanged)
//   const EventDropdown = ({ activeEvent, onSelectEvent }) => {
//     // ... existing EventDropdown code ...
//   };

//   // Main component render
//   return (
//     <div className="pb-10">
//       <div className="-mt-24">
//         <StatsSection isDashboard={false} pageType="trading" />
//       </div>

//       <div className="px-4 md:px-8 mx-4 -mt-12">
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//             <div className="flex items-center">
//               <BookUser className="text-gray-600 mr-2" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 {activeEvent
//                   ? `${activeEvent.title} Portfolio`
//                   : "Basic Trading Portfolio"}
//               </h2>
//             </div>
//             <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0 gap-x-3">
//               <button
//                 onClick={generatePDF}
//                 className="flex items-center space-x-2 bg-lightBlue-600 hover:bg-lightBlue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 mb-0 md:mb-0"
//               >
//                 <Download size={18} />
//                 <span>Export PDF Report</span>
//               </button>
//               <EventDropdown
//                 activeEvent={activeEvent}
//                 onSelectEvent={(event) => dispatch(setActiveEvent(event))}
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <PortfolioTable
//               transactions={transactions}
//               holdings={holdings}
//               onStockClick={handleStockClick}
//             />
//           </div>
//         </div>
//       </div>

//       {showDetailsModal && selectedStock && (
//         <StockDetailsModal
//           stock={selectedStock}
//           onClose={() => setShowDetailsModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserPortfolioPage;


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
  const { refetch } = useUserStats();
  const dispatch = useDispatch();
  const location = useLocation();
  const activeEvent = useSelector(selectActiveEvent);
  const activeEvents = useSelector(selectActiveEvents);
  const userId = useSelector((state) => state.user.auth?.user?._id);
  const user = useSelector((state) => state.user.auth?.user || {});
  const userSubscriptions = useSelector(
    (state) => state.user.subscriptionPlan?.userSubscriptions || []
  );

  const [selectedStock, setSelectedStock] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const transactions = useSelector((state) =>
    selectFilteredTransactions(state, activeEvent?._id || "none")
  );
  const holdings = useSelector(selectHoldings);
  const statistics = useSelector(selectStatistics);

  const activeSubscription = userSubscriptions.find(
    (sub) => sub.status === "Active" && !sub.isDeleted
  );

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

  const handleStockClick = (symbol) => {
    const stockTransactions = transactions
      .filter((t) => t.companySymbol === symbol)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const stockHolding = holdings.find((h) => h.companySymbol === symbol);
    
    setSelectedStock({
      symbol,
      transactions: stockTransactions,
      holding: stockHolding,
    });
    setShowDetailsModal(true);
  };

  const generatePDF = async () => {
    try {
      // Create new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Convert logo to base64
      const getBase64FromImageUrl = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };

      const logoBase64 = await getBase64FromImageUrl(logoImage);

      // Add logo and company header (centered)
      const pageWidth = doc.internal.pageSize.getWidth();
      const logoWidth = 45;
      const logoX = (pageWidth - logoWidth) / 2;
      
      doc.addImage(logoBase64, 'PNG', logoX, 15, logoWidth, logoWidth);
      
      // Company name (centered)
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 37, 41);
      doc.text("PGR - Virtual Trading App", pageWidth / 2, 65, { align: "center" });

      // User information (centered)
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`User: ${user.name || "N/A"} (ID: ${userId || "N/A"})`, pageWidth / 2, 75, { align: "center" });
      doc.text(`Portfolio: ${activeEvent ? activeEvent.title : "Basic Trading"}`, pageWidth / 2, 81, { align: "center" });
      doc.text(`Generated on: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}`, pageWidth / 2, 87, { align: "center" });

      // Divider line (full width)
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 95, pageWidth - 15, 95);

      // Portfolio Holdings section (centered)
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Portfolio Holdings", pageWidth / 2, 105, { align: "center" });

      // Prepare holdings data with proper formatting
      const holdingsData = holdings.map((holding) => {
        const stockTransactions = transactions
          .filter((t) => t.companySymbol === holding.companySymbol)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const buyTransactions = stockTransactions.filter(t => t.type === "buy");
        const sellTransactions = stockTransactions.filter(t => t.type === "sell");

        return [
          holding.companySymbol,
          holding.quantity.toString(),
          { content: `₹${holding.averageBuyPrice.toFixed(2)}`, styles: { halign: 'right', cellWidth: 25 } },
          { content: `₹${(holding.quantity * holding.averageBuyPrice).toFixed(2)}`, styles: { halign: 'right', cellWidth: 25 } },
          buyTransactions.length.toString(),
          sellTransactions.length.toString(),
          new Date(holding.lastUpdated).toLocaleDateString(),
        ];
      });

      // Holdings table (centered with proper cell formatting)
      autoTable(doc, {
        startY: 110,
        head: [
          [
            { content: "Symbol", styles: { halign: 'center', cellWidth: 25 } },
            { content: "Qty", styles: { halign: 'center', cellWidth: 15 } },
            { content: "Avg Price", styles: { halign: 'center', cellWidth: 25 } },
            { content: "Value", styles: { halign: 'center', cellWidth: 25 } },
            { content: "Buys", styles: { halign: 'center', cellWidth: 15 } },
            { content: "Sells", styles: { halign: 'center', cellWidth: 15 } },
            { content: "Last Updated", styles: { halign: 'center', cellWidth: 30 } },
          ]
        ],
        body: holdingsData,
        theme: "grid",
        tableWidth: 'auto',
        margin: { left: 15, right: 15 },
        headStyles: {
          fillColor: [13, 110, 253],
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak',
        },
        columnStyles: {
          0: { cellWidth: 25, halign: 'left' },
          1: { cellWidth: 15, halign: 'right' },
          2: { cellWidth: 25, halign: 'right' },
          3: { cellWidth: 25, halign: 'right' },
          4: { cellWidth: 15, halign: 'center' },
          5: { cellWidth: 15, halign: 'center' },
          6: { cellWidth: 30, halign: 'center' },
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak',
        },
        didDrawPage: function(data) {
          // Footer on every page
          const footerY = doc.internal.pageSize.getHeight() - 10;
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.setFont("helvetica", "normal");
          doc.text("Contact: support@pgr-virtualtrading.com | Phone: +1 (555) 123-4567", 
                  pageWidth / 2, footerY, { align: "center" });
        }
      });

      // Add new page for statistics
      doc.addPage();

      // Portfolio Statistics section (centered on new page)
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Portfolio Statistics", pageWidth / 2, 30, { align: "center" });

      // Calculate values
      const totalFees = transactions.length * 25;
      const virtualBalance = activeSubscription?.vertualAmount?.toFixed(2) || "0.00";
      const profitLoss = statistics.realizedPL.toFixed(2);

      // Statistics table (centered)
      autoTable(doc, {
        startY: 40,
        head: [
          [
            { content: "Metric", styles: { halign: 'left', fontStyle: 'bold', cellWidth: 60 } },
            { content: "Value", styles: { halign: 'right', cellWidth: 40 } }
          ]
        ],
        body: [
          ["Total Holdings", holdings.length.toString()],
          ["Virtual Balance", `₹${virtualBalance}`],
          ["Total Fees Paid", `₹${totalFees.toFixed(2)}`],
          ["Net Profit/Loss", `₹${profitLoss}`],
        ],
        theme: "plain",
        tableWidth: 'auto',
        margin: { left: (pageWidth - 100) / 2 }, // Center the table
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 60, halign: 'left' },
          1: { halign: "right", cellWidth: 40 },
        },
        styles: {
          fontSize: 12,
          cellPadding: 5,
        },
        didDrawPage: function(data) {
          // Footer on every page
          const footerY = doc.internal.pageSize.getHeight() - 10;
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.setFont("helvetica", "normal");
          doc.text("© 2023 PGR Virtual Trading App. All rights reserved.", 
                  pageWidth / 2, footerY, { align: "center" });
        }
      });

      // Save PDF
      doc.save(
        `PGR_Portfolio_${user.name || "User"}${activeEvent ? activeEvent.title.replace(/[^a-z0-9]/gi, "") : "Basic"}_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Event dropdown component
  const EventDropdown = ({ activeEvent, onSelectEvent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeEvents = useSelector(selectActiveEvents);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200 hover:bg-gray-50"
        >
          <span className="font-medium">
            {activeEvent ? activeEvent.title : "Basic Transactions"}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <button
              onClick={() => {
                onSelectEvent(null);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                !activeEvent ? "bg-blue-50 text-lightBlue-600" : "text-gray-700"
              }`}
            >
              Basic Transactions
            </button>
            {activeEvents.map((event) => (
              <button
                key={event._id}
                onClick={() => {
                  onSelectEvent(event);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                  activeEvent?._id === event._id
                    ? "bg-blue-50 text-lightBlue-600"
                    : "text-gray-700"
                }`}
              >
                {event.title}
              </button>
            ))}
          </div>
        )}
      </div>
    );
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
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
              <button
                onClick={generatePDF}
                className="flex items-center mt-2 mr-2 space-x-2 bg-lightBlue-600 hover:bg-lightBlue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 mb-2 md:mb-0"
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