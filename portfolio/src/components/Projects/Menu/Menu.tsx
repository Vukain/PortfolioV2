import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './Menu.module.sass';

type MyProps = { names: string[], currentProject: number, projectSize: number, sectionHeight: number };

export const Menu: React.FC<MyProps> = ({ names, currentProject, projectSize, sectionHeight }) => {

    const clickHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.preventDefault()

        // Alternative scroll method without ability to adjust speed
        // window.scroll({
        //     top: sectionHeight + (index * projectWidth),
        //     left: 0,
        //     behavior: 'smooth'
        // });

        // Fix for weird jump glitch when entering pinned state
        if (currentProject === 0) {
            window.scroll({
                top: sectionHeight + 1,
                left: 0,
                behavior: 'smooth'
            });
        } else if (currentProject === names.length - 1) {
            window.scroll({
                top: sectionHeight + 4 * projectSize - 1,
                left: 0,
                behavior: 'smooth'
            });
        };

        // Small delay needed for fix to work as intended
        setTimeout(() => {
            gsap.to(window, {
                scrollTo: {
                    y: sectionHeight + index * projectSize,
                    autoKill: false
                }, ease: "power2",
                duration: Math.max(.3, Math.abs(currentProject - index))
            });
        }, 50)
    };

    const projectLinks = names.map((element, index) => (
        <div className={styles.wrapper} key={index}>
            <button className={clsx(styles.button, currentProject === index && styles['button--active'])} onClick={(e) => { clickHandler(e, index) }} >
                <span className={styles.text}>{element}</span>
            </button>
        </div>));

    return (
        <div className={styles.menu} >
            {projectLinks}
        </div>
    );
};