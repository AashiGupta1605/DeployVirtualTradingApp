import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import OTPModal from "./OtpModal";
import "../../components/User/Contact/ContactPage.css";
import { BASE_API_URL } from "../../utils/BaseUrl";

const RegisterModal = ({ isOpen, onClose, initialValues }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");  // Feedback message state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

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
  .min(8, "Password must be at least 8 characters")
  .max(15, "Password cannot be more than 15 characters")
  .matches(
    /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one letter and one special character"
  )
  .required("Password is required"),
      confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // ✅ Match password
    .required("Confirm Password is required"), // ✅ Required, field
    mobile: Yup.string()
      .matches(/^[9876]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date()
      .required("Date of birth is required")
      .test("age", "You must be at least 18 years old", (value) => {
        if (!value) return false; // Ensure value exists
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        
        // Adjust age if birthdate hasn't occurred yet this year
        const hasBirthdayOccurred =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
        return age > 18 || (age === 18 && hasBirthdayOccurred);
      }),
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
    onSubmit: async (values, { resetForm }) => {
      const { confirmPassword, ...userData } = values; // Exclude confirmPassword
    
      try {
        const url = initialValues
          ? `${BASE_API_URL}/user/users/${initialValues._id}`
          : `${BASE_API_URL}/user/auth/register`;
    
        const method = initialValues ? "PUT" : "POST";
    
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
    
        const data = await response.json();
    
        // 💥 Handle error response for existing but unverified user
        if (!response.ok) {
          if (data?.status === "not_verified") {
            toast.success("You are already registered but not verified. Sending OTP...");

    
            setUserEmail(userData.email);
            setAlreadyRegistered(true); // used to show "Click here to generate OTP"
            setShowOtpModal(true); // open OTP modal
    
            // 🔁 Optional: trigger resend OTP API again
            try {
              const otpRes = await fetch(`${BASE_API_URL}/user/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userData.email }),
              });
              const otpData = await otpRes.json();
              if (otpRes.ok) {
                toast.success("OTP resent to your email");
              } else {
                toast.error(otpData.message || "Failed to resend OTP");
              }
            } catch (otpErr) {
              toast.error("Failed to resend OTP");
            }
    
            return;
          }
    
          toast.error(data.message || "Something went wrong");
          return;
        }
    
        // ✅ Successful registration or update
        toast.success(`${initialValues ? "User updated" : "Registration successful!"}`);
    
        if (!initialValues) {
          // 🔔 Send OTP for new user
          const otpResponse = await fetch(`${BASE_API_URL}/user/auth/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userData.email }),
          });
    
          const otpResult = await otpResponse.json();
    
          if (otpResponse.ok) {
            toast.success("OTP sent to your email");
            setUserEmail(userData.email);
            setShowOtpModal(true);
          } else {
            toast.error(otpResult.message || "Failed to send OTP");
          }
        } else {
          resetForm();
          setTimeout(() => {
            navigate("/");
            onClose();
          }, 2000);
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Something went wrong. Please try again.");
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
              {initialValues ? "Edit User" : "User Sign Up"}
            </h2>
          </div>
          <button
            onClick={() => {
              formik.resetForm(); // Reset form fields
              onClose(); // Close the modal or form
            }}
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
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
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
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
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
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
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
    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
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
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
               focus:outline-none transition-all duration-200"
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
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
                placeholder="Enter organization type"
              />
              
            </div>

            <div className="col-span-2 flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  formik.resetForm(); // Reset form fields
                  onClose(); // Close the modal or form
                }}
                className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {initialValues ? "Update User" : "Register User"}
              </button>
            </div>
            {message && <p className="text-center text-sm mt-2 text-red-500">{message}</p>}
          </form>

          {showOtpModal && (
     <OTPModal
     isOpen={showOtpModal}
      onClose={() => setShowOtpModal(false)}
      email={userEmail}
      onVerified={() => {
        formik.resetForm();
       // toast.success("OTP Verified Successfully!");
        setTimeout(() => {
          setShowOtpModal(false); // Close OTP modal
          onClose();              // Close Register modal
        }, 2000);
      }}
  />
)}

        </div>
      </div>
      
    </div>
    
  );
};

export default RegisterModal;
