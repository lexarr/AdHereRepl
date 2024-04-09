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