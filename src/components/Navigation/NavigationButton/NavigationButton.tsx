import { useContext } from 'react';
import { clsx } from 'clsx';

import styles from './NavigationButton.module.sass';

import { AppContext } from '../../../store/AppContext';

type MyProps = {
    id: string,
    name: string,
    navigationVisibility: boolean,
    skipDelay: boolean,
    navigationVisibilitySetter: React.Dispatch<React.SetStateAction<boolean>>
    image?: Record<"main" | "hover", React.FC<{ className?: string, title?: string }>>,
};

export const NavigationButton: React.FC<MyProps> = ({ id, name, navigationVisibility, skipDelay, navigationVisibilitySetter, image }) => {

    const { setNavigateTo, currentSection, setCurrentSection } = useContext(AppContext);

    const onClickHandler = () => {

        // Scroll to location and play navigation animation
        setCurrentSection(id)
        if (window.matchMedia('(orientation: landscape)').matches) {
            setNavigateTo(name);
            navigationVisibilitySetter(true)
            setTimeout(() => {
                window.location.href = `#${id}`;
            }, 1100);
            setTimeout(() => {
                navigationVisibilitySetter(false);
            }, 1200)
        } else {
            window.location.href = `#${id}`;
            setTimeout(() => {
                navigationVisibilitySetter(false);
            }, 200)
        }
    };

    let textOrImage = <span className={styles.text}>{name}</span>;

    if (image) {
        const { main: Logo, hover: LogoHover } = image;

        textOrImage = <>
            <Logo className={clsx(styles.logo, styles['logo--main'])} />
            <LogoHover className={clsx(styles.logo, styles['logo--hover'])} />
        </>;
    };

    return (
        <button className={clsx(styles.button, !navigationVisibility && styles['button--hidden'], currentSection === id && styles['button--active'], skipDelay && styles['button--skip_delay'])} onClick={onClickHandler}>
            {textOrImage}
        </button >
    );
};