## Run the frontend locally
1. Navigate to **_./src/frontend/_** in a terminal
2. Execute `npm install` command to install node dependencies (_This only needs to be done once and can be skipped when launching the frontend going forward_)
3. Execute `npm run start` command to launch **_App.tsx_** at _localhost:3000_, by default


## How MobX was Setup

1. Run in terminal:
    1. `npm install mobx mobx-react-lite`
2. Create context provider. This creates a provider component in which wrapped components are able to interact with the mobX store.
    1. Create file in src folder (ex. ***MainStoreContext.tsx***)
    
    ```jsx
    import React, { ReactNode, createContext, useContext } from "react";
    import { MainStore } from './MainStore' // MainStore class

    // Define types for children and store
    interface MainStoreProviderProps {
        children: ReactNode;
        store: MainStore;
    }

    // Create generic React context
    const MainStoreContext = createContext<any>(null);

    // Create provider to be used to allow access to context from all children components
    export const MainStoreProvider: React.FC<MainStoreProviderProps> = ({ children, store }) => {
        return (
            <MainStoreContext.Provider value={store}>
                {children}
            </MainStoreContext.Provider>
        )
    }

    // Components use this function to access MobX store
    export const useMainStore = () => {
        return useContext(MainStoreContext);
    };
    ```
    
3. Create actual store (this is where all the magic happens; all shareable variables and functions are declared here)
    1. Create file in root directory (ex. ***MainStore.tsx***)
    
    ```tsx
    import { makeObservable, observable, action } from "mobx";
    
    class MainStore {
        exampleVariable: string = '';
    
        constructor() {
            makeObservable(this, {
                exampleVariable: observable,
                setExampleFunction: action
            });
        }
    
        setExampleFunction(exampleText: string) {
            this.exampleVariable = exampleText.trim();
        }
    }
    
    const MS = new MainStore();
    
    export default MS;
    ```
    

## How to Use MobX

1. Import store provider and actual store in your `App.tsx` .
    
    ```jsx
    import { MainStoreProvider } from './MainStoreContext';
    import MainStore from './MainStore'
    ```
    
2. Wrap all components in your `App.tsx` with your store provider. Ensure the ‘store’ attribute is assigned with your primary store imported above.
    
    ```tsx
    function App(): JSX.Element {
    
      return (
        <MainStoreProvider store={MainStore}>
          <ChildElement1>
            <ChildComponent />
          <ChildElement1 />
        </MainStoreProvider>
    
      );
    }
    ```
    
3. To use the mobX store, do the following
    1. import the main store in any component
        
        ```tsx
        import { useMainStore } from '../MainStoreContext';
        ```
        
    2. Create a local instance of the store by creating a constant in your component
    
    ```tsx
    import { useMainStore } from '../MainStoreContext';
    
    export default function ExampleComponent() {
    
        const mainStore = useMainStore();
    	
        return(
            // ...
        );
    }
    ```
    
4. Now you can interact with store variables and functions via the `mainStore` variable.

## Documentation Reference
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Typescript](https://www.typescriptlang.org/docs/)
- [MobX](https://mobx.js.org/react-integration.html)
