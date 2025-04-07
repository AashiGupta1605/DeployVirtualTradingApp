import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ComplaintTable from "../../components/Admin/Tables/ComplaintTable/ComplaintTable";
import Pagination from '../../components/Common/TableItems/Pagination';
import TableFilters from '../../components/Common/TableItems/TableFilters';
import StatsSection from "../../components/Admin/Cards/StatsSection";
import {
  fetchComplaints,
  setComplaintFilters,
  clearComplaintFilters,
} from "../../redux/Admin/ComplaintListPage/complaintTableSlice";

const ComplaintList = () => {
  const dispatch = useDispatch();

  const filteredComplaints = useSelector(state => state.admin.complaintTable.filteredComplaints);
  const loading = useSelector(state => state.admin.complaintTable.loading);
  const error = useSelector(state => state.admin.complaintTable.error);

  const [state, setState] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    filters: {
      status: 'all',
      type: 'all',
      search: ''
    }
  });

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...state.filters,
      [name]: value
    };

    setState(prev => ({
      ...prev,
      filters: updatedFilters,
      currentPage: 1
    }));

    dispatch(setComplaintFilters(updatedFilters));
  }, [dispatch, state.filters]);

  const handleSearchChange = useCallback((value) => {
    const updatedFilters = {
      ...state.filters,
      search: value
    };

    setState(prev => ({
      ...prev,
      searchQuery: value,
      filters: updatedFilters,
      currentPage: 1
    }));

    dispatch(setComplaintFilters(updatedFilters));
  }, [dispatch, state.filters]);

  const handleClearFilters = () => {
    setState(prev => ({
      ...prev,
      searchQuery: '',
      filters: {
        status: 'all',
        type: 'all',
        search: ''
      },
      currentPage: 1
    }));

    dispatch(clearComplaintFilters());
  };

  const handlePageChange = (newPage) => {
    setState(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  const handleItemsPerPageChange = (newValue) => {
    setState(prev => ({
      ...prev,
      itemsPerPage: newValue,
      currentPage: 1
    }));
  };

  const totalItems = filteredComplaints.length;
  const totalPages = Math.ceil(totalItems / state.itemsPerPage);
  const indexOfLastItem = state.currentPage * state.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - state.itemsPerPage;
  const currentItems = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl bg-red-100 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 overflow-hidden">
      <StatsSection 
        stats={{
          total: filteredComplaints.length,
          pending: filteredComplaints.filter(c => c.status === 'pending').length,
          solved: filteredComplaints.filter(c => c.status === 'solved').length,
        }} 
        isDashboard={false} 
        pageType="complaints"
      />

      <div className="px-8 mx-4 -mt-12">
        <TableFilters
          filterType="complaint"
          isFilterOpen={true}
          setIsFilterOpen={() => {}}
          tempFilters={state.filters}
          handleFilterChange={handleFilterChange}
          applyFilters={() => {}}
          clearFilters={handleClearFilters}
          searchQuery={state.searchQuery}
          setSearchQuery={handleSearchChange}
          pageTitle="Manage Complaints"
          showAddButton={false}
        />

        {filteredComplaints.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No complaint data available</p>
          </div>
        ) : (
          <>
            <ComplaintTable 
              complaints={currentItems}
            />

            <div className="mt-4">
              <Pagination 
                currentPage={state.currentPage}
                totalPages={totalPages}
                itemsPerPage={state.itemsPerPage}
                setItemsPerPage={handleItemsPerPageChange}
                setCurrentPage={handlePageChange}
                filteredItems={filteredComplaints}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;
