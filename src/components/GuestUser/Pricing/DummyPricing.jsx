// import React from "react";

// const Pricing = () => {
//   return (
//     <div className="bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             StockSphere, Transparent Pricing
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Choose the perfect plan that suits your needs. No hidden fees, no surprises.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {/* Pricing Plans */}
//           {[
//             { name: "Silver", price: "$19", features: ["Enjoy Trading", "Trading Amount: $1000"], highlight: false },
//             { name: "Gold", price: "$49", features: ["Unlimited Trading", "Trading Amount: $1500", "Basic Support"], highlight: true },
//             { name: "Diamond", price: "$99", features: ["Unlimited Everything", "Trading Amount: $3000", "24/7 Priority Support"], highlight: false }
//           ].map((plan, index) => (
//             <div
//               key={index}
//               className={`rounded-2xl shadow-lg p-8 transition transform hover:scale-105 ${
//                 plan.highlight ? "bg-indigo-600 text-white hover:scale-110 relative" : "bg-white"
//               }`}
//             >
//               {plan.highlight && (
//                 <span className="absolute top-4 right-4 bg-indigo-700 text-sm py-1 px-3 rounded-full">
//                   Popular
//                 </span>
//               )}
//               <h3 className={`text-xl font-semibold mb-4 ${plan.highlight ? "" : "text-gray-900"}`}>{plan.name}</h3>
//               <p className={`text-4xl font-bold mb-6 ${plan.highlight ? "" : "text-gray-900"}`}>
//                 {plan.price} <span className={`${plan.highlight ? "text-indigo-200" : "text-gray-500"} text-lg`}>/month</span>
//               </p>

//               <ul className="space-y-4 mb-6">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className={`flex items-center gap-2 ${plan.highlight ? "" : "text-gray-600"}`}>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       className={`size-5 flex-shrink-0 ${plan.highlight ? "text-white" : "text-green-500"}`}
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//                     </svg>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 className={`w-full py-3 rounded-lg transition ${
//                   plan.highlight
//                     ? "bg-white text-indigo-600 hover:bg-indigo-50"
//                     : "bg-gray-900 text-white hover:bg-gray-800"
//                 }`}
//               >
//                 Get Started
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
