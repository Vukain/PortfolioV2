import { useContext, useState, useEffect } from 'react';
import { clsx } from 'clsx';

import styles from './Navigation.module.sass';

import { AppContext } from '../../store/AppContext';
import { checkLocation } from '../../utils/checkLocation';
import { useLanguageSwitch } from '../../hooks/useLanguageSwitch';
import { NavigationButton } from '../';
import { ReactComponent as VukainLogoGreen } from '../../images/vuk_sygnet_green.svg';
import { ReactComponent as VukainLogoPurple } from '../../images/vuk_sygnet_purple.svg';


export const Navigation: React.FC = () => {

    const { navigateTo } = useContext(AppContext);
    const { languageSwitch } = useLanguageSwitch();

    const [navigationVisibility, setNavigationVisibility] = useState(false);
    const [skipAnimationDelay, setSkipAnimationDelay] = useState(false);

    useEffect(() => {
        // Skip delay on revealing navigation, if starting section is different than header
        if (['projects', 'skills', 'contact'].includes(checkLocation())) {
            setSkipAnimationDelay(true);
        };
    }, []);

    const onClickHandler = () => {
        setNavigationVisibility(!navigationVisibility);
    };

    type ButtonData = { name: string, id: string, image?: Record<"main" | "hover", React.FC<{ className?: string, title?: string }>> };

    const buttonsData: ButtonData[] = [{ name: 'vukain', id: 'header', image: { main: VukainLogoGreen, hover: VukainLogoPurple } }, { name: languageSwitch('projects', 'projekty'), id: 'projects' },
    { name: languageSwitch('skills', 'umiejętności'), id: 'skills' }, { name: languageSwitch('contact', 'kontakt'), id: 'contact' }];

    const buttonsList = buttonsData.map((item, index) => (
        <NavigationButton
            skipDelay={skipAnimationDelay} navigationVisibility={navigationVisibility} navigationVisibilitySetter={setNavigationVisibility}
            name={item.name} id={item.id} key={index + item.id} image={item.image} />
    ));

    const burgerSegments = Array(4).fill(null).map((_, index) => (<div className={styles.hamburger_segment} key={index + 'burger'} />));

    return (
        <nav className={clsx(styles.navigation, !navigationVisibility && styles['navigation--hidden'], skipAnimationDelay && styles['navigation--skip_delay'])}>
            {buttonsList}

            <div className={clsx(styles.hamburger, navigationVisibility && styles['hamburger--active'], skipAnimationDelay && styles['hamburger--skip_delay'])} onClick={onClickHandler}>
                {burgerSegments}
            </div>

            <div className={clsx(styles.destination, !navigationVisibility && styles['destination--hidden'])}><span className={styles.destination_text}>{navigateTo}</span></div>
        </nav>
    );
};