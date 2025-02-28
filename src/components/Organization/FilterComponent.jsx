


// // debouncing and filter texxt and count function

// import React, { useEffect, useState, useCallback } from "react";
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
// }) => {
//   const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

//   // Debounce search term using custom debounce function
//   const debounce = (func, delay) => {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         func.apply(this, args);
//       }, delay);
//     };
//   };

//   const debouncedSearchChange = useCallback(debounce(onSearchChange, 2000), [onSearchChange]);

//   useEffect(() => {
//     debouncedSearchChange({ target: { value: localSearchTerm } });
//   }, [localSearchTerm, debouncedSearchChange]);

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






// working start and end date without apply button click
// import React from "react";
// import { X, Trash } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const FilterComponent = ({
//   isFilterOpen,
//   setFilterOpen,
//   startDate,
//   onStartDateChange,
//   endDate,
//   onEndDateChange,
//   gender,
//   onGenderChange,
//   onClearFilters,
//   onApplyFilters,
// }) => {
//   return (
//     <div className="bg-gray-50 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
//       <div className="flex items-center space-x-4">
//         {/* Start Date Picker */}
//         <div className="flex space-x-2 items-center">
//           <DatePicker
//             selected={startDate ? new Date(startDate) : null} // Convert ISO string to Date object
//             onChange={(date) => onStartDateChange(date)} // Pass the Date object directly
//             selectsStart
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             placeholderText="Start Date"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {startDate && (
//             <button
//               onClick={() => onStartDateChange(null)}
//               className="focus:outline-none text-gray-500 hover:text-gray-700"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         {/* End Date Picker */}
//         <div className="flex space-x-2 items-center">
//           <DatePicker
//             selected={endDate ? new Date(endDate) : null} // Convert ISO string to Date object
//             onChange={(date) => onEndDateChange(date)} // Pass the Date object directly
//             selectsEnd
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             minDate={startDate ? new Date(startDate) : null}
//             placeholderText="End Date"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {endDate && (
//             <button
//               onClick={() => onEndDateChange(null)}
//               className="focus:outline-none text-gray-500 hover:text-gray-700"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         {/* Gender Filter */}
//         <div className="flex space-x-2 items-center">
//           <select
//             value={gender}
//             onChange={(e) => onGenderChange(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {gender && (
//             <button
//               onClick={() => onGenderChange("")}
//               className="focus:outline-none text-gray-500 hover:text-gray-700"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         {/* Apply Filters Button */}
//         <button
//           onClick={onApplyFilters}
//           className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//         >
//           Apply Filters
//         </button>

//         {/* Clear Filters Button */}
//         <button
//           onClick={onClearFilters}
//           className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//         >
//           Clear Filters
//           <Trash className="inline ml-2" size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;











// working start end end date when apply button is clicked. and alos gender woworking

// import React, { useState } from "react";
// import { X, Trash } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const FilterComponent = ({
//   isFilterOpen,
//   setFilterOpen,
//   startDate,
//   onStartDateChange,
//   endDate,
//   onEndDateChange,
//   gender,
//   onGenderChange,
//   onClearFilters,
//   onApplyFilters,
// }) => {
//   // Local state for temporary filter values
//   const [localStartDate, setLocalStartDate] = useState(startDate ? new Date(startDate) : null);
//   const [localEndDate, setLocalEndDate] = useState(endDate ? new Date(endDate) : null);
//   const [localGender, setLocalGender] = useState(gender);

//   // Handle apply filters
//   const handleApply = () => {
//     // Dispatch the local filter values to Redux
//     onStartDateChange(localStartDate);
//     onEndDateChange(localEndDate);
//     onGenderChange(localGender);
//     // Trigger the data fetch
//     onApplyFilters();
//   };

//   // Handle clear filters
//   const handleClear = () => {
//     // Reset local state
//     setLocalStartDate(null);
//     setLocalEndDate(null);
//     setLocalGender("");
//     // Dispatch clear filters to Redux
//     onClearFilters();
//   };

//   return (
//     <div className="bg-gray-50 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
//       <div className="flex items-center space-x-4">
//         {/* Start Date Picker */}
//         <div className="flex space-x-2 items-center">
//           <DatePicker
//             selected={localStartDate} // Use local state
//             onChange={(date) => setLocalStartDate(date)} // Update local state
//             selectsStart
//             startDate={localStartDate}
//             endDate={localEndDate}
//             placeholderText="Start Date"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {localStartDate && (
//             <button
//               onClick={() => setLocalStartDate(null)}
//               className="focus:outline-none text-gray-500 hover:text-gray-700"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         {/* End Date Picker */}
//         <div className="flex space-x-2 items-center">
//           <DatePicker
//             selected={localEndDate} // Use local state
//             onChange={(date) => setLocalEndDate(date)} // Update local state
//             selectsEnd
//             startDate={localStartDate}
//             endDate={localEndDate}
//             minDate={localStartDate}
//             placeholderText="End Date"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {localEndDate && (
//             <button
//               onClick={() => setLocalEndDate(null)}
//               className="focus:outline-none text-gray-500 hover:text-gray-700"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         {/* Gender Filter */}
//         <div className="flex space-x-2 items-center">
//           <select
//             value={localGender} // Use local state
//             onChange={(e) => setLocalGender(e.target.value)} // Update local state
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//           {localGender && (
//             <button
//               onClick={() => setLocalGender("")}
//               className="focus:outline-none text-gray-500 hover:text-gray-700"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         {/* Apply Filters Button */}
//         <button
//           onClick={handleApply}
//           className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//         >
//           Apply Filters
//         </button>

//         {/* Clear Filters Button */}
//         <button
//           onClick={handleClear}
//           className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//         >
//           Clear Filters
//           <Trash className="inline ml-2" size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;








// admin like theme:
import React, { useState } from "react";
import { X, Trash, Filter, Search as SearchIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterComponent = ({
  isFilterOpen,
  setFilterOpen,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  gender,
  onGenderChange,
  onClearFilters,
  onApplyFilters,
  searchQuery,
  setSearchQuery,
}) => {
  // Local state for temporary filter values
  const [localStartDate, setLocalStartDate] = useState(startDate ? new Date(startDate) : null);
  const [localEndDate, setLocalEndDate] = useState(endDate ? new Date(endDate) : null);
  const [localGender, setLocalGender] = useState(gender);

  // Handle apply filters
  const handleApply = () => {
    // Dispatch the local filter values to Redux
    onStartDateChange(localStartDate);
    onEndDateChange(localEndDate);
    onGenderChange(localGender);
    // Trigger the data fetch
    onApplyFilters();
  };

  // Handle clear filters
  const handleClear = () => {
    // Reset local state
    setLocalStartDate(null);
    setLocalEndDate(null);
    setLocalGender("");
    setSearchQuery("");
    // Dispatch clear filters to Redux
    onClearFilters();
  };

  return (
    <>
      {/* Filter Button and Search Bar */}


      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-gray-100 rounded-md shadow-inner mt-0 overflow-hidden transition-max-height duration-300 ease-in-out max-h-96 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={localGender}
                onChange={(e) => setLocalGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="flex space-x-2">
                <DatePicker
                  selected={localStartDate}
                  onChange={(date) => setLocalStartDate(date)}
                  selectsStart
                  startDate={localStartDate}
                  endDate={localEndDate}
                  placeholderText="Start Date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
                />
                <DatePicker
                  selected={localEndDate}
                  onChange={(date) => setLocalEndDate(date)}
                  selectsEnd
                  startDate={localStartDate}
                  endDate={localEndDate}
                  minDate={localStartDate}
                  placeholderText="End Date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lightBlue-600"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4 gap-4">
            <button
              onClick={handleApply}
              className="px-2 -py-12 rounded-lg bg-lightBlue-600 text-white hover:bg-lightBlue-700"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="px-2 -py-12 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
          </div>

          {/* Filter Actions (Apply and Clear in the same line) */}
      
        </div>
      )}
    </>
  );
};

export default FilterComponent;