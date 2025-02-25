// import React, { useEffect, useState } from "react";
// import { Filter, X, Trash } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const FilterComponent = ({
//   isFilterOpen,
//   setFilterOpen,
//   searchTerm,
//   onSearchChange,
//   startDate,
//   onStartDateChange,
//   endDate,
//   onEndDateChange,
//   minAge,
//   onMinAgeChange,
//   maxAge,
//   onMaxAgeChange,
//   onClearFilters,
//   appliedFiltersCount,
//   appliedFiltersText,
// }) => {
//   const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

//   // Debounce search term
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       onSearchChange({ target: { value: localSearchTerm } });
//     }, 500); // 500ms debounce delay

//     return () => clearTimeout(handler);
//   }, [localSearchTerm, onSearchChange]);

//   return (
//     <div className="bg-gray-50 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-700 text-sm font-bold mb-2">Date Range:</label>
//           <div className="flex space-x-2 items-center">
//             <DatePicker
//               selected={startDate}
//               onChange={onStartDateChange}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               placeholderText="Start Date"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {startDate && (
//               <button onClick={() => onStartDateChange(null)} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//           <div className="flex space-x-2 items-center mt-2">
//             <DatePicker
//               selected={endDate}
//               onChange={onEndDateChange}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               placeholderText="End Date"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {endDate && (
//               <button onClick={() => onEndDateChange(null)} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700 text-sm font-bold mb-2">Age Range:</label>
//           <div className="flex space-x-2 items-center">
//             <input
//               type="number"
//               placeholder="Min Age"
//               value={minAge}
//               onChange={onMinAgeChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {minAge && (
//               <button onClick={() => onMinAgeChange({ target: { value: "" } })} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//           <div className="flex space-x-2 items-center mt-2">
//             <input
//               type="number"
//               placeholder="Max Age"
//               value={maxAge}
//               onChange={onMaxAgeChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {maxAge && (
//               <button onClick={() => onMaxAgeChange({ target: { value: "" } })} className="focus:outline-none text-gray-500 hover:text-gray-700">
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={onClearFilters}
//           className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//         >
//           Clear All Filters
//           <Trash className="inline ml-2" size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;






// debouncing and filter texxt and count function

import React, { useEffect, useState, useCallback } from "react";
import { Filter, X, Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterComponent = ({
  isFilterOpen,
  setFilterOpen,
  searchTerm,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  minAge,
  onMinAgeChange,
  maxAge,
  onMaxAgeChange,
  onClearFilters,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search term using custom debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearchChange = useCallback(debounce(onSearchChange, 2000), [onSearchChange]);

  useEffect(() => {
    debouncedSearchChange({ target: { value: localSearchTerm } });
  }, [localSearchTerm, debouncedSearchChange]);

  return (
    <div className="bg-gray-50 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Date Range:</label>
          <div className="flex space-x-2 items-center">
            <DatePicker
              selected={startDate}
              onChange={onStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {startDate && (
              <button onClick={() => onStartDateChange(null)} className="focus:outline-none text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex space-x-2 items-center mt-2">
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {endDate && (
              <button onClick={() => onEndDateChange(null)} className="focus:outline-none text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Age Range:</label>
          <div className="flex space-x-2 items-center">
            <input
              type="number"
              placeholder="Min Age"
              value={minAge}
              onChange={onMinAgeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {minAge && (
              <button onClick={() => onMinAgeChange({ target: { value: "" } })} className="focus:outline-none text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex space-x-2 items-center mt-2">
            <input
              type="number"
              placeholder="Max Age"
              value={maxAge}
              onChange={onMaxAgeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {maxAge && (
              <button onClick={() => onMaxAgeChange({ target: { value: "" } })} className="focus:outline-none text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClearFilters}
          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
        >
          Clear All Filters
          <Trash className="inline ml-2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;