// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ChevronDown, ChevronRight, ChevronLeft, Filter } from "lucide-react";
// import ConfirmationModal from "../../components/Admin/Modals/ConformationModal";
// import "../../assets/styles/table.css";

// const StockTable = () => {
//   const [stockData, setStockData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/admin/etfdata");
//         if (Array.isArray(response.data)) {
//           setStockData(response.data);
//         } else {
//           setError("Invalid data format received");
//         }
//       } catch (error) {
//         setError("Error fetching stock data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Pagination logic
//   const filteredData = searchTerm
//     ? stockData.filter(stock => stock.symbol.toLowerCase() === searchTerm.toLowerCase())
//     : stockData;

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Sorting logic
//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     } else if (sortConfig.key === key && sortConfig.direction === "descending") {
//       direction = "none";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortedData = (data) => {
//     if (sortConfig.direction === "none" || !sortConfig.key) return data;

//     return [...data].sort((a, b) => {
//       const valueA = a[sortConfig.key] ?? "";
//       const valueB = b[sortConfig.key] ?? "";
//       return sortConfig.direction === "ascending"
//         ? valueA.toString().localeCompare(valueB.toString())
//         : valueB.toString().localeCompare(valueA.toString());
//     });
//   };

//   const sortedData = getSortedData(paginatedData);

//   // Pagination controls
//   const renderPageNumbers = () => {
//     let pages = [];
//     const totalVisiblePages = 5;

//     if (totalPages <= totalVisiblePages) {
//       pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     } else {
//       let start = Math.max(
//         1,
//         Math.min(
//           currentPage - Math.floor(totalVisiblePages / 2),
//           totalPages - totalVisiblePages + 1
//         )
//       );
//       let end = Math.min(start + totalVisiblePages - 1, totalPages);

//       if (end === totalPages) {
//         start = end - totalVisiblePages + 1;
//       }

//       pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//     }

//     return (
//       <>
//         {currentPage > 3 && <span className="px-2 text-gray-500">...</span>}
//         {pages.map((page) => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`px-3 py-1 rounded-md ${
//               currentPage === page
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//         {currentPage < totalPages - 2 && <span className="px-2 text-gray-500">...</span>}
//       </>
//     );
//   };

//   return (
//     <div className="mx-2 overflow-hidden mt-8">
//       {/* Search and header section */}
//       <div className="mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center border-b">
//         <h2 className="text-xl font-bold text-gray-800 flex items-center">
//           <Filter className="mr-2 text-gray-600" size={20} />
//           ETF Data
//         </h2>
//         <input
//           type="text"
//           placeholder="Search by Symbol..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border px-4 py-2 rounded shadow-md focus:outline-none"
//         />
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-x-auto h-[28rem] overflow-y-auto">
//         <table className="w-full">
//          <thead className="bg-gray-50 border-b sticky top-0">
//              <tr>
//              {["symbol", "open", "dayHigh", "dayLow", "previousClose", "lastPrice", "change", "pChange", "totalTradedVolume", "totalTradedValue", "yearHigh", "yearLow", "perChange365d", "perChange30d"].map((column) => (
//                 <th
//                   key={column}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort(column)}
//                 >
//                   {column.replace(/([A-Z])/g, " $1").toUpperCase()} {sortConfig.key === column && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {paginatedData.map((row, index) => (
//               <React.Fragment key={index}>
//                 <tr
//                   onClick={() => toggleRow(index)}
//                   className={`cursor-pointer hover:bg-gray-50 transition-colors ${expandedRow === index ? "bg-gray-50" : ""}`}
//                 >
//                   <td className="px-6 py-4 flex items-center">
//                     {expandedRow === index ? <ChevronDown className="mr-2 text-gray-500" size={16} /> : <ChevronRight className="mr-2 text-gray-500" size={16} />}
//                     <Link to={`/company/${row.symbol}`} className="text-blue-500 hover:text-blue-800">{row.symbol}</Link>
//                   </td>
//                   {["open", "dayHigh", "dayLow", "previousClose", "lastPrice", "change", "pChange", "totalTradedVolume", "totalTradedValue", "yearHigh", "yearLow", "perChange365d", "perChange30d"].map((field, idx) => (
//                     <td key={idx} className="px-6 py-4">{row[field] ?? "N/A"}</td>
//                   ))}
//                 </tr>
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div className="flex justify-between items-center mt-4 px-4 py-3">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-gray-700">Rows per page:</span>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => {
//               setItemsPerPage(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className="border rounded px-2 py-1 text-sm text-gray-600"
//           >
//             {[5, 10, 15, 25, 50, 100, 200].map((num) => (
//               <option key={num} value={num}>{num}</option>
//             ))}
//           </select>
//           <span className="text-sm text-gray-600">
//             {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
//           </span>
//         </div>

//         <div className="flex items-center space-x-1">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//           >
//             <ChevronLeft size={16} />
//           </button>

