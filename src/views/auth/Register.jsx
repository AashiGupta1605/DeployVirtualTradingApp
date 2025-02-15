import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/User/Contact/ContactPage.css";

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div style={{ width: "100%", maxWidth: "80%" }} className="bg-white p-8 rounded-lg shadow-lg w-[700px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>
        <p className="text-gray-500 text-center mb-4">Create your account</p>
        <RegisterForm onClose={onClose} />
      </div>
    </div>
  );
};

const RegisterForm = ({ onClose }) => {
  const navigate = useNavigate(); // Replacing useHistory with useNavigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    gender: "",
    dob: "",
    orgtype: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Using useNavigate instead of history.push
          onClose();
        }, 2000);
      } else {
        setMessage(data.message || "❌ Registration failed.");
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
    //   {/* Name */}
    //   <div className="col-span-2">
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Name</label>
    //     <input
    //       type="text"
    //       name="name"
    //       value={formData.name}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //       required
    //     />
    //   </div>

    //   {/* Email */}
    //   <div className="col-span-2">
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Email</label>
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //       required
    //     />
    //   </div>

    //   {/* Password */}
    //   <div>
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //       required
    //     />
    //   </div>

    //   {/* Confirm Password */}
    //   <div>
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Confirm Password</label>
    //     <input
    //       type="password"
    //       name="confirmPassword"
    //       value={formData.confirmPassword}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //       required
    //     />
    //   </div>

    //   {/* Mobile */}
    //   <div>
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Mobile</label>
    //     <input
    //       type="text"
    //       name="mobile"
    //       value={formData.mobile}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //       required
    //     />
    //   </div>

    //   {/* Gender */}
    //   <div>
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Gender</label>
    //     <select
    //       name="gender"
    //       value={formData.gender}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //       required
    //     >
    //       <option value="">Select Gender</option>
    //       <option value="Male">Male</option>
    //       <option value="Female">Female</option>
    //       <option value="Other">Other</option>
    //     </select>
    //   </div>

    //   {/* Date of Birth */}
    //   <div>
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Date of Birth</label>
    //     <input
    //       type="date"
    //       name="dob"
    //       value={formData.dob}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //       required
    //     />
    //   </div>

    //   {/* Organization Type */}
    //   <div>
    //     <label className="block text-gray-600 text-sm font-bold mb-1">Organization Type</label>
    //     <input
    //       type="text"
    //       name="orgtype"
    //       value={formData.orgtype}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 border rounded-lg"
    //     />
    //   </div>

    //   {/* Submit Button */}
    //   <div className="col-span-2">
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700"
    //     >
    //       Create Account
    //     </button>
    //   </div>

    //   {message && <p className="col-span-2 text-center text-sm mt-2 text-red-500">{message}</p>}
    // </form>
   
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div
            style={{ width: "100%", maxWidth: "80%" }}
            className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-building text-white"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Register</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl flex-1">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-6">User Details</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter password"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Confirm password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl flex-1">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-6">Additional Information</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                        <input
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter mobile number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
                        <input
                          type="text"
                          name="orgtype"
                          value={formData.orgtype}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Enter organization type"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  >
                    Register
                  </button>
                </div>
                {message && <p className="col-span-2 text-center text-sm mt-2 text-red-500">{message}</p>}
              </form>
            </div>
          </div>
        </div>
    
  );
};

export default RegisterModal;
