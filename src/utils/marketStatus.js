// utils/marketStatus.js
export const isMarketOpen = (tradingPreference) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Market is open from 9:30 AM to 3:30 PM, Monday to Friday
  const isMarketOpenNow =
    dayOfWeek >= 1 && dayOfWeek <= 5 &&
    ((hours === 9 && minutes >= 30) || (hours > 9 && hours < 15) || (hours === 15 && minutes <= 30));

  // If trading preference is "Market Hours", return true only when market is open
  if (tradingPreference === 'Market Hours') {
    return isMarketOpenNow;
  }

  // If trading preference is "Off-Market Hours", return true only when market is closed
  if (tradingPreference === 'Off-Market Hours') {
    return !isMarketOpenNow;
  }

  // Default behavior (for other cases)
  return isMarketOpenNow;
};

export const getNextMarketOpenTime = (tradingPreference) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const nextOpen = new Date(now);

  // If trading preference is "Market Hours", calculate next market open time
  if (tradingPreference === 'Market Hours') {
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
  }

  // If trading preference is "Off-Market Hours", calculate next market close time
  if (tradingPreference === 'Off-Market Hours') {
    // If it's a weekday and market is open, set time to market close (3:30 PM)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      nextOpen.setHours(15, 30, 0, 0);
      return nextOpen;
    }

    // If it's a weekend, set time to next Monday's market close (3:30 PM)
    if (dayOfWeek === 6) {
      nextOpen.setDate(now.getDate() + 2);
    } else if (dayOfWeek === 0) {
      nextOpen.setDate(now.getDate() + 1);
    }
    nextOpen.setHours(15, 30, 0, 0);
    return nextOpen;
  }

  // Default behavior (for other cases)
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