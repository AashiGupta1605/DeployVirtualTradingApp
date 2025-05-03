import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";
import { toast } from 'react-hot-toast';
import { Camera, Check, ChevronsUpDown, X } from 'lucide-react';

const AddGalleryImage = ({ closeModal, refreshData }) => {
  const [categories, setCategories] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const fetchGalleryCategories = useCallback(async () => {
    setFetchError("");
    try {
      const response = await axios.get(
        `${BASE_API_URL}/admin/galleryCategory/getGalleryCategories/all/name/increasing`
      );
      const categoryData = response.data?.categoryData || [];
      setCategories(categoryData);

      if (categoryData.length === 0) {
        setFetchError("No categories found. Please add a category first.");
        toast.error("No categories found to select from.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to fetch categories. Cannot add image.";
      console.error("Error fetching categories:", error);
      setFetchError(errorMsg);
      toast.error(errorMsg);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchGalleryCategories();
  }, [fetchGalleryCategories]);

  const initialValues = {
    categoryName: "",
    title: "",
    desc: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required("Category Name is required"),
    title: Yup.string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .min(5, "Title must be at least 8 characters")
      .max(50, "Title must be at most 50 characters"),
    desc: Yup.string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .min(15, "Description must be at least 15 characters")
      .max(200, "Description must be at most 200 characters"),
    photo: Yup.mixed()
      .required("An image file is required")
      .test('is-base64-string', 'Image data is not valid. Please re-upload.', value => {
          return typeof value === 'string' && /^[A-Za-z0-9+/]+={0,2}$/.test(value);
      }),
  });

  const handleImageUpload = useCallback((event, setFieldValue, setFieldError) => {
    const file = event.target.files?.[0];

    if (!file) {
      setFieldValue("photo", null);
      setFieldError("photo", undefined);
      return;
    }

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      const errorMsg = "Invalid file type (JPG, PNG, GIF, WEBP only).";
      toast.error(errorMsg);
      setFieldError("photo", errorMsg);
      setFieldValue("photo", null);
      event.target.value = null;
      return;
    }

    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const errorMsg = `Image size exceeds ${maxSizeMB}MB limit.`;
      toast.error(errorMsg);
      setFieldError("photo", errorMsg);
      setFieldValue("photo", null);
      event.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          setFieldValue("photo", base64String);
          setFieldError("photo", undefined);
          toast.success("Image ready!");
        } else {
          throw new Error("Could not extract base64 data.");
        }
      } catch (readError) {
        console.error("Error processing file reader result:", readError);
        toast.error("Failed to process image.");
        setFieldError("photo", "Failed to process image.");
        setFieldValue("photo", null);
      }
    };
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      toast.error("Error reading file.");
      setFieldError("photo", "Error reading file.");
      setFieldValue("photo", null);
    };
    reader.readAsDataURL(file);
  }, []);

  const addGalleryImage = async (values, { resetForm, setSubmitting, setFieldError }) => {
    if (!values.photo || typeof values.photo !== 'string') {
      setFieldError("photo", "Image data is missing or invalid. Please re-upload.");
      toast.error("Image data missing. Please re-upload.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        photo: values.photo,
        categoryName: values.categoryName,
        title: values.title || null,
        desc: values.desc || null,
      };

      console.log("Submitting Gallery Item Payload:", {
          ...payload,
          photo: payload.photo ? `Base64 string (${(payload.photo.length * 0.75 / 1024).toFixed(2)} KB)` : 'None'
      });

      const response = await axios.post(
        `${BASE_API_URL}/admin/gallery/addGalleryItem`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Add Gallery Item API Response:", response);

      if (response?.status === 201) {
        toast.success(response.data?.message || "Image added successfully!");
        resetForm();
        if (refreshData) {
          refreshData();
        }
        closeModal();
      } else {
        toast.warn(response.data?.message || 'Received an unexpected success status.');
      }

    } catch (error) {
      console.error("Error submitting gallery item:", error.response || error);
      const errorMsg = error.response?.data?.message || "Submission failed. Please try again.";
      toast.error(errorMsg);

      const fieldErrors = error.response?.data?.fieldErrors;
      if (fieldErrors && typeof setFieldError === 'function') {
         Object.entries(fieldErrors).forEach(([field, message]) => {
            setFieldError(field, message);
         });
      } else if (error.response?.status === 400 && errorMsg.toLowerCase().includes('category')) {
          if (typeof setFieldError === 'function') setFieldError('categoryName', errorMsg);
      } else if (error.response?.status === 400 && errorMsg.toLowerCase().includes('photo')) {
          if (typeof setFieldError === 'function') setFieldError('photo', errorMsg);
      }
    } finally {
      if (typeof setSubmitting === 'function') {
         setSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={closeModal} />

      {/* Modal Box */}
      <div style={{ width: "100%", maxWidth: "90%" }} className="relative w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Register New Image
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {fetchError && (
          <div className="p-3 mx-5 mt-4 text-sm rounded-md text-yellow-800 bg-yellow-100 border border-yellow-200 flex items-center gap-2 flex-shrink-0">
            <X className="h-4 w-4 text-yellow-600" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* Form */}
        <div className="p-4 md:p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={addGalleryImage}
            enableReinitialize
          >
            {({ isSubmitting, isValid, setFieldValue, setFieldError, errors, touched, values }) => (
              <Form className="space-y-6">
                <div className="flex flex-col md:flex-row gap-5 max-h-[300px] overflow-y-auto">
                  <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Category Name <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <Listbox
                          value={values.categoryName}
                          onChange={(value) => setFieldValue("categoryName", value)}
                          disabled={categories.length === 0}
                        >
                          <div className="relative">
                            <Listbox.Button className={`relative w-full cursor-default rounded-xl border ${
                              touched.categoryName && errors.categoryName ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:border-lightBlue-500 focus:ring-lightBlue-500'
                            } bg-white py-3 px-4 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}>
                              <span className={`block truncate ${values.categoryName ? 'text-gray-900' : 'text-gray-400'}`}>
                                {values.categoryName || "Select Category"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={React.Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-20 mt-1 max-h-40 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {categories.length > 0 ? categories.map((category) => (
                                  <Listbox.Option
                                    key={category._id}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-lightBlue-100 text-lightBlue-900' : 'text-gray-900'
                                      }`
                                    }
                                    value={category.name}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                          {category.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lightBlue-600">
                                            <Check className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                )) : (
                                  <div className="relative cursor-default select-none py-2 px-4 text-gray-500">No categories available</div>
                                )}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                        {touched.categoryName && errors.categoryName && (
                          <div className="text-red-600 text-xs mt-1">{errors.categoryName}</div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Event Image <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          id="photo"
                          type="file"
                          name="photo"
                          accept="image/jpeg, image/png, image/gif, image/webp"
                          onChange={(event) => handleImageUpload(event, setFieldValue, setFieldError)}
                          className={`block w-full text-sm text-gray-500 border ${
                            touched.photo && errors.photo ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:border-lightBlue-500 focus:ring-lightBlue-500'
                          } rounded-xl shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-lightBlue-50 file:text-lightBlue-700 hover:file:bg-lightBlue-100 focus:outline-none focus:ring-1 file:cursor-pointer file:transition-colors file:duration-150`}
                        />
                        {touched.photo && errors.photo && (
                          <div className="text-red-600 text-xs mt-1">{errors.photo}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 pt-3 pb-3 rounded-xl flex-1">
                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Title <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <Field
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Enter title (max 50 chars)"
                          className={`block w-full px-4 py-3 rounded-xl border ${
                            touched.title && errors.title ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:border-lightBlue-500 focus:ring-lightBlue-500'
                          } shadow-sm text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none transition duration-150 ease-in-out`}
                        />
                        {touched.title && errors.title && (
                          <div className="text-red-600 text-xs mt-1">{errors.title}</div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Description <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <Field
                          id="desc"
                          as="textarea"
                          name="desc"
                          placeholder="Enter description (max 200 chars)"
                          className={`block w-full px-4 py-3 rounded-xl border ${
                            touched.desc && errors.desc ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:border-lightBlue-500 focus:ring-lightBlue-500'
                          } shadow-sm text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none transition duration-150 ease-in-out resize-none h-32`}
                          rows={4}
                        />
                        {touched.desc && errors.desc && (
                          <div className="text-red-600 text-xs mt-1">{errors.desc}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="sticky flex justify-end items-center space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="mr-3 px-4 py-2 md:px-6 md:py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid || categories.length === 0}
                    className="px-4 py-2 md:px-6 md:py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Register Image"}
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

AddGalleryImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  refreshData: PropTypes.func,
};

export default AddGalleryImage;