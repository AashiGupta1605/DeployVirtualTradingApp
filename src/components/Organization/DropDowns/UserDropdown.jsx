
// import React, { useState, useEffect } from "react";
// import { createPopper } from "@popperjs/core";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrgById } from "../../../redux/Organization/auth/organizationAuthSlice"; // Adjust the import path
// import OrganizationProfileModal from "../../../views/Organization/OrganizationDetails/Models/OrganizationProfileModal";


// const UserDropdown = ({ orgId }) => {
//   const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const dispatch = useDispatch();
//   const currentOrg = useSelector((state) => state.organization.currentOrg); // Fetch currentOrg from Redux

//   const btnDropdownRef = React.createRef();
//   const popoverDropdownRef = React.createRef();

//   // Fetch organization data when modal is opened
//   useEffect(() => {
//     if (isModalOpen && orgId) {
//       dispatch(fetchOrgById(orgId));
//     }
//   }, [isModalOpen, orgId, dispatch]);

//   const openDropdownPopover = () => {
//     createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
//       placement: "bottom-start",
//     });
//     setDropdownPopoverShow(true);
//   };

//   const closeDropdownPopover = () => {
//     setDropdownPopoverShow(false);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     closeDropdownPopover();
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <a
//         className="text-blueGray-500 block"
//         href="#pablo"
//         ref={btnDropdownRef}
//         onClick={(e) => {
//           e.preventDefault();
//           dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
//         }}
//       >
//         <div className="items-center flex">
//           <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
//             <img
//               alt="..."
//               className="w-full rounded-full align-middle border-none shadow-lg"
//               src={currentOrg?.photo || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"}
//             />
//           </span>
//         </div>
//       </a>
//       <div
//         ref={popoverDropdownRef}
//         className={
//           (dropdownPopoverShow ? "block " : "hidden ") +
//           "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
//         }
//       >
//         <a
//           href="#pablo"
//           className={
//             "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//           }
//           onClick={(e) => {
//             e.preventDefault();
//             openModal();
//           }}
//         >
//           Profile
//         </a>
//         <div className="h-0 my-2 border border-solid border-blueGray-100" />
//       </div>
//       <OrganizationProfileModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         initialValues={currentOrg || {}} // Pass currentOrg as initialValues
//         refreshData={() => {
//           // Refresh logic if needed
//         }}
//       />
//     </>
//   );
// };

// export default UserDropdown;


// import React, { useState, useEffect } from "react";
// import { createPopper } from "@popperjs/core";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrgById } from "../../../redux/Organization/auth/organizationAuthSlice";
// import OrganizationProfileModal from "../../../views/Organization/OrganizationDetails/Models/OrganizationProfileModal";

// const UserDropdown = ({ orgId }) => {
//   const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const dispatch = useDispatch();
//   const currentOrg = useSelector((state) => state.organization.currentOrg);

//   const btnDropdownRef = React.createRef();
//   const popoverDropdownRef = React.createRef();

//   useEffect(() => {
//     if (isModalOpen && orgId) {
//       console.log("Fetching organization data for orgId:", orgId);
//       dispatch(fetchOrgById(orgId));
//     }
//   }, [isModalOpen, orgId, dispatch]);

//   useEffect(() => {
//     console.log("Current Org:", currentOrg);
//   }, [currentOrg]);

//   const openDropdownPopover = () => {
//     createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
//       placement: "bottom-start",
//     });
//     setDropdownPopoverShow(true);
//   };

//   const closeDropdownPopover = () => {
//     setDropdownPopoverShow(false);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     closeDropdownPopover();
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <a
//         className="text-blueGray-500 block"
//         href="#pablo"
//         ref={btnDropdownRef}
//         onClick={(e) => {
//           e.preventDefault();
//           dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
//         }}
//       >
//         <div className="items-center flex">
//           <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
//             <img
//               alt="..."
//               className="w-full rounded-full align-middle border-none shadow-lg"
//               src={currentOrg?.photo || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"}
//             />
//           </span>
//         </div>
//       </a>
//       <div
//         ref={popoverDropdownRef}
//         className={
//           (dropdownPopoverShow ? "block " : "hidden ") +
//           "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
//         }
//       >
//         <a
//           href="#pablo"
//           className={
//             "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//           }
//           onClick={(e) => {
//             e.preventDefault();
//             openModal();
//           }}
//         >
//           Profile
//         </a>
//         <div className="h-0 my-2 border border-solid border-blueGray-100" />
//       </div>
//       <OrganizationProfileModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         initialValues={currentOrg || {}}
//         refreshData={() => {
//           // Refresh logic if needed
//         }}
//       />
//     </>
//   );
// };

// export default UserDropdown;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrgByName } from "../../../redux/Organization/auth/organizationAuthSlice";
// import OrganizationProfileModal from "../../../views/Organization/OrganizationDetails/Models/OrganizationProfileModal";

// const UserDropdown = ({ orgName }) => {
//   const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const dispatch = useDispatch();
//   const currentOrg = useSelector((state) => state.organization.auth.currentOrg);

//   useEffect(() => {
//     if (isModalOpen && orgName) {
//       console.log("Dispatching fetchOrgByName for orgName:", orgName);
//       dispatch(fetchOrgByName(orgName));
//     }
//   }, [isModalOpen, orgName, dispatch]);

//   useEffect(() => {
//     console.log("Current Org in UserDropdown:", currentOrg);
//   }, [currentOrg]);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <button onClick={openModal}>Open Profile</button>
//       <OrganizationProfileModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         initialValues={currentOrg || {}}
//         refreshData={() => {
//           // Refresh logic if needed
//         }}
//       />
//     </>
//   );
// };

// export default UserDropdown;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrgByName } from "../../../redux/Organization/auth/organizationAuthSlice";
import OrganizationProfileModal from "../../../views/Organization/OrganizationDetails/Models/OrganizationProfileModal";

const UserDropdown = ({ orgName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const currentOrg = useSelector((state) => state.organization.auth.currentOrg);

  useEffect(() => {
    if (isModalOpen && orgName) {
      console.log("Dispatching fetchOrgByName for orgName:", orgName);
      dispatch(fetchOrgByName(orgName));
    }
  }, [isModalOpen, orgName, dispatch]);

  useEffect(() => {
    console.log("Current Org in UserDropdown:", currentOrg);
  }, [currentOrg]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}><i className="fas fa-user-circle text-2xl"></i></button>
      <OrganizationProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialValues={currentOrg || {}}
        refreshData={() => {
          // Refresh logic if needed
        }}
      />
    </>
  );
};

export default UserDropdown;



