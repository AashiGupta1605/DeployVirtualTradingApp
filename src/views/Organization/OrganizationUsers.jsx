// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentList = ({ onRegisterClick }) => {
//   const [StudentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("/api/students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching Students:", error);
//     }
//   };

//   const filteredStudents = StudentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
//       <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-700 text-xl font-bold ">
//             Manage Students
//           </h6>
//           <div className="flex space-x-4">
//             <button
//               onClick={onRegisterClick}
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Contact Person
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Status
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student.id}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.type}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.contactPerson}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.status}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button className="text-red-500 hover:text-red-700">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentList;


// hard code data 

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentList = ({ onRegisterClick }) => {
//   const [StudentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       // Dummy data for Students
//       const dummyData = [
//         {
//           id: 1,
//           name: "John Doe",
//           email: "john@example.com",
//           password: "password123",
//           mobile: "1234567890",
//           gender: "Male",
//           dob: "1990-01-01",
//           status: "approved",
//           addedby: "Admin",
//           orgtype: "School",
//         },
//         {
//           id: 2,
//           name: "Alice Smith",
//           email: "alice@example.com",
//           password: "password456",
//           mobile: "0987654321",
//           gender: "Female",
//           dob: "1992-02-02",
//           status: "pending",
//           addedby: "Admin",
//           orgtype: "College",
//         },
//         {
//           id: 3,
//           name: "Bob Johnson",
//           email: "bob@example.com",
//           password: "password789",
//           mobile: "1122334455",
//           gender: "Male",
//           dob: "1988-03-03",
//           status: "rejected",
//           addedby: "Admin",
//           orgtype: "University",
//         },
//       ];

//       setStudentList(dummyData);
//       // Uncomment the following lines to fetch real data
//       // const response = await axios.get("/api/students");
//       // setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching Students:", error);
//     }
//   };

//   const filteredStudents = StudentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
//       <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-700 text-xl font-bold ">
//             Manage Students
//           </h6>
//           <div className="flex space-x-4">
//             <button
//               onClick={onRegisterClick}
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Password
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Mobile
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Gender
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Date of Birth
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Status
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Added By
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student.id}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.password}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.mobile}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.gender}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.dob}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.status}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.addedby}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgtype}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button className="text-red-500 hover:text-red-700">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const StudentList = ({ onRegisterClick }) => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const filteredStudents = studentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
//       <Toaster />
//       <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-700 text-xl font-bold ">
//             Manage Students
//           </h6>
//           <div className="flex space-x-4">
//             {/* <button
//               onClick={onRegisterClick}
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button> */}
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Password
//               </th> */}
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Mobile
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Gender
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Date of Birth
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Status
//               </th>
//               {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Added By
//               </th> */}
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student._id}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.password}
//                 </td> */}
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.mobile}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.gender}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.dob}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.status}
//                   Pending
//                 </td>
//                 {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.addedby}
//                 </td> */}
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgtype}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(student._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentList;




// new one inside regostrations

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import OrganizationRegistrationForm from "views/Organization/auth/Register.js";

// const StudentList = ({ onRegisterClick }) => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const filteredStudents = studentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
//       <Toaster />
//       <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-700 text-xl font-bold ">
//             Manage Students
//           </h6>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setModalOpen(true)} // Open the registration modal
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Mobile
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Gender
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Date of Birth
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Status
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student._id}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.mobile}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.gender}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.dob}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.status}
//                   Pending
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgtype}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(student._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Organization Registration Modal */}
//       <OrganizationRegistrationForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
//     </div>
//   );
// };

// export default StudentList;





// new one 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import OrganizationRegistrationForm from "views/Organization/auth/Register.js";

// const StudentList = ({ onRegisterClick }) => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const handleAddStudent = (newStudent) => {
//     setStudentList((prevList) => [...prevList, newStudent]);
//   };

//   const filteredStudents = studentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
//       <Toaster />
//       <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-700 text-xl font-bold ">
//             Manage Students
//           </h6>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setModalOpen(true)} // Open the registration modal
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Mobile
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Gender
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Date of Birth
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Status
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student, i) => (
//               <tr key={i}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.mobile}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.gender}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.dob}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.status}
//                   Pending
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgtype}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(student._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Organization Registration Modal */}
//       <OrganizationRegistrationForm
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onAddStudent={handleAddStudent}
//       />
//     </div>
//   );
// };

// export default StudentList;



// new one again

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import OrganizationRegistrationForm from "views/Organization/auth/Register.js";

// const StudentList = ({ onRegisterClick }) => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const handleAddStudent = (newStudent) => {
//     setStudentList((prevList) => [...prevList, newStudent]);
//   };

//   const filteredStudents = studentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
//       <Toaster />
//       <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-700 text-xl font-bold ">
//             Manage Students
//           </h6>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setModalOpen(true)} // Open the registration modal
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Mobile
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Gender
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Date of Birth
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Status
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student._id}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.mobile}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.gender}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.dob}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.status}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgtype}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(student._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Organization Registration Modal */}
//       <OrganizationRegistrationForm
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onAddStudent={handleAddStudent}
//       />
//     </div>
//   );
// };

// export default StudentList;



// new one again


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import OrganizationRegistrationForm from "views/Organization/auth/Register.js";

// const StudentList = () => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const handleAddStudent = (newStudent) => {
//     setStudentList((prevList) => [newStudent, ...prevList]);
//   };

//   const filteredStudents = studentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
//       <Toaster />
//       <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-700 text-xl font-bold ">
//             Manage Students
//           </h6>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setModalOpen(true)} // Open the registration modal
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Mobile
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Gender
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Date of Birth
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Status
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student._id}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.mobile}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.gender}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.dob}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.status}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgtype}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(student._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Organization Registration Modal */}
//       <OrganizationRegistrationForm
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onAddStudent={handleAddStudent}
//       />
   
//     </div>
//   );
// };

// export default StudentList;



// new regres area

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import RegistrationForm from "../../views/Organization/auth/Register";
// import Dashboard from "./Dashboard";

// const StudentList = () => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const filteredStudents = studentList.filter((student) => {
//     if (filter === "all") return true;
//     return student.status === filter;
//   });

//   return (
//     <div className="relative">

//     <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg border-0 mt-24">
//       <Dashboard type="student-list"/>
//       <Toaster />
//       <div className=" rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//         <div className="text-center flex justify-between ">
//           <h6 className="text-blueGray-500 text-xl font-bold ">
//             Manage Users
//           </h6>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setModalOpen(true)} // Open the registration modal
//               className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//             >
//               Register New Students
//             </button>
//             {/* <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
//             >
//               <option value="all">All</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select> */}
//           </div>
//         </div>
//       </div>
//       <div className="block w-full overflow-x-auto">
//         <table className="items-center w-full bg-transparent border-collapse">
//           <thead>
//             <tr>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Email
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Mobile
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Gender
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Date of Birth
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Name
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Organization Type
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 createdDate
//               </th>
//               <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (

//               <tr key={student._id}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.name}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.email}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.mobile}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.gender}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.dob}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgName}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.orgtype}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   {student.createdDate}


                  
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(student._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Organization Registration Modal */}
//       <RegistrationForm
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//       />
//     </div>
//     </div>

//   );
// };

// export default StudentList;




// include update functionality

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import RegistrationForm from "../../views/Organization/auth/Register";
// import Dashboard from "./Dashboard";

