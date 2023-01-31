import { useContext, useEffect } from 'react';
import { clsx } from 'clsx';

import styles from './LanguageChanger.module.sass';

import { AppContext } from '../../../store/AppContext';

export const LanguageChanger: React.FC = () => {

    const { language, setLanguage } = useContext(AppContext);

    useEffect(() => {
        // Set initial language based on browser preferences
        if (window.navigator.language !== 'pl-PL') {
            setLanguage('english');
            document.documentElement.setAttribute("lang", 'en');
        };
    }, [setLanguage]);

    const onClickHandler = (lang: string) => {
        document.documentElement.setAttribute("lang", lang);
        if (lang === 'pl') {
            setLanguage('polish')
        } else {
            setLanguage('english')
        };
    };

    return (
        <div className={styles.changer}>
            <div className={clsx(styles.indicator, styles[`indicator--${language}`])}></div>
            <button className={clsx(styles.button, language === 'english' && styles.selected)} onClick={() => { onClickHandler('en') }}>EN</button>
            <button className={clsx(styles.button, language === 'polish' && styles.selected)} onClick={() => { onClickHandler('pl') }}>PL</button>
        </div>
    );
};