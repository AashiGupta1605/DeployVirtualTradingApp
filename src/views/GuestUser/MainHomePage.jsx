// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { 
//   FiArrowRight, 
//   FiTrendingUp, 
//   FiBarChart2, 
//   FiDollarSign, 
//   FiClock,
//   FiTwitter,
//   FiFacebook,
//   FiInstagram,
//   FiGithub
// } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa";

// import HomeCarousel from "../../components/GuestUser/Home/HomeCarousel";
// import OrganizationsSlider from "../../components/GuestUser/Home/OrganizationsData/OrganizationsSlider";
// import InfoCards from "../../components/GuestUser/Home/InfoCards";
// import UserFeedbackCards from "../../components/GuestUser/Home/FeedbackData/UsersFeedbacks/UserFeedbackCards";
// import OrganizationFeedbackCards from "../../components/GuestUser/Home/FeedbackData/OrganizationsFeedbacks/OrganizationFeedbackCards";
// import Stock from "../../assets/stock.jpg";
// import ScrollToTopButton from "../../components/Common/ScrollToTopButton";

// const MainHomePage = () => {
//   const scrollContainerRef = useRef();
//   // Animation controls for each section
//   const [heroRef, heroInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [featuresRef, featuresInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [statsRef, statsInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [partnersRef, partnersInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [orgFeedbackRef, orgFeedbackInView] = useInView({ threshold: 0.8, triggerOnce: true });

//   const controls = useAnimation();

//   useEffect(() => {
//     if (heroInView) {
//       controls.start("visible");
//     }
//   }, [controls, heroInView]);

//   // WhatsApp group link (replace with your actual WhatsApp group invite link)
//   // const whatsappGroupLink = "https://chat.whatsapp.com/GCNCQb6Ul4l5FRwlT5y3Tb";

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2,
//         ease: "easeOut"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         mass: 0.5
//       }
//     }
//   };

//   const fadeInUp = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.16, 1, 0.3, 1]
//       }
//     }
//   };

//   const slideInFromLeft = {
//     hidden: { x: -100, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.16, 1, 0.3, 1]
//       }
//     }
//   };

//   const slideInFromRight = {
//     hidden: { x: 100, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.16, 1, 0.3, 1]
//       }
//     }
//   };

//   const features = [
//     {
//       icon: <FiTrendingUp className="w-7 h-7" />,
//       title: "Real-time Data",
//       description: "Get up-to-the-minute stock market data and trends"
//     },
//     {
//       icon: <FiBarChart2 className="w-7 h-7" />,
//       title: "Advanced Analytics",
//       description: "Comprehensive tools for market analysis"
//     },
//     {
//       icon: <FiDollarSign className="w-7 h-7" />,
//       title: "Virtual Trading",
//       description: "Practice with virtual money risk-free"
//     },
//     {
//       icon: <FiClock className="w-7 h-7" />,
//       title: "24/7 Access",
//       description: "Access your portfolio anytime, anywhere"
//     }
//   ];

//   return (
//     <motion.div 
//     ref={scrollContainerRef}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="snap-y snap-mandatory h-screen overflow-y-scroll relative"
//     >
//       {/* WhatsApp Floating Button
//       <motion.a
//         href={whatsappGroupLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed right-6 bottom-6 z-50"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         transition={{ type: "spring", stiffness: 400, damping: 17 }}
//       >
//         <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
//           <FaWhatsapp className="w-8 h-8" />
//           <span className="sr-only">Join our WhatsApp group</span>
//         </div>
//       </motion.a> */}

//       {/* Hero Section */}
//       <section ref={heroRef} className="snap-start -mt-32 h-screen w-full relative bg-gradient-to-b from-blue-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center h-full flex flex-col justify-center">
//           <motion.h1 
//             initial={{ opacity: 0, y: 50 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
//           >
//             Master Virtual Trading with Confidence
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
//           >
//             Practice trading with real market data and no financial risk. Perfect for beginners and experts alike.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="flex flex-col sm:flex-row justify-center gap-4"
//           >
//           </motion.div>
//         </div>
        
//         {/* Carousel Section */}
//         <div className="absolute bottom-0 -mt-4 w-full h-1/2">
//           <HomeCarousel />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section 
//         ref={featuresRef}
//         className="snap-start h-screen w-full flex items-center justify-center bg-gray-50"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={featuresInView ? "visible" : "hidden"}
//             variants={containerVariants}
//             className="text-center mb-16"
//           >
//             <motion.h2 variants={fadeInUp} className="text-3xl mt-10 md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose <span className="text-lightBlue-600">Our Platform?</span>
//             </motion.h2>
//             <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We provide the tools and insights you need to succeed in today's dynamic markets
//             </motion.p>
//           </motion.div>
          
