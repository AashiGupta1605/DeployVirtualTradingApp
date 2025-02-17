import React, { useState, useEffect } from "react";
import UpdateProfileForm from "./UpdateProfileForm";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";

export default function CardSettings({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        const formattedDob = data.user?.dob ? data.user.dob.split("T")[0] : "";

        setUserData({
          name: data.user?.name || "",
          email: data.user?.email || "",
          mobile: data.user?.mobile || "",
          gender: data.user?.gender || "",
          dob: formattedDob,
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (isOpen) fetchUserData();
  }, [isOpen]);

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Profile update failed");

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...updatedData,
      }));

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:5000/api/user/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Profile deletion failed");

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
        <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
        <div
          style={{ width: "100%", maxWidth: "80%" }}
          className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-user-edit text-white"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">My Account</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
            </button>
          </div>
          <div className="p-6">
            <h6 className="text-gray-600 font-bold uppercase mb-3">User Information</h6>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Date of Birth:</strong> {userData.dob}</p>
              <p><strong>Mobile:</strong> {userData.mobile}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 ml-4"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
        <UpdateProfileForm 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          userProfile={userData} 
          onUpdate={handleUpdate} 
        />
        <ConfirmationModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={handleDelete} 
          message="Are you sure you want to delete your profile? This action cannot be undone."
        />
      </div>
    )
  );
}
