
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchDashboardData, resetDashboardState } from '../../../redux/Organization/dashboard/organizationDashboardSlice';
import { fetchDashboardData, resetDashboardState } from '../../../redux/Organization/dashboard/organizationDashboardSlice';
import CardPageVisits from '../../Organization/Cards/CardPageVisits';
import CardSocialTraffic from '../../Organization/Cards/CardSocialTraffic';
import CardStats from '../../Organization/Cards/CardStats';
import Loader from '../../Common/Loader';

export default function Dashboard({ type, showAllCards, showCardsTable }) {
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
      <div className={type !== 'user-list' ? 'mt-20' : 'pt-20'}>  
        {/* Dashboard header */}
        <div className={type !== 'user-list' ? 'bg-lightBlue-600 md:pt-32 pb-19 pt-12' : 'bg-lightBlue-600 md:pt-32 pb-16 pt-12'}>
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

                {showAllCards && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional cards for non-student-list views */}
        {showCardsTable && (
          <div className="flex flex-wrap -mt-12 px-4">
            <div className="w-full xl:w-8/12 px-4 pt-2">
              <CardPageVisits />
            </div>
            <div className="w-full xl:w-4/12 px-4 pt-2">
              <CardSocialTraffic />
            </div>
          </div>
        )}
      </div>
    </>
  );
}