//           <motion.div 
//             initial="hidden"
//             animate={featuresInView ? "visible" : "hidden"}
//             variants={containerVariants}
//             className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
//           >
//             {features.map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ 
//                   y: -8,
//                   transition: { 
//                     type: "spring",
//                     stiffness: 300
//                   } 
//                 }}
//                 className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-lightBlue-100"
//               >
//                 <motion.div 
//                   className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-lightBlue-50 text-lightBlue-600 mx-auto"
//                   whileHover={{
//                     scale: 1.1,
//                     rotate: [0, 5, -5, 0],
//                     transition: { duration: 0.6 }
//                   }}
//                 >
//                   {feature.icon}
//                 </motion.div>
//                 <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 text-center">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Stock Market Section */}
//       <section 
//         ref={statsRef}
//         className="snap-start h-screen w-full flex items-center justify-center bg-white"
//       >
//         <div className="max-w-7xl mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={statsInView ? "visible" : "hidden"}
//             variants={containerVariants}
//             className="flex flex-col lg:flex-row items-center gap-10"
//           >
//             <motion.div 
//               className="lg:w-1/2"
//               variants={slideInFromLeft}
//             >
//               <div className="relative group overflow-hidden rounded-2xl shadow-xl">
//                 <motion.img
//                   src={Stock}
//                   alt="Stock Market Analytics"
//                   className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
//                   initial={{ scale: 1 }}
//                   whileHover={{ scale: 1.05 }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>
//             </motion.div>

//             <motion.div 
//               className="lg:w-1/2"
//               variants={slideInFromRight}
//             >
//               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Track Stock Trends in <span className="text-lightBlue-600">Real Time</span>
//               </motion.h2>
              
//               <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
//                 Stay ahead of the market with our cutting-edge platform that provides real-time stock data, comprehensive analytics, and virtual trading capabilities.
//               </motion.p>
              
//               <motion.div 
//                 variants={containerVariants}
//                 className="space-y-4 mb-8"
//               >
//                 {[
//                   "Real-time market data with minimal latency",
//                   "Advanced charting and technical analysis tools",
//                   "Risk-free virtual trading environment",
//                   "Personalized portfolio tracking",
//                   "Educational resources for all skill levels"
//                 ].map((item, index) => (
//                   <motion.div 
//                     key={index}
//                     className="flex items-start"
//                     variants={itemVariants}
//                     whileHover={{ 
//                       x: 5,
//                       transition: { type: "spring", stiffness: 300 }
//                     }}
//                   >
//                     <motion.div 
//                       className="flex-shrink-0 mt-1"
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <div className="flex items-center justify-center h-6 w-6 rounded-full bg-lightBlue-100 text-lightBlue-600">
//                         <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     </motion.div>
//                     <p className="ml-3 text-base text-gray-700">
//                       {item}
//                     </p>
//                   </motion.div>
//                 ))}
//               </motion.div>

//               <motion.div
//                 variants={fadeInUp}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                   <Link to="/about">
//                     <motion.button 
//                       whileHover={{ 
//                         boxShadow: "0 8px 20px -5px rgba(59, 130, 246, 0.4)",
//                         transition: { duration: 0.3 }
//                       }}
//                       className="bg-lightBlue-600 text-white font-semibold px-7 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center group"
//                     >
//                       Learn More
//                       <motion.span
//                         animate={{ x: 0 }}
//                         whileHover={{ x: 5 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       >
//                         <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//                       </motion.span>
//                     </motion.button>
//                   </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Info Cards Section */}
//       <section
//         ref={partnersRef}
//         className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={partnersInView ? "visible" : "hidden"}
//             variants={containerVariants}
//           >
// <motion.div 
//   variants={fadeInUp}
//   className="text-center"
// >
//   <h2 className="text-3xl mt-24 md:text-4xl font-bold text-gray-900 mb-4">
//     Our Platform <span className="text-lightBlue-600">Statistics</span>
//   </h2>
//   <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//     Trusted by thousands of traders worldwide
//   </p>
// </motion.div>
            
//             <InfoCards />
//           </motion.div>
//         </div>
//       </section>

//       {/* Partnered Organizations Section */}
//       <section
//         ref={testimonialsRef}
//         className="snap-start h-screen w-full flex items-center justify-center bg-white"
//       >
//         <div className="max-w-7xl mt-48 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={testimonialsInView ? "visible" : "hidden"}
//             variants={containerVariants}
//           >
// <motion.div 
//   variants={fadeInUp}
//   className="text-center mb-12 px-4"
// >
//   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//     Our Happy <span className="text-lightBlue-600">Clients</span>
//   </h2>
//   <p className="text-lg text-gray-600 max-w-2xl -mb-8 mx-auto">
//     Trusted by businesses worldwide for our exceptional services
//   </p>
// </motion.div>

//             <OrganizationsSlider />
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section
//         ref={orgFeedbackRef}
//         className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
//       >
//         <div className="max-w-7xl mt-48 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={orgFeedbackInView ? "visible" : "hidden"}
//             variants={containerVariants}
//           >
//             <motion.div 
//               variants={fadeInUp}
//               className="text-center mb-12 px-4"
//             >
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 What Our <span className="text-lightBlue-600">Users Say</span>
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Hear from traders who've improved their skills with our platform
//               </p>
//             </motion.div>

