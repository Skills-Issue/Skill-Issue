"use client";

import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function CustomInput({ onSubmit, caption, initialData, isRoleNameDisabled}) {

  // Initialize formData with initialData
  // Define formData state
  const [formData, setFormData] = useState({
    role_name: "",
    role_details: "",
    expiry_date: "",
    creation_date: "",
    role_author_id: null,
  });

  // Use useEffect to set formData when initialData is available
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const [Cdate, setDate] = useState(dayjs()); //for expiry date

  useEffect(() => {
    setDate(dayjs(initialData.expiry_date, "YYYY-MM-DD"));
  }, [initialData]);

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
      creation_date: getCurrentDate(),
      expiry_date: Cdate.format("YYYY-MM-DD"),
    };

    // Call the onSubmit callback with the updated form data
    onSubmit(updatedFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 pt-14">
        <label
          htmlFor="Role_Name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Role Name
        </label>
        <input
          type="text"
          id="role_name"
          value={formData.role_name}
          onChange={handleInputChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="e.g. Janitor"
          required
          disabled= {isRoleNameDisabled}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="role_details"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Role Description
        </label>
        <textarea
          id="role_details"
          value={formData.role_details}
          onChange={handleInputChange}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add description..."
          required
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          htmlFor="expiry_date"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Expiry Date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Pick a date"
              value={Cdate}
              onChange={(date) => setDate(date)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <button
        type="submit"
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
         {caption}
        </span>
      </button>
    </form>
  );
}

export default CustomInput;
