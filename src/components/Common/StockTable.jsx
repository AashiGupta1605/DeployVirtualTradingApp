import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Edit, Trash2, PlusCircle, Filter, Check, X } from "lucide-react";
import ConfirmationModal from "../../components/Admin/Modals/ConformationModal";
import "../../assets/styles/table.css";

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });
  const [expandedRow, setExpandedRow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data/stocks");
        console.log("Fetched stock data:", response.data);
        
        if (Array.isArray(response.data)) {
          setStockData(response.data);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Error fetching stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleActionClick = (stock, action) => {
    setSelectedStock(stock);
    setPendingAction(action);
    setIsModalOpen(true);
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
    <div className="mx-2 overflow-hidden mt-8">
      <div className="mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Filter className="mr-2 text-gray-600" size={20} />
          ETF Data
        </h2>
      </div>

      {/* Table container with fixed height and scrollbar */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto h-[28rem] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b sticky top-0">
            <tr>
              {[
                "symbol",
                "open",
                "dayHigh",
                "dayLow",
                "previousClose",
                "lastPrice",
                "change",
                "pChange",
                "totalTradedVolume",
                "totalTradedValue",
                "yearHigh",
                "yearLow",
                "perChange365d",
                "perChange30d",
              ].map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => requestSort(column)}
                >
                  {column.replace(/([A-Z])/g, " $1").toUpperCase()}
                  {sortConfig.key === column &&
                    (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getSortedData(stockData).map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => toggleRow(index)}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    expandedRow === index ? "bg-gray-50" : ""
                  }`}
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
                  {[
                    "open",
                    "dayHigh",
                    "dayLow",
                    "previousClose",
                    "lastPrice",
                    "change",
                    "pChange",
                    "totalTradedVolume",
                    "totalTradedValue",
                    "yearHigh",
                    "yearLow",
                    "perChange365d",
                    "perChange30d",
                  ].map((field, idx) => (
                    <td key={idx} className="px-6 py-4">
                      {row[field] ?? "N/A"}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          // Handle the action here
          setIsModalOpen(false);
        }}
        message={`Are you sure you want to ${pendingAction} this stock?`}
      />
    </div>
  );
};

export default StockTable;