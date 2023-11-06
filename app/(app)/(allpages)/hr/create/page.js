"use client"

import CustomInput from "@/components/ui/Input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function create(){
    //snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const router = useRouter();
    const openSnackbarHandler = (severity, message) => {
      setSnackbarSeverity(severity);
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    };

    const closeSnackbarHandler = () => {
      setOpenSnackbar(false);
    };


    const getLoggedInStaffId = () => {
        return JSON.parse(localStorage.getItem("user")).staff_id
    };

    const getCurrentDate = () => {
      const currentDate = new Date();
      // Create a formatted string (e.g., "YYYY-MM-DD")
      // Format the current date as a string, e.g., "2023-09-28"
      const formattedDate = currentDate.toISOString().split("T")[0];
      return formattedDate;
    };

    const [initialData,setInitialData] = useState({
      role_name: "",
      role_details: "",
      expiry_date: getCurrentDate(),
      creation_date: "",
      role_author_id: null,
    });

    const handleSubmit = async (formData) => {
        try {
            // Get the logged-in staff ID
            const loggedInStaffId = getLoggedInStaffId();
            
            // Add the staff ID to the formData
            formData.role_author_id = loggedInStaffId;
            console.log(formData);
          const response = await fetch('http://127.0.0.1:5000/create', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const responseData = await response.json(); // Parse JSON response
          console.log("Code:", responseData.code);

          if (responseData.code == 200) {
            // Data was successfully inserted
            console.log("Role listing created successfully");
            openSnackbarHandler("success", "Role listing created successfully");
            setTimeout(()=>{router.push("/hr/dashboard")},1000)
          } else {
            // Handle error here
            console.error("Error creating role listing");
            console.log("Message:", responseData.message);
            openSnackbarHandler("error", "Error creating role listing");
            setTimeout(()=>{router.push("/hr/dashboard")},1000)
          }
        } catch (error) {
          console.error("Error:", error);
          openSnackbarHandler("error", "Error creating role listing");
          setTimeout(()=>{router.push("/hr/dashboard")},1000)
        }
      };

    return(
        <div>
            <CustomInput onSubmit={handleSubmit} caption="Create Role Listing" 
            initialData={initialData} isRoleNameDisabled={false}/>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={closeSnackbarHandler}>
              <MuiAlert severity={snackbarSeverity} elevation={6} variant="filled">
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
        </div>
        
    )
}