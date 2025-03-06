// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { updateOrgDetails } from "../../../redux/Organization/auth/organizationAuthSlice";
// import toast, { Toaster } from "react-hot-toast";

// // Validation schema
// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   address: Yup.string().required("Address is required"),
//   website: Yup.string().url("Invalid URL format"),
//   contactPerson: Yup.string(),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits"),
//   password: Yup.string().min(6, "Password must be at least 6 characters"),
//   photo: Yup.string().url("Invalid URL format"),
// });

// const OrganizationProfileModal = ({ isOpen, onClose, initialValues, refreshData }) => {
//   const dispatch = useDispatch();
//   const { loading, updateStatus, updateError } = useSelector((state) => state.organization.auth);

//   const formik = useFormik({
//     initialValues: initialValues || {
//       name: "",
//       address: "",
//       website: "",
//       contactPerson: "",
//       email: "",
//       mobile: "",
//       password: "",
//       photo: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         await dispatch(updateOrgDetails({ orgId: initialValues._id, orgData: values }));
//         toast.success("Organization details updated successfully!");
//         onClose(); // Close the modal after successful submission
//         refreshData(); // Refresh the data in the parent component
//       } catch (error) {
//         toast.error("Failed to update organization details.");
//       }
//     },
//     enableReinitialize: true, // Reinitialize form values when initialValues change
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

//       <div style={{ width: "100%", maxWidth: "90%" }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100 z-50">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Organization Profile</h2>
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
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formik.values.address}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization address"
//                     required
//                   />
//                   {formik.touched.address && formik.errors.address ? (
//                     <div className="text-red-500 text-sm">{formik.errors.address}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//                   <input
//                     type="text"
//                     name="website"
//                     value={formik.values.website}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization website"
//                   />
//                   {formik.touched.website && formik.errors.website ? (
//                     <div className="text-red-500 text-sm">{formik.errors.website}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formik.values.contactPerson}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter contact person name"
//                   />
//                   {formik.touched.contactPerson && formik.errors.contactPerson ? (
//                     <div className="text-red-500 text-sm">{formik.errors.contactPerson}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization email"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization mobile number"
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter new password (leave blank to keep current)"
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
//                   <input
//                     type="text"
//                     name="photo"
//                     value={formik.values.photo}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization photo URL"
//                   />
//                   {formik.touched.photo && formik.errors.photo ? (
//                     <div className="text-red-500 text-sm">{formik.errors.photo}</div>
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
//                 disabled={loading}
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 {loading ? "Updating..." : "Update Profile"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationProfileModal;




// OrganizationProfileModal Component
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateOrgDetails } from '../../../redux/Organization/auth/organizationAuthSlice';
// import toast, { Toaster } from 'react-hot-toast';

// // Validation schema
// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   address: Yup.string().required('Address is required'),
//   website: Yup.string().url('Invalid URL format'),
//   contactPerson: Yup.string(),
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, 'Mobile number must start with 9, 8, 7, or 6 and contain 10 digits'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters'),
//   photo: Yup.string().url('Invalid URL format'),
// });

// const OrganizationProfileModal = ({ isOpen, onClose, initialValues, refreshData }) => {
//   const dispatch = useDispatch();
//   const { loading, updateStatus, updateError } = useSelector((state) => state.organization.auth);

//   const formik = useFormik({
//     initialValues: initialValues || {
//       name: '',
//       address: '',
//       website: '',
//       contactPerson: '',
//       email: '',
//       mobile: '',
//       password: '',
//       photo: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         await dispatch(updateOrgDetails({ orgId: initialValues._id, orgData: values }));
//         toast.success('Organization details updated successfully!');
//         onClose(); // Close the modal after successful submission
//         refreshData(); // Refresh the data in the parent component
//       } catch (error) {
//         toast.error('Failed to update organization details.');
//       }
//     },
//     enableReinitialize: true, // Reinitialize form values when initialValues change
//   });

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <Toaster />
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

