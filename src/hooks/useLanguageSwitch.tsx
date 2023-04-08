import { useContext } from 'react';
import { AppContext } from '../store/AppContext';

export const useLanguageSwitch = () => {
    const { language } = useContext(AppContext);

    const languageSwitch = (englishWord: string, polishWord: string) => {
        return language === 'english' ? englishWord : polishWord;
    };

    return { language, languageSwitch }
};