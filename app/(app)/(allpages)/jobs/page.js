"use client";
import DefaultTable from "@/components/ui/RoleListingTable";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { Tabs } from "flowbite-react";
import DefaultCard from "@/components/ui/Card";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);
  const props = { setActiveTab, tabsRef };
  const [listings, setListings] = useState([]);
  const [waiting, setWaiting] = useState(false);
  console.log(activeTab);
  useEffect(() => {
    const fetchListingData = async () => {
      setWaiting(true);
      const res = await fetch("http://127.0.0.1:5000/rolelistings");
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
          <div className="mr-4 ">
            {listings?.map((listing) => (
              <div className="mb-4">
                <DefaultCard />
              </div>
            ))}
          </div>
          <div></div>
        </Tabs.Item>

        <Tabs.Item icon={HiClipboardList} title="Most Recent">
          <div className="mr-4">
            {listings?.map((listing) => (
              <div className="mb-4">
                <DefaultCard />
              </div>
            ))}
          </div>
          <div></div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
