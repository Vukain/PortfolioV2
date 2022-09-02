import { useContext } from 'react';

import styles from './Footer.module.sass';

import { AppContext } from '../../store/AppContext';

export const Footer: React.FC = () => {

    const { language, setLanguage } = useContext(AppContext);

    const languageChanger = () => {
        if (language === 'polish') {
            setLanguage('english');
        } else {
            setLanguage('polish');
        };
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.lang} onClick={languageChanger}>{language === 'polish' ? 'pl' : 'en'}</div>
            <div className={styles.copy}>&copy; 2022 Vukain</div>
        </footer>
    );
};