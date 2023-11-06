"use client";

import { useState, useEffect, useRef } from "react";
import ApplicantDetails from "@/components/ui/ApplicantDetails";
import { useSearchParams } from "next/navigation";

export default function applicant_details( params ) {
    const role_id = params.params.id
    const searchParams = useSearchParams()
 
    const staff_id = searchParams.get('staff_id')
  const [activeTab, setActiveTab] = useState(0);
  const [listings, setListings] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [activeListing, setActiveListing] = useState({skills:[]}); // set id to this var
  const [userdata, setUserData] = useState([]);
  const [staffdata, setStaffData] = useState([]);

  useEffect(() => {
    const fetchListingData = async () => {
      setWaiting(true);
      const res = await fetch(`http://127.0.0.1:5000/rolelistingwithskills/${role_id}`);
      const data = await res.json();
      let newList = data.data.role_listings_with_skills;
      if (activeTab == 0) {
        // newList = newList.filter()
      } else {
      }
      setListings(newList);
      setActiveListing(newList[0]);
      setWaiting(false);
    };
    fetch(`http://127.0.0.1:5000/staffskill/${staff_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 404) {
          setUserData([]); // Set to an empty array instead of null

        } else {
          setUserData(data.data.staff_skills);
        }
      })
      .catch((err) => console.log(err));
    fetchListingData();
  }, []);

   // Fetch staff skills and set to staffdata state variable 
   useEffect(() => {
    const fetchstaffData = async () => {
      setWaiting(true);
      const res = await fetch(`http://127.0.0.1:5000/staff/${staff_id}`);
      const data = await res.json();
    let newList = data.data;
    setStaffData(newList);
    };
    fetchstaffData();
  }, []);
  
  
  return (
    <div>

      <div className="flex flex-row">
        <div className="flex-grow-1  w-full">
          <ApplicantDetails
            activeListing={activeListing}
            userSkills={userdata}
            staffDetails={staffdata}
          />
        </div>
      </div>
    </div>
  );
}
