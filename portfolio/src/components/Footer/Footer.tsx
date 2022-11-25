import { useContext } from 'react';

import styles from './Footer.module.sass';

import { LanguageChanger } from './LanguageChanger/LanguageChanger';

import { AppContext } from '../../store/AppContext';

import { ReactComponent as FacebookIcon } from '../../media/icons/facebook-with-circle.svg';
import { ReactComponent as GithubIcon } from '../../media/icons/github-with-circle.svg';
import { ReactComponent as LinkedIcon } from '../../media/icons/linkedin-with-circle.svg';


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
            <div className={styles.icons}>
                <a href='https://github.com/Vukain' target='_blank' rel='noopener noreferrer' aria-label=''>
                    <div className={styles.link} data-text='live'>
                        <GithubIcon className={styles.icon} />
                    </div>
                </a>
                <a href='https://www.linkedin.com/in/michał-piechowiak-a6419124a/' target='_blank' rel='noopener noreferrer' aria-label=''>
                    <div className={styles.link} data-text='live'>
                        <LinkedIcon className={styles.icon} />
                    </div>
                </a>
                <a href='https://www.facebook.com/ochjejku' target='_blank' rel='noopener noreferrer' aria-label=''>
                    <div className={styles.link} data-text='live'>
                        <FacebookIcon className={styles.icon} />
                    </div>
                </a>
            </div>
            <div className={styles.copy}>&copy; 2022 Vukain</div>
            <LanguageChanger />
            {/* <div className={styles.lang} onClick={languageChanger}>{language === 'polish' ? 'pl' : 'en'}</div> */}

        </footer>
    );
};