import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComplaint,
  fetchComplaints
} from "../../../../redux/Admin/ComplaintListPage/complaintTableSlice";
import { Trash2 } from 'lucide-react';
import toast from "react-hot-toast";

const ComplaintTable = () => {
  const dispatch = useDispatch();
  const {
    allComplaints,
    loading,
    error,
  } = useSelector((state) => state.admin.complaintTable);

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteComplaint(id))
      .then(() => {
        toast.success("Complaint deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete complaint");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Complaint List</h2>
      {allComplaints?.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Satisfaction</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allComplaints?.map((complaint, index) => (
              <tr key={complaint._id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{complaint.name}</td>
                <td className="px-4 py-2 border">{complaint.email}</td>
                <td className="px-4 py-2 border">{complaint.message}</td>
                <td className="px-4 py-2 border">
                  {complaint.isSatisfied != null && (
                    <span
                      className={`font-semibold ${
                        complaint.isSatisfied ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {complaint.isSatisfied ? "Satisfied" : "Not Satisfied"}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button onClick={() => handleDelete(complaint._id)}>
                    <Trash2 className="text-red-500 text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComplaintTable;
