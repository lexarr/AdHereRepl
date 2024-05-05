import { useEffect, useState } from "react";
import ViolatingSiteTableRow from "./ViolatingSiteTableRow";
import CustomURLTableRow from "./CustomURLTableRow";

export default function ViolatingSitesTable() {
  const FILTER_SITES = false;
  const [loading, setLoading] = useState(false);
  const [violatingSites, setViolatingSites] = useState<string[]>([]);

  const numSitesToShow = 9;

  // Get list of violating sites
  const getNewSites = async () => {
    setLoading(true);
    try {
      const response: Response = await fetch(
        // See README on instructions for setting up API Key
        `https://adexperiencereport.googleapis.com/v1/violatingSites?key=${process.env.REACT_APP_AD_EXPERIENCE_API_KEY}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Find first numSitesToShow sites that still exist
      let filteredSites: string[] = [];
      let violatingSitesIndex = 0;
      while (
        filteredSites.length < numSitesToShow &&
        violatingSitesIndex < data.violatingSites.length
      ) {
        const site = data.violatingSites[violatingSitesIndex++].reviewedSite;

        if (FILTER_SITES) {
          // Calls Flask server endpoint which returns true or false depending on whether or not the site exists
          await fetch(
            `http://localhost:5000/url-check?url=${encodeURIComponent(site)}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (
                data.does_url_exist &&
                filteredSites.length !== numSitesToShow
              ) {
                filteredSites.push(site);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
        else {
          // If we're not filtering sites, just add them to the list
          filteredSites.push(site);
        }
      }

      // Update state with the new sites
      setViolatingSites(filteredSites);
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
    <div className="flex flex-col justify-center items-start w-full sm:w-8/12 lg:w-1/2 sm:px-10 lg:px-20 py-5 md:mt-0">
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
        <div className="w-full">
          <CustomURLTableRow />
          {// Map over sites and display them
            violatingSites.map((site, index) => (
              <ViolatingSiteTableRow key={index} url={site} />
            ))}

        </div>
      )}
    </div>
  );
}
