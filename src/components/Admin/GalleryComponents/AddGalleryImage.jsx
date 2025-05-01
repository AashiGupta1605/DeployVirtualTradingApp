// Have to do work

import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { Listbox } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";
import { toast } from 'react-hot-toast';
import './Gallery.css'

// const AddGalleryImage = ({ closeModal }) => {

//   const [categories, setCategories] = useState([]);
//   const [err, setErr] = useState("");

//   const fetchGalleryCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_API_URL}/admin/galleryCategory/getGalleryCategories/name/increasing`
//       );
//       setCategories(response.data.categoryData);
//       console.log("Gallery Categories: ", response.data);
//     } 
//     catch (error) {
//       if (error.response) {
//         setErr(error.response?.data?.message);
//       }
//       else{
//         setErr("Something went wrong.")
//       }
//       throw error; 
//     }
//   };
    
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         fetchGalleryCategories()
//         setErr("");
//       } 
//       catch (error) {
//         setErr(error.response?.data?.message || "Something went wrong.");
//       }
//     };
//     fetchData();
//   }, []);

//   const initialValues = {
//     categoryName: "",
//     title: null,
//     desc: null,
//     photo: "", 
//   };

//   const validationSchema = Yup.object({
//     categoryName: Yup.string()
//       .required("Category name is required")
//       .trim(), 
  
//     title: Yup.string()
//       .nullable()
//       .notRequired()
//       .min(8, "Title must be at least 8 characters")
//       .max(80, "Title must be at most 80 characters"),
  
//     desc: Yup.string()
//       .nullable()
//       .notRequired()
//       .min(15, "Description must be at least 15 characters")
//       .max(600, "Description must be at most 600 characters"),
    
//     // photo: Yup.string()
//     //   .required("Photo is required")
//     //   .matches(/^https?:\/\/.+\..+/, "Invalid URL. Please re-upload the image."),

//     // photo: Yup.string()
//     //   .required("Photo is required")
//     //   .url("Invalid URL. Please re-upload the image."),

//     photo: Yup.mixed()
//     .required("Photo is required")
//     .test("fileSize", "File too large (max 15MB)", (value) => {
//     if (!value) return true;
//     return value.size <= 15 * 1024 * 1024; // 5MB
//     })
//     .test("fileType", "Unsupported file format", (value) => {
//     if (!value) return true;
//     return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type);
//     }),

//   });  

//   const handlePageRefresh = () => {
//     const delay = 2000; // Time delay in milliseconds (3 seconds)
//     setTimeout(() => {
//       window.location.reload();
//     }, delay);
//   };
  
//   const handleImageUpload = async (event, setFieldValue) => {
//     const file = event.target.files[0];

//     if (!file) {
//       toast("First, Choose any file...", {
//         icon: '⚠️',
//       })
//       return
//     } 

//     try{
//       setFieldValue("photo", file);
//       toast.success("Image uploaded successfully!");
//     }
//     catch (error) {
//       console.error("Upload failed", error);
//       toast.error("Image upload failed!");
//     }
//   };  

//   const addGalleryImage = async (values, { resetForm }) => {

//     if (!values.photo) {
//       toast("Please upload an image!", {
//         icon: '⚠️',
//       });
//       return;
//     }  
//     try {
//       const formData = new FormData();
//       formData.append('photo', values.photo);
//       formData.append('categoryName', values.categoryName);
//       if (values.title) formData.append('title', values.title);
//       if (values.desc) formData.append('desc', values.desc);
      
//       const response = await axios.post(
//         `${BASE_API_URL}/admin/gallery/addGalleryItem`, formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//         }
//       );
//       console.log("Add Gallery Item Response:", response);

