import { useContext, useState, useEffect } from 'react';
import { clsx } from 'clsx';

import styles from './Navigation.module.sass';

import { AppContext } from '../../store/AppContext';
import { NavigationButton } from '../';
import { ReactComponent as VukainLogoGreen } from '../../images/vuk_sygnet_green.svg';
import { ReactComponent as VukainLogoPurple } from '../../images/vuk_sygnet_purple.svg';

export const Navigation: React.FC = () => {

    const { language, navigateTo } = useContext(AppContext);

    const [navigationVisibility, setNavigationVisibility] = useState(false);
    const [skipAnimationDelay, setSkipAnimationDelay] = useState(false);

    const isEnglish = language === 'english';

    useEffect(() => {
        // Skip delay on revealing navigation, if starting section is different than header
        const [, location] = window.location.href.split('#');
        if (['projects', 'skills', 'contact'].includes(location)) {
            setSkipAnimationDelay(true);
        };
    }, []);

    const onNavigationToggleHandler = () => {
        setNavigationVisibility(!navigationVisibility);
    };

    type ButtonData = { name: string, id: string, image?: Record<"main" | "hover", React.FC<{ className?: string, title?: string }>> };

    const buttonsData: ButtonData[] = [{ name: 'vukain', id: 'header', image: { main: VukainLogoGreen, hover: VukainLogoPurple } }, { name: isEnglish ? 'projects' : 'projekty', id: 'projects' },
    { name: isEnglish ? 'skills' : 'umiejętności', id: 'skills' }, { name: isEnglish ? 'contact' : 'kontakt', id: 'contact' }];

    const buttonsList = buttonsData.map((item, index) => (
        <NavigationButton
            skipDelay={skipAnimationDelay} navigationVisibility={navigationVisibility} navigationVisibilitySetter={setNavigationVisibility}
            name={item.name} id={item.id} key={index} image={item.image} />
    ));

    const burgerSegments = Array(4).fill(null).map((_, index) => (<div className={styles.hamburger_segment} key={index}></div>));

    return (
        <nav className={clsx(styles.navigation, !navigationVisibility && styles['navigation--hidden'], skipAnimationDelay && styles['navigation--skip_delay'])}>
            {/* <VukainLogo className={styles.logo} /> */}
            {buttonsList}

            <div className={clsx(styles.hamburger, navigationVisibility && styles['hamburger--active'], skipAnimationDelay && styles['hamburger--skip_delay'])} onClick={onNavigationToggleHandler}>
                {burgerSegments}
            </div>

            <div className={clsx(styles.destination, !navigationVisibility && styles['destination--hidden'])}><span className={styles.destination_text}>{navigateTo}</span></div>

        </nav>
    );
};