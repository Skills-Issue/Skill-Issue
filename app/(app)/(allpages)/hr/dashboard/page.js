"use client";
import RoleListingTable from "@/components/ui/RoleListingTable";
// ignore this for now it's just a button to go to create role listing page
import Outline from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRoleContext } from "@/components/authentication/RoleContext";

export default function hrDashboard() {
  const [listings, setListings] = useState([]);
  const [myListing, setMyListing] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const [waiting, setWaiting] = useState(false);
  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchListingData = async () => {
      setWaiting(true);
      const res = await fetch("http://127.0.0.1:5000/rolelistingsappcount");
      const data = await res.json();
      setListings(data.data.role_listings_app_count);
      setWaiting(false);
    };
    fetchListingData();
  }, []);

  useEffect(() => {
    const getCreatedByMe = () => {
      if (User && User.staff_id) {
        // Filter the listings based on the staff_id of the user
        setMyListing(
          listings.filter((item) => item.role_author_id === User.staff_id)
        );
      }
    };
    getCreatedByMe();
  }, [listings]);

 

  return (
    <div>
      <div className="mx-2">
        <div className="flex flex-row justify-between">
          <div className="text-xl font-semibold my-auto">My listings</div>
          <div className="my-3">
            <Link href="/hr/create" className="flex w-fit">
              <Outline caption={"Create New Role"} />
            </Link>
          </div>
        </div>

        {myListing.length > 0 ? (
          <div>
            <RoleListingTable listings={myListing} />
          </div>
        ) : (
          <div>No listings created</div>
        )}
        <div className="text-xl font-semibold my-4">All listings</div>
        <RoleListingTable listings={listings} />
      </div>
    </div>
  );
}
