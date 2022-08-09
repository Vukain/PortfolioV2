import { createContext, useState, useRef } from 'react';

interface ContextProps {
    children: JSX.Element
};

interface ContextType {
    navigateTo: string,
    setNavigateTo: React.Dispatch<React.SetStateAction<string>>,
    currentSection: string,
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>
};

export const AppContext = createContext<ContextType>({ navigateTo: '', setNavigateTo: () => { }, currentSection: '', setCurrentSection: () => { } });

const AppContextProvider: React.FC<ContextProps> = ({ children }) => {

    const [navigateTo, setNavigateTo] = useState('');
    const [currentSection, setCurrentSection] = useState('header');

    const contextValue: ContextType = { navigateTo, setNavigateTo, currentSection, setCurrentSection };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>);
};

export default AppContextProvider;