//           {renderPageNumbers()}

//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>

//       <ConfirmationModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onConfirm={() => setIsModalOpen(false)} 
//         message={`Are you sure you want to ${pendingAction} this stock?`} 
//       />
//     </div>
//   );
// };

// export default StockTable;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ChevronDown, ChevronRight, ChevronLeft, Filter } from "lucide-react";
// import ConfirmationModal from "../../components/Admin/Modals/ConformationModal";
// import "../../assets/styles/table.css";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_API_URL } from "../../utils/BaseUrl";
// import { fetchStockData } from "../../redux/Common/etfSlice"; 

// const StockTable = () => {
//   const dispatch = useDispatch();
 
//   const { stockData, loading, error } = useSelector((state) => state.stock);

//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     dispatch(fetchStockData());
//   }, [dispatch]);


//   // Filtering logic
//   const filteredData = searchTerm
//     ? stockData.filter(stock => 
//         stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : stockData;

//   // Sorting logic
//   const getSortedData = (data) => {
//     if (sortConfig.direction === "none" || !sortConfig.key) return data;

//     return [...data].sort((a, b) => {
//       const valueA = a[sortConfig.key] ?? "";
//       const valueB = b[sortConfig.key] ?? "";
      
//       if (!isNaN(valueA) && !isNaN(valueB)) {
//         return sortConfig.direction === "ascending" 
//           ? valueA - valueB 
//           : valueB - valueA;
//       }
      
//       return sortConfig.direction === "ascending"
//         ? valueA.toString().localeCompare(valueB.toString())
//         : valueB.toString().localeCompare(valueA.toString());
//     });
//   };

//   const sortedData = getSortedData(filteredData);

//   // Pagination logic
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const paginatedData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

//   // Pagination display logic
//   const renderPageNumbers = () => {
//     const pages = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, '...', totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
//       }
//     }

//     return pages.map((page, index) => {
//       if (page === '...') {
//         return (
//           <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
//             ...
//           </span>
//         );
//       }
      
//       return (
//         <button
//           key={page}
//           onClick={() => setCurrentPage(page)}
//           className={`px-3 py-1 rounded-md ${
//             currentPage === page
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           {page}
//         </button>
//       );
//     });
//   };

//   const toggleRow = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };
  
//   if (loading) {
//     return (
//       <div className="mt-12 flex items-center justify-center w-full h-64">
//         <div className="flex flex-col items-center gap-4">
//           <div
//             className="border-blue-500 mt-72 inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
//             role="status"
//           ></div>
//           <p className="text-gray-600 text-sm">Loading data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//       </div>
//     );
//   }


//   return (
//     <div className="mx-2 overflow-hidden mt-8">
//       {/* Search and header section */}
//       <div className="mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center border-b">
//         <h2 className="text-xl font-bold text-gray-800 flex items-center">
//           <Filter className="mr-2 text-gray-600" size={20} />
//           ETF Data
//         </h2>
//         <input
//           type="text"
//           placeholder="Search by Symbol..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border px-4 py-2 rounded shadow-md focus:outline-none"
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white shadow-md rounded-lg overflow-x-auto h-[28rem] overflow-y-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b sticky top-0">
//             <tr>
//               {[
//                 "symbol", "open", "dayHigh", "dayLow", "previousClose", 
//                 "lastPrice", "change", "pChange", "totalTradedVolume", 
//                 "totalTradedValue", "yearHigh", "yearLow", 
//                 "perChange365d", "perChange30d"
//               ].map((column) => (
//                 <th
//                   key={column}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort(column)}
//                 >
//                   <div className="flex items-center">
//                     {column.replace(/([A-Z])/g, " $1").toUpperCase()}
//                     {sortConfig.key === column && (
//                       <span className="ml-1">
//                         {sortConfig.direction === "ascending" ? "▲" : "▼"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
          
