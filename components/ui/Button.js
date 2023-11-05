"use client";

import React from "react";
import { Button } from "flowbite-react";
import Link from "next/link";
import AddIcon from "../../public/addIcon.png";

export default function Outline({ caption }) {
  return (
    <button className="bg-gray-900 text-white text-sm font-medium focus:outline-none rounded-lg px-4 py-2.5 m-2">
      {caption}
    </button>
  );
}
