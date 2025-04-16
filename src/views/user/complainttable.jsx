// ComplaintTable.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown,
  ChevronUp,
  PlusCircle,
  MessageSquare,
  AlertCircle,
  Edit,
  Trash2
} from "lucide-react";
import CardStats from "../../components/User/Cards/CardStats";
import ComplaintModal from "../../components/User/Modals/ComplaintModal";
import ConfirmationModal from "../../components/User/Cards/ConfirmationModal";
import { fetchComplaint, deleteComplaint } from "../../redux/User/complaintSlice";
import { useUserStats } from "../../hooks/userUserStats";
import StatsSection from "../../components/User/Cards/StatsSection";

const CATEGORY_COLORS = {
  "Account Issues": "bg-blue-100 text-blue-800",
  "Payment Problems": "bg-green-100 text-green-800",
  "Technical Errors": "bg-purple-100 text-purple-800",
  "Service Quality": "bg-yellow-100 text-yellow-800",
  "Other": "bg-gray-100 text-gray-800"
};

export default function ComplaintTable() {
  useUserStats();
  const dispatch = useDispatch();
  const complaintData = useSelector((state) => state.user.complaint.complaintList);
  const complaintStatus = useSelector((state) => state.user.complaint.status);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editComplaint, setEditComplaint] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  useEffect(() => {
    dispatch(fetchComplaint());
  }, [dispatch]);

  const handleComplaintUpdate = () => {
    dispatch(fetchComplaint());
  };

  const handleEditComplaint = (id) => {
    const toEdit = complaintData.find((c) => c._id === id);
    setEditComplaint(toEdit);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setSelectedComplaintId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedComplaintId(null);
  };

  const handleDeleteComplaint = (id) => {
    dispatch(deleteComplaint(id));
    closeDeleteModal();
   // dispatch(fetchComplaints());
  };

  if (complaintStatus === "loading") return <div>Loading...</div>;

  return (
    <>
     {/* <div className="mt-24"> */}
            {/* <div className="bg-lightBlue-600 md:pt-8 pb-22 pt-12">
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
            </div> */}
        <StatsSection isDashboard={false} pageType="complaints" />

          {/* </div> */}
        <div className="px-8 mx-8 -mt-12 bg-gray-50 rounded-lg h-19 p-4 mb-0.5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <AlertCircle className="mr-2 text-red-600" size={24} />
            My Complaints
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-lightBlue-600 text-white px-4 py-2 rounded-lg hover:bg-lightBlue-700"
          >
            <PlusCircle size={18} className="mr-2" />
            Add Complaint
          </button>
        </div>

        <div className="flex flex-wrap mx-4">
          <div className="w-full mb-12 px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {["Name", "Email", "Category", "Complaint", "Date", "Status", "Actions"].map((header) => (
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
                  {complaintData.length > 0 ? (
                    complaintData.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.userId?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.userId?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${CATEGORY_COLORS[item.category]}`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.complaintMessage}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(item.createdDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'solved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center flex gap-x-3">
                          <button onClick={() => handleEditComplaint(item._id)} className="text-yellow-600 hover:text-yellow-900">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => openDeleteModal(item._id)} className="text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No complaints found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      

      {isModalOpen && (
        <ComplaintModal
          onComplaintSubmit={handleComplaintUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <ComplaintModal
          complaintData={editComplaint}
          onComplaintSubmit={handleComplaintUpdate}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && selectedComplaintId && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => handleDeleteComplaint(selectedComplaintId)}
          message="Are you sure you want to delete this complaint?"
        />
      )}
    </>
  );
}
