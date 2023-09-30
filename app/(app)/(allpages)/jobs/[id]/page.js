"use client"
import { useEffect, useState } from "react";
import ApplicantListingTable from "@/components/ui/ApplicantListingTable";



export default function applicantListing( params) {
  const RoleListingID = params.params.id
  const [applicant_listings, setApplicant_listings] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchListingData = async () => {
        setLoading(true);
      const res = await fetch(`http://127.0.0.1:5000/jobs/${RoleListingID}`);
      const data = await res.json();
        setApplicant_listings(data.data);
        setLoading(false);
    }
    fetchListingData();
    }
    , []);

    return (
        <div>
            {loading && applicant_listings && applicant_listings.length === 0 ? (
            <h1>Loading Applicants....</h1>
            ) : (
            <div>
                <h1>Applicant Listing</h1>
                <ApplicantListingTable applicant_listings={applicant_listings} />
            </div>
            )}
        </div>
        );
}