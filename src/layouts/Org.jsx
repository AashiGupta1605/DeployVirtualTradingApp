

// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // Components
// import AdminNavbar from "../components/Admin/Navbars/AdminNavbar.js";
// // import Sidebar from "../components/Admin/Sidebar/Sidebar.js";
// import Sidebar from "components/Organization/Sidebar.js";
// import FooterAdmin from "../components/Admin/Footers/FooterAdmin.js";

// // Views
// import StudentList from "views/Organization/StudentList.js";
// import Dashboard from "views/Organization/Dashboard.js";
// import Register from "views/Organization/auth/Register.js";
// // import Login from "views/Organization/auth/Login.js";

// export default function Org() {
//   const [sidebarExpanded, setSidebarExpanded] = React.useState(false);

//   return (
//     <>
//       <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
//       <div className={`relative ${sidebarExpanded ? "md:ml-64" : "md:ml-20"} ml-16 bg-blueGray-100 transition-all duration-300 ease-in-out`}>
//         <AdminNavbar sidebarExpanded={sidebarExpanded} />
//         <div className="mx-auto w-full -m-24">
//           <Switch>
//             <Route path="/organization/dashboard" exact component={Dashboard} />
//             <Route path="/organization/userlist" exact component={StudentList} />
//             <Route path="/organization/register" exact component={Register} />
//             {/* <Route path="/organization/login" exact component={Login} /> */}
//             <Redirect from="/organization" to="/organization/dashboard" />
//           </Switch>
//           <FooterAdmin />
//         </div>
//       </div>
//     </>
//   );
// }




import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import AdminNavbar from "../components/Admin/Navbars/AdminNavbar";
// import Sidebar from "../components/Admin/Sidebar/Sidebar";
import Sidebar from "../components/Organization/Sidebar";
import FooterAdmin from "../components/Admin/Footers/FooterAdmin";

// Views
// import StudentList from "./views/Organization/StudentList";
// import Dashboard from "./views/Organization/Dashboard";
// import Register from "./views/Organization/auth/Register";

import StudentList from "../views/Organization/StudentList";
import Dashboard from "../views/Organization/Dashboard";
import Register from "../views/auth/Register";
// import Login from "views/Organization/auth/Login";

export default function Org() {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false);

  return (
    <>
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <div className={`relative ${sidebarExpanded ? "md:ml-64" : "md:ml-20"} ml-16 bg-blueGray-100 transition-all duration-300 ease-in-out`}>
        <AdminNavbar sidebarExpanded={sidebarExpanded} />
        <div className="mx-auto w-full -m-24">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="userlist" element={<StudentList />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}