import React from "react";
import StockMarket from "../../assets/stock-market.jpg";
import { FaChartLine, FaBookOpen, FaTools, FaUsers, FaShieldAlt, FaRocket, FaCogs, FaHandHoldingUsd } from "react-icons/fa";

const AboutPage = () => {
  return (
    <>
      {/* About Us Section */}
      <div className="mt-6 !py-20 !mb-2 flex flex-col md:flex-row items-center justify-center px-6">
        {/* Left - Content */}
        <div className="text-black md:w-1/2 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blueGray-800">
            About Us
          </h1>
          <p className="text-lg leading-relaxed opacity-80">
            This project was created to empower individuals to make informed
            investment decisions and navigate the complexities of the stock
            market with confidence.
          </p>
          <p className="text-lg leading-relaxed opacity-80 mt-4">
            Our mission is to democratize access to financial information and
            provide tools and resources that enable investors of all levels to
            succeed in their financial goals.
          </p>
          <p className="text-lg leading-relaxed opacity-80 mt-4">
            This project offers{" "}
            <span className="text-blueGray-500 font-semibold">
              Comprehensive Market Analysis
            </span>
            ,{" "}
            <span className="text-blueGray-500 font-semibold">
              Educational Resources
            </span>
            ,{" "}
            <span className="text-blueGray-500 font-semibold">
              Powerful Tools
            </span>
            , and{" "}
            <span className="text-blueGray-500 font-semibold">
              Community Support
            </span>
            .
          </p>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2 px-6 !mt-20 md:mt-0">
          <img
            src={StockMarket}
            alt="Stock Market"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* 🌟 Feature Cards Section */}
      <div className="bg-gray-100 !pt-4 !mt-0 !pb-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-blueGray-800">
          What We Offer
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <FeatureCard icon={<FaChartLine />} title="Market Analysis" color="text-blue-500" description="Stay informed with real-time data and expert insights on market trends." />
          <FeatureCard icon={<FaBookOpen />} title="Learning Resources" color="text-green-500" description="Explore articles, tutorials, and guides to grow your financial knowledge." />
          <FeatureCard icon={<FaTools />} title="Powerful Tools" color="text-purple-500" description="Use our tools to track stocks, analyze investments, and manage portfolios." />
          <FeatureCard icon={<FaUsers />} title="Community Support" color="text-pink-500" description="Connect with other traders and share knowledge through discussions and support." />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-blueGray-800">
          Why Choose Us?
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <FeatureCard icon={<FaShieldAlt />} title="Reliable Data" color="text-blue-600" description="We source accurate and timely financial data." />
          <FeatureCard icon={<FaRocket />} title="Fast & Responsive" color="text-red-500" description="Optimized performance ensures a seamless experience." />
          <FeatureCard icon={<FaCogs />} title="Customizable Tools" color="text-yellow-500" description="Tailor features and insights to your personal strategy." />
          <FeatureCard icon={<FaHandHoldingUsd />} title="Financial Empowerment" color="text-green-600" description="We believe in creating wealth through smart decisions." />
        </div>
      </div>

      {/* Testimonial / Quote Section */}
      <div className="bg-blue-50 py-16 px-6 text-center">
        <p className="text-xl italic text-gray-700 max-w-3xl mx-auto">
          "In investing, what is comfortable is rarely profitable. Our platform is designed to help you step beyond comfort and into confidence."
        </p>
        <p className="mt-4 font-semibold text-blueGray-600">— The StockSphere Team</p>
      </div>

      {/* Call to Action */}
      {/* <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-12 text-center px-6">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Investing Smarter?</h3>
        <p className="mb-6 text-lg">Join thousands of users who trust StockSphere to guide their investment journey.</p>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get Started Now
        </a>
      </div> */}
    </>
  );
};

// ✅ Reusable Feature Card component
const FeatureCard = ({ icon, title, color, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all text-center">
    <div className={`text-4xl ${color} mx-auto mb-4`}>{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default AboutPage;
