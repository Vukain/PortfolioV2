import styles from './Footer.module.sass';

import { LanguageChanger } from './LanguageChanger/LanguageChanger';
import { SocialIcons } from '../SocialIcons/SocialIcons';

type MyProps = {
    theme: boolean,
    themeToggle: React.Dispatch<React.SetStateAction<boolean>>,
};

export const Footer: React.FC<MyProps> = ({ theme, themeToggle }) => {

    // Unused currently, as light them isn't ready
    // const onThemeToggle = () => {
    //     themeToggle(!theme)
    // };

    return (
        <footer className={styles.footer}>

            {/* <div className={styles.theme} onClick={onThemeToggle}>{theme ? 'light' : 'dark'}</div> */}
            <SocialIcons />
            <div className={styles.copy}>&copy; 2022 Vukain</div>
            <LanguageChanger />

        </footer>
    );
};