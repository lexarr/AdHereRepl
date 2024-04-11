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
          className="flex flex-col flex-wrap justify-center items-center h-screen bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 from-slate-100 to-slate-200 font-sans"
        >
          <ViolatingSitesTable />
        </div>
      </div>
    </MainStoreProvider>
  );
}

export default App;