//             <UserFeedbackCards />
//           </motion.div>
//         </div>
//       </section>

//       {/* Organization Feedback Section */}
//       <section className="snap-start h-screen w-full flex items-center justify-center bg-white">
//         <div className="max-w-7xl mt-50 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             variants={containerVariants}
//           >
//             <motion.div 
//               variants={fadeInUp}
//               className="text-center mb-8 px-4"
//             >
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Partner <span className="text-lightBlue-600">Testimonials</span>
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 See what our partner organizations have to say about us
//               </p>
//             </motion.div>

//             <OrganizationFeedbackCards />
//           </motion.div>
//         </div>
//       </section>

      
//       <footer className="relative mt-16 bg-blueGray-800 pt-20 pb-6">
//         <div className="bottom-0 top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>
//           <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
//             <polygon className="text-blueGray-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
//           </svg>
//         </div>
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap text-center lg:text-left">
//             <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0">
//               <h4 className="text-3xl font-semibold text-white">Let's Keep in Touch!</h4>
//               <p className="text-lg mt-0 mb-2 text-blueGray-300">
//                 We're here to help and answer any questions you might have.
//               </p>
//               <div className="mt-6 lg:mb-0 mb-6 flex justify-center lg:justify-start space-x-4">
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
//                 >
//                   <FiTwitter className="w-5 h-5" />
//                 </motion.a>
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
//                 >
//                   <FiFacebook className="w-5 h-5" />
//                 </motion.a>
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-pink-500 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
//                 >
//                   <FiInstagram className="w-5 h-5" />
//                 </motion.a>
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
//                 >
//                   <FiGithub className="w-5 h-5" />
//                 </motion.a>
//               </div>
//             </div>

//             <div className="w-full lg:w-4/12 px-4">
//               <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-white">
//                 Quick Links
//               </span>
//               <ul className="list-unstyled text-blueGray-300">
//                 <motion.li whileHover={{ x: 5 }}>
//                   <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#about">
//                     About Us
//                   </a>
//                 </motion.li>
//                 <motion.li whileHover={{ x: 5 }}>
//                   <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#services">
//                     Services
//                   </a>
//                 </motion.li>
//                 <motion.li whileHover={{ x: 5 }}>
//                   <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#contact">
//                     Contact Us
//                   </a>
//                 </motion.li>
//               </ul>
//             </div>
//           </div>
//           <hr className="my-6 border-blueGray-700" />
//           <div className="flex flex-wrap items-center md:justify-between justify-center">
//             <div className="w-full md:w-4/12 px-4 mx-auto text-center">
//               <div className="text-sm text-blueGray-500 font-semibold py-1">
//                 Copyright © {new Date().getFullYear()} Virtual Trading Platform. All rights reserved.
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//       <ScrollToTopButton />
//     </motion.div>
//   );
// };

// export default MainHomePage;









// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { 
//   FiArrowRight, 
//   FiTrendingUp, 
//   FiBarChart2, 
//   FiDollarSign, 
//   FiClock,
//   FiTwitter,
//   FiFacebook,
//   FiInstagram,
//   FiGithub
// } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa"; // Kept as per original code

// import HomeCarousel from "../../components/GuestUser/Home/HomeCarousel";
// import OrganizationsSlider from "../../components/GuestUser/Home/OrganizationsData/OrganizationsSlider";
// import InfoCards from "../../components/GuestUser/Home/InfoCards";
// import UserFeedbackCards from "../../components/GuestUser/Home/FeedbackData/UsersFeedbacks/UserFeedbackCards";
// import OrganizationFeedbackCards from "../../components/GuestUser/Home/FeedbackData/OrganizationsFeedbacks/OrganizationFeedbackCards";
// import Stock from "../../assets/stock.jpg";
// import ScrollToTopButton from "../../components/Common/ScrollToTopButton";

// const MainHomePage = () => {
//   const scrollContainerRef = useRef();
//   // Animation controls for each section
//   // Using original thresholds and refs
//   const [heroRef, heroInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [featuresRef, featuresInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [statsRef, statsInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [partnersRef, partnersInView] = useInView({ threshold: 0.8, triggerOnce: true });
//   const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.8, triggerOnce: true }); // Corresponds to Org Slider
//   const [userFeedbackRef, userFeedbackInView] = useInView({ threshold: 0.8, triggerOnce: true }); // Added ref for user feedback section consistency
//   const [orgFeedbackRef, orgFeedbackInView] = useInView({ threshold: 0.8, triggerOnce: true });

//   // Keeping original controls logic even if redundant with direct useInView animate prop


//   const [shouldRefetch, setShouldRefetch] = useState(false);
//   useEffect(() => {
//     if (partnersInView) {
//       setShouldRefetch(true);
//     } 
//     else {
//       setShouldRefetch(false);
//     }
//   }, [partnersInView]);

//   const controls = useAnimation();
//   useEffect(() => {
//     if (heroInView) {
//       controls.start("visible");
//     }
//     // You might want similar effects for other sections if needed,
//     // but the current implementation only triggers based on heroInView.
//     // The useInView hook is still used below directly on elements.
//   }, [controls, heroInView]);