//       if(response?.status === 201){
//         console.log("Form submitted successfully", response.data);
//         toast.success(response?.data?.message);
//         resetForm()
//         handlePageRefresh()
//       }
//       else if (response?.status === 409) {
//         toast(response?.data?.message, {
//           icon: '⚠️',
//         });
//         return
//       }
//       else if (response.status === 500) {
//         toast(response?.data?.message, {
//           icon: '🛑',
//         });
//         return
//       }
//     } 
//     catch (error) {
//       console.error("Error submitting data:", error);
//       if (error.response) {
//         const { status, data } = error.response;
//         if (status === 409) {
//           // toast.warning(data?.message);
//           toast(data?.message, {
//             icon: '⚠️',
//           });
//         } 
//         else if (status === 500) {
//           // toast.error(data?.message);
//           toast(data?.message, {
//             icon: '🛑',
//           })
//         } 
//         else {
//           toast.error(data?.message || "Unknown error, please try again.");
//         }
//       } 
//       else {
//         toast.error("An internal server error occurred!");
//       }  
//       throw error; 
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-gray-900 opacity-50"
//         onClick={closeModal}
//       />

//       {/* Modal Box */}
//       <div
//         style={{ width: "100%", maxWidth: "80%" }}
//         className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               {/* <i className="fas fa-photo-video text-white fa-lg" /> */}
//               <i className="fas fa-camera-retro text-white fa-lg" />
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Register New Image
//             </h2>
//           </div>
//           <button
//             onClick={closeModal}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600" />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="p-6">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={addGalleryImage}
//           >
//             {({ isSubmitting, isValid, setFieldValue}) => (
//               <Form className="space-y-6">
//                 <div className="flex flex-col md:flex-row gap-5">
//                   <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
//                     <div className="space-y-6">

//                       <FormField
//                         required
//                         label="Category Name"
//                         // type="text"
//                         type="select"
//                         name="categoryName"
//                         options={categories}
//                         className="max-h-[150px] overflow-y-auto"
//                         placeholder="Select Category"
//                       />

//                       <FormField
//                         required
//                         label="Event Image"
//                         type="file"
//                         name="photo"
//                         accept="image/*"
//                         // placeholder="Enter image URL"
//                         onChange={(event) => handleImageUpload(event, setFieldValue)}
//                         // className="file-input"
//                       />
        
//                     </div>
//                   </div>

//                   <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
//                     <div className="space-y-6">

//                       <FormField
//                         label="Title(Optional)"
//                         type="text"
//                         name="title"
//                         placeholder="Enter Title"
//                       />

