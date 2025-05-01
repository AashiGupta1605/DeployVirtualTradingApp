// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import PropTypes from 'prop-types';
// import { toast } from 'react-hot-toast';
// import {
//   registerOrganization,
//   updateOrganization,
//   resetForm,
//   selectRegistrationState
// } from '../../../redux/Admin/OrganizationListPage/OrganizationRegisterSlice';
// import { fetchOrganizations } from '../../../redux/Organization/auth/organizationAuthSlice';

// const OrganizationRegistrationForm = ({ isOpen, onClose, selectedOrg, onSuccess }) => {
//   const dispatch = useDispatch();
//   const {
//     isLoading,
//     error,
//     success,
//     notification
//   } = useSelector(selectRegistrationState);

//   const initialValues = useMemo(() => ({
//     name: selectedOrg?.name || "",
//     address: selectedOrg?.address || "",
//     website: selectedOrg?.website || "",
//     contactPerson: selectedOrg?.contactPerson || "",
//     email: selectedOrg?.email || "",
//     mobile: selectedOrg?.mobile || "",
//     approvalStatus: selectedOrg?.approvalStatus || "approved",
//   }), [selectedOrg]);

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .required("Organization Name is required")
//       .min(3, "Name must be at least 3 characters")
//       .max(50, "Name must be less than 50 characters")
//       .max(100, "Name must not exceed 100 characters"),
//     address: Yup.string()
//       .required("Address is required")
//       .min(5, "Address must be at least 5 characters"),
//     website: Yup.string()
//       .url("Invalid URL format")
//       .nullable(),
//     contactPerson: Yup.string()
//       .required("Contact Person is required")
//       .min(2, "Contact person name must be at least 2 characters"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     mobile: Yup.string()
//       .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
//       .required("Mobile number is required"),
//   });

//   const generatePassword = (orgName) => {
//     const symbols = ['@', '#', '$', '%', '&', '*', '!'];
//     const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
//     const randomNumbers = Math.floor(Math.random() * 900 + 100);
//     return `${orgName}${randomSymbol}${randomNumbers}`;
//   };

//   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
//     try {
//       const cleanedValues = Object.fromEntries(
//         Object.entries(values)
//           .filter(([key, value]) =>
//             value !== undefined &&
//             value !== '' &&
//             !['_id', 'password', 'createDate', 'updateDate', '__v'].includes(key)
//           )
//       );

//       if (selectedOrg) {
//         const updateResult = await dispatch(updateOrganization({
//           id: selectedOrg._id,
//           data: cleanedValues
//         })).unwrap();
//         toast.success(updateResult.message || 'Organization updated successfully!');
//         await dispatch(fetchOrganizations());
//         onClose();
//         onSuccess?.();
//       } else {
//         const generatedPassword = generatePassword(values.name);
//         const organizationData = {
//           ...cleanedValues,
//           password: generatedPassword,
//           approvalStatus: 'approved'
//         };
        
//         const response = await dispatch(registerOrganization(organizationData)).unwrap();
        
