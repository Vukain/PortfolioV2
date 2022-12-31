import { clsx } from 'clsx';

import styles from './ParallaxCrystal.module.sass';

type MyProps = {
    cursorXPosition: number,
    cursorYPosition: number,
    data: {
        name: string,
        speed: number,
        crystalImage: React.FC<{ className?: string }>
    };
};

export const ParallaxCrystal: React.FC<MyProps> = ({ data: { name, speed, crystalImage }, cursorXPosition, cursorYPosition }) => {

    const Image = crystalImage;

    return (
        <div className={clsx(styles.crystal_wrapper, styles[`crystal_wrapper--${name}`])} style={{ transform: `translate(${speed * (window.innerWidth - cursorXPosition) / 100}px, ${speed * (window.innerHeight - cursorYPosition) / 100}px)` }}>
            <div className={styles.floating_crystal}>
                <Image className={styles.crystal} />
            </div>
        </div>
    );
};