//                       <FormField
//                         label="Description(Optional)"
//                         // as="textarea"
//                         type="text"
//                         name="desc"
//                         placeholder="Enter description"
//                         className=" h-auto min-h-40 max-h-50 overflow-y-auto break-words text-base block"
//                       />
                    
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     disabled={isSubmitting }
//                     className="mr-3 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || !isValid}
//                     className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center"
//                   >
//                     {isSubmitting ? "Saving...." : "Register Image"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

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
    photo: "", 
  };

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required("Category name is required")
      .trim(), 
  
    title: Yup.string()
      .nullable()
      .notRequired()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must be at most 50 characters"),
  
    desc: Yup.string()
      .nullable()
      .notRequired()
      .min(15, "Description must be at least 15 characters")
      .max(200, "Description must be at most 200 characters"),
    
    photo: Yup.string()
    .nullable()
    .required("Photo is required")
    .test('is-base64', 'Invalid Image. Please Re-Upload Image.', value => {
    if (!value) return false;
    try {
      return /^[A-Za-z0-9+/]+={0,2}$/.test(value);
    } 
    catch (err) {
      return false;
    }
  }),

  });  

  const handlePageRefresh = () => {
    const delay = 2000; // Time delay in milliseconds (3 seconds)
    setTimeout(() => {
      window.location.reload();
    }, delay);
  };
  
  const handleImageUpload = async (event, setFieldValue, setTouched) => {
    const file = event.target.files[0];

    if (!file) {
      toast("First, Choose any file...", {
        icon: '⚠️',
      })
      return
    } 

    if (!file.type.match('image.*')) {
      toast.error("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    try{
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Remove the data URL prefix
        setFieldValue("photo", base64String);
        setTouched({ photo: true });
        toast.success("Image ready for upload!");
      };
      reader.readAsDataURL(file);
    }
    catch (error) {
      console.error("Upload failed", error);
      toast.error("Image upload failed!");
    }
  };  

  const addGalleryImage = async (values, { resetForm }) => {

    if (!values.photo) {
      toast("Please upload an image!", {
        icon: '⚠️',
      });
      return;
    }  
    try {
      const payload = {
        photo: values.photo, // This is now the base64 string
        categoryName: values.categoryName,
        title: values.title || null,
        desc: values.desc || null
      };
      
      const response = await axios.post(
        `${BASE_API_URL}/admin/gallery/addGalleryItem`, payload,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      console.log("Add Gallery Item Response:", response);

      if(response?.status === 201){
        console.log("Form submitted successfully", response.data);
        toast.success(response?.data?.message);
        resetForm()
        handlePageRefresh()
      }
      else if (response?.status === 409) {
        toast(response?.data?.message, {
          icon: '⚠️',
        });
        return
      }
      else if (response.status === 500) {
        toast(response?.data?.message, {
          icon: '🛑',
        });
        return
      }
    } 
    catch (error) {
      console.error("Error submitting data:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          // toast.warning(data?.message);
          toast(data?.message, {
            icon: '⚠️',
          });
        } 
        else if (status === 500) {
          // toast.error(data?.message);
          toast(data?.message, {
            icon: '🛑',
          })
        } 
        else {
          toast.error(data?.message || "Unknown error, please try again.");
        }
      } 
      else {
        toast.error("An internal server error occurred!");
      }  
      throw error; 
    }
  };

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
    //   <div
    //     className="fixed inset-0 bg-gray-900 opacity-50"
    //     onClick={closeModal}
    //   />

    //   {/* Modal Box */}
    //   <div
    //     style={{ width: "100%", maxWidth: "80%" }}
    //     className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
    //   >
    //     {/* Header */}
    //     <div className="flex justify-between items-center p-6 border-b border-gray-100">
    //       <div className="flex items-center space-x-3">
    //         <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
    //           {/* <i className="fas fa-photo-video text-white fa-lg" /> */}
    //           <i className="fas fa-camera-retro text-white fa-lg" />
    //         </div>
    //         <h2 className="text-2xl font-semibold text-gray-800">
    //           Register New Image
    //         </h2>
    //       </div>
    //       <button
    //         onClick={closeModal}
    //         className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
    //       >
    //         <i className="fas fa-times text-gray-400 hover:text-gray-600" />
    //       </button>
    //     </div>

    //     {/* Form */}
    //     <div className="p-6">
    //       <Formik
    //         initialValues={initialValues}
    //         validationSchema={validationSchema}
    //         onSubmit={addGalleryImage}
    //       >
    //         {({ isSubmitting, isValid, setFieldValue, setTouched }) => (
    //           <Form className="space-y-6">
    //             <div className="flex flex-col md:flex-row gap-5">
    //               <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
    //                 <div className="space-y-6">

    //                   <FormField
    //                     required
    //                     label="Category Name"
    //                     // type="text"
    //                     type="select"
    //                     name="categoryName"
    //                     options={categories}
    //                     className="max-h-[150px] overflow-y-auto"
    //                     placeholder="Select Category"
    //                   />

    //                   <FormField
    //                     required
    //                     label="Event Image"
    //                     type="file"
    //                     name="photo"
    //                     accept="image/*"
    //                     onChange={(event) => handleImageUpload(event, setFieldValue, setTouched)}
    //                     className="file-input"
    //                   />
        
    //                 </div>
    //               </div>

    //               <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
    //                 <div className="space-y-6">

    //                   <FormField
    //                     label="Title(Optional)"
    //                     type="text"
    //                     name="title"
    //                     placeholder="Enter title"
    //                   />

    //                   <FormField
    //                     label="Description(Optional)"
    //                     // as="textarea"
    //                     type="text"
    //                     name="desc"
    //                     placeholder="Enter description"
                        
    //                   />
                    
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Action Buttons */}
    //             <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
    //               <button
    //                 type="button"
    //                 onClick={closeModal}
    //                 disabled={isSubmitting }
    //                 className="mr-3 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
    //               >
    //                 Cancel
    //               </button>
    //               <button
    //                 type="submit"
    //                 disabled={isSubmitting || !isValid}
    //                 className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center"
    //               >
    //                 {isSubmitting ? "Saving...." : "Register Image"}
    //               </button>
    //             </div>
    //           </Form>
    //         )}
    //       </Formik>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
  <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={closeModal} />

  {/* Modal Box */}
  <div style={{ width: "100%", maxWidth: "80%" }} className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
    {/* Header */}
    <div className="flex justify-between items-center p-6 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
          <i className="fas fa-camera-retro text-white fa-lg" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Register New Image</h2>
      </div>
      <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
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
        {({ isSubmitting, isValid, setFieldValue, setTouched }) => (
          <Form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-5 max-h-[300px]  overflow-y-auto ">
              <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
                <div className="space-y-6">
                  <FormField
                    required
                    label="Category Name"
                    type="select"
                    name="categoryName"
                    options={categories}  // Make sure you pass the categories array
                    className="max-h-[150px] overflow-y-auto"
                    placeholder="Select Category"
                  />

                  <FormField
                    required
                    label="Event Image"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, setFieldValue, setTouched)}
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
                    placeholder="Enter title"
                  />

                  <FormField
                    label="Description (Optional)"
                    type="textarea"  // Change the type to "textarea"
                    name="desc"
                    placeholder="Enter description"
                    className="resize-none h-32"
                  />
                  
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="mr-3 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center"
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

