
// // updated version

// import React, { useEffect, useState } from "react";
// import CardPageVisits from "../../components/Admin/Cards/CardPageVisits";
// import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";
// import CardStats from "../../components/Admin/Cards/CardStats";
// import axios from "axios";
// import Loader from "../../components/Common/Loader";
// import { BASE_API_URL } from "../../utils/BaseUrl";

// export default function OrganizationDashboard({ type }) {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [newUsersLastWeek, setNewUsersLastWeek] = useState(0);
//   const [maleUsers, setMaleUsers] = useState(0);
//   const [femaleUsers, setFemaleUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [deactiveUsers, setDeactiveUsers] = useState(0);
//   const [averageUserAge, setAverageUserAge] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const orgName = localStorage.getItem("orgName");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [
//           totalUsersRes,
//           newUsersLastWeekRes,
//           maleUsersRes,
//           femaleUsersRes,
//           activeUsersRes,
//           deactiveUsersRes,
//           averageUserAgeRes
//         ] = await Promise.all([
//           axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/total`),
//           axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/new-week`),
//           axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/male`),
//           axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/female`),
//           axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/active`),
//           axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/deactive`),
//           axios.get(`${BASE_API_URL}/organization/${orgName}/users/count/average-age`)
//         ]);

//         setTotalUsers(totalUsersRes.data.count);
//         setNewUsersLastWeek(newUsersLastWeekRes.data.count);
//         setMaleUsers(maleUsersRes.data.count);
//         setFemaleUsers(femaleUsersRes.data.count);
//         setActiveUsers(activeUsersRes.data.count);
//         setDeactiveUsers(deactiveUsersRes.data.count);
//         setAverageUserAge(averageUserAgeRes.data.averageAge);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [orgName]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <div className={type !== "student-list" ? "mt-24" : "pt-24"}>
//         {/* <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12"> */}
//         <div className={type!== "student-list" ? "bg-lightBlue-600 md:pt-32 pb-32 pt-12": "bg-lightBlue-600 md:pt-32 pb-16 pt-12"}>
//           <div className="px-4 mx-auto w-full">
//             <div>
//               {/* Card stats */}
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                   <CardStats
//                     statSubtitle="TOTAL USERS"
//                     statTitle={totalUsers.toString()}
//                     statArrow="up"
//                     statPercent="5.48"
//                     statPercentColor="text-emerald-500"
//                     statDescripiron="Since last month"
//                     statIconName="far fa-chart-bar"
//                     statIconColor="bg-red-500"
//                   />
//                 </div>
//                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                   <CardStats
//                     statSubtitle="NEW USERS"
//                     statTitle={newUsersLastWeek.toString()}
//                     statArrow="up"
//                     statPercent="3.48"
//                     statPercentColor="text-emerald-500"
//                     statDescripiron="Since last week"
//                     statIconName="fas fa-user-plus"
//                     statIconColor="bg-orange-500"
//                   />
//                 </div>
//                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                   <CardStats
//                     statSubtitle="MALE USERS"
//                     statTitle={maleUsers.toString()}
//                     statArrow="up"
//                     statPercent="2.10"
//                     statPercentColor="text-emerald-500"
//                     statDescripiron="Since last month"
//                     statIconName="fas fa-male"
//                     statIconColor="bg-blue-500"
//                   />
//                 </div>
//                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                   <CardStats
//                     statSubtitle="FEMALE USERS"
//                     statTitle={femaleUsers.toString()}
//                     statArrow="up"
//                     statPercent="3.20"
//                     statPercentColor="text-emerald-500"
//                     statDescripiron="Since last month"
//                     statIconName="fas fa-female"
//                     statIconColor="bg-pink-500"
//                   />
//                 </div>
//                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                   <CardStats
//                     statSubtitle="ACTIVE USERS"
//                     statTitle={activeUsers.toString()}
//                     statArrow="up"
//                     statPercent="4.10"
//                     statPercentColor="text-emerald-500"
//                     statDescripiron="Since last week"
//                     statIconName="fas fa-user-check"
//                     statIconColor="bg-green-500"
//                   />
//                 </div>
//                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                   <CardStats
//                     statSubtitle="DEACTIVE USERS"
//                     statTitle={deactiveUsers.toString()}
//                     statArrow="down"
//                     statPercent="1.10"
//                     statPercentColor="text-red-500"
//                     statDescripiron="Since last week"
//                     statIconName="fas fa-user-slash"
//                     statIconColor="bg-gray-500"
//                   />
//                 </div>
//                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                   <CardStats
//                     statSubtitle="AVERAGE USER AGE"
//                     statTitle={averageUserAge}
//                     statArrow="up"
//                     statPercent=""
//                     statPercentColor="text-emerald-500"
//                     statDescripiron="Average age of users"
//                     statIconName="fas fa-birthday-cake"
//                     statIconColor="bg-purple-500"
//                   />
//                 </div>
//                 {/* {type !== "student-list" && (
//                   <>
//                     <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                       <CardStats
//                         statSubtitle="TOP ORGANIZATIONS"
//                         statTitle="3"
//                         statArrow="up"
//                         statPercent="5"
//                         statPercentColor="text-emerald-500"
//                         statDescripiron="Top 3 organizations by user count"
//                         statIconName="fas fa-building"
//                         statIconColor="bg-yellow-500"
//                       />
//                     </div>
//                     <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                       <CardStats
//                         statSubtitle="RECENT ACTIVITY"
//                         statTitle="150"
//                         statArrow="up"
//                         statPercent="10"
//                         statPercentColor="text-emerald-500"
//                         statDescripiron="User activities in the last 24 hours"
//                         statIconName="fas fa-activity"
//                         statIconColor="bg-green-500"
//                       />
//                     </div>
//                     <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                       <CardStats
//                         statSubtitle="USER GROWTH RATE"
//                         statTitle="4.5%"
//                         statArrow="up"
//                         statPercent="2"
//                         statPercentColor="text-emerald-500"
//                         statDescripiron="Growth rate since last month"
//                         statIconName="fas fa-chart-line"
//                         statIconColor="bg-purple-500"
//                       />
//                     </div>
//                     <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
//                       <CardStats
//                         statSubtitle="PENDING APPROVALS"
//                         statTitle="5"
//                         statArrow="down"
//                         statPercent="1"
//                         statPercentColor="text-red-500"
//                         statDescripiron="Pending user registrations"
//                         statIconName="fas fa-hourglass-half"
//                         statIconColor="bg-red-500"
//                       />
//                     </div>
//                   </>
//                 )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//         {type !== "student-list" && (
//           <div className="flex flex-wrap">
//             <div className="w-full xl:w-8/12 px-4 -mt-20 pt-2">
//               <CardPageVisits />
//             </div>
//             <div className="w-full xl:w-4/12 px-4 -mt-20 pt-2">
//               <CardSocialTraffic />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }







