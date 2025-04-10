
// working - for user and org


// deepseek --

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CardStats from './CardStats';
// import { 
//   fetchUsers,
// } from '../../../redux/User/userSlice';
// import { 
//   fetchOrganizations,
//   selectOrganizationStats
// } from '../../../redux/Organization/count/CardStatCountSlice';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../utils/BaseUrl';




// const StatsSection = ({ isDashboard = false, pageType = 'dashboard' }) => {
//   const dispatch = useDispatch();

//   const fetchOrganizationMaleUserss = async () => {
//     try {
//       const response = await axios.get(`${BASE_API_URL}/user/organizationCount/male`);
//       console.log(response.data.count);
//       return response.data.count;
//     } catch (error) {
//       console.error('Error fetching male users count:', error);
//       return 0;
//     }
//   };

  
//   useEffect(()=>{
//     fetchOrganizationMaleUserss();
//   },[]);
  
//   console.log(fetchOrganizationMaleUserss);

//   const {
//     maleUsers,
//     femaleUsers,
//     activeUsers,
//     inactiveUsers,
//     totalUsers,
//     averageUserAge,
//     // totalEvents,
//     totalOrganizations,
//     totalOrganizationUsers,
//     totalOrganizationMaleUsers,
//     totalOrganizationFemaleUsers,
//     totalOrganizationActiveUsers,
//     totalOrganizationInactiveUsers,
//     totalOrganizationAverageUserAge
//   } = useSelector((state) => state.user.users);

//   // const { totalOrganizations} = useSelector((state) => state.organization.dashboard);
//   console.log(totalOrganizations);
//   console.log(maleUsers);
//   console.log(femaleUsers);
//   console.log(activeUsers);
//   console.log(inactiveUsers);
//   console.log(totalUsers);
//   console.log(averageUserAge);
//   // console.log(totalEvents);

//   console.log(totalOrganizations);
//   console.log(totalOrganizationMaleUsers);
//   console.log(totalOrganizationFemaleUsers);
//   console.log(totalOrganizationActiveUsers);
//   console.log(totalOrganizationInactiveUsers);
//   console.log(totalOrganizationAverageUserAge);

  
  
//   // adminDashboardStats

//   // orgainization stats



//   // User stats
//   // const totalUsers = useSelector(selectTotalUsers);
//   // const activeUsers = useSelector(selectActiveUsers);
//   // const inactiveUsers = useSelector(selectInactiveUsers);
//   // const maleUsers = useSelector(selectMaleUsers);
//   // const femaleUsers = useSelector(selectFemaleUsers);
//   // const averageUserAge = useSelector(selectAverageUserAge);
//   // const totalOrganizations = useSelector(selectTotalOrganizations);
//   // const totalEvents = useSelector(selectTotalEvents);
  
//   // Organization stats
//   const orgStats = useSelector(selectOrganizationStats);
  
//   // Loading states
//   const userStatus = useSelector(state => state.user?.status || 'idle');
//   const orgStatus = useSelector(state => state.organization?.status || 'idle');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchOrganizations()).unwrap();
//         await dispatch(fetchUsers()).unwrap();
//       } catch (error) {
//         console.error('Error fetching stats data:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   if (userStatus === 'loading' || orgStatus === 'loading') {
//     return (
//       <div className="bg-lightBlue-600 md:pt-32 pb-16 pt-12">
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//         </div>
//       </div>
//     );
//   }