//   // WhatsApp group link (replace with your actual WhatsApp group invite link)
//   // const whatsappGroupLink = "https://chat.whatsapp.com/GCNCQb6Ul4l5FRwlT5y3Tb"; // Keep commented as original

//   // Animation variants (original)
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2,
//         ease: "easeOut"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         mass: 0.5
//       }
//     }
//   };

//   const fadeInUp = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.16, 1, 0.3, 1]
//       }
//     }
//   };

//   const slideInFromLeft = {
//     hidden: { x: -100, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.16, 1, 0.3, 1]
//       }
//     }
//   };

//   const slideInFromRight = {
//     hidden: { x: 100, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.16, 1, 0.3, 1]
//       }
//     }
//   };

//   const features = [
//     {
//       icon: <FiTrendingUp className="w-7 h-7" />,
//       title: "Real-time Data",
//       description: "Get up-to-the-minute stock market data and trends"
//     },
//     {
//       icon: <FiBarChart2 className="w-7 h-7" />,
//       title: "Advanced Analytics",
//       description: "Comprehensive tools for market analysis"
//     },
//     {
//       icon: <FiDollarSign className="w-7 h-7" />,
//       title: "Virtual Trading",
//       description: "Practice with virtual money risk-free"
//     },
//     {
//       icon: <FiClock className="w-7 h-7" />,
//       title: "24/7 Access",
//       description: "Access your portfolio anytime, anywhere"
//     }
//   ];

//   return (
//     // --- NO CHANGE TO THIS DIV'S CLASSES ---
//     <motion.div 
//       ref={scrollContainerRef}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="snap-y snap-mandatory h-screen overflow-y-scroll relative"
//     >
//       {/* WhatsApp Floating Button (original commented state) */}
//       {/* ... */}

//       {/* --- SECTIONS REMAIN AS THEY WERE --- */}

//       {/* Hero Section */}
//       <section ref={heroRef} className="snap-start -mt-32 h-screen w-full relative bg-gradient-to-b from-blue-50 to-white">
//          {/* Content as original */}
//          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center h-full flex flex-col justify-center">
//           <motion.h1 
//             initial={{ opacity: 0, y: 50 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}} // Use inView directly
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
//           >
//             Master Virtual Trading with Confidence
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
//           >
//             Practice trading with real market data and no financial risk. Perfect for beginners and experts alike.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="flex flex-col sm:flex-row justify-center gap-4"
//           >
//             {/* Buttons would go here if any */}
//           </motion.div>
//         </div>
//         <div className="absolute bottom-0 -mt-4 w-full h-1/2">
//           <HomeCarousel />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section 
//         ref={featuresRef}
//         className="snap-start h-screen w-full flex items-center justify-center bg-gray-50"
//       >
//          {/* Content as original */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={featuresInView ? "visible" : "hidden"} // Use inView directly
//             variants={containerVariants}
//             className="text-center mb-16"
//           >
//             <motion.h2 variants={fadeInUp} className="text-3xl mt-10 md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose <span className="text-lightBlue-600">Our Platform?</span>
//             </motion.h2>
//             <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We provide the tools and insights you need to succeed in today's dynamic markets
//             </motion.p>
//           </motion.div>
          
//           <motion.div 
//             initial="hidden"
//             animate={featuresInView ? "visible" : "hidden"}
//             variants={containerVariants}
//             className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
//           >
//             {features.map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ 
//                   y: -8,
//                   transition: { 
//                     type: "spring",
//                     stiffness: 300
//                   } 
//                 }}
//                 className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-lightBlue-100"
//               >
//                 <motion.div 
//                   className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-lightBlue-50 text-lightBlue-600 mx-auto"
//                   whileHover={{
//                     scale: 1.1,
//                     rotate: [0, 5, -5, 0],
//                     transition: { duration: 0.6 }
//                   }}
//                 >
//                   {feature.icon}
//                 </motion.div>
//                 <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 text-center">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Stock Market Section */}
//       <section 
//         ref={statsRef}
//         className="snap-start h-screen w-full flex items-center justify-center bg-white"
//       >
//          {/* Content as original */}
//         <div className="max-w-7xl mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={statsInView ? "visible" : "hidden"} // Use inView directly
//             // Removed containerVariants from here to allow individual child animation below
//             className="flex flex-col lg:flex-row items-center gap-10"
//           >
//             <motion.div 
//               className="lg:w-1/2"
//               initial="hidden" // Animate individually
//               animate={statsInView ? "visible" : "hidden"}
//               variants={slideInFromLeft}
//             >
//               <div className="relative group overflow-hidden rounded-2xl shadow-xl">
//                 <motion.img
//                   src={Stock}
//                   alt="Stock Market Analytics"
//                   className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
//                   initial={{ scale: 1 }} // Keep initial scale if desired
//                   whileHover={{ scale: 1.05 }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>
//             </motion.div>