//         if (response.data) {
//           toast.success(response.message || 'Organization registered successfully!');
//           await dispatch(fetchOrganizations());
//           onClose();
//           onSuccess?.();
//         } else if (response.message && response.message.includes('successfully')) {
//           toast.success(response.message);
//           await dispatch(fetchOrganizations());
//           onClose();
//           onSuccess?.();
//         } else {
//           throw new Error(response.message || 'Registration failed');
//         }
//       }
//     } catch (err) {
//       console.error('Operation failed:', err);
//       if (err.fieldErrors) {
//         Object.entries(err.fieldErrors).forEach(([field, error]) => {
//           setFieldError(field, error);
//         });
//       }
//       if (!err.message?.includes('successfully')) {
//         toast.error(err.message || 'Operation failed');
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (success) {
//       const handleSuccess = async () => {
//         await dispatch(fetchOrganizations());
//         onClose();
//         dispatch(resetForm());
//       };
//       handleSuccess();
//     }
//   }, [success, dispatch, onClose]);

//   useEffect(() => {
//     return () => {
//       dispatch(resetForm());
//     };
//   }, [dispatch]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
//       <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      
//       {/* Mobile View */}
// {/* Mobile View */}
// <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden sm:hidden max-h-[80vh]">
//   {/* Modal Header */}
//   <div className="flex justify-between items-center p-4 border-b border-gray-100">
//     <div className="flex items-center space-x-3">
//       <div className="w-8 h-8 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//         <i className="fas fa-building text-white text-sm" />
//       </div>
//       <h2 className="text-xl font-semibold text-gray-800">
//         {selectedOrg ? "Edit Organization" : "Register Organization"}
//       </h2>
//     </div>
//     <button 
//       onClick={onClose} 
//       disabled={isLoading} 
//       className="p-1 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//     >
//       <i className="fas fa-times text-gray-400 hover:text-gray-600 text-sm" />
//     </button>
//   </div>

//   {/* Notification Display */}
//   {(error || notification.message) && (
//     <div className={`p-3 mx-4 mt-3 text-xs rounded-lg ${
//       notification.type === 'error' || error 
//         ? 'text-red-700 bg-red-100' 
//         : 'text-green-700 bg-green-100'
//     }`}>
//       {error || notification.message}
//     </div>
//   )}

//   {/* Form Content - Updated with fixed height and scroll */}
//   <div className="p-4 overflow-y-auto h-[calc(80vh-72px)]">
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//       enableReinitialize
//     >
//       {({ isSubmitting }) => (
//         <Form className="space-y-4">
//           <div className="flex-1 max-h-[300px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               name="name"
//               label="Organization Name"
//               required
//               placeholder="Enter organization name"
//             />
//             <FormField
//               name="website"
//               label="Website"
//               placeholder="Enter website URL"
//             />
//             <FormField
//               name="contactPerson"
//               label="Contact Person"
//               required
//               placeholder="Enter contact person name"
//             />
//             <FormField
//               name="email"
//               type="email"
//               label="Email"
//               required
//               placeholder="Enter email address"
//             />
//             <FormField
//               name="address"
//               label="Address"
//               required
//               placeholder="Enter address"
//             />
//             <FormField
//               name="mobile"
//               label="Mobile"
//               required
//               placeholder="Enter mobile number"
//             />
//           </div>

//           {/* Action Buttons - Sticky at bottom */}
//           <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t border-gray-100">
//             <div className="flex justify-end items-center space-x-3  pt-4 ">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isLoading || isSubmitting}
//                 className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading || isSubmitting}
//                 className="px-4 py-2 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center text-sm"
//               >
//                 {isLoading || isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Processing...
//                   </>
//                 ) : (
//                   selectedOrg ? "Update" : "Register"
//                 )}
//               </button>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   </div>
// </div>

//       {/* Desktop View */}
//       <div className="relative hidden sm:block max-h-150 overflow-y-auto lg:w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-building text-white text-base" />
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {selectedOrg ? "Edit Organization" : "Register New Organization"}
//             </h2>
//           </div>
//           <button 
//             onClick={onClose} 
//             disabled={isLoading} 
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600 text-base" />
//           </button>
//         </div>

//         {/* Notification Display */}
//         {(error || notification.message) && (
//           <div className={`p-4 mx-6 mt-4 text-sm rounded-lg ${
//             notification.type === 'error' || error 
//               ? 'text-red-700 bg-red-100' 
//               : 'text-green-700 bg-green-100'
//           }`}>
//             {error || notification.message}
//           </div>
//         )}

//         {/* Form Content */}
//         <div className="p-6">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-6">
//                   <div className="flex-1 max-h-[300px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Organization Details Section */}
//                   <div className="p-6 rounded-xl flex-1">
//                     <div className="space-y-6">
//                       <FormField
//                         name="name"
//                         label="Organization Name"
//                         required
//                         placeholder="Enter organization name"
//                       />
//                       <FormField
//                         name="website"
//                         label="Website"
//                         placeholder="Enter website URL"
//                       />
//                       <FormField
//                         name="contactPerson"
//                         label="Contact Person"
//                         required
//                         placeholder="Enter contact person name"
//                       />
//                     </div>
//                   </div>

//                   {/* Contact Information Section */}
//                   <div className="p-6 rounded-xl flex-1">
//                     <div className="space-y-6">
//                       <FormField
//                         name="email"
//                         type="email"
//                         label="Email"
//                         required
//                         placeholder="Enter email address"
//                       />
//                       <FormField
//                         name="address"
//                         label="Address"
//                         required
//                         placeholder="Enter address"
//                       />
//                       <FormField
//                         name="mobile"
//                         label="Mobile"
//                         required
//                         placeholder="Enter mobile number"
//                       />
//                     </div>
//                   </div>
//                 </div>
                

//                 {/* Action Buttons */}
//                 <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t border-gray-100">
//                 <div className="flex justify-end items-center space-x-4 pt-4 ">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     disabled={isLoading || isSubmitting}
//                     className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 text-base"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isLoading || isSubmitting}
//                     className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center text-base"
//                   >
//                     {isLoading || isSubmitting ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Processing...
//                       </>
//                     ) : (
//                       selectedOrg ? "Update Organization" : "Register Organization"
//                     )}
//                   </button>
//                 </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Form Field Component
// const FormField = ({ name, label, required = false, type = "text", placeholder, className = "" }) => (
//   <div className={className}>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     <Field
//       type={type}
//       name={name}
//       className={`w-full px-3 py-2 md:px-4 md:py-3 !rounded-xl border !border-gray-200 
//                   bg-white text-gray-900 
//                   focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
//                   focus:outline-none transition-all duration-200`}
//       placeholder={placeholder}
//     />
//     <ErrorMessage
//       name={name}
//       component="div"
//       className="text-red-500 text-xs md:text-sm mt-1"
//     />
//   </div>
// );

// FormField.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   required: PropTypes.bool,
//   type: PropTypes.string,
//   placeholder: PropTypes.string,
//   className: PropTypes.string,
// };

// OrganizationRegistrationForm.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   selectedOrg: PropTypes.object,
//   onSuccess: PropTypes.func,
// };

// export default OrganizationRegistrationForm;


import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  registerOrganization,
  updateOrganization,
  resetForm, // Ensure this action exists and works correctly
  selectRegistrationState
} from '../../../redux/Admin/OrganizationListPage/OrganizationRegisterSlice'; // Adjust path if needed
import { fetchOrganizations } from '../../../redux/Organization/auth/organizationAuthSlice'; // Adjust path if needed

