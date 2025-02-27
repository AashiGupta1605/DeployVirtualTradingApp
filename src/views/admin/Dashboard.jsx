import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/User/userSlice";
import {
fetchOrganizations,
selectOrganizations,
selectOrganizationStatus
} from "../../redux/Organization/auth/organizationAuthSlice";
import CardPageVisits from "../../components/Admin/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Admin/Cards/CardSocialTraffic";
import StatsSection from "../../components/Admin/Cards/StatsSection";

export default function Dashboard() {

return (
<div className="mt-12 overflow-hidden">
<StatsSection isDashboard={true} />
<div className="px-4 mx-auto w-full -mt-24">
<div className="flex flex-wrap">
<div className="w-full xl:w-8/12 px-4">
<CardPageVisits />
</div>
<div className="w-full xl:w-4/12 px-4">
<CardSocialTraffic />
</div>
</div>
</div>
</div>
);
}