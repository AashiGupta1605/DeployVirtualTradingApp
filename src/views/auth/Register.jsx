import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
        toast.error(error.response?.data?.msg || "Error submitting form");
      }
    },
    enableReinitialize: true, // Reinitialize form values when initialValues change
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
      <Toaster />
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

      {/* Modal Container */}
      <div
        style={{ width: "100%", maxWidth: "80%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {initialValues ? "Edit Student" : "Register New Student"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        {/* Modal Body */}
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

            {/* Action Buttons */}
            <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
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
                className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
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