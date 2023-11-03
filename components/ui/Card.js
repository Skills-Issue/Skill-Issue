import { Card } from "flowbite-react";

export default function DefaultCard({ keyProp, rolelisting }) {
  const dateObj = new Date(rolelisting.expiry_date);

  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const skills = rolelisting?.skills;

  return (
    <Card className="mx-1 mt-2" href="#">
      <div className="flex flex-col">
        <div className="flex flex-row mb-3">
          <div className="mb-3">
            <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              {rolelisting?.role_name}
            </h5>
            <h5 className="text-xs text-gray-700">
              Expiry Date: {formattedDate}
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 mt-2">
              {rolelisting?.role_details}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-start flex-wrap">
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              +{skills.length - 4} more
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
