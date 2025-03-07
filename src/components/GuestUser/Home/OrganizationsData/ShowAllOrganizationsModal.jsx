// ----------Reviewed: Correct-------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowAllOrganizationsModal = ({ closeModal }) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  const [search, setSearch] = useState("");

  const fetchOrganizationsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/v1/api/guestUser/searchOrganization/${search}`
      );
      setData(response.data.data);
      setErr("");
    } catch (error) {
      setErr(error.message);
    }
  };

  // const handleSearch = () => {
  //   fetchData();
  // };

  useEffect(() => {
    try {
      fetchOrganizationsData();
      setErr("")
    } catch (error) {
      setErr(error.message);
    }
  }, [search]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(17,24,38,0.4)] rounded-4xl pt-21" // Light background
      onClick={closeModal}
    >
      <div
        className="relative bg-white pl-4 pr-4 pb-4 pt-0 rounded-lg shadow-lg w-[80%] max-w-[1200px] max-h-[85vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Start of Header */}
        <div className="sticky top-0 bg-white left-0 w-full decoration-3 border-b-2 border-gray-500 mb-6">
          <div className="flex justify-between items-center mb-5 pt-4">
            <h2 className="text-lg font-semibold text-[#1a2c47">
              Organizations
            </h2>
            {/* Right side container */}
            <div className="flex items-center gap-6 ">
              {/* First heading before*/}
              <h6 className="text-[18] font-semibold text-gray-500">
                Total Associated Organizations: {data.length}
              </h6>
              <button
                onClick={closeModal}
                className="w-15 text-bold text-2xl text-red-500 hover:text-white hover:bg-red-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 ml-auto">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-400 px-4 py-1 rounded-lg w-[347px] h-[40px] focus:outline-none focus:shadow-md focus:shadow-black focus:border-black"
              />
              {/* <button 
            onClick={handleSearch} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >  Search </button> */}
            </div>
          </div>
        </div>
        {/* End of sticky header */}

        {err && <p className="text-red-500">{err}</p>}

        {/* List of Organizations */}
        {/* Table Container */}
        <div className="max-h-[60vh] overflow-y-auto overflow-x-auto px-3">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="p-3 border border-gray-300 w-[248px]">
                    Organization Name
                  </th>
                  <th className="p-3 border border-gray-300 w-[248px]">
                    Organization Website
                  </th>
                  <th className="p-3 border border-gray-300 w-[248px]">
                    Organization Address
                  </th>
                  {/* <th className="p-3 border border-gray-300 w-[248px]">Organization Email</th> */}
                  {/* <th className="p-3 border border-gray-300 w-[248px]">Organization Contact</th> */}
                  <th className="p-3 border border-gray-300 w-[248px]">
                    Associated Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((org, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="p-3 border border-gray-300 overflow-hidden w-[248px] break-all">
                        {org.name}
                      </td>
                      <td className="p-3 border border-gray-300 overflow-hidden break-all line-clamp-3 text-blue-600 underline w-[248px]">
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {org.website}
                        </a>
                      </td>
                      <td className="p-3 border border-gray-300 overflow-hidden w-[248px] break-all">
                        {org.address}
                      </td>
                      {/* <td className="p-3 border border-gray-300 overflow-hidden w-[248px] break-all">{org.email}</td> */}
                      {/* <td className="p-3 border border-gray-300 overflow-hidden w-[248px] break-all">{org.mobile}</td> */}
                      <td className="p-3 border border-gray-300 w-[248px] break-all">
                        {new Date(org.createDate).toISOString().split("T")[0]}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500">
                      No organizations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="px-6 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-3 mb-5 sticky bottom-0 bg-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAllOrganizationsModal;