//             <motion.div 
//               className="lg:w-1/2"
//               initial="hidden" // Animate individually
//               animate={statsInView ? "visible" : "hidden"}
//               // Variants applied to children below
//             >
//               <motion.h2 variants={fadeInUp} animate={statsInView ? "visible" : "hidden"} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Track Stock Trends in <span className="text-lightBlue-600">Real Time</span>
//               </motion.h2>
              
//               <motion.p variants={fadeInUp} animate={statsInView ? "visible" : "hidden"} transition={{delay: 0.1}} className="text-lg text-gray-600 mb-8">
//                 Stay ahead of the market with our cutting-edge platform that provides real-time stock data, comprehensive analytics, and virtual trading capabilities.
//               </motion.p>
              
//               <motion.div 
//                 variants={containerVariants} // Use container variants for staggering list
//                 initial="hidden"
//                 animate={statsInView ? "visible" : "hidden"}
//                 className="space-y-4 mb-8"
//               >
//                 {[
//                   "Real-time market data with minimal latency",
//                   "Advanced charting and technical analysis tools",
//                   "Risk-free virtual trading environment",
//                   "Personalized portfolio tracking",
//                   "Educational resources for all skill levels"
//                 ].map((item, index) => (
//                   <motion.div 
//                     key={index}
//                     className="flex items-start"
//                     variants={itemVariants} // Individual item variant
//                     whileHover={{ 
//                       x: 5,
//                       transition: { type: "spring", stiffness: 300 }
//                     }}
//                   >
//                     <motion.div 
//                       className="flex-shrink-0 mt-1"
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <div className="flex items-center justify-center h-6 w-6 rounded-full bg-lightBlue-100 text-lightBlue-600">
//                         <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     </motion.div>
//                     <p className="ml-3 text-base text-gray-700">
//                       {item}
//                     </p>
//                   </motion.div>
//                 ))}
//               </motion.div>

//               <motion.div
//                 variants={fadeInUp} // Animate button
//                 animate={statsInView ? "visible" : "hidden"} 
//                 transition={{delay: 0.6}} // Delay after list
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                   <Link to="/about">
//                     <motion.button 
//                       whileHover={{ 
//                         boxShadow: "0 8px 20px -5px rgba(59, 130, 246, 0.4)",
//                         transition: { duration: 0.3 }
//                       }}
//                       className="bg-lightBlue-600 text-white font-semibold px-7 py-3 rounded-lg shadow-md hover:bg-lightBlue-700 transition-all duration-300 flex items-center group" // Added hover effect
//                     >
//                       Learn More
//                       <motion.span
//                         // Removed redundant animate, use parent's animate
//                         whileHover={{ x: 5 }}
//                         transition={{ type: "spring", stiffness: 500 }}
//                       >
//                         <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//                       </motion.span>
//                     </motion.button>
//                   </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Info Cards Section */}
//       <section
//         ref={partnersRef} // Original ref name
//         className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
//       >
//          {/* Content as original */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={partnersInView ? "visible" : "hidden"} // Use inView directly
//             variants={containerVariants}
//           >
//             <motion.div 
//               variants={fadeInUp}
//               className="text-center"
//             >
//               <h2 className="text-3xl mt-24 md:text-4xl font-bold text-gray-900 mb-4">
//                 Our Platform <span className="text-lightBlue-600">Statistics</span>
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Trusted by thousands of traders worldwide
//               </p>
//             </motion.div>
            
//               <div ref={partnersRef} tabIndex={0}>
//                 <InfoCards shouldRefetch={shouldRefetch} />
//               </div>
//             </motion.div>
//         </div>
//       </section>

//       {/* Partnered Organizations Section */}
//       <section
//         ref={testimonialsRef} // Original ref name (corresponds to Org Slider)
//         className="snap-start h-screen w-full flex items-center justify-center bg-white"
//       >
//         {/* Content as original */}
//         <div className="max-w-7xl mt-48 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={testimonialsInView ? "visible" : "hidden"} // Use inView directly
//             variants={containerVariants}
//           >
//             <motion.div 
//               variants={fadeInUp}
//               className="text-center mb-12 px-4"
//             >
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Our Happy <span className="text-lightBlue-600">Clients</span>
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl -mb-8 mx-auto">
//                 Trusted by businesses worldwide for our exceptional services
//               </p>
//             </motion.div>

//             <OrganizationsSlider />
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section (User Feedback) */}
//       <section
//         ref={userFeedbackRef} // Added ref for consistency
//         className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
//       >
//          {/* Content as original */}
//         <div className="max-w-7xl mt-48 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             animate={userFeedbackInView ? "visible" : "hidden"} // Use inView directly
//             variants={containerVariants}
//           >
//             <motion.div 
//               variants={fadeInUp}
//               className="text-center mb-12 px-4"
//             >
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 What Our <span className="text-lightBlue-600">Users Say</span>
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Hear from traders who've improved their skills with our platform
//               </p>
//             </motion.div>

//             <UserFeedbackCards />
//           </motion.div>
//         </div>
//       </section>

