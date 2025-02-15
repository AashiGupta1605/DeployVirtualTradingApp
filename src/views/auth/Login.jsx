import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold text-center text-blue-600">Sign In</h2>
        <p className="text-gray-500 text-center mb-4">Login to your account</p>
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
};

const LoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    // Hardcoded Admin Login
    if (formData.email === "admin@example.com" && formData.password === "admin") {
      setMessage("✅ Admin login successful! Redirecting...");
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
      setTimeout(() => {
        setLoading(false);
        navigate("/admin");
        onClose();
      }, 2000);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful! Redirecting...");
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.user.name, role: data.user.role })
        );

        setTimeout(() => {
          setLoading(false);
          navigate("/user");
          onClose();
        }, 2000);
      } else {
        setMessage(data.message || "❌ Invalid email or password.");
        setLoading(false);
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {loading && <div className="fixed inset-0 bg-gray-900 opacity-50 z-40"></div>}
      <div
        style={{ width: "100%", maxWidth: "40%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50"
      >
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
          {loading ? (
            <div className="flex items-center justify-center w-full h-64">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="border-blue-500 inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
                <p className="text-gray-600 text-sm">Loading data...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
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
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
