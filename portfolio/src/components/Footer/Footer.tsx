import { useContext } from 'react';

import styles from './Footer.module.sass';

import { LanguageChanger } from './LanguageChanger/LanguageChanger';
import { SocialIcons } from '../SocialIcons/SocialIcons';

// import { AppContext } from '../../store/AppContext';

type MyProps = {
    theme: boolean,
    themeChanger: React.Dispatch<React.SetStateAction<boolean>>,
};

export const Footer: React.FC<MyProps> = ({ theme, themeChanger }) => {

    // const colorChanger = () => {
    //     themeChanger(!theme)
    // };

    return (
        <footer className={styles.footer}>

            {/* <div className={styles.theme} onClick={colorChanger}>{theme ? 'light' : 'dark'}</div> */}
            <SocialIcons />
            <div className={styles.copy}>&copy; 2022 Vukain</div>
            <LanguageChanger />

        </footer>
    );
};