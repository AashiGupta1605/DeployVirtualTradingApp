import React from "react";
import StockMarket from "../../assets/stock-market.jpg";
import { FaChartLine, FaBookOpen, FaTools, FaUsers } from "react-icons/fa";

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
      <div className="bg-gray-100 !pt-4 !mt-0 !mb-25 !pb-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-blueGray-800">
          What We Offer
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all text-center">
            <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
            <p className="text-gray-600 text-sm">
              Stay informed with real-time data and expert insights on market trends.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all text-center">
            <FaBookOpen className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
            <p className="text-gray-600 text-sm">
              Explore articles, tutorials, and guides to grow your financial knowledge.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all text-center">
            <FaTools className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Powerful Tools</h3>
            <p className="text-gray-600 text-sm">
              Use our tools to track stocks, analyze investments, and manage portfolios.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all text-center">
            <FaUsers className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600 text-sm">
              Connect with other traders and share knowledge through discussions and support.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
