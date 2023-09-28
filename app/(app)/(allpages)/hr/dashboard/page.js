"use client";
import RoleListingComponent from "@/components/ui/RoleListingComponent";
import { useEffect, useState } from "react";

export default function hrDashboard() {
  const [rolelistings, setRoleListings] = useState([]);
  const [selectedRoleListing, setSelectedRoleListing] = useState({});

export default function hrDashboard(){
    const [listings, setListings] = useState([])
    const [waiting,setWaiting] = useState(false)
    useEffect(() => {
        const fetchListingData = async () => {
            setWaiting(true);
            const res = await fetch('http://127.0.0.1:5000/rolelisting')
            const data = await res.json()
            setListings(data.data.rolelistings)
            setWaiting(false);
        }
        fetchListingData()
    },[])

    return (
      <div>
        <h1>hr dashboard</h1>

        {waiting?<h1>Fetching roles....</h1>:<DefaultTable listings={listings} />}
      </div>
    );
}