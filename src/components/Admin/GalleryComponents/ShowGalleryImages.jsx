import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";

const Card = ({ image, title, description }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4">
      <img className="w-full h-48 object-cover rounded-xl" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

const ShowGalleryImages = ({ sidebarExpanded }) => {

  const [galleryItems, setGalleryItems] = useState([])
    const [err, setErr] = useState("");
  
  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/admin/gallery/getGalleryItems`
      );
      setGalleryItems(response.data.ImageData);
      console.log("Gallery Items: ", response.data);
    } 
    catch (error) {
      if (error.response) {
        setErr(error.response?.data?.message);
      }
      else{
        setErr("Something went wrong.")
      }
      throw error; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchGalleryItems()
        setErr("");
      } 
      catch (error) {
        setErr(error.response?.data?.message || "Something went wrong.");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-100">
      {galleryItems.map((item) => (
        <Card key={item._id} image={item.photo} title={item.title} description={item.desc} />
      ))}
    </div>
    </>
  )
}

export default ShowGalleryImages
