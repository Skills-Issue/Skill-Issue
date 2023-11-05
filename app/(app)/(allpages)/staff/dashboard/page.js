"use client";
import SearchInput from "@/components/ui/SearchInput";
import { useState, useEffect, useRef } from "react";
import DefaultCard from "@/components/ui/Card";
import ActiveCard from "@/components/ui/ActiveCard";
import Filter from "@/components/ui/Filter/FilterButton";
import DismissableModal from "@/components/ui/Filter/Modal";
import { sortSkills } from "@/lib/utils";

export default function Jobs() {
  const User = JSON.parse(localStorage.getItem("user"));
  const [listings, setListings] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [activeListing, setActiveListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userdata, setUserData] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [skillItems, setSkillItems] = useState(null);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [displayListings, setDisplayListings] = useState([]); // This is the list that is displayed on the page

  //USEEFFECTS
  useEffect(() => {
    Promise.all([fetchSkillData(), fetchListingData(), fetchUserData()]).then(
      ([result1, result2, result3]) => {
        setListings(result2.data.role_listings_with_skills);
        setSkillItems(result1.data.staffs);
        setUserData(result3.data.staff_skills);
        const temp = sortSkills(
          result2.data.role_listings_with_skills,
          result3.data.staff_skills,
          ascending
        );
        setDisplayListings(temp);
        setActiveListing(temp[0]);
      }
    );
  }, []);

  useEffect(() => {
    filterSortSearch();
  }, [chosenSkills, ascending, searchField]);

  //FUNCTIONS
  const fetchListingData = async () => {
    const res = await fetch("http://127.0.0.1:5000/rolelistingwithskills");
    const data = await res.json();
    console.log(data)
    return data;
  };

  const fetchSkillData = async () => {
    const res = await fetch("http://127.0.0.1:5000/skills");
    const data = await res.json();
    return data;
  };

  const fetchUserData = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/staffskill/${User.staff_id}`
    );
    const data = await res.json();
    return data;
  };

  function handleSelect(roleId) {
    let selectedListing = listings.find(
      (listing) => listing.role_listing_id === roleId
    );
    setActiveListing(selectedListing);
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
    if (temp.length != 0) {
      setActiveListing(temp[0]);
    } else if (listings.length != 0) {
      setActiveListing(listings[0]);
    }
  }

  function updateSkills({ skillsData, ascending }) {
    setAscending(ascending);
    setChosenSkills(skillsData);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="flex-row bg-white rounded-t-md flex justify-between items-center m-2 border-b-[1px] sticky top-0">
        <div className="w-1/4 text-xl m-2 font-bold">
          <h1>Role Listings</h1>
          </div>
        <div className="w-1/2 flex justify-center">
          <SearchInput setData={setSearchField} />
        </div>
        <div className="w-1/4 flex justify-end my-auto">
          <Filter openModal={openModal}></Filter>
          {isModalOpen && (
            <DismissableModal
              show={isModalOpen}
              onClose={closeModal}
              defaultSkills={skillItems}
              updateSkillsFunction={updateSkills}
              chosenSkills={chosenSkills}
              ascending={ascending}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-6 mx-6">
        <div className="col-span-2  h-screen overflow-y-auto ">
          {displayListings.length == 0 ? (
            <div className="flex flex-row item-center justify-center">
              <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sorry, No Results Found
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
        <div className="col-span-4">
          {activeListing ? (
            <ActiveCard activeListing={activeListing} userSkills={userdata} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
