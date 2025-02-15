import React, { useState, useEffect } from "react"; // Import useState and useEffect
import CardTable from "../../components/Common/CardTable";
import CardStats from "../../components/Admin/Cards/CardStats"; // Import CardStats component

export default function TablesPage() {
  const [userCount, setUserCount] = useState(0); // State for user count
  const [orgCount, setOrgCount] = useState(0); // State for organization count

  // Fetch user and organization counts
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
  }, []); // Empty dependency array to run only once

  return (
    <>
      {/* CardStats Section */}
      <div className="mt-12 bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 mx-auto w-full">
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

      {/* CardTable Section */}
      <div className="flex flex-wrap mt-24">
        <div className="w-full mb-12 px-4 -mt-20"> {/* Adjusted margin to align with CardStats */}
          <CardTable />
        </div>
      </div>
    </>
  );
}