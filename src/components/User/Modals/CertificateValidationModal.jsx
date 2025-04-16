
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import toast from 'react-hot-toast';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const CertificateValidationModal = ({ isOpen, onClose }) => {
//   const [certificateData, setCertificateData] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Validation schema
//   const validationSchema = Yup.object({
//     certificateCode: Yup.string()
//       .required('Certificate code is required')
//       .matches(/^[A-Z0-9]{8}$/, 'Certificate code must be 8 alphanumeric characters'),
//     userName: Yup.string()
//       .required('User name is required')
//       .min(3, 'User name must be at least 3 characters')
//   });

//   const formik = useFormik({
//     initialValues: {
//       certificateCode: '',
//       userName: ''
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         // Simulate API call to validate certificate
//         const response = await new Promise(resolve => {
//           setTimeout(() => {
//             resolve({
//               valid: true,
//               certificate: {
//                 id: `CERT-${values.certificateCode}`,
//                 userName: values.userName,
//                 issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//                 completionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//                 courseName: 'Virtual Trading Certification Program',
//                 serialNumber: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
//                 instructor: 'Dr. John Smith',
//                 duration: '12 weeks',
//                 skills: ['Technical Analysis', 'Risk Management', 'Portfolio Strategy']
//               }
//             });
//           }, 1000);
//         });

//         if (response.valid) {
//           setCertificateData(response.certificate);
//           toast.success('Certificate validated successfully!');
//         } else {
//           toast.error('Invalid certificate code or user name');
//         }
//       } catch (error) {
//         toast.error('Error validating certificate');
//         console.error('Certificate validation error:', error);
//       }
//     }
//   });

//   const handleDownloadCertificate = async () => {
//     setIsGenerating(true);
//     try {
//       const certificateElement = document.getElementById('certificate-preview');
//       const canvas = await html2canvas(certificateElement, {
//         scale: 2,
//         logging: false,
//         useCORS: true,
//         backgroundColor: '#f8f9fa'
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
//                     placeholder="Enter 8-digit certificate code"
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
//                     placeholder="Enter user name"
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
//                     <p className="text-sm text-gray-600">Course Name</p>
//                     <p className="font-medium">{certificateData.courseName}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Serial Number</p>
//                     <p className="font-medium">{certificateData.serialNumber}</p>
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
//                     borderRadius: '5px'
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
//                             has successfully completed the <span className="font-semibold">{certificateData.courseName}</span> 
//                             on {certificateData.completionDate}.
//                           </p>
//                           <p>
//                             This program covered essential topics in virtual trading including {certificateData.skills.join(', ')}.
//                           </p>
//                         </div>

//                         <div className="border-t border-gray-300 pt-4 mt-6">
//                           <div className="flex justify-between">
//                             <div>
//                               <p className="text-sm text-gray-600">Instructor</p>
//                               <p className="font-medium">{certificateData.instructor}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-600">Duration</p>
//                               <p className="font-medium">{certificateData.duration}</p>
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
//                             <p className="font-medium">{certificateData.issueDate}</p>
//                           </div>
//                           <div className="mb-6">
//                             <p className="text-sm text-gray-600">Serial Number</p>
//                             <p className="font-mono">{certificateData.serialNumber}</p>
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
//                           <p className="text-sm text-gray-600">Program Director</p>
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


import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/BaseUrl';

const CertificateValidationModal = ({ isOpen, onClose }) => {
  const [certificateData, setCertificateData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    certificateCode: Yup.string()
      .required('Certificate code is required'),
      // .matches(/^CERT-[A-Z0-9]{8}-[A-Z0-9]{6}$/, 'Invalid certificate code format'),
    userName: Yup.string()
      .required('User name is required')
      .min(3, 'User name must be at least 3 characters')
  });

  const formik = useFormik({
    initialValues: {
      certificateCode: '',
      userName: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // API call to validate certificate
        const response = await axios.get(
          `${BASE_API_URL}/admin/events/certificates/validate`,
          {
            params: {
              certificateId: values.certificateCode,
              userName: values.userName
            }
          }
        );

        if (response.data.success) {
          setCertificateData(response.data.certificate);
          toast.success('Certificate validated successfully!');
        } else {
          toast.error(response.data.message || 'Invalid certificate code or user name');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error validating certificate');
        console.error('Certificate validation error:', error);
      }
    }
  });

  const handleDownloadCertificate = async () => {
    setIsGenerating(true);
    try {
      const certificateElement = document.getElementById('certificate-preview');
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#f8f9fa'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${certificateData.userName.replace(' ', '_')}_certificate.pdf`);
      
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate certificate');
      console.error('Certificate generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

      {/* Modal container */}
      <div
        style={{ width: '100%', maxWidth: '90%' }}
        className="relative w-full sm:mx-auto my-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br bg-lightBlue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-certificate text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Validate Certificate</h2>
          </div>
          {/* Close button */}
          <button
            onClick={() => {
              onClose();
              formik.resetForm();
              setCertificateData(null);
            }}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {!certificateData ? (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Certificate Code input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Code
                  </label>
                  <input
                    type="text"
                    name="certificateCode"
                    value={formik.values.certificateCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
                    bg-white text-gray-900 
                    focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
                    focus:outline-none transition-all duration-200"
                    placeholder="Enter certificate code (e.g. CERT-ABC12345-XYZ789)"
                  />
                  {formik.touched.certificateCode && formik.errors.certificateCode ? (
                    <div className="text-red-500 text-sm">{formik.errors.certificateCode}</div>
                  ) : null}
                </div>

                {/* User Name input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 !rounded-xl border !border-gray-200 
                    bg-white text-gray-900 
                    focus:!border-blue-500 focus:ring-2 focus:!ring-blue-500/20 
                    focus:outline-none transition-all duration-200"
                    placeholder="Enter user name as registered"
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <div className="text-red-500 text-sm">{formik.errors.userName}</div>
                  ) : null}
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
                {/* Cancel button */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    formik.resetForm();
                  }}
                  className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r bg-lightBlue-600 text-white hover:bg-lightBlue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  {formik.isSubmitting ? 'Validating...' : 'Validate Certificate'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Certificate Details */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Certificate Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Certificate ID</p>
                    <p className="font-medium">{certificateData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Issued To</p>
                    <p className="font-medium">{certificateData.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Event Name</p>
                    <p className="font-medium">{certificateData.eventName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Registration Date</p>
                    <p className="font-medium">
                      {new Date(certificateData.registrationDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">Certificate Preview</h3>
                
                {/* Horizontal Certificate Design */}
                <div 
                  id="certificate-preview"
                  className="w-full max-w-4xl bg-white shadow-lg overflow-hidden"
                  style={{
                    border: '15px solid #d4af37',
                    borderRadius: '5px'
                  }}
                >
                  {/* Certificate Header */}
                  <div className="bg-lightBlue-600 py-6 px-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                        <i className="fas fa-certificate text-lightBlue-600 text-3xl"></i>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Certificate of Completion</h1>
                    <p className="text-white opacity-90 mt-2">This certificate is proudly presented to</p>
                  </div>

                  {/* Certificate Body */}
                  <div className="p-8">
                    {/* Main Content */}
                    <div className="flex flex-col md:flex-row">
                      {/* Left Side - Main Content */}
                      <div className="md:w-2/3 md:pr-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
                          {certificateData.userName}
                        </h2>
                        
                        <div className="text-gray-700 mb-6 text-center md:text-left">
                          <p className="mb-4">
                            has successfully completed the <span className="font-semibold">{certificateData.eventName}</span> 
                            on {new Date(certificateData.eventDates.end).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}.
                          </p>
                          <p>
                            {certificateData.eventDescription}
                          </p>
                        </div>

                        <div className="border-t border-gray-300 pt-4 mt-6">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-gray-600">Certificate ID</p>
                              <p className="font-medium">{certificateData.id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Event Dates</p>
                              <p className="font-medium">
                                {new Date(certificateData.eventDates.start).toLocaleDateString()} - {' '}
                                {new Date(certificateData.eventDates.end).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Verification */}
                      <div className="md:w-1/3 md:border-l md:border-gray-300 md:pl-8 mt-6 md:mt-0">
                        <div className="text-center">
                          <div className="mb-4">
                            <p className="text-sm text-gray-600">Certificate ID</p>
                            <p className="font-mono text-lg">{certificateData.id}</p>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-gray-600">Issued On</p>
                            <p className="font-medium">
                              {new Date(certificateData.registrationDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="mb-6">
                            <p className="text-sm text-gray-600">Verification Code</p>
                            <p className="font-mono">{certificateData.id.split('-')[2]}</p>
                          </div>
                          <div className="flex justify-center">
                            <div className="w-24 h-24 bg-lightBlue-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-check-circle text-lightBlue-600 text-4xl"></i>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">Verified Certificate</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Signatures */}
                    <div className="border-t border-gray-300 mt-8 pt-8">
                      <div className="flex justify-between">
                        <div className="text-center">
                          <div className="h-1 w-32 bg-gray-400 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Authorized Signature</p>
                        </div>
                        <div className="text-center">
                          <div className="h-1 w-32 bg-gray-400 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Event Coordinator</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setCertificateData(null);
                    formik.resetForm();
                  }}
                  className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Validate Another
                </button>
                <button
                  onClick={handleDownloadCertificate}
                  disabled={isGenerating}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r bg-green-600 text-white hover:bg-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                >
                  {isGenerating ? 'Generating...' : 'Download Certificate'}
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