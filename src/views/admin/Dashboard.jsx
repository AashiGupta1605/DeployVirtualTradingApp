// import React from "react";
// import CardPageVisits from "../../components/Admin/Cards/CardPageVisits";
// import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";
// import StatsSection from "../../components/Admin/Cards/StatsSection";

// export default function Dashboard() {

// return (
// <div className="mt-12 overflow-hidden">
// <StatsSection isDashboard={true} pageType="dashboard"  />
// <div className="px-4 mx-auto w-full -mt-12">
// <div className="flex flex-wrap">
// <div className="w-full xl:w-8/12 px-4">
// <CardPageVisits />
// </div>
// <div className="w-full xl:w-4/12 px-4">
// <CardSocialTraffic />
// </div>
// </div>
// </div>
// </div>
// );
// }


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNiftyData } from "../../redux/Common/nifty50Slice";
// import { fetchNifty500Data } from "../../redux/Common/nifty500Slice";
// import { fetchStockData } from "../../redux/Common/etfSlice";
// // import StockCard from "../../components/Admin/Cards/StockCard";
// import StatsSection from "../../components/Admin/Cards/StatsSection";
// import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";


// export default function Dashboard() {
//   const dispatch = useDispatch();

//   // Select data from all slices
//   const nifty50Data = useSelector((state) => state.common.nifty50.data);
//   console.log(nifty50Data);
//   const nifty500Data = useSelector((state) =>  state.common.nifty500.data);
//   console.log(nifty500Data);
//   const etfData = useSelector((state) => state.common.etf.stockData);
//   const loading = useSelector((state) => state.common.nifty50.loading || state.common.nifty500.loading || state.common.etf.loading);

//   useEffect(() => {
//     dispatch(fetchNiftyData({ page: 1, limit: 20, search: "" }));
//     dispatch(fetchNifty500Data({ page: 1, limit: 20, search: "" }));
//     dispatch(fetchStockData());
//   }, [dispatch]);

//   // Helper function to get top gainers and losers
//   const getTopStocks = (data, count = 5) => {
//     if (!Array.isArray(data) || data.length === 0) return [[], []];
    
//     const sorted = [...data].sort((a, b) => {
//       const aChange = parseFloat(a.changePercent) || 0;
//       const bChange = parseFloat(b.changePercent) || 0;
//       return bChange - aChange;
//     });

//     const gainers = sorted.slice(0, count);
//     const losers = sorted.slice(-count).reverse();
    
//     return [gainers, losers];
//   };

//   // Get top stocks for each category
//   const [nifty50Gainers, nifty50Losers] = getTopStocks(nifty50Data);
//   const [nifty500Gainers, nifty500Losers] = getTopStocks(nifty500Data);
//   const [etfGainers, etfLosers] = getTopStocks(etfData);

//   if (loading) {
//     return <div className="text-center py-8">Loading data...</div>;
//   }

//   return (
//     <div className="mt-12 overflow-hidden">
//       <StatsSection isDashboard={true} pageType="dashboard" />
//       <div className="px-4 mx-auto w-full -mt-12">
//         {/* Top Gainers Section */}
//         <div className="mb-8">
//           {/* <h2 className="text-xl font-bold text-blueGray-700 mb-4">Top Gainers</h2> */}
//           <div className="flex flex-wrap justify-between">
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 50 Top Gainers" 
//                 data={nifty50Gainers} 
//                 isGainer={true} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 500 Top Gainers" 
//                 data={nifty500Gainers} 
//                 isGainer={true} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="ETF Top Gainers" 
//                 data={etfGainers} 
//                 isGainer={true} 
//               />
//             </div>
//           </div>
//         </div>

