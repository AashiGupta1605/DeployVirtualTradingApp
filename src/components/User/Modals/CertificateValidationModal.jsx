





// usern ame mathc

// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import toast from 'react-hot-toast';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';

// const CertificateValidationModal = ({ isOpen, onClose }) => {
//   const [certificateData, setCertificateData] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Validation schema for the form fields
//   const validationSchema = Yup.object({
//     certificateCode: Yup.string()
//       .required('Certificate code is required'),
//     userName: Yup.string()
//       .required('User name is required')
//       .min(3, 'User name must be at least 3 characters'),
//   });

//   // Initialize formik for form handling
//   const formik = useFormik({
//     initialValues: {
//       certificateCode: '',
//       userName: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         // API call to validate the certificate
//         const response = await axios.get(
//           `${BASE_API_URL}/admin/events/certificates/validate`,
//           {
//             params: {
//               certificateId: values.certificateCode,
//               userName: values.userName,
//             },
//           }
//         );

//         if (response.data.success) {
//           const certificate = response.data.certificate;
//           setCertificateData(certificate);
//           toast.success('Certificate validated successfully!');
//         }
//       } catch (error) {
//         // Display error messages based on the server response
//         toast.error(error.response?.data?.message || 'Error validating certificate');
//         console.error('Certificate validation error:', error);
//       }
//     },
//   });

//   // Function to handle certificate download
//   const handleDownloadCertificate = async () => {
//     setIsGenerating(true);
//     try {
//       const certificateElement = document.getElementById('certificate-preview');
//       const canvas = await html2canvas(certificateElement, {
//         scale: 2,
//         logging: false,
//         useCORS: true,
//         backgroundColor: '#f8f9fa',
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('landscape', 'mm', 'a4');
//       const imgWidth = 297; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save(`${certificateData.userName.replace(' ', '_')}_certificate.pdf`);

//       toast.success('Certificate downloaded successfully!');
//     } catch (error) {
//       toast.error('Failed to generate certificate');
//       console.error('Certificate generation error:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Render nothing if the modal is not open
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
//       {/* Background overlay */}
//       <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

//       {/* Modal container */}
//       <div
//         style={{ width: '100%', maxWidth: '90%' }}
//         className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
//       >
//         {/* Modal header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-certificate text-white"></i>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Validate Certificate</h2>
//           </div>
//           {/* Close button */}
//           <button
//             onClick={() => {
//               onClose();
//               formik.resetForm();
//               setCertificateData(null);
//             }}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
//           >
//             <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//           </button>
//         </div>

//         {/* Modal body */}
//         <div className="p-6 overflow-y-auto max-h-[80vh]">
//           {!certificateData ? (
//             <form onSubmit={formik.handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 {/* Certificate Code input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Certificate Code
//                   </label>
//                   <input
//                     type="text"
//                     name="certificateCode"
//                     value={formik.values.certificateCode}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                     bg-white text-gray-900 
//                     focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
//                     focus:outline-none transition-all duration-200"
//                     placeholder="Enter certificate code (e.g. CERT-ABC12345-XYZ789)"
//                   />
//                   {formik.touched.certificateCode && formik.errors.certificateCode ? (
//                     <div className="text-red-500 text-sm">{formik.errors.certificateCode}</div>
//                   ) : null}
//                 </div>

//                 {/* User Name input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     User Name
//                   </label>
//                   <input
//                     type="text"
//                     name="userName"
//                     value={formik.values.userName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
//                     bg-white text-gray-900 
//                     focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
//                     focus:outline-none transition-all duration-200"
//                     placeholder="Enter user name as registered"
//                   />
//                   {formik.touched.userName && formik.errors.userName ? (
//                     <div className="text-red-500 text-sm">{formik.errors.userName}</div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Form actions */}
//               <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//                 {/* Cancel button */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     onClose();
//                     formik.resetForm();
//                   }}
//                   className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>

//                 {/* Submit button */}
//                 <button
//                   type="submit"
//                   disabled={formik.isSubmitting}
//                   className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                 >
//                   {formik.isSubmitting ? 'Validating...' : 'Validate Certificate'}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="space-y-6">
//               {/* Certificate Details */}
//               <div className="bg-blue-50 rounded-xl p-4">
//                 <h3 className="text-lg font-semibold text-blue-800 mb-2">Certificate Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-600">Certificate ID</p>
//                     <p className="font-medium">{certificateData.id}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Issued To</p>
//                     <p className="font-medium">{certificateData.userName}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Event Name</p>
//                     <p className="font-medium">{certificateData.eventName}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Registration Date</p>
//                     <p className="font-medium">
//                       {new Date(certificateData.registrationDate).toLocaleDateString('en-US', { 
//                         year: 'numeric', 
//                         month: 'long', 
//                         day: 'numeric' 
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Certificate Preview */}
//               <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center">
//                 <h3 className="text-lg font-semibold mb-4">Certificate Preview</h3>
                
//                 {/* Horizontal Certificate Design */}
//                 <div 
//                   id="certificate-preview"
//                   className="w-full max-w-4xl bg-white shadow-lg overflow-hidden"
//                   style={{
//                     border: '15px solid #d4af37',
//                     borderRadius: '5px',
//                   }}
//                 >
//                   {/* Certificate Header */}
//                   <div className="bg-lightBlue-600 py-6 px-8 text-center">
//                     <div className="flex justify-center mb-4">
//                       <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
//                         <i className="fas fa-certificate text-lightBlue-600 text-3xl"></i>
//                       </div>
//                     </div>
//                     <h1 className="text-3xl font-bold text-white">Certificate of Completion</h1>
//                     <p className="text-white opacity-90 mt-2">This certificate is proudly presented to</p>
//                   </div>

//                   {/* Certificate Body */}
//                   <div className="p-8">
//                     {/* Main Content */}
//                     <div className="flex flex-col md:flex-row">
//                       {/* Left Side - Main Content */}
//                       <div className="md:w-2/3 md:pr-8">
//                         <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
//                           {certificateData.userName}
//                         </h2>
                        
//                         <div className="text-gray-700 mb-6 text-center md:text-left">
//                           <p className="mb-4">
//                             has successfully completed the <span className="font-semibold">{certificateData.eventName}</span> 
//                             on {new Date(certificateData.eventDates.end).toLocaleDateString('en-US', { 
//                               year: 'numeric', 
//                               month: 'long', 
//                               day: 'numeric' 
//                             })}.
//                           </p>
//                           <p>
//                             {certificateData.eventDescription}
//                           </p>
//                         </div>

//                         <div className="border-t border-gray-300 pt-4 mt-6">
//                           <div className="flex justify-between">
//                             <div>
//                               <p className="text-sm text-gray-600">Certificate ID</p>
//                               <p className="font-medium">{certificateData.id}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-600">Event Dates</p>
//                               <p className="font-medium">
//                                 {new Date(certificateData.eventDates.start).toLocaleDateString()} - {' '}
//                                 {new Date(certificateData.eventDates.end).toLocaleDateString()}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right Side - Verification */}
//                       <div className="md:w-1/3 md:border-l md:border-gray-300 md:pl-8 mt-6 md:mt-0">
//                         <div className="text-center">
//                           <div className="mb-4">
//                             <p className="text-sm text-gray-600">Certificate ID</p>
//                             <p className="font-mono text-lg">{certificateData.id}</p>
//                           </div>
//                           <div className="mb-4">
//                             <p className="text-sm text-gray-600">Issued On</p>
//                             <p className="font-medium">
//                               {new Date(certificateData.registrationDate).toLocaleDateString('en-US', { 
//                                 year: 'numeric', 
//                                 month: 'long', 
//                                 day: 'numeric',
//                               })}
//                             </p>
//                           </div>
//                           <div className="mb-6">
//                             <p className="text-sm text-gray-600">Verification Code</p>
//                             <p className="font-mono">{certificateData.id.split('-')[2]}</p>
//                           </div>
//                           <div className="flex justify-center">
//                             <div className="w-24 h-24 bg-lightBlue-100 rounded-full flex items-center justify-center">
//                               <i className="fas fa-check-circle text-lightBlue-600 text-4xl"></i>
//                             </div>
//                           </div>
//                           <p className="text-sm text-gray-600 mt-2">Verified Certificate</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Footer Signatures */}
//                     <div className="border-t border-gray-300 mt-8 pt-8">
//                       <div className="flex justify-between">
//                         <div className="text-center">
//                           <div className="h-1 w-32 bg-gray-400 mx-auto mb-2"></div>
//                           <p className="text-sm text-gray-600">Authorized Signature</p>
//                         </div>
//                         <div className="text-center">
//                           <div className="h-1 w-32 bg-gray-400 mx-auto mb-2"></div>
//                           <p className="text-sm text-gray-600">Event Coordinator</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>


