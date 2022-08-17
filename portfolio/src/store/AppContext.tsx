import { createContext, useState } from 'react';

interface ContextProps {
    children: JSX.Element
};

interface ContextType {
    navigateTo: string,
    setNavigateTo: React.Dispatch<React.SetStateAction<string>>,
    currentSection: string,
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>,
    language: string,
    setLanguage: React.Dispatch<React.SetStateAction<string>>,
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
};

export const AppContext = createContext<ContextType>({
    navigateTo: '', setNavigateTo: () => { },
    currentSection: '', setCurrentSection: () => { },
    language: '', setLanguage: () => { },
    darkMode: true, setDarkMode: () => { }
});

export const AppContextProvider: React.FC<ContextProps> = ({ children }) => {

    const [navigateTo, setNavigateTo] = useState('');
    const [currentSection, setCurrentSection] = useState('header');
    const [language, setLanguage] = useState('polish');
    const [darkMode, setDarkMode] = useState(true);

    const contextValue: ContextType = { navigateTo, setNavigateTo, currentSection, setCurrentSection, language, setLanguage, darkMode, setDarkMode };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>);
};