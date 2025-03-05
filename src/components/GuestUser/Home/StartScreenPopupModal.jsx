import React, { useState, useEffect } from "react";

const StartScreenPopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false); // Auto-close modal after 10 seconds
    }, 10000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      onClick={() => setIsOpen(false)} // Close modal when clicking outside
    >
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

      {/* Modal Container */}
      <div
        style={{ width: "60%", maxHeight: "70vh" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-400">
          <h2 className="text-2xl font-bold text-gray-800">&nbsp;Welcome</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-15 text-bold text-2xl text-red-500 hover:text-white hover:bg-red-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content Area with Scrollable Image */}
        <div className="p-4 flex-1 flex justify-center overflow-hidden rounded-xl">
          <img
            src="https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I="
            alt="Stock Market"
            className="w-full max-h-[300px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-gray-400 text-center">
          <p className="text-gray-600">Thank you for visiting our website!</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreenPopupModal;
