import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/User/userprofileSlice"; // Import the Redux action

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      await dispatch(changePassword({ oldPassword, newPassword }));
      alert("Password changed successfully!");
      onClose();
    } catch (error) {
      alert("Error changing password. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
    <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
    <div
      style={{ width: "100%", maxWidth: "60%" }}
      className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-lock text-white"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
        >
          <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
        </button>
      </div>
  
      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
            />
          </div>
  
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200  ml-4"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default ChangePasswordModal;
