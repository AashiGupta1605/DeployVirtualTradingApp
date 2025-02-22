
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_API_URL } from "../../../utils/BaseUrl";

const UpdateProfileForm = ({ isOpen, onClose, userId, onUpdate }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`${BASE_API_URL}/user/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        const formattedDob = data.user?.dob ? data.user.dob.split("T")[0] : "";

        setUserData({
          name: data.user?.name || "",
          email: data.user?.email || "",
          mobile: data.user?.mobile || "",
          gender: data.user?.gender || "",
          dob: formattedDob,
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [isOpen, userId]);

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
    dob: Yup.date().max(new Date(), "Date of birth cannot be in the future").required("Date of birth is required"),
  });

  const formik = useFormik({
    initialValues: userData,
    enableReinitialize: true, // Ensures form updates when userData is fetched
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting values:", values); // Debugging line
        if (!values.email) {
          throw new Error("Email is missing in the form values");
        }
    
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
    
        const response = await fetch(`${BASE_API_URL}/user/update`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
    
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Profile update failed");
    
        alert("Profile updated successfully!");
        onUpdate(values);
        onClose();
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
    ,
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200" required />
                    {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input type="date" name="dob" value={formik.values.dob} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200" required />
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200" required />
                    {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input type="text" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200" required />
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
