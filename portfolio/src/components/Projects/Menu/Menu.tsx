import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './Menu.module.sass';

type MyProps = { names: string[], currentProject: number, projectSize: number };

export const Menu: React.FC<MyProps> = ({ names, currentProject, projectSize }) => {

    const clickHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.preventDefault()

        // Alternative scroll method without ability to adjust speed
        // window.scroll({
        //     top: window.innerHeight + (index * projectWidth),
        //     left: 0,
        //     behavior: 'smooth'
        // });

        // Fix for weird jump glitch when entering pinned state
        if (currentProject === 0) {
            window.scroll({
                top: window.innerHeight + 1,
                left: 0,
            });
        } else if (currentProject === names.length - 1) {
            window.scroll({
                top: window.innerHeight + 4 * projectSize - 1,
                left: 0,
            });
        };

        gsap.to(window, {
            scrollTo: {
                y: window.innerHeight + index * projectSize,
                autoKill: false
            }, ease: "power2",
            duration: Math.abs(currentProject - index)
        });
    };

    const projectLinks = names.map((element, index) => (
        <div className={styles.wrapper} key={index}>
            <button className={styles.button} onClick={(e) => { clickHandler(e, index) }} >
                <span className={clsx(styles.text, currentProject === index && styles['text--active'])}>{element}</span>
            </button>
        </div>));

    return (
        <div className={styles.menu} >
            {projectLinks}
        </div>
    );
};