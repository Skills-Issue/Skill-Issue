"use client"
import { Card } from "flowbite-react";


export default function ActiveCard({activeListing}){

    <Card className="m-2 max-w-md" href="#">
      <div className="flex flex-col">
        <div className="flex flex-row mb-3">
          <div className="flex-shrink-0 mr-3">
            <img
              className="w-20 h-20"
              src={"https://via.placeholder.com/200"}
            />
          </div>
          <div className="">
            <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              {activeListing?.Role_Name}
            </h5>
            <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
              {activeListing?.Role_Details}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-start flex-wrap">
          {activeListing?.Skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5  py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Card>;
}