import { useState } from "react";
import ViolatingSiteData from "../data/violating-sites.json";

export default function ViolatingSitesTable() {
  const [numSitesToShow, setNumSitesToShow] = useState(10);
  const violatingSites = ViolatingSiteData.violatingSites.filter(
    (element, index) => index < numSitesToShow
  );

  return (
    <div className="flex flex-col justify-center items-start w-full sm:w-8/12 lg:w-1/2 border-solid border bg-slate-300 border-slate-300 dark:border-slate-700">
      {violatingSites.map((site, index) => (
        <div
          key={index}
          className={`flex flex-row justify-between items-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600 p-2 ${
            // Avoid double bottom border
            index !== violatingSites.length - 1
              ? "border-b border-slate-300 dark:border-slate-700"
              : ""
          }`}
        >
          <p className="text-xl text-gray-400 dark:text-gray-500">
            {site["reviewedSite"]}
          </p>
          <button className="bg-green-600 hover:bg-green-600 bg-opacity-20 text-green-500 hover:text-white p-2 rounded-md">
            Run AdHere
          </button>
        </div>
      ))}
    </div>
  );
}
