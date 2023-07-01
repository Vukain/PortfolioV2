import styles from './Footer.module.sass';

import { SocialIcons } from '../';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <SocialIcons />
      <div className={styles.copy}>&copy; 2022-{currentYear} Vukain</div>
    </footer>
  );
};
