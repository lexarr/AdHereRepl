import { useState } from "react";
import FixSuggestions from "./FixSuggestion";

export default function ViolatingSiteTableRow() {
    const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 8080;          // Port where the backend server is running
    const [loading, setLoading] = useState(false);                  // State to show/hide loading spinner
    const [showViolations, setShowViolations] = useState(false);    // State to show/hide violations
    const [url, setUrl] = useState("");                             // State to store the URL entered by the user

    // Run AdHere.py against the url in this table row
    const findViolations = async (site: string) => {
        try {
            setLoading(true);

            // Pass url to endpoint that runs AdHere
            const response = await fetch(
                // If 'options object' issues are encountered then delete the following line from package.json
                // "proxy": "http://localhost:8080",
                `http://localhost:${BACKEND_PORT}/find-violations?url=${encodeURIComponent(site)}`,
                {
                    method: "GET",
                }
            );

            // AdHere.py execution complete
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            } else {
                setShowViolations(true); // Trigger component to show violations
            }
        } catch (error) {
            console.error("Error running AdHere on custom url ", site, " : ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div

            className={`flex flex-row flex-wrap justify-between items-center w-full bg-slate-100 dark:bg-slate-800 p-2 border-b border-x border-slate-300 dark:border-slate-700${!showViolations ? " hover:bg-slate-300 dark:hover:bg-slate-600" : ""
                }`}
        >
            {/* Text box */}
            <input className="bg-slate-150 dark:bg-slate-700 text-black dark:text-white placeholder:italic placeholder:text-slate-200 placeholder:dark:text-slate-500 rounded-md p-2"
                placeholder="ex. violatingsite.com"
                type="text"
                onChange={(e) => setUrl(e.target.value.trim())}>
            </input>

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
                        onClick={() => findViolations(url)}
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

            {/* Render component to show violations only when AdHere completes execution */}
            {showViolations && <FixSuggestions />}
        </div>
    );
}
