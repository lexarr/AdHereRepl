import { useEffect, useState } from "react";
import ViolatingSites from "../data/violating-sites.json";
import ViolatingSiteTableRow from "./ViolatingSiteTableRow";

export default function ViolatingSitesTable() {
  const numSitesToShow = 10;
  const [loading, setLoading] = useState(false);
  const [violatingSites, setViolatingSites] = useState(
    ViolatingSites.violatingSites.filter(
      (element: object, index: number) => index < numSitesToShow
    )
  );

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

// TODO: Needs to be moved to ViolatingSitesTableRow
  const getViolations = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, site: string, index: number) => {
    try {
      console.log("Time to find violations");

      // TODO: Replace with spinner
      (document.querySelector("#div" + index)?.querySelector("button") as HTMLInputElement).disabled = true;

      const findResponse = await fetch(
        `http://localhost:5000/find-violations?url=${encodeURIComponent(site)}`,
        {
          method: "GET",
        }
      );
      if (!findResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const findData = await findResponse.json();
      console.log("DATA RESP: ", findData);

      // TODO: Move functionality to FixSuggestion.tsx
      try {
        const getResponse = await fetch(
          `http://localhost:5000/get-violations`,
          {
            method: "GET",
          }
        );
        if (!getResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        else {
          setshowViolations(true); // Newly added
        }
  
        // TODO: Change this to response.text
        const getData = await getResponse.json();
        console.log("DATA RESP: ", getData);

        // TODO: Remove - Start
        const violatingDisplay = document.createElement("div");

        const parsed = Object.values(getData.violations);

        parsed.forEach((line: any, index) => {
          if (index < 7) {
            const lineElem = document.createElement("p");
            lineElem.innerText = line;
            violatingDisplay.appendChild(lineElem);
          }
        });

        (document.querySelector("#div" + (index + 1)) as HTMLInputElement).before(violatingDisplay);
        // TODO: Remove - End
        
      } catch (error) {
        console.error("Error retrieving violations.txt for ", site, ": ", error);
      } finally {
        console.log("Violations.txt retreived");
      }
      
    } catch (error) {
      console.error("Error running AdHere on ", site, ": ", error);
    } finally {
      console.log("AdHere run on ", site);
    }
  }

  // Display sites from api on first load
  // useEffect(() => {
  //   getNewSites();
  // }, []);

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
