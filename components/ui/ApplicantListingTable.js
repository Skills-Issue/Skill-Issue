'use client';

import { Table } from 'flowbite-react';
import Link from "next/link";

export default function ApplicantListingTable({ applicant_listings }) {
    // console.log(applicant_listings)
    return (
        <Table>
        <Table.Head>
            <Table.HeadCell>
                Applicant ID
            </Table.HeadCell>
            <Table.HeadCell>
                Applicant Details
            </Table.HeadCell>
            <Table.HeadCell>
                Submission Date
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
                    {app_listing.application_id}
                </Link>
                </Table.Cell>
                <Table.Cell>{app_listing.application_details}</Table.Cell>
                <Table.Cell>{app_listing.application_date}</Table.Cell>
            </Table.Row>
            ))}
            
        </Table.Body>
        </Table>
    );

}