//       {/* Organization Feedback Section */}
//       {/* --- ENSURE THIS IS THE LAST SNAP SECTION --- */}
//       <section 
//         ref={orgFeedbackRef} // Use correct ref
//         className="snap-start h-screen w-full flex items-center justify-center bg-white"
//       >
//          {/* Content as original */}
//         <div className="max-w-7xl mt-50 mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div 
//             initial="hidden"
//             // whileInView="visible" // Using animate prop with useInView state is more consistent
//             animate={orgFeedbackInView ? "visible" : "hidden"} // Use inView directly
//             // viewport={{ once: true, margin: "-50px" }} // Viewport settings belong on useInView hook if needed
//             variants={containerVariants}
//           >
//             <motion.div 
//               variants={fadeInUp}
//               className="text-center mb-8 px-4"
//             >
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Partner <span className="text-lightBlue-600">Testimonials</span>
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 See what our partner organizations have to say about us
//               </p>
//             </motion.div>

//             <OrganizationFeedbackCards />
//           </motion.div>
//         </div>
//       </section>

//       {/* --- FOOTER MOVED INSIDE THE MAIN SCROLLING DIV --- */}
//       {/* It should NOT have snap-start */}
//       <footer className="bg-blueGray-800 pt-20 pb-6 relative"> 
//         <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>
//           <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
//             <polygon className="text-blueGray-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
//           </svg>
//         </div>
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap text-center lg:text-left">
//             <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0">
//               <h4 className="text-3xl font-semibold text-white">Let's Keep in Touch!</h4>
//               <p className="text-lg mt-0 mb-2 text-blueGray-300">
//                 We're here to help and answer any questions you might have.
//               </p>
//               <div className="mt-6 lg:mb-0 mb-6 flex justify-center lg:justify-start space-x-4">
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out" // Added transition
//                 >
//                   <FiTwitter className="w-5 h-5" />
//                 </motion.a>
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out" // Added transition
//                 >
//                   <FiFacebook className="w-5 h-5" />
//                 </motion.a>
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-pink-500 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out" // Added transition
//                 >
//                   <FiInstagram className="w-5 h-5" />
//                 </motion.a>
//                 <motion.a 
//                   href="#" 
//                   whileHover={{ y: -2 }}
//                   className="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out" // Added transition
//                 >
//                   <FiGithub className="w-5 h-5" />
//                 </motion.a>
//               </div>
//             </div>

//             <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0"> 
//               <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-white">
//                 Quick Links
//               </span>
//               <ul className="list-unstyled text-blueGray-300">
//                 <motion.li whileHover={{ x: 5 }} className="py-1"> 
//                   <a className="text-white hover:text-blueGray-400 font-semibold block text-sm transition-colors duration-150" href="#about"> 
//                     About Us
//                   </a>
//                 </motion.li>
//                 <motion.li whileHover={{ x: 5 }} className="py-1">
//                   <a className="text-white hover:text-blueGray-400 font-semibold block text-sm transition-colors duration-150" href="#services"> 
//                     Services
//                   </a>
//                 </motion.li>
//                 <motion.li whileHover={{ x: 5 }} className="py-1">
//                   <a className="text-white hover:text-blueGray-400 font-semibold block text-sm transition-colors duration-150" href="#contact"> 
//                     Contact Us
//                   </a>
//                 </motion.li>
//               </ul>
//             </div>
//           </div>
//           <hr className="my-6 border-blueGray-700" />
//           <div className="flex flex-wrap items-center md:justify-between justify-center">
//             <div className="w-full md:w-4/12 px-4 mx-auto text-center">
//               <div className="text-sm text-blueGray-500 font-semibold py-1">
//                 Copyright © {new Date().getFullYear()} Virtual Trading Platform. All rights reserved.
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//       {/* --- END OF MOVED FOOTER --- */}


//       {/* ScrollToTopButton remains outside footer, still relative to the main div */}
//       {/* <ScrollToTopButton /> */}

//     </motion.div> // End of main scrolling div
//   );
// };

// export default MainHomePage;




// working

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiArrowRight,
  FiTrendingUp,
  FiBarChart2,
  FiDollarSign,
  FiClock,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiGithub,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"; // Kept as per original code

import HomeCarousel from "../../components/GuestUser/Home/HomeCarousel";
import OrganizationsSlider from "../../components/GuestUser/Home/OrganizationsData/OrganizationsSlider";
import InfoCards from "../../components/GuestUser/Home/InfoCards";
import UserFeedbackCards from "../../components/GuestUser/Home/FeedbackData/UsersFeedbacks/UserFeedbackCards";
import OrganizationFeedbackCards from "../../components/GuestUser/Home/FeedbackData/OrganizationsFeedbacks/OrganizationFeedbackCards";
import Stock from "../../assets/stock.jpg";
import Footer from "../../components/GuestUser/Footers/Footer";

