// We receive two props from the Parent: the whole useState
// 1. sortOption (the current choice)

import { useState } from "react";

// 2. setSortOption (the function to change the choice)
const SortDropdown = ({ sortOption, setSortOption }) => {
  // We need local state to track if the menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Our list of options stored as an array of objects
  const options = [
    { value: "", label: "All" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  // Figure out which label to show on the main button based on the current state
  const currentLabel =
    options.find((opt) => opt.value === sortOption)?.label || "All";

  return (
    <div className="relative inline-block w-full text-left">
      {/* 1. THE MAIN BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
      >
        {currentLabel}

        {/* Animated Arrow (Spins when isOpen is true!) */}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 2. THE INVISIBLE OVERLAY TRICK */}
      {/* This invisible full-screen div catches clicks "outside" the menu to close it automatically */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 3. THE FLOATING MENU */}
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => {
              // Check if this specific option is currently active
              const isActive = sortOption === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortOption(option.value); // Tell Shop.jsx to sort the items
                    setIsOpen(false); // Close the menu
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-gray-50 font-semibold text-black"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
