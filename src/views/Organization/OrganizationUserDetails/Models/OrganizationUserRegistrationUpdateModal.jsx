
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerOrganizationUser, updateOrganizationUser, resetUserState } from "../../../../redux/Organization/users/organizationUsersSlice";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../assets/styles/customDatePicker.css";
// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(5, "Name must be at least 5 characters")
  .max(50, "Name must be less than 50 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string().matches(/^[9876]\d{9}$/, "Mobile number must start with 9, 8, 7, or 6 and contain 10 digits").required("Mobile number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required").test("age", "You must be at least 18 years old", function (value) {
    return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
  }),
  addedby: Yup.string().required("Added by is required"),
  // status: Yup.boolean().default(true).required("Status is required"),
});

const OrganizationUserRegistration = ({ isOpen, onClose, initialValues, refreshStudents, refreshDashboard }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.organization.users);
  const orgName = localStorage.getItem("orgName");

  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      email: "",
      mobile: "",
      gender: "",
      dob: "",
      addedby: "",
      // status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (initialValues) {
          // Update existing user
          await dispatch(updateOrganizationUser({ id: initialValues._id, userData: values }));
        onClose(); // Close the modal after successful submission
        } else {
          // Register new user
          await dispatch(registerOrganizationUser(values));
        }
        // resetForm(); // Reset form values
        onClose(); // Close the modal after successful submission
        refreshStudents();
        // refreshDashboard();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    enableReinitialize: true, // Reinitialize form values when initialValues change
  });

  // Reset state when the modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      dispatch(resetUserState());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>


      <div style={{ width: "100%", maxWidth: "80%"}} className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">{initialValues ? "Edit User" : "Sign Up"}</h2>
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
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
                    placeholder="Enter name"
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                  ) : null}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
                    placeholder="Enter email address"
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  ) : null}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
                         bg-white text-gray-900 
                        focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
                          focus:outline-none transition-all duration-200"
                    placeholder="Enter mobile number"
                    required
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
                  ) : null}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
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
                    <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
                  ) : null}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <DatePicker
                    selected={formik.values.dob ? new Date(formik.values.dob) : null}
                    onChange={(date) => formik.setFieldValue("dob", date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholderText="Select date of birth"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    required
                  />
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.dob}</div>
                  ) : null}
                </div>

                {/* Added By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Added By</label>
                  <input
                    type="text"
                    name="addedby"
                    value={formik.values.addedby}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
                    placeholder="Enter added by"
                    required
                  />
                  {formik.touched.addedby && formik.errors.addedby ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.addedby}</div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
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
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {loading ? "Processing..." : initialValues ? "Update User" : "Register User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationUserRegistration;