import { createContext, useState } from 'react';

interface ContextProps {
  children: JSX.Element;
}

interface ContextType {
  navigateTo: string;
  setNavigateTo: React.Dispatch<React.SetStateAction<string>>;
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<ContextType>({
  navigateTo: '',
  setNavigateTo: () => {},
  currentSection: '',
  setCurrentSection: () => {},
  language: '',
  setLanguage: () => {},
});

export const AppContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [navigateTo, setNavigateTo] = useState('');
  const [currentSection, setCurrentSection] = useState('header');
  const [language, setLanguage] = useState('polish');

  const contextValue: ContextType = {
    navigateTo,
    setNavigateTo,
    currentSection,
    setCurrentSection,
    language,
    setLanguage,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
