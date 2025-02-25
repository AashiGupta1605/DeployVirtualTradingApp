
// // params login

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../../components/Common/Loader";
// import { BASE_API_URL } from "../../../utils/BaseUrl";


// const validationSchema = Yup.object({
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const OrganizationLogin = ({ isOpen, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       try {
//         const response = await axios.post(`${BASE_API_URL}/organization/login`, values);
//         if (response && response.data.success) {
//           toast.success(response.data.message);
//           localStorage.setItem("orgName", response.data.orgName); // Store organization name
//           navigate("/organization/dashboard");
//         } else {
//           toast.error(response.data.message);
//         }
//       } catch (error) {
//         console.error("Error during login:", error);
//         // toast.error("Failed to login.");
//         toast.error(error.response.data.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       {/* <Toaster /> */}
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{ width: "100%", maxWidth: "40%" }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-user text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           {loading ? (
//             <Loader />
//           ) : (
//             <form onSubmit={formik.handleSubmit} className="space-y-6">
//               <div className="space-y-4">
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
//               </div>

//               <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     formik.resetForm();
//                     onClose();
//                   }}
//                   className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                 >
//                   Login
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationLogin;



// redux toolkit updated feature wise in separate file

// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginOrganization, resetAuthState } from '../../../redux/Organization/auth/organizationAuthSlice';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// // Validation schema for the login form
// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// const OrganizationLogin = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Access the auth state from the Redux store
//   const { orgName, loading, error, success } = useSelector((state) => state.organization.auth);

//   // Formik setup for form handling
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         // Dispatch the loginOrganization action
//         const resultAction = await dispatch(loginOrganization(values));

//         // Handle the result of the login action
//         if (loginOrganization.fulfilled.match(resultAction)) {
//           toast.success(resultAction.payload.message);
//           localStorage.setItem('orgName', resultAction.payload.orgName); // Save orgName to localStorage
//           navigate('/organization/dashboard'); // Redirect to dashboard
//         } else if (loginOrganization.rejected.match(resultAction)) {
//           toast.error(resultAction.payload.message); // Show error message
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         toast.error(error?.resultAction?.payload?.message);
//       } finally {
//         resetForm(); // Reset the form after submission
//       }
//     },
//   });

//   // If the modal is not open, return null
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       {/* Background overlay */}
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

//       {/* Modal container */}
//       <div style={{ width: '100%', maxWidth: '40%' }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         {/* Modal header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-user text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
//           </div>
//           {/* Close button */}
//           <button
//             onClick={() => {
//               onClose();
//               dispatch(resetAuthState()); // Reset auth state when closing the modal
//             }}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         {/* Modal body */}
//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           {loading ? (
//             <p>Loading...</p> // Show loading spinner or message
//           ) : (
//             <form onSubmit={formik.handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 {/* Email input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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

//                 {/* Password input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
//               </div>

//               {/* Form actions */}
//               <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//                 {/* Cancel button */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     formik.resetForm(); // Reset the form
//                     onClose(); // Close the modal
//                     dispatch(resetAuthState()); // Reset auth state
//                   }}
//                   className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>

//                 {/* Login button */}
//                 <button
//                   type="submit"
//                   className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                 >
//                   Login
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationLogin;









// update login redux toolkit:



import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginOrganization, resetAuthState } from '../../../redux/Organization/auth/organizationAuthSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Validation schema for the login form
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const OrganizationLogin = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the auth state from the Redux store
  const { loading } = useSelector((state) => state.organization.auth);

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Dispatch the loginOrganization action
        const resultAction = await dispatch(loginOrganization(values));

        // Handle the result of the login action
        if (loginOrganization.fulfilled.match(resultAction)) {
          toast.success('Login successful!');
          localStorage.setItem('orgName', resultAction.payload.orgName); // Save orgName to localStorage
          navigate('/organization/dashboard'); // Redirect to dashboard
        } else if (loginOrganization.rejected.match(resultAction)) {
          toast.error(resultAction.payload?.message || 'Login failed. Please try again.'); // Show error message
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        resetForm(); // Reset the form after submission
      }
    },
  });

  // If the modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

      {/* Modal container */}
      <div
        style={{ width: '100%', maxWidth: '40%' }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          </div>
          {/* Close button */}
          <button
            onClick={() => {
              onClose();
              dispatch(resetAuthState()); // Reset auth state when closing the modal
            }}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {loading ? (
            <p className="text-center">Loading...</p> // Show loading spinner or message
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Email input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  )}
                </div>

                {/* Password input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                  )}
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
                {/* Cancel button */}
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm(); // Reset the form
                    onClose(); // Close the modal
                    dispatch(resetAuthState()); // Reset auth state
                  }}
                  className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationLogin;