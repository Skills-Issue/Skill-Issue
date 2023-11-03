"use client";
import { Card, Progress } from "flowbite-react";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import DoughnutChart from "./DoughnutChart";

export default function ApplicantDetails({
  activeListing,
  userSkills,
  staffDetails,
}) {
  // console.log(activeListing)
  // console.log(userSkills)
  // console.log(staffDetails)
  const userSkillNames = userSkills.map((skillObj) => skillObj.skill_name);
  // console.log(userSkillNames)
  const matchingSkills = activeListing.skills.filter((skill) =>
    userSkillNames.includes(skill)
  );
  const nonMatchingSkills = activeListing.skills.filter(
    (skill) => !userSkillNames.includes(skill)
  );
  const percentage = Math.round(
    (matchingSkills.length /
      (matchingSkills.length + nonMatchingSkills.length)) *
      100
  );
  return (
    <Card className="max-w-full m-8 p-6"> 
      <div>
        <h1 className="text-xl font-bold">Applicant Details</h1>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2">
        <div className="col-span-2">
          <div className="mb-3">
            <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
              Staff Name: 
                {" "+staffDetails.staff_fname} {staffDetails.staff_lname}
            </h5>
            <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
              Role Name: {activeListing.role_name}
            </p>
            <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
              Staff ID: {staffDetails?.staff_id}
            </p>
          </div>
          <div className="mb-3">
            <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
              Email:
            </h5>
            <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
              {staffDetails?.email}
            </p>
          </div>
          <div className="mb-3">
            <h5 className="text-base font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">
              Department:
            </h5>
            <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
              {staffDetails?.dept}
            </p>
          </div>
          <div className="mb-3">
          <h5 className="text-base font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">
            Country:
          </h5>
          <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
            {staffDetails?.country}
          </p>
        </div>
        </div>
        <div className="col-span-1 mx-auto">
            <div className="mb-3">
            <h5 className="text-base font-semibold tracking-tight mb-5 text-gray-900 dark:text-white">
            <p className={percentage>70?"text-green-500":"text-red-500"}>
              Match percentage:{" "}
              {percentage}%
            </p>
            </h5>
            <div className="w-28 h-28" style={{width:'150px', height:'150px'}}>
              <DoughnutChart
                userSkills={userSkillNames}
                jobSkills={activeListing.skills}
              />
            </div>
            
          </div>
            </div>
      </div>
      <div>
      <div className="mb-3">
              <h5 className="text-base font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">
                Matching Skills:
              </h5>
              <div className="flex flex-row justify-start flex-wrap">
                {matchingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5  py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <h5 className="text-base font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">
                Missing Skills:
              </h5>
              <div className="flex flex-row justify-start flex-wrap">
                {nonMatchingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5  py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
      </div>
      
    </Card>
  );
}
