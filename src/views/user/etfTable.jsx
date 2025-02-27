import React from "react";
// import CardTable from "../../components/Common/CardTable";
import StockTable from "../../components/Common/StockTable";
import CardPageVisits from "../../components/User/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/User/Cards/CardSocialTraffic";
import CardStats from "../../components/User/Cards/CardStats";

export default function etfTable() {
  return (
    <>
    <div className="mt-24">
            <div className="bg-lightBlue-600 md:pt-8 pb-32 pt-12">
              <div className="px-4 mx-auto w-full">
                <div>
                  {/* Card stats */}
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="TRAFFIC"
                        statTitle="350,897"
                        statArrow="up"
                        statPercent="3.48"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Since last month"
                        statIconName="far fa-chart-bar"
                        statIconColor="bg-red-500"
                      />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="NEW USERS"
                        statTitle="2,356"
                        statArrow="down"
                        statPercent="3.48"
                        statPercentColor="text-red-500"
                        statDescripiron="Since last week"
                        statIconName="fas fa-chart-pie"
                        statIconColor="bg-orange-500"
                      />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="SALES"
                        statTitle="924"
                        statArrow="down"
                        statPercent="1.10"
                        statPercentColor="text-orange-500"
                        statDescripiron="Since yesterday"
                        statIconName="fas fa-users"
                        statIconColor="bg-pink-500"
                      />
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4">
                      <CardStats
                        statSubtitle="PERFORMANCE"
                        statTitle="49,65%"
                        statArrow="up"
                        statPercent="12"
                        statPercentColor="text-emerald-500"
                        statDescripiron="Since last month"
                        statIconName="fas fa-percent"
                        statIconColor="bg-lightBlue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>   
          </div>
     <div className="flex flex-wrap -mt-6">
        <div className="w-full mb-12 px-4 -mt-42">
          <StockTable />
        </div>
      </div>
    </>
  );
}