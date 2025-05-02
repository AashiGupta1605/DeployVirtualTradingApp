// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { 
//   ChevronDown,
//   TrendingUp,
//   TrendingDown,
//   BarChart2,
//   Award,
//   DollarSign,
//   BookUser,
// } from 'lucide-react';

// import { 
//   fetchTransactionHistory,
//   selectHoldings,
//   selectStatistics,
//   fetchEventSpecificTransactions,
//   selectFilteredTransactions
// } from '../../../redux/User/trading/tradingSlice';
// import { 
//   getUserSubscriptions 
// } from '../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
// import { 
//   selectActiveEvent,
//   selectActiveEvents,
//   setActiveEvent,
//   fetchUserEvents
// } from '../../../redux/User/events/eventsSlice';
// import StockDetailsModal from './StockDetailsModal';
// import PortfolioTable from './PortfolioTable';
// import StatsSection from "../Cards/StatsSection";
// import { useUserStats } from "../../../hooks/userUserStats";
// const UserPortfolioPage = () => {
// const {refetch} = useUserStats();
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const activeEvent = useSelector(selectActiveEvent);
//     const activeEvents = useSelector(selectActiveEvents);
//     const userId = useSelector(state => state.user.auth?.user?._id);
//     const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
    
//     const [selectedStock, setSelectedStock] = useState(null);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
  
//     // Get filtered transactions based on active event
//     const transactions = useSelector(state => 
//       selectFilteredTransactions(state, activeEvent?._id || 'none')
//     );
    
//     const holdings = useSelector(selectHoldings);
//     const statistics = useSelector(selectStatistics);
  
//     const activeSubscription = userSubscriptions.find(sub => 
//       sub.status === 'Active' && !sub.isDeleted
//     );



//   useEffect(() => {
//     const initializeEvent = async () => {
//       if (location.state?.eventId) {
//         try {
//           // First check if we already have the events loaded
//           let event = activeEvents.find(e => e._id === location.state.eventId);
          
//           if (!event) {
//             // If event not found, fetch events
//             await dispatch(fetchUserEvents());
//             const updatedEvents = useSelector(selectActiveEvents);
//             event = updatedEvents.find(e => e._id === location.state.eventId);
//           }
          
//           if (event) {
//             dispatch(setActiveEvent(event));
//           }
//         } catch (error) {
//           console.error('Error initializing event:', error);
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeEvent();
//   }, [location.state, dispatch]);

//   useEffect(() => {
//     if (location.state?.eventId) {
//       // First check if the event is already in activeEvents
//       const event = activeEvents.find(e => e._id === location.state.eventId);
//       if (event) {
//         dispatch(setActiveEvent(event));
//       } else {
//         // If event not found, fetch events first
//         dispatch(fetchUserEvents()).then(() => {
//           const foundEvent = useSelector(selectActiveEvents).find(e => e._id === location.state.eventId);
//           if (foundEvent) {
//             dispatch(setActiveEvent(foundEvent));
//           }
//         });
//       }
//     }
//   }, [location.state, activeEvents, dispatch]);

//   useEffect(() => {
//     if (userId && !isLoading) {
//       dispatch(getUserSubscriptions(userId));
      
//       if (activeEvent?._id) {
//         dispatch(fetchEventSpecificTransactions({ 
//           userId, 
//           eventId: activeEvent._id 
//         }));
//       } else {
//         dispatch(fetchTransactionHistory({ 
//           userId, 
//           eventId: 'none'
//         }));
//       }
//     }
//   }, [dispatch, userId, activeEvent, isLoading]);

//   const handleStockClick = (symbol) => {
//     const stockTransactions = transactions
//       .filter(t => t.companySymbol === symbol)
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     const stockHolding = holdings.find(h => h.companySymbol === symbol);
    
//     setSelectedStock({
//       symbol,
//       transactions: stockTransactions,
//       holding: stockHolding
//     });
//     setShowDetailsModal(true);
//   };

