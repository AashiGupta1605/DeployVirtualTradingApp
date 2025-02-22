// pages/QueriesPage.jsx
import React, { useState } from "react";
import QueriesTable from "../../components/Admin/Tables/QueriesTable";
import TableFilters from "../../components/Admin/Tables/TableFilters";
import QueriesPagination from "../../components/Admin/Tables/Pagination";
import StatsSection from "../../components/Admin/Cards/StatsSection";

const QueriesPage = () => {
  // States
  const [orgCount, setOrgCount] = useState(0);
  const [users, setUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    type: false,
    dateRange: false,
    search: false
  });
  const [tempFilters, setTempFilters] = useState({
    type: "all",
    startDate: null,
    endDate: null,
  });

  // Handler Functions
  const handleTypeFilterChange = (e) => {
    setTempFilters({ ...tempFilters, type: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setTempFilters({ ...tempFilters, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setTempFilters({ ...tempFilters, endDate: date });
  };

  const applyFilters = () => {
    setActiveFilters({
      type: tempFilters.type !== 'all',
      dateRange: !!(tempFilters.startDate && tempFilters.endDate),
      search: !!searchQuery
    });
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setTempFilters({
      type: "all",
      startDate: null,
      endDate: null,
    });
    setSearchQuery("");
    setActiveFilters({
      type: false,
      dateRange: false,
      search: false
    });
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className="mt-12 overflow-hidden">
      {/* Stats Section */}
      <StatsSection users={users} orgCount={orgCount} />

      {/* Main Content */}
      <div className="px-8 mx-4 -mt-38">
        <TableFilters 
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          tempFilters={tempFilters}
          handleTypeFilterChange={handleTypeFilterChange}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        <QueriesTable 
          tempFilters={tempFilters}
          searchQuery={searchQuery}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setTotalItems={setTotalItems}
          setOrgCount={setOrgCount}
          setUsers={setUsers}
        />

        <QueriesPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          filteredContacts={totalItems}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
        />
      </div>
    </div>
  );
};

export default QueriesPage;