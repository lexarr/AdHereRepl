import "./App.css";
import { MainStoreProvider } from "./MainStoreContext";
import MainStore from "./MainStore"; // MainStore.tsx's default export
import Header from "./components/Header";
import ViolatingSitesTable from "./components/ViolatingSitesTable";
import FixSuggestions from "./components/FixSuggestion";

function App(): JSX.Element {
  return (
    <MainStoreProvider store={MainStore}>
      <div
        id="pageContainer"
        className="bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 from-slate-100 to-slate-200 pb-28 lg:pb-0"
      >
        <div className="App">
          <Header />
          <div
            id="pageBody"
            className="flex flex-col flex-wrap justify-center items-center h-screen font-sans"
          >
            <ViolatingSitesTable />
          </div>
          <div className="flex flex-col flex-wrap justify-center items-center">
            <FixSuggestions />
          </div>
        </div>
      </div>
    </MainStoreProvider>
  );
}

export default App;