//   const EventDropdown = ({ activeEvent, onSelectEvent }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const activeEvents = useSelector(selectActiveEvents);
  
//     return (
//       <div className="relative">
//         <button 
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200 hover:bg-gray-50"
//         >
//           <span className="font-medium">
//             {activeEvent ? activeEvent.title : 'Basic Transactions'}
//           </span>
//           <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}/>
//         </button>
        
//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//             <button
//               onClick={() => {
//                 onSelectEvent(null);
//                 setIsOpen(false);
//               }}
//               className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
//                 !activeEvent ? 'bg-blue-50 text-lightBlue-600' : 'text-gray-700'
//               }`}
//             >
//               Basic Transactions
//             </button>
//             {activeEvents.map(event => (
//               <button
//                 key={event._id}
//                 onClick={() => {
//                   onSelectEvent(event);
//                   setIsOpen(false);
//                 }}
//                 className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
//                   activeEvent?._id === event._id ? 'bg-blue-50 text-lightBlue-600' : 'text-gray-700'
//                 }`}
//               >
//                 {event.title}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const StatsCard = ({ title, value, icon, description, change, changeColor }) => {
//     return (
//       <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
//         <div className="flex-auto p-6">
//           <div className="flex flex-wrap">
//             <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
//               <h5 className="text-blueGray-400 uppercase font-bold text-xs">
//                 {title}
//               </h5>
//               <span className="font-semibold text-xl text-blueGray-700">
//                 {value}
//               </span>
//             </div>
//             <div className="relative w-auto pl-4 flex-initial">
//               <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-600">
//                 {icon}
//               </div>
//             </div>
//           </div>
//           <p className="text-sm text-blueGray-400 mt-4">
//             <span className={`${changeColor} mr-2`}>
//               {change}
//             </span>
//             <span className="whitespace-nowrap">{description}</span>
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//           <div className="-mt-24">
//         <StatsSection isDashboard={false} pageType="trading" />
//           </div>

//         {/* </div> */}
//       {/* </div> */}

//       {/* Portfolio Content */}
//       <div className="px-4 md:px-8 mx-4 -mt-12">
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//             <div className="flex items-center">
//               <BookUser className="text-gray-600 mr-2" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">
//                 {activeEvent ? `${activeEvent.title} Portfolio` : 'Basic Trading Portfolio'}
//               </h2>
//             </div>
//             <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0">
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



