import { useContext, useState, useEffect } from 'react';
import { clsx } from 'clsx';

import styles from './Navigation.module.sass';

import { AppContext } from '../../store/AppContext';
import { NavigationButton } from './NavigationButton/NavigationButton';

export const Navigation: React.FC = () => {

    const { language, navigateTo, setLanguage } = useContext(AppContext);

    const [mobileNavigationVisibility, setMobileNavigationVisibility] = useState(false);
    const [skipAnimationDelay, setSkipAnimationDelay] = useState(false);

    useEffect(() => {
        if (window.navigator.language !== 'pl-PL') {
            setLanguage('english')
        };
        const [, location] = window.location.href.split('#');
        if (['projects', 'skills', 'contact'].includes(location)) {
            setSkipAnimationDelay(true);
        };

    }, [setLanguage])

    const hamburgerHandler = () => {
        setMobileNavigationVisibility(!mobileNavigationVisibility);
    };

    const isEnglish = language === 'english';

    type ButtonData = { name: string, id: string };

    const buttonsData: ButtonData[] = [{ name: 'vukain', id: 'header' }, { name: isEnglish ? 'projects' : 'projekty', id: 'projects' },
    { name: isEnglish ? 'skills' : 'umiejętności', id: 'skills' }, { name: isEnglish ? 'contact' : 'kontakt', id: 'contact' }]

    const buttonsList = buttonsData.map((item, index) => (<NavigationButton skipDelay={skipAnimationDelay} navigationVisibility={mobileNavigationVisibility} navigationVisibilitySetter={setMobileNavigationVisibility} name={item.name} id={item.id} key={index} />))
    const burgerSegments = Array(4).fill(null).map((_, index) => (<div className={styles.hamburger_segment} key={index}></div>));

    return (
        <nav className={clsx(styles.navigation, !mobileNavigationVisibility && styles['navigation--hidden'], skipAnimationDelay && styles['navigation--skip_delay'])}>

            {buttonsList}

            <div className={clsx(styles.hamburger, mobileNavigationVisibility && styles['hamburger--active'], skipAnimationDelay && styles['hamburger--skip_delay'])} onClick={hamburgerHandler}>
                {burgerSegments}
            </div>

            <div className={clsx(styles.destination, !mobileNavigationVisibility && styles['destination--hidden'])}><span className={styles.destination_text}>{navigateTo}</span></div>

        </nav>
    );
};