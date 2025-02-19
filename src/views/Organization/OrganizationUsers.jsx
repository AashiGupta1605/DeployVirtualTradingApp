
// updated version 
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import OrganizationUserRegistration from "./auth/OrganizationUserRegistration";
import Dashboard from "./OrganizationDashboard";
import ConfirmationModal from "../../components/Organization/ConfirmationModal";
import Loader from "../../components/Common/Loader";
import { Edit, Trash2, Menu } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrganizationUsers = () => {
  const [studentList, setStudentList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const orgName = localStorage.getItem("orgName");

  useEffect(() => {
    fetchStudents();
  }, [currentPage, searchTerm, startDate, endDate, minAge, maxAge]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/org/${orgName}/users`, {
        params: { page: currentPage, limit: 10, search: searchTerm, startDate, endDate, minAge, maxAge }
      });
      setStudentList(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/org/user/${id}`);
      setStudentList(studentList.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
      setConfirmationModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.response.data.msg);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setConfirmationModalOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Custom debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setCurrentPage(1); // Reset to first page on new search
    }, 500),
    []
  );

  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleMinAgeChange = (event) => {
    setMinAge(event.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleMaxAgeChange = (event) => {
    setMaxAge(event.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg border-0 mt-14">
        <Dashboard type="student-list" />
        <Toaster />
        {/* Mobile menu button */}
        <div className="flex justify-end md:hidden p-4">
          <button onClick={toggleMenu} className="text-lightBlue-500">
            <Menu size={24} />
          </button>
        </div>
        <div className="rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <h6 className="text-blueGray-600 text-xl font-semibold">
                Manage Users
              </h6>
              <button
                onClick={() => { setSelectedStudent(null); setModalOpen(true); }}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 ml-0 md:ml-4 mt-4 md:mt-0"
              >
                Register New Students
              </button>
            </div>
            <div className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                className="border px-4 py-2 rounded"
              />
              <button
                onClick={() => setFilterOpen(!isFilterOpen)}
                className="bg-lightBlue-500 mx-0 md:mx-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                Filter
              </button>
            </div>
          </div>
          {isFilterOpen && (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                className="border px-4 py-2 rounded"
                placeholderText="Start Date"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                className="border px-4 py-2 rounded"
                placeholderText="End Date"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
              <input
                type="number"
                placeholder="Min Age"
                value={minAge}
                onChange={handleMinAgeChange}
                className="border px-4 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Max Age"
                value={maxAge}
                onChange={handleMaxAgeChange}
                className="border px-4 py-2 rounded"
              />
            </div>
          )}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="block w-full overflow-x-auto mt-6">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Mobile
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Gender
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Date of Birth
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Added By
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Created Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Updated Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student) => (
                  <tr key={student._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.mobile}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.gender}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(student.dob).toISOString().split('T')[0]}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.addedby}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      true
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(student.createdDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(student.updatedDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-lightBlue-500 hover:text-lightBlue-700 mr-2"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(student)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <OrganizationUserRegistration
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          initialValues={selectedStudent}
        />

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          onConfirm={() => handleDelete(studentToDelete._id)}
          message={`Are you sure you want to delete student ${studentToDelete?.name}?`}
        />

        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-lightBlue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-1">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-lightBlue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationUsers;






