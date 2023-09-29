"use client";

import { Table } from "flowbite-react";
import Link from "next/link";

export default function RoleListingTable({ listings }) {
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
            key={listing.Role_Listing_ID}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Link href={`/jobs/${listing.Role_Listing_ID}`}>
                {listing.Role_Name}
              </Link>
            </Table.Cell>
            <Table.Cell>{listing.Role_Details}</Table.Cell>
            <Table.Cell>{listing.Expiry_Date}</Table.Cell>
            <Table.Cell><p className="text-center">Active</p></Table.Cell>
            <Table.Cell><p className="text-center">14</p></Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/jobs/edit"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