//         {/* Top Losers Section */}
//         <div className="mb-8">
//           {/* <h2 className="text-xl font-bold text-blueGray-700 mb-4">Top Losers</h2> */}
//           <div className="flex flex-wrap justify-between">
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 50 Top Losers" 
//                 data={nifty50Losers} 
//                 isGainer={false} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 500 Top Losers" 
//                 data={nifty500Losers} 
//                 isGainer={false} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="ETF Top Losers" 
//                 data={etfLosers} 
//                 isGainer={false} 
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// working ---

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNiftyData } from "../../redux/Common/nifty50Slice";
// import { fetchNifty500Data } from "../../redux/Common/nifty500Slice";
// import { fetchStockData } from "../../redux/Common/etfSlice";
// import StatsSection from "../../components/Admin/Cards/StatsSection";
// import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Select data from all slices
//   const nifty50Data = useSelector((state) => state.common.nifty50.data);
//   const nifty500Data = useSelector((state) => state.common.nifty500.data);
//   const etfData = useSelector((state) => state.common.etf.stockData);

//   // Helper function to get top gainers and losers
//   const getTopStocks = (data, count = 5) => {
//     if (!Array.isArray(data) || data.length === 0) return [[], []];
    
//     const sorted = [...data].sort((a, b) => {
//       const aChange = parseFloat(a.changePercent) || 0;
//       const bChange = parseFloat(b.changePercent) || 0;
//       return bChange - aChange;
//     });

//     const gainers = sorted.slice(0, count);
//     const losers = sorted.slice(-count).reverse();
    
//     return [gainers, losers];
//   };

//   // Get top stocks for each category
//   const [nifty50Gainers, nifty50Losers] = getTopStocks(nifty50Data);
//   const [nifty500Gainers, nifty500Losers] = getTopStocks(nifty500Data);
//   const [etfGainers, etfLosers] = getTopStocks(etfData);

//   useEffect(() => {
//     let isMounted = true;
    
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Fetch all data in parallel
//         await Promise.all([
//           dispatch(fetchNiftyData({ page: 1, limit: 20, search: "" })),
//           dispatch(fetchNifty500Data({ page: 1, limit: 20, search: "" })),
//           dispatch(fetchStockData())
//         ]);
        
//         if (isMounted) {
//           setLoading(false);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError("Failed to load data. Please try again.");
//           setLoading(false);
//           console.error("Dashboard data fetch error:", err);
//         }
//       }
//     };

//     fetchAllData();

//     // Cleanup function
//     return () => {
//       isMounted = false;
//     };
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-500">
//         {error}
//         <button 
//           onClick={() => window.location.reload()} 
//           className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-12 overflow-hidden">
//       <StatsSection isDashboard={true} pageType="dashboard" />
//       <div className="px-4 mx-auto w-full -mt-12">
//         {/* Top Gainers Section */}
//         <div className="mb-8">
//           <div className="flex flex-wrap justify-between">
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 50 Gainers" 
//                 data={nifty50Gainers} 
//                 isGainer={true} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 500 Gainers" 
//                 data={nifty500Gainers} 
//                 isGainer={true} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="ETF Gainers" 
//                 data={etfGainers} 
//                 isGainer={true} 
//               />
//             </div>
//           </div>
//         </div>

//         {/* Top Losers Section */}
//         <div className="mb-8">
//           <div className="flex flex-wrap justify-between">
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 50 Losers" 
//                 data={nifty50Losers} 
//                 isGainer={false} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="Nifty 500 Losers" 
//                 data={nifty500Losers} 
//                 isGainer={false} 
//               />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 mb-4">
//               <CardSocialTraffic 
//                 title="ETF Losers" 
//                 data={etfLosers} 
//                 isGainer={false} 
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// remove first from the array 0 from nift50 or nift500

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNiftyData } from "../../redux/Common/nifty50Slice";
import { fetchNifty500Data } from "../../redux/Common/nifty500Slice";
import { fetchStockData } from "../../redux/Common/etfSlice";
import StatsSection from "../../components/Admin/Cards/StatsSection";
import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";
import StocksGainerLosser from "../../components/Common/StocksGainerLosser";
export default function Dashboard() {
  return (
    <div className="mt-12 overflow-hidden">
      <StatsSection isDashboard={true} pageType="dashboard" />
      <div className="px-4 mx-auto w-full -mt-12">
        {/* Top Gainers Section */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-between mt-12">
          <StocksGainerLosser  showHeader={false}/>
          </div>
        </div>

      </div>
    </div>
  );
}