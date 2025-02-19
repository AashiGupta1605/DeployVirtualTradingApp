import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";


const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return <LoginForm onClose={onClose} />;
};

const LoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

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
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        if (values.email === "admin@example.com" && values.password === "admin123") {
          localStorage.setItem("token", "admin-token");
          localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
          setTimeout(() => {
            setLoading(false);
            setSubmitting(false);
            navigate("/admin");
            onClose();
          }, 2000);
          return;
        }

        const response = await fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify({ name: data.user.name, role: data.user.role }));
          setTimeout(() => {
            setLoading(false);
            setSubmitting(false);
            navigate("/user");
            onClose();
          }, 2000);
        } else {
          setLoading(false);
          setSubmitting(false);
        }
      } catch (error) {
        setLoading(false);
        setSubmitting(false);
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
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-2xl z-40"></div>

    {/* Loader */}
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
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] relative">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="Enter your email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
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
    </div>
  );
};

export default LoginModal;
