
// OrgLoginForm.js (same as before)
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginOrganization, selectOrgAuthStatus } from "../../../redux/Organization/auth/organizationAuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrgLoginForm = ({ onClose, onOpenRegister, onOpenForgotPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectOrgAuthStatus);
  const loading = authStatus === "loading";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const resultAction = await dispatch(loginOrganization(values));
        
        if (loginOrganization.fulfilled.match(resultAction)) {
          setTimeout(() => {
            setSubmitting(false);
            navigate("/organization");
            toast.success("Login successful!");
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
    <div className="space-y-6">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-2xl z-40"></div>
          <div className="z-50 flex flex-col items-center gap-4">
            <div
              className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-lightBlue-600 border-t-transparent"
              role="status"
            ></div>
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
              bg-white text-gray-900 
              focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
              focus:outline-none transition-all duration-200"
              placeholder="Enter organization email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
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
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-lightBlue-600 hover:underline focus:outline-none text-sm"
            onClick={onOpenForgotPassword}
          >
            Forgot Password?
          </button>
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-lightBlue-600 hover:underline focus:outline-none font-medium"
              onClick={onOpenRegister}
            >
              Register now
            </button>
          </div>
        </div>

        <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting || loading}
            className="px-6 py-2.5 rounded-xl bg-lightBlue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrgLoginForm;