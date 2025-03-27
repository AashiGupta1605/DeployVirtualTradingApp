import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/User/forgetPasswordSlice";
import { toast } from "react-hot-toast";


const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user.forgetpassword);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Reset password link sent successfully!");
      onClose(); // Close modal after success
    }
    if (error) {
      toast.error(error);
    }
  }, [status, error, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      {/* Toast Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>

        {/* Modal Content */}
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 z-50 p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <i className="fas fa-lock text-white"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Forgot Password</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
               bg-white text-gray-900 
               focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
               focus:outline-none transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Close Button */}
          <div className="text-right mt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;
