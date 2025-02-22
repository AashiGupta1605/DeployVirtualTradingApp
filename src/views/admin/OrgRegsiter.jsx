// src/pages/Admin/OrgRegister.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import { fetchOrganizations } from "../../redux/orgSlice";
import OrganizationManagementPage from "../../components/Admin/Org/OrganizationManagementPage";
import CardStats from "../../components/Admin/Cards/CardStats";

export default function OrgRegister() {
    const dispatch = useDispatch();
    
    // Select data from Redux store
    const users = useSelector((state) => state.user.list);
    const organizations = useSelector((state) => state.organization.list);
    const userStatus = useSelector((state) => state.user.status);
    const orgStatus = useSelector((state) => state.organization.status);
    const userError = useSelector((state) => state.user.error);
    const orgError = useSelector((state) => state.organization.error);

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers());
        }
        if (orgStatus === 'idle') {
            dispatch(fetchOrganizations());
        }
    }, [userStatus, orgStatus, dispatch]);

    // Loading states
    if (userStatus === 'loading' || orgStatus === 'loading') {
        return <div>Loading...</div>;
    }

    // Error states
    if (userError || orgError) {
        return <div>Error: {userError || orgError}</div>;
    }

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
                                statTitle={organizations.length.toString()}
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