import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardStats from './CardStats';

import { 
  fetchUsers, 
  selectUserCount, 
  selectActiveUserCount
} from '../../../redux/User/userSlice';

import { 
  fetchOrganizations,
  selectOrganizationCount,
  selectOrganizations
} from '../../../redux/Organization/count/CardStatCountSlice';

const StatsSection = ({ isDashboard = false, data }) => {
  const dispatch = useDispatch();

  // Get counts from selectors
  const userCount = useSelector(selectUserCount) || 0;
  const activeUserCount = useSelector(selectActiveUserCount) || 0;
  
  // Use the proper selector for organization count
  const organizationCount = useSelector(selectOrganizationCount);
  const organizations = useSelector(selectOrganizations);

  // Get loading states
  const userStatus = useSelector(state => state.user?.status || 'idle');
  const orgStatus = useSelector(state => state.organization?.auth?.status || 'idle');

  // get user count for admin card stats

  // const maleUserCount = useSelector(selectMaleUserCount);
  // const femaleUserCount = useSelector(selectFemaleUserCount);


    const {
      maleUsers,
      femaleUsers,
      activeUsers,
      inactiveUsers,
      totalUsers,
      averageUserAge,
      totalOrganizations,
      totalEvents
    } = useSelector((state) => state.user.users);

    // const { totalOrganizations} = useSelector((state) => state.organization.dashboard);
    console.log(totalOrganizations);
    console.log(maleUsers);
    console.log(femaleUsers);
    console.log(activeUsers);
    console.log(inactiveUsers);
    console.log(totalUsers);
    console.log(averageUserAge);
    console.log(totalEvents);
    
    // adminDashboardStats

    // orgainization stats

     const {
        totalUsers:totalOrganizationUsers,
        maleUsers:totalOrganizationMale,
        femaleUsers:totalOrganizationFemale,
        activeUsers:totalOrgainzationActiveUsers,
      } = useSelector((state) => state.organization.dashboard);
    
    
    console.log(totalOrganizationUsers);
    console.log(totalOrganizationMale);
    console.log(totalOrganizationFemale);
    console.log( totalOrgainzationActiveUsers );
    
    
    
    
  
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organizations first to ensure we have the data
        await dispatch(fetchOrganizations()).unwrap();
        await dispatch(fetchUsers()).unwrap();
      } catch (error) {
        console.error('Error fetching stats data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Show loading state while data is being fetched
  if (userStatus === 'loading' || orgStatus === 'loading') {
    return (
      <div className="bg-lightBlue-600 md:pt-32 pb-16 pt-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Base stats that appear on all pages
  const baseStats = [
    {
      statIconName: "far fa-chart-bar",
      statSubtitle: "USER STATS",
      statTitle: totalUsers.toString(),
      statArrow: "up",
      // statPercent: "5.48",
      statPercentColor: "text-emerald-500",
      statDescripiron: "Since last month",
      statIconColor: "bg-red-500",
      totalUsers:totalUsers.toString(),
      totalActive:activeUsers.toString(),
      totalInactive:inactiveUsers.toString(),
      totalMaleUsers:maleUsers.toString(),
      totalFemaleUsers:femaleUsers.toString(),
      showDetails: isDashboard, 
      // statItems: [
      //   { label: "Total Users", value: totalUsers.toString() },
      //   { label: "Total Male", value: maleUsers.toString() },
      //   { label: "Total Female", value: femaleUsers.toString() },
      //   { label: "Total active", value: activeUsers.toString() },
      //   { label: "Total Inactive", value: inactiveUsers.toString() },
      // ]
      statItems: isDashboard ? [  // Only include items in dashboard view
        { label: "Total Users", value: totalUsers.toString() },
        { label: "Total Male", value: maleUsers.toString() },
        { label: "Total Female", value: femaleUsers.toString() },
        { label: "Total active", value: activeUsers.toString() },
        { label: "Total Inactive", value: inactiveUsers.toString() },
      ] : []
    },
    {
      statIconName: "fas fa-user-plus",
      statSubtitle: "TOTAL ORGS",
      // statTitle: (organizationCount || 0).toString(),
      statTitle: totalOrganizations.toString(),
      statArrow: "up",
      // statPercent: "3.48",
      statPercentColor: "text-emerald-500",
      statDescripiron: "Since last week",
      statIconColor: "bg-orange-500",
      showDetails: isDashboard, 
      statItems: isDashboard ? [
        { label: "Total Org", value: totalOrganizations.toString() },
        { label: "Total Users", value: totalOrganizationUsers.toString() },
        { label: "Total Male", value: totalOrganizationMale.toString() },
        { label: "Total Female", value: totalOrganizationFemale.toString() },
        { label: "Total active", value: totalOrgainzationActiveUsers.toString() },
      ] : []
      
    },
    {
      statIconName: "fas fa-user-check",
      statSubtitle: "ACTIVE USERS",
      statTitle: activeUsers.toString(),
      statArrow: "up",
      // statPercent: "4.10",
      statPercentColor: "text-emerald-500",
      statDescripiron: "Since last week",
      statIconColor: "bg-green-500",
    },
    {
      statIconName: "fas fa-user-slash",
      statSubtitle: "DEACTIVE USERS",
      statTitle: inactiveUsers.toString(), // Replace with actual deactive user count if available
      statArrow: "down",
      // statPercent: "1.10",
      statPercentColor: "text-red-500",
      statDescripiron: "Since last week",
      statIconColor: "bg-gray-500",
    },
  ];

  // Additional stats for dashboard
  const dashboardStats = isDashboard ? [
    {
      statIconName: "fas fa-dollar-sign",
      statSubtitle: "MALE USERS",
      statTitle: maleUsers.toString(),
      statArrow: "up",
      // statPercent: "12",
      statPercentColor: "text-emerald-500",
      statDescripiron: "Total market capitalization",
      statIconColor: "bg-green-500",
    },
    {
      statIconName: "fas fa-exchange-alt",
      statSubtitle: "FEMALE USERS",
      statTitle: femaleUsers.toString(),
      statArrow: "down",
      // statPercent: "5",
      statPercentColor: "text-red-500",
      statDescripiron: "Daily trading volume",
      statIconColor: "bg-purple-500",
    },
    {
      statIconName: "fas fa-clock",
      statSubtitle: "Average Age",
      statTitle: averageUserAge,
      statArrow: "up",
      // statPercent: "20",
      statPercentColor: "text-emerald-500",
      statDescripiron: "Orders awaiting execution",
      statIconColor: "bg-yellow-500",
    },
    {
      statIconName: "fas fa-server",
      statSubtitle: "Total Events",
      statTitle:  totalEvents.toString(),
      statArrow: "up",
      // statPercent: "98",
      statPercentColor: "text-emerald-500",
      statDescripiron: "System uptime and performance",
      statIconColor: "bg-indigo-500",
    },
  ] : [];

  // Combine stats based on isDashboard prop
  const stats = isDashboard ? [...baseStats, ...dashboardStats] : baseStats;

  return (
    <div className="bg-lightBlue-600 md:pt-32 -mt-17 pb-16 pt-12">
      <div className="px-4 mx-auto w-full">
        <div>
          <div className="flex flex-wrap">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4"
              >
                <CardStats {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;






// deepseek

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CardStats from './CardStats';
// // import {
// //   fetchUserStats,
// //   fetchOrgUserStats,
// //   fetchOrgStats
// // } from '../../../redux/Admin/StatsCount/adminDashboardSlice';

// const StatsSection = ({ isDashboard = false }) => {
//   const dispatch = useDispatch();

//   // Get all stats from the admin dashboard slice
//   const {
//     totalUsers,
//     maleUsers,
//     femaleUsers,
//     activeUsers,
//     deactiveUsers,
//     averageUserAge,
//     orgTotalUsers,
//     orgMaleUsers,
//     orgFemaleUsers,
//     orgActiveUsers,
//     orgDeactiveUsers,
//     orgAverageUserAge,
//     totalOrganizations,
//     loading,
//     error
//   } = useSelector((state) => state.admin.adminDashboardStats);

//   console.log(totalUsers);
//   console.log(maleUsers);
  
  

//   // Fetch all stats on component mount
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       await Promise.all([
//   //         dispatch(fetchUserStats()),
//   //         dispatch(fetchOrgUserStats()),
//   //         dispatch(fetchOrgStats())
//   //       ]);
//   //     } catch (err) {
//   //       console.error('Error fetching dashboard data:', err);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [dispatch]);

//   // Show loading state while data is being fetched
//   if (loading.userStats || loading.orgUserStats || loading.orgStats) {
//     return (
//       <div className="bg-lightBlue-600 md:pt-32 pb-16 pt-12">
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//         </div>
//       </div>
//     );
//   }

//   // Base stats that appear on all pages (simplified version)
//   const baseStats = [
//     {
//       statIconName: "far fa-chart-bar",
//       statSubtitle: "TOTAL USERS",
//       statTitle: totalUsers.toString(),
//       statIconColor: "bg-red-500",
//     },
//     {
//       statIconName: "fas fa-male",
//       statSubtitle: "MALE USERS",
//       statTitle: maleUsers.toString(),
//       statIconColor: "bg-blue-500",
//     },
//     {
//       statIconName: "fas fa-female",
//       statSubtitle: "FEMALE USERS",
//       statTitle: femaleUsers.toString(),
//       statIconColor: "bg-pink-500",
//     },
//     {
//       statIconName: "fas fa-user-check",
//       statSubtitle: "ACTIVE USERS",
//       statTitle: activeUsers.toString(),
//       statIconColor: "bg-green-500",
//     }
//   ];

//   // Additional stats for dashboard (detailed version)
//   const dashboardStats = [
//     {
//       statIconName: "fas fa-user-slash",
//       statSubtitle: "INACTIVE USERS",
//       statTitle: deactiveUsers.toString(),
//       statIconColor: "bg-gray-500",
//     },
//     {
//       statIconName: "fas fa-birthday-cake",
//       statSubtitle: "AVG USER AGE",
//       statTitle: averageUserAge.toString(),
//       statIconColor: "bg-yellow-500",
//     },
//     {
//       statIconName: "fas fa-building",
//       statSubtitle: "TOTAL ORGANIZATIONS",
//       statTitle: totalOrganizations.toString(),
//       statIconColor: "bg-indigo-500",
//     },
//     {
//       statIconName: "fas fa-users",
//       statSubtitle: "ORG REGISTERED USERS",
//       statTitle: orgTotalUsers.toString(),
//       statIconColor: "bg-purple-500",
//       statItems: [
//         { label: "Male Users", value: orgMaleUsers.toString() },
//         { label: "Female Users", value: orgFemaleUsers.toString() },
//         { label: "Active Users", value: orgActiveUsers.toString() },
//       ]
//     }
//   ];

//   // Combine stats based on isDashboard prop
//   const stats = isDashboard ? [...baseStats, ...dashboardStats] : baseStats;

//   return (
//     <div className="bg-lightBlue-600 md:pt-32 -mt-17 pb-16 pt-12">
//       <div className="px-4 mx-auto w-full">
//         <div>
//           <div className="flex flex-wrap">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`w-full ${isDashboard ? 'lg:w-6/12 xl:w-3/12' : 'lg:w-3/12'} px-4 mb-4`}
//               >
//                 <CardStats {...stat} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatsSection;