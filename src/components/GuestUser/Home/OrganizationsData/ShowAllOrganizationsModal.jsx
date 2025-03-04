import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowAllOrganizationsModal = ({ closeModal }) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  const [search,setSearch] = useState("")

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/v1/api/guestUser/searchOrganization/${search}`
      );
      setData(response.data);
      setErr(""); // Clear error if request succeeds
    } 
    catch (error) {
      setErr(error.message);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(230,230,230,0.3)] rounded-4xl pt-18" // Light background
      onClick={closeModal}
    >
      <div
        className="relative bg-white pl-4 pr-4 pb-4 pt-0 rounded-lg shadow-lg w-[2000px] max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Start of Header */}
        <div className="sticky top-0 bg-white left-0 w-full decoration-3 border-b-2 border-gray-500 mb-6">
          <div className="flex justify-between items-center mb-5 pt-4">
            <h2 className="text-lg font-semibold text-[#1a2c47">
              About Organizations
            </h2>
            {/* Right side container */}
            <div className="flex items-center gap-4 ">
              {/* First heading before*/}
              <h6 className="text-[18] font-semibold text-gray-500">
                Total Organizations: {data.length}
              </h6>
              <button
                onClick={closeModal}
                className="px-4 py-1 font-bold bg-red-300 text-white rounded-lg hover:bg-red-500 transition "
              >
                X
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
              className="border p-2 rounded-lg w-full"
            />
            <button 
            onClick={handleSearch} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >  Search </button>
            </div>
          </div>
        </div>
        {/* End of sticky header */}

        {err && <p className="text-red-500">{err}</p>}

        {/* List of Organizations */}
        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3 border border-gray-300 w-[250px]">Organization Name</th>
                <th className="p-3 border border-gray-300 w-[250px]">Organization Website</th>
                <th className="p-3 border border-gray-300 w-[250px]">Organization Address</th>
                <th className="p-3 border border-gray-300 w-[250px]">Organization Email</th>
                <th className="p-3 border border-gray-300 w-[250px]">Organization Contact</th>
                <th className="p-3 border border-gray-300 w-[250px]">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((org, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-3 border border-gray-300 overflow-hidden w-[250px] break-all">{org.name}</td>
                  <td className="p-3 border border-gray-300 overflow-hidden break-all text-blue-600 underline w-[250px]">
                    <a href={org.website} target="_blank" rel="noopener noreferrer">
                      {org.website}
                    </a>
                  </td>
                  <td className="p-3 border border-gray-300 overflow-hidden w-[250px] break-all">{org.address}</td>
                  <td className="p-3 border border-gray-300 overflow-hidden w-[250px] break-all">{org.email}</td>
                  <td className="p-3 border border-gray-300 overflow-hidden w-[250px] break-all">{org.mobile}</td>
                  <td className="p-3 border border-gray-300 w-[250px] break-all">{org.createDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="px-6 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-3 sticky bottom-0 bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowAllOrganizationsModal;
