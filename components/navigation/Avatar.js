"use client";

import { Avatar } from "flowbite-react";

export default function DefaultAvatar() {
  return (
    <div className="hidden md:block">
    <div className="flex flex-wrap gap-2">
        
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user-circle-2"
      >
        <path d="M18 20a6 6 0 0 0-12 0" />
        <circle cx="12" cy="10" r="4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div></div>
  );
}