//       <div style={{ width: '100%', maxWidth: '90%' }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100 z-50">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Organization Profile</h2>
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
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formik.values.address}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization address"
//                     required
//                   />
//                   {formik.touched.address && formik.errors.address ? (
//                     <div className="text-red-500 text-sm">{formik.errors.address}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//                   <input
//                     type="text"
//                     name="website"
//                     value={formik.values.website}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization website"
//                   />
//                   {formik.touched.website && formik.errors.website ? (
//                     <div className="text-red-500 text-sm">{formik.errors.website}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formik.values.contactPerson}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter contact person name"
//                   />
//                   {formik.touched.contactPerson && formik.errors.contactPerson ? (
//                     <div className="text-red-500 text-sm">{formik.errors.contactPerson}</div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization email"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm">{formik.errors.email}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization mobile number"
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter new password (leave blank to keep current)"
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
//                   <input
//                     type="text"
//                     name="photo"
//                     value={formik.values.photo}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     placeholder="Enter organization photo URL"
//                   />
//                   {formik.touched.photo && formik.errors.photo ? (
//                     <div className="text-red-500 text-sm">{formik.errors.photo}</div>
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
//                 disabled={loading}
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//               >
//                 {loading ? 'Updating...' : 'Update Profile'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationProfileModal;





// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { updateOrgDetails } from "../../../../redux/Organization/auth/organizationAuthSlice"; // Adjust the import path
// import toast, { Toaster } from "react-hot-toast";

// // Validation schema
// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   address: Yup.string().required("Address is required"),
//   website: Yup.string().url("Invalid URL format"),
//   contactPerson: Yup.string(),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits"),
//   password: Yup.string().min(6, "Password must be at least 6 characters"),
//   photo: Yup.string().url("Invalid URL format"),
// });

// const OrganizationProfileModal = ({ isOpen, onClose, initialValues, refreshData }) => {
//   const dispatch = useDispatch();
//   const { loading, updateStatus, updateError } = useSelector((state) => state.organization.auth); // Correct Redux path
// console.log("initial values", initialValues);
//   const formik = useFormik({
//     initialValues: initialValues || {
//       name: "",
//       address: "",
//       website: "",
//       contactPerson: "",
//       email: "",
//       mobile: "",
//       password: "",
//       photo: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         await dispatch(updateOrgDetails({ orgName: initialValues.name, orgData: values }));
//         toast.success("Organization details updated successfully!");
//         onClose(); // Close the modal after successful submission
//         refreshData(); // Refresh the data in the parent component
//       } catch (error) {
//         toast.error("Failed to update organization details.");
//       }
//     },
//     enableReinitialize: true, // Reinitialize form values when initialValues change
//   });

//   if (!isOpen) return null;
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateOrgDetails } from "../../../../redux/Organization/auth/organizationAuthSlice"; // Adjust the import path
import toast, { Toaster } from "react-hot-toast";


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  website: Yup.string().url("Invalid URL format"),
  contactPerson: Yup.string(),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  photo: Yup.string().url("Invalid URL format"),
});

const OrganizationProfileModal = ({ isOpen, onClose, initialValues, refreshData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.organization.auth);

  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      address: "",
      website: "",
      contactPerson: "",
      email: "",
      mobile: "",
      password: "",
      photo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Form Values:", values); // Log the form values
        await dispatch(updateOrgDetails({ orgName: initialValues.name, orgData: values }));
        toast.success("Organization details updated successfully!");
        onClose(); // Close the modal after successful submission
        refreshData(); // Refresh the data in the parent component
      } catch (error) {
        toast.error("Failed to update organization details.");
      }
    },
    enableReinitialize: true, // Reinitialize form values when initialValues change
  });

  if (!isOpen) return null;




  return (

    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

      <div style={{ width: "100%", maxWidth: "90%" }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 ">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Organization Profile</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter organization name"
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter organization address"
                    required
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-500 text-sm">{formik.errors.address}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter organization website"
                  />
                  {formik.touched.website && formik.errors.website ? (
                    <div className="text-red-500 text-sm">{formik.errors.website}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formik.values.contactPerson}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter contact person name"
                  />
                  {formik.touched.contactPerson && formik.errors.contactPerson ? (
                    <div className="text-red-500 text-sm">{formik.errors.contactPerson}</div>
                  ) : null}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter organization email"
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter organization mobile number"
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter new password (leave blank to keep current)"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    value={formik.values.photo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter organization photo URL"
                  />
                  {formik.touched.photo && formik.errors.photo ? (
                    <div className="text-red-500 text-sm">{formik.errors.photo}</div>
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
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default OrganizationProfileModal;