import { FaSun, FaRegMoon } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";

export default function Header() {

    // false means dark; true means light
    const [pageTheme, togglePageTheme] = useState(false);

    return(
        <header id="pageHeader" className="absolute flex flex-row justify-center items-center top-0 pt-3 pb-4 w-full bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="">
                <h1 className="text-white text-3xl font-bold">AdHere</h1>
            </div>

            <div id="header-icon-container" className="absolute right-10">
                <IconContext.Provider value={{ size: '25' }}>
                    {pageTheme ?
                        <FaSun className="text-white" onClick={() => togglePageTheme(!pageTheme)} /> :
                        <FaRegMoon className="text-white" onClick={() => togglePageTheme(!pageTheme)} />
                    }
                </IconContext.Provider>
            </div>
        </header>
    );
}