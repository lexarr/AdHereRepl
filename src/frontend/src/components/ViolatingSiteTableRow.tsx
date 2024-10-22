import { useState } from "react";
import FixSuggestions from "./FixSuggestion";

interface RowProps {
  key: number;
  url: string;
}

export default function ViolatingSiteTableRow(props: RowProps) {
  const [loading, setLoading] = useState(false);
  const [showViolations, setShowViolations] = useState(false);

  // Run AdHere.py against the url in this table row
  const findViolations = async (site: string, index: number) => {
    try {
      setLoading(true);

      // Pass url to endpoint that runs AdHere
      const response = await fetch(
        // If 'options object' issues are encountered then delete the following line from package.json
        // "proxy": "http://localhost:8080",
        `http://localhost:8080/find-violations?url=${encodeURIComponent(site)}`,
        {
          method: "GET",
        }
      );

      // AdHere.py execution complete
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      } else {
        setShowViolations(true); // Trigger component @1
      }
    } catch (error) {
      console.error("Error running AdHere on ", site, ": ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={props.key}
      className={`flex flex-row flex-wrap justify-between items-center w-full bg-slate-100 dark:bg-slate-800 p-2 border-b border-x border-slate-300 dark:border-slate-700${
        !showViolations ? " hover:bg-slate-300 dark:hover:bg-slate-600" : ""
      }`}
    >
      {/* Site url */}
      <p
        className={`text-xl ${
          !showViolations
            ? "text-gray-400 dark:text-gray-500"
            : "text-xl text-black dark:text-white"
        }`}
      >
        {props.url}
      </p>

      {/* Row Button */}
      {/* Default: Run AdHere || Waiting on AdHere execution: circle_spin || Showing violations: Close */}
      {!showViolations ? (
        loading ? (
          <div className="bg-slate-100 dark:bg-slate-800 p-2">
            <img
              src="./circle_spin.svg"
              alt="loading spinner"
              height={25}
              width={25}
            />
          </div>
        ) : (
          <button
            onClick={() => findViolations(props.url, props.key)}
            className="bg-green-600 hover:bg-green-600 bg-opacity-20 text-green-500 hover:text-white p-2 rounded-md"
          >
            Run AdHere
          </button>
        )
      ) : (
        <button
          onClick={() => setShowViolations(false)}
          className="bg-red-600 hover:bg-red-600 bg-opacity-20 text-red-500 hover:text-white p-2 rounded-md"
        >
          Close
        </button>
      )}

      {/* @1 Render component to show violations only when AdHere completes execution */}
      {showViolations && <FixSuggestions />}
    </div>
  );
}
