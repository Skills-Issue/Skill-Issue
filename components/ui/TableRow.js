"use client";

import { Table } from "flowbite-react";
import Link from "next/link";
import DefaultModal from "./DetailModal";

export default function DefaultTable({jobListings}) {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Job Title</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Deadline</Table.HeadCell>
        <Table.HeadCell>Edit</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {jobListings?.map((job) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {job.title}
            </Table.Cell>
            <Table.Cell>
              <DefaultModal details={job.description}/>
            </Table.Cell>
            <Table.Cell>{job.expiry}</Table.Cell>
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
