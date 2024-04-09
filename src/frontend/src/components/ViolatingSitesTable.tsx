import { useState } from "react";
import ViolatingSiteData from "../data/violating-sites.json";

export default function ViolatingSitesTable() {
  const [numSitesToShow, setNumSitesToShow] = useState(10);
  const [violatingSites, setViolatingSites] = useState(
    ViolatingSiteData.violatingSites.filter(
      (element, index) => index < numSitesToShow
    )
  );

  // Currently failing to fetch data
  const getNewSites = async () => {
    try {
      const response = await fetch(
        "https://adexperiencereport.googleapis.com/v1/violatingSites?key=[API_KEY]",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Update state with the new sites
      setViolatingSites(
        data.violatingSites.filter(
          (element: object, index: number) => index < numSitesToShow
        )
      );
    } catch (error) {
      console.error("Error fetching new sites:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start w-full sm:w-8/12 lg:w-1/2 border-solid border bg-slate-300 border-slate-300 dark:border-slate-700">
      {/* Row for getting new sites */}
      <div className="flex flex-row justify-center items-center w-full bg-slate-100 dark:bg-slate-800 p-2 border-b border-slate-300 dark:border-slate-700">
        <button
          className="bg-purple-600 hover:bg-purple-600 bg-opacity-20 text-purple-500 hover:text-white p-2 rounded-md"
          onClick={getNewSites}
        >
          Get New Sites
        </button>
      </div>

      {/* Map over sites and display them */}
      {violatingSites.map((site, index) => (
        // Row
        <div
          key={index}
          className={`flex flex-row justify-between items-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600 p-2 ${
            // Avoid double bottom border
            index !== violatingSites.length - 1
              ? "border-b border-slate-300 dark:border-slate-700"
              : ""
          }`}
        >
          {/* Site url */}
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
