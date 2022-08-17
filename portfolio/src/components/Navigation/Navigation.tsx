import { useContext, useState } from 'react';
import { clsx } from 'clsx';

import { AppContext } from '../../store/AppContext';
import { NavigationButton } from './NavigationButton/NavigationButton';

import styles from './Navigation.module.sass';

export const Navigation: React.FC = () => {

    const { navigateTo } = useContext(AppContext);

    const [mobileNavigationVisibility, setMobileNavigationVisibility] = useState(false);

    const hamburgerHandler = () => {
        setMobileNavigationVisibility(!mobileNavigationVisibility);
    };

    type ButtonData = { name: string, id: string };

    const buttonsData: ButtonData[] = [{ name: 'vukain', id: 'header' }, { name: 'projekty', id: 'projects' },
    { name: 'umiejętności', id: 'skills' }, { name: 'kontakt', id: 'contact' }]
    const buttonsList = buttonsData.map((item, idx) => (<NavigationButton navigationVisibility={mobileNavigationVisibility} navigationVisibilitySetter={setMobileNavigationVisibility} name={item.name} id={item.id} key={idx} />))

    return (
        <nav className={clsx(styles.navigation, !mobileNavigationVisibility && styles['navigation--hidden'])}>
            {buttonsList}
            <div className={clsx(styles.hamburger, mobileNavigationVisibility && styles['hamburger--active'])} onClick={hamburgerHandler}>
                <div className={styles.hamburger_segment}></div>
                <div className={styles.hamburger_segment}></div>
                <div className={styles.hamburger_segment}></div>
                <div className={styles.hamburger_segment}></div>
            </div>
            <div className={clsx(styles.destination, !mobileNavigationVisibility && styles['destination--hidden'])}><span className={styles.destination_text}>{navigateTo}</span></div>
        </nav >
    );
};