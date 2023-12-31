"use client";
import { Card, Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import DoughnutChart from "./DoughnutChart";

export default function ActiveCard({ activeListing, userSkills }) {
  const User = JSON.parse(localStorage.getItem("user"));
  const userSkillNames = userSkills.map((skillObj) => skillObj.skill_name);
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
  const dateObj = new Date(activeListing.expiry_date);

  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const [buttonActive, setButtonActive] = useState(true);
  const [applicantCount, setApplicantCount] = useState(0);

  useEffect(() => {
    // const res = await fetch("http://127.0.0.1:5000/rolelistingwithskills");
    //applicant_id
    setButtonActive(true);
    fetch(`http://127.0.0.1:5000/jobs/${activeListing.role_listing_id}`)
      .then((res) => res.json())
      .then((d) => {
        
        if (d.code == 200) {
          const applicantList = d.data;
          for (var applicant of applicantList) {
            if (applicant.applicant_id == User.staff_id) {
              setButtonActive(false);
            }
          }
        } 
      });

    fetch(
      `http://127.0.0.1:5000/rolelistingapplicantscount/${activeListing.role_listing_id}`
    )
      .then((res) => res.json())
      .then((countData) => setApplicantCount(countData.count));
  }, [activeListing]);
  return (
    <Card
      className="m-2 max-w-full"
      // href={`dashboard/application/${activeListing?.role_listing_id}`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="flex flex-col">
            <div className="flex flex-row mb-3">
              <div className="">
                <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                  Role Name: {activeListing?.role_name}
                </h5>
                <h5 className=" text-xs text-gray-700">
                  Expiry Date: {formattedDate}
                </h5>
                <h5 className="mt-4 text-base font-semibold tracking-tight mb-2  text-green-600 dark:text-white">
                  {applicantCount} applicant(s)
                </h5>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="text-base font-semibold tracking-tight mb-2 text-gray-900 dark:text-white">
                Project Overview:
              </h5>
              <p className="text-sm  text-gray-700 dark:text-gray-400 line-clamp-4">
                {activeListing?.role_details}
              </p>
            </div>
            <div className="flex flex-row"></div>
          </div>
        </div>
        <div className="col-span-1 mx-auto">
          <div className="mb-3">
            <h5 className="text-base font-semibold tracking-tight mb-5 text-gray-900 dark:text-white">
              <p
                className={percentage > 70 ? "text-green-500" : "text-red-500"}
              >
                Match percentage: {percentage}%
              </p>
            </h5>
            <div
              className="w-28 h-28"
              style={{ width: "150px", height: "150px" }}
            >
              <DoughnutChart
                userSkills={userSkillNames}
                jobSkills={activeListing.skills}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
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
        <div>
          <a
            href={`dashboard/application/${activeListing?.role_listing_id}`}
            style={buttonActive ? {} : { pointerEvents: "none" }}
            className={
              buttonActive
                ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                : "text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }
          >
            {buttonActive ? "Apply Now" : "Applied!"}
          </a>
        </div>
      </div>
    </Card>
  );
}
