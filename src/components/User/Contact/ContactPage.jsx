import React, { useState } from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "../Navbars/IndexNavbar";
import Footer from "../Footers/Footer";
import StockP from "../../../assets/p-stock.jpg";
import "./ContactPage.css"; // Import custom CSS file

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IndexNavbar />

      {/* Contact Section */}
      <div className=" min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 relative">
        {/* Left - Content */}
        <div className="text-black md:w-1/2 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blueGray-800">
            Get in Touch with StockSphere
          </h1>
          <p className="text-lg leading-relaxed opacity-80">
            Have questions or need support? Contact us today, and we’ll be happy to help!
          </p>
          <p className="text-lg leading-relaxed opacity-80 mt-4">
            Email us at:
            <Link to="mailto:support@stocksphere.com" className="text-blueGray-500 font-semibold">
              {" "}
              support@stocksphere.com{" "}
            </Link>
          </p>
          <p className="text-lg leading-relaxed opacity-80 mt-2">
            Call us at: <span className="text-blueGray-500 font-semibold">+1 (800) 123-4567</span>
          </p>

          {/* Contact Us Button */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700  px-6 py-3 font-bold rounded-md text-sm md:text-lg shadow-lg"
            >
              CONTACT US
            </button>
          </div>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2 px-6 mt-12 md:mt-0">
          <img src={StockP} alt="Stock Market" className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}

      <Footer />
    </>
  );
};

const ContactModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    type: "General Inquiry",
    desc: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contacts/createContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", mobile: "", type: "General Inquiry", desc: "" });
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <>
      {/* Overlay with Blur Effect */}
      <div className="modal-overlay">
        {/* Modal Box */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-2 right-3 text-gray-600 hover:text-gray-900">
            ✖
          </button>

          <h2 className="text-xl font-bold text-center text-blue-600">Contact Us</h2>
          <p className="text-gray-500 text-center mb-4">We’ll get back to you soon!</p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="block text-gray-600 text-sm font-bold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-gray-600 text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Mobile */}
            <div className="mb-3">
              <label className="block text-gray-600 text-sm font-bold mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* Type of Inquiry */}
            <div className="mb-3">
              <label className="block text-gray-600 text-sm font-bold mb-1">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Issue</option>
                <option>Feedback</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="block text-gray-600 text-sm font-bold mb-1">Description</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full font-bold py-2 px-4 rounded-lg bg-lightBlue-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/20">
              Submit
            </button>

            {/* Success/Error Message */}
            {message && <p className="text-center mt-2 text-sm text-red-600">{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
