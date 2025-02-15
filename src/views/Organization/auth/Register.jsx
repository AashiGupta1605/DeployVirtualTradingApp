// // import React, { useState } from "react";
// // import { Link, useHistory } from "react-router-dom"; // Import useHistory

// // export default function Register() {
// //   const history = useHistory(); // Initialize useHistory
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });
// //   const [message, setMessage] = useState("");

// //   // Handle input change
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     try {
// //       const response = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setMessage("✅ Registration successful! Redirecting to login...");
// //         setTimeout(() => history.push("/login"), 2000); // Redirect using useHistory
// //       } else {
// //         setMessage(data.message || "❌ Registration failed.");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setMessage("❌ Something went wrong. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto px-4 h-full">
// //       <div className="flex content-center items-center justify-center h-full">
// //         <div className="w-full lg:w-6/12 px-4">
// //           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
// //             <div className="rounded-t mb-0 px-6 py-6">
// //               <div className="text-center mb-3">
// //                 <h6 className="text-blueGray-500 text-sm font-bold">Sign up</h6>
// //               </div>
// //               <hr className="mt-6 border-b-1 border-blueGray-300" />
// //             </div>
// //             <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
// //               {message && <p className="text-center text-green-600">{message}</p>}
              
// //               <form onSubmit={handleSubmit}>
// //                 <div className="relative w-full mb-3">
// //                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Name</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
// //                     placeholder="Name"
// //                     required
// //                   />
// //                 </div>
// //                 <div className="relative w-full mb-3">
// //                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email</label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
// //                     placeholder="Email"
// //                     required
// //                   />
// //                 </div>
// //                 <div className="relative w-full mb-3">
// //                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Password</label>
// //                   <input
// //                     type="password"
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
// //                     placeholder="Password"
// //                     required
// //                   />
// //                 </div>

// //                 <div className="text-center mt-6">
// //                   <button
// //                     type="submit"
// //                     className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
// //                   >
// //                     Create Account
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>

// //           {/* Already have an account? (Left side) */}
// //           <div className="flex flex-wrap mt-6 relative">
// //             <div className="w-1/2">
// //               <Link to="/auth/login" className="text-blueGray-900">
// //                 <small>Already have an account? Log in</small>
// //               </Link>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // 50%
// // import React, { useState } from "react";
// // import axios from "axios";

// // const OrganizationRegistrationForm = ({ isOpen, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     mobile: "",
// //     gender: "",
// //     dob: "",
// //     status: true,
// //     addedby: "",
// //     orgtype: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("/api/users", formData);
// //       alert("User registered successfully!");
// //       console.log(response.data);
// //       onClose(); // Close the modal after successful submission
// //     } catch (error) {
// //       console.error("Error registering user:", error);
// //       alert("Failed to register user.");
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
// //       <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
      
// //       <div className="relative w-full max-w-4xl md:max-w-lg mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
// //         <div className="flex justify-between items-center p-6 border-b border-gray-100">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
// //               <i className="fas fa-building text-white"></i>
// //             </div>
// //             <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
// //           >
// //             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
// //           </button>
// //         </div>

// //         <div className="p-6 overflow-y-auto max-h-[80vh]">
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter name"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Email
// //                   </label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter email address"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Mobile
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="mobile"
// //                     value={formData.mobile}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter mobile number"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Gender
// //                   </label>
// //                   <select
// //                     name="gender"
// //                     value={formData.gender}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                   >
// //                     <option value="">Select Gender</option>
// //                     <option value="Male">Male</option>
// //                     <option value="Female">Female</option>
// //                     <option value="Other">Other</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Password
// //                   </label>
// //                   <input
// //                     type="password"
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter password"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Date of Birth
// //                   </label>
// //                   <input
// //                     type="date"
// //                     name="dob"
// //                     value={formData.dob}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Added By
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="addedby"
// //                     value={formData.addedby}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter who added the user"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Organization Type
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="orgtype"
// //                     value={formData.orgtype}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter organization type"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //               >
// //                 Register User
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrganizationRegistrationForm;





// // 80%

// // import React, { useState } from "react";
// // import axios from "axios";

// // const OrganizationRegistrationForm = ({ isOpen, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     mobile: "",
// //     gender: "",
// //     dob: "",
// //     status: true,
// //     addedby: "",
// //     orgtype: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("/api/users", formData);
// //       alert("User registered successfully!");
// //       console.log(response.data);
// //       onClose(); // Close the modal after successful submission
// //     } catch (error) {
// //       console.error("Error registering user:", error);
// //       alert("Failed to register user.");
// //     }
// //   };



// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
// //       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
// //       <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
// //         <div className="flex justify-between items-center p-6 border-b border-gray-100">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
// //               <i className="fas fa-building text-white"></i>
// //             </div>
// //             <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
// //           >
// //             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
// //           </button>
// //         </div>

// //         <div className="p-6 overflow-y-auto max-h-[80vh]">
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter name"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Email
// //                   </label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter email address"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Mobile
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="mobile"
// //                     value={formData.mobile}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter mobile number"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Gender
// //                   </label>
// //                   <select
// //                     name="gender"
// //                     value={formData.gender}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                   >
// //                     <option value="">Select Gender</option>
// //                     <option value="Male">Male</option>
// //                     <option value="Female">Female</option>
// //                     <option value="Other">Other</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Password
// //                   </label>
// //                   <input
// //                     type="password"
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter password"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Date of Birth
// //                   </label>
// //                   <input
// //                     type="date"
// //                     name="dob"
// //                     value={formData.dob}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Added By
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="addedby"
// //                     value={formData.addedby}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter who added the user"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Organization Type
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="orgtype"
// //                     value={formData.orgtype}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                     placeholder="Enter organization type"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //               >
// //                 Register User
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrganizationRegistrationForm;






// // working form


// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
//   gender: Yup.string().required("Gender is required"),
//   dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
//     return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
//   }),
//   orgtype: Yup.string().required("Organization type is required"),
// });

// const OrganizationRegistrationForm = ({ isOpen, onClose }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       gender: "",
//       dob: "",
//       status: true,
//       orgtype: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post("/api/students/register", values);
//         // alert("Student registered successfully!");
//         toast.success("Student registered successfully!");
//         console.log(response.data);
//         onClose(); // Close the modal after successful submission
//       } catch (error) {
//         console.error("Error registering student:", error);
//         // alert("Failed to register student.");
//         toast.error("Failed to register student.");
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//         <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter email address"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter mobile number"
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {formik.touched.gender && formik.errors.gender ? (
//                     <div className="text-red-500 text-sm">{formik.errors.gender}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formik.values.dob}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   />
//                   {formik.touched.dob && formik.errors.dob ? (
//                     <div className="text-red-500 text-sm">{formik.errors.dob}</div>
//                   ) : null}
//                 </div>
//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Added By
//                   </label>
//                   <input
//                     type="text"
//                     name="addedby"
//                     value={formik.values.addedby}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter who added the user"
//                   />
//                 </div> */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Type
//                   </label>
//                   <select
//                     name="orgtype"
//                     value={formik.values.orgtype}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   >
//                     <option value="">Select Organization Type</option>
//                     <option value="College">College</option>
//                     <option value="School">School</option>
//                     <option value="University">University</option>
//                     <option value="Institute">Institute</option>
//                   </select>
//                   {formik.touched.orgtype && formik.errors.orgtype ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgtype}</div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 Register User
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationRegistrationForm;





// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
//   gender: Yup.string().required("Gender is required"),
//   dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
//     return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
//   }),
//   orgtype: Yup.string().required("Organization type is required"),
//   orgName: Yup.string().required("Organization name is required"),
//   status: Yup.boolean().required("Status is required"),
// });

// const OrganizationRegistrationForm = ({ isOpen, onClose }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       gender: "",
//       dob: "",
//       status: true,
//       orgtype: "",
//       orgName: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/students/register", values);
//         toast.success("Student registered successfully!");
//         console.log(response.data);
//         onClose(); // Close the modal after successful submission
//       } catch (error) {
//         console.error("Error registering student:", error);
//         toast.error("Failed to register student.");
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter email address"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter mobile number"
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {formik.touched.gender && formik.errors.gender ? (
//                     <div className="text-red-500 text-sm">{formik.errors.gender}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formik.values.dob}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   />
//                   {formik.touched.dob && formik.errors.dob ? (
//                     <div className="text-red-500 text-sm">{formik.errors.dob}</div>
//                   ) : null}
//                 </div>
//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Added By
//                   </label>
//                   <input
//                     type="text"
//                     name="addedby"
//                     value={formik.values.addedby}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter who added the user"
//                   />
//                 </div> */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Type
//                   </label>
//                   <select
//                     name="orgtype"
//                     value={formik.values.orgtype}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   >
//                     <option value="">Select Organization Type</option>
//                     <option value="College">College</option>
//                     <option value="School">School</option>
//                     <option value="University">University</option>
//                     <option value="Institute">Institute</option>
//                   </select>
//                   {formik.touched.orgtype && formik.errors.orgtype ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgtype}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Name
//                   </label>
//                   <input
//                     type="text"
//                     name="orgName"
//                     value={formik.values.orgName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization name"
//                     required
//                   />
//                   {formik.touched.orgName && formik.errors.orgName ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgName}</div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 Register User
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationRegistrationForm;




// new one
// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
//   gender: Yup.string().required("Gender is required"),
//   dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
//     return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
//   }),
//   orgtype: Yup.string().required("Organization type is required"),
//   orgName: Yup.string().required("Organization name is required"),
//   status: Yup.boolean().required("Status is required"),
// });

// const OrganizationRegistrationForm = ({ isOpen, onClose, onAddStudent }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       gender: "",
//       dob: "",
//       status: true,
//       orgtype: "",
//       orgName: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/students/register", values);
//         toast.success("Student registered successfully!");
//         console.log(response.data);
//         onAddStudent(response.data); // Add the new student to the list
//         resetForm(); // Reset form values
//         onClose(); // Close the modal after successful submission
//       } catch (error) {
//         console.error("Error registering student:", error);
//         toast.error("Failed to register student.");
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter email address"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter mobile number"
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {formik.touched.gender && formik.errors.gender ? (
//                     <div className="text-red-500 text-sm">{formik.errors.gender}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formik.values.dob}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   />
//                   {formik.touched.dob && formik.errors.dob ? (
//                     <div className="text-red-500 text-sm">{formik.errors.dob}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Type
//                   </label>
//                   <select
//                     name="orgtype"
//                     value={formik.values.orgtype}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   >
//                     <option value="">Select Organization Type</option>
//                     <option value="College">College</option>
//                     <option value="School">School</option>
//                     <option value="University">University</option>
//                     <option value="Institute">Institute</option>
//                   </select>
//                   {formik.touched.orgtype && formik.errors.orgtype ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgtype}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Name
//                   </label>
//                   <input
//                     type="text"
//                     name="orgName"
//                     value={formik.values.orgName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization name"
//                     required
//                   />
//                   {formik.touched.orgName && formik.errors.orgName ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgName}</div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={() => {
//                   formik.resetForm();
//                   onClose();
//                 }}
//                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 Register User
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationRegistrationForm;


// new one again

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
//   gender: Yup.string().required("Gender is required"),
//   dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
//     return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
//   }),
//   orgtype: Yup.string().required("Organization type is required"),
//   orgName: Yup.string().required("Organization name is required"),
//   status: Yup.boolean().required("Status is required"),
// });

// const OrganizationRegistrationForm = ({ isOpen, onClose, onAddStudent }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       gender: "",
//       dob: "",
//       status: true,
//       orgtype: "",
//       orgName: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/students/register", values);
//         toast.success("Student registered successfully!");
//         onAddStudent(response.data); // Add the new student to the list
//         resetForm(); // Reset form values
//         onClose(); // Close the modal after successful submission
//       } catch (error) {
//         console.error("Error registering student:", error);
//         toast.error("Failed to register student.");
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter email address"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter mobile number"
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {formik.touched.gender && formik.errors.gender ? (
//                     <div className="text-red-500 text-sm">{formik.errors.gender}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formik.values.dob}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   />
//                   {formik.touched.dob && formik.errors.dob ? (
//                     <div className="text-red-500 text-sm">{formik.errors.dob}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Type
//                   </label>
//                   <select
//                     name="orgtype"
//                     value={formik.values.orgtype}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Organization Type</option>
//                     <option value="College">College</option>
//                     <option value="School">School</option>
//                     <option value="University">University</option>
//                     <option value="Institute">Institute</option>
//                   </select>
//                   {formik.touched.orgtype && formik.errors.orgtype ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgtype}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Name
//                   </label>
//                   <input
//                     type="text"
//                     name="orgName"
//                     value={formik.values.orgName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization name"
//                     required
//                   />
//                   {formik.touched.orgName && formik.errors.orgName ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgName}</div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={() => {
//                   formik.resetForm();
//                   onClose();
//                 }}
//                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 Register User
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationRegistrationForm;




// working
// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
//   gender: Yup.string().required("Gender is required"),
//   dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
//     return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
//   }),
//   orgtype: Yup.string().required("Organization type is required"),
//   orgName: Yup.string().required("Organization name is required"),
//   // status: Yup.boolean().required("Status is required"),
// });

// const RegistrationForm = ({ isOpen, onClose }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       gender: "",
//       dob: "",
//       // status: true,
//       orgtype: "",
//       orgName: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/students/register", values);
//         toast.success("Student registered successfully!");
//         resetForm(); // Reset form values
//         onClose(); // Close the modal after successful submission
//         window.location.reload(); // Refresh the page to show the new user
//       } catch (error) {
//         console.error("Error registering student:", error);
//         toast.error("Failed to register student.");
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       {/* <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"> */}
//       <div style={{width:"100%", maxWidth:"90%"}}  className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">

       
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter email address"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter mobile number"
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {formik.touched.gender && formik.errors.gender ? (
//                     <div className="text-red-500 text-sm">{formik.errors.gender}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formik.values.dob}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   />
//                   {formik.touched.dob && formik.errors.dob ? (
//                     <div className="text-red-500 text-sm">{formik.errors.dob}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Type
//                   </label>
//                   <select
//                     name="orgtype"
//                     value={formik.values.orgtype}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Organization Type</option>
//                     <option value="College">College</option>
//                     <option value="School">School</option>
//                     <option value="University">University</option>
//                     <option value="Institute">Institute</option>
//                   </select>
//                   {formik.touched.orgtype && formik.errors.orgtype ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgtype}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Name
//                   </label>
//                   <input
//                     type="text"
//                     name="orgName"
//                     value={formik.values.orgName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization name"
//                     required
//                   />
//                   {formik.touched.orgName && formik.errors.orgName ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgName}</div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={() => {
//                   formik.resetForm();
//                   onClose();
//                 }}
//                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 Register User
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;






// updating and register in one

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import { log } from "util";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
    return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
  }),
  orgtype: Yup.string().required("Organization type is required"),
  orgName: Yup.string().required("Organization name is required"),
});

const RegistrationForm = ({ isOpen, onClose, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      dob: "",
      orgtype: "",
      orgName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (initialValues) {
          await axios.put(`http://localhost:5000/api/students/${initialValues._id}`, values);
          toast.success("Student updated successfully!");
        } else {
          await axios.post("http://localhost:5000/api/students/register", values);
          toast.success("Student registered successfully!");
        }
        resetForm(); // Reset form values
        onClose(); // Close the modal after successful submission
        window.location.reload(); // Refresh the page to show the new user
      } catch (error) {
        console.error("Error submitting form:", error);
        // toast.error("error submitting form");
        toast.error(error.response.data.msg);
        // console.log(error);
        
      }
    },
    enableReinitialize: true, // Reinitialize form values when initialValues change
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
      <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">{initialValues ? "Edit Student" : "Sign Up"}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter name"
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter email address"
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter mobile number"
                    required
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                  ) : null}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter password"
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    required
                  />
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className="text-red-500 text-sm">{formik.errors.dob}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Type
                  </label>
                  <select
                    name="orgtype"
                    value={formik.values.orgtype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    required
                  >
                    <option value="">Select Organization Type</option>
                    <option value="College">College</option>
                    <option value="School">School</option>
                    <option value="University">University</option>
                    <option value="Institute">Institute</option>
                  </select>
                  {formik.touched.orgtype && formik.errors.orgtype ? (
                    <div className="text-red-500 text-sm">{formik.errors.orgtype}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    value={formik.values.orgName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter organization name"
                    required
                  />
                  {formik.touched.orgName && formik.errors.orgName ? (
                    <div className="text-red-500 text-sm">{formik.errors.orgName}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  onClose();
                }}
                className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {initialValues ? "Update Student" : "Register Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;


// adding loader 

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Loader from "../../../components/Common/Loader";

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
//   gender: Yup.string().required("Gender is required"),
//   dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
//     return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
//   }),
//   orgtype: Yup.string().required("Organization type is required"),
//   orgName: Yup.string().required("Organization name is required"),
// });

// const RegistrationForm = ({ isOpen, onClose, initialValues }) => {
//   const [loading, setLoading] = useState(false);
  
//   const formik = useFormik({
//     initialValues: initialValues || {
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       gender: "",
//       dob: "",
//       orgtype: "",
//       orgName: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       try {
//         if (initialValues) {
//           await axios.put(`http://localhost:5000/api/students/${initialValues._id}`, values);
//           toast.success("Student updated successfully!");
//         } else {
//           await axios.post("http://localhost:5000/api/students/register", values);
//           toast.success("Student registered successfully!");
//         }
//         resetForm(); // Reset form values
//         onClose(); // Close the modal after successful submission
//         window.location.reload(); // Refresh the page to show the new user
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         toast.error(error.response.data.msg);
//       } finally {
//         setLoading(false);
//       }
//     },
//     enableReinitialize: true, // Reinitialize form values when initialValues change
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{width:"100%", maxWidth:"90%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">{initialValues ? "Edit Student" : "Sign Up"}</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter email address"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter mobile number"
//                     required
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {formik.touched.gender && formik.errors.gender ? (
//                     <div className="text-red-500 text-sm">{formik.errors.gender}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formik.values.dob}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   />
//                   {formik.touched.dob && formik.errors.dob ? (
//                     <div className="text-red-500 text-sm">{formik.errors.dob}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Type
//                   </label>
//                   <select
//                     name="orgtype"
//                     value={formik.values.orgtype}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Organization Type</option>
//                     <option value="College">College</option>
//                     <option value="School">School</option>
//                     <option value="University">University</option>
//                     <option value="Institute">Institute</option>
//                   </select>
//                   {formik.touched.orgtype && formik.errors.orgtype ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgtype}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Organization Name
//                   </label>
//                   <input
//                     type="text"
//                     name="orgName"
//                     value={formik.values.orgName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization name"
//                     required
//                   />
//                   {formik.touched.orgName && formik.errors.orgName ? (
//                     <div className="text-red-500 text-sm">{formik.errors.orgName}</div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={() => {
//                   formik.resetForm();
//                   onClose();
//                 }}
//                 className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 {initialValues ? "Update Student" : "Register Student"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       {loading && <Loader />}
//     </div>
//   );
// };

// export default RegistrationForm;