
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const CustomSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col relative w-40">
      <label className="text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-lg px-5 py-[6px] text-sm appearance-none w-full flex justify-between items-center"
      >
        <span>{value}</span>
        <IoIosArrowDown className="text-lg text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 border rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto w-full">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-blue-100 text-sm ${
                opt.value === value ? "bg-blue-50 font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
