// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState(""); // For success/error messages
//   const history = useHistory(); // Use useHistory() for React Router v5

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Hardcoded Admin Login
//     if (formData.email === "admin@example.com" && formData.password === "admin") {
//       setMessage("Admin login successful!");
//       localStorage.setItem("token", "admin-token"); // Store a fake token for admin
//       history.push("/admin"); // Redirect to admin dashboard
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Login successful!");
//         localStorage.setItem("token", data.token); // Save token in localStorage
//         history.push("/dashboard"); // Redirect to dashboard after login
//       } else {
//         setMessage(data.message || "Invalid email or password.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 h-full">
//       <div className="flex content-center items-center justify-center h-full">
//         <div className="w-full lg:w-4/12 px-4">
//           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//             <div className="rounded-t mb-0 px-6 py-6">
//               <div className="text-center mb-3">
//                 <h6 className="text-blueGray-500 text-sm font-bold">Sign In</h6>
//               </div>
//               <hr className="mt-6 border-b-1 border-blueGray-300" />
//             </div>
//             <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//               {message && <p className="text-center text-red-600">{message}</p>}

//               <form onSubmit={handleSubmit}>
//                 <div className="relative w-full mb-3">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
//                     placeholder="Email"
//                     required
//                   />
//                 </div>

//                 <div className="relative w-full mb-3">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
//                     placeholder="Password"
//                     required
//                   />
//                 </div>

//                 <div className="text-center mt-6">
//                   <button
//                     type="submit"
//                     className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
//                   >
//                     Sign In
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div className="flex flex-wrap mt-6 relative">
//             <div className="w-1/2">
//               <a href="#forgot-password" className="text-blueGray-200">
//                 <small>Forgot password?</small>
//               </a>
//             </div>
//             <div className="w-1/2 text-right">
//               <Link to="/auth/register" className="text-blueGray-200">
//                 <small>Create new account</small>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // For success/error messages
  const history = useHistory(); // Use useHistory() for React Router v5

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded Admin Login
    if (formData.email === "admin@example.com" && formData.password === "admin") {
      setMessage("Admin login successful!");
      localStorage.setItem("token", "admin-token"); // Store a fake token for admin
      history.push("/admin"); // Redirect to admin dashboard
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token); // Save token in localStorage
        history.push("/dashboard"); // Redirect to dashboard after login
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-lg mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-sign-in-alt text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && <p className="text-center text-red-600">{message}</p>}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
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
              </div>
            </div>

            <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;