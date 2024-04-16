import { useEffect, useState } from "react";
import ViolatingSiteTableRow from "./ViolatingSiteTableRow";

export default function ViolatingSitesTable() {
  const numSitesToShow = 10;
  const [loading, setLoading] = useState(false);
  const [violatingSites, setViolatingSites] = useState([]);

  // Get list of violating sites
  const getNewSites = async () => {
    setLoading(true);
    try {
      const response: Response = await fetch(
        `https://adexperiencereport.googleapis.com/v1/violatingSites?key=${process.env.REACT_APP_AD_EXPERIENCE_API_KEY}`,
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
    } finally {
      setLoading(false);
    }
  };

  // Display sites from api on first load
  useEffect(() => {
    getNewSites();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start w-full sm:w-8/12 lg:w-1/2 sm:px-10 lg:px-20 mt-28 md:mt-0">
      {/* Row plus button for getting new sites */}
      <div className="flex flex-row justify-start items-center w-full pb-2 border-b border-slate-300 dark:border-slate-700">
        <button
          className="bg-purple-600 hover:bg-purple-600 bg-opacity-20 text-purple-500 hover:text-white p-2 rounded-md"
          onClick={getNewSites}
        >
          Get New Sites
        </button>
      </div>

      {/* Display loading spinner when waiting for sites from API */}
      {loading ? (
        <div className="flex flex-row justify-center items-center w-full bg-slate-100 dark:bg-slate-800 p-2 border-b border-x border-slate-300 dark:border-slate-700">
          <img src="./circle_spin.svg" alt="loading spinner" />
        </div>
      ) : (
        // Map over sites and display them
        violatingSites.map((site, index) => (
          <ViolatingSiteTableRow index={index} url={site["reviewedSite"]} />
        ))
      )}
    </div>
  );
}
