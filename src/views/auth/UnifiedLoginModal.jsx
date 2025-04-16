// UnifiedLoginModal.js
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import UserLoginForm from "../auth/Login";
import OrgLoginForm from "../Organization/auth/Login";

const ToggleSwitch = ({ isOn, onToggle, disabled = false }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only"
      checked={isOn}
      onChange={onToggle}
      disabled={disabled}
    />
    <div
      className={`relative w-[330px] h-10 ml-4 rounded-full bg-white border-2 border-sky-600 transition-opacity ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div
        className={`absolute h-9 w-[162px] rounded-full bg-lightBlue-600 transition-transform duration-300 ease-in-out ${
          isOn ? "translate-x-[165px]" : "translate-x-0"
        }`}
      />
      <div className="absolute inset-0 flex justify-between items-center px-6 text-sm font-semibold z-10">
        <span className={`transition-colors duration-300 text-lg ${
          isOn ? "text-lightBlue-600" : "text-white"
        }`}>
          User
        </span>
        <span className={`transition-colors duration-300 text-lg ${
          isOn ? "text-white" : "text-lightBlue-600"
        }`}>
          Organization
        </span>
      </div>
    </div>
  </label>
);

const UnifiedLoginModal = ({ isOpen, onClose, onOpenRegister, onOpenForgotPassword }) => {
  const [isUser, setIsUser] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-auto my-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Login</h2>
          </div>
          <div className="flex items-center space-x-2">
            <ToggleSwitch 
              isOn={!isUser} 
              onToggle={() => setIsUser(!isUser)} 
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none"
          >
            <FaTimes className="text-gray-400 hover:text-gray-600 text-lg" />
          </button>
        </div>
        <div className="p-6">
          {isUser ? (
            <UserLoginForm 
              onClose={onClose}
              onOpenRegister={onOpenRegister}
              onOpenForgotPassword={onOpenForgotPassword}
            />
          ) : (
            <OrgLoginForm 
              onClose={onClose}
              onOpenRegister={onOpenRegister}
              onOpenForgotPassword={onOpenForgotPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedLoginModal;
