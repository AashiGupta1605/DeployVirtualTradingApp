import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FolderOpen, Images, PlusCircle } from "lucide-react";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";

import AddGalleryImage from './AddGalleryImage';
import CategoryImagesCards from "./CategoryImagesCards";

const ShowGalleryImages = ({ sidebarExpanded }) => {

  const [isOpenItemForm, setIsOpenItemForm] = useState(false);
  const openAddItemModal = () => setIsOpenItemForm(true);
  const closeAddItemModal = () => setIsOpenItemForm(false);

  const [galleryCategories, setGalleryCategories] = useState([]);
  const [err, setErr] = useState("");

  const [search, setSearch] = useState("");
  const searchQuery = search.trim() === "" ? "all" : search;
  
  const fetchGalleryCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/admin/galleryCategory/getGalleryCategories/name/increasing`
      );
      setGalleryCategories(response.data.categoryData);
    } catch (error) {
      if (error.response) {
        setErr(error.response?.data?.message);
      } else {
        setErr("Something went wrong. Please try again.");
      }
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGalleryCategories();
        setErr("");
      } catch (error) {
        setErr(error.response?.data?.message || "Something went wrong.");
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <nav className={`-mt-10 z-10 border border-gray-100 flex items-center justify-between p-4 bg-white shadow-lg rounded-lg
                          ${sidebarExpanded ? 'ml-[22px] -mr-2' : 'ml-[22px] -mr-2'}
                      `} style={{ width: sidebarExpanded ? "95%" : "96%"}}> 
                      {/* backgroundColor:"#eceef0" */}
          {/* Left Side (1 Column) */}
          <div className="w-1/5 flex items-center space-x-2">
            <Images className="w-7 h-[1.625rem] font-medium text-gray-600 pr-[3px]" />
            <h2 className="text-xl font-bold text-gray-800">Gallery Images</h2>
          </div>
    
          {/* Right Side (4 Columns) */}
          <div className="w-4/5 flex justify-end space-x-8">
            <div className="relative w-[270px]">
              <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              alt="search"
              className="absolute left-3 top-1/4 transform -translate-y-1/2 w-4 h-4"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value||"")}
                className="border border-gray-400 pl-10 pr-0 py-2 rounded-lg w-full h-[39px] focus:outline-none focus:shadow-md focus:border-black"
              />
            </div>
    
            <button
              onClick={openAddItemModal}
              className="mr-3 h-[2.35rem] px-4 bg-lightBlue-600 text-white rounded-lg 
              hover:bg-lightBlue-700 transition-colors flex items-center"
            >
            <PlusCircle size={18} className="mr-2" />
            <span className="font-medium">Add Image</span>
            </button>
          </div>
      </nav>


      {err ? (
        <div className="flex items-center justify-center h-[80vh] w-full">
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-md p-6 max-w-md">
            <span className="text-red-500 text-4xl mb-2">
              <i className="fas fa-exclamation-circle"></i>
            </span>
            <b className="text-lg text-gray-700 mb-1">Error Loading Content</b>
            <h4 className="text-gray-500 text-sm mb-1">No content available</h4>
            <p className="text-red-500 text-sm text-center">{err}</p>
          </div>
        </div>
      ) : galleryCategories.length > 0 ? (
            searchQuery==="all" ? (
              galleryCategories.map((data, index) => (
                <div key={index}>
                  <CategoryImagesCards categoryName={data.name}/>
                </div>
              ))
            ) : (
                  <CategoryImagesCards categoryName={searchQuery}/>
                )
          ) : (
              <div className="flex items-center justify-center h-[80vh] w-full">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <FolderOpen className="w-16 h-16 text-gray-400" />
                  <h4 className="text-gray-500 text-sm">
                    No Categories available in Gallery.
                  </h4>
                </div>
              </div>
              )
        }

      {isOpenItemForm && <AddGalleryImage closeModal={closeAddItemModal}/>}
    </>
  );
};

ShowGalleryImages.propTypes = {
  sidebarExpanded: PropTypes.bool.isRequired,
};

export default ShowGalleryImages;