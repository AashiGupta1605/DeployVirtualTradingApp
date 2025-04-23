// import React from "react";

// export default function Footer() {
//   return (
//     <>
//       <footer className="relative bg-blueGray-800 pt-8 pb-6">
//       <div className="bottom-0 top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
//             <polygon className="text-blueGray-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
//           </svg>
//         </div>
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap text-center lg:text-left">
//             {/* Left Section: Keep in Touch */}
//             <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0">
//               <h4 className="text-3xl font-semibold text-white">Let's Keep in Touch!</h4>
//               <p className="text-lg mt-0 mb-2 text-blueGray-300">
//                 We're here to help and answer any questions you might have. Reach out to us via our social platforms.
//               </p>
//               <div className="mt-6 lg:mb-0 mb-6">
//                 <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
//                   <i className="fab fa-twitter"></i>
//                 </button>
//                 <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
//                   <i className="fab fa-facebook-square"></i>
//                 </button>
//                 <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
//                   <i className="fab fa-dribbble"></i>
//                 </button>
//                 <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
//                   <i className="fab fa-github"></i>
//                 </button>
//               </div>
//             </div>

//             {/* Right Section: Quick Links */}
//             <div className="w-full lg:w-4/12 px-4">
//               <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-white">
//                 Quick Links
//               </span>
//               <ul className="list-unstyled text-blueGray-300">
//                 <li>
//                   <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#about">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#services">
//                     Services
//                   </a>
//                 </li>
//                 <li>
//                   <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#contact">
//                     Contact Us
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <hr className="my-6 border-blueGray-300" />
//           <div className="flex flex-wrap items-center md:justify-between justify-center">
//             <div className="w-full md:w-4/12 px-4 mx-auto text-center">
//               <div className="text-[0.8rem] text-blueGray-500 font-semibold py-1">
//                 {/* Copyright © {new Date().getFullYear()} All rights reserved. */}
//             © 2025 Praedico Global Research Pvt Ltd. All rights reserved.

//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }


import React from "react";
// Optional: If you prefer using React icons instead of Font Awesome's <i> tags
// import { FaTwitter, FaFacebookSquare, FaDribbble, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-800 pt-12 pb-6 text-white">
        <div className="container mx-auto px-4">
          {/* Main Flex Container for Columns */}
          <div className="flex flex-wrap text-left lg:text-left -mx-4"> {/* Use negative margin for gutter */}

            {/* Section 1: Company Info & Social */}
            {/* Takes 4/12 width on large screens */}
            <div className="w-full lg:w-4/12 px-4 mb-8 lg:mb-0">
              {/* Content within the first column */}
              <div>
                <h4 className="text-3xl font-semibold mb-2">DreamNifty</h4> {/* Reduced bottom margin */}
                <p className="text-base mt-0 mb-4 text-blueGray-300">
                  Empowering traders with cutting-edge tools and insights for smarter investment decisions.
                </p>
              </div>
              {/* Follow Us section, still within the first column */}
              <div className="mt-4"> {/* Added margin-top */}
                 <h5 className="text-lg font-semibold mb-2 text-blueGray-200">Follow Us</h5>
                 <div className="flex space-x-2">
                  {/* Social Buttons */}
                  <a href="#twitter" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none transition-transform hover:scale-110">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none transition-transform hover:scale-110">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                  <a href="#dribbble" aria-label="Dribbble" target="_blank" rel="noopener noreferrer" className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none transition-transform hover:scale-110">
                    <i className="fab fa-dribbble"></i>
                  </a>
                  <a href="#github" aria-label="Github" target="_blank" rel="noopener noreferrer" className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none transition-transform hover:scale-110">
                    <i className="fab fa-github"></i>
                  </a>
                 </div>
              </div>
            </div> {/* End of Section 1 Column */}


            {/* Section 2 & 3 Wrapper: Takes 6/12 width on large screens */}
            <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0">
               {/* Flex container for the two link sub-columns */}
              <div className="flex flex-wrap items-start"> {/* Changed to items-start */}

                {/* Sub-Column 2a: Useful Links */}
                {/* Takes half (6/12) of the parent 6/12 width */}
                <div className="w-full md:w-6/12 px-0 md:px-4 mb-8 md:mb-0">
                  <span className="block uppercase text-blueGray-400 text-sm font-semibold mb-3">
                    Useful Links
                  </span>
                  <ul className="list-unstyled space-y-2 text-blueGray-200">
                     <li><a className="hover:text-white font-medium block text-sm" href="#about">About Us</a></li>
                     <li><a className="hover:text-white font-medium block text-sm" href="#events">Events</a></li>
                     <li><a className="hover:text-white font-medium block text-sm" href="#blog">Blog</a></li>
                     <li><a className="hover:text-white font-medium block text-sm" href="#pricing">Pricing</a></li>
                     <li><a className="hover:text-white font-medium block text-sm" href="#careers">Careers</a></li>
                  </ul>
                </div>

                {/* Sub-Column 2b: Legal & Resources */}
                 {/* Takes half (6/12) of the parent 6/12 width */}
                <div className="w-full md:w-6/12 px-0 md:px-4">
                  <span className="block uppercase text-blueGray-400 text-sm font-semibold mb-3">
                    Legal & Resources
                  </span>
                  <ul className="list-unstyled space-y-2 text-blueGray-200">
                    <li><a className="hover:text-white font-medium block text-sm" href="#terms">Terms & Conditions</a></li>
                    <li><a className="hover:text-white font-medium block text-sm" href="#privacy">Privacy Policy</a></li>
                    <li><a className="hover:text-white font-medium block text-sm" href="#contact">Contact Us</a></li>
                    <li><a className="hover:text-white font-medium block text-sm" href="#faq">FAQ</a></li>
                    <li><a className="hover:text-white font-medium block text-sm" href="#risk-disclosure">Risk Disclosure</a></li>
                  </ul>
                </div>
              </div>
            </div> {/* End of Section 2 & 3 Wrapper */}


            {/* Section 4: Contact Info */}
            {/* Takes 2/12 width on large screens */}
            <div className="w-full lg:w-2/12 px-4 mb-8 lg:mb-0">
               <span className="block uppercase text-blueGray-400 text-sm font-semibold mb-3">
                 Contact
               </span>
               <ul className="list-unstyled space-y-2 text-blueGray-200">
                 <li className="flex items-start">
                    <i className="fas fa-map-marker-alt mr-2 mt-1 text-blueGray-400 text-sm flex-shrink-0"></i> {/* Added flex-shrink-0 */}
                    <span className="text-sm">123 Trading St, Suite 456<br/>Finance City, FC 78901</span>
                 </li>
                 <li className="flex items-center">
                    <i className="fas fa-phone-alt mr-2 text-blueGray-400 text-sm flex-shrink-0"></i> {/* Added flex-shrink-0 */}
                    <a href="tel:+1234567890" className="hover:text-white text-sm">+1 (234) 567-890</a>
                 </li>
                 <li className="flex items-center">
                    <i className="fas fa-envelope mr-2 text-blueGray-400 text-sm flex-shrink-0"></i> {/* Added flex-shrink-0 */}
                    <a href="mailto:support@dreamnifty.com" className="hover:text-white text-sm">support@dreamnifty.com</a>
                 </li>
               </ul>
            </div> {/* End of Section 4 Column */}

          </div> {/* End of Main Flex Container */}

          {/* Copyright Section */}
          <hr className="my-6 border-blueGray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-400 font-medium py-1">
                © {new Date().getFullYear()} Praedico Global Research Pvt Ltd. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}