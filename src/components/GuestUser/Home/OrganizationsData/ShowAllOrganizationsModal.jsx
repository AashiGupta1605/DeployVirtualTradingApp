import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../../../utils/BaseUrl";
import axios from "axios";
import { FaBuilding } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FolderOpen } from "lucide-react";

const Dummy = ({ closeModal }) => {

  const [orgData, setOrgData] = useState([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  const [isRecent, setIsRecent] = useState(true);

  const fetchOrganizationsData = async () => {
    try {
      const searchQuery = search.trim() === "" ? "all" : search;
      const response = await axios.get(
        `${BASE_API_URL}/guestUser/getAllOrganizations/${searchQuery}`
        // `http://localhost:5000/v1/api/guestUser/getAllOrganizations/${searchQuery}`
      );
      setOrgData(response.data.data);
      setErr("");
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
    try {
      fetchOrganizationsData();
      setErr("");
    } catch (error) {
      setErr(error.message);
    }
  }, [search]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,24,38,0.4)] pt-19" // Light background
      onClick={closeModal}
    >
      <div
        className="relative bg-white pl-1 pr-1 pt-0 rounded-xl shadow-lg w-[85%] h-[83vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white left-0 w-full border-b border-gray-100 p-4 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-[#2474ff] text-[27px]" />
              <h2 className="text-[18px] font-bold text-gray-600">
                Associated Organizations
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <h6 className="text-base font-semibold text-gray-400">
                Total Organizations: {orgData.length}
              </h6>

              <button
                onClick={() => setIsRecent(!isRecent)}
                className="px-2 py-[6px] bg-lightBlue-600 text-white text-sm text-semibold shadow-md rounded-md focus:outline-none hover:bg-blue-700"
              >
              {isRecent ? "Recently Associated" : "Previously Associated"}
              </button>

              {/* Search bar */}
              <div className="relative">
                <div className="relative w-[270px]">
                  {/* Search Icon */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                    alt="search"
                    className="absolute left-3 top-1/4 transform -translate-y-1/2 w-4 h-4"
                  />
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value || "")}
                    className="border border-gray-400 pl-10 pr-4 py-2 rounded-lg w-full h-[36px] focus:outline-none focus:shadow-md focus:border-black"
                  />
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="ml-2 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 focus:outline-none"
              >
                <FaTimes className="text-gray-400 hover:text-gray-600 text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* {err && <p className="text-red-500">{err}</p>} */}

        {/* List of Feedbacks */}
        <div className="flex h-[64vh]">
          <div className="inset-0 overflow-y-auto w-full max-h-[500px] rounded-lg shadow-md">
            <table className="inset-0 min-w-full table-fixed divide-y divide-gray-200 border-collapse bg-white">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="ml-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Associated Date
                  </th>
                </tr>
              </thead>

              {/* {err && 
                <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td colSpan="4">
                    <div className="mt-18 ml-95 flex flex-col items-center justify-center h-50 w-100 bg-gray-100 rounded-lg shadow-md p-4">
                      <span className="text-red-500 text-2xl">
                        <i className="fas fa-exclamation-circle"></i>
                      </span>
                      <b className="text-lg text-gray-700 mt-2">Loading...</b>
                      <h4 className="text-gray-500 text-sm">No content available</h4>
                      <p className="text-red-500 text-sm">{err}</p>
                    </div>
                  </td>
                </tr>
                </tbody>
              } */}

              {err && (
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                <td colSpan="4">
                  <div className="mt-12 ml-15 flex justify-center items-center min-h-[200px]">
                  <div className="flex flex-col items-center justify-center w-96 bg-gray-100 rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                      <i className="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
                    </div>
                    <b className="text-lg text-gray-800 mt-4">Oops! Something went wrong.</b>
                    <p className="text-gray-600 text-sm text-center mt-2">
                      We couldn’t load the content. Please try again later.
                    </p>
                    <p className="text-red-600 font-medium mt-2">{err}</p>
                    <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md shadow-md hover:bg-red-600 transition"
                    >
                      Retry
                    </button>
                  </div>
                  </div>
                </td>
                </tr>
              </tbody>
              )}

              <tbody className="bg-white divide-y divide-gray-200">
                {orgData.length > 0 ? (
                  (isRecent ? [...orgData].reverse() : orgData).map((org, index) => {
                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {org.name 
                            ? org.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                            : 'Organization Name is not available'
                          } 
                        </td>
                        <td className="px-6 py-4 min-w-[270px] max-w-[300px] break-words truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                          {org.website ? (
                            <a
                              href={org.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="underline text-lightBlue-600">
                                {org.website}
                              </span>
                            </a>
                          ) : (
                            "No website found"
                          )}
                        </td>
                        <td className="ml-10 px-6 py-4 min-w-[340px] max-w-[360px] break-words text-sm">
                          {org.address 
                            ? org.address.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                            : 'No address found'
                          } 
                        </td>

                        <td className="px-6 py-4 text-center text-sm">
                          {new Date(org.createDate).toISOString().split("T")[0]}
                        </td>
                      </tr>
                    );
                  })
                ) : (!err &&
                  <tr>
                    <td colSpan="4"
                    className="p-6 text-center text-gray-500 text-base font-medium bg-gray-50 rounded-md mt-4"
                    >
                      <div className="pt-20 pb-42 flex flex-col items-center space-y-2">
                      <FolderOpen className="w-10 h-10 text-gray-400" /> 
                      <span>No Organizations available.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Close Button */}
        <div className="sticky bottom-0 -pb-2 bg-white py-1 border-t border-gray-100 flex justify-end">
          <button
            onClick={closeModal}
            className="px-6 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-white transition mt-1 -mb-2 mr-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dummy;
