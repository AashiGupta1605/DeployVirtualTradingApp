import React, { useState, useEffect } from "react";
import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users"); // Adjust URL if needed
        const data = await response.json();
        setUserCount(data.length); // Count the number of users
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="REGISTERED USERS"
              statTitle={userCount.toString()} // Dynamically update the count
              statArrow="up"
              statPercent="100"
              statPercentColor="text-emerald-500"
              statDescripiron="Total users registered"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
