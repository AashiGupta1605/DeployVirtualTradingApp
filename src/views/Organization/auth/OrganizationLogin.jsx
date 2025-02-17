// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// const validationSchema = Yup.object({
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const OrganizationLogin = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/organizations/login", values);
//         if(response && response.data.success){
//           navigate("/organization/dashboard");
//           toast.success(response.data.message);
//           console.log(response.data.message);
//           console.log(response.data);
//         }
//         else {
//           toast.error(response.data.message);
//         }
        
        
//         // resetForm(); // Reset form values
//         // onClose(); // Close the modal after successful submission
//         // window.location.reload(); // Refresh the page
//       } catch (error) {
//         console.error("Error during login:", error);
//         toast.error("Failed to login.");
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{width:"100%", maxWidth:"40%"}}  className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
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
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   placeholder="Enter email address"
//                   required
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                   <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                 ) : null}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   placeholder="Enter password"
//                   required
//                 />
//                 {formik.touched.password && formik.errors.password ? (
//                   <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                 ) : null}
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
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationLogin;






// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const validationSchema = Yup.object({
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const OrganizationLogin = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/organizations/login", values);
//         if(response && response.data.success){
//           toast.success(response.data.message);
//           navigate("/organization/dashboard");
//         } else {
//           toast.error(response.data.message);
//         }
//       } catch (error) {
//         console.error("Error during login:", error);
//         toast.error("Failed to login.");
//       }
//     },
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
//       <div style={{width:"100%", maxWidth:"40%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
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
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   placeholder="Enter email address"
//                   required
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                   <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                 ) : null}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   placeholder="Enter password"
//                   required
//                 />
//                 {formik.touched.password && formik.errors.password ? (
//                   <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                 ) : null}
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
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationLogin;






import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Common/Loader";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const OrganizationLogin = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/api/organization/login", values);
        if(response && response.data.success){
          toast.success(response.data.message);
          navigate("/organization/dashboard");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Failed to login.");
      } finally {
        setLoading(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      
      <div style={{width:"100%", maxWidth:"40%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
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
                  Login
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