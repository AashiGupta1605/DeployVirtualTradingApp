import React, { useEffect, useState } from "react";
import axios from "axios";
import OrganizationManagementPage from "../../components/Admin/Org/OrganizationManagementPage";
import CardStats from "../../components/Admin/Cards/CardStats";

export default function OrgRegister() {
  const [userCount, setUserCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchOrgCount();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUserCount(response.data.length); // Count users
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again later.");
    }
  };

  const fetchOrgCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/organizations");
      setOrgCount(response.data.length); // Count organizations
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  return (
    <>
      <div className="mt-12">
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
        <OrganizationManagementPage />
      </div>
    </>
  );
}