const OrganizationRegistrationForm = ({ isOpen, onClose, selectedOrg, onSuccess }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error, // Contains error message/object from backend on failure
    // success flag might be less reliable, use action lifecycle instead
    notification // UI notification state from redux slice
  } = useSelector(selectRegistrationState);

  const initialValues = useMemo(() => ({
    name: selectedOrg?.name || "",
    address: selectedOrg?.address || "",
    website: selectedOrg?.website || "",
    contactPerson: selectedOrg?.contactPerson || "",
    email: selectedOrg?.email || "",
    mobile: selectedOrg?.mobile || "",
    // approvalStatus is handled by backend on creation
  }), [selectedOrg]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Organization Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must not exceed 100 characters"), // Kept original max length
    address: Yup.string()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters"),
    website: Yup.string()
      .url("Invalid URL format")
      .nullable(),
    contactPerson: Yup.string()
      .required("Contact Person is required")
      .min(2, "Contact person name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[9876]\d{9}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  // ***** MODIFIED PASSWORD GENERATION *****
  const generatePassword = (orgName) => {
    // Ensure orgName is a string and handle potential undefined/null
    const baseName = String(orgName || 'Org').replace(/[^a-zA-Z0-9]/g, ''); // Basic cleanup

    // Calculate available length for the name part (15 max total - 1 symbol - 3 numbers = 11)
    const maxNameLength = 11;
    const namePart = baseName.slice(0, maxNameLength);

    const symbols = ['@', '#', '$', '%', '&', '*', '!'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomNumbers = Math.floor(Math.random() * 900 + 100); // 100-999

    // Combine parts, ensuring total length <= 15
    const generated = `${namePart}${randomSymbol}${randomNumbers}`;
    console.log("Generated Password:", generated, "Length:", generated.length); // For debugging
    return generated;
  };
  // ***** END MODIFICATION *****

  // ***** REVISED handleSubmit *****
  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm: formikResetForm }) => {
    try {
      // Clean values - remove undefined, empty strings (optional), and internal fields
      const cleanedValues = Object.fromEntries(
        Object.entries(values)
           .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]) // Trim strings
          .filter(([key, value]) =>
            value !== undefined && // Keep null if backend expects it, keep empty strings for now
            !['_id', 'password', 'createDate', 'updateDate', '__v'].includes(key)
             && !(value === '' && ['website'].includes(key)) // Allow empty string for optional fields like website
          )
      );

      if (selectedOrg) {
        // --- UPDATE LOGIC ---
        const updatePayload = { ...cleanedValues };
        // Optional: Prevent email update if needed
        // delete updatePayload.email;

        console.log("Dispatching updateOrganization with:", { id: selectedOrg._id, data: updatePayload });
        // Use .unwrap() to get payload or throw error
        const result = await dispatch(updateOrganization({
          id: selectedOrg._id,
          data: updatePayload
        })).unwrap(); // unwrap handles the promise resolution/rejection

        toast.success(result.message || 'Organization updated successfully!');
        dispatch(fetchOrganizations()); // Re-fetch list
        onClose(); // Close modal
        onSuccess?.(); // Optional callback
        formikResetForm(); // Reset formik state
        dispatch(resetForm()); // Reset redux slice state

      } else {
        // --- CREATE LOGIC ---
        const generatedPassword = generatePassword(values.name);
        const organizationData = {
          ...cleanedValues,
          password: generatedPassword,
          // approvalStatus: 'approved' // Backend sets this
        };

        console.log("Dispatching registerOrganization with:", organizationData);
        // Use .unwrap()
        const result = await dispatch(registerOrganization(organizationData)).unwrap();

        toast.success(result.message || 'Organization registered successfully!');
        dispatch(fetchOrganizations()); // Re-fetch list
        onClose(); // Close modal
        onSuccess?.(); // Optional callback
        formikResetForm(); // Reset formik state
        dispatch(resetForm()); // Reset redux slice state
      }
    } catch (err) {
      // Catch errors from .unwrap() or other synchronous issues
      console.error('Operation failed:', err);

      // err should contain the payload from the rejected action (if it was a thunk rejection)
      // or be a standard Error object
      const errorMessage = err?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);

      // Set field-specific errors if provided by the backend via rejected payload
      if (err?.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, errorMsg]) => {
          setFieldError(field, errorMsg);
        });
      } else if (errorMessage.toLowerCase().includes('email already exists')) {
        // Example of specific error handling based on message content
        setFieldError('email', 'This email is already registered.');
      } else if (errorMessage.includes('length must be less than or equal to')) {
        // This specific error shouldn't happen now with the fix, but good to handle
        toast.error("Password generation failed. Please try again or contact support.");
      }
      // You might want to dispatch an action here to set the error in your redux state
      // dispatch(setRegistrationError(err)); // Assuming you have such an action
    } finally {
      // Ensure submitting is always set to false regardless of success/failure
      setSubmitting(false);
    }
  };
  // ***** END REVISED handleSubmit *****


  // Effect to reset Redux form state when component unmounts or modal closes
  useEffect(() => {
    // Reset Redux state when modal is closed or component unmounts
    return () => {
        if (!isOpen) { // Reset only when closing/unmounting
           dispatch(resetForm());
        }
    };
  }, [dispatch, isOpen]); // Depend on isOpen to reset when it changes to false

  // Removed the useEffect dependency on 'success' flag. Logic moved to handleSubmit.

  if (!isOpen) return null;

  // ***** UI (JSX) Remains Unchanged *****
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />

      {/* Mobile View */}
      <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden sm:hidden max-h-[80vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white text-sm" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedOrg ? "Edit Organization" : "Register Organization"}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600 text-sm" />
          </button>
        </div>

        {/* Notification Display */}
        {(error || notification.message) && (
          <div className={`p-3 mx-4 mt-3 text-xs rounded-lg ${
            notification.type === 'error' || error // Use error from redux state if present
              ? 'text-red-700 bg-red-100'
              : 'text-green-700 bg-green-100' // Assuming notification implies success if no error
          }`}>
            {error?.message || error || notification.message} {/* Display error message */}
          </div>
        )}

        {/* Form Content - Updated with fixed height and scroll */}
        <div className="p-4 overflow-y-auto h-[calc(80vh-72px)]"> {/* Adjusted original calc */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                 {/* Original layout preserved */}
                 <div className="flex-1 max-h-[300px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        name="name"
                        label="Organization Name"
                        required
                        placeholder="Enter organization name"
                    />
                    <FormField
                        name="website"
                        label="Website"
                        placeholder="Enter website URL"
                    />
                    <FormField
                        name="contactPerson"
                        label="Contact Person"
                        required
                        placeholder="Enter contact person name"
                    />
                    <FormField
                        name="email"
                        type="email"
                        label="Email"
                        required
                        placeholder="Enter email address"
                    />
                     <FormField
                        name="address"
                        label="Address"
                        required
                        placeholder="Enter address"
                    />
                    <FormField
                        name="mobile"
                        label="Mobile"
                        required
                        placeholder="Enter mobile number"
                    />
                 </div>

                {/* Action Buttons - Sticky at bottom */}
                <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t border-gray-100">
                  <div className="flex justify-end items-center space-x-3 pt-4 ">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isLoading || isSubmitting}
                      className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || isSubmitting}
                      className="px-4 py-2 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center text-sm"
                    >
                      {isLoading || isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        selectedOrg ? "Update" : "Register"
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Desktop View */}
      <div className="relative hidden sm:block max-h-150 overflow-y-auto lg:w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"> {/* Adjusted original class */}
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-building text-white text-base" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedOrg ? "Edit Organization" : "Register New Organization"}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600 text-base" />
          </button>
        </div>

        {/* Notification Display */}
         {(error || notification.message) && (
          <div className={`p-4 mx-6 mt-4 text-sm rounded-lg ${
             notification.type === 'error' || error // Use error from redux state if present
              ? 'text-red-700 bg-red-100'
              : 'text-green-700 bg-green-100' // Assuming notification implies success if no error
          }`}>
            {error?.message || error || notification.message} {/* Display error message */}
          </div>
        )}

        {/* Form Content */}
        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Original layout preserved */}
                 <div className="flex-1 max-h-[300px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Organization Details Section */}
                    <div className="p-6 rounded-xl flex-1">
                        <div className="space-y-6">
                            <FormField
                                name="name"
                                label="Organization Name"
                                required
                                placeholder="Enter organization name"
                            />
                            <FormField
                                name="website"
                                label="Website"
                                placeholder="Enter website URL"
                            />
                            <FormField
                                name="contactPerson"
                                label="Contact Person"
                                required
                                placeholder="Enter contact person name"
                            />
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="p-6 rounded-xl flex-1">
                        <div className="space-y-6">
                            <FormField
                                name="email"
                                type="email"
                                label="Email"
                                required
                                placeholder="Enter email address"
                            />
                            <FormField
                                name="address"
                                label="Address"
                                required
                                placeholder="Enter address"
                            />
                            <FormField
                                name="mobile"
                                label="Mobile"
                                required
                                placeholder="Enter mobile number"
                            />
                        </div>
                    </div>
                 </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t border-gray-100">
                  <div className="flex justify-end items-center space-x-4 pt-4 ">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isLoading || isSubmitting}
                      className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || isSubmitting}
                      className="px-6 py-3 rounded-xl bg-lightBlue-600 text-white hover:bg-lightBlue-700 focus:ring-2 focus:ring-lightBlue-600/20 transition-all duration-200 disabled:opacity-50 flex items-center text-base"
                    >
                      {isLoading || isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        selectedOrg ? "Update Organization" : "Register Organization"
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

// Form Field Component (Unchanged UI)
const FormField = ({ name, label, required = false, type = "text", placeholder, className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Field
      type={type}
      name={name}
      className={`w-full px-3 py-2 md:px-4 md:py-3 !rounded-xl border !border-gray-200 
                  bg-white text-gray-900 
                  focus:!border-lightBlue-600 focus:ring-2 focus:!ring-lightBlue-600/20 
                  focus:outline-none transition-all duration-200`}
      placeholder={placeholder}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs md:text-sm mt-1"
    />
  </div>
);

// PropTypes (Unchanged)
FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

OrganizationRegistrationForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedOrg: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default OrganizationRegistrationForm;
