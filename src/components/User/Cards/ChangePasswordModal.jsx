import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../../redux/User/userprofileSlice"; // Import the Redux action

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "Old password must be at least 8 characters")
      .max(15, "Old password cannot be more than 15 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
        "Old password must contain at least one letter and one special character"
      )
      .required("Old password is required"),
  
    newPassword: Yup.string()
      .min(8, "New password must be at least 8 characters")
      .max(15, "New password cannot be more than 15 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
        "New password must contain at least one letter and one special character"
      )
      .notOneOf([Yup.ref("oldPassword")], "New password must be different from the old password")
      .required("New password is required"),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "New password and confirm password must match")
      .required("Confirm password is required"),
  });

  // Formik for form state management
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword }));
       toast.success("Password changed successfully!");
        onClose();
      } catch (error) {
        toast.error("Error changing password. Please try again.");
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div
        style={{ width: "100%", maxWidth: "40%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-lock text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Old Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter old password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
              />
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.oldPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                 placeholder="Enter confirm password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ml-4"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
