import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";

import { Filter, Edit, Trash2} from "lucide-react";
import { FaTimes, FaImages } from "react-icons/fa";
import { FolderOpen, PlusCircle } from "lucide-react";
import { IoIosArrowUp } from "react-icons/io";
import { toast } from 'react-hot-toast';
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import ConfirmationModal from "../Modals/ConformationModal";

import AddGalleryCategory from './AddGalleryCategory';
import UpdateGalleryCategory from "./UpdateGalleryCategory";

// const Tooltip = ({ children, text }) => (
//   <div className="relative group">
//     {children}
//     <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
//       {text}
//     </div>
//   </div>
// );

const ShowGalleryCategories = ({ sidebarExpanded }) => {

  const [isOpenCategoryForm, setIsOpenCategoryForm] = useState(false);
  const openAddCategoryModal = () => setIsOpenCategoryForm(true);
  const closeAddCategoryModal = () => setIsOpenCategoryForm(false);

  const [showFilters, setShowFilters] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState({});

  const [galleryCategories, setGalleryCategories] = useState([]);

  const [err, setErr] = useState("");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdDate");
  const [order, setOrder] = useState("decreasing");
  

  useEffect(() => {
  if (err) {
    setShowFilters(false);
    setFilterCount(0);
  }
  }, [err]);

  useEffect(() => {
    let count = 0;
    let filters = {};

    if (search.trim() !== "") {
      count++;
      filters["Search"] = search;
    }
    if (sortBy !== "createdDate") {
      count++;
      if(sortBy==="name")
        filters["Sort By"] = "Name"
      else if (sortBy==="createdDate")
        filters["Sort By"] = "Date Created"
      else if (sortBy==="updatedDate")
        filters["Sort By"] = "Date Modified"
      else if (sortBy==="noOfItems")
        filters["Sort By"] = "Number of Images"
    }
    if (order !== "decreasing") {
      count++;
      filters["Order"] = order==="increasing" ? "Ascending" : "Descending";
    }
    setFilterCount(count);
    setAppliedFilters(filters);
  }, [search, sortBy, order]);

  const removeFilter = (key) => {
    setAppliedFilters((prev) => {
      const updatedFilters = { ...prev };
      delete updatedFilters[key]; 
      return updatedFilters; 
    });
    setFilterCount((prev) => Math.max(prev - 1, 0)); 

    // Reset the corresponding state variable
    switch (key) {
      case "SortBy":
        setSortBy("createdDate");
        break;
      case "Order":
        setOrder("decreasing");
        break;
      case "Search":
        setSearch("")
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setAppliedFilters({});  // Reset all filters
    setSearch("")
    setSortBy("createdDate")
    setOrder("decreasing")
    setFilterCount(0);  // Reset filter count
  };

  const fetchGalleryCategories = async () => {
    try {
      const searchQuery = search.trim() === "" ? "all" : search;
      const response = await axios.get(
        `${BASE_API_URL}/admin/galleryCategory/getGalleryCategories/${searchQuery}/${sortBy}/${order}`
      );
      setGalleryCategories(response.data.categoryData);
      console.log("Gallery Categories: ", response.data);
    } 
    catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.");
    }
  };

  const refreshCategories = () => {
    fetchGalleryCategories(); // Re-fetch categories to get the updated list
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchGalleryCategories()
        setErr("");
      } 
      catch (error) {
        setErr(error.response?.data?.message || "Something went wrong.");
      }
    };
    fetchData();
  }, [sortBy, order, search]);

  // const handleDeleteCategory = async (id) => {
  //   confirmAlert({
  //     title: "Confirm Deletion",
  //     message: "Are you sure you want to delete this category?",
  //     buttons: [
  //       {
  //         label: "Confirm",
  //         onClick: async () => {
  //           try {
  //             const response = await axios.patch(
  //               `${BASE_API_URL}/admin/galleryCategory/deleteGalleryCategory/${id}`
  //             );
  
  //             console.log("Delete Gallery Category Response: ", response);
  
  //             if (response.status === 201) {
  //               toast.success("Category deleted successfully!");
  //               refreshCategories();
  //             } 
  //             else {
  //               toast.warning("Unsuccessful. Please try again.");
  //             }
  //           } 
  //           catch (error) {
  //             console.error("Error deleting category:", error);
  //             toast.error("Error deleting category. Please try again.");
  //           }
  //         },
  //       },
  //       {
  //         label: "Cancel",
  //         onClick: () => {
  //           toast.info("Deletion cancelled.");
  //         },
  //       },
  //     ],
  //   });
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("")

  const handleDeleteCategory = (id, name) => {
    setDeleteId(id);  
    setDeleteName(name)
    setIsModalOpen(true); 
  };
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/admin/galleryCategory/deleteGalleryCategory/${deleteId}`
      );
  
      console.log("Delete Gallery Category Response: ", response);
  
      if (response?.status === 201) {
        toast.success(response?.data?.message);
        refreshCategories();
      } 
      else {
        toast.warning(response?.data?.message);
      }
    } 
    catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Unsuccessful deleting. Please try again.");
    }
    setIsModalOpen(false);
    setDeleteId(null); 
  };

  const [isOpenCategoryUpdate, setIsOpenCategoryUpdate] = useState(false);
  const openUpdateCategoryModal = () => setIsOpenCategoryUpdate(true);
  const closeUpdateCategoryModal = () => setIsOpenCategoryUpdate(false);
  const [updateId, setUpdateId] = useState(null)
  const [updateName, setUpdateName] = useState("")

  const handleUpdateCategory = (id,name) => {
    setUpdateId(id)
    setUpdateName(name)
    openUpdateCategoryModal()
  }

  return (
    <>
    {/* ${sidebarExpanded ? 'mt-138' : 'mt-98'}  */}
    <div className={`
      relative z-30 flex items-center justify-center bg-transparent pb-4 pointer-events-none
    `}>
      <div className={`
        ${sidebarExpanded ? 'left-2 w-[92%]' : 'left-0 w-[93%]'}
        -mt-12 relative bg-white pl-1 pr-1 pt-0 rounded-xl shadow-lg h-[72vh] flex flex-col shadow-lg pointer-events-auto
      `}>
        <div className="sticky top-0 bg-white left-0 w-full border-b border-gray-100 p-4 mt-1">
          {/* Top Header */}
          <div className="flex justify-between items-center">
            {/* Left Side (Icon + Heading) */}
            <div className="flex items-center gap-3">
              <FaImages className="text-gray-600 text-[25px]" />
              <h2 className="text-xl font-bold text-gray-800">
                Gallery Categories
              </h2>
            </div>

            {/* Right Side (Total Feedbacks + Filter Icon + Close Button) */}
            <div className="flex items-center gap-4">
              <h6 className="text-base font-semibold text-gray-400">
                Total Categories: {galleryCategories.length}
              </h6>

              {/* Filter Icon */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative flex items-center gap-8 px-2 py-2 h-[40px] border rounded-lg focus:outline-none hover:shadow-shadow-[0_0_7px_1px_rgba(59,130,246,0.7)] hover:border-blue-400
                            ${showFilters? "shadow-[0_0_7px_1px_rgba(59,130,246,0.5)] border-blue-300" : "shadow-md border-gray-300"}
                          `}
              >
                {/* Filter Icon */}
                <div className="relative">
                  <Filter className="text-gray-500 text-xl hover:text-gray-700 focus:outline-none" />

                  {/* Filter Count - Positioned Bottom Right */}
                  {filterCount > 0 && (
                    //<span className="absolute -bottom-1 -right-6 bg-blue-500 text-white px-3 py-[2px] rounded-lg text-xs">
                    <span className="absolute mt-[4px] bottom-1 -right-5.5 bg-blue-500 text-white px-2 py-[2px] rounded-full text-xs">
                      {filterCount}
                    </span>
                  )}
                </div>
                {/* Arrow Icon */}
                <IoIosArrowUp
                  className={`pl-[2px] -pr-[2px] text-gray-500 text-lg transition-transform duration-200 ${
                    showFilters ? "rotate-0" : "rotate-180"
                  }`}
                />
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

              {/* Add Category Button */}
              <button
              onClick={openAddCategoryModal}
              className="mr-2 h-[2.35rem] px-5 bg-lightBlue-600 text-white rounded-lg hover:bg-lightBlue-700 transition-colors flex items-center"
              >
                <PlusCircle size={18} className="mr-2" />
                <span className="font-medium">Add Category</span>
              </button>

            </div>
          </div>

          {/* Filters Section (Visible only when showFilters is true) */}
          {!err && showFilters && (
            <div className="flex justify-end items-center mt-5">
              <div className="flex gap-4 mr-auto">

                {/* Sort By Select */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    SortBy
                  </label>
                  <div className="relative">
                    <select
                      name="sortBy"
                      className="border rounded-lg px-5 py-[6px] text-sm appearance-none w-38 pr-8"
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value || "createdDate")
                      }
                    >
                      <option disabled>SortBy</option>
                      <option value="name">Name</option>
                      <option value="updatedDate">Date Modified</option>
                      <option value="createdDate">Date Created</option>
                      <option value="noOfItems">Number of Images</option>
                    </select>
                  </div>
                </div>

                {/* Order Select */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Order
                  </label>
                  <div className="relative">
                    <select
                      name="Order"
                      className="border rounded-lg px-5 py-[6px] text-sm appearance-none w-38 pr-8"
                      value={order}
                      onChange={(e) => setOrder(e.target.value || "decreasing")}
                    >
                      <option disabled>Order</option>
                      <option value="increasing">Ascending</option>
                      <option value="decreasing">Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {filterCount > 0 && (
            <div className="mt-2 -mb-1 -ml-1 -mr-1 p-2 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex flex-wrap gap-2 flex items-center">
                {Object.entries(appliedFilters).map(([key, value]) => (
                  <span
                    key={key}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {key}: {value}
                    <button
                      onClick={() => removeFilter(key)}
                      className="ml-6 mr-1 mt-1 focus:outline-none bg-transparent"
                    >
                      <FaTimes className="text-blue-300 hover:text-blue-800 text-sm" />
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-[6px] bg-gray-200 text-gray-700 text-sm font-semibold rounded-full transition-all duration-200 hover:bg-gray-500 hover:text-white shadow-sm"
              >
              Clear All &nbsp;&nbsp;&nbsp;<FaTimes className="text-gray-500 hover:text-gray-700 text-base" />
              </button>
            </div>
          )}
        </div>

        {/* {err && <p className="text-red-500">{err}</p>} */}

        {/* List of Categories */}
        <div  className={`flex 
        ${
          showFilters
          ? filterCount > 0 ? "h-[39vh]" : "h-[47vh]"
          : filterCount > 0 ? "h-[50vh]" : "h-[59vh]"
        }`}>
          <div className={`inset-0 ${galleryCategories.length > 0 ? 'overflow-y-auto': ''} w-full max-h-[500px] rounded-lg`}>
            <table className={`inset-0 min-w-full table-fixed ${galleryCategories.length > 0 ? 'divide-y' : ''} divide-gray-200 border-collapse bg-white`}>
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categories Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Images
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Create Date
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Update Date
                  </th>
                  {/* <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated By
                  </th> */}
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    &nbsp;Actions
                  </th>
                </tr>
              </thead>

              {err && (
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                <td colSpan="5">
                  <div className="mt-9 ml-15 flex justify-center items-center min-h-[180px]">
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

              <tbody className={`bg-white ${galleryCategories.length > 0 ? 'divide-y' : ''} divide-gray-200`}>
                {galleryCategories.length > 0 ? (
                  galleryCategories.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 whitespace-nowrap min-w-[100px] text-sm font-medium text-gray-900">
                          {
                            data.name.split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                              )
                              .join(" ")
                          }
                        </td>

                        <td className="pl-18 px-5 py-4 whitespace-nowrap text-sm text-gray-500 min-w-[90px]">
                          N/A
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap min-w-[100px] text-sm text-gray-500">
                        &nbsp;&nbsp;
                          {new Date(
                            data.createdDate
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap min-w-[100px] text-sm text-gray-500">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {data.updatedDate
                            ? <span className="ml-1">{new Date(data.updatedDate).toLocaleDateString()}</span>
                            : <span className="ml-6">N/A</span>
                          }
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                     {/* <Tooltip text="Edit organization"> */}
                            <button
                              onClick={() => handleUpdateCategory(data._id, data.name)}
                              className="mr-5 text-yellow-600 mx-2 hover:text-yellow-900 transition-colors focus:outline-none"
                            >
                              <Edit size={18} />
                            </button>
                      {/* </Tooltip> */}
                          
                      {/* <Tooltip text="Delete organization"> */}
                            <button
                              onClick={() => handleDeleteCategory(data._id, data.name)}
                              className="text-red-600 hover:text-red-900 transition-colors focus:outline-none"
                            >
                              <Trash2 size={18} />
                            </button>
                      {/* </Tooltip> */}
                        </td>

                      </tr>
                    );
                  })
                ) : (!err &&
                  <tr>
                  <td colSpan="5"
                  className="p-6 text-center text-gray-500 text-base font-medium bg-gray-50 rounded-md mt-4"
                  >
                    <div className={`${showFilters
                                        ? filterCount > 0 ? "pt-11 pb-12" : "pt-18 pb-19"
                                        : filterCount > 0 ? "pt-18 pb-24" : "pt-25 pb-30"
                                      }
                                    flex flex-col items-center space-y-2`}
                    >
                    <FolderOpen className="w-10 h-10 text-gray-400" /> 
                    <span>No feedbacks available.</span>
                    </div>
                  </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    {isOpenCategoryForm && <AddGalleryCategory closeModal={closeAddCategoryModal} refreshCategories={refreshCategories}/>}

    {isOpenCategoryUpdate && <UpdateGalleryCategory closeModal={closeUpdateCategoryModal} refreshCategories={refreshCategories} updateId={updateId} updateName={updateName}/>}

    {/* Confirmation Modal */}
    <ConfirmationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={confirmDelete}
      title="Confirm Deletion"
      message={`Are you sure you want to delete category - ${deleteName}?`}
    />

    </>
  );
};

export default ShowGalleryCategories;