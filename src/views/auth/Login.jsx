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
//       history.push("/organization"); // Redirect to admin dashboard
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
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // For success/error messages
  const navigate = useNavigate(); // Use useNavigate() for React Router v6

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
      navigate("/Admin"); // Redirect to admin dashboard
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
        navigate("/dashboard"); // Redirect to dashboard after login
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">Sign In</h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              {message && <p className="text-center text-red-600">{message}</p>}

              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <a href="#forgot-password" className="text-blueGray-200">
                <small>Forgot password?</small>
              </a>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/register" className="text-blueGray-200">
                <small>Create new account</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}