//               {/* Actions */}
//               <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
//                 <button
//                   onClick={() => {
//                     setCertificateData(null);
//                     formik.resetForm();
//                   }}
//                   className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Validate Another
//                 </button>
//                 <button
//                   onClick={handleDownloadCertificate}
//                   disabled={isGenerating}
//                   className="px-6 py-3 rounded-xl bg-gradient-to-r bg-green-600 text-white hover:bg-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
//                 >
//                   {isGenerating ? 'Generating...' : 'Download Certificate'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateValidationModal;






// working pdf download but no error of oklc
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import toast from 'react-hot-toast';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl'; // Assuming this path is correct

// const CertificateValidationModal = ({ isOpen, onClose }) => {
//   const [certificateData, setCertificateData] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Validation schema for the form fields
//   const validationSchema = Yup.object({
//     certificateCode: Yup.string()
//       .required('Certificate code is required'),
//     userName: Yup.string()
//       .required('User name is required')
//       .min(3, 'User name must be at least 3 characters'),
//   });

//   // Initialize formik for form handling
//   const formik = useFormik({
//     initialValues: {
//       certificateCode: '',
//       userName: '',
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting }) => { // Added setSubmitting from formik bag
//       try {
//         // API call to validate the certificate
//         const response = await axios.get(
//           `${BASE_API_URL}/admin/events/certificates/validate`,
//           {
//             params: {
//               certificateId: values.certificateCode,
//               userName: values.userName,
//             },
//           }
//         );

//         if (response.data.success) {
//           const certificate = response.data.certificate;
//           // Add dummy data if API response structure is different than expected in JSX
//           // Ensure all expected fields exist (eventName, registrationDate, eventDates, eventDescription)
//           const validatedCertificate = {
//              id: certificate.id || values.certificateCode, // Use validated ID or fallback
//              userName: certificate.userName || values.userName, // Use validated name or fallback
//              eventName: certificate.eventName || 'Sample Event Name', // Provide default if missing
//              registrationDate: certificate.registrationDate || new Date().toISOString(), // Provide default if missing
//              eventDates: certificate.eventDates || { start: new Date().toISOString(), end: new Date().toISOString() }, // Provide default if missing
//              eventDescription: certificate.eventDescription || 'This is a sample event description provided because none was found in the API response.', // Provide default if missing
//              // Add any other fields expected by the certificate template
//           };
//           setCertificateData(validatedCertificate);
//           toast.success('Certificate validated successfully!');
//         } else {
//            // Handle cases where API call is successful (2xx status) but validation fails logically
//            toast.error(response.data.message || 'Certificate validation failed.');
//            setCertificateData(null); // Ensure no certificate data is shown
//         }
//       } catch (error) {
//         // Display error messages based on the server response
//         toast.error(error.response?.data?.message || 'Error validating certificate');
//         console.error('Certificate validation error:', error);
//         setCertificateData(null); // Clear certificate data on error
//       } finally {
//         setSubmitting(false); // Ensure submitting state is reset
//       }
//     },
//   });

//   // Function to handle certificate download
//   const handleDownloadCertificate = async () => {
//     const certificateElement = document.getElementById('certificate-preview');
//     if (!certificateElement) {
//         toast.error('Certificate element not found.');
//         console.error('Certificate generation error: Element with ID "certificate-preview" not found.');
//         return;
//     }
//     if (!certificateData) {
//         toast.error('No certificate data available to generate PDF.');
//         console.error('Certificate generation error: certificateData is null.');
//         return;
//     }

//     setIsGenerating(true);
//     try {
//       // Ensure the element is visible and rendered before capturing
//       // Sometimes elements might be conditionally rendered or have display: none initially
//       // A small timeout can sometimes help ensure styles are fully applied, though not ideal
//       // await new Promise(resolve => setTimeout(resolve, 100)); 

//       const canvas = await html2canvas(certificateElement, {
//         scale: 2, // Increase scale for better resolution
//         logging: true, // Enable logging for debugging purposes
//         useCORS: true, // Important if the certificate template uses external images/fonts
//         backgroundColor: '#ffffff', // Explicitly set background to white (supported format)
//         // Adding width and height might help in some cases, but usually derived from element
//         // width: certificateElement.scrollWidth,
//         // height: certificateElement.scrollHeight,
//         // Attempt to remove problematic filters if they exist
//         // removeContainer: true, // This might remove the element, use with caution
//         // foreignObjectRendering: false, // Might affect SVG rendering if used
//         scrollX: 0, // Ensure capture starts from the top-left
//         scrollY: 0,
//         windowWidth: document.documentElement.offsetWidth, // Provide window dimensions
//         windowHeight: document.documentElement.offsetHeight,
//       });

//       const imgData = canvas.toDataURL('image/png', 1.0); // Use PNG format, quality 1.0
//       const pdf = new jsPDF({
//           orientation: 'landscape', // 'landscape' or 'portrait'
//           unit: 'mm',             // 'mm', 'pt', 'in', 'cm'
//           format: 'a4'             // 'a4', 'letter', etc.
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
//       // Calculate the image dimensions to fit within the PDF page while maintaining aspect ratio
//       const imgProps= pdf.getImageProperties(imgData);
//       const imgWidth = imgProps.width;
//       const imgHeight = imgProps.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

//       const effectiveImgWidth = imgWidth * ratio;
//       const effectiveImgHeight = imgHeight * ratio;

//       // Center the image on the PDF page (optional)
//       const xOffset = (pdfWidth - effectiveImgWidth) / 2;
//       const yOffset = (pdfHeight - effectiveImgHeight) / 2;

//       pdf.addImage(imgData, 'PNG', xOffset, yOffset, effectiveImgWidth, effectiveImgHeight);
//       // Use a safe filename, replacing spaces
//       const filename = `${certificateData.userName?.replace(/[^a-zA-Z0-9]/g, '_') || 'certificate'}_certificate.pdf`;
//       pdf.save(filename);

//       toast.success('Certificate downloaded successfully!');
//     } catch (error) {
//       toast.error('Failed to generate certificate PDF.');
//       // Log the specific error from html2canvas or jsPDF
//       console.error('Certificate generation error:', error);
//       // Check if the error object has more details
//       if (error.message) {
//           console.error('Error message:', error.message);
//       }
//       if (error.stack) {
//           console.error('Error stack:', error.stack);
//       }
//       // Alert the user with specific error if it's the oklch issue again
//       if (error.message && error.message.includes('oklch')) {
//           toast.error('Error: CSS color format "oklch" is not supported by the PDF generator. Please check console for details.', { duration: 6000 });
//       } else {
//           toast.error(`An error occurred: ${error.message || 'Unknown error'}`, { duration: 6000 });
//       }
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Helper function to safely format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         return new Date(dateString).toLocaleDateString('en-US', { 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric' 
//         });
//     } catch (e) {
//         console.error("Error formatting date:", dateString, e);
//         return 'Invalid Date';
//     }
//   };
  
//   // Helper function to safely format date range
//     const formatDateRange = (startDateString, endDateString) => {
//         const start = formatDate(startDateString);
//         const end = formatDate(endDateString);
//         if (start === 'N/A' || end === 'N/A' || start === 'Invalid Date' || end === 'Invalid Date') {
//             return 'N/A';
//         }
//         if (start === end) {
//             return start;
//         }
//         return `${start} - ${end}`;
//     };


//   // Render nothing if the modal is not open
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"> {/* Added background overlay class */}
//       {/* Background overlay - removed the separate div as bg-opacity handles it */}
//       {/* <div className="fixed inset-0 bg-gray-900 opacity-50"></div> */}

//       {/* Modal container */}
//       <div
//         // Use max-w-5xl or similar for wider modal, ensure width is responsive
//         className="relative w-full max-w-4xl sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
//       >
//         {/* Modal header */}
//         <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200"> {/* Adjusted padding and border */}
//           <div className="flex items-center space-x-3">
//             {/* Ensure FontAwesome is loaded or replace with SVG/Image icon */}
//             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-certificate text-white text-xl"></i> {/* Adjusted size */}
//             </div>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Validate Certificate</h2>
//           </div>
//           {/* Close button */}
//           <button
//             onClick={() => {
//               onClose(); // Call the onClose prop
//               formik.resetForm(); // Reset form state
//               setCertificateData(null); // Clear certificate data
//             }}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200" // Make button round
//             aria-label="Close modal" // Accessibility
//           >
//             <i className="fas fa-times text-lg"></i> {/* Adjusted size */}
//           </button>
//         </div>

//         {/* Modal body */}
//         <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-160px)]"> {/* Adjusted padding and max-height */}
//           {!certificateData ? (
//             // Validation Form
//             <form onSubmit={formik.handleSubmit} className="space-y-5"> {/* Adjusted spacing */}
//               <div className="space-y-4">
//                 {/* Certificate Code input */}
//                 <div>
//                   <label htmlFor="certificateCode" className="block text-sm font-medium text-gray-700 mb-1"> {/* Use htmlFor */}
//                     Certificate Code
//                   </label>
//                   <input
//                     id="certificateCode" // Match label htmlFor
//                     type="text"
//                     name="certificateCode"
//                     value={formik.values.certificateCode}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.certificateCode && formik.errors.certificateCode ? 'border-red-500' : 'border-gray-300'} // Adjusted padding, radius, border
//                     bg-white text-gray-900 
//                     focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
//                     focus:outline-none transition-all duration-200`}
//                     placeholder="Enter certificate code (e.g. CERT-ABC12345-XYZ789)"
//                     aria-describedby="certificateCode-error" // Accessibility
//                   />
//                   {formik.touched.certificateCode && formik.errors.certificateCode ? (
//                     <div id="certificateCode-error" className="text-red-600 text-xs mt-1">{formik.errors.certificateCode}</div> // Adjusted style
//                   ) : null}
//                 </div>

//                 {/* User Name input */}
//                 <div>
//                   <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1"> {/* Use htmlFor */}
//                     User Name
//                   </label>
//                   <input
//                     id="userName" // Match label htmlFor
//                     type="text"
//                     name="userName"
//                     value={formik.values.userName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.userName && formik.errors.userName ? 'border-red-500' : 'border-gray-300'} // Adjusted padding, radius, border
//                     bg-white text-gray-900 
//                     focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
//                     focus:outline-none transition-all duration-200`}
//                     placeholder="Enter user name as registered"
//                     aria-describedby="userName-error" // Accessibility
//                   />
//                   {formik.touched.userName && formik.errors.userName ? (
//                     <div id="userName-error" className="text-red-600 text-xs mt-1">{formik.errors.userName}</div> // Adjusted style
//                   ) : null}
//                 </div>
//               </div>

//               {/* Form actions */}
//               <div className="flex justify-end items-center space-x-3 pt-5 border-t border-gray-200"> {/* Adjusted spacing, padding, border */}
//                 {/* Cancel button */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     onClose(); // Call the onClose prop
//                     formik.resetForm();
//                     setCertificateData(null); // Also clear data on cancel
//                   }}
//                   className="px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200" // Adjusted style
//                 >
//                   Cancel
//                 </button>

//                 {/* Submit button */}
//                 <button
//                   type="submit"
//                   disabled={formik.isSubmitting}
//                   className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 ${formik.isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/30'}`} // Adjusted style and disabled state
//                 >
//                   {formik.isSubmitting ? (
//                       <>
//                           <i className="fas fa-spinner fa-spin mr-2"></i> {/* Loading indicator */}
//                           Validating...
//                       </>
//                    ) : 'Validate Certificate'}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             // Certificate Display and Download
//             <div className="space-y-6">
//               {/* Certificate Details */}
//               <div className="bg-blue-50 rounded-xl p-4 border border-blue-200"> {/* Added border */}
//                 <h3 className="text-lg font-semibold text-blue-800 mb-3">Certificate Details</h3> {/* Adjusted margin */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"> {/* Adjusted gap */}
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Certificate ID</p> {/* Adjusted style */}
//                     <p className="font-medium text-gray-800 break-words">{certificateData.id || 'N/A'}</p> {/* Added fallback and break-words */}
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Issued To</p> {/* Adjusted style */}
//                     <p className="font-medium text-gray-800">{certificateData.userName || 'N/A'}</p> {/* Added fallback */}
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Event Name</p> {/* Adjusted style */}
//                     <p className="font-medium text-gray-800">{certificateData.eventName || 'N/A'}</p> {/* Added fallback */}
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Issue Date</p> {/* Changed label, Adjusted style */}
//                     <p className="font-medium text-gray-800">
//                       {formatDate(certificateData.registrationDate)}
//                     </p>
//                   </div>
//                    <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Event Dates</p> {/* Added field */}
//                     <p className="font-medium text-gray-800">
//                       {formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)} {/* Use helper */}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Certificate Preview Wrapper */}
//                 <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center bg-gray-50"> {/* Added background */}
//                   <h3 className="text-lg font-semibold mb-4 text-gray-700">Certificate Preview</h3>
                  
//                   {/* Certificate Preview Element to be Captured */}
//                   {/* Applied aspect-ratio for standard A4 landscape, adjust as needed */}
//                   <div className="w-full max-w-3xl overflow-hidden"> 
//                       {/* Added overflow-hidden */}
//                       <div 
//                           id="certificate-preview"
//                           className="w-full bg-white shadow-lg" // Ensure explicit white background for capture
//                           style={{
//                           border: '10px solid #c0a062', // Example border color (adjust as needed)
//                           // aspectRatio: '297 / 210', // A4 Landscape ratio - uncomment if needed, might conflict with content height
//                           padding: '0', // Reset padding if children handle it
//                           fontFamily: 'serif' // Example font, ensure it's loaded or use web safe fonts
//                           }}
//                       >
//                           {/* Certificate Header */}
//                           <div style={{ backgroundColor: '#1E40AF', padding: '20px 30px', textAlign: 'center', color: 'white' }}> {/* Example: Blue-800 */}
//                               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
//                                   <div style={{ width: '70px', height: '70px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//                                       {/* Use a real icon library or SVG */}
//                                       <span style={{ fontSize: '30px', color: '#1E40AF' }}>🏆</span> 
//                                   </div>
//                               </div>
//                               <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Certificate of Completion</h1>
//                               <p style={{ opacity: 0.9, marginTop: '8px', fontSize: '14px' }}>This certificate is proudly presented to</p>
//                           </div>

//                           {/* Certificate Body */}
//                           <div style={{ padding: '30px' }}>
//                               {/* Main Content */}
//                               <div style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 768px)': { flexDirection: 'row' } }}> {/* Basic responsive structure */}
//                                   {/* Left Side - Main Content */}
//                                   <div style={{ flexGrow: 1, paddingRight: '0', '@media (min-width: 768px)': { paddingRight: '30px' } }}>
//                                       <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px', textAlign: 'center', '@media (min-width: 768px)': { textAlign: 'left' } }}>
//                                           {certificateData.userName || 'Recipient Name'}
//                                       </h2>
                                      
//                                       <div style={{ color: '#374151', marginBottom: '20px', textAlign: 'center', fontSize: '15px', '@media (min-width: 768px)': { textAlign: 'left' } }}>
//                                           <p style={{ marginBottom: '15px' }}>
//                                               has successfully completed the <span style={{ fontWeight: '600' }}>{certificateData.eventName || 'Event Name'}</span> 
//                                               on {formatDate(certificateData.eventDates?.end)}. {/* Format end date */}
//                                           </p>
//                                           <p style={{ fontStyle: 'italic', color: '#4B5563' }}> {/* Example description styling */}
//                                               {certificateData.eventDescription || 'Description of the event or achievement goes here. This section provides context about the accomplishment being recognized.'}
//                                           </p>
//                                       </div>

//                                       <div style={{ borderTop: '1px solid #D1D5DB', paddingTop: '15px', marginTop: '25px', fontSize: '12px' }}>
//                                           <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                                               <div style={{ marginBottom: '10px' }}>
//                                                   <p style={{ color: '#6B7280' }}>Certificate ID</p>
//                                                   <p style={{ fontWeight: '500', wordBreak: 'break-all' }}>{certificateData.id || 'N/A'}</p>
//                                               </div>
//                                               <div style={{ textAlign: 'right' }}>
//                                                   <p style={{ color: '#6B7280' }}>Event Dates</p>
//                                                   <p style={{ fontWeight: '500' }}>
//                                                       {formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)}
//                                                   </p>
//                                               </div>
//                                           </div>
//                                       </div>
//                                   </div>

//                                   {/* Right Side - Verification (Simplified) */}
//                                   <div style={{ width: '100%', borderTop: '1px solid #D1D5DB', paddingTop: '20px', marginTop: '20px', '@media (min-width: 768px)': { width: '200px', borderTop: 'none', borderLeft: '1px solid #D1D5DB', paddingLeft: '30px', paddingTop: '0', marginTop: '0', flexShrink: 0 } }}>
//                                       <div style={{ textAlign: 'center' }}>
//                                           <div style={{ marginBottom: '15px' }}>
//                                               <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Issued On</p>
//                                               <p style={{ fontWeight: '500', fontSize: '13px' }}>
//                                                 {formatDate(certificateData.registrationDate)}
//                                               </p>
//                                           </div>
//                                           <div style={{ marginBottom: '20px' }}>
//                                               <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Verification Code</p>
//                                               {/* Example: Extract last part of ID */}
//                                               <p style={{ fontFamily: 'monospace', fontSize: '14px' }}>{certificateData.id?.split('-').pop() || 'N/A'}</p> 
//                                           </div>
//                                           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
//                                                {/* Simple checkmark icon */}
//                                                <div style={{ width: '50px', height: '50px', backgroundColor: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {/* Example: Blue-100 */}
//                                                   <span style={{ fontSize: '24px', color: '#2563EB' }}>✔️</span> {/* Example: Blue-600 */}
//                                               </div>
//                                           </div>
//                                           <p style={{ fontSize: '11px', color: '#6B7280' }}>Verified Certificate</p>
//                                       </div>
//                                   </div>
//                               </div>

//                               {/* Footer Signatures */}
//                               <div style={{ borderTop: '1px solid #D1D5DB', marginTop: '30px', paddingTop: '25px' }}>
//                                   <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontSize: '12px', color: '#4B5563' }}>
//                                       <div>
//                                           <div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div> {/* Signature line */}
//                                           <p>Authorized Signature</p>
//                                       </div>
//                                       <div>
//                                           <div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div> {/* Signature line */}
//                                           <p>Event Coordinator</p>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               </div>


//               {/* Actions */}
//               <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-5 border-t border-gray-200"> {/* Adjusted spacing, padding, border */}
//                 <button
//                   onClick={() => {
//                     setCertificateData(null); // Clear current certificate
//                     formik.resetForm();      // Reset the form for new input
//                   }}
//                   className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200" // Adjusted style
//                 >
//                   Validate Another
//                 </button>
//                 <button
//                   onClick={handleDownloadCertificate}
//                   disabled={isGenerating}
//                   className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${isGenerating ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500/30'}`} // Adjusted style and disabled state
//                 >
//                   {isGenerating ? (
//                       <>
//                           <i className="fas fa-spinner fa-spin mr-2"></i> {/* Loading indicator */}
//                           Generating...
//                       </>
//                   ) : (
//                       <>
//                           <i className="fas fa-download mr-2"></i> {/* Icon */}
//                           Download Certificate
//                       </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateValidationModal;


// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import toast from 'react-hot-toast';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl'; // Assuming this path is correct

// const CertificateValidationModal = ({ isOpen, onClose }) => {
//   const [certificateData, setCertificateData] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Validation schema for the form fields
//   const validationSchema = Yup.object({
//     certificateCode: Yup.string()
//       .required('Certificate code is required'),
//     userName: Yup.string()
//       .required('User name is required')
//       .min(3, 'User name must be at least 3 characters'),
//   });

//   // Initialize formik for form handling
//   const formik = useFormik({
//     initialValues: {
//       certificateCode: '',
//       userName: '',
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const response = await axios.get(
//           `${BASE_API_URL}/admin/events/certificates/validate`,
//           {
//             params: {
//               certificateId: values.certificateCode,
//               userName: values.userName,
//             },
//           }
//         );

//         if (response.data.success) {
//           const certificate = response.data.certificate;
//           // Basic validation/defaulting for certificate data from API
//           const validatedCertificate = {
//              id: certificate.id || values.certificateCode,
//              userName: certificate.userName || values.userName,
//              eventName: certificate.eventName || 'Sample Event Name',
//              registrationDate: certificate.registrationDate || new Date().toISOString(),
//              eventDates: certificate.eventDates || { start: new Date().toISOString(), end: new Date().toISOString() },
//              eventDescription: certificate.eventDescription || 'Event description not provided.',
//           };
//           setCertificateData(validatedCertificate);
//           toast.success('Certificate validated successfully!');
//         } else {
//            toast.error(response.data.message || 'Certificate validation failed.');
//            setCertificateData(null);
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Error validating certificate');
//         console.error('Certificate validation error:', error);
//         setCertificateData(null);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   // Function to handle certificate download
//   const handleDownloadCertificate = async () => {
//     const certificateElement = document.getElementById('certificate-preview');
//     if (!certificateElement) {
//         toast.error('Certificate element not found.');
//         console.error('Certificate generation error: Element with ID "certificate-preview" not found.');
//         return;
//     }
//     if (!certificateData) {
//         toast.error('No certificate data available to generate PDF.');
//         console.error('Certificate generation error: certificateData is null.');
//         return;
//     }

//     setIsGenerating(true);
//     try {
//       const canvas = await html2canvas(certificateElement, {
//         scale: 2, // Increase scale for better resolution
//         // logging: true, // Enable for debugging if needed
//         useCORS: true, // Important for external images/fonts
//         // REMOVED: backgroundColor: '#ffffff', // Let html2canvas capture the element's actual background
//         scrollX: -window.scrollX, // Account for page scroll
//         scrollY: -window.scrollY, // Account for page scroll
//         windowWidth: document.documentElement.offsetWidth,
//         windowHeight: document.documentElement.offsetHeight,
//       });

//       const imgData = canvas.toDataURL('image/png', 1.0); // Use PNG format
//       const pdf = new jsPDF({
//           orientation: 'landscape',
//           unit: 'mm',
//           format: 'a4'
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       // Calculate the image dimensions to fit within the PDF page while maintaining aspect ratio
//       const imgProps= pdf.getImageProperties(imgData);
//       const imgWidth = imgProps.width;
//       const imgHeight = imgProps.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

//       const effectiveImgWidth = imgWidth * ratio;
//       const effectiveImgHeight = imgHeight * ratio;

//       // Center the image on the PDF page
//       const xOffset = (pdfWidth - effectiveImgWidth) / 2;
//       const yOffset = (pdfHeight - effectiveImgHeight) / 2;

//       pdf.addImage(imgData, 'PNG', xOffset, yOffset, effectiveImgWidth, effectiveImgHeight);
//       const filename = `${certificateData.userName?.replace(/[^a-zA-Z0-9]/g, '_') || 'certificate'}_certificate.pdf`;
//       pdf.save(filename);

//       toast.success('Certificate downloaded successfully!');
//     } catch (error) {
//       toast.error('Failed to generate certificate PDF.');
//       console.error('Certificate generation error:', error);
//       if (error.message && error.message.includes('color function')) {
//           toast.error('Error: An unsupported CSS color function might be used in the certificate design.', { duration: 6000 });
//       } else {
//           toast.error(`An error occurred: ${error.message || 'Unknown error'}`, { duration: 6000 });
//       }
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Helper function to safely format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         // Ensure dateString is valid before parsing
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) {
//             return 'Invalid Date';
//         }
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     } catch (e) {
//         console.error("Error formatting date:", dateString, e);
//         return 'Invalid Date';
//     }
//   };

//   // Helper function to safely format date range
//     const formatDateRange = (startDateString, endDateString) => {
//         const start = formatDate(startDateString);
//         const end = formatDate(endDateString);
//         // Handle invalid or N/A dates
//         if (start === 'N/A' || start === 'Invalid Date' || end === 'N/A' || end === 'Invalid Date') {
//             // If one date is valid, return that one. If both invalid/NA, return N/A.
//             if (start !== 'N/A' && start !== 'Invalid Date') return start;
//             if (end !== 'N/A' && end !== 'Invalid Date') return end;
//             return 'N/A';
//         }
//         if (start === end) {
//             return start; // Show only one date if start and end are the same
//         }
//         return `${start} - ${end}`;
//     };


//   // Render nothing if the modal is not open
//   if (!isOpen) return null;

//   return (
//     // Outer container for positioning and overlay
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
//       {/* Background overlay (original style) */}
//       <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>

//       {/* Modal container - positioned relative to the overlay */}
//       <div
//         className="relative w-full max-w-4xl sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
//         // style={{ width: '100%', maxWidth: '90%' }} // You can use Tailwind max-w classes instead
//       >
//         {/* Modal header */}
//         <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             {/* Icon */}
//             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-certificate text-white text-xl"></i>
//             </div>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Validate Certificate</h2>
//           </div>
//           {/* Close button */}
//           <button
//             onClick={() => {
//               onClose();
//               formik.resetForm();
//               setCertificateData(null);
//             }}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
//             aria-label="Close modal"
//           >
//             <i className="fas fa-times text-lg"></i>
//           </button>
//         </div>

//         {/* Modal body */}
//         <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-180px)]"> {/* Adjusted max-height slightly */}
//           {!certificateData ? (
//             // Validation Form
//             <form onSubmit={formik.handleSubmit} className="space-y-5">
//               <div className="space-y-4">
//                 {/* Certificate Code input */}
//                 <div>
//                   <label htmlFor="certificateCode" className="block text-sm font-medium text-gray-700 mb-1">
//                     Certificate Code
//                   </label>
//                   <input
//                     id="certificateCode"
//                     type="text"
//                     name="certificateCode"
//                     value={formik.values.certificateCode}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.certificateCode && formik.errors.certificateCode ? 'border-red-500' : 'border-gray-300'}
//                     bg-white text-gray-900
//                     focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20
//                     focus:outline-none transition-all duration-200`}
//                     placeholder="Enter certificate code (e.g. CERT-ABC12345-XYZ789)"
//                     aria-describedby="certificateCode-error"
//                   />
//                   {formik.touched.certificateCode && formik.errors.certificateCode ? (
//                     <div id="certificateCode-error" className="text-red-600 text-xs mt-1">{formik.errors.certificateCode}</div>
//                   ) : null}
//                 </div>

//                 {/* User Name input */}
//                 <div>
//                   <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
//                     User Name
//                   </label>
//                   <input
//                     id="userName"
//                     type="text"
//                     name="userName"
//                     value={formik.values.userName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.userName && formik.errors.userName ? 'border-red-500' : 'border-gray-300'}
//                     bg-white text-gray-900
//                     focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20
//                     focus:outline-none transition-all duration-200`}
//                     placeholder="Enter user name as registered"
//                     aria-describedby="userName-error"
//                   />
//                   {formik.touched.userName && formik.errors.userName ? (
//                     <div id="userName-error" className="text-red-600 text-xs mt-1">{formik.errors.userName}</div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Form actions */}
//               <div className="flex justify-end items-center space-x-3 pt-5 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     onClose();
//                     formik.resetForm();
//                     setCertificateData(null);
//                   }}
//                   className="px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={formik.isSubmitting}
//                   className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${formik.isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/30'}`}
//                 >
//                   {formik.isSubmitting ? (
//                       <>
//                           <i className="fas fa-spinner fa-spin mr-2"></i>
//                           Validating...
//                       </>
//                    ) : 'Validate Certificate'}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             // Certificate Display and Download
//             <div className="space-y-6">
//               {/* Certificate Details */}
//               <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
//                 <h3 className="text-lg font-semibold text-blue-800 mb-3">Certificate Details</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Certificate ID</p>
//                     <p className="font-medium text-gray-800 break-words">{certificateData.id || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Issued To</p>
//                     <p className="font-medium text-gray-800">{certificateData.userName || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Event Name</p>
//                     <p className="font-medium text-gray-800">{certificateData.eventName || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Issue Date</p>
//                     <p className="font-medium text-gray-800">
//                       {formatDate(certificateData.registrationDate)}
//                     </p>
//                   </div>
//                    <div>
//                     <p className="text-xs text-gray-500 uppercase font-medium">Event Dates</p>
//                     <p className="font-medium text-gray-800">
//                       {/* Safely access nested properties */}
//                       {formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Certificate Preview Wrapper */}
//                 <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center bg-gray-50">
//                   <h3 className="text-lg font-semibold mb-4 text-gray-700">Certificate Preview</h3>

//                   {/* Certificate Preview Element to be Captured */}
//                   <div className="w-full max-w-3xl overflow-hidden">
//                       {/* Ensure this div has the desired visual appearance, including background */}
//                       <div
//                           id="certificate-preview"
//                           className="w-full bg-white shadow-lg" // This bg-white is important! It becomes part of the capture.
//                           style={{
//                           border: '10px solid #c0a062', // Example border color
//                           // Consider setting an aspect ratio close to A4 landscape if needed
//                           // aspectRatio: '297 / 210',
//                           padding: '0',
//                           fontFamily: 'serif' // Use web safe fonts or ensure fonts are loaded
//                           }}
//                       >
//                           {/* --- Certificate Content using Inline Styles --- */}
//                            {/* Header */}
//                           <div style={{ backgroundColor: '#1E40AF', padding: '20px 30px', textAlign: 'center', color: 'white' }}>
//                               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
//                                   <div style={{ width: '70px', height: '70px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//                                       <span style={{ fontSize: '30px', color: '#1E40AF' }}>🏆</span> {/* Placeholder icon */}
//                                   </div>
//                               </div>
//                               <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Certificate of Completion</h1>
//                               <p style={{ opacity: 0.9, marginTop: '8px', fontSize: '14px' }}>This certificate is proudly presented to</p>
//                           </div>

//                           {/* Body */}
//                           <div style={{ padding: '30px 40px' }}> {/* Adjusted padding */}
//                               <div style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 768px)': { flexDirection: 'row' }, gap: '30px' }}> {/* Added gap */}
//                                   {/* Left Side */}
//                                   <div style={{ flexGrow: 1 }}>
//                                       <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px', textAlign: 'center', '@media (min-width: 768px)': { textAlign: 'left' } }}>
//                                           {certificateData.userName || 'Recipient Name'}
//                                       </h2>
//                                       <div style={{ color: '#374151', marginBottom: '25px', textAlign: 'center', fontSize: '15px', lineHeight: '1.6', '@media (min-width: 768px)': { textAlign: 'left' } }}>
//                                           <p style={{ marginBottom: '15px' }}>
//                                               has successfully completed the <span style={{ fontWeight: '600' }}>{certificateData.eventName || 'Event Name'}</span>
//                                               on {formatDate(certificateData.eventDates?.end)}.
//                                           </p>
//                                           <p style={{ fontStyle: 'italic', color: '#4B5563' }}>
//                                               {certificateData.eventDescription || 'Description of the event or achievement goes here.'}
//                                           </p>
//                                       </div>
//                                       <div style={{ borderTop: '1px solid #D1D5DB', paddingTop: '15px', marginTop: '25px', fontSize: '12px' }}>
//                                           <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
//                                               <div>
//                                                   <p style={{ color: '#6B7280' }}>Certificate ID</p>
//                                                   <p style={{ fontWeight: '500', wordBreak: 'break-all' }}>{certificateData.id || 'N/A'}</p>
//                                               </div>
//                                               <div style={{ textAlign: 'left', '@media (min-width: 768px)': { textAlign: 'right' } }}>
//                                                   <p style={{ color: '#6B7280' }}>Event Dates</p>
//                                                   <p style={{ fontWeight: '500' }}>
//                                                       {formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)}
//                                                   </p>
//                                               </div>
//                                           </div>
//                                       </div>
//                                   </div>

//                                   {/* Right Side */}
//                                   <div style={{ width: '100%', borderTop: '1px solid #D1D5DB', paddingTop: '20px', '@media (min-width: 768px)': { width: '200px', borderTop: 'none', borderLeft: '1px solid #D1D5DB', paddingLeft: '30px', paddingTop: '10px', flexShrink: 0 } }}>
//                                       <div style={{ textAlign: 'center' }}>
//                                           <div style={{ marginBottom: '15px' }}>
//                                               <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Issued On</p>
//                                               <p style={{ fontWeight: '500', fontSize: '13px' }}>
//                                                 {formatDate(certificateData.registrationDate)}
//                                               </p>
//                                           </div>
//                                           <div style={{ marginBottom: '20px' }}>
//                                               <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Verification Code</p>
//                                               <p style={{ fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }}>{certificateData.id?.split('-').pop() || 'N/A'}</p>
//                                           </div>
//                                           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
//                                                <div style={{ width: '50px', height: '50px', backgroundColor: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                                   <span style={{ fontSize: '24px', color: '#2563EB' }}>✔️</span> {/* Checkmark */}
//                                               </div>
//                                           </div>
//                                           <p style={{ fontSize: '11px', color: '#6B7280' }}>Verified Certificate</p>
//                                       </div>
//                                   </div>
//                               </div>

//                               {/* Footer Signatures */}
//                               <div style={{ borderTop: '1px solid #D1D5DB', marginTop: '30px', paddingTop: '25px' }}>
//                                   <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', fontSize: '12px', color: '#4B5563' }}> {/* Use space-around */}
//                                       <div>
//                                           <div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div>
//                                           <p>Authorized Signature</p>
//                                       </div>
//                                       <div>
//                                           <div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div>
//                                           <p>Event Coordinator</p>
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>
//                           {/* --- End Certificate Content --- */}
//                       </div>
//                   </div>
//               </div>


//               {/* Actions */}
//               <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-5 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     setCertificateData(null);
//                     formik.resetForm();
//                   }}
//                   className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
//                 >
//                   Validate Another
//                 </button>
//                 <button
//                   onClick={handleDownloadCertificate}
//                   disabled={isGenerating}
//                   className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${isGenerating ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500/30'}`}
//                 >
//                   {isGenerating ? (
//                       <>
//                           <i className="fas fa-spinner fa-spin mr-2"></i>
//                           Generating...
//                       </>
//                   ) : (
//                       <>
//                           <i className="fas fa-download mr-2"></i>
//                           Download Certificate
//                       </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateValidationModal;



// working downalod but more height

// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import toast from 'react-hot-toast';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl'; // Assuming this path is correct

// const CertificateValidationModal = ({ isOpen, onClose }) => {
//   const [certificateData, setCertificateData] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // --- Formik and Validation Schema (unchanged) ---
//    const validationSchema = Yup.object({
//     certificateCode: Yup.string()
//       .required('Certificate code is required'),
//     userName: Yup.string()
//       .required('User name is required')
//       .min(3, 'User name must be at least 3 characters'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       certificateCode: '',
//       userName: '',
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const response = await axios.get(
//           `${BASE_API_URL}/admin/events/certificates/validate`,
//           {
//             params: {
//               certificateId: values.certificateCode,
//               userName: values.userName,
//             },
//           }
//         );

//         if (response.data.success) {
//           const certificate = response.data.certificate;
//           const validatedCertificate = {
//              id: certificate.id || values.certificateCode,
//              userName: certificate.userName || values.userName,
//              eventName: certificate.eventName || 'Sample Event Name',
//              registrationDate: certificate.registrationDate || new Date().toISOString(),
//              eventDates: certificate.eventDates || { start: new Date().toISOString(), end: new Date().toISOString() },
//              eventDescription: certificate.eventDescription || 'Event description not provided.',
//           };
//           setCertificateData(validatedCertificate);
//           toast.success('Certificate validated successfully!');
//         } else {
//            toast.error(response.data.message || 'Certificate validation failed.');
//            setCertificateData(null);
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Error validating certificate');
//         console.error('Certificate validation error:', error);
//         setCertificateData(null);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });
//   // --- End Formik and Validation ---

//   // *** UPDATED Function to handle certificate download ***
//   const handleDownloadCertificate = async () => {
//     const certificateElement = document.getElementById('certificate-preview');
//     if (!certificateElement) {
//         toast.error('Certificate element not found.');
//         console.error('Certificate generation error: Element with ID "certificate-preview" not found.');
//         return;
//     }
//     if (!certificateData) {
//         toast.error('No certificate data available to generate PDF.');
//         console.error('Certificate generation error: certificateData is null.');
//         return;
//     }

//     setIsGenerating(true);
//     try {
//       // Capture the certificate element as a canvas
//       const canvas = await html2canvas(certificateElement, {
//         scale: 2, // Higher scale for better resolution
//         useCORS: true,
//         // Allow transparent backgrounds if the element itself is not opaque,
//         // but our #certificate-preview has bg-white, so it will be captured.
//         // backgroundColor: null, // Explicitly null or remove the property
//         scrollX: 0, // Capture from top-left
//         scrollY: 0,
//         windowWidth: certificateElement.scrollWidth, // Use element's dimensions for context
//         windowHeight: certificateElement.scrollHeight,
//       });

//       // Get the image data URL from the canvas
//       const imgData = canvas.toDataURL('image/png', 1.0);

//       // Get the dimensions of the captured canvas
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;

//       // *** Create PDF with dimensions matching the captured image ***
//       // Use 'pt' (points) as units, which often corresponds well to pixel dimensions
//       const pdf = new jsPDF({
//         orientation: imgWidth > imgHeight ? 'landscape' : 'portrait', // Set orientation based on image aspect ratio
//         unit: 'pt', // Use points as the unit
//         format: [imgWidth, imgHeight] // Set PDF page size to match the image dimensions exactly
//       });

//       // Add the image to the PDF, covering the entire page (no offsets)
//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

//       // Generate a safe filename
//       const filename = `${certificateData.userName?.replace(/[^a-zA-Z0-9]/g, '_') || 'certificate'}_certificate.pdf`;
//       pdf.save(filename);

//       toast.success('Certificate downloaded successfully!');
//     } catch (error) {
//       toast.error('Failed to generate certificate PDF.');
//       console.error('Certificate generation error:', error);
//        if (error.message && error.message.includes('color function')) {
//           toast.error('Error: An unsupported CSS color function might be used in the certificate design.', { duration: 6000 });
//       } else {
//           toast.error(`An error occurred: ${error.message || 'Unknown error'}`, { duration: 6000 });
//       }
//     } finally {
//       setIsGenerating(false);
//     }
//   };
//   // *** END UPDATED Function ***


//   // --- Helper Functions (formatDate, formatDateRange - unchanged) ---
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) {
//             return 'Invalid Date';
//         }
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     } catch (e) {
//         console.error("Error formatting date:", dateString, e);
//         return 'Invalid Date';
//     }
//   };

//   const formatDateRange = (startDateString, endDateString) => {
//         const start = formatDate(startDateString);
//         const end = formatDate(endDateString);
//         if (start === 'N/A' || start === 'Invalid Date' || end === 'N/A' || end === 'Invalid Date') {
//             if (start !== 'N/A' && start !== 'Invalid Date') return start;
//             if (end !== 'N/A' && end !== 'Invalid Date') return end;
//             return 'N/A';
//         }
//         if (start === end) {
//             return start;
//         }
//         return `${start} - ${end}`;
//     };
//    // --- End Helper Functions ---

//   // --- Render Logic (unchanged structure, uses updated handleDownloadCertificate) ---
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
//       {/* Background overlay */}
//       <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>

//       {/* Modal container */}
//       <div className="relative w-full max-w-4xl sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
//         {/* Modal header */}
//         <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-certificate text-white text-xl"></i>
//             </div>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Validate Certificate</h2>
//           </div>
//           <button
//             onClick={() => {
//               onClose();
//               formik.resetForm();
//               setCertificateData(null);
//             }}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
//             aria-label="Close modal"
//           >
//             <i className="fas fa-times text-lg"></i>
//           </button>
//         </div>

//         {/* Modal body */}
//         <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-180px)]">
//           {!certificateData ? (
//             // Validation Form
//             <form onSubmit={formik.handleSubmit} className="space-y-5">
//               <div className="space-y-4">
//                 {/* Certificate Code input */}
//                 <div>
//                   <label htmlFor="certificateCode" className="block text-sm font-medium text-gray-700 mb-1">
//                     Certificate Code
//                   </label>
//                   <input
//                     id="certificateCode"
//                     type="text"
//                     name="certificateCode"
//                     value={formik.values.certificateCode}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.certificateCode && formik.errors.certificateCode ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200`}
//                     placeholder="Enter certificate code"
//                     aria-describedby="certificateCode-error"
//                   />
//                   {formik.touched.certificateCode && formik.errors.certificateCode ? (
//                     <div id="certificateCode-error" className="text-red-600 text-xs mt-1">{formik.errors.certificateCode}</div>
//                   ) : null}
//                 </div>

//                 {/* User Name input */}
//                 <div>
//                   <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
//                     User Name
//                   </label>
//                   <input
//                     id="userName"
//                     type="text"
//                     name="userName"
//                     value={formik.values.userName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.userName && formik.errors.userName ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200`}
//                     placeholder="Enter user name as registered"
//                     aria-describedby="userName-error"
//                   />
//                   {formik.touched.userName && formik.errors.userName ? (
//                     <div id="userName-error" className="text-red-600 text-xs mt-1">{formik.errors.userName}</div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Form actions */}
//               <div className="flex justify-end items-center space-x-3 pt-5 border-t border-gray-200">
//                 <button type="button" onClick={() => { onClose(); formik.resetForm(); setCertificateData(null); }} className="px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={formik.isSubmitting} className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${formik.isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/30'}`}>
//                   {formik.isSubmitting ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Validating...</>) : 'Validate Certificate'}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             // Certificate Display and Download
//             <div className="space-y-6">
//               {/* Certificate Details */}
//               <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
//                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Certificate Details</h3>
//                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
//                     {/* Details fields using certificateData */}
//                     <div><p className="text-xs text-gray-500 uppercase font-medium">Certificate ID</p><p className="font-medium text-gray-800 break-words">{certificateData.id || 'N/A'}</p></div>
//                     <div><p className="text-xs text-gray-500 uppercase font-medium">Issued To</p><p className="font-medium text-gray-800">{certificateData.userName || 'N/A'}</p></div>
//                     <div><p className="text-xs text-gray-500 uppercase font-medium">Event Name</p><p className="font-medium text-gray-800">{certificateData.eventName || 'N/A'}</p></div>
//                     <div><p className="text-xs text-gray-500 uppercase font-medium">Issue Date</p><p className="font-medium text-gray-800">{formatDate(certificateData.registrationDate)}</p></div>
//                     <div><p className="text-xs text-gray-500 uppercase font-medium">Event Dates</p><p className="font-medium text-gray-800">{formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)}</p></div>
//                  </div>
//               </div>

//               {/* Certificate Preview Wrapper */}
//               <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center bg-gray-50">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-700">Certificate Preview</h3>
//                  {/* Certificate Preview Element */}
//                 <div className="w-full max-w-3xl overflow-hidden">
//                     {/* The actual certificate styled with inline styles */}
//                     <div
//                         id="certificate-preview"
//                         className="w-full bg-white shadow-lg" // bg-white is part of the captured design
//                         style={{ border: '10px solid #c0a062', fontFamily: 'serif', padding: '0' }}
//                     >
//                         {/* Header */}
//                         <div style={{ backgroundColor: '#1E40AF', padding: '20px 30px', textAlign: 'center', color: 'white' }}>
//                             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
//                                 <div style={{ width: '70px', height: '70px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//                                     <span style={{ fontSize: '30px', color: '#1E40AF' }}>🏆</span>
//                                 </div>
//                             </div>
//                             <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Certificate of Completion</h1>
//                             <p style={{ opacity: 0.9, marginTop: '8px', fontSize: '14px' }}>This certificate is proudly presented to</p>
//                         </div>
//                         {/* Body */}
//                         <div style={{ padding: '30px 40px' }}>
//                              <div style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 768px)': { flexDirection: 'row' }, gap: '30px' }}>
//                                 {/* Left Side */}
//                                 <div style={{ flexGrow: 1 }}>
//                                     <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px', textAlign: 'center', '@media (min-width: 768px)': { textAlign: 'left' } }}>{certificateData.userName || 'Recipient Name'}</h2>
//                                     <div style={{ color: '#374151', marginBottom: '25px', textAlign: 'center', fontSize: '15px', lineHeight: '1.6', '@media (min-width: 768px)': { textAlign: 'left' } }}>
//                                         <p style={{ marginBottom: '15px' }}>has successfully completed the <span style={{ fontWeight: '600' }}>{certificateData.eventName || 'Event Name'}</span> on {formatDate(certificateData.eventDates?.end)}.</p>
//                                         <p style={{ fontStyle: 'italic', color: '#4B5563' }}>{certificateData.eventDescription || 'Description of the event or achievement goes here.'}</p>
//                                     </div>
//                                     <div style={{ borderTop: '1px solid #D1D5DB', paddingTop: '15px', marginTop: '25px', fontSize: '12px' }}>
//                                         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
//                                             <div><p style={{ color: '#6B7280' }}>Certificate ID</p><p style={{ fontWeight: '500', wordBreak: 'break-all' }}>{certificateData.id || 'N/A'}</p></div>
//                                             <div style={{ textAlign: 'left', '@media (min-width: 768px)': { textAlign: 'right' } }}><p style={{ color: '#6B7280' }}>Event Dates</p><p style={{ fontWeight: '500' }}>{formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)}</p></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* Right Side */}
//                                 <div style={{ width: '100%', borderTop: '1px solid #D1D5DB', paddingTop: '20px', '@media (min-width: 768px)': { width: '200px', borderTop: 'none', borderLeft: '1px solid #D1D5DB', paddingLeft: '30px', paddingTop: '10px', flexShrink: 0 } }}>
//                                     <div style={{ textAlign: 'center' }}>
//                                         <div style={{ marginBottom: '15px' }}><p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Issued On</p><p style={{ fontWeight: '500', fontSize: '13px' }}>{formatDate(certificateData.registrationDate)}</p></div>
//                                         <div style={{ marginBottom: '20px' }}><p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Verification Code</p><p style={{ fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }}>{certificateData.id?.split('-').pop() || 'N/A'}</p></div>
//                                         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}><div style={{ width: '50px', height: '50px', backgroundColor: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '24px', color: '#2563EB' }}>✔️</span></div></div>
//                                         <p style={{ fontSize: '11px', color: '#6B7280' }}>Verified Certificate</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Footer Signatures */}
//                             <div style={{ borderTop: '1px solid #D1D5DB', marginTop: '30px', paddingTop: '25px' }}>
//                                 <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', fontSize: '12px', color: '#4B5563' }}>
//                                     <div><div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div><p>Authorized Signature</p></div>
//                                     <div><div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div><p>Event Coordinator</p></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-5 border-t border-gray-200">
//                 <button onClick={() => { setCertificateData(null); formik.resetForm(); }} className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
//                   Validate Another
//                 </button>
//                 <button onClick={handleDownloadCertificate} disabled={isGenerating} className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${isGenerating ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500/30'}`}>
//                   {isGenerating ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Generating...</>) : (<><i className="fas fa-download mr-2"></i>Download Certificate</>)}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateValidationModal;


import React, { useState } from 'react'; // Removed useEffect, useRef
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl'; // Assuming this path is correct

// Removed CertificateTemplate import

const CertificateValidationModal = ({ isOpen, onClose }) => {
  const [certificateData, setCertificateData] = useState(null); // Data for display & PDF
  const [isGenerating, setIsGenerating] = useState(false); // Renamed back

  // --- Formik and Validation Schema (Unchanged) ---
  const validationSchema = Yup.object({
    certificateCode: Yup.string().required('Certificate code is required'),
    userName: Yup.string().required('User name is required').min(3, 'User name must be at least 3 characters'),
  });

  const formik = useFormik({
    initialValues: { certificateCode: '', userName: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
       setSubmitting(true);
      try {
        const response = await axios.get(
          `${BASE_API_URL}/admin/events/certificates/validate`,
          { params: { certificateId: values.certificateCode, userName: values.userName } }
        );
        if (response.data.success) {
          const cert = response.data.certificate;
          // Use the data structure directly as received or map if needed for consistency
          const displayData = {
             id: cert.id || values.certificateCode,
             userName: cert.userName || values.userName, // Directly used in preview
             eventName: cert.eventName || 'Sample Event Name', // Directly used in preview
             registrationDate: cert.registrationDate || new Date().toISOString(), // Directly used in preview
             eventDates: cert.eventDates || { start: new Date().toISOString(), end: new Date().toISOString() }, // Directly used in preview
             eventDescription: cert.eventDescription || 'dsdsdsds', // Directly used in preview
          };
          setCertificateData(displayData);
          toast.success('Certificate validated successfully!');
        } else {
           toast.error(response.data.message || 'Certificate validation failed.');
           setCertificateData(null);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error validating certificate');
        console.error('Certificate validation error:', error);
        setCertificateData(null);
      } finally {
        setSubmitting(false);
      }
    },
  });
  // --- End Formik and Validation ---

  // --- ** UPDATED ** Function to handle certificate download ---
  // Captures the visible preview element directly
  const handleDownloadCertificate = async () => {
    const certificateElement = document.getElementById('certificate-preview'); // Target the visible element
    if (!certificateElement) {
        toast.error('Certificate preview element not found.');
        console.error('PDF generation error: Element with ID "certificate-preview" not found.');
        return;
    }
    if (!certificateData) {
        toast.error('No certificate data available.');
        return;
    }

    setIsGenerating(true); // Use the component's generating state
    try {
        // Give styles a moment to apply before capture
       await new Promise(resolve => setTimeout(resolve, 150));

        const canvas = await html2canvas(certificateElement, {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            logging: false,
            // Ensure canvas captures the element's size correctly
            width: certificateElement.offsetWidth,
            height: certificateElement.offsetHeight,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'pt',
            format: [imgWidth, imgHeight] // PDF size matches captured image
        });

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add image at (0,0)

        const userNameSafe = certificateData.userName?.replace(/[^a-zA-Z0-9]/g, '_') || 'user';
        const filename = `${userNameSafe}_certificate.pdf`;
        pdf.save(filename);

        toast.success('Certificate downloaded successfully!');

    } catch (error) {
        toast.error('Failed to generate certificate PDF.');
        console.error('Certificate generation error:', error);
        if (error.message && error.message.includes('color function')) {
            toast.error('Error: Unsupported CSS color used.', { duration: 6000 });
        }
    } finally {
        setIsGenerating(false); // Reset the generating state
    }
  };
  // --- End Download Function ---


  // --- Helper Functions (formatDate, formatDateRange - unchanged) ---
  const formatDate = (dateString) => { /* ... */
    if (!dateString) return 'N/A'; try { const date = new Date(dateString); if (isNaN(date.getTime())) return 'Invalid Date'; return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { console.error("Error formatting date:", dateString, e); return 'Invalid Date'; }
   };
  const formatDateRange = (startDateString, endDateString) => { /* ... */
    const start = formatDate(startDateString); const end = formatDate(endDateString); if ((start === 'N/A' || start === 'Invalid Date') && (end === 'N/A' || end === 'Invalid Date')) return 'N/A'; if (start === 'N/A' || start === 'Invalid Date') return end; if (end === 'N/A' || end === 'Invalid Date') return start; if (start === end) return start; return `${start} - ${end}`;
   };
  // --- End Helper Functions ---

  // --- Render Logic ---
  if (!isOpen) return null;

  // --- Define Styles directly in the component ---
  // Copied and adapted from the CertificateTemplate styles
  const styles = {
    outerBorder: {
      border: '15px solid #c0a062',
      backgroundColor: '#ffffff',
      fontFamily: '"Times New Roman", Times, serif',
      // Use auto width/height or specific if needed for preview sizing
      // width: '1024px', // Set fixed width for the preview element itself if desired
      overflow: 'hidden',
    },
    header: { backgroundColor: '#1E40AF', color: 'white', padding: '30px 40px', textAlign: 'center' },
    iconWrapper: { width: '75px', height: '75px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', margin: '0 auto 20px auto' },
    icon: { fontSize: '35px', color: '#c0a062' },
    mainTitle: { fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' },
    subTitle: { fontSize: '16px', opacity: 0.9, margin: 0 },
    bodyContainer: { padding: '40px 50px', display: 'flex', flexDirection: 'row', gap: '40px' },
    leftColumn: { flexGrow: 1, display: 'flex', flexDirection: 'column' },
    recipientName: { fontSize: '40px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px', textAlign: 'left' },
    completionText: { fontSize: '16px', color: '#374151', marginBottom: '10px', lineHeight: '1.6', textAlign: 'left' },
    eventDescription: { fontSize: '14px', fontStyle: 'italic', color: '#4B5563', marginBottom: '30px', textAlign: 'left' },
    detailsSection: { borderTop: '1px solid #E5E7EB', paddingTop: '20px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '12px' },
    detailItem: { textAlign: 'left' },
    detailLabel: { color: '#6B7280', display: 'block', marginBottom: '3px', fontFamily: 'Arial, sans-serif', fontSize: '11px', textTransform: 'uppercase' },
    detailValue: { fontWeight: '500', color: '#1F2937' },
    detailValueMono: { fontWeight: '500', color: '#1F2937', fontFamily: '"Courier New", Courier, monospace', wordBreak: 'break-all' },
    rightColumn: { width: '220px', flexShrink: 0, textAlign: 'center', paddingLeft: '40px', borderLeft: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '25px' },
    verificationItem: { /* No specific style needed here */ },
    verificationCheckmarkWrapper: { width: '60px', height: '60px', backgroundColor: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px auto' },
    verificationCheckmark: { fontSize: '28px', color: '#2563EB' },
    verifiedText: { fontSize: '12px', color: '#6B7280', marginTop: '5px' },
    footer: { borderTop: '1px solid #E5E7EB', marginTop: '40px', paddingTop: '30px', paddingBottom: '30px', paddingLeft: '50px', paddingRight: '50px' },
    signaturesContainer: { display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontSize: '12px', color: '#4B5563' },
    signatureLine: { height: '1px', width: '180px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' },
    signatureLabel: { /* No specific style needed here */ },
  };
  // --- End Styles Definition ---


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>

      {/* Modal container */}
      <div className="relative w-full max-w-4xl sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        {/* Modal header (Unchanged) */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
             <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><i className="fas fa-certificate text-white text-xl"></i></div><h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Validate Certificate</h2></div>
             <button onClick={() => { onClose(); formik.resetForm(); setCertificateData(null); }} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200" aria-label="Close modal"><i className="fas fa-times text-lg"></i></button>
        </div>

        {/* Modal body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          {!certificateData ? (
            // Validation Form (Unchanged)
             <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div className="space-y-4"><div><label htmlFor="certificateCode" className="block text-sm font-medium text-gray-700 mb-1">Certificate Code</label><input id="certificateCode" type="text" name="certificateCode" value={formik.values.certificateCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.certificateCode && formik.errors.certificateCode ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200`} placeholder="Enter certificate code" aria-describedby="certificateCode-error"/>{formik.touched.certificateCode && formik.errors.certificateCode ? (<div id="certificateCode-error" className="text-red-600 text-xs mt-1">{formik.errors.certificateCode}</div>) : null}</div><div><label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">User Name</label><input id="userName" type="text" name="userName" value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 !rounded-lg border ${formik.touched.userName && formik.errors.userName ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 focus:outline-none transition-all duration-200`} placeholder="Enter user name as registered" aria-describedby="userName-error"/>{formik.touched.userName && formik.errors.userName ? (<div id="userName-error" className="text-red-600 text-xs mt-1">{formik.errors.userName}</div>) : null}</div></div>
                <div className="flex justify-end items-center space-x-3 pt-5 border-t border-gray-200"><button type="button" onClick={() => { onClose(); formik.resetForm(); setCertificateData(null); }} className="px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">Cancel</button><button type="submit" disabled={formik.isSubmitting} className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${formik.isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/30'}`}>{formik.isSubmitting ? (<><i className="fas fa-spinner fa-spin mr-2"></i>Validating...</>) : 'Validate Certificate'}</button></div>
            </form>
          ) : (
            // Certificate Display and Download
            <div className="space-y-6">
              {/* Certificate Details (Display Section - Unchanged) */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                 <h3 className="text-lg font-semibold text-blue-800 mb-3">Certificate Details</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"><div><p className="text-xs text-gray-500 uppercase font-medium">Certificate ID</p><p className="font-medium text-gray-800 break-words">{certificateData.id || 'N/A'}</p></div><div><p className="text-xs text-gray-500 uppercase font-medium">Issued To</p><p className="font-medium text-gray-800">{certificateData.userName || 'N/A'}</p></div><div><p className="text-xs text-gray-500 uppercase font-medium">Event Name</p><p className="font-medium text-gray-800">{certificateData.eventName || 'N/A'}</p></div><div><p className="text-xs text-gray-500 uppercase font-medium">Issue Date</p><p className="font-medium text-gray-800">{formatDate(certificateData.registrationDate)}</p></div><div><p className="text-xs text-gray-500 uppercase font-medium">Event Dates</p><p className="font-medium text-gray-800">{formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)}</p></div></div>
              </div>

              {/* Certificate Preview Wrapper (Visible Preview) */}
              <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Certificate Preview</h3>
                 {/* --- START: VISIBLE Certificate Preview Element (Styled Inline) --- */}
                <div className="w-full max-w-3xl overflow-hidden"> {/* Control max width */}
                     {/* This is the element that will be captured */}
                    <div id="certificate-preview" style={styles.outerBorder}>
                        {/* Header */}
                        <div style={styles.header}>
                            <div style={styles.iconWrapper}><span style={styles.icon}>🏆</span></div>
                            <h1 style={styles.mainTitle}>Certificate of Completion</h1>
                            <p style={styles.subTitle}>This certificate is proudly presented to</p>
                        </div>
                        {/* Body */}
                        <div style={styles.bodyContainer}>
                            {/* Left Column */}
                            <div style={styles.leftColumn}>
                                <h2 style={styles.recipientName}>{certificateData.userName || 'Recipient Name'}</h2>
                                <p style={styles.completionText}>
                                    has successfully completed the <span style={{ fontWeight: '600' }}>{certificateData.eventName || 'Event Name'}</span> on {formatDate(certificateData.eventDates?.end)}.
                                </p>
                                <p style={styles.eventDescription}>
                                    {certificateData.eventDescription || 'dsdsdsds'}
                                </p>
                                <div style={styles.detailsSection}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Certificate ID</span>
                                        <p style={styles.detailValueMono}>{certificateData.id || 'N/A'}</p>
                                    </div>
                                    <div style={{...styles.detailItem, textAlign: 'right'}}>
                                        <span style={styles.detailLabel}>Event Dates</span>
                                        <p style={styles.detailValue}>{formatDateRange(certificateData.eventDates?.start, certificateData.eventDates?.end)}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column */}
                            <div style={styles.rightColumn}>
                                <div style={styles.verificationItem}>
                                    <span style={styles.detailLabel}>Issued On</span>
                                    <p style={styles.detailValue}>{formatDate(certificateData.registrationDate)}</p>
                                </div>
                                <div style={styles.verificationItem}>
                                    <span style={styles.detailLabel}>Verification Code</span>
                                    <p style={styles.detailValueMono}>{certificateData.id?.split('-').pop() || 'N/A'}</p>
                                </div>
                                <div style={styles.verificationItem}>
                                    <div style={styles.verificationCheckmarkWrapper}><span style={styles.verificationCheckmark}>✔️</span></div>
                                    <p style={styles.verifiedText}>Verified Certificate</p>
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div style={styles.footer}>
                            <div style={styles.signaturesContainer}>
                                <div><div style={styles.signatureLine}></div><p style={styles.signatureLabel}>Authorized Signature</p></div>
                                <div><div style={styles.signatureLine}></div><p style={styles.signatureLabel}>Event Coordinator</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* --- END: VISIBLE Certificate Preview Element --- */}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-5 border-t border-gray-200">
                <button onClick={() => { setCertificateData(null); formik.resetForm(); }} className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">Validate Another</button>
                {/* Use the 'isGenerating' state for the button */}
                <button onClick={handleDownloadCertificate} disabled={isGenerating} className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${isGenerating ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500/30'}`}>
                    {isGenerating ? (<><svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating...</>) : (<><i className="fas fa-download mr-2"></i>Download Certificate</>)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateValidationModal;