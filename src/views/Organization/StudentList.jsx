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

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import OrganizationRegistrationForm from "views/Organization/auth/Register";
import OrganizationRegistrationForm from "../../views/Organization/auth/Register"


const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [filter, setFilter] = useState("all"); // all, approved, pending, rejected
  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students/get-students");
      setStudentList(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudentList(studentList.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  const filteredStudents = studentList.filter((student) => {
    if (filter === "all") return true;
    return student.status === filter;
  });

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
      <Toaster />
      <div className="mt-32 rounded-t bg-white mb-0 px-6 py-6 shadow-lg">
        <div className="text-center flex justify-between ">
          <h6 className="text-blueGray-700 text-xl font-bold ">
            Manage Students
          </h6>
          <div className="flex space-x-4">
            <button
              onClick={() => setModalOpen(true)} // Open the registration modal
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Register New Students
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
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
                Status
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Organization Type
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
                  {student.dob}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {student.status}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {student.orgtype}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="text-lightBlue-500 hover:text-lightBlue-700 mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Organization Registration Modal */}
      <OrganizationRegistrationForm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StudentList;