"use client";
import RoleListingComponent from "@/components/ui/RoleListingComponent";
import { useEffect, useState } from "react";

export default function hrDashboard() {
  const [rolelistings, setRoleListings] = useState([]);
  const [selectedRoleListing, setSelectedRoleListing] = useState({});

  useEffect(() => {
    const fetchRoleListingData = async () => {
      const res = await fetch("http://127.0.0.1:5000/rolelistingwithskills");
      const data = await res.json();
      setRoleListings(data.data.rolelistings);
      setSelectedRoleListing(data.data.rolelistings[0]);
    };
    fetchRoleListingData();
  }, []);

  return (
    <div>
      <p>hr dashboard</p>
      <h1></h1>
      <div className="flex flex-row">
        <div className="basis-3/8"><RoleListingComponent rolelistings={rolelistings}></RoleListingComponent></div>
        <div className="border flex-1 border-sky-500 basis-5/8"><h1 className="font-bold text-3xl">{selectedRoleListing.Role_Name}</h1></div>
      </div>
    </div>
  );
}