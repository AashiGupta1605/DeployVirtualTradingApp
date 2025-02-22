// components/Admin/Cards/StatsSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import CardStats from './CardStats';

const StatsSection = ({ users, orgCount }) => {
  const statsProps = {
    statSubtitle: "REGISTERED USERS",
    statTitle: users.toString(),
    statArrow: "up",
    statPercent: "100",
    statPercentColor: "text-emerald-500",
    statDescription: "Total users registered",
    statIconName: "fas fa-users",
    statIconColor: "bg-pink-500",
  };

  const orgStatsProps = {
    statSubtitle: "REGISTERED ORGANIZATIONS",
    statTitle: orgCount.toString(),
    statArrow: "up",
    statPercent: "100",
    statPercentColor: "text-emerald-500",
    statDescription: "Total organizations registered",
    statIconName: "fas fa-building",
    statIconColor: "bg-orange-500",
  };

  return (
    <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 mx-auto w-full">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats {...statsProps} />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats {...orgStatsProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

StatsSection.propTypes = {
  users: PropTypes.number.isRequired,
  orgCount: PropTypes.number.isRequired,
};

export default StatsSection;