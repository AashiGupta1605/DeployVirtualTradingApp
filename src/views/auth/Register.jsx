import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../components/User/Contact/ContactPage.css";

const RegisterModal = ({ isOpen, onClose, initialValues }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");  // Feedback message state
  useEffect(() => {
    // Reset form data when initialValues change (if editing an existing user)
    if (initialValues) {

      formik.setValues(initialValues);
    }
  }, [initialValues]);

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of birth is required"),
    // orgtype: Yup.string().notRequired(), // Make this field not required
  });

  // Formik setup
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",  // Added confirmPassword
      mobile: "",
      gender: "",
      dob: "",
      orgtype: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...userData } = values; // Exclude confirmPassword before sending data
  
      try {
        const url = initialValues
          ? `http://localhost:5000/api/user/users/${initialValues._id}`
          : "http://localhost:5000/api/user/register";
        const method = initialValues ? "put" : "post";
  
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData), // Send data without confirmPassword
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage(`${initialValues ? "User updated" : "Registration"} successful! Redirecting to login...`);
          setTimeout(() => {
            navigate("/login");
            onClose();
          }, 2000);
        } else {
          setMessage(data.message || `${initialValues ? "Update" : "Registration"} failed.`);
        }
      } catch (error) {
        setMessage("Something went wrong. Please try again.");
      }
    },
  });
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div
        style={{ width: "100%", maxWidth: "90%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {initialValues ? "Edit User" : "Sign Up"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>
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
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}

      
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
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
  <input
    type="password"
    name="confirmPassword"
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
    placeholder="Re-enter password"
  />
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
                placeholder="Enter mobile number"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm">{formik.errors.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
              {formik.touched.dob && formik.errors.dob && (
                <p className="text-red-500 text-sm">{formik.errors.dob}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
              <input
                type="text"
                name="orgtype"
                value={formik.values.orgtype}
                onChange={formik.handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Enter organization type"
              />
              
            </div>

            <div className="col-span-2 flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
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
                {initialValues ? "Update User" : "Sign Up"}
              </button>
            </div>
            {message && <p className="text-center text-sm mt-2 text-red-500">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
