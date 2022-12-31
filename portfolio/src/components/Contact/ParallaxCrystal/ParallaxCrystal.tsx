import { clsx } from 'clsx';

import styles from './ParallaxCrystal.module.sass';

type MyProps = {
    cursorXPosition: number,
    cursorYPosition: number,
    data: {
        name: string,
        moveSpeed: number,
        rotateSpeed: number,
        orbitSpeed: number,
        crystalImage: React.FC<{ className?: string }>
    };
};

export const ParallaxCrystal: React.FC<MyProps> = ({ data: { name, moveSpeed, rotateSpeed, orbitSpeed, crystalImage, }, cursorXPosition, cursorYPosition }) => {

    const Image = crystalImage;

    return (
        <div className={clsx(styles.crystal_wrapper, styles[`crystal_wrapper--${name}`])} style={{ transform: `translate(${moveSpeed * (window.innerWidth - cursorXPosition) / 100}px, ${moveSpeed * (window.innerHeight - cursorYPosition) / 100}px)` }}>
            <div className={styles.floating_crystal} data-orbit={orbitSpeed}>
                <Image className={styles.crystal} />
            </div>
        </div >
    );
};