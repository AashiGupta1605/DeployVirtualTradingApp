
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
      className="snap-y snap-mandatary overflow-y-scroll h-screen relative w-full hide-scrollbar" // Removed h-screen
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

    

      {/* --- END OF MOVED FOOTER --- */}


      {/* ScrollToTopButton remains relative to the main scrolling div */}
       {/* <ScrollToTopButton scrollContainerRef={scrollContainerRef} /> */}
       {/* Note: ScrollToTopButton might need its positioning adjusted (e.g., fixed, bottom-x, right-x)
           and potentially passed the scrollContainerRef to monitor scroll position correctly */}

    </motion.div> // End of main scrolling div
  );
};

export default MainHomePage;



