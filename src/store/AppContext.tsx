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
    motionNotReduced: boolean
};

export const AppContext = createContext<ContextType>({
    navigateTo: '', setNavigateTo: () => { },
    currentSection: '', setCurrentSection: () => { },
    language: '', setLanguage: () => { },
    motionNotReduced: true
});

export const AppContextProvider: React.FC<ContextProps> = ({ children }) => {

    const [navigateTo, setNavigateTo] = useState('');
    const [currentSection, setCurrentSection] = useState('header');
    const [language, setLanguage] = useState('english');
    const [motionNotReduced] = useState(!(window.matchMedia("(prefers-reduced-motion: reduce)") && window.matchMedia("(prefers-reduced-motion: reduce)").matches));

    const contextValue: ContextType = { navigateTo, setNavigateTo, currentSection, setCurrentSection, language, setLanguage, motionNotReduced };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>);
};