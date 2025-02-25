import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className={`relative w-full max-w-md mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="mt-4 text-gray-600">{message}</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={onClose} className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;