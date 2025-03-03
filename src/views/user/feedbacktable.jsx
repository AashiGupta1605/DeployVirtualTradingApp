import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CardStats from "../../components/User/Cards/CardStats";
import { Edit, Trash2, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL } from "../../utils/BaseUrl";
import FeedbackModal from "../../components/User/Modals/FeedbackModal";
import ConfirmationModal from "../../components/User/Cards/ConfirmationModal";
import { fetchFeedback, deleteFeedback } from "../../redux/User/feedbackSlice";

export default function FeedbackTable() {
  const dispatch = useDispatch();
  const feedbackData = useSelector((state) => state.user.feedback.feedbackList);
  const feedbackStatus = useSelector((state) => state.user.feedback.status);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editFeedback, setEditFeedback] = React.useState(null);
  

  useEffect(() => {
    // Dispatch the fetchFeedback action to load feedback data
    dispatch(fetchFeedback());
  }, [dispatch]);

  const handleEditFeedback = (feedbackId) => {
    const feedbackToEdit = feedbackData.find((feedback) => feedback._id === feedbackId);
    setEditFeedback(feedbackToEdit);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedFeedbackId(null);
  };

  const handleDeleteFeedback = () => {
    if (!selectedFeedbackId) return;
    // Dispatch the deleteFeedback action
    dispatch(deleteFeedback(selectedFeedbackId));
    closeDeleteModal();
    dispatch(fetchFeedback());
  };

  if (feedbackStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-24">
        <div className="bg-lightBlue-600 md:pt-8 pb-32 pt-12">
          <div className="px-4 mx-auto w-full">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                <CardStats
                  statSubtitle="TRAFFIC"
                  statTitle="350,897"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                <CardStats
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 mx-4 -mt-12 bg-gray-50 rounded-lg p-4 mb-7.5 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faCommentDots} className="text-blue-500 text-xl" />
          <h2 className="text-xl font-bold text-gray-700">My Feedbacks</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faCommentDots} className="text-white text-lg" />
        </button>
      </div>

      <div className="flex flex-wrap -mt-0">
        <div className="w-full mb-12 px-4 -mt-8">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {["Name", "Email", "Feedback", "Rating", "Recommendation", "Date", "Status", "Actions"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feedbackData.length > 0 ? (
                    feedbackData.map((feedback) => (
                      <tr key={feedback._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {feedback.userId?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {feedback.userId?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {feedback.feedbackMessage}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {[...Array(feedback.rating)].map((_, index) => (
                            <Star key={index} size={20} fill="yellow" stroke="yellow" className="inline-block" />
                          ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                          {feedback.recommend ? (
                            <ThumbsUp size={20} className="text-green-500" />
                          ) : (
                            <ThumbsDown size={20} className="text-red-500" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(feedback.createdDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${feedback.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {feedback.status || "Approved"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4" onClick={() => handleEditFeedback(feedback._id)}>
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-900" onClick={() => openDeleteModal(feedback._id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No feedbacks found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {isEditModalOpen && <FeedbackModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} feedbackData={editFeedback} />}
      {isDeleteModalOpen && (
        <ConfirmationModal 
          isOpen={isDeleteModalOpen} 
          onClose={closeDeleteModal} 
          onConfirm={handleDeleteFeedback} 
          message="Are you sure you want to delete this feedback?"
        />
      )}
    </>
  );
}