//   // Common stats configuration
//   const commonStats = {
//     dashboard: [
//       {
//         statIconName: "fas fa-users",
//         statSubtitle: "USER STATS",
//         statTitle: pageType!== "dashboard" ? totalUsers.toString(): "",
//         statIconColor: "bg-blue-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: totalUsers.toString() },
//           { label: "Active", value: activeUsers.toString() },
//           // { label: "Inactive Users", value: inactiveUsers.toString() },
//           // { label: "Male Users", value: maleUsers.toString() },
//           // { label: "Female Users", value: femaleUsers.toString() },
//           // { label: "Average Age", value: averageUserAge.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-building",
//         statSubtitle: "ORG STATS",
//         statTitle: pageType!="dashboard" ? totalOrganizations.toString() : "",
//         statIconColor: "bg-indigo-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: "56" },
//           { label: "Active", value: orgStats.active.toString() },
//           // { label: "Pending", value: orgStats.pending.toString() },
//           // { label: "Inactive", value: orgStats.inactive.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-calendar-alt",
//         statSubtitle: "EVENT STATS",
//         statTitle:pageType!="dashboard" ? "hello" : "",
//         statIconColor: "bg-purple-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: "34" },
//           { label: "Upcoming", value: orgStats.active.toString() },
//           // { label: "Pending", value: orgStats.pending.toString() },
//           // { label: "Inactive", value: orgStats.inactive.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-comment-alt",
//         statSubtitle: "FEEDBACK STATS",
//         statTitle:pageType!="dashboard" ?  maleUsers.toString() : "",
//         statIconColor: "bg-blue-400",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: "123" },
//           { label: "Rating", value: "4.6" },
//           // { label: "Pending", value: orgStats.pending.toString() },
//           // { label: "Inactive", value: orgStats.inactive.toString() }
//         ]
        
//       },
//       {
//         statIconName: "fas fa-question-circle",
//         statSubtitle: "QUERIE STATS",
//         statTitle: pageType!="dashboard" ? femaleUsers.toString() : "",
//         statIconColor: "bg-pink-400",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: "wrwrwr" },
//           { label: "Solved", value: orgStats.active.toString() },
//           // { label: "Pending", value: orgStats.pending.toString() },
//           // { label: "Inactive", value: orgStats.inactive.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-boxes",
//         statSubtitle: "STOCK STATS",
//         statTitle:pageType!="dashboard" ?  activeUsers.toString() : "",
//         statIconColor: "bg-green-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: "wwewr" },
//           { label: "Data", value: orgStats.active.toString() },
//           // { label: "Pending", value: orgStats.pending.toString() },
//           // { label: "Inactive", value: orgStats.inactive.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-images",
//         statSubtitle: "GALLERY STATS",
//         statTitle: pageType!="dashboard" ?  inactiveUsers.toString() : "",
//         statIconColor: "bg-gray-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: "wr" },
//           { label: "Photo", value: orgStats.active.toString() },
//           // { label: "Pending", value: orgStats.pending.toString() },
//           // { label: "Inactive", value: orgStats.inactive.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-birthday-cake",
//         statSubtitle: "NEW STATS",
//         statTitle: pageType!="dashboard" ?  averageUserAge.toString() : "",
//         statIconColor: "bg-yellow-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: "wr" },
//           { label: "Active", value: orgStats.active.toString() },
//           // { label: "Pending", value: orgStats.pending.toString() },
//           // { label: "Inactive", value: orgStats.inactive.toString() }
//         ]
//       }
//     ],
//     users: [
//       {
//         statIconName: "fas fa-users",
//         statSubtitle: "TOTAL USERS",
//         statTitle: totalUsers.toString(),
//         statIconColor: "bg-blue-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-male",
//         statSubtitle: "MALE USERS",
//         statTitle: maleUsers.toString(),
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-female",
//         statSubtitle: "FEMALE USERS",
//         statTitle: femaleUsers.toString(),
//         statIconColor: "bg-pink-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-user-check",
//         statSubtitle: "ACTIVE USERS",
//         statTitle: activeUsers.toString(),
//         statIconColor: "bg-green-500",
//         showDetails: false
//       }
//     ],
//     organizations: [
//       {
//         statIconName: "fas fa-building",
//         statSubtitle: "TOTAL ORGS",
//         statTitle: "sfsfsf",
//         statIconColor: "bg-indigo-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-check-circle",
//         statSubtitle: "ACTIVE ORGS",
//         statTitle: orgStats.active.toString(),
//         statIconColor: "bg-green-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-clock",
//         statSubtitle: "PENDING ORGS",
//         statTitle: orgStats.pending.toString(),
//         statIconColor: "bg-yellow-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-ban",
//         statSubtitle: "INACTIVE ORGS",
//         statTitle: orgStats.inactive.toString(),
//         statIconColor: "bg-red-500",
//         showDetails: false
//       }
//     ],
//     events: [
//       {
//         statIconName: "fas fa-calendar-alt",
//         statSubtitle: "TOTAL EVENTS",
//         statTitle: "45",
//         statIconColor: "bg-purple-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-check",
//         statSubtitle: "UPCOMING",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-running",
//         statSubtitle: "ONGOING",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-green-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-history",
//         statSubtitle: "PAST EVENTS",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-gray-400",
//         showDetails: false
//       }
//     ],
//     queries: [
//       {
//         statIconName: "fas fa-calendar-alt",
//         statSubtitle: "TOTAL QUERIES",
//         statTitle: "87",
//         statIconColor: "bg-purple-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-check",
//         statSubtitle: "SOLVED QUERIES",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-exclamation-circle",
//         statSubtitle: "PENDING QUERIES",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-green-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-history",
//         statSubtitle: "QUERY AVG RATING",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-gray-400",
//         showDetails: false
//       }
//     ],
//     feedbacks: [
//       {
//         statIconName: "fas fa-calendar-alt",
//         statSubtitle: "TOTAL FEEDBACKS",
//         statTitle: "5",
//         statIconColor: "bg-purple-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-check",
//         statSubtitle: "AVG FEEDBACK",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-running",
//         statSubtitle: "FEEDBACK RESPONSE",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-green-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-history",
//         statSubtitle: "FEEDBACK RATING",
//         statTitle: "0", // Replace with actual data
//         statIconColor: "bg-gray-400",
//         showDetails: false
//       }
//     ]
//   };

