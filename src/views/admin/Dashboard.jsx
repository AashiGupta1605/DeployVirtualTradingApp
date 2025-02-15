import React, { useState, useEffect } from "react";

// components
// import ChartCard from "../../components/Admin/Cards/chartcard.js";
// import CardBarChart from "../../components/Admin/Cards/CardBarChart.js";
import CardPageVisits from "../../components/Admin/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";
import CardStats from "../../components/Admin/Cards/CardStats";


export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0); // New state for organization count

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserCount(data.length);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
  
    const fetchOrgCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/organizations");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrgCount(data.length);
      } catch (error) {
        console.error("Error fetching organization count:", error);
      }
    };
  
    fetchUserCount();
    fetchOrgCount();
  }, []); // ✅ Added empty dependency array to prevent infinite re-renders
  
  return (
    <>
      <div className=" mt-12">
        <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="REGISTERED USERS"
                    statTitle={userCount.toString()}
                    statArrow="up"
                    statPercent="100"
                    statPercentColor="text-emerald-500"
                    statDescription="Total users registered"
                    statIconName="fas fa-users"
                    statIconColor="bg-pink-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                  <CardStats
                    statSubtitle="REGISTERED ORGANIZATIONS"
                    statTitle={orgCount.toString()}
                    statArrow="up"
                    statPercent="100"
                    statPercentColor="text-emerald-500"
                    statDescription="Total organizations registered"
                    statIconName="fas fa-building"
                    statIconColor="bg-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 px-4 -mt-20 pt-2">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4 -mt-20 pt-2">
            <CardSocialTraffic />
          </div>
        </div>
        
      </div>
      
    </>
  );
}