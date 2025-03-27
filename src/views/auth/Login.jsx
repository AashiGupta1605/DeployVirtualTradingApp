import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
} from "../../redux/User/authSlice";
import ForgotPasswordModal from "./ForgetPasswordModal"; 

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <LoginForm onClose={onClose} />;
};

const LoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const loading = authStatus === "loading";

    // State for forgot password modal
    const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      identifier: "", // Can be email or mobile
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .required("Email or Mobile is required")
        .test("is-email-or-mobile", "Invalid email or mobile format", (value) => {
          const isEmail = Yup.string().email().isValidSync(value);
          const isMobile = /^[6-9]\d{9}$/.test(value);
          return isEmail || isMobile;
        }),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    // onSubmit: async (values, { setSubmitting }) => {
    //   // setSubmitting(true);
    //   try {
    //     const isEmail = Yup.string().email().isValidSync(values.identifier);
    //     const credentials = isEmail
    //       ? { email: values.identifier, password: values.password }
    //       : { mobile: values.identifier, password: values.password };

    //     const resultAction = await dispatch(loginUser(credentials));

    //     if (loginUser.fulfilled.match(resultAction)) {
    //       const user = resultAction.payload?.user;

    //       if (user?.isDeleted) {
    //         toast.error("Your account has been deactivated.");
    //         setSubmitting(false);
    //         return;
    //       }

    //       setTimeout(() => {
    //         setSubmitting(false);
    //         if (user?.role === "admin") {
    //           navigate("/admin");
    //           toast.success("Login successful!");
    //         } else {
    //           navigate("/user");
    //           toast.success("Login successful!");
    //         }
    //         onClose();
    //       }, 2000);
    //     } else {
    //       setSubmitting(false);
    //       toast.error(resultAction.payload?.message || "Login failed. Please try again.");
    //     }
    //   } catch (error) {
    //     console.error("Error during login:", error);
    //     toast.error("An unexpected error occurred. Please try again.");
    //   }//finally {
    //   //   resetForm();
    //   // }
    // },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const isEmail = Yup.string().email().isValidSync(values.identifier);
        const credentials = isEmail
          ? { email: values.identifier, password: values.password }
          : { mobile: values.identifier, password: values.password };
    
        const resultAction = await dispatch(loginUser(credentials));
    
        if (loginUser.fulfilled.match(resultAction)) {
          const user = resultAction.payload?.user;
          
          setTimeout(() => {
            setSubmitting(false);
            if (user?.role === "admin") {
              navigate("/admin");
              toast.success("Login successful!");
            } else {
              navigate("/user");
              toast.success("Login successful!");
            }
            onClose();
          }, 2000);
        } else {
          setSubmitting(false);
          toast.error(resultAction.payload || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
    
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div
        style={{ width: "100%", maxWidth: "40%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-2xl z-40"></div>
            <div className="z-50 flex flex-col items-center gap-4">
              <div
                className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-blue-600 border-t-transparent"
                role="status"
              ></div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">User Login</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] relative">
          {authError && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {authError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Mobile
                </label>
                <input
                  type="text"
                  name="identifier"
                  className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
                  placeholder="Enter email or mobile number"
                  {...formik.getFieldProps("identifier")}
                />
                {formik.touched.identifier && formik.errors.identifier ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.identifier}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
             bg-white text-gray-900 
             focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
             focus:outline-none transition-all duration-200"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

              {/* Forgot Password Link */}
              <div className="text-left">
              <button
                type="button"
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={() => setForgotPasswordOpen(true)}
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting || loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
       {/* Forgot Password Modal */}
       {isForgotPasswordOpen && (
        <ForgotPasswordModal onClose={() => setForgotPasswordOpen(false)} />
      )}
    
    </div>
  );
};

export default LoginModal;
