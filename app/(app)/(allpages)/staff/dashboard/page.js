"use client";
import SearchInput from "@/components/ui/SearchInput";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { Tabs } from "flowbite-react";
import DefaultCard from "@/components/ui/Card";
import ActiveCard from "@/components/ui/ActiveCard";
import Outline from "@/components/ui/Button";
import { list } from "postcss";
import Filter from "@/components/ui/Filter/FilterButton";
import DismissableModal from "@/components/ui/Filter/Modal";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);
  const props = { setActiveTab, tabsRef };
  const [listings, setListings] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [activeListing, setActiveListing] = useState({skills:[]}); // set id to this var
  const [selected,setSelected] = useState(false);
  //console.log(activeTab);
  const searchListings = listings.filter((listing) => {
    return listing.role_name.toLowerCase().includes(searchField);
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userdata, setUserData] = useState([]);

  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchListingData = async () => {
      setWaiting(true);
      const res = await fetch("http://127.0.0.1:5000/rolelistingwithskills");
      const data = await res.json();
      let newList = data.data.role_listings_with_skills;
      if (activeTab == 0) {
        // newList = newList.filter()
      } else {
      }
      setListings(newList);
      setActiveListing(newList[0]);
      // console.log(newList[0]);
      setWaiting(false);
    };
    // console.log(User);
    fetch(`http://127.0.0.1:5000/staffskill/${User.staff_id}`)
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
// console.log(userdata); 
  function handleSelect(roleId) {
    let selectedListing = listings.find(
      (listing) => listing.role_listing_id === roleId
    );
    console.log(selectedListing);
    setActiveListing(selectedListing);
    setSelected(true);
    console.log(selected)
  };
  function openModal(){
    setIsModalOpen(true);
  }
  function closeModal(){
    setIsModalOpen(false);
  }

  


  return (
    <div>
      <div className="flex-row bg-white rounded-t-md flex justify-between items-center m-2 border-b-[1px] sticky top-0">
        <div className="text-xl m-2 font-bold">Role Listings</div>
        <div className="w-1/2 ">
          <SearchInput setData={setSearchField} />
        </div>
        <div className="my-auto">
          <Filter openModal={openModal}></Filter>
          {isModalOpen && (
            <DismissableModal show={isModalOpen} onClose={closeModal} />
          )}
        </div>
      </div>

      <div className="flex flex-row">
        <div className="mr-4 h-screen overflow-y-auto flex-grow-1">
          {waiting ? <h1>Fetching...</h1> : null}

          {searchListings?.map((listing) => (
            <div
              key={listing.role_listing_id}
              className="mb-4"
              onClick={() => handleSelect(listing.role_listing_id)}
            >

              <DefaultCard rolelisting={listing} />
              
            </div>
          ))}
        </div>
        <div className="flex-grow-1">
          <ActiveCard
            activeListing={activeListing}
            userSkills={userdata}
          />
        </div>
      </div>
    </div>
  );
}
