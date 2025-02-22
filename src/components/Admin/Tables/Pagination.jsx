// components/Queries/QueriesPagination.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QueriesPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  filteredContacts,
  indexOfFirstItem,
  indexOfLastItem
}) => {
  return (
    <div className="flex justify-between items-center mt-4 px-4 py-3">
      {/* Left side - Rows per page and results count */}
      <div className="flex items-center space-x-4">
        {/* Rows per page selector */}
        <label className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            Rows per page:
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="form-select px-4 rounded-md border-gray-300 shadow-sm 
                     focus:border-lightBlue-500 focus:ring focus:ring-lightBlue-200 
                     focus:ring-opacity-50 text-sm py-2"
          >
            {[2, 5, 15, 25, 50, 100].map((num) => (
              <option key={num} value={num} className="text-gray-700">
                {num}
              </option>
            ))}
          </select>
        </label>

        {/* Results count */}
        <div className="hidden sm:block text-sm text-gray-700">
          <span className="font-semibold">{indexOfFirstItem + 1}</span> -{" "}
          <span className="font-semibold">
            {Math.min(indexOfLastItem, filteredContacts.length)}
          </span>{" "}
          of <span className="font-semibold">{filteredContacts.length}</span>
        </div>
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous page button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-gray-200 transition-colors duration-150"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (totalPages <= 5) return true;
            if (page === 1 || page === totalPages) return true;
            return Math.abs(page - currentPage) <= 1;
          })
          .map((page, i, arr) => (
            <React.Fragment key={page}>
              {/* Add ellipsis if there's a gap */}
              {i > 0 && arr[i - 1] !== page - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              
              {/* Page number button */}
              <button
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md transition-colors duration-150
                  ${
                    currentPage === page
                      ? "bg-lightBlue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        {/* Next page button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-gray-200 transition-colors duration-150"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// PropTypes for better development experience
QueriesPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  filteredContacts: PropTypes.array.isRequired,
  indexOfFirstItem: PropTypes.number.isRequired,
  indexOfLastItem: PropTypes.number.isRequired,
};

export default QueriesPagination;