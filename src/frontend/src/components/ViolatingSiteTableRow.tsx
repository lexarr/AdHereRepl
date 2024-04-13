import { useState } from "react";
import FixSuggestions from "./FixSuggestion";

interface RowProps {
  index: number;
  url: string;
}

export default function ViolatingSiteTableRow(props: RowProps) {
  const [showViolations, setShowViolations] = useState(false);

  return (
    <div // row-start
      key={props.index}
      className={`flex flex-row flex-wrap justify-between items-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600 p-2 border-b border-x border-slate-300 dark:border-slate-700`}
    >
      {/* Site url */}
      <p className="text-xl text-gray-400 dark:text-gray-500">{props.url}</p>
      {!showViolations ? (
        <button
          onClick={() => setShowViolations(true)}
          className="bg-green-600 hover:bg-green-600 bg-opacity-20 text-green-500 hover:text-white p-2 rounded-md"
        >
          Run AdHere
        </button>
      ) : (
        <button
          onClick={() => setShowViolations(false)}
          className="bg-red-600 hover:bg-red-600 bg-opacity-20 text-red-500 hover:text-white p-2 rounded-md"
        >
          Close
        </button>
      )}
      {showViolations && <FixSuggestions />}
    </div> // row-end
  );
}
