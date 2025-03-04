import React, { useState, useEffect } from "react";

const StartScreenPopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false); // Close the modal after 30 seconds
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (!isOpen) return null; // If modal is closed, return nothing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 z-50">
      <div className="bg-[#262626] p-6 rounded-lg shadow-lg w-[700px] max-h-[800] text-center">
        <h2 className="text-xl font-bold mb-2 text-white">Welcome to Our Website</h2>
        <p className="text-gray-300">This is an auto-popup modal.</p>
        <div className="md:w-1/2 px-6 mt-12 ml-40 md:mt-0 items-center">
          <img
            src="https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I="
            alt="Stock Market"
            className="w-full h-auto object-cover rounded-lg shadow-lg p-8 "
          />
        </div>
        <button
          className="mt-4 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default StartScreenPopupModal
