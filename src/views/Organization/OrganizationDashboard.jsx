
// params organization dasbaord

import React, { useEffect, useState } from "react";
import CardPageVisits from "../../components/Admin/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";
import CardStats from "../../components/Admin/Cards/CardStats";
import axios from "axios";
import Loader from "../../components/Common/Loader";

export default function OrganizationDashboard({ type }) {
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsersLastWeek, setNewUsersLastWeek] = useState(0);
  const [loading, setLoading] = useState(true);
  const orgName = localStorage.getItem("orgName");

  useEffect(() => {
    // Fetch the total user count from the backend
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/org/${orgName}/users/count/total`);
        setTotalUsers(response.data.count);
      } catch (error) {
        console.error("Error fetching total user count:", error);
      }
    };

    // Fetch the new users count from the last week
    const fetchNewUsersLastWeek = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/org/${orgName}/users/count/new-last-week`);
        setNewUsersLastWeek(response.data.count);
      } catch (error) {
        console.error("Error fetching new users count from last week:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchTotalUsers(), fetchNewUsersLastWeek()]);
      setLoading(false);
    };

    fetchData();
  }, [orgName]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={type !== "student-list" ? "mt-24" : ""}>
        <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
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
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="ACTIVE USERS"
                    statTitle="924"
                    statArrow="up"
                    statPercent="1.10"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since yesterday"
                    statIconName="fas fa-users"
                    statIconColor="bg-pink-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="RETENTION RATE"
                    statTitle="49.65%"
                    statArrow="up"
                    statPercent="12"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Since last month"
                    statIconName="fas fa-percent"
                    statIconColor="bg-lightBlue-500"
                  />
                </div>
                {type !== "student-list" && (
                  <>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="TOP ORGANIZATIONS"
                        statTitle="3"
                        statArrow="up"
                        statPercent="5"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Top 3 organizations by user count"
                        statIconName="fas fa-building"
                        statIconColor="bg-yellow-500"
                      />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="RECENT ACTIVITY"
                        statTitle="150"
                        statArrow="up"
                        statPercent="10"
                        statPercentColor="text-emerald-500"
                        statDescripiron="User activities in the last 24 hours"
                        statIconName="fas fa-activity"
                        statIconColor="bg-green-500"
                      />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="USER GROWTH RATE"
                        statTitle="4.5%"
                        statArrow="up"
                        statPercent="2"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Growth rate since last month"
                        statIconName="fas fa-chart-line"
                        statIconColor="bg-purple-500"
                      />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="PENDING APPROVALS"
                        statTitle="5"
                        statArrow="down"
                        statPercent="1"
                        statPercentColor="text-red-500"
                        statDescripiron="Pending user registrations"
                        statIconName="fas fa-hourglass-half"
                        statIconColor="bg-red-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {type !== "student-list" && (
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