"use client"

import CustomInput from "@/components/ui/Input";
import React, { useState } from "react";

export default function create(){
    const getLoggedInStaffId = () => {
        return JSON.parse(localStorage.getItem("user")).staff_id
    };

    const handleSubmit = async (formData) => {
        try {
            // Get the logged-in staff ID
            const loggedInStaffId = getLoggedInStaffId();
            
            // Add the staff ID to the formData
            formData.role_author_id = loggedInStaffId;
            console.log(formData)
          const response = await fetch('http://127.0.0.1:5000/create', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const responseData = await response.json(); // Parse JSON response
          console.log("Code:", responseData.code);

          if (responseData.code == 201) {
            // Data was successfully inserted
            console.log("Role listing created successfully");
          } else {
            // Handle error here
            console.error("Error creating role listing");
            console.log("Message:", responseData.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    return(
        <div>
            <CustomInput onSubmit={handleSubmit}/>
        </div>
        
    )
}