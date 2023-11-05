"use client";

import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import Link from "next/link";
import { useRoleContext } from "../authentication/RoleContext";
import Outline from "./Button";

export default function RoleListingTable({listings}) {
  

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Job Title</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Deadline</Table.HeadCell>
        
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
              <a
                className="text-cyan-600 hover:underline dark:text-cyan-500"
                href={`/jobs/${listing.role_listing_id}`}
              >
                <p className="text-center">{listing.app_count}
                </p>
              </a>
            </Table.Cell>
            <Table.Cell>
              
                <Link
                  className="font-medium text-cyan-600 dark:text-cyan-500"
                  href={`/jobs/edit/${listing.role_listing_id}`}
                >
                  <Outline caption={"Edit"}></Outline>
                </Link>
              
              
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