//   // Get the appropriate stats based on page type
//   const stats = commonStats[pageType] || commonStats.dashboard;

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










// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CardStats from './CardStats';
// import { fetchDashboardStats } from '../../../redux/User/userSlice';

// const StatsSection = ({ isDashboard = false, pageType = 'dashboard' }) => {
//   const dispatch = useDispatch();
//   const stats = useSelector((state) => state?.user?.dashboard?.dashboardStats);
//   console.log(stats);
  
//   const status = useSelector((state) => state?.user?.dashboard?.status);
  
//   useEffect(() => {
//     dispatch(fetchDashboardStats());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return (
//       <div className="bg-lightBlue-600 md:pt-32 pb-16 pt-12">
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//         </div>
//       </div>
//     );
//   }

//   // Common stats configuration
//   const commonStats = {
//     dashboard: [
//       {
//         statIconName: "fas fa-users",
//         statSubtitle: "USER STATS",
//         statTitle: pageType !== "dashboard" ? stats?.users?.total.toString() : "",
//         statIconColor: "bg-blue-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: stats?.users?.total.toString() },
//           { label: "Active", value: stats?.users?.active.toString() },
//           { label: "Male", value: stats.users?.male.toString() },
//           { label: "Female", value: stats.users?.female.toString() },
//           { label: "Avg Age", value: stats.users?.averageAge.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-building",
//         statSubtitle: "ORG STATS",
//         statTitle: pageType !== "dashboard" ? stats?.organizations?.totalOrganizations.toString() : "",
//         statIconColor: "bg-indigo-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total Orgs", value: stats?.organizations?.totalOrganizations.toString() },
//           { label: "Total Users", value: stats?.organizations?.totalUsers.toString() },
//           { label: "Active", value: stats?.organizations?.activeUsers.toString() },
//           { label: "Male", value: stats?.organizations?.maleUsers.toString() },
//           { label: "Female", value: stats?.organizations?.femaleUsers.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-calendar-alt",
//         statSubtitle: "EVENT STATS",
//         statTitle: pageType !== "dashboard" ? stats?.events?.total.toString() : "",
//         statIconColor: "bg-purple-500",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: stats?.events?.total.toString() },
//           { label: "Upcoming", value: stats?.events?.upcoming.toString() },
//           { label: "Ongoing", value: stats?.events?.ongoing.toString() },
//           { label: "Completed", value: stats?.events?.completed.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-comment-alt",
//         statSubtitle: "FEEDBACK STATS",
//         statTitle: pageType !== "dashboard" ? stats?.feedback?.total.toString() : "",
//         statIconColor: "bg-blue-400",
//         showDetails: true,
//         statItems: [
//           { label: "Total", value: stats?.feedback?.total.toString() },
//           { label: "Avg Rating", value: stats?.feedback?.averageRating.toString() },
//           { label: "Recommend %", value: stats?.feedback?.recommendationRate.toString() }
//         ]
//       },
//       {
//         statIconName: "fas fa-question-circle",
//         statSubtitle: "QUERIE STATS",
//         statTitle: pageType !== "dashboard" ? stats?.queries?.total.toString() : "",
//         statIconColor: "bg-pink-400",
//         showDetails: true,
//         statItems: [
//           { label: "Total Queries", value: stats?.queries?.total.toString() }
//         ]
//       }
//     ],
//     users: [
//       {
//         statIconName: "fas fa-users",
//         statSubtitle: "TOTAL USERS",
//         statTitle: stats?.users?.total.toString(),
//         statIconColor: "bg-blue-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-male",
//         statSubtitle: "MALE USERS",
//         statTitle: stats?.users?.male.toString(),
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-female",
//         statSubtitle: "FEMALE USERS",
//         statTitle: stats?.users?.female.toString(),
//         statIconColor: "bg-pink-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-user-check",
//         statSubtitle: "ACTIVE USERS",
//         statTitle: stats?.users?.active.toString(),
//         statIconColor: "bg-green-500",
//         showDetails: false
//       }
//     ],
//     organizations: [
//       {
//         statIconName: "fas fa-building",
//         statSubtitle: "TOTAL ORGS",
//         statTitle: stats?.organizations?.totalOrganizations.toString(),
//         statIconColor: "bg-indigo-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-users",
//         statSubtitle: "TOTAL USERS",
//         statTitle: stats?.organizations?.totalUsers.toString(),
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-user-check",
//         statSubtitle: "ACTIVE USERS",
//         statTitle: stats?.organizations?.activeUsers.toString(),
//         statIconColor: "bg-green-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-user-times",
//         statSubtitle: "INACTIVE USERS",
//         statTitle: stats?.organizations?.deactiveUsers.toString(),
//         statIconColor: "bg-red-500",
//         showDetails: false
//       }
//     ],
//     events: [
//       {
//         statIconName: "fas fa-calendar-alt",
//         statSubtitle: "TOTAL EVENTS",
//         statTitle: stats?.events?.total.toString(),
//         statIconColor: "bg-purple-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-clock",
//         statSubtitle: "UPCOMING",
//         statTitle: stats?.events?.upcoming.toString(),
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-running",
//         statSubtitle: "ONGOING",
//         statTitle: stats?.events?.ongoing.toString(),
//         statIconColor: "bg-green-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-check",
//         statSubtitle: "COMPLETED",
//         statTitle: stats?.events?.completed.toString(),
//         statIconColor: "bg-gray-400",
//         showDetails: false
//       }
//     ],
//     feedback: [
//       {
//         statIconName: "fas fa-comment-alt",
//         statSubtitle: "TOTAL FEEDBACK",
//         statTitle: stats?.feedback?.total.toString(),
//         statIconColor: "bg-purple-500",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-star",
//         statSubtitle: "AVG RATING",
//         statTitle: stats?.feedback?.averageRating.toString(),
//         statIconColor: "bg-yellow-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-thumbs-up",
//         statSubtitle: "RECOMMEND %",
//         statTitle: stats?.feedback?.recommendationRate.toString(),
//         statIconColor: "bg-green-400",
//         showDetails: false
//       },
//       {
//         statIconName: "fas fa-chart-pie",
//         statSubtitle: "BY TYPE",
//         statTitle: stats?.feedback?.byType.length.toString(),
//         statIconColor: "bg-blue-400",
//         showDetails: false
//       }
//     ],
//     queries: [
//       {
//         statIconName: "fas fa-question-circle",
//         statSubtitle: "TOTAL QUERIES",
//         statTitle: stats?.queries?.total.toString(),
//         statIconColor: "bg-purple-500",
//         showDetails: false
//       }
//     ]
//   };

