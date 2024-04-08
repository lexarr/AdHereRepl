import { useState } from "react";
import ViolatingSiteData from "../data/violating-sites.json";

export default function ViolatingSitesTable() {
  const [numSitesToShow, setNumSitesToShow] = useState(10);
  const violatingSites = ViolatingSiteData.violatingSites.filter(
    (element, index) => index < numSitesToShow
  );

  return (
    <div className="flex flex-col justify-center items-center w-full border border-solid border-slate-700 p-3">
      {violatingSites.map((site, index) => (
        <h1 key={index} className="text-2xl text-zinc-700 dark:text-white">
          {site["reviewedSite"]}
        </h1>
      ))}
    </div>
  );
}
