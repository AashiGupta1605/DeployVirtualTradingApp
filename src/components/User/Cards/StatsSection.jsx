

// deepseek


// components/User/Cards/UserStatsSection.js

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardStats from './CardStats';
import { selectUserStats, selectUserStatsStatus } from '../../../redux/User/userDashboardSlice';
import UserStatsGraph from "../Modals/Graphs/userStatsGraph";
import StatsModal from '../Modals/stats/StatsModal';
import Loader from '../../Common/Loader';
import { 
  fetchTransactionHistory,
  selectHoldings,
  selectStatistics,
  fetchEventSpecificTransactions,
  selectFilteredTransactions
} from '../../../redux/User/trading/tradingSlice';

const StatsSection = ({ isDashboard = false, pageType = 'dashboard' }) => {
const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
  const statistics = useSelector(selectStatistics);

const activeSubscription = userSubscriptions.find(sub => 
  sub.status === 'Active' && !sub.isDeleted
);
  const stats = useSelector(selectUserStats);
  const status = useSelector(selectUserStatsStatus);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

    const nifty50Data = useSelector((state) => state.common.nifty50.data);
    const nifty500Data = useSelector((state) => state.common.nifty500.data);
    const etfData = useSelector((state) => state.common.etf.stockData);

 
  // const handleCardClick = (statType, title) => {
  //   setModalTitle(title);
    
  //   switch(statType) {
  //     case 'users':
  //       setModalContent(
  //         <UserStatsGraph 
  //           stats={stats.user} 
  //           title="Your Profile Statistics"
  //         />
  //       );
  //       break;
  //     case 'events':
  //       setModalContent(
  //         <UserStatsGraph 
  //           stats={stats.events} 
  //           title="Your Event Statistics"
  //         />
  //       );
  //       break;
  //     case 'feedbacks':
  //       setModalContent(
  //         <UserStatsGraph 
  //           stats={stats.feedback} 
  //           title="Your Feedback Statistics"
  //         />
  //       );
  //       break;
  //     case 'complaints':
  //       setModalContent(
  //         <UserStatsGraph 
  //           stats={stats.complaints} 
  //           title="Your Complaint Statistics"
  //         />
  //       );
  //       break;
  //     case 'queries':
  //       setModalContent(
  //         <UserStatsGraph 
  //           stats={stats.queries} 
  //           title="Your Query Statistics"
  //         />
  //       );
  //       break;
  //     case 'subscription':
  //       setModalContent(
  //         <UserStatsGraph 
  //           stats={stats.subscription} 
  //           title="Your Subscription Details"
  //           chartTypes={['doughnut']} // Special chart type for subscription
  //         />
  //       );
  //       break;
  //     default:
  //       setModalContent(<div>No detailed view available</div>);
  //   }
    
  //   setIsModalOpen(true);
  // };

  const handleCardClick = (statType, title) => {
    // setModalTitle(title);
    
    // let statsData, type;
    // switch(statType) {
    //   case 'users':
    //     statsData = stats.user;
    //     type = 'users';
    //     break;
    //   case 'events':
    //     statsData = stats.events;
    //     type = 'events';
    //     break;
    //   case 'feedbacks':
    //     statsData = stats.feedback;
    //     type = 'feedback';
    //     break;
    //   case 'complaints':
    //     statsData = stats.complaints;
    //     type = 'complaints';
    //     break;
    //   case 'queries':
    //     statsData = stats.queries;
    //     type = 'queries';
    //     break;
    //   case 'subscription':
    //     statsData = stats.subscription;
    //     type = 'subscription';
    //     break;
    //   case 'stocks':
    //     statsData = stats.stocks;
    //     type = 'stocks';
    //     break;
    //   case 'gallery':
    //     statsData = stats.gallery;
    //     type = 'gallery';
    //     break;
    //   default:
    //     statsData = {};
    //     type = 'users';
    // }
    
    // setModalContent(
    //   <UserStatsGraph 
    //     stats={statsData} 
    //     title={title} 
    //     type={type}
    //   />
    // );
    
    // setIsModalOpen(true);
  };

  if (status === 'loading') {
    return <Loader />;
  }

  // const commonStats = {
  //   dashboard: [
  //     {
  //       statIconName: "fas fa-user",
  //       statSubtitle: "YOUR PROFILE",
  //       statTitle: "View Stats",
  //       statIconColor: "bg-blue-500",
  //       onClick: () => handleCardClick('user', 'Your Profile Stats')
  //     },
  //     {
  //       statIconName: "fas fa-calendar",
  //       statSubtitle: "YOUR EVENTS",
  //       statTitle: stats.events.total.toString(),
  //       statIconColor: "bg-indigo-500",
  //       onClick: () => handleCardClick('events', 'Your Event Stats')
  //     },
  //     {
  //       statIconName: "fas fa-comment",
  //       statSubtitle: "YOUR FEEDBACK",
  //       statTitle: stats.feedback.total.toString(),
  //       statIconColor: "bg-purple-500",
  //       onClick: () => handleCardClick('feedback', 'Your Feedback Stats')
  //     },
  //     {
  //       statIconName: "fas fa-exclamation-circle",
  //       statSubtitle: "YOUR COMPLAINTS",
  //       statTitle: stats.complaints.total.toString(),
  //       statIconColor: "bg-red-500",
  //       onClick: () => handleCardClick('complaints', 'Your Complaint Stats')
  //     }
  //   ],
  //   // Add other pageType configurations as needed
  // };

  const commonStats = {
    dashboard: [
      // {
      //   statIconName: "fas fa-users",
      //   statSubtitle: "USER STATS",
      //   statTitle: pageType !== "dashboard" ? stats?.user?.total?.toString() : "",
      //   statIconColor: "bg-blue-500",
      //   showDetails: true,
      //   statItems: [
      //     { label: "Age", value: stats?.user?.age?.toString() || "0" },
      //     { label: "Gender", value: stats?.user?.gender?.toString() || "0" },
      //     // { label: "Male", value: stats?.users?.male?.toString() || "0" },
      //     // { label: "Female", value: stats?.users?.female?.toString() || "0" },
      //     // { label: "Avg Age", value: stats?.users?.averageAge?.toString() || "0" }
      //   ],
      //   onClick: () => handleCardClick('users', 'User Statistics')
      // },

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
        statIconName: "fas fa-question-circle",
        statSubtitle: "QUERY STATS",
        statTitle: pageType !== "dashboard" ? stats?.queries?.total?.toString() : "",
        statIconColor: "bg-pink-400",
        showDetails: true,
        statItems: [
          { label: "Total", value: stats?.queries?.total?.toString() || "0" },
          { label: "Recent", value: stats?.queries?.responded?.toString() || "0" },
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
                  { label: "nifty50", value:nifty50Data.length - 1 || "0" },
                  { label: "etf", value: etfData.length - 1 || "0" },
                  // { label: "nifty500", value: stats?.stocks?.nifty500?.toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
        onClick: () => handleCardClick('stocks', 'Stock Statistics')

              },
              
              {
                statIconName: "fas fa-birthday-cake",
                statSubtitle: "COMPLAINT STATS",
                statTitle: pageType!="dashboard" ?  "345" : "",
                statIconColor: "bg-yellow-500",
                showDetails: true,
                statItems: [
                  { label: "Total", value: stats?.complaints?.total?.toString() || "0" },
                  { label: "Pending", value:  stats?.complaints?.pending?.toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
        onClick: () => handleCardClick('complaints', 'Complaint Statistics')
              },

              {
                statIconName: "fas fa-crown",
                statSubtitle: "PLAN STATS",
                statTitle: pageType!="dashboard" ?  stats?.subscription?.plan : "",
                showDetails: true,
                statIconColor: "bg-yellow-500",
                statItems: [
                  { label: "plan", value: stats?.subscription?.plan?.toString() || "0" },
                  { label: "Time", value:  stats?.subscription?.duration?.toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
                onClick: () => handleCardClick('subscription', 'Your Subscription Details')
              },

              {
                statIconName: "fas fa-crown",
                statSubtitle: "----",
                statTitle: pageType!="dashboard" ?  stats?.subscription?.plan : "",
                showDetails: true,
                statIconColor: "bg-yellow-500",
                statItems: [
                  { label: "plan", value: "-".toString() || "0" },
                  { label: "Time", value: "-".toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
                onClick: () => handleCardClick('subscription', 'Your Subscription Details')
              },


              {
                statIconName: "fas fa-crown",
                statSubtitle: "----",
                statTitle: pageType!="dashboard" ?  stats?.subscription?.plan : "",
                showDetails: true,
                statIconColor: "bg-yellow-500",
                statItems: [
                  { label: "plan", value: "-".toString() || "0" },
                  { label: "Time", value: "-".toString() || "0" },
                  // { label: "Pending", value: orgStats.pending.toString() },
                  // { label: "Inactive", value: orgStats.inactive.toString() }
                ],
                onClick: () => handleCardClick('subscription', 'Your Subscription Details')
              }
    ],
    // ... (keep the rest of your configurations the same)
    users: [
            {
              statIconName: "fas fa-users",
              statSubtitle: "TOTAL USERS",
              statTitle: stats?.users?.total.toString(),
              statIconColor: "bg-blue-500",
              showDetails: false,
              onClick: () => handleCardClick('users', 'User Statistics')
            },
            {
              statIconName: "fas fa-male",
              statSubtitle: "AVG AGE",
              statTitle: stats?.users?.averageAge?.toString(),
              statIconColor: "bg-blue-400",
              showDetails: false,
             onClick: () => handleCardClick('users', 'User Statistics')
            },
            {
              statIconName: "fas fa-female",
              statSubtitle: "DEACTIVE USERS",
              statTitle: stats?.users?.deactive?.toString(),
              statIconColor: "bg-pink-400",
              showDetails: false,
            onClick: () => handleCardClick('users', 'User Statistics')

            },
            {
              statIconName: "fas fa-user-check",
              statSubtitle: "ACTIVE USERS",
              statTitle: stats?.users?.active?.toString() ,
              statIconColor: "bg-green-500",
              showDetails: false,
              onClick: () => handleCardClick('users', 'User Statistics')

            }
          ],
          organizations: [
            {
              statIconName: "fas fa-building",
              statSubtitle: "TOTAL ORGS",
              statTitle: stats?.organizations?.totalOrganizations?.toString(),
              statIconColor: "bg-indigo-500",
              showDetails: false,
        onClick: () => handleCardClick('organizations', 'Organizations Statistics')

            },
            {
              statIconName: "fas fa-check-circle",
              statSubtitle: "ACTIVE ORGS",
              statTitle: stats?.organizations?.activeOrgs?.toString(),
              statIconColor: "bg-green-500",
              showDetails: false,
        onClick: () => handleCardClick('organizations', 'Organizations Statistics')

            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "PENDING ORGS",
              statTitle: stats?.organizations?.pendingOrgs?.toString(),
              statIconColor: "bg-yellow-500",
              showDetails: false,
        onClick: () => handleCardClick('organizations', 'Organizations Statistics')

            },
            {
              statIconName: "fas fa-ban",
              statSubtitle: "REJECTED ORGS",
              statTitle: stats?.organizations?.rejectedOrgs?.toString(),
              statIconColor: "bg-red-500",
              showDetails: false,
        onClick: () => handleCardClick('organizations', 'Organizations Statistics')
            }
          ],
          events: [
            {
              statIconName: "fas fa-calendar-alt",
              statSubtitle: "TOTAL EVENTS",
              statTitle: stats?.events?.total?.toString(),
              statIconColor: "bg-purple-500",
              showDetails: false,
        onClick: () => handleCardClick('events', 'Events Statistics')

            },
            {
              statIconName: "fas fa-check",
              statSubtitle: "UPCOMING",
              statTitle: stats?.events?.upcoming?.toString(), // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false,
        onClick: () => handleCardClick('events', 'Events Statistics')

            },
            {
              statIconName: "fas fa-running",
              statSubtitle: "ONGOING",
              statTitle: stats?.events?.ongoing?.toString(), // Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false,
        onClick: () => handleCardClick('events', 'Events Statistics')

            },
            {
              statIconName: "fas fa-history",
              statSubtitle: "COMPLETED",
              statTitle: stats?.events?.completed?.toString(), // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false,
        onClick: () => handleCardClick('events', 'Events Statistics')
            }
          ],
          queries: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL QUERIES",
              statTitle: stats?.queries?.total?.toString() || "0" ,
              statIconColor: "bg-purple-500",
              showDetails: false,
        onClick: () => handleCardClick('queries', 'Query Statistics')

            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "RECENT QUERIES",
              statTitle: stats?.queries?.recentQueries?.count?.toString() || 0, // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false,
        onClick: () => handleCardClick('queries', 'Query Statistics')

            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "POPULAR TIMES",
              statTitle: stats?.queries?.popularTimes?.toString() || 0,// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false,
        onClick: () => handleCardClick('queries', 'Query Statistics')

            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "CATEGORY",
              statTitle:  "4", // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false,
        onClick: () => handleCardClick('queries', 'Query Statistics')

            }
          ],
          feedbacks: [
            {
              statIconName: "fas fa-envelope-open-text",
              statSubtitle: "TOTAL FEEDBACKS",
              statTitle:stats?.feedback?.total?.toString(),
              statIconColor: "bg-purple-500",
              showDetails: false,
        onClick: () => handleCardClick('feedbacks', 'Feedback Statistics')
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
              showDetails: false,
        onClick: () => handleCardClick('feedbacks', 'Feedback Statistics')
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
              showDetails: false,
        onClick: () => handleCardClick('feedbacks', 'Feedback Statistics')
            },
            {
              statIconName: "fas fa-list-ul",
              statSubtitle: "CATEGORY",
              statTitle: "6" , // Replace with actual data
              
              statIconColor: "bg-gray-400",
              showDetails: false,
        onClick: () => handleCardClick('feedbacks', 'Feedback Statistics')
            }
          ],
          complaints: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL COMPLAINTS",
              statTitle: stats?.complaints?.total?.toString() || 0,
              statIconColor: "bg-purple-500",
              showDetails: false,
        onClick: () => handleCardClick('complaints', 'Complaint Statistics')
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "PENDING COMPLAINTS",
              statTitle: stats?.complaints?.pendingComplaint?.toString() || 0, // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false,
        onClick: () => handleCardClick('complaints', 'Complaint Statistics')
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "RESOLVED COMPLAINTS",
              statTitle: stats?.complaints?.resolvedComplaints?.toString() || 0,// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false,
        onClick: () => handleCardClick('complaints', 'Complaint Statistics')
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "CATEGORY",
              statTitle:  "5", // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false,
        onClick: () => handleCardClick('complaints', 'Complaint Statistics')
            }
          ],
          stocks: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL STOCKS / ETF",
              statTitle: nifty50Data.length + nifty500Data.length + etfData.length - 3 || 0,
              statIconColor: "bg-purple-500",
              showDetails: false,
        onClick: () => handleCardClick('stocks', 'Stocks Statistics')

            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "NIFTY 50 ",
              statTitle: nifty50Data.length -1 || 0, // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false,
        onClick: () => handleCardClick('stocks', 'Stocks Statistics')
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "NIFTY 500",
              statTitle: nifty500Data.length - 1 || 0,// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false,
        onClick: () => handleCardClick('stocks', 'Stocks Statistics')
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "ETF",
              statTitle: etfData.length - 1 || 0, // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false,
        onClick: () => handleCardClick('stocks', 'Stocks Statistics')
            }
          ],
          galleryImages: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "TOTAL PHOTOS",
              statTitle: stats?.gallery?.totalPhotos?.toString() || "0",
              statIconColor: "bg-purple-500",
              showDetails: false,
        onClick: () => handleCardClick('gallery', 'Gallery Statistics')

            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "ACTIVE",
              statTitle: "-", // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false,
        onClick: () => handleCardClick('gallery', 'Gallery Statistics')
              
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "DELETED",
              statTitle: "-",// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false,
        onClick: () => handleCardClick('gallery', 'Gallery Statistics')
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "NEW",
              statTitle: "-", // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false,
        onClick: () => handleCardClick('gallery', 'Gallery Statistics')
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

          trading: [
            {
              statIconName: "fas fa-inbox",
              statSubtitle: "VIRTUAL AMOUNT",
              statTitle: "₹" + activeSubscription?.vertualAmount?.toFixed(2).toString() || "0",
              statIconColor: "bg-purple-500",
              showDetails: false
            },
            {
              statIconName: "fas fa-clock",
              statSubtitle: "TOTAL INVESTMENT",
              statTitle: "₹" + statistics.totalInvestment?.toFixed(2).toString() || "0", // Replace with actual data
              statIconColor: "bg-blue-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-chart-line",
              statSubtitle: "PERFORMANCE",
              statTitle: statistics.successRate?.toFixed(2).toString() + "%" || "0%",// Replace with actual data
              statIconColor: "bg-green-400",
              showDetails: false
            },
            {
              statIconName: "fas fa-tags",
              statSubtitle: "PROFIT & LOSS",
              statTitle: statistics.realizedPL?.toFixed(2).toString() || "0" , // Replace with actual data
              statIconColor: "bg-gray-400",
              showDetails: false
            }
          ],
  };

  const currentStats = commonStats[pageType] || commonStats.dashboard;

  return (
    <div className="bg-lightBlue-600 md:pt-10 pb-16">
      <div className="px-4 mx-auto w-full">
        <div className="flex flex-wrap">
          {currentStats.map((stat, index) => (
            <div key={index} className={`w-full ${isDashboard ? 'lg:w-6/12 xl:w-3/12' : 'lg:w-3/12'} px-4 mb-4`}>
              <CardStats 
                {...stat} 
                clickable={true}
              />
            </div>
          ))}
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