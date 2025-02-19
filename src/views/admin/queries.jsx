import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronRight,
  Trash2,
  Search as SearchIcon,
  X,
  Filter,
} from "lucide-react";
import CardStats from "../../components/Admin/Cards/CardStats";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const QueriesPage = () => {
  const [contacts, setContacts] = useState([]);
  const [orgCount, setOrgCount] = useState(0);
  const [users, setUsers] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Filter States
  const [typeFilter, setTypeFilter] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    type: "all",
    startDate: null,
    endDate: null,
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchAreaRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsResponse, orgResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/contact"),
          axios.get("http://localhost:5000/api/org/display-all-org"),
          axios.get("http://localhost:5000/api/user/display-users"),
        ]);

        setContacts(contactsResponse.data);
        setOrgCount(orgResponse.data.length);
        setUsers(usersResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Filtered Contacts
  const filteredContacts = contacts.filter((contact) => {
    if (typeFilter !== "all" && contact.type !== typeFilter) {
      return false;
    }

    if (startDate && endDate) {
      const contactDate = new Date(contact.createDate);
      if (contactDate < startDate || contactDate > endDate) {
        return false;
      }
    }

    // Search Filter
    if (
      searchQuery &&
      !Object.values(contact).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    ) {
      return false;
    }

    return true;
  });

  // Handler functions for filters
  const handleTypeFilterChange = (e) => {
    setTempFilters({ ...tempFilters, type: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setTempFilters({ ...tempFilters, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setTempFilters({ ...tempFilters, endDate: date });
  };

  const applyFilters = () => {
    setTypeFilter(tempFilters.type);
    setStartDate(tempFilters.startDate);
    setEndDate(tempFilters.endDate);
    setIsFilterOpen(false);
    setIsSearchOpen(false);
  };

  const clearFilters = () => {
    setTempFilters({ type: "all", startDate: null, endDate: null });
    setTypeFilter("all");
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const toggleFilterVisibility = () => {
    setIsFilterOpen(!isFilterOpen);
    if (!isFilterOpen) {
      setTempFilters({ type: typeFilter, startDate: startDate, endDate: endDate });
    }
  };

  const toggleSearchArea = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearchInput = () => {
    setSearchQuery("");
  };

  return (
    <div className="mt-12 overflow-hidden">
      {/* CardStats Section */}
      <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <CardStats
                statSubtitle="REGISTERED USERS"
                statTitle={users.toString()}
                statArrow="up"
                statPercent="100"
                statPercentColor="text-emerald-500"
                statDescription="Total users registered"
                statIconName="fas fa-users"
                statIconColor="bg-pink-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <CardStats
                statSubtitle="REGISTERED ORGANIZATIONS"
                statTitle={orgCount.toString()}
                statArrow="up"
                statPercent="100"
                statPercentColor="text-emerald-500"
                statDescription="Total organizations registered"
                statIconName="fas fa-building"
                statIconColor="bg-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Queries Table Section */}
      <div className="p-8 mx-4 -mt-48">
        <div className="mt-24 rounded bg-gray-100 shadow-md px-6 py-4 flex items-center border-b">
          <h2 className="text-xl font-bold text-gray-800 flex-grow">Manage Queries</h2>

          {/* Search Bar with Clear Button */}
          <div className="flex items-center w-full max-w-xs mr-4 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
            />
            {searchQuery && (
              <button
                onClick={clearSearchInput}
                className="focus:outline-none absolute right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Icon Button */}
          <div className="relative group">
            <button
              onClick={toggleSearchArea}
              className="focus:outline-none bg-white rounded-md shadow-sm px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors flex items-center"
            >
              <Filter className="mr-2" size={16} />
            </button>
            <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white rounded-md shadow-md text-sm whitespace-nowrap">
              Filters
            </div>
          </div>
        </div>
        {/* Sliding Search Area */}
        <div
          ref={searchAreaRef}
          className={`bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out ${
            isSearchOpen ? "max-h-96 p-6" : "max-h-0 p-0"
          }`}
        >
          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Query Type:</label>
              <select
                value={tempFilters.type}
                onChange={handleTypeFilterChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="all">All Types</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Billing Issue">Billing Issue</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>
            {/* Date Range Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Date Range:</label>
              <div className="flex space-x-2">
                <DatePicker
                  selected={tempFilters.startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={tempFilters.startDate}
                  endDate={tempFilters.endDate}
                  placeholderText="Start Date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <DatePicker
                  selected={tempFilters.endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={tempFilters.startDate}
                  endDate={tempFilters.endDate}
                  minDate={tempFilters.startDate}
                  placeholderText="End Date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* Apply and Clear Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={applyFilters}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-400 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white h-[30rem] shadow-md rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["Name", "Email", "Mobile", "Type", "Description", "Join Date", "Actions"].map((header) => (
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
              {filteredContacts.map((contact) => (
                <React.Fragment key={contact._id}>
                  <tr
                    onClick={() => toggleRow(contact._id)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      expandedRow === contact._id ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 flex items-center">
                      {expandedRow === contact._id ? (
                        <ChevronDown className="mr-2 text-gray-500" size={16} />
                      ) : (
                        <ChevronRight className="mr-2 text-gray-500" size={16} />
                      )}
                      {contact.name}
                    </td>
                    <td className="px-6 py-4">{contact.email}</td>
                    <td className="px-6 py-4">{contact.mobile}</td>
                    <td className="px-6 py-4">{contact.type}</td>
                    <td className="px-6 py-4">{contact.desc}</td>
                    <td className="px-6 py-4">
                      {new Date(contact.createDate).toLocaleDateString()}
                    </td>

                    {/* Delete Icon with Tooltip */}
                    <td className="px-6 py-4 flex space-x-2 relative group">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact._id);
                          }}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white rounded-md shadow-md text-sm whitespace-nowrap">
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>

                  {expandedRow === contact._id && (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-sm">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Created Date</p>
                            <p className="text-sm text-gray-800">
                              {new Date(contact.createDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Last Updated</p>
                            <p className="text-sm text-gray-800">
                              {new Date(contact.updateDate).toLocaleDateString()}
                            </p>
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
      </div>
    </div>
  );
};

export default QueriesPage;