// redux toolkit updated

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData, resetDashboardState } from '../../redux/Organization/dashboard/organizationDashboardSlice';
import CardPageVisits from '../../components/Admin/Cards/CardPageVisits';
import CardSocialTraffic from '../../components/Admin/Cards/CardSocialTraffic';
import CardStats from '../../components/Admin/Cards/CardStats';
import Loader from '../../components/Common/Loader';

export default function OrganizationDashboard({ type }) {
  const dispatch = useDispatch();
  const orgName = localStorage.getItem('orgName'); // Get organization name from localStorage

  // Access the dashboard state from Redux
  const {
    totalUsers,
    newUsersLastWeek,
    maleUsers,
    femaleUsers,
    activeUsers,
    deactiveUsers,
    averageUserAge,
    loading,
    error,
  } = useSelector((state) => state.organization.dashboard);

  // Fetch dashboard data on component mount
  useEffect(() => {
    if (orgName) {
      dispatch(fetchDashboardData(orgName));
    }
  }, [dispatch, orgName]);

  // Reset dashboard state when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetDashboardState());
    };
  }, [dispatch]);

  // Show loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  return (
    <>
      <div className={type !== 'student-list' ? 'mt-24' : 'pt-24'}>
        {/* Dashboard header */}
        <div className={type !== 'student-list' ? 'bg-lightBlue-600 md:pt-32 pb-32 pt-12' : 'bg-lightBlue-600 md:pt-32 pb-16 pt-12'}>
          <div className="px-4 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                {/* Total Users Card */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="TOTAL USERS"
                    statTitle={totalUsers.toString()}
                    statArrow="up"
                    statPercent="5.48"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                  />
                </div>

                {/* New Users Card */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="NEW USERS"
                    statTitle={newUsersLastWeek.toString()}
                    statArrow="up"
                    statPercent="3.48"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-user-plus"
                    statIconColor="bg-orange-500"
                  />
                </div>

                {/* Male Users Card */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="MALE USERS"
                    statTitle={maleUsers.toString()}
                    statArrow="up"
                    statPercent="2.10"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="fas fa-male"
                    statIconColor="bg-blue-500"
                  />
                </div>

                {/* Female Users Card */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="FEMALE USERS"
                    statTitle={femaleUsers.toString()}
                    statArrow="up"
                    statPercent="3.20"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="fas fa-female"
                    statIconColor="bg-pink-500"
                  />
                </div>

                {/* Active Users Card */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="ACTIVE USERS"
                    statTitle={activeUsers.toString()}
                    statArrow="up"
                    statPercent="4.10"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-user-check"
                    statIconColor="bg-green-500"
                  />
                </div>

                {/* Deactive Users Card */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="DEACTIVE USERS"
                    statTitle={deactiveUsers.toString()}
                    statArrow="down"
                    statPercent="1.10"
                    statPercentColor="text-red-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-user-slash"
                    statIconColor="bg-gray-500"
                  />
                </div>

                {/* Average User Age Card */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="AVERAGE USER AGE"
                    statTitle={averageUserAge.toString()}
                    statArrow="up"
                    statPercent=""
                    statPercentColor="text-emerald-500"
                    statDescripiron="Average age of users"
                    statIconName="fas fa-birthday-cake"
                    statIconColor="bg-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional cards for non-student-list views */}
        {type !== 'student-list' && (
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12 px-4 -mt-20 pt-2">
              <CardPageVisits />
            </div>
            <div className="w-full xl:w-4/12 px-4 -mt-20 pt-2">
              <CardSocialTraffic />
            </div>
          </div>
        )}
      </div>
    </>
  );
}