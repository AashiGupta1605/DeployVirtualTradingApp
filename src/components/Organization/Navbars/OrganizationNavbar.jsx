
// import React, { useEffect } from "react";
// import UserDropdown from "../DropDowns/UserDropdown";
// import logoImage from "../../../assets/img/PGR_logo.jpeg";
// import { fetchOrgById} from "../../../redux/Organization/auth/organizationAuthSlice";
// import { useDispatch, useSelector } from "react-redux";

// export default function OrganizationNavbar({ sidebarExpanded }) {
//   const dispatch = useDispatch();
//   // const orgName = localStorage.getItem("orgName"); // Assuming orgName is stored in localStorage
// const {orgId, orgName} = useSelector((state) => state.organization.auth);
//   useEffect(() => {
//     if (orgId) {
//       dispatch(fetchOrgById(orgId));
//     }
//   }, [dispatch, orgId]);

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-4 bg-white shadow-lg">
//       <div className="w-full mx-auto flex items-center justify-between p-4 md:px-10 px-4">
//         {/* Brand with Logo */}
//         <a
//           className={`text-gray-700 text-lg uppercase lg:flex hidden items-center space-x-4 font-bold hover:text-gray-900 transition-colors ${
//             sidebarExpanded ? 'ml-64' : 'ml-20'
//           } transition-all duration-300`}
//           href="#pablo"
//           onClick={(e) => e.preventDefault()}
//         >
//           <img 
//             src={logoImage} 
//             alt="PGR Logo" 
//             className="h-10 w-10 object-contain rounded-full"
//           />
//           <span className="text-xl">PGR Virtual Trading App</span>
//         </a>

//         {/* Form */}
//         <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
//           <div className="relative flex w-full flex-wrap items-stretch">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>

//             <div>
//             <input
//               type="text"
//               placeholder="Search here..."
//               className="border border-gray-200 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pl-10 transition-all duration-200"
//             />
//             </div>
        
//           </div>
//         </form>

//         {/* organization name */}

        
//         <div className="bg-lightBlue-600 text-white px-4 py-1 rounded-lg hover:bg-lightBlue-400 hover:text-gray-100 transition-all mx-4">
//           <p title="organization name" className="text-lg uppercase">{orgName}</p>
//         </div>


//         {/* User */}
//         <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
//           <UserDropdown orgId={orgId} />
//         </ul>
//       </div>
//     </nav>
//   );
// }












import React, { useEffect } from "react";
import UserDropdown from "../DropDowns/UserDropdown";
import logoImage from "../../../assets/img/PGR_logo.jpeg";
import { fetchOrgById} from "../../../redux/Organization/auth/organizationAuthSlice";
import { useDispatch, useSelector } from "react-redux";

export default function OrganizationNavbar({ sidebarExpanded }) {
  const dispatch = useDispatch();
  // const orgName = localStorage.getItem("orgName"); // Assuming orgName is stored in localStorage
const {orgId, orgName, currentOrg} = useSelector((state) => state.organization.auth);
  useEffect(() => {
    if (orgId) {
      dispatch(fetchOrgById(orgId));
    }
  }, [dispatch, orgId]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-4 bg-white shadow-lg">
      <div className="w-full mx-auto flex items-center justify-between p-4 md:px-10 px-4">
        {/* Brand with Logo */}
        <a
          className={`text-gray-700 text-lg uppercase lg:flex hidden items-center space-x-4 font-bold hover:text-gray-900 transition-colors ${
            sidebarExpanded ? 'ml-64' : 'ml-20'
          } transition-all duration-300`}
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          <img 
            src={logoImage} 
            alt="PGR Logo" 
            className="h-10 w-10 object-contain rounded-full"
          />
          <span className="text-xl">PGR Virtual Trading App</span>
        </a>

        {/* Form */}
        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
          <div className="relative flex w-full flex-wrap items-stretch">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div>
            <input
              type="text"
              placeholder="Search here..."
              className="border border-gray-200 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full pl-10 transition-all duration-200"
            />
            </div>
        
          </div>
        </form>

        {/* organization name */}

        
        <div className="bg-lightBlue-600 text-white px-4 py-1 rounded-lg hover:bg-lightBlue-400 hover:text-gray-100 transition-all mx-4">
          <p title="organization name" className="text-lg uppercase">{currentOrg?.name}</p>
        </div>


        {/* User */}
        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
          <UserDropdown orgId={orgId} />
        </ul>
      </div>
    </nav>
  );
}