// pdf working 


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
import logoImage from "../../../assets/img/PGR_logo.jpeg"; // Make sure this path is correct

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

  // Generate PDF report
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

      // Add logo and company header
      doc.addImage(logoBase64, 'JPEG', 80, 15, 45, 45);
      
      // Company name
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 37, 41);
      doc.text("PGR - Virtual Trading App", 105, 65, { align: "center" });

      // User information
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`User: ${user.name || "N/A"} (ID: ${userId || "N/A"})`, 105, 75, { align: "center" });
      doc.text(`Portfolio: ${activeEvent ? activeEvent.title : "Basic Trading"}`, 105, 81, { align: "center" });
      doc.text(`Generated on: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}`, 105, 87, { align: "center" });

      // Divider line
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 95, 195, 95);

      // Portfolio Holdings section
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Portfolio Holdings", 15, 105);

      // Prepare holdings data
      const holdingsData = holdings.map((holding) => {
        const stockTransactions = transactions
          .filter((t) => t.companySymbol === holding.companySymbol)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const buyTransactions = stockTransactions.filter(t => t.type === "buy");
        const sellTransactions = stockTransactions.filter(t => t.type === "sell");

        return [
          holding.companySymbol,
          holding.quantity,
          `₹${holding.averageBuyPrice.toFixed(2)}`,
          `₹${(holding.quantity * holding.averageBuyPrice).toFixed(2)}`,
          buyTransactions.length,
          sellTransactions.length,
          new Date(holding.lastUpdated).toLocaleDateString(),
        ];
      });

      // Holdings table
      autoTable(doc, {
        startY: 110,
        head: [["Symbol", "Qty", "Avg Price", "Value", "Buys", "Sells", "Last Updated"]],
        body: holdingsData,
        theme: "grid",
        headStyles: {
          fillColor: [13, 110, 253],
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 30, halign: "left" },
          1: { cellWidth: 15, halign: "left" },
          2: { cellWidth: 30, halign: "left" },
          3: { cellWidth: 30, halign: "left" },
          4: { cellWidth: 15, halign: "left" },
          5: { cellWidth: 15, halign: "left" },
          6: { cellWidth: 30, halign: "left" },
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        margin: { left: 15, right: 15 },
      });

      // Portfolio Statistics section
      const holdingsEndY = doc.lastAutoTable.finalY + 10;
      doc.setDrawColor(200, 200, 200);
      doc.line(15, holdingsEndY, 195, holdingsEndY);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Portfolio Statistics", 15, holdingsEndY + 40);

      const totalFees = transactions.length * 25; // ₹25 per transaction

      autoTable(doc, {
        startY: holdingsEndY + 40,
        body: [
          ["Total Holdings", holdings.length],
          ["Virtual Balance", `₹${activeSubscription?.vertualAmount?.toFixed(2) || "0.00"}`],
          ["Total Fees Paid", `₹${totalFees.toFixed(2)}`],
          ["Net Profit/Loss", `₹${statistics.realizedPL.toFixed(2)}`],
        ],
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 60 },
          1: { halign: "right", cellWidth: 40 },
        },
        styles: {
          fontSize: 12,
          cellPadding: 5,
        },
        margin: { left: 15, right: 15 },
      });

      // Stock Activity section
      const statsEndY = doc.lastAutoTable.finalY + 10;
      doc.setDrawColor(200, 200, 200);
      doc.line(15, statsEndY, 195, statsEndY);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Stock Activity History", 15, statsEndY + 15);

      const activityData = transactions.map((transaction) => ({
        date: new Date(transaction.createdAt).toLocaleDateString(),
        time: new Date(transaction.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        symbol: transaction.companySymbol,
        type: transaction.type.toUpperCase(),
        qty: transaction.numberOfShares,
        price: `₹${transaction.price.toFixed(2)}`,
        amount: `₹${(transaction.price * transaction.numberOfShares).toFixed(2)}`,
        fee: "₹25.00",
      }));

      autoTable(doc, {
        startY: statsEndY + 20,
        head: [["Date", "Time", "Symbol", "Type", "Qty", "Price", "Amount", "Fee"]],
        body: activityData.map(t => [
          t.date, t.time, t.symbol, t.type, t.qty, t.price, t.amount, t.fee
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [13, 110, 253],
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 20, halign: "left" },
          1: { cellWidth: 20, halign: "left" },
          2: { cellWidth: 30, halign: "left" },
          3: { cellWidth: 15, halign: "left" },
          4: { cellWidth: 15, halign: "left" },
          5: { cellWidth: 30, halign: "left" },
          6: { cellWidth: 30, halign: "left" },
          7: { cellWidth: 25, halign: "left" },
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        margin: { left: 15, right: 15 },
      });

      // Footer
      const footerY = 285;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont("helvetica", "normal");
      doc.text("Contact Us:", 105, footerY, { align: "center" });
      doc.text("Email: praedicoglobalresearch@gmail.com | Phone: +1 (555) 123-4567", 105, footerY + 5, { align: "center" });
      doc.text("© 2025 PGR Virtual Trading App. All rights reserved.", 105, footerY + 10, { align: "center" });

      // Save PDF
      doc.save(
        `PGR_Portfolio_${user.name || "User"}_${activeEvent ? activeEvent.title.replace(/[^a-z0-9]/gi, "_") : "Basic"}_${new Date()
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

