import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import OTPModal from "./OtpModal";
import { BASE_API_URL } from "../../utils/BaseUrl";

const RegisterModal = ({ onClose, onOpenLogin, initialValues }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    }
  }, [initialValues]);

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
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    mobile: Yup.string()
      .matches(/^[9876]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date()
      .required("Date of birth is required")
      .test("age", "You must be at least 18 years old", (value) => {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const hasBirthdayOccurred =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
        return age > 18 || (age === 18 && hasBirthdayOccurred);
      }),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      gender: "",
      dob: "",
      orgtype: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { confirmPassword, ...userData } = values;

      try {
        const url = initialValues
          ? `${BASE_API_URL}/user/users/${initialValues._id}`
          : `${BASE_API_URL}/user/auth/register`;
        const method = initialValues ? "put" : "post";
        
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Something went wrong");
          return;
        }

        if (response.ok) {
          toast.success(`${initialValues ? "User updated" : "Registration"} successful!`);
        
          if (!initialValues) {
            try {
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
            } catch (otpError) {
              toast.error("Failed to send OTP. Please try again.");
            }
          } else {
            resetForm();
            setTimeout(() => {
              navigate("/");
              onClose();
            }, 2000);
          }
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="space-y-6">
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
            onBlur={formik.handleBlur}
            className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
            placeholder="Re-enter password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
          )}
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
            onBlur={formik.handleBlur}
            className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
            placeholder="Enter organization type"
          />
          {formik.touched.orgtype && formik.errors.orgtype && (
            <p className="text-red-500 text-sm">{formik.errors.orgtype}</p>
          )}
        </div>

        <div className="col-span-2 flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-lightBlue-600 hover:underline focus:outline-none font-medium"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
            >
              Login here
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
              className="px-6 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-lightBlue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              {initialValues ? "Update User" : "Register"}
            </button>
          </div>
        </div>
      </form>

      {showOtpModal && (
        <OTPModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          email={userEmail}
          onVerified={() => {
            formik.resetForm();
            setShowOtpModal(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default RegisterModal;