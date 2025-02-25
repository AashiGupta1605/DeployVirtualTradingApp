export const getAppliedFiltersCount = ({ startDate, endDate, minAge, maxAge }) => {
    let count = 0;
    if (startDate || endDate) count++; // Date Range is considered one filter
    if (minAge || maxAge) count++; // Age Range is considered one filter
    return count;
  };
  
  export const getAppliedFiltersText = ({ startDate, endDate, minAge, maxAge }) => {
    const filters = [];
    if (startDate || endDate) filters.push("Date Range");
    if (minAge || maxAge) filters.push("Age Range");
    return filters.join(", ");
  };