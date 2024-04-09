import { FaSun, FaMoon } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

export default function Header() {
  const [pageTheme, setPageTheme] = useState("dark");

  const app = document.documentElement.getElementsByClassName("App");
  const iconStyling =
    "text-zinc-700 dark:text-white hover:text-slate-400 cursor-pointer";

  // on page load, set theme based on user default
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setPageTheme("dark");
    } else {
      setPageTheme("light");
    }
  }, []);

  // toggle between dark and light theme
  useEffect(() => {
    if (pageTheme === "dark") {
      app[0].classList.add("dark");
    } else {
      app[0].classList.remove("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTheme]);

  return (
    <header
      id="pageHeader"
      className="sm:absolute flex flex-row justify-center items-center top-0 pt-3 pb-4 w-full border-solid border-b border-slate-300 dark:border-slate-700 backdrop-blur-sm"
    >
      <div className="">
        <h1 className="text-zinc-700 dark:text-white text-4xl font-bold">
          <span className="text-green-600">Ad</span>Here
        </h1>
      </div>

      <div id="theme-icon-container" className="absolute right-10">
        <IconContext.Provider value={{ size: "25" }}>
          {pageTheme === "dark" ? (
            <FaSun
              className={iconStyling}
              onClick={() => setPageTheme("light")}
            />
          ) : (
            <FaMoon
              className={iconStyling}
              onClick={() => setPageTheme("dark")}
            />
          )}
        </IconContext.Provider>
      </div>
    </header>
  );
}