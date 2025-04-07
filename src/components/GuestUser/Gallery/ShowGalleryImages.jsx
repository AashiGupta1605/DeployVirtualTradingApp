import React, { useState, useEffect } from "react";
import { FolderOpen, Images } from "lucide-react";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";

import CategoryImagesCards from "./CategoryImagesCards";

const ShowGalleryImages = () => {

  const [galleryCategories, setGalleryCategories] = useState([]);
  const [err, setErr] = useState("");

  const [search, setSearch] = useState("all");
  
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
    <nav className={`fixed z-20 border-1 border-gray-200 flex items-center justify-between p-2 bg-white shadow-lg rounded-lg ml-4`} style={{ width: "98%"}}> 
  
          {/* Left Side (1 Column) */}
          <div className="w-1/5 flex items-center space-x-2">
            <Images className="w-7 h-[1.625rem] font-medium text-blue-600 pr-[3px] ml-2" />
            <h2 className="text-xl font-bold text-gray-800">Gallery Images</h2>
          </div>
    
          {/* Right Side (4 Columns) */}
          <div className="w-4/5 flex justify-end space-x-8">
            <div className="relative w-[260px] mr-3">
              <select
              value={search}
              onChange={(e) => setSearch(e.target.value)||"all"}
              className="border border-gray-400 pl-3 pr-2 py-2 rounded-lg w-full h-[39px] focus:outline-none focus:shadow-md focus:border-black"
              >
                <option disabled>Select Gallery Category</option>
                <option value="all">All Categories</option>
                {galleryCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

      </nav>    <br/><br/><br/>

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
            search==="all" ? (
              galleryCategories.map((data, index) => (
                <div key={index}>
                  <CategoryImagesCards categoryName={data.name}/>
                </div>
              ))
            ) : (
                  <CategoryImagesCards categoryName={search}/>
                )
          ) : (
              <div className="flex items-center justify-center h-[80vh] w-full">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <FolderOpen className="w-16 h-16 text-gray-400" />
                  <h4 className="text-gray-500 text-sm">
                    Empty Gallery!!.
                  </h4>
                </div>
              </div>
              )
        }

    </>
  );
};

export default ShowGalleryImages;