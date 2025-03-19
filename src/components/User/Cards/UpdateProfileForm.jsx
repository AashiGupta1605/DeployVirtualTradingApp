import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchUserData, updateUserProfile } from "../../../redux/User/userprofileSlice";

const UpdateProfileForm = ({ isOpen, onClose, onUpdate }) => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUserData());
    }
  }, [isOpen, dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
    gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
    dob: Yup.date().max(new Date(), "Date of birth cannot be in the future").required("Date of birth is required"),
  });

  const formik = useFormik({
    initialValues: userData || { name: "", email: "", mobile: "", gender: "", dob: "" },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(updateUserProfile(values))
        .unwrap()
        .then(() => {
          // alert("Profile updated successfully!");
          toast.success("Profile updated successfully!");
          onUpdate(values);
          onClose();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
    <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
    <div style={{ width: "100%", maxWidth: "80%" }} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-user-edit text-white"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Update Profile</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
          <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
        </button>
      </div>
      <div className="p-6">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-gray-50 p-6 rounded-xl flex-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-6">Personal Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200" required />
                  {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input type="date" name="dob" value={formik.values.dob} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200" required />
                  {formik.touched.dob && formik.errors.dob && <p className="text-red-500 text-sm">{formik.errors.dob}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select name="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && <p className="text-red-500 text-sm">{formik.errors.gender}</p>}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl flex-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200" required />
                  {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="text" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200" required />
                  {formik.touched.mobile && formik.errors.mobile && <p className="text-red-500 text-sm">{formik.errors.mobile}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 text-white">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default UpdateProfileForm;






// abhsihek code for image not working

// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserProfile } from "../../../redux/User/userprofileSlice";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// // Validation schema
// const validationSchema = Yup.object({
//   name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
//   gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
//   dob: Yup.date().max(new Date(), "Date of birth cannot be in the future").required("Date of birth is required"),
//   photo: Yup.string().url("Invalid URL format"),
// });

// const UpdateProfileForm = ({ isOpen, onClose, userData, onUpdate }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.user.profile);
//   const [photo, setPhoto] = useState(userData?.photo || "");
//   const [isPhotoHovered, setIsPhotoHovered] = useState(false);

//   // Update photo state when userData changes
//   useEffect(() => {
//     if (userData?.photo) {
//       setPhoto(userData.photo);
//     }
//   }, [userData]);

//   // Formik setup
//   const formik = useFormik({
//     initialValues: userData || {
//       name: "",
//       email: "",
//       mobile: "",
//       gender: "",
//       dob: "",
//       photo: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const updatedValues = { ...values, photo }; // Include the photo in the update
//         await dispatch(updateUserProfile(updatedValues)).unwrap();
//         toast.success("Profile updated successfully!");
//         onUpdate(updatedValues);
//         onClose();
//       } catch (error) {
//         // toast.error("Failed to update profile: " + error.message);
//         // toast.error("Failed to update profile: " + (error.message || "Unknown error"));
//         console.error("Error in onSubmit:", error);
//         toast.error("Failed to update profile: " + (error.message || "Network error. Please check your connection."));
//       }
//     },
//     enableReinitialize: true, // Reinitialize form values when userData changes
//   });

//   // Handle photo file upload
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle photo removal
//   const handleRemovePhoto = () => {
//     toast.success("Photo removed. Click on update profile to save the changes");
//     setPhoto("https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png");
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
//       <div style={{ width: "100%", maxWidth: "80%" }} className="relative w-full max-w-4xl p-6 mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-user-edit text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Update Profile</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="p-6 overflow-y-auto max-h-[80vh] z-50">
//           <form onSubmit={formik.handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left Column */}
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
//                     placeholder="Enter your name"
//                     required
//                   />
//                   {formik.touched.name && formik.errors.name ? (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
//                   ) : null}
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
//                     placeholder="Enter your email"
//                     required
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
//                   ) : null}
//                 </div>

//                 {/* Mobile */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
//                     placeholder="Enter your mobile number"
//                     required
//                   />
//                   {formik.touched.mobile && formik.errors.mobile ? (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-4">
//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                   <select
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                   {formik.touched.gender && formik.errors.gender ? (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
//                   ) : null}
//                 </div>

//                 {/* Date of Birth */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formik.values.dob}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
//                     required
//                   />
//                   {formik.touched.dob && formik.errors.dob ? (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.dob}</div>
//                   ) : null}
//                 </div>

//                 {/* Photo */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
//                   <div
//                     className="relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer"
//                     onMouseEnter={() => setIsPhotoHovered(true)}
//                     onMouseLeave={() => setIsPhotoHovered(false)}
//                     onClick={() => document.getElementById("photo-upload").click()}
//                   >
//                     <img
//                       src={photo || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                     {isPhotoHovered && (
//                       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                         <span className="text-white text-sm">Change Photo</span>
//                       </div>
//                     )}
//                   </div>
//                   <input
//                     type="file"
//                     id="photo-upload"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                   {photo && photo !== "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png" && (
//                     <button
//                       type="button"
//                       onClick={handleRemovePhoto}
//                       className="text-sm text-black font-semibold hover:opacity-80 mt-2 px-2 py-2 rounded-xl"
//                     >
//                       Remove Photo
//                     </button>
//                   )}
//                   {formik.touched.photo && formik.errors.photo ? (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.photo}</div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
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

// export default UpdateProfileForm;