"use client"

import CustomInput from "@/components/ui/Input";
import React, { useState } from "react";

export default function create(){
    const getLoggedInStaffId = () => {
        return JSON.parse(localStorage.getItem("user")).Staff_ID
    };

    const handleSubmit = async (formData) => {
        try {
            // Get the logged-in staff ID
            const loggedInStaffId = getLoggedInStaffId();
            
            // Add the staff ID to the formData
            formData.Role_AuthorID = loggedInStaffId;
            console.log(formData)
          const response = await fetch('http://127.0.0.1:5000/create', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Data was successfully inserted
            console.log("Role listing created successfully");
          } else {
            // Handle error here
            console.log(response)
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