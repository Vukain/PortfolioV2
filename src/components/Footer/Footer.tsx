import styles from './Footer.module.sass';

import { LanguageChanger, SocialIcons } from '../';

export const Footer: React.FC = () => {

    return (
        <footer className={styles.footer}>

            <SocialIcons />
            <div className={styles.copy}>&copy; 2022 Vukain</div>
            <LanguageChanger />

        </footer>
    );
};