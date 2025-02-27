// components/Admin/Cards/StatsSection.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardStats from './CardStats';
import { fetchUsers } from '../../../redux/User/userSlice';
import { fetchOrganizations } from '../../../redux/Organization/auth/organizationAuthSlice';

const StatsSection = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const users = useSelector((state) => state.user.list);
  const orgCount = useSelector((state) => state.organization.list.length);
  const userStatus = useSelector((state) => state.user.status);
  const orgStatus = useSelector((state) => state.organization.status);

  // Fetch data on component mount
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
    if (orgStatus === 'idle') {
      dispatch(fetchOrganizations());
    }
  }, [userStatus, orgStatus, dispatch]);

  // Compute user count
  const userCount = users.length;

  // Default stats
  const stats = [
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
      statTitle: orgCount.toString(),
      statArrow: "up",
      statPercent: "100",
      statPercentColor: "text-emerald-500",
      statDescription: "Total organizations registered",
      statIconName: "fas fa-building",
      statIconColor: "bg-orange-500",
    }
  ];

  return (
    <div className="bg-lightBlue-600 md:pt-32 pb-36 pt-12">
      <div className="px-4 mx-auto w-full">
        <div className="flex flex-wrap">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="w-full lg:w-6/12 xl:w-3/12 px-4"
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