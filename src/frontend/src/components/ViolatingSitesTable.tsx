import { useEffect, useState } from "react";

interface ViolatingSitesData {
  reviewedSite: string,
  mobileSummary: {
    lastChangeTime: string,
    betterAdsStatus: string,
    enforcementTime: string,
    filterStatus: string,
  },
  desktopSummary: {
    lastChangeTime: string,
    betterAdsStatus: string,
    enforcementTime: string,
    filterStatus: string,
  },
}

export default function ViolatingSitesTable() {
  const [loading, setLoading] = useState(false);
  const [numSitesToShow, setNumSitesToShow] = useState(10);
  const [violatingSites, setViolatingSites] = useState([]);

  // Get list of violating sites
  const getNewSites = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://adexperiencereport.googleapis.com/v1/violatingSites?key=${process.env.REACT_APP_AD_EXPERIENCE_API_KEY}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // // Remove non existing websites
      // console.log('nonfiltered sites = ', data.length)

      // const removeNonexistingSites = data.violatingSites.filter(async (site: ViolatingSitesData) => {
      //   fetch(`http://localhost:5000/url-check?url=${encodeURIComponent(site.reviewedSite)}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     if (data.does_url_exist) {
      //       return site;
      //     }
      //     return null;
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //     return null;
      //   });
      // });
      // console.log('filtered sites = ', removeNonexistingSites.length)

      // Display object and index of object
      // const filteredSites = removeNonexistingSites.filter(
      //   (element: object, index: number) => index < numSitesToShow
      // );

      // Update state with the new sites
      // setViolatingSites(filteredSites);
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

  const getViolations = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, site: string, index: number) => {
    try {
      console.log("Time to find violations");

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
  
        const getData = await getResponse.json();
        console.log("DATA RESP: ", getData);

        const violatingDisplay = document.createElement("div");
        // violatingDisplay.innerText = JSON.stringify(getData.violations);

        const parsed = Object.values(getData.violations);

        parsed.forEach((line: any, index) => {
          if (index < 7) {
            const lineElem = document.createElement("p");
            lineElem.innerText = line;
            violatingDisplay.appendChild(lineElem);
          }
        });

        (document.querySelector("#div" + (index + 1)) as HTMLInputElement).before(violatingDisplay);
        
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
  useEffect(() => {
    getNewSites();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start w-full sm:w-8/12 lg:w-1/2">
      {/* Row for getting new sites */}
      <div className="flex flex-row justify-start items-center w-full pb-2 border-b border-slate-300 dark:border-slate-700">
        <button
          className="bg-purple-600 hover:bg-purple-600 bg-opacity-20 text-purple-500 hover:text-white p-2 rounded-md"
          onClick={getNewSites}
        >
          Get New Sites
        </button>
      </div>

      {loading ? (
        <div className="flex flex-row justify-center items-center w-full bg-slate-100 dark:bg-slate-800 p-2 border-b border-x border-slate-300 dark:border-slate-700">
          <img src="./circle_spin.svg" alt="loading spinner" />
        </div>
      ) : (
        // Map over sites and display them
        violatingSites.map((site, index) => (
          // Row
          <div
            key={index}
            id={"div" + String(index)}
            className={`flex flex-row justify-between items-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600 p-2 border-b border-x border-slate-300 dark:border-slate-700`}
          >
            {/* Site url */}
            <p className="text-xl text-gray-400 dark:text-gray-500">
              {site["reviewedSite"]}
            </p>
            <button
              className="bg-green-600 hover:bg-green-600 bg-opacity-20 text-green-500 hover:text-white p-2 rounded-md"
              onClick={(e) => getViolations(e, site["reviewedSite"], index)}
              >
              Run AdHere
            </button>
          </div>
        ))
      )}
    </div>
  );
}
