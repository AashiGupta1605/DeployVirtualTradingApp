import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../../../utils/BaseUrl";
import axios from "axios";

const ShowAllOrganizationsModal = ({ closeModal }) => {
  const [orgData, setOrgData] = useState([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState(" ");

  const fetchOrganizationsData = async () => {
    try {
      const response = await axios.get(
        // `${BASE_API_URL}/guestUser/searchOrganization/${search}`
        `http://localhost:5000/v1/api/guestUser/getAllOrganizations/${search}`
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
      className="fixed mt-21 inset-0 z-[100] flex items-center justify-center bg-[rgba(17,24,38,0.4)]"
      onClick={closeModal}
    >
      <div
        className="relative bg-white p-4 rounded-lg shadow-lg w-[85%] max-w-[1200px] max-h-[83vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white w-full border-b border-gray-300 pb-2 -pt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Associated Organizations
            </h2>
            <div className="flex items-center gap-4">
              <h6 className="text-sm font-semibold text-gray-500">
                Total Associated Organizations: {orgData.length} &nbsp;&nbsp;
              </h6>

              <button
                onClick={closeModal}
                className="w-10 p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
          </div>

          {/* Search Input (Aligned to Right) */}
          <div className="flex justify-end mt-1">
          <div className="relative w-[290px]">
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
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-400 pl-10 pr-4 py-2 rounded-lg w-full h-[36px] focus:outline-none focus:shadow-md focus:border-black"
                />
              </div>
          </div>
        </div>

        {err && <p className="text-red-500 mt-2">{err}</p>}

        {/* Table Container */}
        <div className="flex-1 overflow-y-auto mt-3 mb-3">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border border-gray-600 rounded-lg overflow-hidden">
              <thead className="bg-gray-200 border-b sticky top-0 rounded-t-lg">
                <tr>
                  <th className="px-4 py-2 text-left text-xs uppercase font-medium text-gray-700 w-1/4">
                    Organization Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs uppercase font-medium text-gray-700 w-1/4">
                    Website
                  </th>
                  <th className="px-4 py-2 text-left text-xs uppercase font-medium text-gray-700 w-1/4">
                    Address
                  </th>
                  <th className="px-4 py-2 text-left text-xs uppercase font-medium text-gray-700 w-1/4">
                    Associated Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orgData.length > 0 ? (
                  orgData.map((org, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-4 py-3 break-words text-gray-600">
                        {org.name}
                      </td>
                      <td className="px-4 py-3 break-words text-gray-600">
                        {org.website ? (
                          <a
                            href={org.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="underline text-blue-600">
                              {org.website}
                            </span>
                          </a>
                        ) : (
                          "No website found"
                        )}
                      </td>
                      <td className="px-4 py-3 break-words text-gray-600">
                        {org.address ? org.address : "No address found"}
                      </td>
                      <td className="px-4 py-3 break-words text-gray-600">
                        {new Date(org.createDate).toISOString().split("T")[0]}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No organizations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Close Button */}
        <div className="sticky bottom-0 -pb-2 bg-white py-1 border-t border-gray-300 flex justify-end">
          <button
            onClick={closeModal}
            className="px-6 py-1 bg-gray-200 text-white rounded-lg hover:bg-gray-400 transition mt-1 -mb-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowAllOrganizationsModal;
