"use client";

import { Card } from "flowbite-react";

export default function DefaultCard({title, description,source=""}) {
  return (
    <Card className="max-w-sm h-[400px]">
      <div className="h-[160px]">
      <img src={source} className="object-cover w-full h-full" ></img>
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <div>{title}</div>
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        <div>
          {description}
        </div>
      </div>
    </Card>
  );
}
