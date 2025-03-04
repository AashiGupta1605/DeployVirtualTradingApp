import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, itemsPerPage, onPageChange, onItemsPerPageChange }) => {
  return (
    <div className="flex justify-between items-center mt-4 px-4 py-3">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="border rounded px-2 py-1 text-sm text-gray-600"
        >
          {[5, 10, 15, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">
          {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalPages)} of {totalPages}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;