const MainHomePage = () => {
  const scrollContainerRef = useRef();
  // Animation controls for each section
  // Using original thresholds and refs
  const [heroRef, heroInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [partnersRef, partnersInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.8, triggerOnce: true }); // Corresponds to Org Slider
  const [userFeedbackRef, userFeedbackInView] = useInView({ threshold: 0.8, triggerOnce: true }); // Added ref for user feedback section consistency
  const [orgFeedbackRef, orgFeedbackInView] = useInView({ threshold: 0.8, triggerOnce: true });

  const [shouldRefetch, setShouldRefetch] = useState(false);
  useEffect(() => {
    if (partnersInView) {
      setShouldRefetch(true);
    } else {
      setShouldRefetch(false);
    }
  }, [partnersInView]);

  // Removed redundant controls logic as useInView is used directly on elements
  // const controls = useAnimation();
  // useEffect(() => {
  //   if (heroInView) {
  //     controls.start("visible");
  //   }
  // }, [controls, heroInView]);


  // WhatsApp group link (replace with your actual WhatsApp group invite link)
  // const whatsappGroupLink = "https://chat.whatsapp.com/GCNCQb6Ul4l5FRwlT5y3Tb"; // Keep commented as original

  // Animation variants (original)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const features = [
    {
      icon: <FiTrendingUp className="w-7 h-7" />,
      title: "Real-time Data",
      description: "Get up-to-the-minute stock market data and trends",
    },
    {
      icon: <FiBarChart2 className="w-7 h-7" />,
      title: "Advanced Analytics",
      description: "Comprehensive tools for market analysis",
    },
    {
      icon: <FiDollarSign className="w-7 h-7" />,
      title: "Virtual Trading",
      description: "Practice with virtual money risk-free",
    },
    {
      icon: <FiClock className="w-7 h-7" />,
      title: "24/7 Access",
      description: "Access your portfolio anytime, anywhere",
    },
  ];

  return (
    // --- KEY CHANGE HERE: Removed h-screen ---
    // This allows the container to grow vertically to fit all content, including the footer.
    // Snapping still works for the child sections.
    <motion.div
      ref={scrollContainerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="snap-y snap-mandatary overflow-y-scroll h-screen relative w-full" // Removed h-screen
    >
     
            {/* Hero Section - RESTORED STRUCTURE */}
            <section ref={heroRef} className="snap-start w-full relative bg-gradient-to-b from-blue-50 to-white">
         {/* Content Container - Restored classes */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-42 pb-28 text-center h-full flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}} // Use inView directly
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Master Virtual Trading with Confidence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Practice trading with real market data and no financial risk. Perfect for beginners and experts alike.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            {/* Buttons would go here if any */}
          </motion.div>
        </div>
        {/* Carousel Container - Restored absolute positioning */}
        <div className="absolute bottom-0 -mt-4 w-full h-1/2">
          <HomeCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="snap-start h-screen w-full flex items-center justify-center bg-gray-50"
      >
         {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"} // Use inView directly
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl mt-34 md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-lightBlue-600">Our Platform?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the tools and insights you need to succeed in today's dynamic markets
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 300
                  }
                }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-lightBlue-100"
              >
                <motion.div
                  className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-lightBlue-50 text-lightBlue-600 mx-auto"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stock Market Section */}
      <section
        ref={statsRef}
        className="snap-start h-screen w-full flex items-center justify-center bg-white"
      >
         {/* Content */}
        <div className="max-w-7xl mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"} // Use inView directly
            className="flex flex-col lg:flex-row items-center gap-10"
          >
            <motion.div
              className="lg:w-1/2"
              initial="hidden" // Animate individually
              animate={statsInView ? "visible" : "hidden"}
              variants={slideInFromLeft}
            >
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <motion.img
                  src={Stock}
                  alt="Stock Market Analytics"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  initial={{ scale: 1 }} // Keep initial scale if desired
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial="hidden" // Animate individually
              animate={statsInView ? "visible" : "hidden"}
              // Variants applied to children below
            >
              <motion.h2 variants={fadeInUp} animate={statsInView ? "visible" : "hidden"} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Track Stock Trends in <span className="text-lightBlue-600">Real Time</span>
              </motion.h2>

              <motion.p variants={fadeInUp} animate={statsInView ? "visible" : "hidden"} transition={{delay: 0.1}} className="text-lg text-gray-600 mb-8">
                Stay ahead of the market with our cutting-edge platform that provides real-time stock data, comprehensive analytics, and virtual trading capabilities.
              </motion.p>

              <motion.div
                variants={containerVariants} // Use container variants for staggering list
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                className="space-y-4 mb-8"
              >
                {[
                  "Real-time market data with minimal latency",
                  "Advanced charting and technical analysis tools",
                  "Risk-free virtual trading environment",
                  "Personalized portfolio tracking",
                  "Educational resources for all skill levels"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    variants={itemVariants} // Individual item variant
                    whileHover={{
                      x: 5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <motion.div
                      className="flex-shrink-0 mt-1"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-lightBlue-100 text-lightBlue-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                    <p className="ml-3 text-base text-gray-700">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeInUp} // Animate button
                animate={statsInView ? "visible" : "hidden"}
                transition={{delay: 0.6}} // Delay after list
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                  <Link to="/about">
                    <motion.button
                      whileHover={{
                        boxShadow: "0 8px 20px -5px rgba(59, 130, 246, 0.4)",
                        transition: { duration: 0.3 }
                      }}
                      className="bg-lightBlue-600 text-white font-semibold px-7 py-3 rounded-lg shadow-md hover:bg-lightBlue-700 transition-all duration-300 flex items-center group" // Added hover effect
                    >
                      Learn More
                      <motion.span
                        // Removed redundant animate, use parent's animate
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    </motion.button>
                  </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section
        ref={partnersRef} // Original ref name
        className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
      >
         {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"} // Use inView directly
            variants={containerVariants}
          >
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <h2 className="text-3xl mt-24 md:text-4xl font-bold text-gray-900 mb-4">
                Our Platform <span className="text-lightBlue-600">Statistics</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"> {/* Added mb-8 for spacing */}
                Trusted by thousands of traders worldwide
              </p>
            </motion.div>

              {/* Ensure InfoCards fits within the section */}
              <div ref={partnersRef} tabIndex={0}>
                <InfoCards shouldRefetch={shouldRefetch} />
              </div>
            </motion.div>
        </div>
      </section>

      {/* Partnered Organizations Section */}
      <section
        ref={testimonialsRef} // Original ref name (corresponds to Org Slider)
        className="snap-start h-screen w-full flex items-center justify-center bg-white"
      >
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Reduced mt-48 */}
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"} // Use inView directly
            variants={containerVariants}
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-12 px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Happy <span className="text-lightBlue-600">Clients</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto"> {/* Removed -mb-8 */}
                Trusted by businesses worldwide for our exceptional services
              </p>
            </motion.div>

            <OrganizationsSlider />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section (User Feedback) */}
      <section
        ref={userFeedbackRef} // Added ref for consistency
        className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
      >
         {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Reduced mt-48 */}
          <motion.div
            initial="hidden"
            animate={userFeedbackInView ? "visible" : "hidden"} // Use inView directly
            variants={containerVariants}
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-12 px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-lightBlue-600">Users Say</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from traders who've improved their skills with our platform
              </p>
            </motion.div>

            <UserFeedbackCards />
          </motion.div>
        </div>
      </section>

      {/* Organization Feedback Section */}
      {/* --- This is the LAST snap section --- */}
      <section
        ref={orgFeedbackRef} // Use correct ref
        className="snap-start h-screen w-full flex items-center justify-center bg-white"
      >
         {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Reduced mt-50 */}
          <motion.div
            initial="hidden"
            animate={orgFeedbackInView ? "visible" : "hidden"} // Use inView directly
            variants={containerVariants}
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-8 px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Partner <span className="text-lightBlue-600">Testimonials</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what our partner organizations have to say about us
              </p>
            </motion.div>

            <OrganizationFeedbackCards />
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER IS NOW THE LAST ELEMENT INSIDE THE SCROLLING DIV --- */}
      {/* It does NOT have snap-start, so scrolling past the last section will reveal it */}
      {/* <footer className="bg-blueGray-800 pt-20 pb-6 relative w-full"> 
        <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0">
              <h4 className="text-3xl font-semibold text-white">Let's Keep in Touch!</h4>
              <p className="text-lg mt-0 mb-2 text-blueGray-300">
                We're here to help and answer any questions you might have.
              </p>
              <div className="mt-6 lg:mb-0 mb-6 flex justify-center lg:justify-start space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out"
                >
                  <FiTwitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out"
                >
                  <FiFacebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  className="bg-white text-pink-500 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out"
                >
                  <FiInstagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  className="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none transition-transform duration-150 ease-in-out"
                >
                  <FiGithub className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-white">
                Quick Links
              </span>
              <ul className="list-unstyled text-blueGray-300">
                <motion.li whileHover={{ x: 5 }} className="py-1">
                  <a className="text-white hover:text-blueGray-400 font-semibold block text-sm transition-colors duration-150" href="#about">
                    About Us
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="py-1">
                  <a className="text-white hover:text-blueGray-400 font-semibold block text-sm transition-colors duration-150" href="#services">
                    Services
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="py-1">
                  <a className="text-white hover:text-blueGray-400 font-semibold block text-sm transition-colors duration-150" href="#contact">
                    Contact Us
                  </a>
                </motion.li>
              </ul>
            </div>

          </div>
          <hr className="my-6 border-blueGray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-white">
                Copyright © {new Date().getFullYear()} Virtual Trading Platform. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/> 

      {/* --- END OF MOVED FOOTER --- */}


      {/* ScrollToTopButton remains relative to the main scrolling div */}
       {/* <ScrollToTopButton scrollContainerRef={scrollContainerRef} /> */}
       {/* Note: ScrollToTopButton might need its positioning adjusted (e.g., fixed, bottom-x, right-x)
           and potentially passed the scrollContainerRef to monitor scroll position correctly */}

    </motion.div> // End of main scrolling div
  );
};

export default MainHomePage;



