"use client";
import RoleListingComponent from "@/components/ui/RoleListingComponent";
import { useEffect, useState } from "react";
import DefaultTable from "@/components/ui/TableRow";

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
      <h1>hr dashboard</h1>

      {waiting ? (
        <h1>Fetching roles....</h1>
      ) : (
        <DefaultTable listings={listings} />
      )}
    </div>
  );
}
