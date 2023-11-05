'use client';

import { Table } from 'flowbite-react';
import Link from "next/link";
import { useRoleContext } from "../authentication/RoleContext";
import { useEffect, useState } from "react";
import Outline from "./Button";

export default function ApplicantListingTable({ applicant_listings }) {
    console.log(applicant_listings)
    const { selectedRole, setSelectedRole } = useRoleContext();
    const [listing, setListings] = useState([]);
    return (
        <Table>
        <Table.Head>
            <Table.HeadCell>
                Applicant ID
            </Table.HeadCell>
            <Table.HeadCell>
                Application Details
            </Table.HeadCell>
            <Table.HeadCell>
                Submission Date
            </Table.HeadCell>
            <Table.HeadCell>
                <span className="sr-only">Edit</span>
            </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {applicant_listings?.map((app_listing) => (
            <Table.Row
                key={app_listing.applicant_id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link href={`/jobs/${app_listing.role_listing_id}`}>
                    {app_listing.applicant_id}
                </Link>
                </Table.Cell>
                <Table.Cell>{app_listing.application_details}</Table.Cell>
                <Table.Cell>{app_listing.application_date}</Table.Cell>
                <Table.Cell>
              {selectedRole == "Human Resources" && (
                <Link
                  className="font-medium text-cyan-600 dark:text-cyan-500"
                  href={`/jobs/${app_listing.role_listing_id}/${app_listing.applicant_id}/?staff_id=${app_listing.applicant_id}`}
                >
                  <Outline caption={"View"}></Outline>
                </Link>
              )}
            </Table.Cell>
            </Table.Row>
            ))}
        </Table.Body>
        </Table>
    );

}


