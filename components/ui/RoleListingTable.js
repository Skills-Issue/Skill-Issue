"use client";

import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import Link from "next/link";
import { useRoleContext } from "../authentication/RoleContext";
import Outline from "./Button";

export default function RoleListingTable({}) {
  const [listings, setListings] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const [waiting, setWaiting] = useState(false);
  const { selectedRole, setSelectedRole } = useRoleContext();

  useEffect(() => {
    const fetchListingData = async () => {
      setWaiting(true);
      const res = await fetch("http://127.0.0.1:5000/rolelistings");
      const data = await res.json();
      // res.json().data.role_listings
      setListings(data.data.role_listings);
      setWaiting(false);
    };
    fetchListingData();
  }, []);

  useEffect(() => {
    // Fetch applicant counts when listings change
    const fetchApplicantCounts = async () => {
      const counts = {};
      for (const listing of listings) {
        const count = await GetApplicantCount(listing.role_listing_id);
        counts[listing.role_listing_id] = count;
      }
      // console.log(counts)
      setApplicantCounts(counts);
    };
    fetchApplicantCounts();
  }, [listings]);

  async function GetApplicantCount(role_listing_id) {
    const res = await fetch(`http://127.0.0.1:5000/countrolelistings/${role_listing_id}`);
    const data = await res.json();
    return data.data;
  }

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Job Title</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Deadline</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>No. of Applications</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {listings?.map((listing) => (
          <Table.Row
            key={listing.role_listing_id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Link href={`/jobs/${listing.role_listing_id}`}>
                {listing.role_name}
              </Link>
            </Table.Cell>
            <Table.Cell>{listing.role_details}</Table.Cell>
            <Table.Cell>{listing.expiry_date}</Table.Cell>
            <Table.Cell>
              <p className="text-center">Active</p>
            </Table.Cell>
            <Table.Cell>
              <a
                className="text-cyan-600 hover:underline dark:text-cyan-500"
                href={`/jobs/${listing.role_listing_id}`}
              >
                <p class="text-center">{applicantCounts[listing.role_listing_id]}
                </p>
              </a>
            </Table.Cell>
            <Table.Cell>
              {selectedRole == "Human Resources" && (
                <Link
                  className="font-medium text-cyan-600 dark:text-cyan-500"
                  href={`/jobs/edit/${listing.role_listing_id}`}
                >
                  <Outline caption={"Edit"}></Outline>
                </Link>
              )}
              {selectedRole == "Staff" && (
                <Link
                  className="font-medium text-cyan-600 dark:text-cyan-500"
                  href="/jobs/"
                >
                  <Outline caption={"Apply"}></Outline>
                </Link>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
