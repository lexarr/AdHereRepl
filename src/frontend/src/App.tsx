import './App.css';
import { MainStoreProvider } from './MainStoreContext';
import MainStore from './MainStore' // Main store default export
import ExampleComponent from './components/ExampleComponent';
import Header from './components/Header';

function App(): JSX.Element {
  return (
    <MainStoreProvider store={MainStore}>
      <div className='App'>
        <Header />
        <div id='pageBody' className='bg-gradient-to-b from-slate-900 to-slate-950 h-screen w-full flex justify-center items-center font-sans'>
          <div id='mainContent' className='flex flex-col flex-wrap justify-center items-center w-10/12'>
            <h1 className='text-slate-400 text-9xl'>Placeholder Text</h1>
            <ExampleComponent />
          </div>
        </div>
      </div>
    </MainStoreProvider>
  );
}

export default App;
