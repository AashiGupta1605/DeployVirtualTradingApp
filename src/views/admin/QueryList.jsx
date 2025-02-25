// pages/QueriesPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QueriesTable from "../../components/Admin/Tables/QueryTable/QueriesTable";
import Pagination from '../../components/Common/TableItems/Pagination';
import TableFilters from '../../components/Common/TableItems/TableFilters';


import StatsSection from "../../components/Admin/Cards/StatsSection";
import { fetchContacts } from "../../redux/Admin/QueryListPage/QueryTableSllice";

const QueriesPage = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.admin.queryTable);

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
    type: 'all',
    startDate: null,
    endDate: null,
    status: 'all' // Additional filter
  });
  // Fetch contacts on component mount
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Filter contacts based on filters and search
  const filteredContacts = contacts.filter(contact => {
    // Type Filter
    if (tempFilters.type !== 'all' && contact.type !== tempFilters.type) 
      return false;

    // Date Range Filter
    if (tempFilters.startDate && tempFilters.endDate) {
      const contactDate = new Date(contact.createDate);
      if (contactDate < tempFilters.startDate || contactDate > tempFilters.endDate) 
        return false;
    }

    // Search Filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return ['name', 'email', 'type'].some(field => 
        contact[field]?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Update total items when filtered contacts change
  useEffect(() => {
    setTotalItems(filteredContacts.length);
  }, [filteredContacts]);

  // Handler Functions
  const handleTypeFilterChange = (e) => {
    setTempFilters(prev => ({ ...prev, type: e.target.value }));
  };

  const handleStartDateChange = (date) => {
    setTempFilters(prev => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setTempFilters(prev => ({ ...prev, endDate: date }));
  };

  const applyFilters = () => {
    setActiveFilters({
      type: tempFilters.type !== 'all',
      dateRange: !!(tempFilters.startDate && tempFilters.endDate),
      search: !!searchQuery
    });
    setIsFilterOpen(false);  // This line closes the filter window
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
  
  // Current page items
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-12 overflow-hidden">
      <StatsSection />

      <div className="px-8 mx-4 -mt-12">
        <TableFilters
          filterType="queries"
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          tempFilters={tempFilters}
          handleTypeFilterChange={handleTypeFilterChange}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          pageTitle="Manage Queries"
          applyFilters={applyFilters}  // Make sure this is being passed
          clearFilters={clearFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          showAddButton={false}
        />

        <QueriesTable 
          contacts={currentItems}
          tempFilters={tempFilters}
          searchQuery={searchQuery}
        />

        <Pagination 
         currentPage={currentPage}
         totalPages={totalPages}
         itemsPerPage={itemsPerPage}
         setItemsPerPage={setItemsPerPage}
         setCurrentPage={setCurrentPage}
         filteredItems={filteredContacts}
         indexOfFirstItem={indexOfFirstItem}
         indexOfLastItem={indexOfLastItem}
        />      
        </div>
    </div>
  );
};

export default QueriesPage;