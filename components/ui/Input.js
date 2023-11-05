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

  const [roles, setRoles] = useState([]); 

  const getRoles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/roles')
      const data = await response.json();
      console.log(data.data.staffs);
      setRoles(data.data.staffs);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    console.log("Updated roles:", roles);
  }, [roles]);

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-6 pt-12">
        <div className="text-xl font-semibold mb-4">Role Creation</div>
        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold">Select a role</label>
        <select id="role" className="flex w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={formData.role_name}
        onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}>
          <option value="">Choose a role</option>
          {roles.length > 0 && roles.map((role) => (
            <option key={role.role_name} value={role.role_name}>
              {role.role_name}
            </option>
          ))}
        </select>
        </div>
      <div className="mb-6">
        <label
          htmlFor="role_details"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold"
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
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold"
        >
          Expiry Date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Pick a date"
              value={Cdate}
              onChange={(date) => setDate(date)}
              minDate={dayjs()}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <button
        type="submit"
        className="bg-gray-900 text-white text-sm font-medium focus:outline-none rounded-lg px-4 py-2.5 m-2"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
         {caption}
        </span>
      </button>
    </form>
  );
}

export default CustomInput;
