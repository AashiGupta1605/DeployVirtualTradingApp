// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import {
//   fetchUserCertificates,
//   downloadCertificate,
//   selectAllCertificates,
//   selectCertificatesStatus,
//   selectCertificatesError,
//   selectDownloadingCertificate
// } from '../../redux/User/events/eventsSlice';
// import {
//   Award,
//   Calendar,
//   Download,
//   FileText,
//   IndianRupee,
//   Trophy,
//   Users,
//   Clock,
//   CheckCircle,
//   X
// } from 'lucide-react';

// const MyCertifications = () => {
//   const dispatch = useDispatch();
//   const certificates = useSelector(selectAllCertificates);
//   const status = useSelector(selectCertificatesStatus);
//   const error = useSelector(selectCertificatesError);
//   const downloadingCertificate = useSelector(selectDownloadingCertificate);
//   const isAuthenticated = useSelector((state) => state.user.auth.isAuthenticated);

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Handle certificate download
//   const handleDownload = (certificateId) => {
//     dispatch(downloadCertificate(certificateId))
//       .unwrap()
//       .catch((error) => {
//         toast.error(error || 'Failed to download certificate');
//       });
//   };

//   // Fetch certificates on component mount
//   useEffect(() => {
//     if (isAuthenticated) {
//       dispatch(fetchUserCertificates());
//     }
//   }, [dispatch, isAuthenticated]);

//   // Loading state
//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (status === 'failed') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Error Loading Certificates</h2>
//           <p className="mb-6 text-red-500">{error || 'Failed to fetch certificates'}</p>
//           <button 
//             onClick={() => dispatch(fetchUserCertificates())}
//             className="px-6 py-3 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Authentication check
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
//           <p className="mb-6">You need to be logged in to view your certificates</p>
//           <Link 
//             to="/login"
//             className="px-6 py-3 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (certificates.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//         <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-extrabold text-gray-900">My Certificates</h1>
//             <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
//               View and download your trading competition certificates
//             </p>
//           </div>
          
//           <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
//             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <Award className="text-gray-400" size={36} />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-600 mb-4">
//               No certificates yet
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto mb-6">
//               You haven't completed any events yet. Complete an event to earn your first certificate!
//             </p>
//             <Link 
//               to="/user/events"
//               className="px-6 py-3 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
//             >
//               Browse Events
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Main Content */}
//       <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900">My Certificates</h1>
//           <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
//             View and download your trading competition certificates
//           </p>
//         </div>

//         {/* Certificates Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {certificates.map((certificate) => (
//             <div 
//               key={certificate.certificateId}
//               className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200"
//             >
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xs mr-3">
//                       <Award className="text-lightBlue-600" size={20} />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
//                         {certificate.event.title}
//                       </h3>
//                       <div className="flex items-center mt-2">
//                         <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                           Completed
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center">
//                       <Calendar className="mr-1.5 text-gray-500" size={14} />
//                       <span className="text-gray-600">
//                         {formatDate(certificate.event.startDate)} - {formatDate(certificate.event.endDate)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="flex items-center text-sm">
//                       <FileText className="mr-1.5 text-gray-500" size={14} />
//                       <div>
//                         <span className="text-gray-500">Certificate ID</span>
//                         <p className="font-mono text-xs">{certificate.certificateId}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center text-sm">
//                       <Calendar className="mr-1.5 text-gray-500" size={14} />
//                       <div>
//                         <span className="text-gray-500">Issued On</span>
//                         <p className="font-medium">{formatDate(certificate.registrationDate)}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <Trophy className="mr-1.5 text-yellow-500" size={14} />
//                         <span className="text-sm text-gray-600">Certificate Status</span>
//                       </div>
//                       <span className="text-sm font-semibold text-green-600">Verified</span>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleDownload(certificate.certificateId)}
//                       disabled={downloadingCertificate === certificate.certificateId}
//                       className="flex-1 py-2 px-4 bg-lightBlue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
//                     >
//                       {downloadingCertificate === certificate.certificateId ? (
//                         <>
//                           <span className="animate-pulse">Generating...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Download className="mr-2" size={16} />
//                           Download
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCertifications;

