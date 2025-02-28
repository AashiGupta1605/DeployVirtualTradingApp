import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardStats from './CardStats';

import { fetchUsers, selectUserCount, selectActiveUserCount } from '../../../redux/User/userSlice';
import { fetchOrganizations, selectOrganizationCount } from '../../../redux/Organization/auth/organizationAuthSlice';
// import { fetchUsers } from '../../../redux/User/userSlice';
// import { fetchOrganizations } from '../../../redux/Organization/auth/organizationAuthSlice';


const StatsSection = ({ isDashboard = false }) => {
  const dispatch = useDispatch();

  // Get organizations from both states
  const organizationAuth = useSelector((state) => state.organization?.auth || {});
  const organizationList = useSelector((state) => state.admin?.organizationList || {});

  const userCount = useSelector(selectUserCount);
  const activeUserCount = useSelector(selectActiveUserCount);
  const organizationCount = useSelector(selectOrganizationCount);

  // Updated selectors with default values
  const {
    list: users = [],
    totalUsers = 0,
    status: userStatus = 'idle'
  } = useSelector((state) => state.user || {});

  const {
    organizations = [],
    totalOrganizations = 0,
    status: orgStatus = 'idle'
  } = useSelector((state) => state.organization?.auth || {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchUsers()).unwrap(),
          dispatch(fetchOrganizations()).unwrap()
        ]);
      } catch (error) {
        console.error('Error fetching stats data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Show loading state while data is being fetched
  if (userStatus === 'loading' || orgStatus === 'loading') {
    return (
      <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Base stats that appear on all pages
  const baseStats = [
    {
      statSubtitle: "REGISTERED USERS",
      statTitle: userCount.toString(),
      statArrow: "up",
      statPercent: "100",
      statPercentColor: "text-emerald-500",
      statDescription: "Total users registered",
      statIconName: "fas fa-users",
      statIconColor: "bg-pink-500",
    },
    {
      statSubtitle: "REGISTERED ORGANIZATIONS",
      statTitle: organizationCount.toString(),
      statArrow: "up",
      statPercent: "100",
      statPercentColor: "text-emerald-500",
      statDescription: "Total organizations registered",
      statIconName: "fas fa-building",
      statIconColor: "bg-orange-500",
    },
    {
      statSubtitle: "ACTIVE USERS",
      statTitle: activeUserCount.toString(),
      statArrow: "up",
      statPercent: "75",
      statPercentColor: "text-emerald-500",
      statDescription: "Currently active users",
      statIconName: "fas fa-user-check",
      statIconColor: "bg-lightBlue-500",
    },
    {
      statSubtitle: "TOTAL TRADES",
      statTitle: "1,000",
      statArrow: "up",
      statPercent: "80",
      statPercentColor: "text-emerald-500",
      statDescription: "Total trades executed",
      statIconName: "fas fa-chart-line",
      statIconColor: "bg-red-500",
    },
  ];

  // Additional stats for dashboard
  const dashboardStats = isDashboard ? [
    {
      statSubtitle: "MARKET CAP",
      statTitle: "₹2.4M",
      statArrow: "up",
      statPercent: "12",
      statPercentColor: "text-emerald-500",
      statDescription: "Total market capitalization",
      statIconName: "fas fa-dollar-sign",
      statIconColor: "bg-green-500",
    },
    {
      statSubtitle: "DAILY VOLUME",
      statTitle: "3,200",
      statArrow: "down",
      statPercent: "5",
      statPercentColor: "text-red-500",
      statDescription: "Daily trading volume",
      statIconName: "fas fa-exchange-alt",
      statIconColor: "bg-purple-500",
    },
    {
      statSubtitle: "PENDING ORDERS",
      statTitle: "150",
      statArrow: "up",
      statPercent: "20",
      statPercentColor: "text-emerald-500",
      statDescription: "Orders awaiting execution",
      statIconName: "fas fa-clock",
      statIconColor: "bg-yellow-500",
    },
    {
      statSubtitle: "SYSTEM HEALTH",
      statTitle: "98%",
      statArrow: "up",
      statPercent: "98",
      statPercentColor: "text-emerald-500",
      statDescription: "System uptime and performance",
      statIconName: "fas fa-server",
      statIconColor: "bg-indigo-500",
    },
  ] : [];

  // Combine stats based on isDashboard prop
  const stats = isDashboard ? [...baseStats, ...dashboardStats] : baseStats;

  return (
    <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 mx-auto w-full">
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
  );
};

export default StatsSection;