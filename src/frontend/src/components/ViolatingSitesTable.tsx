import { useEffect, useState } from "react";
import urlExist from "url-exist";

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

     
        // fetch('http://localhost:5000/url-check', {
        //   // headers: {  
        //   //   Accept: 'application/json'
        //   // },
        // }).then(
        //   response => response.json()
        // ).then(data => {
        //   console.log('data', data.members);
        // });
      
      const urlToCheck = 'http://www.google.com';  
      fetch(`http://localhost:5000/url-check?url=${encodeURIComponent(urlToCheck)}`)
        .then(response => response.json())
        .then(data => {
          console.log('URL exists:', data.does_url_exist);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      // const r = await fetch('https://google.com', {
      //       method: 'HEAD',
      //       mode: 'no-cors',
      //       // headers: {
      //       //   'Cross-Origin-Resource-Policy': 'null'
      //       // }
      //     });
      //     if (r.ok) {
      //       console.error('found!');
      //       // return 'site';
      //     } else {
      //       console.error('dne :(');
      //       // return null;
      //     }
      // Remove non existing websites
      // const removeNonexistingSites = data.violatingSites.filter(async (site: object) => {
      //   try {
      //     const r = await fetch('https://google.com', {
      //       method: 'GET',
      //       mode: 'no-cors',
      //       // headers: {
      //       //   'Cross-Origin-Resource-Policy': 'null'
      //       // }
      //     });
      //     if (r.ok) {
      //       console.error('found!');
      //       return site;
      //     } else {
      //       console.error('dne :(');
      //       return null;
      //     }
      //   } catch (error) {
      //     console.error('err:' + error);
      //     return null;
      //   } 
      //   // response = requests.head('http://www.' + site)
      //   // if response.status_code == 200:
      //   //   return site;
      // });

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
            className={`flex flex-row justify-between items-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600 p-2 border-b border-x border-slate-300 dark:border-slate-700`}
          >
            {/* Site url */}
            <p className="text-xl text-gray-400 dark:text-gray-500">
              {site["reviewedSite"]}
            </p>
            <button className="bg-green-600 hover:bg-green-600 bg-opacity-20 text-green-500 hover:text-white p-2 rounded-md">
              Run AdHere
            </button>
          </div>
        ))
      )}
    </div>
  );
}
