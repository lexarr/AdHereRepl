import "./App.css";
import Header from "./components/Header";
import ViolatingSitesTable from "./components/ViolatingSitesTable";

function App(): JSX.Element {
  return (
    <div
      id="pageContainer"
      className="bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 from-slate-100 to-slate-200 pb-28 lg:pb-0"
    >
      <div className="App">
        <Header />
        <div
          id="pageBody"
          className="flex flex-col flex-wrap justify-center items-center h-full font-sans"
        >
          <ViolatingSitesTable />
        </div>
      </div>
    </div>
  );
}

export default App;
