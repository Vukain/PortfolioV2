import { useContext } from 'react';

import styles from './Footer.module.sass';

import { AppContext } from '../../store/AppContext';

type MyProps = {
    theme: boolean,
    themeChanger: React.Dispatch<React.SetStateAction<boolean>>,
};

export const Footer: React.FC<MyProps> = ({ theme, themeChanger }) => {

    const { language, setLanguage } = useContext(AppContext);

    const languageChanger = () => {
        if (language === 'polish') {
            setLanguage('english');
        } else {
            setLanguage('polish');
        };
    };

    const colorChanger = () => {
        themeChanger(!theme)
    };

    return (
        <footer className={styles.footer}>
            {/* <div className={styles.theme} onClick={colorChanger}>{theme ? 'light' : 'dark'}</div> */}
            <div className={styles.lang} onClick={languageChanger}>{language === 'polish' ? 'pl' : 'en'}</div>
            <div className={styles.copy}>&copy; 2022 Vukain</div>
        </footer>
    );
};