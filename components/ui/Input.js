"use client"

import React, { useState } from "react";
import { Datepicker } from 'flowbite-react';

function CustomInput({onSubmit}) {
    const [formData, setFormData] = useState({
        Role_Name: "",
        Role_Details: "",
        Expiry_Date: "",
        Creation_Date: ""
      });
    
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
          ...formData,
          [id]: value,
        });
      };

      const handleDateChange = (date) => {
        // Update the Expiry_Date in formData when the datepicker value changes
        setFormData({
          ...formData,
          Expiry_Date: date.toISOString().split("T")[0], // Format the date as "YYYY-MM-DD"
        });
      };
    
      const getCurrentDate = () => {
        const currentDate = new Date();
        // Format the current date as a string, e.g., "2023-09-28"
        const formattedDate = currentDate.toISOString().split("T")[0];
        return formattedDate;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Add the current date to the formData before submitting
        const updatedFormData = {
          ...formData,
          Creation_Date: getCurrentDate(),
        };
    
        // Call the onSubmit callback with the updated form data
        onSubmit(updatedFormData);
      };

  return (
    <form onSubmit={handleSubmit}>
  <div class="mb-6 pt-14">
    <label htmlFor="Role_Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role Name</label>
    <input type="text" id="Role_Name" value={formData.Role_Name} onChange={handleInputChange} 
    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="e.g. Janitor" required/>
  </div>
  <div class="mb-6">
    <label htmlFor="Role_Details" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role Description</label>
    <textarea id="Role_Details" value={formData.Role_Details} onChange={handleInputChange}
    rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add description..." required></textarea>
  </div>
  <div class="mb-6">
  <label htmlFor="Expiry_Date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date</label>
    <Datepicker id="Expiry_date" onChange={handleDateChange} selected={formData.Expiry_Date} required
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></Datepicker>
  </div>
  <button type="submit" class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Create Role Listing
  </span>
</button>
</form>
  );
}

export default CustomInput;