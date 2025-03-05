// context/TradingContext.js
import React, { createContext, useContext, useState, useReducer } from 'react';

const TradingContext = createContext();

const initialState = {
  balance: 1000000,
  holdings: 0,
  transactions: [],
  analytics: {
    totalInvestment: 0,
    currentHoldings: 0,
    realizedPL: 0,
    realizedPLPercentage: 0,
    avgBuyPrice: 0
  }
};



// At the top of TradingContext.js
const calculateAnalytics = (transactions) => {
  if (transactions.length === 0) return initialState.analytics;

  const buyTransactions = transactions.filter(t => t.type === 'buy');
  const sellTransactions = transactions.filter(t => t.type === 'sell');

  const totalBuyQty = buyTransactions.reduce((sum, t) => sum + t.qty, 0);
  const totalSellQty = sellTransactions.reduce((sum, t) => sum + t.qty, 0);
  const totalInvestment = buyTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalSold = sellTransactions.reduce((sum, t) => sum + t.total, 0);

  const avgBuyPrice = totalBuyQty > 0
    ? buyTransactions.reduce((sum, t) => sum + (t.price * t.qty), 0) / totalBuyQty
    : 0;
  const avgSellPrice = totalSellQty > 0
    ? sellTransactions.reduce((sum, t) => sum + (t.price * t.qty), 0) / totalSellQty
    : 0;

  const realizedPL = totalSold - (avgBuyPrice * totalSellQty);
  const realizedPLPercentage = totalSellQty > 0
    ? (realizedPL / (avgBuyPrice * totalSellQty)) * 100
    : 0;

  return {
    totalInvestment,
    currentHoldings: totalBuyQty - totalSellQty,
    realizedPL,
    realizedPLPercentage,
    buyTrades: buyTransactions.length,
    sellTrades: sellTransactions.length,
    avgBuyPrice,
    avgSellPrice
  };
};

const tradingReducer = (state, action) => {
  switch (action.type) {
    case 'PLACE_ORDER':
      const { type, orderType, quantity, price, total } = action.payload;
      const newTransaction = {
        date: new Date().toISOString(),
        type: type, // Use 'buy' or 'sell' here
        orderType: orderType, // Market/Limit/Stop
        qty: quantity,
        price: price,
        total: total
      };

      // Update holdings and balance
      const newHoldings = type === 'buy' 
        ? state.holdings + quantity 
        : state.holdings - quantity;
        
      const newBalance = type === 'buy'
        ? state.balance - total
        : state.balance + total;

      // Calculate new analytics
      const buyTransactions = [
        ...state.transactions.filter(t => t.type === 'buy'),
        ...(type === 'buy' ? [newTransaction] : [])
      ];
      
      const totalInvestment = buyTransactions.reduce((sum, t) => sum + t.total, 0);
      const totalBuyQty = buyTransactions.reduce((sum, t) => sum + t.qty, 0);
      const avgBuyPrice = totalBuyQty > 0 ? totalInvestment / totalBuyQty : 0;

      return {
        ...state,
        balance: newBalance,
        holdings: newHoldings,
        transactions: [newTransaction, ...state.transactions],
        analytics: {
          ...state.analytics,
          totalInvestment,
          currentHoldings: newHoldings,
          avgBuyPrice
        }
      };

    default:
      return state;
  }
};

export const TradingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tradingReducer, initialState);

  return (
    <TradingContext.Provider value={{ state, dispatch }}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTradingContext = () => useContext(TradingContext);