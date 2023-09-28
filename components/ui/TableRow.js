"use client";

import { Table } from "flowbite-react";
import DefaultCard from "./Card";

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
          <DefaultCard rolelisting={listing}></DefaultCard>
        ))}
      </Table.Body>
    </Table>
  );
}
