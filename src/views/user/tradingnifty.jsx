import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardStats from "../../components/User/Cards/CardStats";
import TradingModal from "../../components/User/Modals/tradingModal";
import { 
  selectStatistics, 
  fetchTransactionHistory 
} from "../../redux/User/trading/tradingSlice";
import { 
  selectUserSubscriptions, 
  getUserSubscriptions 
} from "../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice";

export default function ETFTable() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Selectors
  const statistics = useSelector(selectStatistics);
  const userSubscriptions = useSelector(selectUserSubscriptions);

  // Get the active subscription
  const activeSubscription = userSubscriptions.find(sub => sub.status === 'Active' && !sub.isDeleted);

  // Dynamic card configuration
  const cardConfigurations = [
    {
      subtitle: "Virtual Amount",
      title: activeSubscription?.vertualAmount || 0,
      iconName: "fas fa-wallet",
      iconColor: "bg-indigo-500",
      percentColor: "text-gray-500",
      description: "Available Virtual Balance"
    },
    {
      subtitle: "Total Investment",
      title: statistics.totalInvestment,
      iconName: "fas fa-money-bill-wave",
      iconColor: "bg-green-500",
      percentColor: "text-emerald-500",
      description: "Total Amount Invested"
    },
    {
      subtitle: "Current Holdings Value",
      title: statistics.currentHoldingsValue,
      iconName: "fas fa-chart-line",
      iconColor: "bg-blue-500",
      percentColor: statistics.realizedPLPercentage >= 0 
        ? "text-emerald-500" 
        : "text-red-500",
      description: "Current Market Value"
    },
    {
      subtitle: "Realized P&L",
      title: statistics.realizedPL,
      iconName: "fas fa-percent",
      iconColor: "bg-purple-500",
      percentColor: statistics.realizedPLPercentage >= 0 
        ? "text-emerald-500" 
        : "text-red-500",
      description: "Profit/Loss Percentage"
    },
    {
      subtitle: "Trading Performance",
      title: `${statistics.successRate.toFixed(2)}%`,
      iconName: "fas fa-chart-pie",
      iconColor: "bg-orange-500",
      percentColor: statistics.successRate >= 50 
        ? "text-emerald-500" 
        : "text-red-500",
      description: "Success Rate"
    },
    {
      subtitle: "Total Trades",
      title: `${statistics.buyTrades + statistics.sellTrades}`,
      iconName: "fas fa-exchange-alt",
      iconColor: "bg-pink-500",
      percentColor: "text-gray-500",
      description: "Buy & Sell Trades"
    },
    // Add Virtual Amount Card

  ];

  // Fetch data on component mount
  useEffect(() => {
    // Assuming you have user ID from authentication context/state
    const userId = localStorage.getItem('userId'); // Replace with actual method
    
    if (userId) {
      dispatch(getUserSubscriptions(userId));
      dispatch(fetchTransactionHistory({ userId }));
    }
  }, [dispatch]);

  return (
    <>
      <div className="mt-24">
        <div className="bg-lightBlue-600 md:pt-8 pb-16 pt-12">
          <div className="px-4 mx-auto w-full">
            <div className="flex flex-wrap">
              {cardConfigurations.map((card, index) => (
                <div 
                  key={index} 
                  className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-4"
                >
                  <CardStats
                    statSubtitle={card.subtitle}
                    statTitle={`₹${card.title.toLocaleString()}`}
                    statArrow={
                      card.title >= 0 ? "up" : "down"
                    }
                    statPercent={
                      card.subtitle === "Trading Performance" 
                        ? card.title 
                        : Math.abs(statistics.realizedPLPercentage).toFixed(2)
                    }
                    statPercentColor={card.percentColor}
                    statDescripiron={card.description}
                    statIconName={card.iconName}
                    statIconColor={card.iconColor}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TradingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}