import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/User/forgetPasswordSlice";
import { resetPasswordOrganization } from "../../redux/Organization/auth/organizationAuthSlice";
import logoImage from "../../assets/img/PGR_logo.jpeg";
import { useParams, useSearchParams,  useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

const ResetPasswordModal = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role"); // Extract role from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" }); // New state for messages
  const [isExpired, setIsExpired] = useState(false); // Expiration state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select Redux state dynamically based on role
  const { status, error } = useSelector((state) =>
    role === "organization" ? state.organization.auth : state.user.forgetpassword
  );

// Expiration Timer: Disable form after 15 minutes
useEffect(() => {
  if (!token) return; // Ensure token exists before proceeding

  const storedToken = localStorage.getItem("resetToken");
  const storedExpiration = localStorage.getItem("resetTokenExpiration");

  let expirationTime;

  // If a new reset token is used, update expiration time
  if (!storedToken || storedToken !== token) {
    localStorage.setItem("resetToken", token);
    expirationTime = Date.now() + 15 * 60 * 1000; // 15 minutes from now
    localStorage.setItem("resetTokenExpiration", expirationTime);
  } else {
    expirationTime = parseInt(storedExpiration, 10);
  }

  // Function to check expiration
  const checkExpiration = () => {
    const currentTime = Date.now();
    if (currentTime >= expirationTime) {
      setIsExpired(true);
      setFeedback({ message: "Reset link has expired. Please request a new one.", type: "error" });
    } else {
      setIsExpired(false);
    }
  };

  checkExpiration(); // Run immediately
  const interval = setInterval(checkExpiration, 1000); // Check every second

  return () => clearInterval(interval);
}, [token]); // Re-run when `token` changes


//   const storedToken = localStorage.getItem("resetToken");
//   const storedExpiration = localStorage.getItem("resetTokenExpiration");
  
//   // Check if token has changed (indicating a new reset request)
//   if (!storedToken || storedToken !== token) {
//     // Store the new token and reset expiration time
//     localStorage.setItem("resetToken", token);
//     const newExpirationTime = Date.now() + 15 * 60 * 1000; // 15 mins from now
//     localStorage.setItem("resetTokenExpiration", newExpirationTime);
//   }

//   const expirationTime = parseInt(localStorage.getItem("resetTokenExpiration"), 10);

//   const checkExpiration = () => {
//     if (Date.now() >= expirationTime) {
//       setIsExpired(true);
//       setFeedback({ message: "Reset link has expired. Please request a new one.", type: "error" });
//     } else {
//       setIsExpired(false);
//     }
//   };

//   checkExpiration(); // Initial check
//   const interval = setInterval(checkExpiration, 1000); // Check every second

//   return () => clearInterval(interval);
// }, [token]); // Dependency on token


  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });

    if (!token || !role || isExpired) {
      setFeedback({ message: "Invalid or expired reset link!", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ message: "Passwords do not match!", type: "error" });
      return;
    }

    const action = role === "organization" ? resetPasswordOrganization : resetPassword;

    dispatch(action({ token, newPassword, confirmPassword })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setFeedback({ message: "Password reset successfully! Please log in.", type: "success" });
      } else {
        setFeedback({ message: "Failed to reset password. Try again.", type: "error" });
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Background Overlay (Removed onClose) */}
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
       
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 z-50 p-6">
        {/* 🔹 Header: Company Logo + Name */}
        <div className="flex flex-col items-center justify-center pb-4 border-b border-gray-100">
          <img
            src={logoImage}  // Ensure this path is correct
            alt="PGR Logo"
            className="w-16 h-16 object-contain rounded-full mb-2"
          />
          <h1 className="text-2xl font-semibold text-gray-800">PGR - Virtual Trading App</h1>
        </div>
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-lock text-white"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Reset Password</h2>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isExpired}
              className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
               bg-white text-gray-900 
               focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
               focus:outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isExpired}
              className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
               bg-white text-gray-900 
               focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
               focus:outline-none transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || isExpired}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50"
          >
            {status === "loading" ? "Resetting..." : "Reset Password"}
          </button>
           {/* Display messages */}
           {feedback.message && (
            <p
              className={`text-sm mt-2 ${
                feedback.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedback.message}
            </p>
          )}
        </form>

        {/* Close Button (Redirect to login instead of closing modal) */}
        <div className="text-right mt-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Go To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;

// export default ResetPasswordModal;
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { resetPassword } from "../../redux/User/forgetPasswordSlice";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";


// const ResetPasswordModal = () => {
//   const { token } = useParams();
//   console.log("Reset Token from URL:", token);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error } = useSelector((state) => state.user.forgetpassword);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(resetPassword({ token, newPassword, confirmPassword })).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         toast.success("Password reset successfully! Please log in.");
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               New Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter new password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               placeholder="Confirm new password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={status === "loading"}
//             className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
//           >
//             {status === "loading" ? "Resetting..." : "Reset Password"}
//           </button>
//           {error && <p className="text-sm text-red-500">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordModal;
