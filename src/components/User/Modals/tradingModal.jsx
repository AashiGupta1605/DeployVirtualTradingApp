import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchTransactionHistory,
  selectTransactions,
  selectHoldings,
  selectStatistics
} from '../../../redux/User/trading/tradingSlice';
import { getUserSubscriptions } from '../../../redux/User/userSubscriptionPlan/userSubscriptionPlansSlice';
import PortfolioHeader from './PortfolioHeader';
import PortfolioTable from './PortfolioTable';
import StockDetailsModal from './StockDetailsModal';

const UserPortfolioPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.auth?.user?._id);
  const user = useSelector(state => state.user.auth?.user);
  const transactions = useSelector(selectTransactions);
  const holdings = useSelector(selectHoldings);
  const statistics = useSelector(selectStatistics);
  const userSubscriptions = useSelector(state => state.user.subscriptionPlan?.userSubscriptions || []);
  
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getUserSubscriptions(userId));
      dispatch(fetchTransactionHistory({ userId }));
    }
  }, [dispatch, userId]);

  const activeSubscription = userSubscriptions.find(sub => 
    sub.status === 'Active' && !sub.isDeleted
  );

  const handleStockClick = (symbol) => {
    const stockTransactions = transactions.filter(t => t.companySymbol === symbol);
    const stockHolding = holdings.find(h => h.companySymbol === symbol);
    
    setSelectedStock({
      symbol,
      transactions: stockTransactions,
      holding: stockHolding
    });
    setShowDetailsModal(true);
  };

  return (
    <div className="px-8 mx-8 -mt-12 h-19 p-4 mb-8.5 "> {/* Increased padding and max-width */}
      <PortfolioHeader 
        user={user}
        statistics={statistics}
        balance={activeSubscription?.vertualAmount || 0}
      />
      
      <div className="mt-0.5"> {/* Added margin-top for spacing */}
        <PortfolioTable 
          holdings={holdings}
          transactions={transactions}
          onStockClick={handleStockClick}
        />
      </div>

      {showDetailsModal && selectedStock && (
        <StockDetailsModal
          stock={selectedStock}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default UserPortfolioPage;