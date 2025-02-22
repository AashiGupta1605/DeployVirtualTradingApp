import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/User/userSlice";
import { fetchOrganizations } from "../../redux/Organization/orgSlice";
import CardTable from "../../components/Common/CardTable";
import CardStats from "../../components/Admin/Cards/CardStats";

export default function ETfTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.list);
  const orgCount = useSelector((state) => state.organization.list.length);
  const userStatus = useSelector((state) => state.user.status);
  const orgStatus = useSelector((state) => state.organization.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
    if (orgStatus === 'idle') {
      dispatch(fetchOrganizations());
    }
  }, [userStatus, orgStatus, dispatch]);

  const userCount = users.length;

  return (
    <>
      {/* CardStats Section */}
      <div className="mt-12 bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
              <CardStats
                statSubtitle="REGISTERED USERS"
                statTitle={userCount.toString()} // Use userCount here
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

      {/* StockTable Section */}
      <div className="flex flex-wrap -mt-6">
        <div className="w-full mb-12 px-4 -mt-42">
          <CardTable />
        </div>
      </div>
    </>
  );
}