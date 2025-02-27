import React, { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";

const OrgUserTable = ({ users, onEdit, onDelete, expandedRow, toggleRow }) => {
  return (
    <div className="bg-white h-[30rem] shadow-md rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {["Name", "Email", "Mobile", "Gender", "Date of Birth", "Added By", "Status", "Actions"].map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <React.Fragment key={user._id}>
              <tr
                onClick={() => toggleRow(user._id)}
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${expandedRow === user._id ? "bg-gray-50" : ""}`}
              >
                <td className="px-6 py-4 flex items-center">
                  {expandedRow === user._id ? (
                    <ChevronDown className="mr-2 text-gray-500" size={16} />
                  ) : (
                    <ChevronRight className="mr-2 text-gray-500" size={16} />
                  )}
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.mobile}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">
                  {user.dob && !isNaN(new Date(user.dob)) ? new Date(user.dob).toISOString().split("T")[0] : "N/A"}
                </td>
                <td className="px-6 py-4">{user.addedby}</td>
                <td className="px-6 py-4">true</td>
                <td className="px-6 py-4 flex space-x-2 relative group">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(user);
                      }}
                      className="text-lightBlue-500 hover:text-lightBlue-700 mr-2"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(user);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white rounded-md shadow-md text-sm whitespace-nowrap">
                      Actions
                    </div>
                  </div>
                </td>
              </tr>
              {expandedRow === user._id && (
                <tr>
                  <td colSpan="10" className="px-6 py-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Created Date</p>
                        <p className="text-sm text-gray-800">{new Date(user.createdDate).toLocaleDateString("en-US")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Last Updated</p>
                        <p className="text-sm text-gray-800">{new Date(user.updatedDate).toLocaleDateString("en-US")}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrgUserTable;


