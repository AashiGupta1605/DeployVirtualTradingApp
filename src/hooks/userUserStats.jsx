// hooks/useUserStats.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserStats } from '../redux/User/userDashboardSlice';

export const useUserStats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserStats());
  }, [dispatch]);

  return {
    refetch: () => dispatch(fetchUserStats())
  };
};