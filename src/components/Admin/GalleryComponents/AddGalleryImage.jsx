import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";
import { toast } from 'react-hot-toast';
import './Gallery.css'

const AddGalleryImage = ({ closeModal }) => {

  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState("");

  const fetchGalleryCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/admin/galleryCategory/getGalleryCategories/name/increasing`
      );
      setCategories(response.data.categoryData);
      console.log("Gallery Categories: ", response.data);
    } 
    catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.");
    }
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
    }, []);

  const initialValues = {
    categoryName: "",
    title: null,
    desc: null,
    photo: null, //to handle file uploads
  };

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required("Category name is required")
      .trim(), 
  
    title: Yup.string()
      // .transform((value) => (value === "" ? null : value)) // Convert empty string to null
      .nullable()
      .notRequired()
      .min(8, "Title must be at least 8 characters")
      .max(80, "Title must be at most 80 characters"),
  
    desc: Yup.string()
      // .transform((value) => (value === "" ? null : value)) // Convert empty string to null
      .nullable()
      .notRequired()
      .min(15, "Description must be at least 15 characters")
      .max(600, "Description must be at most 600 characters"),
    
    photo: Yup.mixed()
      .required("Photo is required")
      .test("fileType", "Only image files are allowed", (value) => {
      return value instanceof File || typeof value === "string";
    }),


    // photo: Yup.string()
    //   .url("Invalid URL")
    //   .required("Photo (image URL) is required")
    //   .trim(),
  
  });  

  const handlePageRefresh = () => {
    const delay = 3000; // Time delay in milliseconds (3 seconds)
    setTimeout(() => {
      window.location.reload();
    }, delay);
  };

  const handleImageUpload = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PGR - Virtual Trading App Gallery"); // Replace with Cloudinary preset
    formData.append("cloud_name","damdh1six")
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/damdh1six/image/upload",
        formData
      );
      setFieldValue("photo", response.data.url); // Store image URL in Formik state
      toast.success("Image uploaded successfully!");
    } 
    catch (error) {
      console.error("Upload failed", error);
      toast.error("Image upload failed!");
    }
  };  

  const addGalleryImage = async (values, { resetForm }) => {

    if (!values.photo) {
      toast.warning("Please upload an image!");
      return;
    }  
    try {
      const response = await axios.post(
        `${BASE_API_URL}/admin/gallery/addGalleryItem`, values
      );
      console.log("Add Gallery Item Response:", response);

      if(response?.status === 201){
        console.log("Form submitted successfully", response.data);
        toast.success(response?.data?.message);
        handlePageRefresh()
        resetForm()
      }
      else if (response?.status === 409) {
        toast.warning(response?.data?.message);
        return
      }
      else if (response.status === 500) {
        toast.error(response?.data?.message);
        return
      }
    } 
    catch (error) {
      console.error("Error submitting data:", error);
      toast.error('An internal server error occurred!')
      throw error; 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={closeModal}
      />

      {/* Modal Box */}
      <div
        style={{ width: "100%", maxWidth: "80%" }}
        className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              {/* <i className="fas fa-photo-video text-white fa-lg" /> */}
              <i className="fas fa-camera-retro text-white fa-lg" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Register New Image
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={addGalleryImage}
          >
            {({ isSubmitting, isValid, setFieldValue}) => (
              <Form className="space-y-6">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
                    <div className="space-y-6">

                      <FormField
                        required
                        label="Category Name"
                        // type="text"
                        type="select"
                        name="categoryName"
                        options={categories}
                        className="max-h-[150px] overflow-y-auto"
                        placeholder="Select Category"
                      />

                      <FormField
                        required
                        label="Event Image"
                        type="file"
                        name="photo"
                        // placeholder="Enter image URL"
                        onChange={(event) => handleImageUpload(event, setFieldValue)}
                        className="file-input"
                      />
        
                    </div>
                  </div>

                  <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
                    <div className="space-y-6">

                      <FormField
                        label="Title(Optional)"
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                      />

                      <FormField
                        label="Description(Optional)"
                        // as="textarea"
                        type="text"
                        name="desc"
                        placeholder="Enter description"
                        className=" h-auto min-h-40 max-h-50 overflow-y-auto break-words text-base block"
                      />
                    
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting || !isValid}
                    className="mr-3 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 flex items-center"
                  >
                    {isSubmitting ? "Saving...." : "Register Image"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

// const FormField = ({ name, label, required = false, type = "text", placeholder, className = "" }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     <Field
//       type={type}
//       name={name}
//       className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                         bg-white text-gray-900 
//                         focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
//                         focus:outline-none transition-all duration-200`}
//       placeholder={placeholder}
//     />
//     <ErrorMessage
//       name={name}
//       component="div"
//       className="text-red-500 text-sm mt-1"
//     />
//   </div>
// );

const FormField = ({ name, label, required = false, type = "text", placeholder, className = "", options = [] }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    
    {type === "select" ? (
      <Field as="select" name={name} className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
                        bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 
                        focus:!ring-blue-500/20 focus:outline-none transition-all duration-200`}>

        <option value="" disabled>Select Category</option>
        {options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
        
      </Field>
    ) : (
      <Field
        type={type}
        name={name}
        className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
                        bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 
                        focus:!ring-blue-500/20 focus:outline-none transition-all duration-200`}
        placeholder={placeholder}
      />
    )}

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);

export default AddGalleryImage;
