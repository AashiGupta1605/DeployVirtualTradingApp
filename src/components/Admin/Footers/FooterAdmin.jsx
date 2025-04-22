// import React from "react";

// export default function FooterAdmin() {
//   return (
//     <footer className="footer block py-6 bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         {/* Custom Horizontal Line */}
//         <div className="w-full h-px bg-blueGray-200 mb-6"></div>

//         <div className="flex flex-wrap items-center md:justify-between justify-center">
//           {/* Left Section */}
//           <div className="w-full md:w-4/12 px-4">
//             <div className="text-sm text-blueGray-600 font-semibold py-1 text-center md:text-left">
//               Copyright © {new Date().getFullYear()}{" "}
//               <a
//                 href="#"
//                 className="text-blueGray-600 hover:text-blueGray-800 transition-colors duration-200"
//               >
//                 StockSphere
//               </a>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="w-full md:w-8/12 px-4">
//             <ul className="flex flex-wrap list-none md:justify-end justify-center space-x-4">
//               <li>
//                 <a
//                   href="https://www.creative-tim.com?ref=nr-footer-admin"
//                   className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
//                 >
//                   Creative Tim
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://www.creative-tim.com/presentation?ref=nr-footer-admin"
//                   className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
//                 >
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="http://blog.creative-tim.com?ref=nr-footer-admin"
//                   className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
//                 >
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md?ref=nr-footer-admin"
//                   className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
//                 >
//                   MIT License
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import React from "react";

export default function FooterAdmin() {
  return (
    <footer className="footer block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-b-1 border-blueGray-200" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-[0.8rem] text-blueGray-500 font-semibold py-1 text-center md:text-left">
            © 2025 Praedico Global Research Pvt Ltd. All rights reserved.
              
              {/* <a
                href="https://www.creative-tim.com?ref=nr-footer-admin"
                className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
              >
                Creative Tim
              </a> */}
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end justify-center">
              <li>
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-admin"
                  className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                >
                  Creative Tim
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/presentation?ref=nr-footer-admin"
                  className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="http://blog.creative-tim.com?ref=nr-footer-admin"
                  className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md?ref=nr-footer-admin"
                  className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}