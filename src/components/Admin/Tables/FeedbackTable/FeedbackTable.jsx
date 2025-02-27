import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Star, ThumbsUp, ThumbsDown, Check, X, MoreVertical } from 'lucide-react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Modals/ConformationModal';
import { 
  deleteFeedback, 
  updateFeedbackStatus,
  fetchFeedbacks 
} from '../../../../redux/Admin/FeedbackListPage/FeedbackTableSlice';

const CATEGORY_COLORS = {
  "Website UI/UX": "bg-blue-100 text-blue-800",
  "Trading Features": "bg-green-100 text-green-800",
  "Data Accuracy": "bg-purple-100 text-purple-800",
  "Performance & Speed": "bg-yellow-100 text-yellow-800",
  "Customer Support": "bg-orange-100 text-orange-800",
  "Other": "bg-gray-100 text-gray-800"
};

const Tooltip = ({ children, text }) => (
  <div className="relative group">
    {children}
    <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
      {text}
    </div>
  </div>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired
};

const TableHeader = () => (
  <tr>
    {[
      'Name',
      'Email',
      'Category',
      'Rating',
      'Recommend',
      'Feedback',
      'Suggestions',
      'Date',
      'Status',
      'Actions'
    ].map(header => (
      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {header}
      </th>
    ))}
  </tr>
);

const FeedbackTable = ({ feedbacks, tempFilters, searchQuery }) => {
  const dispatch = useDispatch();
  const { isDeleting, isUpdating } = useSelector(state => state.admin.feedbackTable);

  const [state, setState] = useState({
    expandedRow: null,
    showDeleteModal: false,
    deleteId: null,
    dropdownOpen: null
  });

  const toggleDropdown = (id) => {
    setState(prev => ({
      ...prev,
      dropdownOpen: prev.dropdownOpen === id ? null : id
    }));
  };

  const handleDeleteClick = (id) => {
    setState(prev => ({
      ...prev,
      showDeleteModal: true,
      deleteId: id,
      dropdownOpen: null
    }));
  };

  const handleDeleteConfirm = async () => {
    try {
      const loadingToast = toast.loading('Deleting feedback...');
      await dispatch(deleteFeedback(state.deleteId)).unwrap();
      toast.success('Feedback deleted successfully', {
        id: loadingToast
      });
      setState(prev => ({
        ...prev,
        showDeleteModal: false,
        deleteId: null
      }));
      // Refresh the list after deletion
      dispatch(fetchFeedbacks());
    } catch (error) {
      toast.error('Failed to delete feedback');
      console.error('Delete error:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const loadingToast = toast.loading('Updating status...');
      
      const result = await dispatch(updateFeedbackStatus({ 
        id, 
        status: newStatus 
      })).unwrap();
  
      if (result.success) {
        toast.success(`Status updated to ${newStatus}`, {
          id: loadingToast,
        });
        
        // Just close the dropdown, no need to fetch data again
        setState(prev => ({
          ...prev,
          dropdownOpen: null
        }));
      } else {
        toast.error(result.message || 'Failed to update status', {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.message || 'Failed to update status');
    }
  };

  const toggleRow = (id) => {
    setState(prev => ({
      ...prev,
      expandedRow: prev.expandedRow === id ? null : id,
      dropdownOpen: null
    }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderRecommendation = (recommend) => {
    return recommend ? (
      <ThumbsUp size={20} className="text-green-500" />
    ) : (
      <ThumbsDown size={20} className="text-red-500" />
    );
  };

  const renderActionButtons = (feedback) => (
    <div className="flex items-center space-x-2">
      <Tooltip text="Change status">
        <div className="relative">
          <button
            onClick={() => toggleDropdown(feedback._id)}
            className={`text-gray-600 hover:text-gray-900 transition-colors focus:outline-none p-1 rounded-full hover:bg-gray-100 ${
              isUpdating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isUpdating}
          >
            <MoreVertical size={16} />
          </button>
          
          {state.dropdownOpen === feedback._id && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 flex flex-col border border-gray-200">
              <button
                onClick={() => handleStatusChange(feedback._id, 'approved')}
                className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full ${
                  isUpdating || feedback.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isUpdating || feedback.status === 'approved'}
              >
                <Check size={16} className="mr-2 text-green-500" />
                Approve
                {isUpdating && <span className="ml-2">...</span>}
              </button>
              <div className="border-t border-gray-100" />
              <button
                onClick={() => handleStatusChange(feedback._id, 'rejected')}
                className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full ${
                  isUpdating || feedback.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isUpdating || feedback.status === 'rejected'}
              >
                <X size={16} className="mr-2 text-red-500" />
                Reject
                {isUpdating && <span className="ml-2">...</span>}
              </button>
            </div>
          )}
        </div>
      </Tooltip>

      <Tooltip text="Delete feedback">
        <button
          onClick={() => handleDeleteClick(feedback._id)}
          className={`text-red-600 hover:text-red-900 transition-colors focus:outline-none p-1 rounded-full hover:bg-gray-100 ${
            isDeleting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isDeleting}
        >
          <Trash2 size={16} />
        </button>
      </Tooltip>
    </div>
  );

  const renderTableRow = (feedback) => (
    <tr key={feedback._id} className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900">
        {feedback.userId?.name || 'N/A'}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">
        {feedback.userId?.email || 'N/A'}
      </div>
    </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${CATEGORY_COLORS[feedback.feedbackCategory]}`}>
          {feedback.feedbackCategory}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {renderStars(feedback.rating)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center justify-center">
          {renderRecommendation(feedback.recommend)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">
          {state.expandedRow === feedback._id
            ? feedback.feedbackMessage
            : feedback.feedbackMessage?.length > 50
              ? `${feedback.feedbackMessage.substring(0, 50)}...`
              : feedback.feedbackMessage}
          {feedback.feedbackMessage?.length > 50 && (
            <button
              onClick={() => toggleRow(feedback._id)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              {state.expandedRow === feedback._id ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">
          {feedback.suggestions || "No suggestions provided"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {new Date(feedback.createdDate).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        feedback.status === 'approved' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {feedback.status === 'approved' ? 'Approved' : 'Rejected'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      {renderActionButtons(feedback)}
    </td>
    </tr>
  );

  const renderEmptyRow = () => (
    <tr>
      <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
        No feedback found
      </td>
    </tr>
  );

  return (
    <>
      <ConfirmationModal
        isOpen={state.showDeleteModal}
        onClose={() => setState(prev => ({ ...prev, showDeleteModal: false, deleteId: null }))}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
      />
      <div className="bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <TableHeader />
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feedbacks.length ? feedbacks.map(renderTableRow) : renderEmptyRow()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

FeedbackTable.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
      }).isRequired,
      feedbackCategory: PropTypes.string.isRequired,
      feedbackMessage: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      recommend: PropTypes.bool.isRequired,
      status: PropTypes.oneOf(['approved', 'rejected']).isRequired,
      suggestions: PropTypes.string,
      createdDate: PropTypes.string.isRequired
    })
  ).isRequired,
  tempFilters: PropTypes.shape({
    category: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }).isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default FeedbackTable;