// real one working


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import {
//   fetchUserCertificates,
//   downloadCertificate,
//   selectAllCertificates,
//   selectCertificatesStatus,
//   selectCertificatesError,
//   selectDownloadingCertificate
// } from '../../redux/User/events/eventsSlice';
// import {
//   Award,
//   Calendar,
//   Download,
//   FileText,
//   Trophy,
//   Users,
//   Clock,
//   CheckCircle,
//   X
// } from 'lucide-react';

// const MyCertifications = () => {
//   const dispatch = useDispatch();
//   const certificates = useSelector(selectAllCertificates);
//   const status = useSelector(selectCertificatesStatus);
//   const error = useSelector(selectCertificatesError);
//   const downloadingCertificate = useSelector(selectDownloadingCertificate);
//   const isAuthenticated = useSelector((state) => state.user.auth.isAuthenticated);

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Handle certificate download
//   const handleDownload = (certificateId) => {
//     dispatch(downloadCertificate(certificateId))
//       .unwrap()
//       .catch((error) => {
//         toast.error(error || 'Failed to download certificate');
//       });
//   };

//   // Fetch certificates on component mount
//   useEffect(() => {
//     if (isAuthenticated) {
//       dispatch(fetchUserCertificates());
//     }
//   }, [dispatch, isAuthenticated]);

//   // Loading state
//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (status === 'failed') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800">Error Loading Certificates</h2>
//           <p className="mb-6 text-red-500">{error || 'Failed to fetch certificates'}</p>
//           <button 
//             onClick={() => dispatch(fetchUserCertificates())}
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Authentication check
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Log In</h2>
//           <p className="mb-6 text-gray-600">You need to be logged in to view your certificates</p>
//           <Link 
//             to="/login"
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (certificates.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-extrabold text-gray-900">My Certificates</h1>
//             <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
//               View and download your trading competition certificates
//             </p>
//           </div>
          
//           <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
//             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <Award className="text-gray-400" size={36} />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-600 mb-4">
//               No certificates yet
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto mb-6">
//               You haven't completed any events yet. Complete an event to earn your first certificate!
//             </p>
//             <Link 
//               to="/user/events"
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
//             >
//               Browse Events
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main Content */}
//       <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900">My Certificates</h1>
//           <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
//             View and download your trading competition certificates
//           </p>
//         </div>

//         {/* Certificates Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {certificates.map((certificate) => (
//             <div 
//               key={certificate.certificateId}
//               className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200"
//             >
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xs mr-3">
//                       <Award className="text-blue-600" size={20} />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
//                         {certificate.event.title}
//                       </h3>
//                       <div className="flex items-center mt-2">
//                         <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                           Completed
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center">
//                       <Calendar className="mr-1.5 text-gray-500" size={14} />
//                       <span className="text-gray-600">
//                         {formatDate(certificate.event.startDate)} - {formatDate(certificate.event.endDate)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="flex items-center text-sm">
//                       <FileText className="mr-1.5 text-gray-500" size={14} />
//                       <div>
//                         <span className="text-gray-500">Certificate ID</span>
//                         <p className="font-mono text-xs">{certificate.certificateId}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center text-sm">
//                       <Calendar className="mr-1.5 text-gray-500" size={14} />
//                       <div>
//                         <span className="text-gray-500">Issued On</span>
//                         <p className="font-medium">{formatDate(certificate.registrationDate)}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <Trophy className="mr-1.5 text-yellow-500" size={14} />
//                         <span className="text-sm text-gray-600">Certificate Status</span>
//                       </div>
//                       <span className="text-sm font-semibold text-green-600">Verified</span>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleDownload(certificate.certificateId)}
//                       disabled={downloadingCertificate === certificate.certificateId}
//                       className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
//                     >
//                       {downloadingCertificate === certificate.certificateId ? (
//                         <span className="animate-pulse">Generating...</span>
//                       ) : (
//                         <>
//                           <Download className="mr-2" size={16} />
//                           Download
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCertifications;






import React, { useEffect, useState, useRef } from 'react'; // Added useState, useRef
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import html2canvas from 'html2canvas'; // Import html2canvas
import jsPDF from 'jspdf'; // Import jsPDF
import {
  fetchUserCertificates,
  // downloadCertificate, // We might not need this Redux action anymore for frontend generation
  selectAllCertificates,
  selectCertificatesStatus,
  selectCertificatesError,
  // selectDownloadingCertificate // Replace with local state if generation is purely frontend
} from '../../redux/User/events/eventsSlice'; // Adjust path if needed
import {
  Award,
  Calendar,
  Download,
  FileText,
  Trophy,
  // Users, // Not used in the final render
  // Clock, // Not used in the final render
  // CheckCircle, // Not used in the final render
  // X // Not used in the final render
} from 'lucide-react';

// Import the template component
import CertificateTemplate from '../../components/User/Modals/CertificateTemplate'; // Adjust path if needed
const user = JSON.parse(localStorage.getItem('user'));
const userName = user?.name;
console.log(userName);



const MyCertifications = () => {
  const dispatch = useDispatch();
  const certificates = useSelector(selectAllCertificates);
  const status = useSelector(selectCertificatesStatus);
  const error = useSelector(selectCertificatesError);
  // const downloadingCertificateRedux = useSelector(selectDownloadingCertificate); // Keep if needed elsewhere, otherwise remove
  const isAuthenticated = useSelector((state) => state.user.auth.isAuthenticated);

  // --- Local State ---
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(null); // Stores the ID of the certificate being generated
  const [certificateToRender, setCertificateToRender] = useState(null); // Data for the off-screen template

  // Ref to the container for the off-screen certificate
  const certificateRenderRef = useRef(null);

  // --- Format Date (keep as is) ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch (e) { return 'Invalid Date'; }
  };

  // --- *** UPDATED Handle certificate download *** ---
  const handleDownload = async (certificateId) => {
    // Find the full certificate data object
    const certData = certificates.find(c => c.certificateId === certificateId);
    if (!certData) {
      toast.error('Certificate data not found.');
      return;
    }

    // Set state to trigger rendering the template off-screen
    setIsGeneratingPdf(certificateId); // Show loading state on button
    setCertificateToRender(certData); // Provide data to the template
    // The actual PDF generation will happen in the useEffect below
  };

  // --- Effect to run PDF generation after the template is rendered/updated ---
  useEffect(() => {
    // Only run if certificateToRender has data (meaning a download was requested)
    if (certificateToRender && certificateRenderRef.current) {
      const certificateId = certificateToRender.certificateId;
      const elementToCapture = document.getElementById(`certificate-render-${certificateId}`); // Target the specific off-screen element

      if (!elementToCapture) {
          console.error(`Element with ID certificate-render-${certificateId} not found.`);
          toast.error("Failed to find certificate element for download.");
          setIsGeneratingPdf(null); // Reset state on error
          setCertificateToRender(null);
          return;
      }

      const generatePdf = async () => {
        try {
          const canvas = await html2canvas(elementToCapture, {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: elementToCapture.scrollWidth,
            windowHeight: elementToCapture.scrollHeight,
          });

          const imgData = canvas.toDataURL('image/png', 1.0);
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;

          const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'pt',
            format: [imgWidth, imgHeight]
          });

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

          const userNameSafe = userName?.replace(/[^a-zA-Z0-9]/g, '_') || 'user';
          const filename = `${userNameSafe}_${certificateToRender.event?.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'certificate'}.pdf`;
          pdf.save(filename);

          toast.success('Certificate downloaded successfully!');

        } catch (error) {
          toast.error('Failed to generate certificate PDF.');
          console.error('Certificate generation error:', error);
          if (error.message && error.message.includes('color function')) {
             toast.error('Error: An unsupported CSS color function might be used.', { duration: 6000 });
          }
        } finally {
          // Clean up: Reset state regardless of success or failure
          setIsGeneratingPdf(null);
          setCertificateToRender(null);
        }
      };

      // Use a small timeout to ensure the DOM has updated with the template
      const timer = setTimeout(generatePdf, 100);

      // Cleanup function for the timeout if component unmounts or effect re-runs
      return () => clearTimeout(timer);
    }
  }, [certificateToRender]); // This effect depends on certificateToRender


  // Fetch certificates on component mount (keep as is)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserCertificates());
    }
  }, [dispatch, isAuthenticated]);

  // --- Loading, Error, Auth Check, Empty States (keep as is) ---
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Error Loading Certificates</h2>
          <p className="mb-6 text-red-500">{error || 'Failed to fetch certificates'}</p>
          <button
            onClick={() => dispatch(fetchUserCertificates())}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Log In</h2>
          <p className="mb-6 text-gray-600">You need to be logged in to view your certificates</p>
          <Link
            to="/login" // Adjust login path if needed
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

   if (certificates.length === 0 && status === 'succeeded') { // Check status too
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">My Certificates</h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              View and download your trading competition certificates
            </p>
          </div>

          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Award className="text-gray-400" size={36} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No certificates yet
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Complete an event to earn your first certificate!
            </p>
            <Link
              to="/user/events" // Adjust path if needed
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // --- End Loading/Error/Empty states ---


  return (
    <div className="min-h-screen bg-gray-50 relative"> {/* Added relative positioning */}

      {/* --- Hidden Container for Rendering Certificate Template --- */}
      <div
        ref={certificateRenderRef}
        style={{
          position: 'absolute',
          left: '-9999px', // Position off-screen
          top: '-9999px',
          // width: '1024px', // Optional: Set width if needed for layout consistency during capture
          // height: 'auto'
        }}
        aria-hidden="true" // Hide from screen readers
      >
        {certificateToRender && <CertificateTemplate certificateData={certificateToRender} />}
      </div>
      {/* --- End Hidden Container --- */}


      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">My Certificates</h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            View and download your trading competition certificates
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div
              key={certificate.certificateId} // Use the unique certificate ID
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200 flex flex-col" // Added flex flex-col
            >
              <div className="p-5 flex-grow"> {/* Added flex-grow */}
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center overflow-hidden"> {/* Added overflow-hidden */}
                     <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xs mr-3 flex-shrink-0"> {/* Added flex-shrink-0 */}
                       <Award className="text-blue-600" size={20} />
                     </div>
                     <div className="flex-grow min-w-0"> {/* Added flex-grow and min-w-0 */}
                       <h3 className="text-lg font-bold text-gray-800 truncate"> {/* Use truncate */}
                         {certificate.event?.title || 'Untitled Event'}
                       </h3>
                       {/* Assuming completion status is always true here, otherwise add logic */}
                       <div className="flex items-center mt-1">
                         <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 font-medium">
                           Completed
                         </span>
                       </div>
                     </div>
                   </div>
                </div>

                <div className="space-y-3"> {/* Reduced spacing slightly */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="mr-1.5 text-gray-500" size={14} />
                      <span>
                        {formatDate(certificate.event?.startDate)} - {formatDate(certificate.event?.endDate)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-100 py-3 grid grid-cols-2 gap-3">
                    <div className="flex items-start text-sm"> {/* Changed to items-start */}
                      <FileText className="mr-1.5 text-gray-500 mt-0.5 flex-shrink-0" size={14} />
                      <div>
                        <span className="text-gray-500 block text-xs">Certificate ID</span>
                        <p className="font-mono text-xs break-all">{certificate.certificateId || 'N/A'}</p> {/* break-all */}
                      </div>
                    </div>
                    <div className="flex items-start text-sm"> {/* Changed to items-start */}
                       <Calendar className="mr-1.5 text-gray-500 mt-0.5 flex-shrink-0" size={14} />
                      <div>
                        <span className="text-gray-500 block text-xs">Issued On</span>
                        <p className="font-medium">{formatDate(certificate.registrationDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Trophy className="mr-1.5 text-yellow-500" size={14} />
                        <span>Certificate Status</span>
                      </div>
                      {/* Assuming always verified for earned certificates */}
                      <span className="text-sm font-semibold text-green-600">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions - Pinned to bottom */}
               <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <button
                      onClick={() => handleDownload(certificate.certificateId)}
                      disabled={isGeneratingPdf === certificate.certificateId} // Use local state
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                      {isGeneratingPdf === certificate.certificateId ? ( // Use local state
                          <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Generating...</span>
                          </>
                      ) : (
                          <>
                              <Download className="mr-2" size={16} />
                              Download Certificate
                          </>
                      )}
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCertifications;