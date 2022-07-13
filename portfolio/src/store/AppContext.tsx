import { createContext, useState, useRef } from 'react';

interface ContextProps {
    children: JSX.Element
};

interface ContextType {
    test: string
};

export const AppContext = createContext<ContextType>({ test: "" });

const AppContextProvider: React.FC<ContextProps> = ({ children }) => {

    const contextValue: ContextType = { test: 'abc' };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>);
};

export default AppContextProvider;