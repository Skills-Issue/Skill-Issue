"use client"
import { useState } from 'react';

export default function Dropdown({ onOptionSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setIsOpen(false); // Close the dropdown when an option is selected
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown's visibility
  };

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={toggleDropdown} // Toggle the dropdown on button click
        className="outline outline-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedOption ? selectedOption : 'Account Type'}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && ( // Render the dropdown if isOpen is true
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                
                onClick={() => handleOptionSelect('Staff')}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Staff
              </a>
            </li>
            <li>
              <a
                
                onClick={() => handleOptionSelect('Manager')}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Manager
              </a>
            </li>
            <li>
              <a
               
                onClick={() => handleOptionSelect('Human Resource')}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Human Resource
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
