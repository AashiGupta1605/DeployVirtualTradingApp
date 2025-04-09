import React, { useEffect } from "react";
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
  FiGithub
} from "react-icons/fi";

import HomeCarousel from "../../components/GuestUser/Home/HomeCarousel";
import OrganizationsSlider from "../../components/GuestUser/Home/OrganizationsData/OrganizationsSlider";
import InfoCards from "../../components/GuestUser/Home/InfoCards";
import UserFeedbackCards from "../../components/GuestUser/Home/FeedbackData/UsersFeedbacks/UserFeedbackCards";
import OrganizationFeedbackCards from "../../components/GuestUser/Home/FeedbackData/OrganizationsFeedbacks/OrganizationFeedbackCards";
import Stock from "../../assets/stock.jpg";

const MainHomePage = () => {
  // Animation controls for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [partnersRef, partnersInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.8, triggerOnce: true });
  const [orgFeedbackRef, orgFeedbackInView] = useInView({ threshold: 0.8, triggerOnce: true });

  const controls = useAnimation();

  useEffect(() => {
    if (heroInView) {
      controls.start("visible");
    }
  }, [controls, heroInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
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
        mass: 0.5
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const features = [
    {
      icon: <FiTrendingUp className="w-7 h-7" />,
      title: "Real-time Data",
      description: "Get up-to-the-minute stock market data and trends"
    },
    {
      icon: <FiBarChart2 className="w-7 h-7" />,
      title: "Advanced Analytics",
      description: "Comprehensive tools for market analysis"
    },
    {
      icon: <FiDollarSign className="w-7 h-7" />,
      title: "Virtual Trading",
      description: "Practice with virtual money risk-free"
    },
    {
      icon: <FiClock className="w-7 h-7" />,
      title: "24/7 Access",
      description: "Access your portfolio anytime, anywhere"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="snap-y snap-mandatory h-screen overflow-y-scroll"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="snap-start -mt-32 h-screen w-full relative bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center h-full flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
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
          </motion.div>
        </div>
        
        {/* Carousel Section */}
        <div className="absolute bottom-0 -mt-4 w-full h-1/2">
          <HomeCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="snap-start h-screen w-full flex items-center justify-center bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl mt-10 md:text-4xl font-bold text-gray-900 mb-4">
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
        <div className="max-w-7xl mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col lg:flex-row items-center gap-10"
          >
            <motion.div 
              className="lg:w-1/2"
              variants={slideInFromLeft}
            >
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <motion.img
                  src={Stock}
                  alt="Stock Market Analytics"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              variants={slideInFromRight}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Track Stock Trends in <span className="text-lightBlue-600">Real Time</span>
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
                Stay ahead of the market with our cutting-edge platform that provides real-time stock data, comprehensive analytics, and virtual trading capabilities.
              </motion.p>
              
              <motion.div 
                variants={containerVariants}
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
                    variants={itemVariants}
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
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                  <Link to="/about">
                    <motion.button 
                      whileHover={{ 
                        boxShadow: "0 8px 20px -5px rgba(59, 130, 246, 0.4)",
                        transition: { duration: 0.3 }
                      }}
                      className="bg-lightBlue-600 text-white font-semibold px-7 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center group"
                    >
                      Learn More
                      <motion.span
                        animate={{ x: 0 }}
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
        ref={partnersRef}
        className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div 
              variants={fadeInUp}
            >
              <h2 className="text-3xl mt-24 md:text-4xl font-bold text-gray-900 mb-4">
                Our Platform <span className="text-lightBlue-600">Statistics</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trusted by thousands of traders worldwide
              </p>
            </motion.div>
            
            <InfoCards />
          </motion.div>
        </div>
      </section>

      {/* Partnered Organizations Section */}
      <section
        ref={testimonialsRef}
        className="snap-start h-screen w-full flex items-center justify-center bg-white"
      >
        <div className="max-w-7xl mt-48 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12 px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Trusted <span className="text-lightBlue-600">Partners</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl -mb-8 mx-auto">
                Collaborating with industry leaders to provide the best trading experience
              </p>
            </motion.div>

            <OrganizationsSlider />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={orgFeedbackRef}
        className="snap-start h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-lightBlue-50"
      >
        <div className="max-w-7xl mt-48 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial="hidden"
            animate={orgFeedbackInView ? "visible" : "hidden"}
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
      <section className="snap-start h-screen w-full flex items-center justify-center bg-white">
        <div className="max-w-7xl mt-50 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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

      {/* Footer Section */}
      <footer className="relative mt-16 bg-blueGray-800 pt-20 pb-6">
        <div className="bottom-0 top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            {/* Left Section: Keep in Touch */}
            <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0">
              <h4 className="text-3xl font-semibold text-white">Let's Keep in Touch!</h4>
              <p className="text-lg mt-0 mb-2 text-blueGray-300">
                We're here to help and answer any questions you might have.
              </p>
              <div className="mt-6 lg:mb-0 mb-6 flex justify-center lg:justify-start space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ y: -2 }}
                  className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
                >
                  <FiTwitter className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -2 }}
                  className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
                >
                  <FiFacebook className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -2 }}
                  className="bg-white text-pink-500 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
                >
                  <FiInstagram className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -2 }}
                  className="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none"
                >
                  <FiGithub className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Right Section: Quick Links */}
            <div className="w-full lg:w-4/12 px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-white">
                Quick Links
              </span>
              <ul className="list-unstyled text-blueGray-300">
                <motion.li whileHover={{ x: 5 }}>
                  <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#about">
                    About Us
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#services">
                    Services
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a className="text-white hover:text-blueGray-400 font-semibold block pb-2 text-sm" href="#contact">
                    Contact Us
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>
          <hr className="my-6 border-blueGray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()} Virtual Trading Platform. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default MainHomePage;