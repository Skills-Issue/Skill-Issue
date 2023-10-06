"use client";
import SearchInput from "@/components/ui/SearchInput";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { Tabs } from "flowbite-react";
import DefaultCard from "@/components/ui/Card";
import ActiveCard from "@/components/ui/ActiveCard";
import { list } from "postcss";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);
  const props = { setActiveTab, tabsRef };
  const [listings, setListings] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [activeListing, setActiveListing] = useState(null); // set id to this var
  //console.log(activeTab);
  const searchListings = listings.filter((listing) => {
    return listing.Role_Name.toLowerCase().includes(searchField);
  });

  useEffect(() => {
    const fetchListingData = async () => {
      setWaiting(true);
      const res = await fetch("http://127.0.0.1:5000/rolelistingwithskills");
      const data = await res.json();
      let newList = data.data.rolelistings;
      if (activeTab == 0) {
        // newList = newList.filter()
      } else {
      }
      setListings(newList);
      setWaiting(false);
    };
    fetchListingData();
  }, []);

  return (
    <div className="mt-4">
      <Tabs.Group
        ref={props.tabsRef}
        onActiveTabChange={(tab) => props.setActiveTab(tab)}
      >
        <Tabs.Item active icon={HiUserCircle} title="Best Matches">
          {waiting ? <h1>Fetching...</h1> : null}
          
          <div className="mr-4 h-screen overflow-y-auto">
          <SearchInput setData={setSearchField}></SearchInput>
            {searchListings?.map((listing) => (
              <div key={listing.Role_Listing_ID} className="mb-4">
                <DefaultCard rolelisting={listing} />
              </div>
            ))}
          </div>
          <div>
            <ActiveCard />
          </div>
        </Tabs.Item>

        <Tabs.Item icon={HiClipboardList} title="Most Recent">
          {waiting ? <h1>Fetching...</h1> : null}
          <div className="mr-4">
            {listings?.map((listing) => (
              <div key={listing.Role_Listing_ID} className="mb-4">
                <DefaultCard rolelisting={listing} />
              </div>
            ))}
          </div>
          <div></div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
