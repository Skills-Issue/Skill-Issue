"use client";
import { useEffect, useState } from "react";
import RoleListingTable from "@/components/ui/RoleListingTable";

export default function hrDashboard() {
  const [listings, setListings] = useState([]);
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    const fetchListingData = async () => {
      setWaiting(true);
      const res = await fetch("http://127.0.0.1:5000/rolelistings");
      const data = await res.json();
      setListings(data.data.rolelistings);
      setWaiting(false);
    };
    fetchListingData();
  }, []);

  return (
    <div>
      {waiting ? (
        <h1>Fetching roles....</h1>
      ) : (
        <RoleListingTable listings={listings} />
      )}
    </div>
  );
}
