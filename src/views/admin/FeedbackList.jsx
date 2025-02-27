import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeedbackTable from "../../components/Admin/Tables/FeedbackTable/FeedbackTable";
import Pagination from '../../components/Common/TableItems/Pagination';
import TableFilters from '../../components/Common/TableItems/TableFilters';
import StatsSection from "../../components/Admin/Cards/StatsSection";
import { 
    fetchFeedbacks,
    selectFeedbacks,
    selectFeedbackLoading,
    selectFeedbackError,
    selectFeedbackStats 
} from "../../redux/Admin/FeedbackListPage/FeedbackTableSlice";

const FeedbackList = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector(selectFeedbacks) || [];// Initialize as empty array if undefined
  const loading = useSelector(selectFeedbackLoading);
  const error = useSelector(selectFeedbackError);
  const statsFromStore = useSelector(selectFeedbackStats);

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    category: false,
    dateRange: false,
    rating: false,
    search: false
  });
  const [tempFilters, setTempFilters] = useState({
    category: 'all',
    startDate: null,
    endDate: null,
    rating: 'all',
    recommendation: 'all',
    status: 'all'
  });

  useEffect(() => {
    dispatch(fetchFeedbacks())
      .unwrap()
      .then(response => {
        console.log('Feedbacks fetched:', response);
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });
  }, [dispatch]);

  // Filter feedbacks based on filters and search
  const filteredFeedbacks = feedbacks.length ? feedbacks.filter(feedback => {
    // Category Filter
    if (tempFilters.category !== 'all' && feedback.feedbackCategory !== tempFilters.category)
      return false;

    // Rating Filter
    if (tempFilters.rating !== 'all') {
      const ratingNum = parseInt(tempFilters.rating);
      if (feedback.rating !== ratingNum)
        return false;
    }

    if (tempFilters.status !== 'all' && feedback.status !== tempFilters.status)
        return false;

    // Recommendation Filter
    if (tempFilters.recommendation !== 'all') {
      const isRecommended = tempFilters.recommendation === 'recommended';
      if (feedback.recommend !== isRecommended)
        return false;
    }

    // Date Range Filter
    if (tempFilters.startDate && tempFilters.endDate) {
      const feedbackDate = new Date(feedback.createdDate);
      if (feedbackDate < tempFilters.startDate || feedbackDate > tempFilters.endDate)
        return false;
    }

    // Search Filter
    if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          feedback.userId?.name?.toLowerCase().includes(searchLower) ||
          feedback.userId?.email?.toLowerCase().includes(searchLower) ||
          feedback.feedbackMessage.toLowerCase().includes(searchLower)
        );
      }

    return true;
  }) : [];

  // Update total items when filtered feedbacks change
  useEffect(() => {
    setTotalItems(filteredFeedbacks.length);
  }, [filteredFeedbacks]);

  // Handler Functions
  const handleCategoryFilterChange = (e) => {
    setTempFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleRatingFilterChange = (e) => {
    setTempFilters(prev => ({ ...prev, rating: e.target.value }));
  };

  const handleRecommendationFilterChange = (e) => {
    setTempFilters(prev => ({ ...prev, recommendation: e.target.value }));
  };

  const handleStartDateChange = (date) => {
    setTempFilters(prev => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setTempFilters(prev => ({ ...prev, endDate: date }));
  };

  const applyFilters = () => {
    dispatch(fetchFeedbacks(tempFilters));
    setActiveFilters({
      category: tempFilters.category !== 'all',
      dateRange: !!(tempFilters.startDate && tempFilters.endDate),
      rating: tempFilters.rating !== 'all',
      recommendation: tempFilters.recommendation !== 'all',
      search: !!searchQuery
    });
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setTempFilters({
      category: 'all',
      startDate: null,
      endDate: null,
      rating: 'all',
      recommendation: 'all'
    });
    setSearchQuery("");
    setActiveFilters({
      category: false,
      dateRange: false,
      rating: false,
      recommendation: false,
      search: false
    });
    setCurrentPage(1);
    dispatch(fetchFeedbacks()); // Fetch all feedbacks without filters
  };

  // Pagination Logic
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate stats
  const stats = {
    total: feedbacks.length || 0,
    positive: feedbacks.filter(f => f.rating >= 4).length || 0,
    negative: feedbacks.filter(f => f.rating <= 2).length || 0,
    approved: feedbacks.filter(f => f.status === 'approved').length,
    rejected: feedbacks.filter(f => f.status === 'rejected').length,
    recommended: feedbacks.filter(f => f.recommend).length || 0,
    ...statsFromStore
  };

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
        stats={stats}
        isDashboard={false} 
      />

      <div className="px-8 mx-4 -mt-12">
        <TableFilters
          filterType="feedback"
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          tempFilters={tempFilters}
          handleCategoryFilterChange={handleCategoryFilterChange}
          handleRatingFilterChange={handleRatingFilterChange}
          handleRecommendationFilterChange={handleRecommendationFilterChange}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          pageTitle="Manage Feedback"
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          showAddButton={false}
        />

        {feedbacks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No feedback data available</p>
          </div>
        ) : (
          <>
            <FeedbackTable 
              feedbacks={currentItems}
              tempFilters={tempFilters}
              searchQuery={searchQuery}
            />

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
              filteredItems={filteredFeedbacks}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;