// const StudentList = () => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state
//   const [selectedStudent, setSelectedStudent] = useState(null); // Selected student for editing

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//         window.location.reload(); // Refresh the page to show the new user
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const handleEdit = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   const filteredStudents = studentList.filter(() => {
//     if (filter === "all") return true;
//     // return student.status === filter;
//   });

//   return (
//     <div className="relative">
//       <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg border-0 mt-24">
//         <Dashboard type="student-list"/>
//         <Toaster />
//         <div className="rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//           <div className="text-center flex justify-between">
//             <h6 className="text-blueGray-500 text-xl font-bold">
//               Manage Users
//             </h6>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => { setSelectedStudent(null); setModalOpen(true); }} // Open the registration modal
//                 className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//               >
//                 Register New Students
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="block w-full overflow-x-auto">
//           <table className="items-center w-full bg-transparent border-collapse">
//             <thead>
//               <tr>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Name
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Email
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Mobile
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Gender
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Date of Birth
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Organization Name
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Organization Type
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Created Date
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((student) => (
//                 <tr key={student._id}>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.name}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.email}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.mobile}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.gender}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.dob}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.orgName}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.orgtype}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {new Date(student.createdDate).toLocaleDateString("en-US")}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     <button
//                       onClick={() => handleEdit(student)}
//                       className="text-lightBlue-500 hover:text-lightBlue-700 mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(student._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Organization Registration Modal */}
//         <RegistrationForm
//           isOpen={isModalOpen}
//           onClose={() => setModalOpen(false)}
//           initialValues={selectedStudent}
//         />
//       </div>
//     </div>
//   );
// };

// export default StudentList;



// include confirm modal functionality

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import RegistrationForm from "../../views/Organization/auth/Register";
// import Dashboard from "./Dashboard";
// import ConfirmationModal from "../../components/Organization/ConfirmationModal"; // Import the confirmation modal component

// const StudentList = () => {
//   const [studentList, setStudentList] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
//   const [isModalOpen, setModalOpen] = useState(false); // Modal state
//   const [selectedStudent, setSelectedStudent] = useState(null); // Selected student for editing
//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false); // Confirmation modal state
//   const [studentToDelete, setStudentToDelete] = useState(null); // Student to be deleted

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/get-students");
//       setStudentList(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`);
//       setStudentList(studentList.filter((student) => student._id !== id));
//       toast.success("Student deleted successfully!");
//       setConfirmationModalOpen(false); // Close the confirmation modal
//       window.location.reload();
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Failed to delete student.");
//     }
//   };

//   const handleEdit = (student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   const handleDeleteClick = (student) => {
//     setStudentToDelete(student);
//     setConfirmationModalOpen(true); // Open the confirmation modal
//   };

//   const filteredStudents = studentList.filter(() => {
//     if (filter === "all") return true;
//     // return student.status === filter;
//   });

//   return (
//     <div className="relative">
//       <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg border-0 mt-24">
//         <Dashboard type="student-list"/>
//         <Toaster />
//         <div className="rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
//           <div className="text-center flex justify-between">
//             <h6 className="text-blueGray-500 text-xl font-bold">
//               Manage Users
//             </h6>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => { setSelectedStudent(null); setModalOpen(true); }} // Open the registration modal
//                 className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//               >
//                 Register New Students
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="block w-full overflow-x-auto">
//           <table className="items-center w-full bg-transparent border-collapse">
//             <thead>
//               <tr>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Name
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Email
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Mobile
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Gender
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Date of Birth
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Organization Name
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Organization Type
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Created Date
//                 </th>
//                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((student) => (
//                 <tr key={student._id}>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.name}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.email}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.mobile}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.gender}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.dob}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.orgName}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {student.orgtype}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     {new Date(student.createdDate).toLocaleDateString("en-US")}
//                   </td>
//                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                     <button
//                       onClick={() => handleEdit(student)}
//                       className="text-lightBlue-500 hover:text-lightBlue-700 mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(student)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Organization Registration Modal */}
//         <RegistrationForm
//           isOpen={isModalOpen}
//           onClose={() => setModalOpen(false)}
//           initialValues={selectedStudent}
//         />

//         {/* Confirmation Modal */}
//         <ConfirmationModal
//           isOpen={isConfirmationModalOpen}
//           onClose={() => setConfirmationModalOpen(false)}
//           onConfirm={() => handleDelete(studentToDelete._id)}
//           message={`Are you sure you want to delete student ${studentToDelete?.name}?`}
//         />
//       </div>
//     </div>
//   );
// };

// export default StudentList;




// adding loader
import {
  // ChevronDown,
  // ChevronRight,
  Edit,
  Trash2,
  // PlusCircle,
  // Filter,
  // MoreVertical,
  // Check,
  // X,
} from "lucide-react"; 
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import OrganizationUserRegistration from "./auth/OrganizationUserRegistration";
import Dashboard from "./OrganizationDashboard";
import ConfirmationModal from "../../components/Organization/ConfirmationModal";
import Loader from "../../components/Common/Loader"; // Import the loader component

const OrganizationUsers = () => {
  const [studentList, setStudentList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/organization/user/display-all-users");
      setStudentList(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/organization/user/${id}`);
      setStudentList(studentList.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
      setConfirmationModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setConfirmationModalOpen(true);
  };

  const filteredStudents = studentList.filter(() => {
    if (filter === "all") return true;
    // return student.status === filter;
  });

  return (
    <div className="relative">
      <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg border-0 mt-24">
        <Dashboard type="student-list" />
        <Toaster />
        <div className="rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-500 text-xl font-bold">
              Manage Users
            </h6>
            <div className="flex space-x-4">
              <button
                onClick={() => { setSelectedStudent(null); setModalOpen(true); }}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Register New Students
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Mobile
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Gender
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Date of Birth
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Added By
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Created Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Updated Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.mobile}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.gender}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(student.dob).toISOString().split('T')[0]}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {student.addedby}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {/* {student.status} */}
                      true
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(student.createdDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(student.updatedDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-lightBlue-500 hover:text-lightBlue-700 mr-2"
                      >
                        {/* Edit */}
                        <Edit size={14}/>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(student)}
                        className="text-red-500 hover:text-red-700"
                      >
                        {/* Delete */}
                        <Trash2 size={14}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Organization Registration Modal */}
        <OrganizationUserRegistration
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          initialValues={selectedStudent}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          onConfirm={() => handleDelete(studentToDelete._id)}
          message={`Are you sure you want to delete student ${studentToDelete?.name}?`}
        />
      </div>
    </div>
  );
};

export default OrganizationUsers;