import React, { useState } from "react";
import { FaChartLine } from "react-icons/fa";

const StartScreenPopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 mt-8 flex items-center justify-center overflow-y-auto">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black opacity-60 transition-opacity duration-300"></div>

      {/* Modal Container */}
      <div
        style={{ width: "85%", maxHeight: "70vh" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-3xl shadow-2xl border border-gray-300 z-50 flex flex-col overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <FaChartLine className="text-lightBlue-600 text-3xl" />
              <h2 className="text-lg font-semibold text-gray-800">
                <span className="font-bold text-xl text-lightBlue-600">Welcome:</span> Virtual Trading With PGR
              </h2>
            </div>

            {/* Right Side: Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none"
            >
              <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
            </button>
          </div>
        </div>

        {/* Content Area with Scrollable Image */}
        <div className="p-4 flex-1 flex justify-center overflow-hidden rounded-xl">
          <img
            src="https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I="
            alt="Stock Market"
            className="w-full max-h-[300px] object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-300 text-center bg-gray-100">
          <p className="text-gray-700 font-medium">Thank you for visiting our website!</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreenPopupModal;






// import React, { useState, useEffect } from "react";
// import { FaChartLine } from "react-icons/fa";
// // import { FaCheckCircle } from "react-icons/fa";

// const StartScreenPopupModal = () => {

//   const [isOpen, setIsOpen] = useState(true);
//     // const [isOpen, setIsOpen] = useState(false);
//   // const [isOpen, setIsOpen] = useState(() => {
//   //   return !localStorage.getItem("hasShownModal");
//   // });

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     setIsOpen(false); // Auto-close modal after 10 seconds
//   //   }, 30000);
//   //   return () => clearTimeout(timer); // Cleanup on unmount
//   // }, []);

//   // useEffect(() => {
//   //   // Check if the modal has been shown before using localStorage
//   //   const hasShownModal = localStorage.getItem("hasShownModal");
//   //   if (!hasShownModal) {
//   //     setIsOpen(true);
//   //     localStorage.setItem("hasShownModal", "true");
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (isOpen) {
//       localStorage.setItem("hasShownModal", "true");
//     }
//   }, [isOpen]); 

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 mt-8 flex items-center justify-center overflow-y-auto"
//       onClick={() => setIsOpen(false)} // Close modal when clicking outside
//     >
//       {/* Background Overlay */}
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

//       {/* Modal Container */}
//       <div
//         style={{ width: "85%", maxHeight: "70vh" }}
//         className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//       >
//         {/* Header */}
//         <div className="p-3 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <div className="flex gap-3 items-center">
//               <FaChartLine className="text-blue-500 text-3xl" />
//               <h2 className="text-base font-semibold text-gray-700">
//                 <span className="font-bold text-lg">Welcome:</span> Virtual
//                 Trading With PGR
//               </h2>
//             </div>

//             {/* Right Side: Close Button */}
//             <button
//               onClick={() => setIsOpen(false)}
//               className="w-10 p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//             >
//               <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//             </button>
//           </div>
//         </div>

//         {/* Content Area with Scrollable Image */}
//         <div className="p-4 flex-1 flex justify-center overflow-hidden rounded-xl">
//           <img
//             src="https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I="
//             alt="Stock Market"
//             className="w-full max-h-[300px] object-cover rounded-xl shadow-lg"
//           />
//         </div>

//         {/* Footer */}
//         <div className="p-2 border-t border-gray-400 text-center">
//           <p className="text-gray-600">Thank you for visiting our website!</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StartScreenPopupModal;
