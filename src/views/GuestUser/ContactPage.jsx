import React, { useState } from "react";

import { Link } from "react-router-dom";
import StockP from "../../assets/p-stock.jpg";
import "../../components/GuestUser/Contact/ContactPage.css"; 
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import { BASE_API_URL } from "../../utils/BaseUrl";

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Contact Section */}
      <div className="mt-7 min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 relative">
        {/* Left - Content */}
        <div className="text-black md:w-1/2 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blueGray-800">
            Get in Touch with StockSphere
          </h1>
          <p className="text-lg leading-relaxed opacity-80">
            Have questions or need support? Contact us today, and we’ll be happy
            to help!
          </p>
          <p className="text-lg leading-relaxed opacity-80 mt-4">
            Email us at:
            <Link
              to="mailto:support@stocksphere.com"
              className="text-blueGray-500 font-semibold"
            >
              {" "}
              support@stocksphere.com{" "}
            </Link>
          </p>
          <p className="text-lg leading-relaxed opacity-80 mt-2">
            Call us at:{" "}
            <span className="text-blueGray-500 font-semibold">
              +1 (800) 123-4567
            </span>
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
        <div className="md:w-1/2 px-6 !mt-20 md:mt-0">
          <img
            src={StockP}
            alt="Stock Market"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Contact Info Cards */}

<div className="px-6 py-12 !mt-0 !mb-25 bg-gradient-to-b from-blue-50 to-white">
  <h2 className="text-3xl font-bold text-center text-blueGray-800 mb-10">
    Our Contact Info
  </h2>
  <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
    {/* Card 1 - Email & Call Combined */}
    <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
      <div className="flex justify-center gap-6 mb-4">
        <div className="w-14 h-14 rounded-full bg-lightBlue-100 flex items-center justify-center text-lightBlue-600 text-2xl">
        <i className="fas fa-comments"></i>
        </div>
        
      </div>
      <h3 className="text-xl font-semibold mb-2">Email & Call</h3>
      <p className="text-gray-600">support@stocksphere.com</p>
      <Link to="mailto:support@stocksphere.com" className="text-blue-500 underline text-sm block mb-2">
        Send a Message
      </Link>
      <p className="text-gray-600">+1 (800) 123-4567</p>
      <a href="tel:+18001234567" className="text-blue-500 underline text-sm">
        Call Now
      </a>
    </div>

    {/* Card 2 - Address */}
    <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-lightBlue-100 flex items-center justify-center text-lightBlue-600 text-2xl">
        <i className="fas fa-map-marker-alt"></i>
      </div>
      <h3 className="text-xl font-semibold mb-2">Our Address</h3>
      <p className="text-gray-600">123 Market Street</p>
      <p className="text-gray-600">San Francisco, CA 94105</p>
    </div>

    {/* Card 3 - Office Hours */}
    <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-lightBlue-100 flex items-center justify-center text-lightBlue-600 text-2xl">
        <i className="fas fa-clock"></i>
      </div>
      <h3 className="text-xl font-semibold mb-2">Support Hours</h3>
      <p className="text-gray-600">Mon - Fri: 9am - 6pm</p>
      <p className="text-gray-600">Sat - Sun: 10am - 4pm</p>
    </div>
  </div>
</div>


      {/* Contact Modal */}
      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

const ContactModal = ({ onClose }) => {
  const contactValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
      .required("Mobile is required"),
    type: Yup.string().required("Type is required"),
    desc: Yup.string().min(5, "Too short").required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      type: "General Inquiry",
      desc: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${BASE_API_URL}/user/contact/createContact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Your message has been sent successfully!");
          resetForm();
          onClose();
        } else {
          toast.error(data.error || "Something went wrong. Please try again.");
        }
      } catch (error) {
        toast.error("Failed to connect to the server. Please try again later.");
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div
        style={{ width: "100%", maxWidth: "90%" }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-envelope text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
               bg-white text-gray-900 
               focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
               focus:outline-none transition-all duration-200"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
               bg-white text-gray-900 
               focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
               focus:outline-none transition-all duration-200"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
               bg-white text-gray-900 
               focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
               focus:outline-none transition-all duration-200"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Issue</option>
                <option>Feedback</option>
              </select>
              {formik.touched.type && formik.errors.type && (
                <p className="text-red-500 text-sm">{formik.errors.type}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                rows="3"
              />
              {formik.touched.desc && formik.errors.desc && (
                <p className="text-red-500 text-sm">{formik.errors.desc}</p>
              )}
            </div>

            <div className="col-span-2 flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
