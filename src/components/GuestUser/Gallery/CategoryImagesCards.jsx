import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FolderOpen } from "lucide-react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";

const Card = ({ image, title, description, postDate }) => {
    return (
      <div className="w-[380px] min-h-[440px] rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.5)] bg-white p-4 flex flex-col justify-between relative">
        {/* Image container with fallback */}
        {image ? (
          <img
            className="w-full h-48 object-cover rounded-xl"
            src={image}
            alt={title}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-xl text-gray-400 text-sm">
            No Image
          </div>
        )}
  
        <div className="p-4 flex flex-col justify-between flex-grow">
          {title ? 
          <h2 className="text-base font-semibold text-gray-800">{title.charAt(0).toUpperCase() + title.slice(1)}</h2> 
          : <div className="text-base font-semibold text-gray-400"> No Title </div>}
  
          {description ?
          <div className="h-24 overflow-y-auto text-gray-600 mt-2 text-sm pr-1"> {description.charAt(0).toUpperCase() + title.slice(1)} </div>
          : <div className="h-24 overflow-y-auto text-gray-400 mt-2 text-base pr-1"> No description.... </div>}
  
          {postDate && (
            <p className="max-w-34 ml-40 -mb-4 rounded-2xl pt-1 pb-1 pl-3 text-xs bg-gray-100 text-gray-600 mt-4">
              Posted on: {new Date(postDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    );
};


const CategoryImagesCards = ({ categoryName }) => {

  const [galleryItems, setGalleryItems] = useState([]);

  const [err, setErr] = useState("");

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/admin/gallery/getGalleryItems/${categoryName}`
      );
      setGalleryItems(response.data.ImageData);
      console.log("Gallery Items: ", response.data);
    } 
    catch (error) {
      if (error.response) {
        setErr(error.response?.data?.message);
      } 
      else {
        setErr("Something went wrong.");
      }
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchGalleryItems();
        setErr("");
      } 
      catch (error) {
        setErr(error.response?.data?.message || "Something went wrong.");
      }
    };
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    setCurrentIndex(0);
  }, [galleryItems]);

  const visibleFeedbacks = galleryItems.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handleNext = () => {
    if (currentIndex + itemsPerPage < galleryItems.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <>
      <div>
        <section className="mt-4 mb-8 bg-white border border-gray-200 mx-6 p-6 rounded-lg relative">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute -left-1 mr-10 top-[53%] transform -translate-y-1/2 text-3xl text-gray-500 hover:text-gray-800 disabled:opacity-30 focus:outline-none"
          >
            <BiChevronLeft />
          </button>

          {/* Flex container for headings and button */}
          <div className="flex justify-between items-center mb-6">
            {/* Left-most heading */}
            <div className="flex gap-3 items-center">
              <i className="fas fa-images text-blue-500 text-[20px] mt-[5px]"></i>
              <h3 className="text-lg font-bold text-gray-700">
                {/* {galleryItems.map((data) => (data.categoryName))} */}
                {categoryName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}
              </h3>
            </div>
            <div className="bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
              Total Images: {galleryItems.length}
            </div>
          </div>

          {/* {err && <p className="text-red-500">{err}</p>} */}

          <div className="flex justify-center gap-6">
            {err && (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="flex flex-col items-center justify-center w-96 bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                    <i className="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
                  </div>
                  <b className="text-lg text-gray-800 mt-4">
                    Oops! Something went wrong.
                  </b>
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
            )}

            {galleryItems.length > 0 ? (
              <>
                {visibleFeedbacks.map((card) => (
                  <Card
                    key={card._id}
                    image={card.photo}
                    title={card.title}
                    description={card.desc}
                    postDate={
                      card.updatedDate == null
                        ? card.createdDate
                        : card.updatedDate
                    }
                  />
                ))}
              </>
            ) : (
              !err && (
                <div className="pt-6 pb-6 flex flex-col items-center space-y-2">
                  <span>
                    <FolderOpen className="w-10 h-10 text-gray-400" />
                  </span>
                  <h4 className="text-gray-500 text-sm">
                    No Image available.
                  </h4>
                </div>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= galleryItems.length}
            className="absolute -right-1 ml-10 top-[53%] transform -translate-y-1/2 text-3xl text-gray-500 hover:text-gray-800 disabled:opacity-30 focus:outline-none"
          >
            <BiChevronRight />
          </button>
        </section>
      </div>
    </>
  );
};

Card.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    postDate: PropTypes.instanceOf(Date).isRequired,
}

CategoryImagesCards.propTypes = {
    categoryName: PropTypes.string.isRequired,
};

export default CategoryImagesCards;
