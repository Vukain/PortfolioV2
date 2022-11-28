import { useContext } from 'react';
import { clsx } from 'clsx';

import styles from './LanguageChanger.module.sass';

import { AppContext } from '../../../store/AppContext';

export const LanguageChanger: React.FC = () => {

    const { language, setLanguage } = useContext(AppContext);

    return (
        <div className={styles.changer}>
            <div className={clsx(styles.indicator, styles[`indicator--${language}`])}></div>
            <button className={clsx(styles.button, language === 'english' && styles.selected)} onClick={() => { setLanguage('english') }}>EN</button>
            <button className={clsx(styles.button, language === 'polish' && styles.selected)} onClick={() => { setLanguage('polish') }}>PL</button>
        </div>
    );
};