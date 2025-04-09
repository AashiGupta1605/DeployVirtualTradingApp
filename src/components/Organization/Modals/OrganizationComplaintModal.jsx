import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const OrganizationComplaintModal = ({
  isOpen,
  onClose,
  onSubmit,
  complaintData,
  loading,
}) => {
  const org = localStorage.getItem("org");

  const [formData, setFormData] = useState({
    category: "",
    complaintMessage: "",
    complaintDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (complaintData) {
        setFormData({
          category: complaintData.category || "",
          complaintMessage: complaintData.complaintMessage || "",
          complaintDate: complaintData.complaintDate || "", // Set if editing
        });
      } else {
        setFormData({
          category: "",
          complaintMessage: "",
          complaintDate: new Date().toISOString().split("T")[0], // Auto-set current date
        });
      }
    }
  }, [isOpen, complaintData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!org) {
      toast.error("Organization not found. Please log in.");
      return;
    }

    const payload = {
      ...formData,
      orgName: localStorage.getItem("orgName"),
      organizationId: JSON.parse(org)._id,
    };

    onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
        style={{ width: "80%", maxWidth: "80%" }}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <i className="fas fa-exclamation-circle text-red-600 mr-2"></i>{" "}
            {complaintData ? "Edit Complaint" : "Submit Complaint"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Type
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="">Select Type</option>
                  <option value="Account Issues">Account Issues</option>
                  <option value="Payment Problems">Payment Problems</option>
                  <option value="Technical Errors">Technical Errors</option>
                  <option value="Service Quality">Service Quality</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Message
                </label>
                <textarea
                  name="complaintMessage"
                  value={formData.complaintMessage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-red-600 text-white"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : complaintData
                  ? "Update Complaint"
                  : "Submit Complaint"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default OrganizationComplaintModal;