//   // Get the appropriate stats based on page type
//   const currentStats = commonStats[pageType] || commonStats.dashboard;

//   return (
//     <div className="bg-lightBlue-600 md:pt-32 -mt-17 pb-16 pt-12">
//       <div className="px-4 mx-auto w-full">
//         <div>
//           <div className="flex flex-wrap">
//             {currentStats.map((stat, index) => (
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









import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardStats from './CardStats';
import { fetchDashboardStats, selectDashboardStats, selectDashboardStatus } from '../../../redux/User/userSlice';
import {UserStatsGraph} from "../Modals/graphs/UserStatsGraph";
import {OrganizationStatsGraph} from "../Modals/graphs/OrganizationStatsGraph";

import StatsModal from '../Modals/stats/StatsModal';
import { FeedbackStatsGraph } from '../Modals/graphs/feedbackStatsGraph';
import { EventStatsGraph } from '../Modals/graphs/EventStatsGraph';
import { StockStatsGraph } from '../Modals/graphs/StockStatsGraph';
import { ComplaintStatsGraph } from '../Modals/graphs/ComplaintStatsGraph';
import { QueryStatsGraph } from '../Modals/graphs/QueryStatsGraph';
import { GalleryStatsGraph } from '../Modals/graphs/GalleryStatsGraph';
const StatsSection = ({ isDashboard = false, pageType = 'dashboard' }) => {
  const dispatch = useDispatch();
  const stats = useSelector(selectDashboardStats);
  const status = useSelector(selectDashboardStatus);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
  
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const handleCardClick = (statType, title) => {
    setModalTitle(title);
    
    // Set the appropriate graph component based on statType
    switch(statType) {
      case 'users':
        setModalContent(<UserStatsGraph stats={stats?.users} />);
        break;
      case 'organizations':
        setModalContent(<OrganizationStatsGraph stats={stats?.organizations} />);
        break;

        case 'feedbacks':
          setModalContent(<FeedbackStatsGraph stats={stats?.feedback} />);
          break;

          case 'events':
            setModalContent(<EventStatsGraph stats={stats?.events} />);
            break;

            case 'stocks':
              setModalContent(<StockStatsGraph stats={stats?.stocks} />);
              break;

              case 'complaints':
                setModalContent(<ComplaintStatsGraph stats={stats?.complaints} />);
                break;

                case 'queries':
                  setModalContent(<QueryStatsGraph stats={stats?.queries} />);
                  break;

                  case 'gallery':
                    setModalContent(<GalleryStatsGraph stats={stats?.gallery} />);
                    break;
      // Add cases for other stat types
      default:
        setModalContent(<div>No detailed view available</div>);
    }
    
    setIsModalOpen(true);
  };

  if (status === 'loading') {
    return (
      <div className="bg-lightBlue-600 md:pt-32 pb-16 pt-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Common stats configuration
  const commonStats = {
    dashboard: [
      {
        statIconName: "fas fa-users",
        statSubtitle: "USER STATS",
        statTitle: pageType !== "dashboard" ? stats?.users?.total?.toString() : "",
        statIconColor: "bg-blue-500",
        showDetails: true,
        statItems: [
          { label: "Total", value: stats?.users?.total?.toString() || "0" },
          { label: "Active", value: stats?.users?.active?.toString() || "0" },
          // { label: "Male", value: stats?.users?.male?.toString() || "0" },
          // { label: "Female", value: stats?.users?.female?.toString() || "0" },
          // { label: "Avg Age", value: stats?.users?.averageAge?.toString() || "0" }
        ],
        onClick: () => handleCardClick('users', 'User Statistics')
      },
      {
        statIconName: "fas fa-building",
        statSubtitle: "ORG STATS",
        statTitle: pageType !== "dashboard" ? stats?.organizations?.totalOrganizations?.toString() : "",
        statIconColor: "bg-indigo-500",
        showDetails: true,
        statItems: [
          { label: "Total", value: stats?.organizations?.totalOrganizations?.toString() || "0" },
          { label: "Active", value: stats?.organizations?.activeOrgs?.toString() || "0" },
          // { label: "Active", value: stats?.organizations?.activeUsers?.toString() || "0" },
          // { label: "Male", value: stats?.organizations?.maleUsers?.toString() || "0" },
          // { label: "Female", value: stats?.organizations?.femaleUsers?.toString() || "0" }
        ],
        onClick: () => handleCardClick('organizations', 'Organizations Statistics')

      },
      {
        statIconName: "fas fa-calendar-alt",
        statSubtitle: "EVENT STATS",
        statTitle: pageType !== "dashboard" ? stats?.events?.total?.toString() : "",
        statIconColor: "bg-purple-500",
        showDetails: true,
        statItems: [
          { label: "Total", value: stats?.events?.total?.toString() || "0" },
          { label: "Upcoming", value: stats?.events?.upcoming?.toString() || "0" },
          // { label: "Ongoing", value: stats?.events?.ongoing?.toString() || "0" },
          // { label: "Completed", value: stats?.events?.completed?.toString() || "0" }
        ],
        onClick: () => handleCardClick('events', 'Events Statistics')

      },
      {
        statIconName: "fas fa-comment-alt",
        statSubtitle: "FEEDBACK STATS",
        statTitle: pageType !== "dashboard" ? stats?.feedback?.total?.toString() : "",
        statIconColor: "bg-blue-400",
        showDetails: true,
        statItems: [
          { label: "Total", value: stats?.feedback?.total?.toString() || "0" },
          { label: "RATING", value: stats?.feedback?.averageRating?.toString() || "0" },
          // { label: "Recommend %", value: stats?.feedback?.recommendationRate?.toString() || "0" }
        ],
        onClick: () => handleCardClick('feedbacks', 'Feedback Statistics')
      },
      {
        statIconName: "fas fa-question-circle",
        statSubtitle: "QUERY STATS",
        statTitle: pageType !== "dashboard" ? stats?.queries?.total?.toString() : "",
        statIconColor: "bg-pink-400",
        showDetails: true,
        statItems: [
          { label: "Total", value: stats?.queries?.total?.toString() || "0" },
          { label: "Recent", value: stats?.queries?.recentQueries?.count?.toString() || "0" },
        ],
        onClick: () => handleCardClick('queries', 'Query Statistics')

      },
      {
                statIconName: "fas fa-boxes",
                statSubtitle: "STOCK STATS",
                statTitle:pageType!="dashboard" ?  "-" : "",
                statIconColor: "bg-green-500",
                showDetails: true,
                statItems: [
                  { label: "Total", value:stats?.stocks?.all?.toString() || "0" },
                  { label: "nifty50", value: stats?.stocks?.nifty50?.toString() || "0" },
                  // { label: "nifty500", value: stats?.stocks?.nifty500?.toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
        onClick: () => handleCardClick('stocks', 'Stock Statistics')

              },
              {
                statIconName: "fas fa-images",
                statSubtitle: "GALLERY STATS",
                statTitle: pageType!="dashboard" ?  "-" : "",
                statIconColor: "bg-gray-500",
                showDetails: true,
                statItems: [
                  { label: "Total", value: stats?.gallery?.totalPhotos?.toString() || "0" },
                  { label: "Category", value: stats?.gallery?.totalCategories?.toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
        onClick: () => handleCardClick('gallery', 'Gallery Statistics')
              },
              {
                statIconName: "fas fa-birthday-cake",
                statSubtitle: "COMPLAINT STATS",
                statTitle: pageType!="dashboard" ?  "345" : "",
                statIconColor: "bg-yellow-500",
                showDetails: true,
                statItems: [
                  { label: "Total", value: stats?.complaints?.total?.toString() || "0" },
                  { label: "Pending", value:  stats?.complaints?.pendingComplaint?.toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
        onClick: () => handleCardClick('complaints', 'Complaint Statistics')
              }
    ],
    // ... (keep the rest of your configurations the same)
    users: [
            {
              statIconName: "fas fa-users",
              statSubtitle: "TOTAL USERS",
              statTitle: stats?.users?.total.toString(),
              statIconColor: "bg-blue-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-male",
              statSubtitle: "AVG AGE",
              statTitle: stats?.users?.averageAge?.toString(),
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-female",
              statSubtitle: "DEACTIVE USERS",
              statTitle: stats?.users?.deactive?.toString(),
              statIconColor: "bg-pink-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-user-check",
              statSubtitle: "ACTIVE USERS",
              statTitle: stats?.users?.active?.toString() ,
              statIconColor: "bg-green-500",
              showDetails: false
            }
          ],
          organizations: [
            {
              statIconName: "fas fa-building",
              statSubtitle: "TOTAL ORGS",
              statTitle: stats?.organizations?.totalOrganizations?.toString(),
              statIconColor: "bg-indigo-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-check-circle",
              statSubtitle: "ACTIVE ORGS",
              statTitle: stats?.organizations?.activeOrgs?.toString(),
              statIconColor: "bg-green-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "PENDING ORGS",
              statTitle: stats?.organizations?.pendingOrgs?.toString(),
              statIconColor: "bg-yellow-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-ban",
              statSubtitle: "REJECTED ORGS",
              statTitle: stats?.organizations?.rejectedOrgs?.toString(),
              statIconColor: "bg-red-500",
              showDetails: false
            }
          ],
          events: [
            {
              statIconName: "fas fa-calendar-alt",
              statSubtitle: "TOTAL EVENTS",
              statTitle: stats?.events?.total?.toString(),
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-check",
              statSubtitle: "UPCOMING",
              statTitle: stats?.events?.upcoming?.toString(), // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-running",
              statSubtitle: "ONGOING",
              statTitle: stats?.events?.ongoing?.toString(), // Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-history",
              statSubtitle: "COMPLETED",
              statTitle: stats?.events?.completed?.toString(), // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
          queries: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL QUERIES",
              statTitle: stats?.queries?.total?.toString() || "0" ,
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "RECENT QUERIES",
              statTitle: stats?.queries?.recentQueries?.count?.toString() || 0, // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "POPULAR TIMES",
              statTitle: stats?.queries?.popularTimes?.toString() || 0,// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "CATEGORY",
              statTitle:  "4", // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
          feedbacks: [
            {
              statIconName: "fas fa-envelope-open-text",
              statSubtitle: "TOTAL FEEDBACKS",
              statTitle:stats?.feedback?.total?.toString(),
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-star",
              statSubtitle: "AVG RATING",
              // statTitle: stats?.feedback?.averageRating?.toString(), // Replace with actual data
              statTitle: (
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const avgRating = parseFloat(stats?.feedback?.averageRating || 0);
                    const showFull = avgRating >= star;
                    const showPartial = avgRating > (star - 1) && !showFull;
                    
                    return (
                      <i
                        key={star}
                        className={`
                          ${showFull ? 'fas fa-star text-yellow-400' : ''}
                          ${showPartial ? 'fas fa-star-half-alt text-yellow-400' : ''}
                          ${!showFull && !showPartial ? 'far fa-star text-gray-300' : ''}
                        `}
                      ></i>
                    );
                  })}
                  <span className="ml-2 text-sm font-semibold">
                    {/* {stats?.feedback?.averageRating?.toFixed(1)} */}
                  </span>
                </div>
              ),
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-smile-beam",
              statSubtitle: "RECOMMENDATION",
              // statTitle: stats?.feedback?.recommendationRate?.toString() , // Replace with actual data
              // statTitle: (
              //   <div className="flex items-center mt-1">
              //     {[1, 2, 3, 4, 5].map((star) => (
              //       <i
              //         key={star}
              //         className={`${
              //           star * 20 <= parseFloat(stats?.feedback?.recommendationRate || 0)
              //             ? 'fas fa-star text-yellow-400'
              //             : 'far fa-star text-gray-300'
              //         }`}
              //       ></i>
              //     ))}
              //     <span className="ml-2 text-sm font-semibold">
              //       {stats?.feedback?.recommendationRate}%
              //     </span>
              //   </div>
              // ),
              statTitle: (
                <div className="flex items-center">
                  {/* {[1, 2, 3, 4, 5].map((star) => {
                    const percentage = parseFloat(stats?.feedback?.recommendationRate || 0);
                    const showFull = percentage >= (star * 20);
                    const showPartial = percentage > ((star - 1) * 20) && !showFull;
                    
                    return (
                      <i
                        key={star}
                        className={`
                          ${showFull ? 'fas fa-star text-yellow-400' : ''}
                          ${showPartial ? 'fas fa-star-half-alt text-yellow-400' : ''}
                          ${!showFull && !showPartial ? 'far fa-star text-gray-300' : ''}
                        `}
                      ></i>
                    );
                  })} */}
                  <span className="ml-2 text-lg font-semibold ">
                    {stats?.feedback?.recommendationRate}%
                  </span>
                </div>
              ),
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-list-ul",
              statSubtitle: "CATEGORY",
              statTitle: "6" , // Replace with actual data
              
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
          complaints: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL COMPLAINTS",
              statTitle: stats?.complaints?.total?.toString() || 0,
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "PENDING COMPLAINTS",
              statTitle: stats?.complaints?.pendingComplaint?.toString() || 0, // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "RESOLVED COMPLAINTS",
              statTitle: stats?.complaints?.resolvedComplaints?.toString() || 0,// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "CATEGORY",
              statTitle:  "5", // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
          stocks: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL STOCKS / ETF",
              statTitle: stats?.stocks?.all?.toString() || 0,
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "NIFTY 50 ",
              statTitle: stats?.stocks?.nifty50?.toString() || 0, // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "NIFTY 500",
              statTitle: stats?.stocks?.nifty500?.toString() || 0,// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "ETF",
              statTitle: stats?.stocks?.etf?.toString() || 0, // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
          galleryImages: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL PHOTOS",
              statTitle: stats?.gallery?.totalPhotos?.toString() || "0",
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "ACTIVE",
              statTitle: "-", // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "DELETED",
              statTitle: "-",// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "NEW",
              statTitle: "-", // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
          galleryCategories: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "CATEGORY",
              statTitle: stats?.gallery?.totalCategories?.toString() || "0",
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "ACTIVE",
              statTitle: "-", // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "DELETED",
              statTitle: "-",// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "NEW",
              statTitle: "-", // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
  };

  // Get the appropriate stats based on page type
  const currentStats = commonStats[pageType] || commonStats.dashboard;

  return (
    <div className="bg-lightBlue-600 md:pt-32 -mt-17 pb-16 pt-12">
      <div className="px-4 mx-auto w-full">
        <div>
          <div className="flex flex-wrap">
            {currentStats.map((stat, index) => (
              <div
                key={index}
                className={`w-full ${isDashboard ? 'lg:w-6/12 xl:w-3/12' : 'lg:w-3/12'} px-4 mb-4`}
              >
                {/* <CardStats {...stat} /> */}
                <CardStats 
                  {...stat} 
                  onClick={stat.onClick}
                  clickable={!!stat.onClick}
                />

              </div>
            ))}
          </div>
        </div>
      </div>
      <StatsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        {modalContent}
      </StatsModal>
    </div>
  );
};

export default StatsSection;