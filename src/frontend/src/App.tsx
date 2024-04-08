import "./App.css";
import { MainStoreProvider } from "./MainStoreContext";
import MainStore from "./MainStore"; // MainStore.tsx default export
import Header from "./components/Header";
import ViolatingSitesTable from "./components/ViolatingSitesTable";

function App(): JSX.Element {
  return (
    <MainStoreProvider store={MainStore}>
      <div className="App">
        <Header />
        <div
          id="pageBody"
          className="bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 from-slate-100 to-slate-200 h-screen w-full flex justify-center items-center font-sans"
        >
          <div
            id="mainContent"
            className="flex flex-col flex-wrap justify-center items-center w-10/12"
          >
            <ViolatingSitesTable />
          </div>
        </div>
      </div>
    </MainStoreProvider>
  );
}

export default App;
