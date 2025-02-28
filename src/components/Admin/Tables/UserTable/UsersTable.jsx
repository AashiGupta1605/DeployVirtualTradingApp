import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import PropTypes from 'prop-types';

const TYPE_COLORS = {
  "Male": "bg-lightBlue-100 text-lightBlue-600",
  "Female": "bg-red-100 text-red-800",
};

const UsersTable = ({
  users,
  onEditClick,
  onDeleteClick
}) => {
  // Format date utility
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Name', 'Email', 'Mobile', 'Gender', 'DOB', 'Join Date', 'Actions'].map(header => (
                <th 
                  key={header} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length ? (
              users.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.mobile}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${TYPE_COLORS[user.gender] || "bg-gray-100 text-gray-800"}`}
                    >
                      {user.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(user.dob)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(user.createdDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEditClick(user)}
                        className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                        aria-label="Edit user"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteClick(user)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        aria-label="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      dob: PropTypes.string,
      createdDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default UsersTable;