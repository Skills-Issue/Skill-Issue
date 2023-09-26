"use client";

import { Table } from "flowbite-react";

export default function DefaultTable({listings}) {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Job Title</Table.HeadCell>
        {/* department */}
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Deadline</Table.HeadCell>
        <Table.HeadCell>Extra</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {listings.map((listing) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{listing.Role_Name}</Table.Cell>
            <Table.Cell>{listing.Role_Details}</Table.Cell>
            <Table.Cell>{listing.Expiry_Date}</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"href="/jobs/edit">
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