//           <tbody className="divide-y divide-gray-200">
//             {paginatedData.map((row, index) => (
//               <React.Fragment key={row.symbol}>
//                 <tr
//                   onClick={() => toggleRow(index)}
//                   className={`cursor-pointer hover:bg-gray-50 ${
//                     expandedRow === index ? "bg-gray-50" : ""
//                   }`}
//                 >
//                   <td className="px-6 py-4 flex items-center">
//                     {expandedRow === index ? (
//                       <ChevronDown className="mr-2 text-gray-500" size={16} />
//                     ) : (
//                       <ChevronRight className="mr-2 text-gray-500" size={16} />
//                     )}
//                     <Link 
//                       to={`/company/${row.symbol}`}
//                       className="text-blue-500 hover:text-blue-800"
//                     >
//                       {row.symbol}
//                     </Link>
//                   </td>
//                   {[
//                     "open", "dayHigh", "dayLow", "previousClose", "lastPrice",
//                     "change", "pChange", "totalTradedVolume", "totalTradedValue",
//                     "yearHigh", "yearLow", "perChange365d", "perChange30d"
//                   ].map((field) => (
//                     <td key={field} className="px-6 py-4">
//                       {typeof row[field] === 'number' 
//                         ? row[field].toFixed(2) 
//                         : row[field] || "N/A"}
//                     </td>
//                   ))}
//                 </tr>
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div className="flex justify-between items-center mt-4 px-4 py-3">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-gray-700">Rows per page:</span>
//           <select
//             value={itemsPerPage} 
//             onChange={(e) => {
//               setItemsPerPage(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className="border rounded px-6 py-2 text-sm text-gray-600"
//           >
//             {[5, 10, 15, 25, 50, 100, 200].map((num) => (
//               <option key={num} value={num}>{num}</option>
//             ))}
//           </select>
//           <span></span>
//           <span className="text-sm text-gray-600">
//             {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedData.length)} {" "}
//              of {" "} {sortedData.length}
//           </span>
//         </div>

//         <div className="flex items-center space-x-1">
//           <button
//             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//           >
//             <ChevronLeft size={16} />
//           </button>

//           {renderPageNumbers()}

//           <button
//             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>

//       <ConfirmationModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onConfirm={() => setIsModalOpen(false)} 
//         message="Are you sure you want to perform this action?" 
//       />
//     </div>
//   );
// };

// export default StockTable;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronLeft, Filter } from "lucide-react";
import { fetchStockData } from "../../redux/Common/etfSlice";
import "../../assets/styles/table.css";

const StockTable = () => {
  const dispatch = useDispatch();
  const { stockData, loading, error } = useSelector((state) => state.stock);
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (sortConfig.direction === "none" || !sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const valueA = a[sortConfig.key] ?? "";
      const valueB = b[sortConfig.key] ?? "";

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "ascending" ? valueA - valueB : valueB - valueA;
      } else {
        return sortConfig.direction === "ascending"
          ? valueA.toString().localeCompare(valueB.toString())
          : valueB.toString().localeCompare(valueA.toString());
      }
    });
  };


  const filteredData = searchTerm
    ? stockData.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : stockData;

  const sortedData = getSortedData(filteredData);
  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination display logic
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) {
    return (
      <div className="mt-12 flex items-center justify-center w-full h-64">
        <div className="flex flex-col items-center gap-4">
          <div
            className="border-blue-500 mt-72 inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <p className="text-gray-600 text-sm">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-2 mt-8 overflow-hidden">
      <div className="mt-24 flex items-center justify-between rounded bg-gray-100 px-6 py-4 shadow-md border-b">
        <h2 className="flex items-center text-xl font-bold text-gray-800">
          <Filter className="mr-2 text-gray-600" size={20} /> ETF Data
        </h2>
        <div className="relative">
  <input
    type="text"
    placeholder="Search by symbol..."
    className="border p-2 pr-10 rounded w-full"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  {searchTerm && (
    <button
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-0"
      onClick={() => setSearchTerm("")}
    >
      ✕
    </button>
  )}
</div>


      </div>

      <div className="h-[28rem] overflow-x-auto overflow-y-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="sticky top-0 border-b bg-gray-50">
            <tr>
              {["symbol", "open", "dayHigh", "dayLow", "previousClose", "lastPrice", "change", "pChange", "totalTradedVolume", "totalTradedValue", "yearHigh", "yearLow", "perChange365d", "perChange30d"].map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(column)}
                >
                  {column.replace(/([A-Z])/g, " $1").toUpperCase()} {sortConfig.key === column && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => toggleRow(index)}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 ${expandedRow === index ? "bg-gray-50" : ""}`}
                >
                  <td className="px-6 py-4 flex items-center">
                    {expandedRow === index ? (
                      <ChevronDown className="mr-2 text-gray-500" size={16} />
                    ) : (
                      <ChevronRight className="mr-2 text-gray-500" size={16} />
                    )}
                    <Link to={`/company/${row.symbol}`} className="text-blue-500 hover:text-blue-800">
                      {row.symbol}
                    </Link>
                  </td>
                  {["open", "dayHigh", "dayLow", "previousClose", "lastPrice", "change", "pChange", "totalTradedVolume", "totalTradedValue", "yearHigh", "yearLow", "perChange365d", "perChange30d"].map((field, idx) => (
                    <td key={idx} className="px-6 py-4">{row[field] ?? "N/A"}</td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4 py-3">
   <div className="flex items-center space-x-4">
    <span className="text-sm text-gray-700">Rows per page:</span>
    <select
            value={itemsPerPage} 
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-6 py-2 text-sm text-gray-600"
          >
            {[5, 10, 15, 25, 50, 100, 200].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span></span>
          <span className="text-sm text-gray-600">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedData.length)} {" "}
             of {" "} {sortedData.length}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
