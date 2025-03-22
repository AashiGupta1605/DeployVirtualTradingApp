// utils/marketStatus.js
export const isMarketOpen = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
  
    // Market is open from 9:30 AM to 3:30 PM, Monday to Friday
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      if ((hours === 9 && minutes >= 30) || (hours > 9 && hours < 15) || (hours === 15 && minutes <= 30)) {
        return true;
      }
    }
    return false;
  };
  
  export const getNextMarketOpenTime = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const nextOpen = new Date(now);
  
    // If it's Saturday, move to Monday
    if (dayOfWeek === 6) {
      nextOpen.setDate(now.getDate() + 2);
    } 
    // If it's Sunday, move to Monday
    else if (dayOfWeek === 0) {
      nextOpen.setDate(now.getDate() + 1);
    } 
    // If it's after market hours on a weekday, move to next day
    else if (now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() > 30)) {
      // Move to next day, but skip weekend
      do {
        nextOpen.setDate(now.getDate() + 1);
        now.setDate(now.getDate() + 1);
      } while (now.getDay() === 0 || now.getDay() === 6);
    }
  
    // Set time to market open (9:30 AM)
    nextOpen.setHours(9, 30, 0, 0);
    return nextOpen;
  };
  
  export const getTimeRemaining = (targetTime) => {
    const now = new Date();
    const diff = targetTime.getTime() - now.getTime();
  
    // Ensure non-negative values
    if (diff <= 0) {
      return { 
        hours: 0, 
        minutes: 0, 
        seconds: 0,
        formattedTime: '0 hours 0 mins 0 sec'
      };
    }
  
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    return { 
      hours, 
      minutes, 
      seconds,
      formattedTime: `${hours} hours ${minutes} mins ${seconds} sec`
    };
  };