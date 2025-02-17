import React, { useEffect, useState } from "react";
import axios from "axios";
import OrganizationManagementPage from "../../components/Admin/Org/OrganizationManagementPage";
import CardStats from "../../components/Admin/Cards/CardStats";

export default function OrgRegister() {
  const [users, setUsers] = useState([]);
  const [orgCount, setOrgCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, orgResponse, orgRegisterResponse] = await Promise.all([
          axios.get(""),
          axios.get("http://localhost:5000/api/org/display-all-org"),
          axios.get(""),
        ]);

        setUsers(usersResponse.data);
        setOrgCount(orgResponse.data.length + orgRegisterResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-12">
      <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <CardStats
                statSubtitle="REGISTERED USERS"
                statTitle={users.length.toString()}
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
      <OrganizationManagementPage />
    </div>
  );
}