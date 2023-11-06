"use client"

import CustomInput from "@/components/ui/Input";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function edit(params){
    const RoleListingID = params.params.id

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

    // Define state to hold the initial data
    const [initialData, setInitialData] = useState({
      role_name: "",
      role_details: "",
      expiry_date: "",
      creation_date: "",
      role_author_id: null,
    });

    const getLoggedInStaffId = () => {
        return JSON.parse(localStorage.getItem("user")).staff_id
    };

    const fetchRoleListingDetails = async () => {
      try {
        // Make an API request to fetch role listing details
        const response = await fetch(`http://127.0.0.1:5000/edit/${RoleListingID}`, {
          method: 'GET'
        });
        const responseData = await response.json();

        console.log(responseData.data)
  
        if (responseData.code === 200) {
          // Update initialData with the fetched data
          console.log("fetched")
          setInitialData(responseData.data);
        } else {
          console.error("Error fetching role listing details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    useEffect(() => {
      // Fetch role listing details when the component mounts
      fetchRoleListingDetails();
    }, [RoleListingID]);

    //UPDATE with actual values
    const handleSubmit = async (formData) => {
        try {
            // Get the logged-in staff ID
            const loggedInStaffId = getLoggedInStaffId();
            
            // Add the staff ID to the formData
            formData.role_author_id = loggedInStaffId;
            console.log(formData)
          const response = await fetch(`http://127.0.0.1:5000/edit/${RoleListingID}`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const responseData = await response.json(); // Parse JSON response
          console.log("Code:", responseData.code);

          if (responseData.code == 200) {
            // Data was successfully inserted
            console.log("Role listing updated successfully");
            openSnackbarHandler("success", "Role listing updated successfully");
            setTimeout(()=>{router.push("/hr/dashboard")},1000)
          } else {
            // Handle error here
            console.error("Error updating role listing");
            console.log("Message:", responseData.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    return(
        <div>
            <CustomInput onSubmit={handleSubmit} 
            caption="Update Role Listing"
            initialData={initialData}
            isRoleNameDisabled={true}/>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={closeSnackbarHandler}>
              <MuiAlert severity={snackbarSeverity} elevation={6} variant="filled">
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
        </div>
        
    )
}