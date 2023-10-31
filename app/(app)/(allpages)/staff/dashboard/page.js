"use client";
import SearchInput from "@/components/ui/SearchInput";
import { useState, useEffect, useRef } from "react";
import DefaultCard from "@/components/ui/Card";
import ActiveCard from "@/components/ui/ActiveCard";
import Filter from "@/components/ui/Filter/FilterButton";
import DismissableModal from "@/components/ui/Filter/Modal";
import SortButton from "@/components/ui/SortButton";
import { sortSkills } from "@/lib/utils";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState(0);
  const [listings, setListings] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [selected, setSelected] = useState(false);
  const [activeListing, setActiveListing] = useState({ skills: [] }); // set id to this var
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userdata, setUserData] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [skillItems, setSkillItems] = useState(null);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [displayListings, setDisplayListings] = useState([]); // This is the list that is displayed on the page

  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchListingData = async () => {
      const res = await fetch("http://127.0.0.1:5000/rolelistingwithskills");
      const data = await res.json();
      let newList = data.data.role_listings_with_skills;
      setListings(newList);
      setDisplayListings(newList);
      setActiveListing(newList[0]);
    };
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

  useEffect(() => {
    const fetchSkillData = async () => {
      const res = await fetch("http://127.0.0.1:5000/skills");
      const data = await res.json();
      let skillList = data.data.staffs;
      setSkillItems(skillList);
    };
    fetchSkillData();
  }, []);

  useEffect(() => {
    filterSortSearch();
  }, [chosenSkills, ascending, searchField]);

  //###########################################################################
  // HERE ARE THE FUNCTIONS
  //###########################################################################

  function handleSelect(roleId) {
    let selectedListing = listings.find(
      (listing) => listing.role_listing_id === roleId
    );
    //console.log(selectedListing);
    setActiveListing(selectedListing);
    setSelected(true);
    //console.log(selected);
  }

  function filterSortSearch() {
    let temp = listings;
    //filtering
    if (chosenSkills.length != 0) {
      temp = temp.filter((listing) =>
        chosenSkills.every((skill) => listing.skills.includes(skill))
      );
    }
    //searching
    temp = temp.filter((listing) => {
      return listing.role_name.toLowerCase().includes(searchField);
    });
    //sorting
    temp = sortSkills(temp, userdata, ascending);
    setDisplayListings(temp);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function updateSkills(testData) {
    setChosenSkills(testData);
  }

  function sortListing() {
    setAscending(!ascending);
  }

  return (
    <div>
      <div className="flex-row bg-white rounded-t-md flex justify-between items-center m-2 border-b-[1px] sticky top-0">
        <div className="w-1/4 text-xl m-2 font-bold">Role Listings</div>
        <div className="w-1/2 flex justify-center">
          <SearchInput setData={setSearchField} />
        </div>
        <div className="w-1/4 flex justify-end my-auto">
          <SortButton
            myPropFunction={sortListing}
            sortingDirection={ascending}
          ></SortButton>
          <Filter openModal={openModal}></Filter>
          {isModalOpen && (
            <DismissableModal
              show={isModalOpen}
              onClose={closeModal}
              defaultSkills={skillItems}
              updateSkillsFunction={updateSkills}
              chosenSkills={chosenSkills}
            />
          )}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex-col w-2/5 pr-3  h-screen overflow-y-auto ">
          {displayListings.length == 0 ? (
            <div className="flex flex-row justify-center">
              <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sorry, no results found.
              </p>
            </div>
          ) : null}
          {displayListings?.map((listing) => (
            <div
              key={listing.role_listing_id}
              className="mb-1 flex flex-row justify-center"
              onClick={() => handleSelect(listing.role_listing_id)}
            >
              <DefaultCard rolelisting={listing} />
            </div>
          ))}
        </div>
        <div className="flex w-3/5 ">
          <ActiveCard activeListing={activeListing} userSkills={userdata} />
        </div>
      </div>
    </div>
  );
}
