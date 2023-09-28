"use client";

import DefaultCard from "./Card";

export default function RoleListingComponent({ rolelistings }) {
  return (
    <div className="flex-1 max-h-screen overflow-y-auto p-4">
      {rolelistings.map((rolelisting) => (
        <DefaultCard key={rolelisting.Role_Listing_ID} rolelisting={rolelisting}></DefaultCard>
      ))}
    </div>
  );
}