// const FormField = ({ 
//   name, 
//   label, 
//   required = false, 
//   type = "text", 
//   placeholder, 
//   className = "", 
//   options = [], 
//   onChange  // Add this prop
// }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
    
//     {type === "file" ? (
//       <input
//         type="file"
//         name={name}
//         accept="image/*"
//         onChange={(e) => {
//           e.persist();
//           onChange(e);  // Use the passed onChange prop
//         }}
//         className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                     bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
//                     focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
//       />
//     ) : type === "select" ? (
//       <Field 
//         as="select" 
//         name={name} 
//         className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                     bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
//                     focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
//       >
//         <option value="" disabled>Select Category</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.name}>
//             {option.name}
//           </option>
//         ))}
//       </Field>
//     ) : (
//       <Field
//         type={type}
//         name={name}
//         className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                     bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
//                     focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
//         placeholder={placeholder}
//       />
//     )}

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
//   </div>
// );
const FormField = ({
  name,
  label,
  required = false,
  type = "text",
  placeholder,
  className = "",
  options = [],
  onChange, // For file input
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    {/* File Input */}
    {type === "file" ? (
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => {
          e.persist();
          onChange(e); // Use the passed onChange prop
        }}
        className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
                    bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
                    focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
      />
    ) : type === "select" ? (
      <Field name={name}>
        {({ field, form }) => (
          <div className="relative">
            <Listbox
              value={options.find((option) => option.name === field.value) || null}
              onChange={(selected) => form.setFieldValue(name, selected.name)}
            >
              <Listbox.Button className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue-600">
                {field.value ? field.value : "Select Category"}
              </Listbox.Button>

              <Listbox.Options className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl max-h-[150px] overflow-y-auto shadow-lg">
                {options.map((option, index) => (
                  <Listbox.Option key={index} value={option} disabled={!option}>
                    {({ active }) => (
                      <div
                        className={`cursor-pointer px-4 py-1 ${
                          active ? "bg-lightBlue-600 text-white" : "text-black"
                        }`}
                      >
                        {option.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        )}
      </Field>
    ) : type === "textarea" ? (
      <Field
        as="textarea"
        name={name}
        className={`${className} shadow-sm w-full px-4 py-3 h-[120px] resize-none !rounded-xl border !border-gray-200 
                    bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
                    focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
        placeholder={placeholder}
      />
    ) : (
      <Field
        type={type}
        name={name}
        className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
                    bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
                    focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
        placeholder={placeholder}
      />
    )}

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);
// const FormField = ({ name, label, required = false, type = "text", placeholder, className = "", options = [] }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
    
//     {type === "select" ? (
//       <Field as="select" name={name} className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                         bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
//                         focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}>

//         <option value="" disabled>Select Category</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.name}>
//             {option.name}
//           </option>
//         ))}
        
//       </Field>
//     ) : (
//       <Field
//         type={type}
//         name={name}
//         className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                         bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
//                         focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
//         placeholder={placeholder}
//       />
//     )}

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
//   </div>
// );

AddGalleryImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default AddGalleryImage;






// import React, {useState, useEffect} from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { BASE_API_URL } from "../../../utils/BaseUrl";
// import { toast } from 'react-hot-toast';
// import './Gallery.css'

// const AddGalleryImage = ({ closeModal }) => {

//   const [categories, setCategories] = useState([]);
//   const [err, setErr] = useState("");

//   const fetchGalleryCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_API_URL}/admin/galleryCategory/getGalleryCategories/name/increasing`
//       );
//       setCategories(response.data.categoryData);
//       console.log("Gallery Categories: ", response.data);
//     } 
//     catch (error) {
//       if (error.response) {
//         setErr(error.response?.data?.message);
//       }
//       else{
//         setErr("Something went wrong.")
//       }
//       throw error; 
//     }
//   };
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           fetchGalleryCategories()
//           setErr("");
//         } 
//         catch (error) {
//           setErr(error.response?.data?.message || "Something went wrong.");
//         }
//       };
//       fetchData();
//     }, []);

//   const initialValues = {
//     categoryName: "",
//     title: null,
//     desc: null,
//     photo: null, //to handle file uploads
//   };

//   const validationSchema = Yup.object({
//     categoryName: Yup.string()
//       .required("Category name is required")
//       .trim(), 
  
//     title: Yup.string()
//       // .transform((value) => (value === "" ? null : value)) // Convert empty string to null
//       .nullable()
//       .notRequired()
//       .min(8, "Title must be at least 8 characters")
//       .max(80, "Title must be at most 80 characters"),
  
//     desc: Yup.string()
//       // .transform((value) => (value === "" ? null : value)) // Convert empty string to null
//       .nullable()
//       .notRequired()
//       .min(15, "Description must be at least 15 characters")
//       .max(600, "Description must be at most 600 characters"),
    
//     photo: Yup.mixed()
//       .required("Photo is required")
//       .test("fileType", "Only image files are allowed", (value) => {
//       return value instanceof File || typeof value === "string";
//     }),


//     // photo: Yup.string()
//     //   .url("Invalid URL")
//     //   .required("Photo (image URL) is required")
//     //   .trim(),
  
//   });  

//   const handlePageRefresh = () => {
//     const delay = 2000; // Time delay in milliseconds (3 seconds)
//     setTimeout(() => {
//       window.location.reload();
//     }, delay);
//   };

//   const handleImageUpload = async (event, setFieldValue) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast("First, Choose any file...", {
//         icon: '⚠️',
//       })
//       return
//     } 
  
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "PGR - Virtual Trading App Gallery"); // Replace with Cloudinary preset
//     formData.append("cloud_name","damdh1six")
//     try {
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/damdh1six/image/upload",
//         formData
//       );
//       setFieldValue("photo", response.data.url); // Store image URL in Formik state
//       toast.success("Image uploaded successfully!");
//     } 
//     catch (error) {
//       console.error("Upload failed", error);
//       toast.error("Image upload failed!");
//     }
//   };  

//   const addGalleryImage = async (values, { resetForm }) => {

//     if (!values.photo) {
//       toast("Please upload an image!", {
//          icon: '⚠️',
//       });
//       return;
//     }  
//     try {
//       const response = await axios.post(
//         `${BASE_API_URL}/admin/gallery/addGalleryItem`, values
//       );
//       console.log("Add Gallery Item Response:", response);

//       if(response?.status === 201){
//         console.log("Form submitted successfully", response.data);
//         toast.success(response?.data?.message);
//         resetForm()
//         handlePageRefresh()
//       }
//       else if (response?.status === 409) {
//          toast(response?.data?.message, {
//             icon: '⚠️',
//          });
//          return
//       }
//       else if (response.status === 500) {
//          toast(response?.data?.message, {
//             icon: '🛑',
//          });
//         return
//       }
//     } 
//     catch (error) {
//       console.error("Error submitting data:", error);
//       if (error.response) {
//        const { status, data } = error.response;
//        if (status === 409) {
//          // toast.warning(data?.message);
//          toast(data?.message, {
//            icon: '⚠️',
//          });
//        } 
//        else if (status === 500) {
//          // toast.error(data?.message);
//          toast(data?.message, {
//            icon: '🛑',
//          })
//        } 
//        else {
//          toast.error(data?.message || "Unknown error, please try again.");
//        }
//      } 
//      else {
//        toast.error("An internal server error occurred!");
//      }  
//       throw error; 
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       <div
//         className="fixed inset-0 bg-gray-900 opacity-50"
//         onClick={closeModal}
//       />

//       {/* Modal Box */}
//       <div
//         style={{ width: "100%", maxWidth: "80%" }}
//         className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               {/* <i className="fas fa-photo-video text-white fa-lg" /> */}
//               <i className="fas fa-camera-retro text-white fa-lg" />
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Register New Image
//             </h2>
//           </div>
//           <button
//             onClick={closeModal}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600" />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="p-6">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={addGalleryImage}
//           >
//             {({ isSubmitting, isValid, setFieldValue}) => (
//               <Form className="space-y-6">
//                 <div className="flex flex-col md:flex-row gap-5">
//                   <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
//                     <div className="space-y-6">

//                       <FormField
//                         required
//                         label="Category Name"
//                         // type="text"
//                         type="select"
//                         name="categoryName"
//                         options={categories}
//                         className="max-h-[150px] overflow-y-auto"
//                         placeholder="Select Category"
//                       />

//                       <FormField
//                         required
//                         label="Event Image"
//                         type="file"
//                         name="photo"
//                         // placeholder="Enter image URL"
//                         onChange={(event) => handleImageUpload(event, setFieldValue)}
//                         className="file-input"
//                       />
        
//                     </div>
//                   </div>

//                   <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
//                     <div className="space-y-6">

//                       <FormField
//                         label="Title(Optional)"
//                         type="text"
//                         name="title"
//                         placeholder="Enter Title"
//                       />

//                       <FormField
//                         label="Description(Optional)"
//                         // as="textarea"
//                         type="text"
//                         name="desc"
//                         placeholder="Enter description"
//                         className=" h-auto min-h-40 max-h-50 overflow-y-auto break-words text-base block"
//                       />
                    
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     disabled={isSubmitting}
//                     className="mr-3 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || !isValid}
//                     className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center"
//                   >
//                     {isSubmitting ? "Saving...." : "Register Image"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FormField = ({ name, label, required = false, type = "text", placeholder, className = "", options = [] }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
    
//     {type === "select" ? (
//       <Field as="select" name={name} className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                         bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
//                         focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}>

//         <option value="" disabled>Select Category</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.name}>
//             {option.name}
//           </option>
//         ))}
        
//       </Field>
//     ) : (
//       <Field
//         type={type}
//         name={name}
//         className={`${className} shadow-sm w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                         bg-white text-gray-900 focus:!border-lightBlue-600 focus:ring-2 
//                         focus:!ring-lightBlue-600/20 focus:outline-none transition-all duration-200`}
//         placeholder={placeholder}
//       />
//     )}

//     <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
//   </div>
// );

// export default AddGalleryImage;





