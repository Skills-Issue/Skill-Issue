"use client";
import { Card, Progress } from "flowbite-react";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import DoughnutChart from "./DoughnutChart";

export default function ActiveCard({ activeListing, userSkills }) {

  const userSkillNames = userSkills.map((skillObj) => skillObj.skill_name);
  const matchingSkills = activeListing.skills.filter((skill) =>
    userSkillNames.includes(skill)
  );
  const nonMatchingSkills = activeListing.skills.filter(
    (skill) => !userSkillNames.includes(skill)
  );

  return (
    <Card className="m-2  max-w-lg" href="#">
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
              Role Name: {activeListing?.role_name}
            </h5>
            <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
              {activeListing?.role_details}
            </p>
          </div>
        </div>
        <div className="mb-3">
          <h5 className="text-base font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
            Project Overview:
          </h5>
          <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-3">
            Project overview stuff (to be added)
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="mb-3">
              <h5 className="text-base font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
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
              <h5 className="text-base font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
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

          <div className="mb-3">
              <h5 className="text-base font-bold tracking-tight mb-5 text-gray-900 dark:text-white">
                Missing Skills:
              </h5>
              <div><DoughnutChart userSkills={userSkillNames} jobSkills={activeListing.skills}/></div>
            </div>
        </div>
      </div>
    </Card>
  );
}
